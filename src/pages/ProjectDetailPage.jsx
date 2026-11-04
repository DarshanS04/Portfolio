import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { ArrowLeft } from 'lucide-react';
import { PROJECTS } from '@/content/projects';
import { PROFILE } from '@/content/profile';

export function ProjectDetailPage() {
  const { slug } = useParams();
  const project = PROJECTS.find((p) => p.slug === slug);

  if (!project) {
    return (
      <main id="main-content" className="min-h-screen pt-28 pb-16 px-4 max-w-4xl mx-auto font-mono">
        <h1 className="text-2xl text-red-400 font-bold">Project Not Found</h1>
        <p className="text-text-muted mt-2">The specified project slug does not exist.</p>
        <Link to="/#projects" className="mt-4 inline-flex items-center gap-2 text-accent">
          <ArrowLeft className="w-4 h-4" /> Back to projects
        </Link>
      </main>
    );
  }

  return (
    <>
      <Helmet>
        <title>{`${project.title} | Darshan Saravari`}</title>
        <meta name="description" content={project.overview} />
        <link rel="canonical" href={`${PROFILE.siteUrl}/projects/${project.slug}`} />
      </Helmet>
      <main id="main-content" className="min-h-screen pt-28 pb-16 max-w-5xl mx-auto px-4 sm:px-6">
        <Link
          to="/#projects"
          className="inline-flex items-center gap-2 text-text-muted hover:text-accent font-mono text-sm transition-colors mb-6"
        >
          <ArrowLeft className="w-4 h-4" /> cd .. / projects
        </Link>
        <h1 className="text-3xl sm:text-4xl font-mono font-bold text-text-primary">
          {project.title}
        </h1>
        <p className="text-text-secondary mt-2 text-lg">{project.subtitle}</p>
      </main>
    </>
  );
}
