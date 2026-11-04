import fs from 'fs';
import path from 'path';
import { fileURLToPath, pathToFileURL } from 'url';
import { execSync } from 'child_process';
import { PROJECTS } from '../src/content/projects.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');
const distDir = path.resolve(rootDir, 'dist');
const ssrDir = path.resolve(rootDir, 'dist-ssr');

async function prerender() {
  console.log('🚀 Starting Static Prerendering...');

  // 1. Build SSR bundle fresh
  console.log('📦 Compiling SSR bundle with Vite...');
  execSync('npx vite build --outDir dist-ssr --ssr src/entry-server.jsx', {
    cwd: rootDir,
    stdio: 'inherit',
  });

  // 2. Import the compiled server render function
  const serverBundlePath = pathToFileURL(path.resolve(ssrDir, 'entry-server.js')).href;
  const { render } = await import(serverBundlePath);

  // 3. Read client template dist/index.html
  const templatePath = path.resolve(distDir, 'index.html');
  if (!fs.existsSync(templatePath)) {
    throw new Error('dist/index.html not found. Run client build first.');
  }
  const template = fs.readFileSync(templatePath, 'utf-8');

  // 4. Routes to prerender
  const routes = [
    '/',
    ...PROJECTS.map((p) => `/projects/${p.slug}`),
  ];

  console.log(`📑 Prerendering ${routes.length} static routes:`);

  for (const url of routes) {
    const helmetContext = {};
    const { html, helmet } = render(url, helmetContext);

    let pageHtml = template.replace(
      '<div id="root"></div>',
      `<div id="root">${html}</div>`
    );

    // If helmet has specific title/meta/links for this route, update the head tags
    if (helmet) {
      const titleTag = helmet.title?.toString();
      const metaTags = helmet.meta?.toString();
      const linkTags = helmet.link?.toString();
      const scriptTags = helmet.script?.toString();

      if (titleTag) {
        pageHtml = pageHtml.replace(/<title>.*?<\/title>/i, titleTag);
      }
      if (metaTags) {
        pageHtml = pageHtml.replace('</head>', `  ${metaTags}\n  </head>`);
      }
      if (linkTags) {
        pageHtml = pageHtml.replace('</head>', `  ${linkTags}\n  </head>`);
      }
      if (scriptTags) {
        pageHtml = pageHtml.replace('</head>', `  ${scriptTags}\n  </head>`);
      }
    }

    // Determine target file path
    let targetFilePath;
    if (url === '/') {
      targetFilePath = path.resolve(distDir, 'index.html');
    } else {
      const routePath = url.startsWith('/') ? url.slice(1) : url;
      const targetSubdir = path.resolve(distDir, routePath);
      fs.mkdirSync(targetSubdir, { recursive: true });
      targetFilePath = path.resolve(targetSubdir, 'index.html');
    }

    fs.writeFileSync(targetFilePath, pageHtml, 'utf-8');
    console.log(`  ✓ Prerendered: ${url} -> ${path.relative(rootDir, targetFilePath)}`);
  }

  // Clean up SSR temp bundle
  try {
    fs.rmSync(ssrDir, { recursive: true, force: true });
  } catch {
    // ignore
  }

  console.log('✅ Static prerendering finished successfully!\n');
}

prerender().catch((err) => {
  console.error('❌ Prerendering error:', err);
  process.exit(1);
});
