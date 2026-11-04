import React from 'react';
import { Terminal, GitCommit, Calendar, MapPin, Briefcase } from 'lucide-react';
import { EXPERIENCES } from '@/content/experience';

export function ExperienceSection() {
  return (
    <section
      id="experience"
      aria-labelledby="experience-heading"
      className="py-20 border-b border-border-subtle/40 relative"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-12">
          <div className="inline-flex items-center gap-2 text-xs font-mono text-accent mb-2">
            <Terminal className="w-3.5 h-3.5" />
            <span>// 04. EXPERIENCE TIMELINE</span>
          </div>
          <h2
            id="experience-heading"
            className="text-3xl sm:text-4xl font-bold font-mono tracking-tight text-text-primary"
          >
            Engineering <span className="text-accent">Experience</span>
          </h2>
          <div className="h-1 w-16 bg-accent mt-3 rounded-full" />
          <p className="mt-3 text-sm font-mono text-text-muted">
            git log --graph --pretty=format:'%h %d %s (%cr)'
          </p>
        </div>

        {/* Git-Log Timeline Container */}
        <div className="relative pl-6 sm:pl-8 border-l-2 border-border-highlight/60 space-y-10">
          {EXPERIENCES.map((exp) => (
            <div key={exp.id} className="relative group">
              {/* Commit Node Marker */}
              <div className="absolute -left-[31px] sm:-left-[39px] top-1.5 w-5 h-5 rounded-full bg-bg-primary border-2 border-accent flex items-center justify-center group-hover:scale-110 transition-transform">
                <span className="w-2 h-2 rounded-full bg-accent" />
              </div>

              {/* Commit Metadata Box */}
              <div className="terminal-shell rounded-xl border border-border-subtle bg-bg-terminal overflow-hidden shadow-xl">
                {/* Git Log Header */}
                <div className="bg-bg-surface px-4 py-2.5 border-b border-border-subtle flex flex-wrap items-center justify-between gap-2 text-xs font-mono">
                  <div className="flex items-center gap-2">
                    <GitCommit className="w-4 h-4 text-accent" />
                    <span className="text-accent font-bold">commit {exp.commitHash}</span>
                    <span className="text-text-muted hidden sm:inline">(HEAD -&gt; main)</span>
                  </div>

                  <div className="flex items-center gap-4 text-text-muted">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-accent" />
                      <span>{exp.period}</span>
                    </span>
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-accent" />
                      <span>{exp.location}</span>
                    </span>
                  </div>
                </div>

                {/* Git Log Content */}
                <div className="p-5 sm:p-6 space-y-4">
                  <div>
                    <div className="flex flex-wrap items-center gap-2 mb-1">
                      <Briefcase className="w-4 h-4 text-accent" />
                      <h3 className="text-lg sm:text-xl font-bold font-mono text-text-primary">
                        {exp.role} <span className="text-accent">@ {exp.company}</span>
                      </h3>
                      <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-accent-muted/40 text-accent border border-border-subtle">
                        {exp.employmentType}
                      </span>
                    </div>

                    <p className="font-mono text-xs sm:text-sm text-accent/90 mt-1">
                      {exp.tagline}
                    </p>
                  </div>

                  <p className="text-xs sm:text-sm text-text-secondary font-sans leading-relaxed">
                    {exp.description}
                  </p>

                  {/* Bullet achievements */}
                  <div className="space-y-2 pt-1">
                    <span className="text-xs font-mono text-text-muted block font-semibold">
                      ENGINEERING CONTRIBUTIONS:
                    </span>
                    <ul className="space-y-2 font-sans text-xs sm:text-sm text-text-secondary">
                      {exp.keyAchievements.map((item, idx) => (
                        <li key={idx} className="flex items-start gap-2.5">
                          <span className="text-accent font-mono font-bold mt-0.5">*</span>
                          <span className="leading-relaxed">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Tech stack tags */}
                  <div className="pt-2 flex flex-wrap gap-1.5">
                    {exp.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="text-[11px] font-mono px-2.5 py-1 rounded bg-bg-surface border border-border-subtle text-text-secondary"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
