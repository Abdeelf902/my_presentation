import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { generateRobotsTxt, generateSitemap } from '../src/utils/seo.ts';

/**
 * Écrit sitemap.xml depuis src/utils/seo.ts (source unique).
 *
 * Usage: npm run generate:sitemap
 */

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, '..');

function writeIfDirExists(dir: string, filename: string, content: string) {
  if (!fs.existsSync(dir)) {
    return false;
  }
  const outPath = path.join(dir, filename);
  fs.writeFileSync(outPath, content, { encoding: 'utf8' });
  console.log(`✅ ${filename} écrit dans ${outPath}`);
  return true;
}

function main() {
  const sitemap = generateSitemap();
  const robots = generateRobotsTxt();
  const publicDir = path.join(rootDir, 'public');
  if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir, { recursive: true });
  }
  writeIfDirExists(publicDir, 'sitemap.xml', sitemap);
  writeIfDirExists(publicDir, 'robots.txt', robots);
  writeIfDirExists(path.join(rootDir, 'dist'), 'sitemap.xml', sitemap);
  writeIfDirExists(path.join(rootDir, 'dist'), 'robots.txt', robots);
}

main();
