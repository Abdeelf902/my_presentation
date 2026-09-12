import { BLOG_ARTICLES } from '../data/blog-articles';

const baseUrl = 'https://www.abderrahmane-elfarouahfreelance.com';

/** Routes du sitemap — source unique (build Vercel aligné) */
export const SITEMAP_ROUTES = [
  { path: '/', priority: '1.0', changeFreq: 'weekly' },
  { path: '/services', priority: '0.9', changeFreq: 'weekly' },
  { path: '/projects', priority: '0.9', changeFreq: 'weekly' },
  { path: '/contact', priority: '0.9', changeFreq: 'weekly' },
  { path: '/faq', priority: '0.8', changeFreq: 'monthly' },
  { path: '/zones-intervention', priority: '0.8', changeFreq: 'monthly' },
  { path: '/about', priority: '0.6', changeFreq: 'monthly' },
  { path: '/experience', priority: '0.5', changeFreq: 'monthly' },
  { path: '/mentions-legales', priority: '0.3', changeFreq: 'yearly' },
  { path: '/cgv', priority: '0.3', changeFreq: 'yearly' },
  { path: '/developpeur-angular-freelance', priority: '0.8', changeFreq: 'monthly' },
  { path: '/developpeur-laravel-freelance', priority: '0.8', changeFreq: 'monthly' },
  { path: '/creation-site-web-yvelines', priority: '0.8', changeFreq: 'monthly' },
  { path: '/applications-web-sur-mesure', priority: '0.8', changeFreq: 'monthly' },
  { path: '/blog', priority: '0.8', changeFreq: 'monthly' },
  ...BLOG_ARTICLES.map((article) => ({
    path: `/blog/${article.slug}`,
    priority: '0.7',
    changeFreq: 'monthly',
  })),
] as const;

const routes = SITEMAP_ROUTES;

export function generateSitemap() {
  const currentDate = new Date().toISOString().split('T')[0];
  
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${routes.map(route => `  <url>
    <loc>${baseUrl}${route.path}</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>${route.changeFreq}</changefreq>
    <priority>${route.priority}</priority>
  </url>`).join('\n')}
</urlset>`;

  return sitemap;
}

export function generateRobotsTxt() {
  return `# Priorité pour les moteurs de recherche importants
User-agent: *
Allow: /
Allow: /site-version.txt
Allow: /site-version.json
Crawl-delay: 1

# Googlebot - optimisations spécifiques
User-agent: Googlebot
Allow: /
Allow: /site-version.txt
Allow: /site-version.json
Crawl-delay: 0.5

# Bingbot - optimisations spécifiques
User-agent: Bingbot
Allow: /
Allow: /site-version.txt
Allow: /site-version.json
Crawl-delay: 1

# Bloquer les bots non désirés
User-agent: AhrefsBot
Disallow: /

User-agent: MJ12bot
Disallow: /

User-agent: DotBot
Disallow: /

User-agent: SemrushBot
Disallow: /

User-agent: BLEXBot
Disallow: /

# Fichiers et dossiers à ne pas indexer
Disallow: /src/
Disallow: /node_modules/
Disallow: /dist/
Disallow: /vite.config.*
Disallow: /admin/
Disallow: /.well-known/
Disallow: /api/
Disallow: /404.html

# Fichiers SEO
Allow: /sitemap.xml
Allow: /geo-sitemap.xml
Allow: /robots.txt
Allow: /manifest.json
Allow: /local-business.json
Allow: /site-version.txt
Allow: /site-version.json

# Indiquer le plan du site (sitemap)
Sitemap: ${baseUrl}/sitemap.xml
Sitemap: ${baseUrl}/geo-sitemap.xml
`;
}
