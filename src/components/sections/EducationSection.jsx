import React from 'react';
import { Terminal, GraduationCap, Award, BookOpen, Calendar, MapPin } from 'lucide-react';
import { PROFILE } from '@/content/profile';

export function EducationSection() {
  return (
    <section
      id="education"
      aria-labelledby="education-heading"
      className="py-20 border-b border-border-subtle/40 relative"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-12">
          <div className="inline-flex items-center gap-2 text-xs font-mono text-accent mb-2">
            <Terminal className="w-3.5 h-3.5" />
            <span>// 05. ACADEMIC CREDENTIALS</span>
          </div>
          <h2
            id="education-heading"
            className="text-3xl sm:text-4xl font-bold font-mono tracking-tight text-text-primary"
          >
            Education & <span className="text-accent">Coursework</span>
          </h2>
          <div className="h-1 w-16 bg-accent mt-3 rounded-full" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Main Degree Card (B.E.) */}
          <div className="lg:col-span-7 space-y-6">
            {PROFILE.education.slice(0, 1).map((edu, idx) => (
              <div
                key={idx}
                className="glass-panel rounded-2xl p-6 sm:p-8 border border-border-highlight/40 relative overflow-hidden"
              >
                <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
                  <div className="flex items-center gap-2 text-accent">
                    <GraduationCap className="w-5 h-5" />
                    <span className="font-mono text-xs uppercase tracking-wider font-semibold">
                      Undergraduate Degree
                    </span>
                  </div>

                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-accent-muted/40 border border-accent/40 text-accent font-mono text-xs font-bold">
                    <Award className="w-3.5 h-3.5" />
                    <span>{edu.grade}</span>
                  </span>
                </div>

                <h3 className="text-2xl sm:text-3xl font-mono font-bold text-text-primary mb-2">
                  {edu.degree}
                </h3>

                <p className="text-base sm:text-lg text-text-secondary font-sans font-medium mb-4">
                  {edu.institution}
                </p>

                <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-text-muted mb-6">
                  <span className="flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-accent" />
                    <span>{edu.duration}</span>
                  </span>
                  <span className="flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-accent" />
                    <span>{edu.location}</span>
                  </span>
                </div>

                {/* Relevant Coursework */}
                {edu.coursework && (
                  <div className="pt-4 border-t border-border-subtle/50">
                    <span className="text-xs font-mono text-text-muted block font-semibold mb-3 flex items-center gap-1.5">
                      <BookOpen className="w-3.5 h-3.5 text-accent" />
                      <span>CORE COMPUTER SCIENCE COURSEWORK:</span>
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {edu.coursework.map((course) => (
                        <span
                          key={course}
                          className="px-3 py-1.5 rounded-md bg-bg-surface border border-border-subtle text-text-secondary font-mono text-xs"
                        >
                          {course}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Secondary & Higher Secondary (PUC & SSLC) */}
          <div className="lg:col-span-5 space-y-4">
            <span className="text-xs font-mono text-text-muted block font-semibold uppercase tracking-wider mb-2">
              PREVIOUS ACADEMIC RECORDS
            </span>

            {PROFILE.education.slice(1).map((edu, idx) => (
              <div
                key={idx}
                className="glass-panel rounded-xl p-5 border border-border-subtle hover:border-accent/40 transition-colors"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="font-mono text-xs text-text-muted">{edu.duration}</span>
                  <span className="font-mono text-xs font-bold text-accent bg-accent-muted/30 px-2.5 py-0.5 rounded border border-border-subtle">
                    Score: {edu.grade}
                  </span>
                </div>

                <h4 className="text-base font-mono font-bold text-text-primary">
                  {edu.institution}
                </h4>

                <p className="text-xs text-text-secondary font-sans mt-1">
                  {edu.degree} · {edu.location}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
