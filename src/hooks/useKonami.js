import { useState, useEffect } from 'react';

const KONAMI_CODE = [
  'ArrowUp',
  'ArrowUp',
  'ArrowDown',
  'ArrowDown',
  'ArrowLeft',
  'ArrowRight',
  'ArrowLeft',
  'ArrowRight',
  'b',
  'a',
];

/**
 * Custom hook to detect the Konami code sequence.
 * @param {Function} [onSuccess] Optional callback invoked on sequence completion
 * @returns {boolean} Whether the sequence was successfully triggered
 */
export function useKonami(onSuccess) {
  const [triggered, setTriggered] = useState(false);

  useEffect(() => {
    let index = 0;

    const handleKeyDown = (event) => {
      const key = event.key.length === 1 ? event.key.toLowerCase() : event.key;
      const expectedKey = KONAMI_CODE[index].toLowerCase();

      if (key === expectedKey) {
        index += 1;
        if (index === KONAMI_CODE.length) {
          setTriggered(true);
          if (onSuccess) onSuccess();
          index = 0; // Reset
        }
      } else {
        // Reset if mismatched
        index = (key === KONAMI_CODE[0].toLowerCase()) ? 1 : 0;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onSuccess]);

  const resetKonami = () => setTriggered(false);

  return { triggered, resetKonami };
}

