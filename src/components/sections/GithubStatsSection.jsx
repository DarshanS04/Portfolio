import React, { useState, useEffect } from 'react';
import { Terminal, GitBranch, Star, BookOpen, ExternalLink } from 'lucide-react';
import { GithubIcon } from '@/components/ui/Icons';
import { PROFILE } from '@/content/profile';

const CACHE_KEY = 'darshan_github_stats_v1';
const CACHE_TTL_MS = 60 * 60 * 1000; // 1 hour

// Safe static fallback data in case GitHub API is rate-limited (HTTP 403) or offline
const FALLBACK_DATA = {
  user: {
    public_repos: 5,
    followers: 12,
    following: 15,
    login: 'DarshanS04',
  },
  repos: [
    {
      id: 'repo-1',
      name: 'electronic-gadget-ecommerce',
      description: 'Full-stack MERN gadget platform with Razorpay payment integration and JWT auth.',
      html_url: 'https://github.com/DarshanS04',
      language: 'JavaScript',
      stargazers_count: 2,
      forks_count: 1,
    },
    {
      id: 'repo-2',
      name: 'bake-track-app',
      description: 'Smart bakery management Android application with Firebase Realtime sync and push alerts.',
      html_url: 'https://github.com/DarshanS04',
      language: 'Java',
      stargazers_count: 1,
      forks_count: 0,
    },
    {
      id: 'repo-3',
      name: 'minor-it-sphere',
      description: 'Academic resources and real-time quiz Android app for IT students.',
      html_url: 'https://github.com/DarshanS04',
      language: 'Java',
      stargazers_count: 1,
      forks_count: 0,
    },
  ],
};

export function GithubStatsSection() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isFallback, setIsFallback] = useState(false);

  useEffect(() => {
    let isMounted = true;

    async function fetchGithubStats() {
      // 1. Check sessionStorage cache
      try {
        const cached = sessionStorage.getItem(CACHE_KEY);
        if (cached) {
          const parsed = JSON.parse(cached);
          if (Date.now() - parsed.timestamp < CACHE_TTL_MS) {
            if (isMounted) {
              setData(parsed.data);
              setLoading(false);
              return;
            }
          }
        }
      } catch {
        // sessionStorage restricted
      }

      // 2. Fetch from GitHub public API without tokens
      try {
        const [userRes, reposRes] = await Promise.all([
          fetch(`https://api.github.com/users/${PROFILE.githubUsername}`),
          fetch(`https://api.github.com/users/${PROFILE.githubUsername}/repos?sort=updated&per_page=6`),
        ]);

        if (!userRes.ok || !reposRes.ok) {
          throw new Error('GitHub API rate limited or unavailable');
        }

        const user = await userRes.json();
        const repos = await reposRes.json();

        const payload = { user, repos };

        if (isMounted) {
          setData(payload);
          setLoading(false);
          setIsFallback(false);
        }

        try {
          sessionStorage.setItem(
            CACHE_KEY,
            JSON.stringify({ timestamp: Date.now(), data: payload })
          );
        } catch {
          // ignore
        }
      } catch {
        if (isMounted) {
          setData(FALLBACK_DATA);
          setLoading(false);
          setIsFallback(true);
        }
      }
    }

    fetchGithubStats();

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <section
      id="github-stats"
      aria-labelledby="github-heading"
      className="py-16 border-b border-border-subtle/40 relative"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-mono text-accent mb-2">
              <Terminal className="w-3.5 h-3.5" />
              <span>// 07. REPOSITORY TELEMETRY</span>
            </div>
            <h2
              id="github-heading"
              className="text-2xl sm:text-3xl font-bold font-mono tracking-tight text-text-primary"
            >
              Open-Source & <span className="text-accent">GitHub Activity</span>
            </h2>
            <div className="h-1 w-16 bg-accent mt-3 rounded-full" />
          </div>

          <a
            href={PROFILE.github}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-3.5 py-2 rounded-lg bg-bg-surface hover:bg-bg-card border border-border-subtle hover:border-accent text-xs font-mono text-text-primary transition-colors self-start sm:self-auto min-h-[44px]"
          >
            <GithubIcon className="w-4 h-4 text-accent" />
            <span>@{PROFILE.githubUsername} on GitHub</span>
            <ExternalLink className="w-3 h-3 text-text-muted" />
          </a>
        </div>

        {/* Loading Skeleton */}
        {loading && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-pulse">
            {[1, 2, 3].map((i) => (
              <div key={i} className="glass-panel rounded-xl p-5 border border-border-subtle h-40 bg-bg-card/40" />
            ))}
          </div>
        )}

        {/* Repositories Grid */}
        {!loading && data && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {data.repos.map((repo) => (
                <div
                  key={repo.id}
                  className="glass-panel rounded-xl p-5 border border-border-subtle flex flex-col justify-between hover:border-accent/40 transition-all duration-200"
                >
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2 font-mono text-sm font-bold text-text-primary">
                        <BookOpen className="w-4 h-4 text-accent" />
                        <span className="truncate">{repo.name}</span>
                      </div>
                      <a
                        href={repo.html_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-1 text-text-muted hover:text-accent transition-colors"
                        aria-label={`Open repository ${repo.name}`}
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    </div>

                    <p className="text-xs text-text-muted font-sans line-clamp-2 mb-4">
                      {repo.description || 'Public software project repository by Darshan Saravari.'}
                    </p>
                  </div>

                  <div className="flex items-center justify-between pt-3 border-t border-border-subtle/50 font-mono text-[11px] text-text-muted">
                    <span className="flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-accent inline-block" />
                      <span>{repo.language || 'Code'}</span>
                    </span>

                    <div className="flex items-center gap-3">
                      <span className="flex items-center gap-1">
                        <Star className="w-3 h-3" />
                        <span>{repo.stargazers_count ?? 0}</span>
                      </span>
                      <span className="flex items-center gap-1">
                        <GitBranch className="w-3 h-3" />
                        <span>{repo.forks_count ?? 0}</span>
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {isFallback && (
              <p className="text-[11px] font-mono text-text-muted text-center italic">
                (Note: Cached telemetry displayed via local dataset)
              </p>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
