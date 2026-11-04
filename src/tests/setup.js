import '@testing-library/jest-dom';

// Polyfill window.matchMedia if not implemented by jsdom
if (typeof window !== 'undefined' && !window.matchMedia) {
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: (query) => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: () => {},
      removeListener: () => {},
      addEventListener: () => {},
      removeEventListener: () => {},
      dispatchEvent: () => false,
    }),
  });
}

// Polyfill window.scrollTo
if (typeof window !== 'undefined' && !window.scrollTo) {
  window.scrollTo = () => {};
}
