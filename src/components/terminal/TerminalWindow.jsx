import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { Terminal as TerminalIcon, Sparkles, FastForward, CornerDownLeft } from 'lucide-react';
import confetti from 'canvas-confetti';
import { parseCommand, getCommandSuggestions } from '@/lib/terminalParser';
import { useTheme } from '@/hooks/useTheme';
import { usePrefersReducedMotion } from '@/hooks/useMediaQuery';
import { PROFILE } from '@/content/profile';

const INITIAL_BOOT_LOGS = [
  { text: '[OK] Loaded kernel: DarshanOS v2026.1-LTS (x86_64)', delay: 100 },
  { text: '[OK] Initialized memory subsystem: CGPA 9.15 verified (SDMCET)', delay: 250 },
  { text: '[OK] Full-Stack & Android runtime drivers mounted', delay: 400 },
];

const AUTO_SCRIPT = [
  {
    cmd: 'whoami',
    output: `${PROFILE.name} - ${PROFILE.title}\nStatus: ${PROFILE.status}`,
    delay: 500,
  },
  {
    cmd: 'cat skills.txt',
    output: 'Core: React.js, Node.js, Express.js, MongoDB, Android (Java), Python, C++',
    delay: 800,
  },
  {
    cmd: 'ls projects/',
    output: '1. electronic-gadget-ecommerce (flagship)\n2. bake-track (Android + Web)\n3. minor-it-sphere (Android)',
    delay: 1100,
  },
  {
    cmd: 'git log --oneline -1',
    output: 'c7f91a2 (HEAD -> main) open to entry-level software developer roles (graduating 2026)',
    delay: 1400,
  },
];

const QUICK_COMMAND_CHIPS = ['about', 'skills', 'projects', 'experience', 'resume', 'contact', 'sudo hire darshan'];

export function TerminalWindow({ className = '' }) {
  const [history, setHistory] = useState([]);
  const [commandInput, setCommandInput] = useState('');
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [commandHistory, setCommandHistory] = useState([]);
  const [isAutoTyping, setIsAutoTyping] = useState(true);
  const [activeAutoCommand, setActiveAutoCommand] = useState('');
  const [autoScriptIndex, setAutoScriptIndex] = useState(0);

  const inputRef = useRef(null);
  const terminalBodyRef = useRef(null);
  const navigate = useNavigate();
  const { setTheme } = useTheme();
  const prefersReducedMotion = usePrefersReducedMotion();

  // Scroll terminal to bottom whenever history updates
  useEffect(() => {
    if (terminalBodyRef.current) {
      terminalBodyRef.current.scrollTop = terminalBodyRef.current.scrollHeight;
    }
  }, [history, activeAutoCommand]);

  // Handle instant skip if user prefers reduced motion
  useEffect(() => {
    if (prefersReducedMotion && isAutoTyping) {
      handleSkipAnimation();
    }
  }, [prefersReducedMotion, isAutoTyping]);

  // Execute the automated boot typing sequence
  useEffect(() => {
    if (!isAutoTyping || prefersReducedMotion) return;

    if (autoScriptIndex < AUTO_SCRIPT.length) {
      const step = AUTO_SCRIPT[autoScriptIndex];
      let currentLength = 0;
      setActiveAutoCommand('');

      const typingInterval = setInterval(() => {
        if (currentLength <= step.cmd.length) {
          setActiveAutoCommand(step.cmd.slice(0, currentLength));
          currentLength += 1;
        } else {
          clearInterval(typingInterval);
          // Wait slightly then commit to terminal history
          setTimeout(() => {
            setHistory((prev) => [
              ...prev,
              { type: 'command', text: step.cmd },
              { type: 'output', text: step.output },
            ]);
            setActiveAutoCommand('');
            setAutoScriptIndex((i) => i + 1);
          }, 350);
        }
      }, 40);

      return () => clearInterval(typingInterval);
    } else {
      // Boot script finished
      const timer = setTimeout(() => {
        setIsAutoTyping(false);
        setHistory((prev) => [
          ...prev,
          {
            type: 'system',
            text: "Interactive session ready. Type 'help' or click command chips below.",
          },
        ]);
        if (inputRef.current) {
          inputRef.current.focus();
        }
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [isAutoTyping, autoScriptIndex, prefersReducedMotion]);

  const handleSkipAnimation = () => {
    setIsAutoTyping(false);
    const finalHistory = [
      ...INITIAL_BOOT_LOGS.map((log) => ({ type: 'system', text: log.text })),
      ...AUTO_SCRIPT.flatMap((step) => [
        { type: 'command', text: step.cmd },
        { type: 'output', text: step.output },
      ]),
      {
        type: 'system',
        text: "Animation skipped. Interactive session ready. Type 'help'.",
      },
    ];
    setHistory(finalHistory);
    setActiveAutoCommand('');
    setTimeout(() => {
      if (inputRef.current) inputRef.current.focus();
    }, 50);
  };

  const executeParsedCommand = (inputStr) => {
    const raw = inputStr.trim();
    if (!raw) return;

    // Append to typed history stack for up/down arrow navigation
    setCommandHistory((prev) => [...prev, raw]);
    setHistoryIndex(-1);

    const result = parseCommand(raw);

    if (result.type === 'clear') {
      setHistory([]);
      return;
    }

    // Trigger special action effects
    if (result.type === 'special' && result.special === 'confetti') {
      try {
        confetti({
          particleCount: 120,
          spread: 80,
          origin: { y: 0.6 },
          colors: ['#6366f1', '#00ff66', '#bd93f9', '#ff007f', '#06b6d4'],
        });
      } catch (err) {
        console.warn('Confetti trigger failed:', err);
      }
    } else if (result.type === 'action' && result.action === 'theme' && result.theme) {
      setTheme(result.theme);
    } else if (result.type === 'action' && result.action === 'resume') {
      window.open(PROFILE.resumeUrl, '_blank', 'noopener,noreferrer');
    } else if (result.type === 'navigate' && result.slug) {
      setTimeout(() => {
        navigate(`/projects/${result.slug}`);
      }, 500);
    }

    setHistory((prev) => [
      ...prev,
      { type: 'command', text: raw },
      { type: result.type, text: result.output },
    ]);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      executeParsedCommand(commandInput);
      setCommandInput('');
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (commandHistory.length === 0) return;
      const nextIndex = historyIndex === -1 ? commandHistory.length - 1 : Math.max(0, historyIndex - 1);
      setHistoryIndex(nextIndex);
      setCommandInput(commandHistory[nextIndex]);
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex === -1) return;
      const nextIndex = historyIndex + 1;
      if (nextIndex < commandHistory.length) {
        setHistoryIndex(nextIndex);
        setCommandInput(commandHistory[nextIndex]);
      } else {
        setHistoryIndex(-1);
        setCommandInput('');
      }
    } else if (e.key === 'Tab') {
      e.preventDefault();
      const suggestions = getCommandSuggestions(commandInput);
      if (suggestions.length === 1) {
        setCommandInput(suggestions[0]);
      } else if (suggestions.length > 1) {
        setHistory((prev) => [
          ...prev,
          { type: 'command', text: commandInput },
          { type: 'system', text: `Suggestions: ${suggestions.join(', ')}` },
        ]);
      }
    }
  };

  const handleChipClick = (cmd) => {
    if (isAutoTyping) {
      handleSkipAnimation();
    }
    executeParsedCommand(cmd);
    if (inputRef.current) inputRef.current.focus();
  };

  return (
    <div
      className={`terminal-shell rounded-xl overflow-hidden flex flex-col transition-all duration-300 ${className}`}
    >
      {/* Title Bar */}
      <div className="bg-bg-surface/90 border-b border-border-subtle px-4 py-2.5 flex items-center justify-between select-none">
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5" aria-hidden="true">
            <span className="w-3 h-3 rounded-full bg-red-500/80 hover:bg-red-500 transition-colors inline-block" />
            <span className="w-3 h-3 rounded-full bg-yellow-500/80 hover:bg-yellow-500 transition-colors inline-block" />
            <span className="w-3 h-3 rounded-full bg-emerald-500/80 hover:bg-emerald-500 transition-colors inline-block" />
          </div>
          <span className="ml-2 font-mono text-xs text-text-muted flex items-center gap-1.5">
            <TerminalIcon className="w-3.5 h-3.5 text-accent" />
            <span>darshan@portfolio:~</span>
          </span>
        </div>

        <div className="flex items-center gap-2">
          {isAutoTyping && (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                handleSkipAnimation();
              }}
              className="inline-flex items-center gap-1 text-[11px] font-mono text-accent hover:text-accent-hover px-2 py-0.5 rounded bg-accent-muted/30 border border-border-subtle transition-colors min-h-[30px]"
              title="Skip typing animation"
              aria-label="Skip terminal animation"
            >
              <FastForward className="w-3 h-3" />
              <span>Skip</span>
            </button>
          )}
          <span className="text-[10px] font-mono text-text-muted hidden sm:inline">bash (utf-8)</span>
        </div>
      </div>

      {/* Terminal Output Log Area */}
      <div
        ref={terminalBodyRef}
        role="log"
        aria-live="polite"
        aria-atomic="false"
        className="p-4 sm:p-5 font-mono text-xs sm:text-sm text-text-secondary overflow-y-auto max-h-[380px] sm:max-h-[440px] space-y-2.5 leading-relaxed selection:bg-accent selection:text-white"
      >
        {history.map((entry, idx) => (
          <div key={idx} className="break-words">
            {entry.type === 'command' && (
              <div className="flex items-start gap-2 text-text-primary">
                <span className="text-accent select-none font-semibold">$</span>
                <span className="font-semibold text-text-primary">{entry.text}</span>
              </div>
            )}
            {entry.type === 'output' && (
              <pre className="whitespace-pre-wrap font-mono text-text-secondary pl-4 border-l-2 border-border-subtle my-1">
                {entry.text}
              </pre>
            )}
            {entry.type === 'text' && (
              <pre className="whitespace-pre-wrap font-mono text-text-secondary pl-4 border-l-2 border-accent/40 my-1">
                {entry.text}
              </pre>
            )}
            {entry.type === 'error' && (
              <div className="text-red-400 pl-4 border-l-2 border-red-500/50 my-1">
                {entry.text}
              </div>
            )}
            {entry.type === 'system' && (
              <div className="text-accent/80 italic text-xs pl-4 border-l-2 border-accent-muted my-1">
                {entry.text}
              </div>
            )}
            {entry.type === 'special' && (
              <pre className="whitespace-pre-wrap font-mono text-emerald-400 pl-4 border-l-2 border-emerald-500 my-1 font-bold">
                {entry.text}
              </pre>
            )}
          </div>
        ))}

        {/* Live typing command indicator during boot sequence */}
        {isAutoTyping && (
          <div className="flex items-center gap-2 text-text-primary">
            <span className="text-accent select-none font-semibold">$</span>
            <span>{activeAutoCommand}</span>
            <span className="w-2 h-4 bg-accent animate-cursor-blink inline-block" />
          </div>
        )}

        {/* Interactive prompt line */}
        {!isAutoTyping && (
          <div className="flex items-center gap-2 pt-1 text-text-primary">
            <span className="text-accent select-none font-semibold" aria-hidden="true">$</span>
            <label htmlFor="terminal-command-input" className="sr-only">
              Terminal command input
            </label>
            <input
              id="terminal-command-input"
              ref={inputRef}
              type="text"
              value={commandInput}
              onChange={(e) => setCommandInput(e.target.value)}
              onKeyDown={handleKeyDown}
              autoComplete="off"
              autoCapitalize="off"
              spellCheck="false"
              className="flex-1 bg-transparent text-text-primary font-mono text-xs sm:text-sm focus:outline-none placeholder-text-muted/40 caret-accent"
              placeholder="type a command (e.g. 'help', 'about', 'skills', 'sudo hire darshan')..."
            />
          </div>
        )}
      </div>

      {/* Tappable Command Chips for mobile/quick interaction */}
      <div className="bg-bg-surface/70 border-t border-border-subtle p-2 sm:p-2.5 flex flex-wrap items-center gap-1.5 select-none">
        <span className="text-[11px] font-mono text-text-muted mr-1 hidden sm:inline flex items-center gap-1">
          <Sparkles className="w-3 h-3 text-accent" />
          <span>Quick:</span>
        </span>
        {QUICK_COMMAND_CHIPS.map((chip) => (
          <button
            key={chip}
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              handleChipClick(chip);
            }}
            className="px-2.5 py-1 text-xs font-mono rounded bg-bg-card hover:bg-bg-card-hover border border-border-subtle hover:border-accent text-text-secondary hover:text-accent transition-colors min-h-[34px] flex items-center gap-1"
            aria-label={`Execute command ${chip}`}
          >
            <span>{chip}</span>
            <CornerDownLeft className="w-2.5 h-2.5 opacity-50" />
          </button>
        ))}
      </div>
    </div>
  );
}

TerminalWindow.propTypes = {
  className: PropTypes.string,
};
