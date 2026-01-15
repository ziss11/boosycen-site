import { Project } from '@/data/projects';
import Link from 'next/link';

interface ProjectCardProps {
  project: Project;
  index: number;
}

export default function ProjectCard({ project, index }: ProjectCardProps) {
  return (
    <Link
      href={`/projects/${project.slug}`}
      className='group block'
      style={{ animationDelay: `${index * 100}ms` }}
    >
      <article className='relative overflow-hidden rounded-[var(--radius-lg)] bg-gradient-to-br from-white to-[rgba(250,248,245,0.95)] shadow-[var(--clay-shadow)] transition-all duration-500 hover:shadow-[var(--clay-shadow-hover)] hover:-translate-y-2 hover:scale-[1.02]'>
        {/* Thumbnail */}
        <div
          className={`relative aspect-[4/3] bg-gradient-to-br ${project.color} overflow-hidden`}
        >
          {/* Placeholder for actual image */}
          <div className='absolute inset-0 flex items-center justify-center'>
            <div className='text-6xl opacity-60 group-hover:scale-110 transition-transform duration-500'>
              {project.category === 'Mobile App'
                ? '📱'
                : project.category === 'Web Application'
                ? '💻'
                : project.category === 'E-Commerce'
                ? '🛒'
                : '📊'}
            </div>
          </div>

          {/* Hover overlay */}
          <div className='absolute inset-0 bg-gradient-to-t from-[rgba(45,45,45,0.8)] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6'>
            <span className='text-white font-medium flex items-center gap-2'>
              View Case Study
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
                  d='M17 8l4 4m0 0l-4 4m4-4H3'
                />
              </svg>
            </span>
          </div>
        </div>

        {/* Content */}
        <div className='p-6 space-y-3'>
          <div className='flex items-center gap-2'>
            <span className='text-xs font-semibold uppercase tracking-wider text-[var(--accent-primary)]'>
              {project.category}
            </span>
          </div>

          <h3 className='text-xl font-semibold font-[family-name:var(--font-playfair)] group-hover:text-[var(--accent-primary)] transition-colors'>
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
                className='text-xs px-3 py-1 rounded-full bg-[rgba(139,124,255,0.1)] text-[var(--foreground)]'
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </article>
    </Link>
  );
}
