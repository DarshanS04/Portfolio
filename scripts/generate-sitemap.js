import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { PROJECTS } from '../src/content/projects.js';
import { PROFILE } from '../src/content/profile.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');
const distDir = path.resolve(rootDir, 'dist');

const siteUrl = (process.env.VITE_SITE_URL || PROFILE.siteUrl || 'https://darshansaravari.vercel.app').replace(/\/$/, '');

function generateSitemap() {
  console.log('🗺️ Generating sitemap.xml & robots.txt...');

  const routes = [
    { path: '/', priority: '1.0', changefreq: 'weekly' },
    ...PROJECTS.map((p) => ({
      path: `/projects/${p.slug}`,
      priority: '0.8',
      changefreq: 'monthly',
    })),
  ];

  const currentDate = new Date().toISOString().split('T')[0];

  const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${routes
  .map(
    (r) => `  <url>
    <loc>${siteUrl}${r.path}</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>${r.changefreq}</changefreq>
    <priority>${r.priority}</priority>
  </url>`
  )
  .join('\n')}
</urlset>
`;

  const robotsTxt = `User-agent: *
Allow: /

Sitemap: ${siteUrl}/sitemap.xml
`;

  // Write to dist/
  if (fs.existsSync(distDir)) {
    fs.writeFileSync(path.resolve(distDir, 'sitemap.xml'), sitemapXml, 'utf-8');
    fs.writeFileSync(path.resolve(distDir, 'robots.txt'), robotsTxt, 'utf-8');
    console.log(`  ✓ Written dist/sitemap.xml with ${routes.length} URLs`);
    console.log(`  ✓ Written dist/robots.txt pointing to ${siteUrl}/sitemap.xml`);
  }

  // Also write to public/ for local dev
  const publicDir = path.resolve(rootDir, 'public');
  if (fs.existsSync(publicDir)) {
    fs.writeFileSync(path.resolve(publicDir, 'sitemap.xml'), sitemapXml, 'utf-8');
    fs.writeFileSync(path.resolve(publicDir, 'robots.txt'), robotsTxt, 'utf-8');
  }

  console.log('✅ Sitemap and robots.txt generation complete!\n');
}

generateSitemap();

