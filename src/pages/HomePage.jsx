import React from 'react';
import { Helmet } from 'react-helmet-async';
import { HeroSection } from '@/components/sections/HeroSection';
import { AboutSection } from '@/components/sections/AboutSection';
import { SkillsSection } from '@/components/sections/SkillsSection';
import { ProjectsSection } from '@/components/sections/ProjectsSection';
import { ExperienceSection } from '@/components/sections/ExperienceSection';
import { EducationSection } from '@/components/sections/EducationSection';
import { GithubStatsSection } from '@/components/sections/GithubStatsSection';
import { ContactSection } from '@/components/sections/ContactSection';
import { PROFILE } from '@/content/profile';

export function HomePage() {
  return (
    <>
      <Helmet>
        <title>Darshan Saravari | Full-Stack & Android Developer</title>
        <meta
          name="description"
          content="Darshan Saravari is a Full-Stack and Android Developer and final-year Information Science student at SDMCET with expertise in React, Node.js, and Java."
        />
        <link rel="canonical" href={PROFILE.siteUrl} />
      </Helmet>

      <main id="main-content" className="flex-1">
        <HeroSection />
        <AboutSection />
        <SkillsSection />
        <ProjectsSection />
        <ExperienceSection />
        <EducationSection />
        <GithubStatsSection />
        <ContactSection />
      </main>
    </>
  );
}
