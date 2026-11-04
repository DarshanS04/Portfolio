import React, { useState } from 'react';
import { Terminal, Mail, Send, CheckCircle2, AlertCircle, MapPin } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from '@/components/ui/Icons';
import { PROFILE } from '@/content/profile';
import { validateContactForm } from '@/lib/contactValidation';

export function ContactSection() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
    honeypot: '',
  });

  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle'); // 'idle' | 'submitting' | 'success' | 'error'
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear field-specific error on edit
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validation = validateContactForm(formData);
    if (!validation.isValid) {
      if (validation.errors.bot) {
        // Silently pretend success to bots
        setStatus('success');
        return;
      }
      setErrors(validation.errors);
      return;
    }

    setStatus('submitting');
    setErrorMessage('');

    try {
      // Optional Formspree endpoint or fallback
      const formspreeEndpoint = import.meta.env.VITE_FORMSPREE_ENDPOINT;

      if (formspreeEndpoint) {
        const response = await fetch(formspreeEndpoint, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
          body: JSON.stringify({
            name: formData.name,
            email: formData.email,
            message: formData.message,
          }),
        });

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
      } else {
        // Fallback simulation for local/unconfigured environments
        await new Promise((resolve) => setTimeout(resolve, 800));
      }

      setStatus('success');
      setFormData({ name: '', email: '', message: '', honeypot: '' });
    } catch {
      setStatus('error');
      setErrorMessage(
        'Failed to transmit message through the automated gateway. Please email me directly at ' +
          PROFILE.email
      );
    }
  };

  return (
    <section
      id="contact"
      aria-labelledby="contact-heading"
      className="py-20 relative"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-12">
          <div className="inline-flex items-center gap-2 text-xs font-mono text-accent mb-2">
            <Terminal className="w-3.5 h-3.5" />
            <span>// 06. INITIATE TRANSMISSION</span>
          </div>
          <h2
            id="contact-heading"
            className="text-3xl sm:text-4xl font-bold font-mono tracking-tight text-text-primary"
          >
            Get in <span className="text-accent">Touch</span>
          </h2>
          <div className="h-1 w-16 bg-accent mt-3 rounded-full" />
          <p className="mt-3 text-sm font-mono text-text-muted">
            Open to entry-level software engineering roles, technical inquiries, and project discussions.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left Column: Direct Links & Info */}
          <div className="lg:col-span-5 space-y-6">
            <div className="glass-panel rounded-xl p-6 border border-border-subtle space-y-4">
              <h3 className="font-mono text-base font-bold text-text-primary flex items-center gap-2">
                <span className="text-accent">&gt;</span>
                <span>Direct Contact Points</span>
              </h3>

              <div className="space-y-3 font-mono text-xs sm:text-sm">
                <a
                  href={`mailto:${PROFILE.email}`}
                  className="flex items-center gap-3 p-3 rounded-lg bg-bg-surface hover:bg-bg-card border border-border-subtle hover:border-accent text-text-secondary hover:text-accent transition-colors min-h-[44px]"
                >
                  <Mail className="w-4 h-4 text-accent flex-shrink-0" />
                  <span className="truncate">{PROFILE.email}</span>
                </a>

                <a
                  href={PROFILE.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-3 rounded-lg bg-bg-surface hover:bg-bg-card border border-border-subtle hover:border-accent text-text-secondary hover:text-accent transition-colors min-h-[44px]"
                >
                  <GithubIcon className="w-4 h-4 text-accent flex-shrink-0" />
                  <span className="truncate">github.com/DarshanS04</span>
                </a>

                <a
                  href={PROFILE.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-3 rounded-lg bg-bg-surface hover:bg-bg-card border border-border-subtle hover:border-accent text-text-secondary hover:text-accent transition-colors min-h-[44px]"
                >
                  <LinkedinIcon className="w-4 h-4 text-accent flex-shrink-0" />
                  <span className="truncate">linkedin.com/in/darshan-saravari</span>
                </a>

                <div className="flex items-center gap-3 p-3 rounded-lg bg-bg-surface/50 border border-border-subtle text-text-muted">
                  <MapPin className="w-4 h-4 text-accent flex-shrink-0" />
                  <span>{PROFILE.location}</span>
                </div>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-bg-surface/60 border border-border-subtle font-mono text-xs text-text-muted space-y-1">
              <div className="text-text-primary font-semibold flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400" />
                <span>Notice on Privacy</span>
              </div>
              <p>
                Messages sent via this gateway are routed directly to my personal inbox. Phone number
                is withheld publicly to prevent spam.
              </p>
            </div>
          </div>

          {/* Right Column: Contact Form */}
          <div className="lg:col-span-7">
            <div className="terminal-shell rounded-xl border border-border-subtle bg-bg-terminal p-6 sm:p-8 shadow-2xl">
              {status === 'success' ? (
                <div className="text-center py-8 space-y-4 font-mono">
                  <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 mx-auto flex items-center justify-center border border-emerald-500/40">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold text-text-primary">
                    Transmission Dispatched (200 OK)
                  </h3>
                  <p className="text-xs sm:text-sm text-text-muted max-w-md mx-auto font-sans leading-relaxed">
                    Thank you for reaching out! Your message has been logged. I will reply to your
                    email promptly.
                  </p>
                  <button
                    type="button"
                    onClick={() => setStatus('idle')}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-bg-surface border border-border-subtle text-text-primary text-xs hover:border-accent hover:text-accent transition-colors min-h-[44px]"
                  >
                    <span>Send Another Message</span>
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} noValidate className="space-y-5 font-mono text-xs sm:text-sm">
                  {/* Honeypot field (hidden from screen & tab navigation) */}
                  <div className="hidden" aria-hidden="true">
                    <label htmlFor="contact-hp">Leave this field empty</label>
                    <input
                      id="contact-hp"
                      type="text"
                      name="honeypot"
                      tabIndex={-1}
                      autoComplete="off"
                      value={formData.honeypot}
                      onChange={handleChange}
                    />
                  </div>

                  {status === 'error' && (
                    <div className="p-3.5 rounded-lg bg-red-500/15 border border-red-500/40 text-red-300 text-xs flex items-start gap-2.5">
                      <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
                      <span>{errorMessage}</span>
                    </div>
                  )}

                  {/* Name field */}
                  <div>
                    <label htmlFor="contact-name" className="block text-text-secondary mb-1.5 font-medium">
                      name: <span className="text-accent">*</span>
                    </label>
                    <input
                      id="contact-name"
                      type="text"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="e.g. Linus Torvalds"
                      className={`w-full px-3.5 py-2.5 rounded-lg bg-bg-surface border font-mono text-xs sm:text-sm text-text-primary focus:outline-none transition-colors ${
                        errors.name
                          ? 'border-red-500 focus:border-red-400'
                          : 'border-border-subtle focus:border-accent'
                      }`}
                    />
                    {errors.name && (
                      <p className="text-red-400 text-xs mt-1">{errors.name}</p>
                    )}
                  </div>

                  {/* Email field */}
                  <div>
                    <label htmlFor="contact-email" className="block text-text-secondary mb-1.5 font-medium">
                      email: <span className="text-accent">*</span>
                    </label>
                    <input
                      id="contact-email"
                      type="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="e.g. recruiter@techcompany.com"
                      className={`w-full px-3.5 py-2.5 rounded-lg bg-bg-surface border font-mono text-xs sm:text-sm text-text-primary focus:outline-none transition-colors ${
                        errors.email
                          ? 'border-red-500 focus:border-red-400'
                          : 'border-border-subtle focus:border-accent'
                      }`}
                    />
                    {errors.email && (
                      <p className="text-red-400 text-xs mt-1">{errors.email}</p>
                    )}
                  </div>

                  {/* Message field */}
                  <div>
                    <label htmlFor="contact-message" className="block text-text-secondary mb-1.5 font-medium">
                      payload_message: <span className="text-accent">*</span>
                    </label>
                    <textarea
                      id="contact-message"
                      name="message"
                      rows={5}
                      required
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Write your note or opportunity details here..."
                      className={`w-full px-3.5 py-2.5 rounded-lg bg-bg-surface border font-mono text-xs sm:text-sm text-text-primary focus:outline-none transition-colors resize-y ${
                        errors.message
                          ? 'border-red-500 focus:border-red-400'
                          : 'border-border-subtle focus:border-accent'
                      }`}
                    />
                    {errors.message && (
                      <p className="text-red-400 text-xs mt-1">{errors.message}</p>
                    )}
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={status === 'submitting'}
                    className="w-full flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-accent text-white font-mono text-sm font-semibold hover:bg-accent-hover transition-colors shadow-glow-sm disabled:opacity-50 min-h-[44px]"
                  >
                    {status === 'submitting' ? (
                      <span>transmitting_payload...</span>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        <span>POST /api/contact (Send Message)</span>
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

