import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { PROJECTS } from '../src/content/projects.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');
const distDir = path.resolve(rootDir, 'dist');

function checkPrerender() {
  console.log('🔍 Executing Static Prerender Validation Audit...');
  let hasErrors = false;

  // 1. Verify Home Page (dist/index.html)
  const homeHtmlPath = path.resolve(distDir, 'index.html');
  if (!fs.existsSync(homeHtmlPath)) {
    console.error('❌ Check failed: dist/index.html does not exist.');
    process.exit(1);
  }

  const homeHtml = fs.readFileSync(homeHtmlPath, 'utf-8');

  // Check root div is not empty
  if (homeHtml.includes('<div id="root"></div>')) {
    console.error('❌ Check failed: dist/index.html contains an empty root div (<div id="root"></div>)!');
    hasErrors = true;
  } else {
    console.log('  ✓ dist/index.html root div contains rendered markup.');
  }

  // Check <title> contains Darshan Saravari
  const titleMatch = homeHtml.match(/<title>(.*?)<\/title>/i);
  if (!titleMatch || !titleMatch[1].includes('Darshan Saravari')) {
    console.error(`❌ Check failed: <title> does not include 'Darshan Saravari'. Found: ${titleMatch ? titleMatch[1] : 'None'}`);
    hasErrors = true;
  } else {
    console.log(`  ✓ dist/index.html <title> validated: "${titleMatch[1]}"`);
  }

  // Check <h1> contains Darshan
  const h1Match = homeHtml.match(/<h1[^>]*>(.*?)<\/h1>/is);
  if (!h1Match || !h1Match[1].includes('Darshan')) {
    console.error(`❌ Check failed: <h1> does not include 'Darshan'. Found: ${h1Match ? h1Match[1] : 'None'}`);
    hasErrors = true;
  } else {
    console.log('  ✓ dist/index.html <h1> contains developer name.');
  }

  // 2. Verify all project case-study routes
  for (const project of PROJECTS) {
    const projectFilePath = path.resolve(distDir, 'projects', project.slug, 'index.html');
    if (!fs.existsSync(projectFilePath)) {
      console.error(`❌ Check failed: Prerendered file missing for route /projects/${project.slug} (${projectFilePath})`);
      hasErrors = true;
      continue;
    }

    const projectHtml = fs.readFileSync(projectFilePath, 'utf-8');

    if (projectHtml.includes('<div id="root"></div>')) {
      console.error(`❌ Check failed: /projects/${project.slug} has empty root div!`);
      hasErrors = true;
    }

    const projH1Match = projectHtml.match(/<h1[^>]*>(.*?)<\/h1>/is);
    if (!projH1Match || !projH1Match[1].includes(project.title)) {
      console.error(`❌ Check failed: /projects/${project.slug} <h1> does not match title "${project.title}"`);
      hasErrors = true;
    }

    console.log(`  ✓ /projects/${project.slug}/index.html verified (valid <h1>, meta & rendered DOM).`);
  }

  if (hasErrors) {
    console.error('\n❌ Static prerender validation FAILED with errors.');
    process.exit(1);
  }

  console.log('✅ ALL prerendered routes passed integrity inspection! Search engines can fully crawl content.\n');
}

checkPrerender();
