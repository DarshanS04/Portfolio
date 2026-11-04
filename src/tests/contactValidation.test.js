import { describe, it, expect } from 'vitest';
import { validateContactForm } from '@/lib/contactValidation';

describe('contactValidation module', () => {
  it('detects valid form submissions', () => {
    const valid = {
      name: 'Hiring Manager',
      email: 'recruiter@company.com',
      message: 'Hello Darshan, we were impressed by your projects and want to talk.',
      honeypot: '',
    };
    const result = validateContactForm(valid);
    expect(result.isValid).toBe(true);
    expect(Object.keys(result.errors).length).toBe(0);
  });

  it('rejects empty or short names', () => {
    const result = validateContactForm({
      name: 'A',
      email: 'recruiter@company.com',
      message: 'Hello Darshan, we were impressed by your projects.',
    });
    expect(result.isValid).toBe(false);
    expect(result.errors.name).toBeDefined();
  });

  it('rejects invalid email formats', () => {
    const result = validateContactForm({
      name: 'Recruiter',
      email: 'not-an-email',
      message: 'Hello Darshan, we were impressed by your projects.',
    });
    expect(result.isValid).toBe(false);
    expect(result.errors.email).toBeDefined();
  });

  it('rejects short messages under 10 chars', () => {
    const result = validateContactForm({
      name: 'Recruiter',
      email: 'recruiter@company.com',
      message: 'Hi',
    });
    expect(result.isValid).toBe(false);
    expect(result.errors.message).toBeDefined();
  });

  it('detects and flags honeypot spam', () => {
    const result = validateContactForm({
      name: 'Spam Bot',
      email: 'bot@spam.com',
      message: 'Cheap crypto offers visit our website now',
      honeypot: 'i-am-a-bot',
    });
    expect(result.isValid).toBe(false);
    expect(result.errors.bot).toBe(true);
  });
});

