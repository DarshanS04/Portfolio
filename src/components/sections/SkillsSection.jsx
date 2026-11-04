import React, { useState } from 'react';
import { Terminal, Copy, Check, Code, LayoutGrid } from 'lucide-react';
import { SKILLS_DATA, PACKAGE_JSON_SKILLS } from '@/content/skills';

export function SkillsSection() {
  const [viewMode, setViewMode] = useState('chips'); // 'chips' | 'json'
  const [copied, setCopied] = useState(false);

  const handleCopyJson = () => {
    try {
      navigator.clipboard.writeText(JSON.stringify(PACKAGE_JSON_SKILLS, null, 2));
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // ignore
    }
  };

  return (
    <section
      id="skills"
      aria-labelledby="skills-heading"
      className="py-20 border-b border-border-subtle/40 relative"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header with View Mode Switcher */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-mono text-accent mb-2">
              <Terminal className="w-3.5 h-3.5" />
              <span>// 02. ARSENAL</span>
            </div>
            <h2
              id="skills-heading"
              className="text-3xl sm:text-4xl font-bold font-mono tracking-tight text-text-primary"
            >
              Skills & <span className="text-accent">Technologies</span>
            </h2>
            <div className="h-1 w-16 bg-accent mt-3 rounded-full" />
          </div>

          {/* Toggle buttons between Chips and package.json format */}
          <div className="flex items-center gap-1 p-1 rounded-lg bg-bg-surface border border-border-subtle self-start sm:self-auto font-mono text-xs">
            <button
              type="button"
              onClick={() => setViewMode('chips')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md transition-all min-h-[38px] ${
                viewMode === 'chips'
                  ? 'bg-accent text-white font-semibold shadow-glow-sm'
                  : 'text-text-muted hover:text-text-primary'
              }`}
              aria-label="Switch to Visual Chips View"
            >
              <LayoutGrid className="w-3.5 h-3.5" />
              <span>Categorized</span>
            </button>

            <button
              type="button"
              onClick={() => setViewMode('json')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md transition-all min-h-[38px] ${
                viewMode === 'json'
                  ? 'bg-accent text-white font-semibold shadow-glow-sm'
                  : 'text-text-muted hover:text-text-primary'
              }`}
              aria-label="Switch to package.json View"
            >
              <Code className="w-3.5 h-3.5" />
              <span>package.json</span>
            </button>
          </div>
        </div>

        {/* View Mode 1: Categorized Skill Cards (Chips, strictly NO percentage bars) */}
        {viewMode === 'chips' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {SKILLS_DATA.categories.map((cat) => (
              <div
                key={cat.key}
                className="glass-panel rounded-xl p-6 border border-border-subtle flex flex-col justify-between hover:border-accent/50 transition-all duration-200"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-mono text-base font-bold text-text-primary flex items-center gap-2">
                      <span className="text-accent">#</span>
                      <span>{cat.name}</span>
                    </h3>
                    <span className="text-[11px] font-mono text-text-muted bg-bg-surface px-2 py-0.5 rounded border border-border-subtle">
                      {cat.skills.length} items
                    </span>
                  </div>
                  <p className="text-xs text-text-muted font-sans mb-4">{cat.description}</p>
                </div>

                {/* Skill Chips */}
                <div className="flex flex-wrap gap-2 pt-2">
                  {cat.skills.map((skill) => (
                    <span
                      key={skill}
                      className="px-3 py-1.5 rounded-md bg-bg-surface/80 border border-border-subtle hover:border-accent hover:text-accent font-mono text-xs text-text-secondary transition-colors cursor-default"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* View Mode 2: Code Editor Tab with package.json syntax */
          <div className="terminal-shell rounded-xl overflow-hidden border border-border-subtle shadow-xl bg-bg-terminal">
            {/* Editor Top Bar with File Tab & Copy Button */}
            <div className="bg-bg-surface px-4 py-2 border-b border-border-subtle flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1.5" aria-hidden="true">
                  <span className="w-2.5 h-2.5 rounded-full bg-red-500/80 inline-block" />
                  <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/80 inline-block" />
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80 inline-block" />
                </div>
                <div className="ml-3 px-3 py-1 rounded-t bg-bg-terminal text-text-primary font-mono text-xs border-t border-x border-border-subtle flex items-center gap-1.5">
                  <span className="text-accent">{}</span>
                  <span>package.json</span>
                </div>
              </div>

              <button
                type="button"
                onClick={handleCopyJson}
                className="flex items-center gap-1.5 text-xs font-mono text-text-muted hover:text-accent px-2.5 py-1 rounded bg-bg-card border border-border-subtle transition-colors min-h-[34px]"
                aria-label="Copy JSON code"
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span className="text-emerald-400">Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copy JSON</span>
                  </>
                )}
              </button>
            </div>

            {/* Code Output Block */}
            <div className="p-4 sm:p-6 overflow-x-auto font-mono text-xs sm:text-sm leading-relaxed text-text-secondary">
              <pre className="text-text-secondary">
                <code>
                  {JSON.stringify(PACKAGE_JSON_SKILLS, null, 2)}
                </code>
              </pre>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
