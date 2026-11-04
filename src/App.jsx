import React, { useState, useEffect, lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { ThemeProvider } from '@/hooks/useTheme';
import { useKonami } from '@/hooks/useKonami';
import { BuildProgressBar } from '@/components/ui/BuildProgressBar';
import { Navbar } from '@/components/ui/Navbar';
import { Footer } from '@/components/ui/Footer';
import { ErrorBoundary } from '@/components/ui/ErrorBoundary';
import { CommandPalette } from '@/components/extras/CommandPalette';
import { HomePage } from '@/pages/HomePage';
import { ProjectDetailPage } from '@/pages/ProjectDetailPage';
import { NotFoundPage } from '@/pages/NotFoundPage';

// Lazy load the heavy matrix rain canvas easter egg
const MatrixRain = lazy(() => import('@/components/extras/MatrixRain'));

export function App() {
  const [commandPaletteOpen, setCommandPaletteOpen] = useState(false);
  const [matrixActive, setMatrixActive] = useState(false);

  // Trigger matrix rain on Konami Code sequence: ↑ ↑ ↓ ↓ ← → ← → B A
  useKonami(() => {
    setMatrixActive(true);
  });

  // Listen to open-command-palette synthetic event
  useEffect(() => {
    const handleOpenEvent = () => setCommandPaletteOpen(true);
    window.addEventListener('open-command-palette', handleOpenEvent);
    return () => window.removeEventListener('open-command-palette', handleOpenEvent);
  }, []);

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

            {/* Global Command Palette modal */}
            <CommandPalette
              isOpen={commandPaletteOpen}
              onClose={() => setCommandPaletteOpen(false)}
            />

            {/* Konami Easter Egg Canvas */}
            {matrixActive && (
              <Suspense fallback={null}>
                <MatrixRain onClose={() => setMatrixActive(false)} />
              </Suspense>
            )}
          </div>
        </ErrorBoundary>
      </ThemeProvider>
    </HelmetProvider>
  );
}

export default App;
