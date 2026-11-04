# Darshan.sh — Production Developer Portfolio

[![CI Pipeline](https://github.com/DarshanS04/Portfolio/actions/workflows/ci.yml/badge.svg)](https://github.com/DarshanS04/Portfolio/actions)
[![React](https://img.shields.io/badge/React-19-blue.svg)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-8-646CFF.svg)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38B2AC.svg)](https://tailwindcss.com/)
[![Vitest](https://img.shields.io/badge/Tests-28%20Passed-brightgreen.svg)](https://vitest.dev/)
[![A11y](https://img.shields.io/badge/A11y-WCAG%202.1%20AA-success.svg)](https://www.w3.org/WAI/standards-guidelines/wcag/)

> Production-grade, highly polished developer portfolio and terminal experience engineered for **Darshan Saravari** — Full-Stack & Android Developer (Final-Year B.E. Information Science Student at SDMCET, CGPA 9.07, graduating 2026).

---

## 📸 Screenshots

| Desktop Terminal & Hero | Mobile View & Chips |
| :---: | :---: |
| ![Desktop Screenshot Placeholder](public/og-image.png) | *[Screenshot Placeholder - Mobile View]* |

---

## ✨ Signature Features

- **Interactive Ongoing Terminal (Hero)**:
  - Custom shell window with title bar, controls, and active session prompt (`darshan@portfolio:~`).
  - Auto-typed initial boot script (`whoami`, `cat skills.txt`, `ls projects/`, `git log --oneline -1`).
  - Command Registry pattern with tab autocomplete and up/down command history navigation.
  - Interactive commands: `help`, `about`, `skills`, `projects`, `open <slug>`, `experience`, `education`, `resume`, `contact`, `theme <name>`, `clear`, and `sudo hire darshan` (confetti easter egg).
  - Reduced-motion detection: skips animations instantly for users with motion sensitivity.
  - Full keyboard accessibility with `role="log"` and `aria-live="polite"`.
- **Dynamic Theming Engine (Zero Flash)**:
  - Three live-switchable dark themes: **Matrix** (`#00ff66`), **Dracula** (`#bd93f9`), and **Cyberpunk** (`#ff007f`), plus default **Electric Violet & Cyan**.
  - LocalStorage persistence with an inline head script to eliminate Flash of Unstyled Theme (FOUC).
- **Static Prerendering Pipeline**:
  - Build-time static prerendering of every route (`/`, `/projects/electronic-gadget-ecommerce`, `/projects/bake-track`, `/projects/minor-it-sphere`).
  - Real, crawlable HTML containing semantic `<h1>`, metadata, JSON-LD, and paragraph content (no blank root divs).
  - Automated build-time audit script (`scripts/check-prerender.js`) that validates prerendered HTML integrity.
- **Deep Case Study Route Architecture**:
  - Dedicated pages at `/projects/:slug` detailing Problem, System Architecture, Key Features, Engineering Challenges, and Learnings.
  - Unique Open Graph tags and JSON-LD `SoftwareSourceCode` schemas for every case study.
- **Command Palette (`Ctrl+K` / `⌘K`)**:
  - Instant spotlight search jumping to sections, opening case studies, downloading resume, or changing themes.
- **Konami Code Easter Egg**:
  - Entering `↑ ↑ ↓ ↓ ← → ← → B A` launches a lazy-loaded, pausable Matrix digital rain canvas.
- **GitHub Public Telemetry**:
  - Client-side fetch with `sessionStorage` caching (1-hour TTL) and a graceful offline/rate-limit fallback without client secrets.
- **Contact Gateway**:
  - Client-side validated form with honeypot bot trap (`_gotcha`), Formspree endpoint integration, and privacy protection (no public phone numbers).

---

## 🛠️ Tech Stack

- **Core**: React 19, JavaScript (ESNext, strictly no TypeScript), Vite 8
- **Routing**: React Router 7 (`react-router-dom`)
- **Prerendering**: Custom Vite SSR static prerendering script with `react-dom/server`
- **Styling**: Tailwind CSS 3.4 with custom CSS variables & Glassmorphism tokens
- **Typography**: Self-hosted `@fontsource/jetbrains-mono` and `@fontsource/inter` (zero external font render-blocking)
- **Animation & Effects**: `framer-motion`, `canvas-confetti`
- **Quality & Testing**: Vitest 5, React Testing Library, ESLint 9 (flat config), Prettier
- **Deployment**: Vercel Static with custom `vercel.json` (security headers, SPA rewrites, immutable asset caching)

---

## 📁 Repository Structure

```
Portfolio/
├── .github/
│   └── workflows/
│       └── ci.yml               # GitHub Actions CI workflow
├── public/
│   ├── favicon.svg             # Vector favicon
│   ├── manifest.webmanifest    # PWA web manifest
│   ├── og-image.png            # Static Open Graph social share preview
│   ├── og-template.html        # 1200x630 OG banner screenshot template
│   ├── resume.pdf              # Verified PDF resume placeholder
│   ├── robots.txt              # Search crawler directives
│   └── sitemap.xml             # Search engine URL registry
├── scripts/
│   ├── check-prerender.js      # Build-time prerender HTML verification
│   ├── generate-sitemap.js     # Build-time sitemap generator
│   └── prerender.js            # Vite SSR static prerender script
├── src/
│   ├── components/
│   │   ├── extras/             # CommandPalette, MatrixRain
│   │   ├── sections/           # Hero, About, Skills, Projects, Experience, Education, GithubStats, Contact
│   │   ├── terminal/           # TerminalWindow
│   │   └── ui/                 # Navbar, Footer, BuildProgressBar, ErrorBoundary, Icons
│   ├── content/                # Single source of truth (NEVER hardcode text in UI)
│   │   ├── experience.js       # Internship and career history
│   │   ├── profile.js          # Owner profile, facts, education, bio
│   │   ├── projects.js         # Flagship projects & case studies
│   │   └── skills.js           # Categorized skills & package.json format
│   ├── hooks/                  # Custom hooks (useTheme, useKonami, useMediaQuery, useTypewriter)
│   ├── lib/                    # Pure unit-testable modules (terminalParser, contactValidation)
│   ├── pages/                  # HomePage, ProjectDetailPage, NotFoundPage
│   ├── styles/                 # globals.css (CSS variables & glassmorphism)
│   ├── tests/                  # Vitest test suites (28 tests passing)
│   ├── App.jsx                 # Root layout & routing
│   ├── entry-server.jsx        # Server entry for static prerendering
│   └── main.jsx                # Client hydration entry
├── eslint.config.js            # ESLint 9 configuration
├── index.html                  # Handcrafted SEO metadata & theme loader
├── tailwind.config.js          # Tailwind theme tokens & fonts
├── vercel.json                 # Vercel security headers & rewrites
└── vite.config.js              # Vite bundler & test configuration
```

---

## 🚀 Setup & Installation

### Prerequisites
- Node.js `v20.x` or `v22.x`
- npm `v10.x` or higher

### Installation
```bash
# Clone the repository
git clone https://github.com/DarshanS04/Portfolio.git
cd Portfolio

# Install dependencies
npm install

# Copy environment variables
cp .env.example .env
```

---

## 📜 Available Scripts

| Command | Description |
| :--- | :--- |
| `npm run dev` | Starts Vite local development server at `http://localhost:5173` |
| `npm run build` | Full pipeline: Vite build + SSR prerender + sitemap generation + prerender audit |
| `npm run build:client` | Compiles client assets only to `dist/` |
| `npm run test` | Runs the full Vitest suite (28 tests) |
| `npm run test:watch` | Runs Vitest in interactive watch mode |
| `npm run lint` | Checks JavaScript and JSX against ESLint standards |
| `npm run format` | Formats codebase using Prettier |
| `npm run prerender` | Runs the static route prerender script |
| `npm run check-prerender` | Audits prerendered HTML files for valid `<h1>`, `<title>`, and real DOM |
| `npm run preview` | Previews the prerendered production output in `dist/` |

---

## 🌐 Deploying to Vercel

1. Push your repository to GitHub (`DarshanS04/Portfolio`).
2. Go to [Vercel](https://vercel.com) and import the repository.
3. Configure the Project:
   - **Framework Preset**: Vite
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
4. Add Environment Variables (optional):
   - `VITE_SITE_URL`: `https://your-custom-domain.com` (or your `.vercel.app` URL)
   - `VITE_FORMSPREE_ENDPOINT`: `https://formspree.io/f/your_form_id`
5. Click **Deploy**. The `vercel.json` file will automatically configure security headers, SPA rewrites, and asset caching.
6. Consult [SEO.md](SEO.md) for post-deployment search engine registration steps.

---

## ✍️ How to Edit Content

All data is strictly decoupled from UI components. Modify the content files under `src/content/`:

1. **Personal Information & Bio**:
   - Edit [`src/content/profile.js`](src/content/profile.js) to update bio paragraphs, social links, CGPA, or degree information.
2. **Technical Skills**:
   - Edit [`src/content/skills.js`](src/content/skills.js) to add new languages, tools, or libraries.
3. **Internship & Experience**:
   - Edit [`src/content/experience.js`](src/content/experience.js) to append work history or achievements.

---

## ➕ How to Add a New Project

1. Open [`src/content/projects.js`](src/content/projects.js).
2. Append a new project object to the `PROJECTS` array:
   ```javascript
   {
     slug: 'your-project-slug',
     title: 'Project Title',
     subtitle: 'Project Subtitle',
     category: 'Full-Stack Web Application',
     isFlagship: false,
     fileExtension: '.jsx',
     overview: 'Concise summary for card previews...',
     techStack: ['React', 'Node.js', 'MongoDB'],
     liveUrl: 'https://demo.app',
     githubUrl: 'https://github.com/DarshanS04/your-repo',
     stats: [
       { label: 'Arch', value: 'Microservices' },
     ],
     caseStudy: {
       problem: 'Problem statement...',
       architecture: ['Client tier...', 'Server tier...'],
       keyFeatures: ['Feature 1...', 'Feature 2...'],
       challenges: ['Challenge 1...'],
       learnings: ['Learning 1...']
     }
   }
   ```
3. Run `npm run build`. The prerender script and sitemap generator will automatically detect the new slug and generate `dist/projects/your-project-slug/index.html` and an updated `sitemap.xml`!

---

## 📄 License

MIT © [Darshan Saravari](https://github.com/DarshanS04)
