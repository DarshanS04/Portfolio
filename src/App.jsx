import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { ThemeProvider } from '@/hooks/useTheme';
import { BuildProgressBar } from '@/components/ui/BuildProgressBar';
import { Navbar } from '@/components/ui/Navbar';
import { Footer } from '@/components/ui/Footer';
import { ErrorBoundary } from '@/components/ui/ErrorBoundary';
import { HomePage } from '@/pages/HomePage';
import { ProjectDetailPage } from '@/pages/ProjectDetailPage';
import { NotFoundPage } from '@/pages/NotFoundPage';

export function App() {
  const [_commandPaletteOpen, setCommandPaletteOpen] = useState(false);

  return (
    <HelmetProvider>
      <ThemeProvider>
        <ErrorBoundary>
          <div className="min-h-screen bg-bg-primary text-text-primary flex flex-col selection:bg-accent selection:text-white">
            <BuildProgressBar />
            <Navbar onOpenCommandPalette={() => setCommandPaletteOpen(true)} />
            
            <div className="flex-1">
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/projects/:slug" element={<ProjectDetailPage />} />
                <Route path="*" element={<NotFoundPage />} />
              </Routes>
            </div>

            <Footer />
          </div>
        </ErrorBoundary>
      </ThemeProvider>
    </HelmetProvider>
  );
}

export default App;
