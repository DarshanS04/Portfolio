import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Terminal, Palette, FileText, Command } from 'lucide-react';
import { useTheme } from '@/hooks/useTheme';
import { PROFILE } from '@/content/profile';

const NAV_LINKS = [
  { name: 'About', href: '/#about', id: 'about' },
  { name: 'Skills', href: '/#skills', id: 'skills' },
  { name: 'Projects', href: '/#projects', id: 'projects' },
  { name: 'Experience', href: '/#experience', id: 'experience' },
  { name: 'Education', href: '/#education', id: 'education' },
  { name: 'Contact', href: '/#contact', id: 'contact' },
];

export function Navbar({ onOpenCommandPalette }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const { theme, cycleTheme, themes } = useTheme();
  const location = useLocation();
  const mobileMenuRef = useRef(null);

  // Close mobile menu on Esc key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [mobileMenuOpen]);

  // Trap focus inside mobile menu when opened
  useEffect(() => {
    if (mobileMenuOpen && mobileMenuRef.current) {
      const focusableElements = mobileMenuRef.current.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      if (focusableElements.length > 0) {
        focusableElements[0].focus();
      }
    }
  }, [mobileMenuOpen]);

  // Section observer for active section highlighting on desktop
  useEffect(() => {
    if (location.pathname !== '/') {
      setActiveSection('');
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: '-20% 0px -70% 0px' }
    );

    const sections = NAV_LINKS.map((link) => document.getElementById(link.id)).filter(Boolean);
    sections.forEach((sec) => observer.observe(sec));

    return () => observer.disconnect();
  }, [location.pathname]);

  const handleLinkClick = (href) => {
    setMobileMenuOpen(false);
    if (href.startsWith('/#')) {
      const targetId = href.replace('/#', '');
      const el = document.getElementById(targetId);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const currentThemeObj = themes.find((t) => t.id === theme) || themes[0];

  return (
    <header className="fixed top-0 left-0 right-0 z-40 bg-bg-primary/85 backdrop-blur-md border-b border-border-subtle transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand */}
        <Link
          to="/"
          className="flex items-center gap-2 group text-text-primary hover:text-accent transition-colors py-2"
          aria-label="Darshan Saravari Homepage"
        >
          <div className="w-8 h-8 rounded-md bg-bg-surface border border-border-subtle flex items-center justify-center group-hover:border-accent transition-colors">
            <Terminal className="w-4 h-4 text-accent" />
          </div>
          <span className="font-mono font-bold text-sm sm:text-base tracking-tight">
            darshan<span className="text-accent">.sh</span>
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-1 lg:gap-2" aria-label="Main Navigation">
          {NAV_LINKS.map((link) => {
            const isActive = activeSection === link.id && location.pathname === '/';
            return (
              <a
                key={link.id}
                href={link.href}
                onClick={(e) => {
                  if (location.pathname === '/') {
                    e.preventDefault();
                    handleLinkClick(link.href);
                  }
                }}
                className={`px-3 py-2 rounded-md font-mono text-xs lg:text-sm transition-all duration-150 ${
                  isActive
                    ? 'text-accent font-semibold bg-accent-muted/40'
                    : 'text-text-secondary hover:text-text-primary hover:bg-bg-surface'
                }`}
              >
                <span className="text-accent/60 mr-1">#</span>
                {link.name}
              </a>
            );
          })}
        </nav>

        {/* Actions (Command Palette, Theme Switcher, Resume, Mobile Toggle) */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Command Palette Button */}
          {onOpenCommandPalette && (
            <button
              type="button"
              onClick={onOpenCommandPalette}
              className="hidden sm:flex items-center gap-2 px-2.5 py-1.5 rounded-md bg-bg-surface border border-border-subtle text-text-muted hover:text-text-primary hover:border-border-highlight text-xs font-mono transition-colors min-h-[44px] min-w-[44px] justify-center"
              aria-label="Open Command Palette (Ctrl+K)"
              title="Open Command Palette (Ctrl+K)"
            >
              <Command className="w-3.5 h-3.5 text-accent" />
              <span className="hidden lg:inline">Cmd+K</span>
            </button>
          )}

          {/* Theme Switcher */}
          <button
            type="button"
            onClick={cycleTheme}
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-md bg-bg-surface border border-border-subtle text-text-secondary hover:text-accent hover:border-accent transition-colors min-h-[44px] min-w-[44px] justify-center text-xs font-mono"
            aria-label={`Switch theme (Current: ${currentThemeObj.name})`}
            title={`Current theme: ${currentThemeObj.name}. Click to switch.`}
          >
            <Palette className="w-3.5 h-3.5" style={{ color: currentThemeObj.accent }} />
            <span className="hidden sm:inline capitalize">{currentThemeObj.name}</span>
          </button>

          {/* Resume CTA */}
          <a
            href={PROFILE.resumeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden md:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-accent text-white font-mono text-xs font-semibold hover:bg-accent-hover transition-colors shadow-glow-sm min-h-[44px]"
            aria-label="Download Resume"
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Resume</span>
          </a>

          {/* Mobile Menu Hamburger */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-md bg-bg-surface border border-border-subtle text-text-primary hover:text-accent hover:border-accent transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center"
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-navigation"
            aria-label={mobileMenuOpen ? 'Close Navigation Menu' : 'Open Navigation Menu'}
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div
          id="mobile-navigation"
          ref={mobileMenuRef}
          className="md:hidden bg-bg-surface/95 backdrop-blur-xl border-b border-border-subtle px-4 pt-3 pb-6 space-y-2 animate-in fade-in slide-in-from-top-2 duration-200"
          role="dialog"
          aria-modal="true"
          aria-label="Mobile Navigation Drawer"
        >
          <div className="flex items-center justify-between pb-3 border-b border-border-subtle/50 mb-3">
            <span className="text-xs font-mono text-text-muted">Navigation Menu</span>
            <button
              type="button"
              onClick={() => setMobileMenuOpen(false)}
              className="p-1 rounded text-text-muted hover:text-text-primary min-h-[44px] min-w-[44px] flex items-center justify-center"
              aria-label="Close menu"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="flex flex-col space-y-1">
            {NAV_LINKS.map((link) => (
              <a
                key={link.id}
                href={link.href}
                onClick={(e) => {
                  if (location.pathname === '/') {
                    e.preventDefault();
                    handleLinkClick(link.href);
                  } else {
                    setMobileMenuOpen(false);
                  }
                }}
                className="px-3 py-3 rounded-md font-mono text-sm text-text-secondary hover:text-accent hover:bg-bg-card transition-colors flex items-center gap-2 min-h-[44px]"
              >
                <span className="text-accent">#</span>
                {link.name}
              </a>
            ))}
          </div>

          <div className="pt-4 border-t border-border-subtle/50 flex flex-col gap-2">
            {onOpenCommandPalette && (
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenCommandPalette();
                }}
                className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-md bg-bg-card border border-border-subtle text-text-secondary font-mono text-xs min-h-[44px]"
              >
                <Command className="w-4 h-4 text-accent" />
                <span>Command Palette (Ctrl+K)</span>
              </button>
            )}

            <a
              href={PROFILE.resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-md bg-accent text-white font-mono text-sm font-semibold hover:bg-accent-hover transition-colors min-h-[44px]"
            >
              <FileText className="w-4 h-4" />
              <span>Download Resume</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
}

Navbar.propTypes = {
  onOpenCommandPalette: PropTypes.func,
};
