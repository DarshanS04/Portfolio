import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { AlertTriangle, RefreshCw, Terminal } from 'lucide-react';

export class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Portfolio ErrorBoundary caught an exception:', error, errorInfo);
  }

  handleReload = () => {
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-bg-primary text-text-primary flex items-center justify-center p-4">
          <div className="max-w-xl w-full terminal-shell rounded-xl border border-red-500/40 p-6 shadow-2xl bg-bg-terminal">
            {/* Terminal Top Bar */}
            <div className="flex items-center justify-between pb-4 border-b border-border-subtle mb-4">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-red-500 inline-block" />
                <span className="w-3 h-3 rounded-full bg-yellow-500 inline-block" />
                <span className="w-3 h-3 rounded-full bg-emerald-500 inline-block" />
                <span className="ml-2 font-mono text-xs text-text-muted">panic: runtime_exception</span>
              </div>
              <Terminal className="w-4 h-4 text-red-400" />
            </div>

            {/* Content */}
            <div className="space-y-4 font-mono text-sm">
              <div className="flex items-center gap-2 text-red-400 font-bold">
                <AlertTriangle className="w-5 h-5 flex-shrink-0" />
                <span>FATAL APPLICATION ERROR (SIGSEGV_EMULATED)</span>
              </div>

              <p className="text-text-muted text-xs leading-relaxed">
                An unexpected condition was encountered during client-side rendering.
              </p>

              <div className="p-3 rounded bg-black/60 border border-border-subtle text-xs text-red-300 overflow-x-auto">
                <code>{this.state.error?.message || 'Unknown runtime exception'}</code>
              </div>

              <div className="pt-2 flex gap-3">
                <button
                  type="button"
                  onClick={this.handleReload}
                  className="flex items-center gap-2 px-4 py-2 rounded-md bg-accent text-white font-mono text-xs font-semibold hover:bg-accent-hover transition-colors min-h-[44px]"
                >
                  <RefreshCw className="w-4 h-4" />
                  <span>systemctl restart ui</span>
                </button>
                <a
                  href="/"
                  className="flex items-center gap-2 px-4 py-2 rounded-md bg-bg-surface border border-border-subtle text-text-primary font-mono text-xs hover:border-accent transition-colors min-h-[44px]"
                >
                  <span>cd /</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

ErrorBoundary.propTypes = {
  children: PropTypes.node.isRequired,
};

