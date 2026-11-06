import React, { useState, useEffect } from 'react';
import { ArrowDown, FileText, Mail, MapPin } from 'lucide-react';
import { TerminalWindow } from '@/components/terminal/TerminalWindow';
import { GithubIcon, LinkedinIcon } from '@/components/ui/Icons';
import { PROFILE } from '@/content/profile';

export function HeroSection() {
  const [taglineIndex, setTaglineIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setTaglineIndex((prev) => (prev + 1) % PROFILE.roleTaglines.length);
    }, 3200);
    return () => clearInterval(interval);
  }, []);

  const scrollToProjects = (e) => {
    e.preventDefault();
    const el = document.getElementById('projects');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="hero"
      aria-labelledby="hero-heading"
      className="relative pt-24 pb-16 lg:pt-32 lg:pb-24 overflow-hidden border-b border-border-subtle/40"
    >
      {/* Background ambient lighting */}
      <div
        className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[350px] bg-accent/15 blur-[120px] rounded-full pointer-events-none"
        aria-hidden="true"
      />
      <div
        className="absolute top-1/3 right-10 w-[300px] h-[300px] bg-accent-secondary/10 blur-[100px] rounded-full pointer-events-none"
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column: Semantic Info, H1, CTAs, Socials */}
          <div className="lg:col-span-6 space-y-6 text-center lg:text-left">
            {/* Status Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-accent-muted/40 border border-border-subtle text-accent text-xs font-mono">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>Available for Software Developer Roles</span>
            </div>

            {/* H1 Heading */}
            <h1
              id="hero-heading"
              className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight font-mono text-text-primary"
            >
              Hi, I'm <span className="text-accent underline decoration-accent/30 decoration-wavy decoration-2">{PROFILE.name}</span>
            </h1>

            {/* Rotating Role Tagline */}
            <div className="h-8 flex items-center justify-center lg:justify-start">
              <span className="text-lg sm:text-xl font-mono text-text-secondary flex items-center gap-2">
                <span className="text-accent">&gt;</span>
                <span className="font-semibold text-text-primary transition-all duration-300">
                  {PROFILE.roleTaglines[taglineIndex]}
                </span>
              </span>
            </div>

            {/* Real Plain-Text Bio for Search Crawlers and Immediate Readability */}
            <p className="text-base sm:text-lg text-text-muted leading-relaxed font-sans max-w-xl mx-auto lg:mx-0">
              {PROFILE.objective} Information Science graduate from SDMCET (CGPA 9.15)
              building reliable web services with React & Node.js, and native mobile apps with Android.
            </p>

            {/* Location Pill */}
            <div className="flex items-center justify-center lg:justify-start gap-1.5 text-xs font-mono text-text-muted">
              <MapPin className="w-3.5 h-3.5 text-accent" />
              <span>{PROFILE.location} · SDM College of Engineering & Technology</span>
            </div>

            {/* CTAs */}
            <div className="pt-2 flex flex-wrap items-center justify-center lg:justify-start gap-4">
              <a
                href="#projects"
                onClick={scrollToProjects}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-accent text-white font-mono text-sm font-semibold hover:bg-accent-hover transition-all shadow-glow-md min-h-[44px]"
              >
                <span>View Projects</span>
                <ArrowDown className="w-4 h-4" />
              </a>

              <a
                href={PROFILE.resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-bg-surface border border-border-subtle hover:border-accent text-text-primary hover:text-accent font-mono text-sm transition-all min-h-[44px]"
              >
                <FileText className="w-4 h-4" />
                <span>Download Resume</span>
              </a>
            </div>

            {/* Social Links */}
            <div className="pt-2 flex items-center justify-center lg:justify-start gap-4 text-text-muted">
              <span className="text-xs font-mono uppercase tracking-wider text-text-muted">Socials:</span>
              <a
                href={PROFILE.github}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-lg bg-bg-card border border-border-subtle hover:border-accent text-text-secondary hover:text-accent transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center"
                aria-label="Darshan Saravari GitHub Profile"
              >
                <GithubIcon className="w-5 h-5" />
              </a>

              <a
                href={PROFILE.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-lg bg-bg-card border border-border-subtle hover:border-accent text-text-secondary hover:text-accent transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center"
                aria-label="Darshan Saravari LinkedIn Profile"
              >
                <LinkedinIcon className="w-5 h-5" />
              </a>

              <a
                href={`mailto:${PROFILE.email}`}
                className="p-2.5 rounded-lg bg-bg-card border border-border-subtle hover:border-accent text-text-secondary hover:text-accent transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center"
                aria-label="Email Darshan Saravari"
              >
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Right Column: Custom Terminal Window */}
          <div className="lg:col-span-6 w-full">
            <TerminalWindow className="w-full shadow-2xl" />
          </div>
        </div>
      </div>
    </section>
  );
}
