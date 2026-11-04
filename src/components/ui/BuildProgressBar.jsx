import React, { useState, useEffect } from 'react';

/**
 * Scroll progress bar styled as a terminal build/compile progress bar.
 */
export function BuildProgressBar() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight <= 0) {
        setProgress(100);
        return;
      }
      const currentScroll = window.scrollY;
      const percentage = Math.min(100, Math.max(0, Math.round((currentScroll / totalHeight) * 100)));
      setProgress(percentage);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div
      className="fixed top-0 left-0 right-0 z-50 h-1 bg-black/40 overflow-hidden"
      role="progressbar"
      aria-valuenow={progress}
      aria-valuemin="0"
      aria-valuemax="100"
      aria-label="Page reading progress"
    >
      <div
        className="h-full bg-gradient-to-r from-accent via-accent-hover to-accent-secondary transition-all duration-150 ease-out"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}
