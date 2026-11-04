import React from 'react';
import { Award, BookOpen, Code2, Briefcase, Terminal } from 'lucide-react';
import { PROFILE } from '@/content/profile';

export function AboutSection() {
  return (
    <section
      id="about"
      aria-labelledby="about-heading"
      className="py-20 border-b border-border-subtle/40 relative"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-12">
          <div className="inline-flex items-center gap-2 text-xs font-mono text-accent mb-2">
            <Terminal className="w-3.5 h-3.5" />
            <span>// 01. BACKGROUND</span>
          </div>
          <h2
            id="about-heading"
            className="text-3xl sm:text-4xl font-bold font-mono tracking-tight text-text-primary"
          >
            About <span className="text-accent">Me</span>
          </h2>
          <div className="h-1 w-16 bg-accent mt-3 rounded-full" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Bio Text Paragraphs */}
          <div className="lg:col-span-7 space-y-5 text-text-secondary font-sans leading-relaxed text-base sm:text-lg">
            {PROFILE.bioParagraphs.map((paragraph, idx) => (
              <p key={idx}>{paragraph}</p>
            ))}

            <div className="p-4 rounded-lg bg-bg-card border-l-4 border-accent font-mono text-xs sm:text-sm text-text-muted mt-6">
              <span className="text-accent font-semibold">$ echo $OBJECTIVE</span>
              <p className="mt-1 text-text-secondary italic">"{PROFILE.objective}"</p>
            </div>
          </div>

          {/* Quick Metrics & Highlights Grid */}
          <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="glass-panel p-5 rounded-xl border border-border-subtle">
              <div className="flex items-center justify-between text-accent mb-2">
                <Award className="w-6 h-6" />
                <span className="font-mono text-xs text-text-muted">SDMCET</span>
              </div>
              <div className="text-3xl font-extrabold font-mono text-text-primary">9.07</div>
              <div className="text-sm font-semibold text-text-secondary mt-1">Academic CGPA</div>
              <p className="text-xs text-text-muted mt-1">Information Science & Engineering</p>
            </div>

            <div className="glass-panel p-5 rounded-xl border border-border-subtle">
              <div className="flex items-center justify-between text-accent mb-2">
                <Code2 className="w-6 h-6" />
                <span className="font-mono text-xs text-text-muted">FULL-STACK</span>
              </div>
              <div className="text-3xl font-extrabold font-mono text-text-primary">3</div>
              <div className="text-sm font-semibold text-text-secondary mt-1">Flagship Projects</div>
              <p className="text-xs text-text-muted mt-1">MERN & Android ecosystems</p>
            </div>

            <div className="glass-panel p-5 rounded-xl border border-border-subtle">
              <div className="flex items-center justify-between text-accent mb-2">
                <Briefcase className="w-6 h-6" />
                <span className="font-mono text-xs text-text-muted">INDUSTRY</span>
              </div>
              <div className="text-xl font-extrabold font-mono text-text-primary">Exposys</div>
              <div className="text-sm font-semibold text-text-secondary mt-1">SDE Intern</div>
              <p className="text-xs text-text-muted mt-1">Cryptography & Auth protocols</p>
            </div>

            <div className="glass-panel p-5 rounded-xl border border-border-subtle">
              <div className="flex items-center justify-between text-accent mb-2">
                <BookOpen className="w-6 h-6" />
                <span className="font-mono text-xs text-text-muted">TARGET</span>
              </div>
              <div className="text-xl font-extrabold font-mono text-text-primary">2026 Batch</div>
              <div className="text-sm font-semibold text-text-secondary mt-1">Entry-Level SDE</div>
              <p className="text-xs text-text-muted mt-1">Ready for full-time opportunities</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

