import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Terminal, Home, AlertCircle } from 'lucide-react';

export function NotFoundPage() {
  return (
    <>
      <Helmet>
        <title>404: Not Found | Darshan Saravari</title>
        <meta name="description" content="The requested resource was not found on this server." />
        <meta name="robots" content="noindex, follow" />
      </Helmet>

      <div className="min-h-[80vh] flex items-center justify-center px-4 py-20">
        <div className="max-w-xl w-full terminal-shell rounded-xl border border-border-subtle p-6 bg-bg-terminal shadow-2xl">
          {/* Header */}
          <div className="flex items-center justify-between pb-3 border-b border-border-subtle mb-6">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-red-500 inline-block" />
              <span className="w-3 h-3 rounded-full bg-yellow-500 inline-block" />
              <span className="w-3 h-3 rounded-full bg-emerald-500 inline-block" />
              <span className="ml-2 font-mono text-xs text-text-muted">darshan@portfolio: 404_NOT_FOUND</span>
            </div>
            <Terminal className="w-4 h-4 text-accent" />
          </div>

          {/* Terminal output */}
          <div className="font-mono space-y-4 text-sm">
            <div className="text-red-400 flex items-center gap-2 font-bold">
              <AlertCircle className="w-5 h-5 flex-shrink-0" />
              <span>HTTP 404: ERR_FILE_NOT_FOUND</span>
            </div>

            <div className="text-text-secondary space-y-1">
              <p className="text-text-muted">$ cd /requested-path</p>
              <p className="text-red-400">bash: cd: /requested-path: No such file or directory</p>
            </div>

            <div className="p-4 rounded-lg bg-black/40 border border-border-subtle text-xs space-y-2 text-text-muted">
              <p>Host: portfolio.darshan.sh</p>
              <p>Status: Target route does not exist or has been relocated.</p>
              <p>Suggested command: cd ~ (return to root index)</p>
            </div>

            <div className="pt-2 flex flex-wrap gap-3">
              <Link
                to="/"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-md bg-accent text-white text-xs font-semibold hover:bg-accent-hover transition-colors shadow-glow-sm min-h-[44px]"
              >
                <Home className="w-4 h-4" />
                <span>cd ~ (Return Home)</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
