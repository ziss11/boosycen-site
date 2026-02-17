import { Project } from '@/data/projects';
import Image from 'next/image';
import Link from 'next/link';

interface ProjectCardProps {
  project: Project;
  index: number;
  featured?: boolean;
}

const categoryColors: Record<string, string> = {
  'Mobile App': 'bg-violet-100 text-violet-700',
  'Web Application': 'bg-blue-100 text-blue-700',
  'E-Commerce': 'bg-pink-100 text-pink-700',
  Dashboard: 'bg-emerald-100 text-emerald-700',
};

export default function ProjectCard({
  project,
  index,
  featured = false,
}: ProjectCardProps) {
  const hasExternalUrl = Boolean(project.externalUrl);

  const content = (
    <article
      className={`group relative overflow-hidden card card-hover flex flex-col h-full ${
        featured ? 'shadow-md' : ''
      }`}
    >
      {/* Thumbnail */}
      <div
        className={`relative overflow-hidden shrink-0 ${
          featured ? 'aspect-video' : 'aspect-[4/3]'
        } ${project.color}`}
      >
        {project.thumbnail ? (
          <Image
            src={project.thumbnail}
            alt={project.title}
            fill
            className='object-cover group-hover:scale-105 transition-transform duration-500'
            sizes={
              featured
                ? '(max-width: 768px) 100vw, 60vw'
                : '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
            }
          />
        ) : (
          /* Stylized placeholder when no thumbnail */
          <div className='absolute inset-0 flex items-center justify-center'>
            <div className='flex flex-col items-center gap-3'>
              {/* Abstract design mockup shapes */}
              <div className='flex gap-2'>
                <div className='w-8 h-8 rounded-lg bg-white/30 backdrop-blur-sm' />
                <div className='w-14 h-8 rounded-lg bg-white/20 backdrop-blur-sm' />
                <div className='w-6 h-8 rounded-lg bg-white/25 backdrop-blur-sm' />
              </div>
              <div className='w-28 h-1.5 rounded-full bg-white/20' />
              <div className='w-20 h-1 rounded-full bg-white/15' />
            </div>
          </div>
        )}

        {/* Hover overlay */}
        <div className='absolute inset-0 bg-linear-to-t from-black/75 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400 flex items-end'>
          <div className='p-5 md:p-6'>
            <span className='inline-flex items-center gap-2 text-white font-semibold text-sm'>
              {hasExternalUrl ? 'View External Link' : 'View Case Study'}
              <svg
                width='16'
                height='16'
                viewBox='0 0 16 16'
                fill='none'
                className='group-hover:translate-x-1 transition-transform duration-200'
                aria-hidden='true'
              >
                {hasExternalUrl ? (
                  <path
                    d='M10 3H13M13 3V6M13 3L7 9M6 4H3V13H12V10'
                    stroke='currentColor'
                    strokeWidth='1.5'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                  />
                ) : (
                  <path
                    d='M3 8H13M13 8L9 4M13 8L9 12'
                    stroke='currentColor'
                    strokeWidth='1.5'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                  />
                )}
              </svg>
            </span>
          </div>
        </div>

        {/* Badges */}
        <div className='absolute top-4 left-4 flex gap-2'>
          {featured && (
            <span className='inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-accent text-white text-xs font-bold shadow-md'>
              ★ Featured
            </span>
          )}
          {hasExternalUrl && (
            <span className='inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-white/90 backdrop-blur-sm text-gray-800 text-xs font-semibold shadow-sm'>
              <svg
                width='10'
                height='10'
                viewBox='0 0 10 10'
                fill='none'
                aria-hidden='true'
              >
                <path
                  d='M6.5 2H8.5M8.5 2V4M8.5 2L4 6.5M3 2.5H2C1.724 2.5 1.5 2.724 1.5 3V8C1.5 8.276 1.724 8.5 2 8.5H7C7.276 8.5 7.5 8.276 7.5 8V7'
                  stroke='currentColor'
                  strokeWidth='1'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                />
              </svg>
              External
            </span>
          )}
        </div>
      </div>

      {/* Card Content */}
      <div className='flex flex-col flex-1 p-5 md:p-6 space-y-3'>
        {/* Categories */}
        <div className='flex flex-wrap gap-1.5'>
          {project.category.slice(0, 2).map((cat) => (
            <span
              key={cat}
              className={`text-xs font-semibold px-2.5 py-0.5 rounded-full ${
                categoryColors[cat] ?? 'bg-gray-100 text-gray-700'
              }`}
            >
              {cat}
            </span>
          ))}
          {project.category.length > 2 && (
            <span className='text-xs font-semibold px-2.5 py-0.5 rounded-full bg-gray-100 text-gray-500'>
              +{project.category.length - 2}
            </span>
          )}
        </div>

        {/* Title */}
        <h3
          className='text-lg md:text-xl font-bold text-text-primary group-hover:text-accent transition-colors duration-200 leading-snug'
          style={{ fontFamily: 'var(--font-playfair)' }}
        >
          {project.title}
        </h3>

        {/* Description */}
        <p className='text-sm text-text-muted leading-relaxed line-clamp-2 flex-1'>
          {project.description}
        </p>

        {/* Results (if case study available) */}
        {project.caseStudy?.results && project.caseStudy.results.length > 0 && (
          <div className='flex flex-wrap gap-2 pt-1'>
            {project.caseStudy.results.slice(0, 2).map((result) => (
              <span
                key={result}
                className='inline-flex items-center gap-1 text-xs font-medium text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-100'
              >
                <svg
                  width='10'
                  height='10'
                  viewBox='0 0 10 10'
                  fill='none'
                  aria-hidden='true'
                >
                  <path
                    d='M2 5L4 7L8 3'
                    stroke='currentColor'
                    strokeWidth='1.5'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                  />
                </svg>
                {result}
              </span>
            ))}
          </div>
        )}
      </div>
    </article>
  );

  if (hasExternalUrl) {
    return (
      <a
        href={project.externalUrl}
        target='_blank'
        rel='noopener noreferrer'
        aria-label={`View ${project.title} — opens in new tab`}
        className='block h-full'
        style={{ animationDelay: `${index * 100}ms` }}
      >
        {content}
      </a>
    );
  }

  return (
    <Link
      href={`/projects/${project.slug}`}
      className='block h-full'
      style={{ animationDelay: `${index * 100}ms` }}
    >
      {content}
    </Link>
  );
}
