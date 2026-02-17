import ProjectCard from '@/components/ProjectCard';
import ScrollReveal from '@/components/ui/ScrollReveal';
import { Project } from '@/lib/project-service';
import Image from 'next/image';

interface WorkSectionProps {
  projects: Project[];
}

export default function WorkSection({ projects }: WorkSectionProps) {
  const featuredProject = projects[0];
  const restProjects = projects.slice(1);

  return (
    <section
      id='work'
      className='section-py bg-bg-primary'
      aria-label='Selected work'
    >
      <div className='container'>
        {/* Section Header */}
        <ScrollReveal
          animation='fade-up'
          className='max-w-2xl mb-10 md:mb-14'
        >
          <span className='badge mb-4 inline-flex'>Selected Work</span>
          <h2 className='heading-xl mb-4'>
            Projects that <span className='text-gradient'>make an impact</span>
          </h2>
          <p className='body-lg text-text-muted'>
            A curated collection of my recent work — user-centered design
            solutions across various industries and platforms.
          </p>
        </ScrollReveal>

        {/* Featured Project (full-width card) */}
        {featuredProject && (
          <ScrollReveal
            animation='fade-up'
            className='mb-6 md:mb-8'
          >
            <div className='grid grid-cols-1 lg:grid-cols-[0.95fr_1fr] gap-0 card card-hover overflow-hidden group'>
              {/* Image side */}
              <div
                className={`relative min-h-[240px] sm:min-h-[300px] lg:min-h-[380px] ${featuredProject.color} overflow-hidden`}
              >
                {featuredProject.thumbnail ? (
                  <div className='absolute inset-0'>
                    <Image
                      src={featuredProject.thumbnail}
                      alt={featuredProject.title}
                      className='w-full h-full object-cover group-hover:scale-105 transition-transform duration-500'
                      fill
                      priority
                    />
                  </div>
                ) : (
                  <div className='absolute inset-0 flex items-center justify-center'>
                    <div className='flex flex-col items-center gap-4'>
                      <div className='flex gap-3'>
                        <div className='w-10 h-10 rounded-xl bg-white/30' />
                        <div className='w-16 h-10 rounded-xl bg-white/20' />
                        <div className='w-8 h-10 rounded-xl bg-white/25' />
                      </div>
                      <div className='w-32 h-2 rounded-full bg-white/20' />
                    </div>
                  </div>
                )}
                {/* Featured badge */}
                <div className='absolute top-5 left-5'>
                  <span className='inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-accent text-white text-xs font-bold shadow-lg'>
                    ★ Featured Project
                  </span>
                </div>
              </div>

              {/* Content side */}
              <div className='p-6 md:p-8 lg:p-10 flex flex-col justify-center'>
                {/* Categories */}
                <div className='flex flex-wrap gap-2 mb-4'>
                  {featuredProject.category.map((cat) => (
                    <span
                      key={cat}
                      className='text-xs font-semibold px-3 py-1 rounded-full bg-accent/8 text-accent border border-accent/10'
                    >
                      {cat}
                    </span>
                  ))}
                </div>

                {/* Title */}
                <h3 className='heading-md text-text-primary mb-3 group-hover:text-accent transition-colors duration-200'>
                  {featuredProject.title}
                </h3>

                {/* Description */}
                <p className='body-base text-text-muted mb-6'>
                  {featuredProject.description}
                </p>

                {/* Results */}
                {featuredProject.caseStudy?.results && (
                  <div className='space-y-2 mb-6'>
                    {featuredProject.caseStudy.results
                      .slice(0, 3)
                      .map((result) => (
                        <div
                          key={result}
                          className='flex items-start gap-2.5'
                        >
                          <div className='w-5 h-5 rounded-full bg-emerald-100 flex items-center justify-center shrink-0 mt-0.5'>
                            <svg
                              width='10'
                              height='10'
                              viewBox='0 0 10 10'
                              fill='none'
                              aria-hidden='true'
                            >
                              <path
                                d='M2 5L4 7L8 3'
                                stroke='#059669'
                                strokeWidth='1.5'
                                strokeLinecap='round'
                                strokeLinejoin='round'
                              />
                            </svg>
                          </div>
                          <span className='text-sm font-medium text-text-primary'>
                            {result}
                          </span>
                        </div>
                      ))}
                  </div>
                )}

                {/* CTA */}
                <div className='flex items-center gap-3'>
                  {featuredProject.externalUrl ? (
                    <a
                      href={featuredProject.externalUrl}
                      target='_blank'
                      rel='noopener noreferrer'
                      className='btn-primary'
                      style={{
                        fontSize: '0.875rem',
                        padding: '0.6875rem 1.5rem',
                      }}
                    >
                      View Project
                      <svg
                        width='14'
                        height='14'
                        viewBox='0 0 14 14'
                        fill='none'
                        aria-hidden='true'
                      >
                        <path
                          d='M8.5 2H12M12 2V5.5M12 2L5.5 8.5M4 3H2V12H11V10'
                          stroke='currentColor'
                          strokeWidth='1.5'
                          strokeLinecap='round'
                          strokeLinejoin='round'
                        />
                      </svg>
                    </a>
                  ) : (
                    <a
                      href={`/projects/${featuredProject.slug}`}
                      className='btn-primary'
                      style={{
                        fontSize: '0.875rem',
                        padding: '0.6875rem 1.5rem',
                      }}
                    >
                      View Case Study
                      <svg
                        width='14'
                        height='14'
                        viewBox='0 0 14 14'
                        fill='none'
                        aria-hidden='true'
                      >
                        <path
                          d='M3 7H11M11 7L7.5 3.5M11 7L7.5 10.5'
                          stroke='currentColor'
                          strokeWidth='1.5'
                          strokeLinecap='round'
                          strokeLinejoin='round'
                        />
                      </svg>
                    </a>
                  )}
                </div>
              </div>
            </div>
          </ScrollReveal>
        )}

        {/* Projects Grid */}
        {restProjects.length > 0 && (
          <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6'>
            {restProjects.map((project, index) => (
              <ScrollReveal
                key={project.id}
                animation={
                  index % 3 === 0
                    ? 'slide-left'
                    : index % 3 === 1
                      ? 'fade-up'
                      : 'slide-right'
                }
                delay={index * 80}
              >
                <ProjectCard
                  project={project}
                  index={index + 1}
                />
              </ScrollReveal>
            ))}
          </div>
        )}

        {/* No projects state */}
        {projects.length === 0 && (
          <div className='text-center py-20'>
            <div className='w-16 h-16 rounded-2xl bg-accent/10 flex items-center justify-center mx-auto mb-4'>
              <svg
                width='24'
                height='24'
                viewBox='0 0 24 24'
                fill='none'
                aria-hidden='true'
              >
                <rect
                  x='3'
                  y='3'
                  width='18'
                  height='18'
                  rx='4'
                  stroke='#7C3AED'
                  strokeWidth='1.5'
                />
                <path
                  d='M8 12h8M12 8v8'
                  stroke='#7C3AED'
                  strokeWidth='1.5'
                  strokeLinecap='round'
                />
              </svg>
            </div>
            <p className='text-text-muted'>
              Projects will appear here once added via the admin panel.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
