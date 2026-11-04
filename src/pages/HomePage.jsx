import React from 'react';
import { Helmet } from 'react-helmet-async';
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
      <main id="main-content" className="min-h-screen pt-20 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold font-mono text-text-primary">
            {PROFILE.name}
          </h1>
          <p className="text-text-secondary mt-2">{PROFILE.title}</p>
        </div>
      </main>
    </>
  );
}
