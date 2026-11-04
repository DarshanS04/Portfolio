import React from 'react';
import { renderToString } from 'react-dom/server';
import { MemoryRouter } from 'react-router';
import { HelmetProvider } from 'react-helmet-async';
import { ThemeProvider } from '@/hooks/useTheme';
import { BuildProgressBar } from '@/components/ui/BuildProgressBar';
import { Navbar } from '@/components/ui/Navbar';
import { Footer } from '@/components/ui/Footer';
import { ErrorBoundary } from '@/components/ui/ErrorBoundary';
import { Routes, Route } from 'react-router-dom';
import { HomePage } from '@/pages/HomePage';
import { ProjectDetailPage } from '@/pages/ProjectDetailPage';
import { NotFoundPage } from '@/pages/NotFoundPage';

export function render(url, helmetContext = {}) {
  const html = renderToString(
    <HelmetProvider context={helmetContext}>
      <ThemeProvider>
        <ErrorBoundary>
          <MemoryRouter initialEntries={[url]}>
            <div className="min-h-screen bg-bg-primary text-text-primary flex flex-col selection:bg-accent selection:text-white">
              <BuildProgressBar />
              <Navbar onOpenCommandPalette={null} />

              <div className="flex-1">
                <Routes>
                  <Route path="/" element={<HomePage />} />
                  <Route path="/projects/:slug" element={<ProjectDetailPage />} />
                  <Route path="*" element={<NotFoundPage />} />
                </Routes>
              </div>

              <Footer />
            </div>
          </MemoryRouter>
        </ErrorBoundary>
      </ThemeProvider>
    </HelmetProvider>
  );

  return {
    html,
    helmet: helmetContext.helmet,
  };
}
