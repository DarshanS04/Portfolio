import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import {
  Search,
  Terminal,
  FolderCode,
  FileText,
  Palette,
  Sparkles,
  X,
  ArrowRight,
} from 'lucide-react';
import { PROJECTS } from '@/content/projects';
import { PROFILE } from '@/content/profile';
import { useTheme } from '@/hooks/useTheme';
import confetti from 'canvas-confetti';

export function CommandPalette({ isOpen, onClose }) {
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef(null);
  const navigate = useNavigate();
  const { setTheme, themes } = useTheme();

  // Define searchable action items
  const items = [
    {
      id: 'sec-about',
      title: 'Navigate to About',
      category: 'Sections',
      icon: Terminal,
      action: () => {
        navigate('/#about');
        const el = document.getElementById('about');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      },
    },
    {
      id: 'sec-skills',
      title: 'Navigate to Skills',
      category: 'Sections',
      icon: Terminal,
      action: () => {
        navigate('/#skills');
        const el = document.getElementById('skills');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      },
    },
    {
      id: 'sec-projects',
      title: 'Navigate to Projects',
      category: 'Sections',
      icon: FolderCode,
      action: () => {
        navigate('/#projects');
        const el = document.getElementById('projects');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      },
    },
    {
      id: 'sec-experience',
      title: 'Navigate to Experience',
      category: 'Sections',
      icon: Terminal,
      action: () => {
        navigate('/#experience');
        const el = document.getElementById('experience');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      },
    },
    {
      id: 'sec-education',
      title: 'Navigate to Education',
      category: 'Sections',
      icon: Terminal,
      action: () => {
        navigate('/#education');
        const el = document.getElementById('education');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      },
    },
    {
      id: 'sec-contact',
      title: 'Navigate to Contact',
      category: 'Sections',
      icon: Terminal,
      action: () => {
        navigate('/#contact');
        const el = document.getElementById('contact');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      },
    },
    ...PROJECTS.map((p) => ({
      id: `proj-${p.slug}`,
      title: `Case Study: ${p.title}`,
      subtitle: p.subtitle,
      category: 'Projects',
      icon: FolderCode,
      action: () => navigate(`/projects/${p.slug}`),
    })),
    {
      id: 'act-resume',
      title: 'Download Verified Resume (PDF)',
      category: 'Actions',
      icon: FileText,
      action: () => window.open(PROFILE.resumeUrl, '_blank', 'noopener,noreferrer'),
    },
    ...themes.map((t) => ({
      id: `theme-${t.id}`,
      title: `Switch Theme: ${t.name}`,
      category: 'Theming',
      icon: Palette,
      action: () => setTheme(t.id),
    })),
    {
      id: 'act-hire',
      title: 'sudo hire darshan (Trigger Confetti Protocol)',
      category: 'Easter Egg',
      icon: Sparkles,
      action: () => {
        try {
          confetti({
            particleCount: 130,
            spread: 90,
            origin: { y: 0.5 },
            colors: ['#6366f1', '#00ff66', '#bd93f9', '#ff007f'],
          });
        } catch {
          // ignore
        }
      },
    },
  ];

  const filteredItems = items.filter(
    (item) =>
      item.title.toLowerCase().includes(query.toLowerCase()) ||
      (item.subtitle && item.subtitle.toLowerCase().includes(query.toLowerCase())) ||
      item.category.toLowerCase().includes(query.toLowerCase())
  );

  useEffect(() => {
    if (isOpen) {
      setQuery('');
      setSelectedIndex(0);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isOpen]);

  useEffect(() => {
    setSelectedIndex(0);
  }, [query]);

  // Global Ctrl+K / Cmd+K listener
  useEffect(() => {
    const handleGlobalKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        if (isOpen) {
          onClose();
        } else {
          // Trigger open via synthetic custom event or parent callback
          const event = new CustomEvent('open-command-palette');
          window.dispatchEvent(event);
        }
      }
    };
    window.addEventListener('keydown', handleGlobalKeyDown);
    return () => window.removeEventListener('keydown', handleGlobalKeyDown);
  }, [isOpen, onClose]);

  const handleKeyDown = (e) => {
    if (e.key === 'Escape') {
      e.preventDefault();
      onClose();
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev + 1) % Math.max(1, filteredItems.length));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev - 1 + filteredItems.length) % Math.max(1, filteredItems.length));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (filteredItems[selectedIndex]) {
        filteredItems[selectedIndex].action();
        onClose();
      }
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 animate-in fade-in duration-150"
      role="dialog"
      aria-modal="true"
      aria-label="Command Palette"
    >
      {/* Backdrop overlay */}
      <div
        className="fixed inset-0 bg-black/70 backdrop-blur-sm"
        aria-hidden="true"
        onClick={onClose}
      />

      <div className="relative w-full max-w-2xl terminal-shell rounded-xl border border-border-subtle bg-bg-terminal overflow-hidden shadow-2xl animate-in zoom-in-95 duration-150">
        {/* Search Input Bar */}
        <div className="flex items-center gap-3 px-4 py-3.5 border-b border-border-subtle bg-bg-surface">
          <Search className="w-4 h-4 text-accent" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Search commands, sections, case studies, or themes..."
            className="flex-1 bg-transparent text-sm font-mono text-text-primary focus:outline-none placeholder-text-muted"
            aria-label="Type a command to search"
          />
          <button
            type="button"
            onClick={onClose}
            className="p-1 rounded text-text-muted hover:text-text-primary min-h-[30px]"
            aria-label="Close command palette"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Results List */}
        <div className="max-h-80 overflow-y-auto p-2 space-y-1 font-mono text-xs">
          {filteredItems.length === 0 ? (
            <div className="py-8 text-center text-text-muted">
              No matching instructions or projects found.
            </div>
          ) : (
            filteredItems.map((item, idx) => {
              const Icon = item.icon;
              const isSelected = idx === selectedIndex;
              return (
                <button
                  type="button"
                  key={item.id}
                  onClick={() => {
                    item.action();
                    onClose();
                  }}
                  onMouseEnter={() => setSelectedIndex(idx)}
                  className={`w-full text-left flex items-center justify-between p-2.5 rounded-lg cursor-pointer transition-colors ${
                    isSelected
                      ? 'bg-accent/20 text-accent font-semibold border border-accent/40'
                      : 'text-text-secondary hover:bg-bg-surface border border-transparent'
                  }`}
                >
                  <div className="flex items-center gap-2.5 truncate">
                    <Icon className="w-4 h-4 flex-shrink-0 text-accent" />
                    <span className="truncate">{item.title}</span>
                  </div>

                  <div className="flex items-center gap-2 text-[10px] text-text-muted">
                    <span className="px-1.5 py-0.5 rounded bg-bg-card border border-border-subtle uppercase">
                      {item.category}
                    </span>
                    <ArrowRight className="w-3 h-3 opacity-60" />
                  </div>
                </button>
              );
            })
          )}
        </div>

        {/* Footer info bar */}
        <div className="px-4 py-2 bg-bg-surface border-t border-border-subtle flex items-center justify-between text-[11px] font-mono text-text-muted">
          <div className="flex items-center gap-3">
            <span>↑↓ to navigate</span>
            <span>↵ to select</span>
            <span>esc to dismiss</span>
          </div>
          <span className="text-accent">Cmd+K</span>
        </div>
      </div>
    </div>
  );
}

CommandPalette.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};
