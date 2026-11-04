/**
 * Client-side contact form validation rules.
 */

export const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * Validates contact form submission data.
 * @param {{ name: string, email: string, message: string, honeypot?: string }} values
 * @returns {{ isValid: boolean, errors: { name?: string, email?: string, message?: string, bot?: boolean } }}
 */
export function validateContactForm(values) {
  const errors = {};

  // Honeypot detection
  if (values.honeypot && values.honeypot.trim() !== '') {
    return {
      isValid: false,
      errors: { bot: true },
    };
  }

  // Name validation
  if (!values.name || values.name.trim().length < 2) {
    errors.name = 'Please provide your name (minimum 2 characters).';
  }

  // Email validation
  if (!values.email || !EMAIL_REGEX.test(values.email.trim())) {
    errors.email = 'Please provide a valid email address.';
  }

  // Message validation
  if (!values.message || values.message.trim().length < 10) {
    errors.message = 'Please enter a message (minimum 10 characters).';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
}
