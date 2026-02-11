import { Project } from '@/data/projects';
import Link from 'next/link';

interface ProjectCardProps {
  project: Project;
  index: number;
}

export default function ProjectCard({ project, index }: ProjectCardProps) {
  const hasExternalUrl = Boolean(project.externalUrl);

  // Article content (duplicated for both render paths)
  const articleContent = (
    <article className='relative overflow-hidden rounded-lg bg-linear-to-br from-white to-background/95 shadow-lg transition-all duration-500 hover:shadow-xl hover:-translate-y-2 hover:scale-[1.02]'>
      {/* External Link Badge */}
      {hasExternalUrl && (
        <div className='absolute top-4 right-4 z-10'>
          <span className='inline-flex items-center gap-1 px-3 py-1 rounded-full bg-white/90 backdrop-blur-sm text-xs font-semibold shadow-sm'
                style={{ color: '#8b7cff' }}>
            <svg className='w-3 h-3' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
              <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14' />
            </svg>
            External
          </span>
        </div>
      )}

      {/* Thumbnail */}
      <div className={`relative aspect-4/3 ${project.color} overflow-hidden`}>
        {/* Placeholder for actual image */}
        <div className='absolute inset-0 flex items-center justify-center'>
          <div className='text-6xl opacity-60 group-hover:scale-110 transition-transform duration-500'>
            {project.category.includes('Mobile App')
              ? '📱'
              : project.category.includes('Web Application')
              ? '💻'
              : project.category.includes('E-Commerce')
              ? '🛒'
              : '📊'}
          </div>
        </div>

        {/* Hover overlay */}
        <div className='absolute inset-0 bg-linear-to-t from-foreground/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6'>
          <span className='text-white font-medium flex items-center gap-2'>
            {hasExternalUrl ? 'View External Link' : 'View Case Study'}
            <svg
              className='w-4 h-4 group-hover:translate-x-1 transition-transform'
              fill='none'
              stroke='currentColor'
              viewBox='0 0 24 24'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d={hasExternalUrl
                  ? 'M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14'
                  : 'M17 8l4 4m0 0l-4 4m4-4H3'}
              />
            </svg>
          </span>
        </div>
      </div>

      {/* Content */}
      <div className='p-6 space-y-3'>
        <div className='flex items-center flex-wrap gap-2'>
          {project.category.slice(0, 2).map((cat) => (
            <span
              key={cat}
              className='text-xs font-semibold uppercase tracking-wider text-accent-primary'
            >
              {cat}
            </span>
          ))}
          {project.category.length > 2 && (
            <span className='text-xs font-semibold uppercase tracking-wider text-muted'>
              +{project.category.length - 2}
            </span>
          )}
        </div>

        <h3 className='text-xl font-semibold font-serif group-hover:text-accent-primary transition-colors'>
          {project.title}
        </h3>

        <p className='text-muted text-sm line-clamp-2'>
          {project.description}
        </p>

        {/* Tags */}
        <div className='flex flex-wrap gap-2 pt-2'>
          {project.tags.map((tag) => (
            <span
              key={tag}
              className='text-xs px-3 py-1 rounded-full bg-accent-primary/10 text-foreground'
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </article>
  );

  // Conditional wrapper: <a> for external URL, <Link> for internal
  if (hasExternalUrl) {
    return (
      <a
        href={project.externalUrl}
        target='_blank'
        rel='noopener noreferrer'
        aria-label={`View ${project.title} external link (opens in new tab)`}
        className='group block'
        style={{ animationDelay: `${index * 100}ms` }}
      >
        {articleContent}
      </a>
    );
  }

  return (
    <Link
      href={`/projects/${project.slug}`}
      className='group block'
      style={{ animationDelay: `${index * 100}ms` }}
    >
      {articleContent}
    </Link>
  );
}
