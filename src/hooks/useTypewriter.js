import { useState, useEffect } from 'react';

/**
 * Custom hook to simulate typewriter animation.
 * @param {string} text Full text string to type
 * @param {object} options
 * @param {number} [options.speed=25] Speed in milliseconds per character
 * @param {number} [options.startDelay=0] Initial delay in ms before typing begins
 * @param {boolean} [options.enabled=true] Whether the typing effect is active
 * @param {Function} [options.onComplete] Callback when typing finishes
 * @returns {{ displayedText: string, isDone: boolean }}
 */
export function useTypewriter(text, options = {}) {
  const { speed = 25, startDelay = 0, enabled = true, onComplete } = options;
  const [displayedText, setDisplayedText] = useState('');
  const [isDone, setIsDone] = useState(false);

  useEffect(() => {
    if (!enabled) {
      setDisplayedText(text);
      setIsDone(true);
      return;
    }

    setDisplayedText('');
    setIsDone(false);

    let charIndex = 0;
    let timerId = null;

    const delayTimeout = setTimeout(() => {
      timerId = setInterval(() => {
        if (charIndex < text.length) {
          setDisplayedText(text.slice(0, charIndex + 1));
          charIndex += 1;
        } else {
          clearInterval(timerId);
          setIsDone(true);
          if (onComplete) onComplete();
        }
      }, speed);
    }, startDelay);

    return () => {
      clearTimeout(delayTimeout);
      if (timerId) clearInterval(timerId);
    };
  }, [text, speed, startDelay, enabled, onComplete]);

  return { displayedText, isDone };
}
