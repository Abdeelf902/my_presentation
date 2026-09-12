import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import viteCompression from 'vite-plugin-compression';
import { TanStackRouterVite } from '@tanstack/router-vite-plugin';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { execSync } from 'child_process';
import prerenderPlugin from './scripts/prerender';

// Get current directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const distDir = path.join(__dirname, 'dist');

function readPackageVersion() {
  try {
    const pkg = JSON.parse(fs.readFileSync(path.join(__dirname, 'package.json'), 'utf8'));
    return String(pkg.version || '0.0.0');
  } catch {
    return '0.0.0';
  }
}

function gitValue(command: string, fallback: string) {
  try {
    return execSync(command, {
      cwd: __dirname,
      encoding: 'utf8',
      stdio: ['ignore', 'pipe', 'ignore'],
    }).trim() || fallback;
  } catch {
    return fallback;
  }
}

function createBuildInfo() {
  const packageVersion = readPackageVersion();
  const commit = process.env.VERCEL_GIT_COMMIT_SHA || gitValue('git rev-parse HEAD', 'local');
  const shortCommit = commit === 'local' ? 'local' : commit.slice(0, 7);
  const branch = process.env.VERCEL_GIT_COMMIT_REF || gitValue('git rev-parse --abbrev-ref HEAD', 'local');
  const builtAt = new Date().toISOString();
  const buildStamp = builtAt.replace(/[-:]/g, '').replace(/\.\d{3}Z$/, 'Z');

  return {
    version: `${packageVersion}+${shortCommit}.${buildStamp}`,
    packageVersion,
    commit,
    branch,
    builtAt,
  };
}

const siteBuildInfo = createBuildInfo();

// SEO generation hook - improved with better error handling
function generateSEOFiles() {
  try {
    // Create dist directory if it doesn't exist
    if (!fs.existsSync(distDir)) {
      fs.mkdirSync(distDir, { recursive: true });
    }

    // Import SEO utilities dynamically
    import('./src/utils/seo.ts')
      .then(({ generateSitemap, generateRobotsTxt }) => {
        try {
          const sitemap = generateSitemap();
          const robots = generateRobotsTxt();
          
          fs.writeFileSync(path.join(distDir, 'sitemap.xml'), sitemap);
          fs.writeFileSync(path.join(distDir, 'robots.txt'), robots);
          
          console.log('✅ SEO files updated automatically!');
        } catch (writeError) {
          console.warn('⚠️ Warning: Could not write SEO files:', writeError instanceof Error ? writeError.message : String(writeError));
        }
      })
      .catch(importError => {
        console.warn('⚠️ Warning: SEO generation module not found or failed to import:', importError instanceof Error ? importError.message : String(importError));
      });
  } catch (error) {
    console.warn('⚠️ Warning: SEO generation setup failed:', error instanceof Error ? error.message : String(error));
    // Continue build even if SEO generation fails
  }
}

function writeSiteVersionFiles() {
  if (!fs.existsSync(distDir)) {
    fs.mkdirSync(distDir, { recursive: true });
  }

  const json = `${JSON.stringify(siteBuildInfo, null, 2)}\n`;
  const text = [
    `version=${siteBuildInfo.version}`,
    `packageVersion=${siteBuildInfo.packageVersion}`,
    `commit=${siteBuildInfo.commit}`,
    `branch=${siteBuildInfo.branch}`,
    `builtAt=${siteBuildInfo.builtAt}`,
    '',
  ].join('\n');

  fs.writeFileSync(path.join(distDir, 'site-version.json'), json, 'utf8');
  fs.writeFileSync(path.join(distDir, 'site-version.txt'), text, 'utf8');
}

// https://vitejs.dev/config/
export default defineConfig({
  base: '/', // Set this to your repository name if deploying to GitHub Pages or a subdirectory
  plugins: [
    TanStackRouterVite(),
    react(),
    viteCompression({
      algorithm: 'brotliCompress',
      ext: '.br',
      threshold: 10240, // Seuil de compression (10KB)
      deleteOriginFile: false
    }),
    viteCompression({
      algorithm: 'gzip',
      ext: '.gz',
      threshold: 10240,
      deleteOriginFile: false
    }),
    {
      name: 'seo-generator',
      writeBundle() {
        generateSEOFiles();
      }
    },
    {
      name: 'site-version',
      transformIndexHtml(html) {
        const tags = [
          '<!-- Site build version for crawlers -->',
          `<meta name="site-version" content="${siteBuildInfo.version}" />`,
          `<meta name="site-package-version" content="${siteBuildInfo.packageVersion}" />`,
          `<meta name="site-build-commit" content="${siteBuildInfo.commit}" />`,
          `<meta name="site-build-branch" content="${siteBuildInfo.branch}" />`,
          `<meta name="site-build-date" content="${siteBuildInfo.builtAt}" />`,
          '<link rel="alternate" type="application/json" href="/site-version.json" />',
          '<link rel="version-history" href="/site-version.txt" />',
        ].join('\n    ');

        return html.replace('</head>', `    ${tags}\n  </head>`);
      },
      closeBundle() {
        writeSiteVersionFiles();
      }
    },
    // 🆕 Native SSR prerender plugin - replaces react-snap
    // Generates static HTML files for each route with unique SEO metadata
    prerenderPlugin(),
  ],
  define: {
    __SITE_BUILD_INFO__: JSON.stringify(siteBuildInfo),
  },
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: false,
    minify: 'terser',
    chunkSizeWarningLimit: 1000,
    emptyOutDir: true,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom', '@tanstack/react-router']
        }
      }
    }
  },
  server: {
    port: 3000,
    open: true,
    proxy: {
      '/api': {
        target: 'http://localhost:4000',
        changeOrigin: true,
        secure: false
      }
    }
  }
});
