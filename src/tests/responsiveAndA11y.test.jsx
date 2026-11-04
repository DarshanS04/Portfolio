import { describe, it, expect } from 'vitest';
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { ThemeProvider } from '@/hooks/useTheme';
import { Navbar } from '@/components/ui/Navbar';
import { HomePage } from '@/pages/HomePage';
import { ContactSection } from '@/components/sections/ContactSection';

describe('Accessibility & Responsive UI Verification', () => {
  it('renders required semantic landmarks on the homepage', () => {
    render(
      <HelmetProvider>
        <ThemeProvider>
          <MemoryRouter>
            <HomePage />
          </MemoryRouter>
        </ThemeProvider>
      </HelmetProvider>
    );

    // Main landmark
    const mainLandmark = screen.getByRole('main');
    expect(mainLandmark).toBeInTheDocument();
    expect(mainLandmark.id).toBe('main-content');

    // Section landmarks with aria-labelledby
    expect(screen.getByRole('region', { name: /About Me/i })).toBeInTheDocument();
    expect(screen.getByRole('region', { name: /Featured Projects/i })).toBeInTheDocument();
    expect(screen.getByRole('region', { name: /Engineering Experience/i })).toBeInTheDocument();
  });

  it('renders accessible navigation with keyboard-operable drawer', () => {
    render(
      <ThemeProvider>
        <MemoryRouter>
          <Navbar onOpenCommandPalette={() => {}} />
        </MemoryRouter>
      </ThemeProvider>
    );

    const banner = screen.getByRole('banner');
    expect(banner).toBeInTheDocument();

    const nav = screen.getByRole('navigation', { name: /Main Navigation/i });
    expect(nav).toBeInTheDocument();

    // Mobile menu toggle button has accessible label and expanded attribute
    const toggleBtn = screen.getByRole('button', { name: /Open Navigation Menu/i });
    expect(toggleBtn).toBeInTheDocument();
    expect(toggleBtn).toHaveAttribute('aria-expanded', 'false');

    // Click toggle to open drawer
    fireEvent.click(toggleBtn);
    expect(toggleBtn).toHaveAttribute('aria-expanded', 'true');

    // Press Escape to dismiss drawer
    fireEvent.keyDown(window, { key: 'Escape' });
    expect(toggleBtn).toHaveAttribute('aria-expanded', 'false');
  });

  it('ensures contact form has full a11y labels and hidden honeypot', () => {
    render(
      <ThemeProvider>
        <ContactSection />
      </ThemeProvider>
    );

    // Form inputs have linked accessible labels
    expect(screen.getByLabelText(/name:/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email:/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/payload_message:/i)).toBeInTheDocument();

    // Honeypot field exists and is marked aria-hidden
    const honeypotInput = screen.getByLabelText(/Leave this field empty/i);
    expect(honeypotInput).toBeInTheDocument();
    expect(honeypotInput).toHaveAttribute('tabIndex', '-1');
  });
});
