import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Get current directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Import SEO utilities
const { generateSitemap, generateRobotsTxt } = await import('../src/utils/seo.ts');

// Generate SEO files
function generateSEOFiles() {
  try {
    const sitemap = generateSitemap();
    const robots = generateRobotsTxt();
    const distDir = path.join(__dirname, '../dist');
    const publicDir = path.join(__dirname, '../public');

    if (!fs.existsSync(distDir)) {
      fs.mkdirSync(distDir, { recursive: true });
    }

    fs.writeFileSync(path.join(distDir, 'sitemap.xml'), sitemap);
    fs.writeFileSync(path.join(distDir, 'robots.txt'), robots);
    fs.writeFileSync(path.join(publicDir, 'sitemap.xml'), sitemap);
    fs.writeFileSync(path.join(publicDir, 'robots.txt'), robots);

    console.log('✅ SEO files generated successfully!');
    console.log('📅 Date:', new Date().toISOString().split('T')[0]);
    console.log('📁 Files: public/{sitemap.xml,robots.txt}, dist/{sitemap.xml,robots.txt}');
  } catch (error) {
    console.error('❌ Error generating SEO files:', error);
    process.exit(1);
  }
}

// Run generation
generateSEOFiles();
