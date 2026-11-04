import { useState, useEffect } from 'react';

/**
 * Custom hook to detect match state of a CSS media query.
 * @param {string} query CSS media query string
 * @returns {boolean} Whether the media query matches
 */
export function useMediaQuery(query) {
  const [matches, setMatches] = useState(() => {
    if (typeof window === 'undefined') return false;
    return window.matchMedia(query).matches;
  });

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const media = window.matchMedia(query);
    const listener = () => setMatches(media.matches);

    // Initial check
    setMatches(media.matches);

    if (media.addEventListener) {
      media.addEventListener('change', listener);
      return () => media.removeEventListener('change', listener);
    } else {
      // Legacy fallback
      media.addListener(listener);
      return () => media.removeListener(listener);
    }
  }, [query]);

  return matches;
}

/**
 * Convenience hook to check if user prefers reduced motion.
 * @returns {boolean}
 */
export function usePrefersReducedMotion() {
  return useMediaQuery('(prefers-reduced-motion: reduce)');
}

