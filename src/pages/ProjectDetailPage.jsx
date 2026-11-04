import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import {
  ArrowLeft,
  Terminal,
  ExternalLink,
  CheckCircle2,
  AlertTriangle,
  Lightbulb,
  Cpu,
  Layers,
  Star,
} from 'lucide-react';
import { GithubIcon } from '@/components/ui/Icons';
import { PROJECTS } from '@/content/projects';
import { PROFILE } from '@/content/profile';

export function ProjectDetailPage() {
  const { slug } = useParams();
  const project = PROJECTS.find((p) => p.slug === slug);

  if (!project) {
    return (
      <main id="main-content" className="min-h-screen pt-28 pb-16 px-4 max-w-4xl mx-auto font-mono">
        <h1 className="text-2xl text-red-400 font-bold">Project Not Found</h1>
        <p className="text-text-muted mt-2">The specified project slug does not exist.</p>
        <Link
          to="/#projects"
          className="mt-4 inline-flex items-center gap-2 text-accent hover:underline min-h-[44px]"
        >
          <ArrowLeft className="w-4 h-4" /> Back to projects
        </Link>
      </main>
    );
  }

  const projectUrl = `${PROFILE.siteUrl}/projects/${project.slug}`;

  // Structured Data Schema for Project Page (SoftwareSourceCode / CreativeWork)
  const jsonLdSchema = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareSourceCode',
    name: project.title,
    headline: project.subtitle,
    description: project.overview,
    codeRepository: project.githubUrl,
    programmingLanguage: project.techStack.join(', '),
    author: {
      '@type': 'Person',
      name: PROFILE.name,
      url: PROFILE.siteUrl,
    },
    url: projectUrl,
  };

  // Find next and previous projects for navigation
  const currentIndex = PROJECTS.findIndex((p) => p.slug === slug);
  const prevProject = currentIndex > 0 ? PROJECTS[currentIndex - 1] : null;
  const nextProject = currentIndex < PROJECTS.length - 1 ? PROJECTS[currentIndex + 1] : null;

  return (
    <>
      <Helmet>
        <title>{`${project.title} | Darshan Saravari`}</title>
        <meta name="description" content={project.overview.slice(0, 155)} />
        <link rel="canonical" href={projectUrl} />
        <meta property="og:title" content={`${project.title} - Case Study`} />
        <meta property="og:description" content={project.overview.slice(0, 155)} />
        <meta property="og:url" content={projectUrl} />
        <meta property="og:type" content="article" />
        <meta name="twitter:title" content={`${project.title} - Case Study`} />
        <meta name="twitter:description" content={project.overview.slice(0, 155)} />
        <script type="application/ld+json">{JSON.stringify(jsonLdSchema)}</script>
      </Helmet>

      <main id="main-content" className="min-h-screen pt-24 pb-20 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Navigation Breadcrumb */}
        <div className="mb-6">
          <Link
            to="/#projects"
            className="inline-flex items-center gap-2 text-text-muted hover:text-accent font-mono text-xs sm:text-sm transition-colors py-2"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>cd .. / projects</span>
          </Link>
        </div>

        {/* Project Header Card */}
        <article className="terminal-shell rounded-2xl overflow-hidden border border-border-subtle bg-bg-terminal p-6 sm:p-8 mb-12 shadow-2xl">
          <div className="flex flex-wrap items-center justify-between gap-3 pb-6 border-b border-border-subtle/50 mb-6">
            <div className="flex items-center gap-2 text-xs font-mono text-accent">
              <Terminal className="w-4 h-4" />
              <span>CASE_STUDY: {project.slug}{project.fileExtension}</span>
            </div>

            <div className="flex items-center gap-3">
              {project.isFlagship && (
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-accent/20 border border-accent/40 text-accent font-mono text-xs font-semibold">
                  <Star className="w-3.5 h-3.5 fill-accent" />
                  <span>Flagship Project</span>
                </span>
              )}

              <span className="text-xs font-mono px-2.5 py-1 rounded bg-bg-surface border border-border-subtle text-text-secondary">
                {project.category}
              </span>
            </div>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-mono font-extrabold tracking-tight text-text-primary mb-3">
            {project.title}
          </h1>

          <p className="text-base sm:text-lg text-text-secondary font-sans leading-relaxed mb-6">
            {project.subtitle}
          </p>

          {/* Quick Metrics Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 py-4 border-y border-border-subtle/50 mb-6">
            {project.stats.map((st) => (
              <div key={st.label} className="p-2 font-mono">
                <span className="text-[11px] text-text-muted uppercase block">{st.label}</span>
                <span className="text-sm sm:text-base font-bold text-accent block">{st.value}</span>
              </div>
            ))}
          </div>

          {/* Tech Stack Chips */}
          <div className="flex flex-wrap items-center gap-2 mb-8">
            <span className="text-xs font-mono text-text-muted mr-1">Stack:</span>
            {project.techStack.map((tech) => (
              <span
                key={tech}
                className="px-2.5 py-1 rounded bg-bg-surface border border-border-subtle text-text-secondary font-mono text-xs"
              >
                {tech}
              </span>
            ))}
          </div>

          {/* External Action Links */}
          <div className="flex flex-wrap items-center gap-4">
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-bg-surface hover:bg-bg-card border border-border-subtle hover:border-accent text-text-primary hover:text-accent font-mono text-xs font-semibold transition-colors min-h-[44px]"
            >
              <GithubIcon className="w-4 h-4" />
              <span>Source Repository</span>
            </a>

            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-accent text-white font-mono text-xs font-semibold hover:bg-accent-hover transition-colors shadow-glow-sm min-h-[44px]"
              >
                <ExternalLink className="w-4 h-4" />
                <span>
                  {project.liveUrl.includes('TODO') ? 'Live Demo (Placeholder)' : 'Launch Application'}
                </span>
              </a>
            )}
          </div>
        </article>

        {/* Case Study In-Depth Breakdown */}
        <div className="space-y-12">
          {/* Problem Statement */}
          <section className="glass-panel rounded-xl p-6 sm:p-8 border border-border-subtle">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 rounded-lg bg-red-500/10 border border-red-500/30 text-red-400">
                <AlertTriangle className="w-5 h-5" />
              </div>
              <h2 className="text-xl sm:text-2xl font-mono font-bold text-text-primary">
                The Problem & Background
              </h2>
            </div>
            <p className="text-text-secondary font-sans text-base leading-relaxed">
              {project.caseStudy.problem}
            </p>
          </section>

          {/* Architecture */}
          <section className="glass-panel rounded-xl p-6 sm:p-8 border border-border-subtle">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 rounded-lg bg-accent-muted/40 border border-accent/40 text-accent">
                <Layers className="w-5 h-5" />
              </div>
              <h2 className="text-xl sm:text-2xl font-mono font-bold text-text-primary">
                System Architecture
              </h2>
            </div>
            <div className="space-y-3 font-mono text-xs sm:text-sm">
              {project.caseStudy.architecture.map((item, idx) => (
                <div key={idx} className="p-3.5 rounded-lg bg-bg-surface/80 border border-border-subtle flex items-start gap-3">
                  <span className="text-accent font-bold">&gt;</span>
                  <span className="text-text-secondary leading-relaxed">{item}</span>
                </div>
              ))}
            </div>
          </section>

          {/* Key Features */}
          <section className="glass-panel rounded-xl p-6 sm:p-8 border border-border-subtle">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-400">
                <CheckCircle2 className="w-5 h-5" />
              </div>
              <h2 className="text-xl sm:text-2xl font-mono font-bold text-text-primary">
                Key Engineering Features
              </h2>
            </div>
            <ul className="space-y-3 font-sans text-sm sm:text-base text-text-secondary">
              {project.caseStudy.keyFeatures.map((feat, idx) => (
                <li key={idx} className="flex items-start gap-3">
                  <span className="text-emerald-400 font-bold mt-1">✔</span>
                  <span className="leading-relaxed">{feat}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* Challenges & Solutions */}
          <section className="glass-panel rounded-xl p-6 sm:p-8 border border-border-subtle">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 rounded-lg bg-yellow-500/10 border border-yellow-500/30 text-yellow-400">
                <Cpu className="w-5 h-5" />
              </div>
              <h2 className="text-xl sm:text-2xl font-mono font-bold text-text-primary">
                Engineering Challenges Overcome
              </h2>
            </div>
            <div className="space-y-4">
              {project.caseStudy.challenges.map((ch, idx) => (
                <div key={idx} className="p-4 rounded-lg bg-bg-surface/80 border border-border-subtle">
                  <p className="text-xs sm:text-sm font-sans text-text-secondary leading-relaxed">
                    {ch}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* Key Learnings */}
          <section className="glass-panel rounded-xl p-6 sm:p-8 border border-border-subtle">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 rounded-lg bg-cyan-500/10 border border-cyan-500/30 text-cyan-400">
                <Lightbulb className="w-5 h-5" />
              </div>
              <h2 className="text-xl sm:text-2xl font-mono font-bold text-text-primary">
                Key Takeaways & Learnings
              </h2>
            </div>
            <ul className="space-y-3 font-sans text-sm sm:text-base text-text-secondary">
              {project.caseStudy.learnings.map((lrn, idx) => (
                <li key={idx} className="flex items-start gap-3">
                  <span className="text-cyan-400 font-bold mt-1">★</span>
                  <span className="leading-relaxed">{lrn}</span>
                </li>
              ))}
            </ul>
          </section>
        </div>

        {/* Project Pagination Footer */}
        <div className="mt-16 pt-8 border-t border-border-subtle/50 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-xs sm:text-sm">
          {prevProject ? (
            <Link
              to={`/projects/${prevProject.slug}`}
              className="text-text-muted hover:text-accent flex items-center gap-2 p-2"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Prev: {prevProject.title}</span>
            </Link>
          ) : (
            <span />
          )}

          {nextProject ? (
            <Link
              to={`/projects/${nextProject.slug}`}
              className="text-text-muted hover:text-accent flex items-center gap-2 p-2 ml-auto"
            >
              <span>Next: {nextProject.title}</span>
              <ArrowLeft className="w-4 h-4 rotate-180" />
            </Link>
          ) : (
            <span />
          )}
        </div>
      </main>
    </>
  );
}
