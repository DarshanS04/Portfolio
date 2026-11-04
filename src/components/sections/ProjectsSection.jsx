import React from 'react';
import { Link } from 'react-router-dom';
import { Terminal, ExternalLink, ArrowRight, Star, FileCode } from 'lucide-react';
import { GithubIcon } from '@/components/ui/Icons';
import { PROJECTS } from '@/content/projects';

export function ProjectsSection() {
  return (
    <section
      id="projects"
      aria-labelledby="projects-heading"
      className="py-20 border-b border-border-subtle/40 relative"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-12">
          <div className="inline-flex items-center gap-2 text-xs font-mono text-accent mb-2">
            <Terminal className="w-3.5 h-3.5" />
            <span>// 03. SOFTWARE PORTFOLIO</span>
          </div>
          <h2
            id="projects-heading"
            className="text-3xl sm:text-4xl font-bold font-mono tracking-tight text-text-primary"
          >
            Featured <span className="text-accent">Projects</span>
          </h2>
          <div className="h-1 w-16 bg-accent mt-3 rounded-full" />
          <p className="mt-3 text-sm font-mono text-text-muted">
            Click any project to inspect its end-to-end case study architecture & source learnings.
          </p>
        </div>

        {/* 3/2/1 Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {PROJECTS.map((project) => (
            <div
              key={project.slug}
              className={`glass-panel rounded-xl overflow-hidden flex flex-col justify-between border transition-all duration-300 hover:shadow-glow-md group ${
                project.isFlagship
                  ? 'border-accent/40 bg-bg-card/90 ring-1 ring-accent/20'
                  : 'border-border-subtle hover:border-border-highlight'
              }`}
            >
              {/* Card Editor Tab Header */}
              <div>
                <div className="bg-bg-surface/90 px-4 py-2 border-b border-border-subtle flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <FileCode className="w-4 h-4 text-accent" />
                    <span className="font-mono text-xs text-text-primary font-semibold">
                      {project.slug}
                      <span className="text-accent">{project.fileExtension}</span>
                    </span>
                  </div>

                  {project.isFlagship && (
                    <span className="inline-flex items-center gap-1 text-[11px] font-mono px-2 py-0.5 rounded bg-accent/20 text-accent font-semibold border border-accent/40">
                      <Star className="w-3 h-3 fill-accent" />
                      <span>Flagship</span>
                    </span>
                  )}
                </div>

                {/* Card Body */}
                <div className="p-5 sm:p-6 space-y-4">
                  <div>
                    <span className="text-xs font-mono text-accent tracking-wider uppercase">
                      {project.category}
                    </span>
                    <h3 className="text-lg sm:text-xl font-bold font-mono text-text-primary group-hover:text-accent transition-colors mt-1">
                      <Link to={`/projects/${project.slug}`} className="hover:underline">
                        {project.title}
                      </Link>
                    </h3>
                  </div>

                  <p className="text-xs sm:text-sm text-text-muted font-sans leading-relaxed line-clamp-3">
                    {project.overview}
                  </p>

                  {/* Tech Stack Chips */}
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {project.techStack.map((tech) => (
                      <span
                        key={tech}
                        className="text-[11px] font-mono px-2 py-0.5 rounded bg-bg-surface border border-border-subtle text-text-secondary"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Card Footer Actions */}
              <div className="p-5 sm:p-6 pt-0 border-t border-border-subtle/50 mt-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded bg-bg-surface hover:bg-bg-card border border-border-subtle hover:border-accent text-text-muted hover:text-accent transition-colors min-h-[40px] min-w-[40px] flex items-center justify-center"
                    aria-label={`GitHub repository for ${project.title}`}
                    title="View Source on GitHub"
                  >
                    <GithubIcon className="w-4 h-4" />
                  </a>

                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded bg-bg-surface hover:bg-bg-card border border-border-subtle hover:border-accent text-text-muted hover:text-accent transition-colors min-h-[40px] min-w-[40px] flex items-center justify-center"
                      aria-label={`Live demo for ${project.title}`}
                      title={project.liveUrl.includes('TODO') ? 'Live demo link placeholder' : 'Open Live Demo'}
                    >
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  )}
                </div>

                <Link
                  to={`/projects/${project.slug}`}
                  className="inline-flex items-center gap-1.5 text-xs font-mono font-semibold text-accent hover:text-accent-hover transition-colors py-2 px-2"
                >
                  <span>Case Study</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
