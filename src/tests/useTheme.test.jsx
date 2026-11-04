import { describe, it, expect } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import React from 'react';
import { ThemeProvider, useTheme, THEMES } from '@/hooks/useTheme';

const wrapper = ({ children }) => <ThemeProvider>{children}</ThemeProvider>;

describe('useTheme hook', () => {
  it('initializes with default theme', () => {
    const { result } = renderHook(() => useTheme(), { wrapper });
    expect(result.current.theme).toBe('default');
  });

  it('allows setting valid theme', () => {
    const { result } = renderHook(() => useTheme(), { wrapper });
    act(() => {
      result.current.setTheme('matrix');
    });
    expect(result.current.theme).toBe('matrix');
  });

  it('cycles through all available themes', () => {
    const { result } = renderHook(() => useTheme(), { wrapper });
    act(() => {
      result.current.setTheme('default');
    });

    const initialIndex = THEMES.findIndex((t) => t.id === 'default');
    const nextExpected = THEMES[(initialIndex + 1) % THEMES.length].id;

    act(() => {
      result.current.cycleTheme();
    });

    expect(result.current.theme).toBe(nextExpected);
  });
});
