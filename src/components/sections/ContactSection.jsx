import React, { useState } from 'react';
import { Terminal, Mail, MapPin, ExternalLink, Copy, Check } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from '@/components/ui/Icons';
import { PROFILE } from '@/content/profile';

export function ContactSection() {
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = (e) => {
    e.preventDefault();
    e.stopPropagation();
    try {
      navigator.clipboard.writeText(PROFILE.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // ignore
    }
  };

  const contactChannels = [
    {
      id: 'email',
      name: 'Email Address',
      value: PROFILE.email,
      href: `mailto:${PROFILE.email}`,
      icon: Mail,
      isExternal: false,
      hasCopy: true,
      description: 'Direct inbox for job opportunities and inquiries',
    },
    {
      id: 'github',
      name: 'GitHub',
      value: 'github.com/DarshanS04',
      href: PROFILE.github,
      icon: GithubIcon,
      isExternal: true,
      hasCopy: false,
      description: 'Explore open-source repositories and code history',
    },
    {
      id: 'linkedin',
      name: 'LinkedIn',
      value: 'linkedin.com/in/darshan-saravari',
      href: PROFILE.linkedin,
      icon: LinkedinIcon,
      isExternal: true,
      hasCopy: false,
      description: 'Professional background, verifications, and network',
    },
    {
      id: 'location',
      name: 'Location',
      value: PROFILE.location,
      href: null,
      icon: MapPin,
      isExternal: false,
      hasCopy: false,
      description: 'SDM College of Engineering & Technology (SDMCET)',
    },
  ];

  return (
    <section
      id="contact"
      aria-labelledby="contact-heading"
      className="py-20 relative"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 text-xs font-mono text-accent mb-2">
            <Terminal className="w-3.5 h-3.5" />
            <span>// 06. INITIATE TRANSMISSION</span>
          </div>
          <h2
            id="contact-heading"
            className="text-3xl sm:text-4xl font-bold font-mono tracking-tight text-text-primary"
          >
            Get in <span className="text-accent">Touch</span>
          </h2>
          <div className="h-1 w-16 bg-accent mt-3 rounded-full mx-auto" />
          <p className="mt-4 text-sm font-mono text-text-muted leading-relaxed">
            Open to software engineering roles, technical inquiries, and project discussions.
            Feel free to reach out directly through any channel below.
          </p>
        </div>

        {/* Contact Details Grid */}
        <div className="max-w-4xl mx-auto">
          <div className="terminal-shell rounded-2xl border border-border-subtle bg-bg-terminal overflow-hidden shadow-2xl">
            {/* Terminal Header */}
            <div className="bg-bg-surface px-5 py-3 border-b border-border-subtle flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1.5" aria-hidden="true">
                  <span className="w-3 h-3 rounded-full bg-red-500/80 inline-block" />
                  <span className="w-3 h-3 rounded-full bg-yellow-500/80 inline-block" />
                  <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block" />
                </div>
                <span className="ml-3 font-mono text-xs text-text-muted flex items-center gap-1.5">
                  <Terminal className="w-3.5 h-3.5 text-accent" />
                  <span>darshan@portfolio: ~/direct-contact</span>
                </span>
              </div>
              <span className="text-[11px] font-mono text-emerald-400 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>status: available</span>
              </span>
            </div>

            {/* Channels Grid */}
            <div className="p-6 sm:p-8 grid grid-cols-1 md:grid-cols-2 gap-5">
              {contactChannels.map((channel) => {
                const IconComponent = channel.icon;
                const isClickable = Boolean(channel.href);

                const CardContent = (
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-start gap-4">
                      <div className="p-3 rounded-xl bg-accent-muted/30 border border-border-subtle text-accent flex-shrink-0 group-hover:border-accent group-hover:bg-accent-muted/50 transition-colors">
                        <IconComponent className="w-5 h-5" />
                      </div>
                      <div className="space-y-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-mono uppercase tracking-wider text-text-muted font-semibold">
                            {channel.name}
                          </span>
                          {channel.isExternal && (
                            <ExternalLink className="w-3 h-3 text-text-muted opacity-70 group-hover:text-accent transition-colors" />
                          )}
                        </div>
                        <p className="font-mono text-sm sm:text-base font-bold text-text-primary group-hover:text-accent transition-colors truncate">
                          {channel.value}
                        </p>
                        <p className="text-xs text-text-muted font-sans line-clamp-1">
                          {channel.description}
                        </p>
                      </div>
                    </div>

                    {channel.hasCopy && (
                      <button
                        type="button"
                        onClick={handleCopyEmail}
                        className="p-2 rounded-lg bg-bg-surface hover:bg-bg-card border border-border-subtle hover:border-accent text-text-muted hover:text-accent transition-colors flex-shrink-0 min-h-[38px] min-w-[38px] flex items-center justify-center"
                        aria-label="Copy email address"
                        title="Copy to clipboard"
                      >
                        {copied ? (
                          <Check className="w-4 h-4 text-emerald-400" />
                        ) : (
                          <Copy className="w-4 h-4" />
                        )}
                      </button>
                    )}
                  </div>
                );

                if (isClickable) {
                  return (
                    <a
                      key={channel.id}
                      href={channel.href}
                      target={channel.isExternal ? '_blank' : undefined}
                      rel={channel.isExternal ? 'noopener noreferrer' : undefined}
                      className="group glass-panel rounded-xl p-5 border border-border-subtle hover:border-accent hover:shadow-glow-sm transition-all duration-200 block"
                      aria-label={`${channel.name}: ${channel.value}`}
                    >
                      {CardContent}
                    </a>
                  );
                }

                return (
                  <div
                    key={channel.id}
                    className="glass-panel rounded-xl p-5 border border-border-subtle"
                  >
                    {CardContent}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
