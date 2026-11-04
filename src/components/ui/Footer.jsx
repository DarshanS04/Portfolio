import React from 'react';
import { Mail, ArrowUp, Terminal, ShieldCheck } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from '@/components/ui/Icons';
import { PROFILE } from '@/content/profile';
import { useTheme } from '@/hooks/useTheme';

export function Footer() {
  const { theme } = useTheme();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="border-t border-border-subtle bg-bg-surface/50 backdrop-blur-md pt-12 pb-8 text-text-muted transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pb-10 border-b border-border-subtle/50">
          {/* Identity & Mission */}
          <div>
            <div className="flex items-center gap-2 text-text-primary mb-3">
              <Terminal className="w-5 h-5 text-accent" />
              <span className="font-mono font-bold text-base">
                {PROFILE.name}
              </span>
            </div>
            <p className="text-sm text-text-muted leading-relaxed font-sans max-w-sm">
              {PROFILE.title}. Final-year Information Science student at SDMCET graduating in 2026.
              Open to entry-level software engineering opportunities.
            </p>
            <div className="mt-4 flex items-center gap-2 text-xs font-mono text-accent">
              <ShieldCheck className="w-4 h-4" />
              <span>Location: {PROFILE.location}</span>
            </div>
          </div>

          {/* Terminal System Status */}
          <div className="font-mono text-xs space-y-2 bg-bg-card/70 p-4 rounded-lg border border-border-subtle">
            <div className="text-text-secondary font-semibold pb-1 border-b border-border-subtle/40 flex items-center justify-between">
              <span>SYSTEM DIAGNOSTICS</span>
              <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            </div>
            <div className="flex justify-between text-text-muted">
              <span>ACTIVE_THEME</span>
              <span className="text-accent">{theme}</span>
            </div>
            <div className="flex justify-between text-text-muted">
              <span>ACADEMIC_CGPA</span>
              <span className="text-text-primary">9.07 (SDMCET)</span>
            </div>
            <div className="flex justify-between text-text-muted">
              <span>HOST_STATUS</span>
              <span className="text-emerald-400">READY_FOR_DEPLOY</span>
            </div>
            <div className="flex justify-between text-text-muted">
              <span>EXIT_CODE</span>
              <span className="text-accent">0 (SUCCESS)</span>
            </div>
          </div>

          {/* Socials & Connect */}
          <div className="flex flex-col justify-between">
            <div>
              <h3 className="font-mono text-xs uppercase tracking-wider text-text-primary font-semibold mb-3">
                Connect & Verifications
              </h3>
              <div className="flex flex-wrap gap-3">
                <a
                  href={PROFILE.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-3 py-2 rounded-md bg-bg-card border border-border-subtle hover:border-accent hover:text-accent text-xs font-mono transition-colors min-h-[44px]"
                  aria-label="GitHub Profile"
                >
                  <GithubIcon className="w-4 h-4" />
                  <span>GitHub</span>
                </a>

                <a
                  href={PROFILE.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-3 py-2 rounded-md bg-bg-card border border-border-subtle hover:border-accent hover:text-accent text-xs font-mono transition-colors min-h-[44px]"
                  aria-label="LinkedIn Profile"
                >
                  <LinkedinIcon className="w-4 h-4" />
                  <span>LinkedIn</span>
                </a>

                <a
                  href={`mailto:${PROFILE.email}`}
                  className="flex items-center gap-2 px-3 py-2 rounded-md bg-bg-card border border-border-subtle hover:border-accent hover:text-accent text-xs font-mono transition-colors min-h-[44px]"
                  aria-label="Send Email"
                >
                  <Mail className="w-4 h-4" />
                  <span>Email</span>
                </a>
              </div>
            </div>

            <button
              type="button"
              onClick={scrollToTop}
              className="mt-6 self-start inline-flex items-center gap-2 px-3 py-2 rounded-md bg-bg-surface border border-border-subtle hover:border-accent text-text-secondary hover:text-accent text-xs font-mono transition-colors min-h-[44px]"
              aria-label="Back to top"
            >
              <ArrowUp className="w-4 h-4 text-accent" />
              <span>back_to_top()</span>
            </button>
          </div>
        </div>

        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs font-mono text-text-muted gap-4">
          <p>
            © {new Date().getFullYear()} {PROFILE.name}. Built with React & Vite. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <span className="text-text-muted">Conventional Commits</span>
            <span>•</span>
            <span className="text-accent">WCAG 2.1 AA Compliant</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
