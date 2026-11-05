import { describe, it, expect } from 'vitest';
import { parseCommand, getCommandSuggestions } from '@/lib/terminalParser';
import { PROFILE } from '@/content/profile';

describe('terminalParser module', () => {
  it('returns empty result for blank input', () => {
    const res = parseCommand('   ');
    expect(res.type).toBe('empty');
    expect(res.output).toBe('');
  });

  it('handles help command', () => {
    const res = parseCommand('help');
    expect(res.type).toBe('text');
    expect(res.output).toContain('Available interactive commands:');
    expect(res.output).toContain('whoami');
  });

  it('handles whoami command with exact profile information', () => {
    const res = parseCommand('whoami');
    expect(res.type).toBe('text');
    expect(res.output).toContain(PROFILE.name);
    expect(res.output).toContain('9.15');
    expect(res.output).toContain(PROFILE.location);
  });

  it('handles about command', () => {
    const res = parseCommand('about');
    expect(res.type).toBe('text');
    expect(res.output).toContain(PROFILE.name.toUpperCase());
    expect(res.output).toContain(PROFILE.objective);
  });

  it('handles skills command', () => {
    const res = parseCommand('skills');
    expect(res.type).toBe('text');
    expect(res.output).toContain('Languages');
    expect(res.output).toContain('Java');
    expect(res.output).toContain('React');
  });

  it('handles projects command', () => {
    const res = parseCommand('projects');
    expect(res.type).toBe('text');
    expect(res.output).toContain('electronic-gadget-ecommerce');
    expect(res.output).toContain('bake-track');
    expect(res.output).toContain('minor-it-sphere');
  });

  it('handles open command with valid and invalid slugs', () => {
    // Missing slug
    const missing = parseCommand('open');
    expect(missing.type).toBe('error');

    // Valid slug
    const valid = parseCommand('open electronic-gadget-ecommerce');
    expect(valid.type).toBe('navigate');
    expect(valid.slug).toBe('electronic-gadget-ecommerce');

    // Invalid slug
    const invalid = parseCommand('open non-existent-project');
    expect(invalid.type).toBe('error');
    expect(invalid.output).toContain('not found');
  });

  it('handles experience command', () => {
    const res = parseCommand('experience');
    expect(res.type).toBe('text');
    expect(res.output).toContain('Exposys Data Labs');
    expect(res.output).toContain('commit');
  });

  it('handles education command', () => {
    const res = parseCommand('education');
    expect(res.type).toBe('text');
    expect(res.output).toContain('SDMCET');
    expect(res.output).toContain('9.15');
    expect(res.output).toContain('93.17%');
  });

  it('handles resume command', () => {
    const res = parseCommand('resume');
    expect(res.type).toBe('action');
    expect(res.action).toBe('resume');
  });

  it('handles contact command', () => {
    const res = parseCommand('contact');
    expect(res.type).toBe('text');
    expect(res.output).toContain(PROFILE.email);
    expect(res.output).toContain(PROFILE.github);
  });

  it('handles theme command with valid and invalid options', () => {
    const matrix = parseCommand('theme matrix');
    expect(matrix.type).toBe('action');
    expect(matrix.theme).toBe('matrix');

    const dracula = parseCommand('theme dracula');
    expect(dracula.theme).toBe('dracula');

    const cyberpunk = parseCommand('theme cyberpunk');
    expect(cyberpunk.theme).toBe('cyberpunk');

    const invalid = parseCommand('theme solarized');
    expect(invalid.type).toBe('error');
  });

  it('handles clear command', () => {
    const res = parseCommand('clear');
    expect(res.type).toBe('clear');
  });

  it('handles sudo hire darshan easter egg', () => {
    const res = parseCommand('sudo hire darshan');
    expect(res.type).toBe('special');
    expect(res.special).toBe('confetti');
    expect(res.output).toContain('HIRING PROTOCOL INITIATED');
  });

  it('handles unauthorized sudo commands', () => {
    const res = parseCommand('sudo reboot');
    expect(res.type).toBe('error');
    expect(res.output).toContain('not in the sudoers file');
  });

  it('handles unknown command with friendly error message', () => {
    const res = parseCommand('foobar123');
    expect(res.type).toBe('error');
    expect(res.output).toBe("command not found: foobar123. Type 'help' to inspect available instructions.");
  });

  it('returns suggestions for tab autocomplete', () => {
    const suggestions = getCommandSuggestions('sk');
    expect(suggestions).toContain('skills');

    const proSuggestions = getCommandSuggestions('pro');
    expect(proSuggestions).toContain('projects');
  });
});
