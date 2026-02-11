import { projectService } from '@/lib/project-service';
import Link from 'next/link';
import { deleteProject } from './actions';

export default async function AdminDashboard() {
  const projects = await projectService.getAll();

  return (
    <div className='min-h-screen gradient-mesh p-8'>
      <div className='max-w-7xl mx-auto'>
        <div className='flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8'>
          <div className='animate-fade-in-up'>
            <h1 className='heading-lg text-foreground'>
              Projects Dashboard
            </h1>
            <p className='mt-2 text-sm text-muted'>
              Manage your portfolio projects
            </p>
          </div>
          <Link
            href='/admin/projects/new'
            className='clay-button inline-flex items-center gap-2'
          >
            <span>Add New Project</span>
            <svg
              className='w-5 h-5'
              fill='none'
              stroke='currentColor'
              viewBox='0 0 24 24'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M12 4v16m8-8H4'
              />
            </svg>
          </Link>
        </div>

{projects.length === 0 ? (
          <div className='clay-card p-12 text-center animate-fade-in-up delay-100'>
            <div className='text-6xl mb-4'>📁</div>
            <p className='text-muted'>
              No projects found. Create one to get started.
            </p>
          </div>
        ) : (
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-fade-in-up delay-100'>
            {projects.map((project, index) => (
              <div
                key={project.id}
                className='clay-card p-6 hover:scale-105 transition-transform duration-300'
                style={{ animationDelay: `${(index + 2) * 0.1}s` }}
              >
                <div className='space-y-4'>
                  {/* Header with category badges */}
                  <div className='flex flex-wrap gap-2'>
                    {project.category.map((cat) => (
                      <span
                        key={cat}
                        className='px-2 py-1 text-xs rounded-full bg-pastel-mint/50 text-foreground font-medium'
                      >
                        {cat}
                      </span>
                    ))}
                  </div>

                  {/* Title */}
                  <h3 className='font-serif font-semibold text-lg text-foreground line-clamp-2'>
                    {project.title}
                  </h3>

                  {/* Description */}
                  <p className='text-sm text-muted line-clamp-3'>
                    {project.description}
                  </p>

                  {/* Tags */}
                  <div className='flex flex-wrap gap-1'>
                    {project.tags.slice(0, 4).map((tag) => (
                      <span
                        key={tag}
                        className='text-xs px-2 py-0.5 rounded bg-background text-muted'
                      >
                        {tag}
                      </span>
                    ))}
                    {project.tags.length > 4 && (
                      <span className='text-xs px-2 py-0.5 rounded bg-background text-muted'>
                        +{project.tags.length - 4}
                      </span>
                    )}
                  </div>

                  {/* Actions */}
                  <div className='flex gap-3 pt-3 border-t border-foreground/10'>
                    <Link
                      href={`/admin/projects/${project.id}`}
                      className='group relative flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl font-semibold text-foreground overflow-hidden transition-all duration-300 hover:scale-105 active:scale-95'
                      style={{
                        background: 'linear-gradient(145deg, rgba(139, 124, 255, 0.08), rgba(139, 124, 255, 0.04))',
                        boxShadow: '0 2px 8px rgba(139, 124, 255, 0.1), inset 0 1px 0 rgba(255,255,255,0.6)',
                        border: '1.5px solid rgba(139, 124, 255, 0.2)',
                      }}
                    >
                      <span className='absolute inset-0 bg-gradient-to-r from-accent-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300'></span>
                      <svg
                        className='w-4 h-4 transition-all duration-300 group-hover:scale-110 group-hover:text-accent-primary'
                        fill='none'
                        stroke='currentColor'
                        viewBox='0 0 24 24'
                      >
                        <path
                          strokeLinecap='round'
                          strokeLinejoin='round'
                          strokeWidth={2}
                          d='M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z'
                        />
                      </svg>
                      <span className='relative'>Edit</span>
                    </Link>
                    <form
                      action={async () => {
                        'use server';
                        await deleteProject(project.id);
                      }}
                    >
                      <button
                        type='submit'
                        className='group relative inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl font-semibold overflow-hidden transition-all duration-300 hover:scale-105 active:scale-95'
                        style={{
                          background: 'linear-gradient(145deg, rgba(255, 150, 150, 0.1), rgba(255, 100, 100, 0.05))',
                          boxShadow: '0 2px 8px rgba(255, 100, 100, 0.1), inset 0 1px 0 rgba(255,255,255,0.6)',
                          border: '1.5px solid rgba(255, 100, 100, 0.2)',
                        }}
                        title='Delete'
                      >
                        <span className='absolute inset-0 bg-gradient-to-r from-red-400/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300'></span>
                        <svg
                          className='h-4 w-4 text-red-400 transition-all duration-300 group-hover:scale-110'
                          xmlns='http://www.w3.org/2000/svg'
                          viewBox='0 0 20 20'
                          fill='currentColor'
                          aria-hidden='true'
                        >
                          <path
                            fillRule='evenodd'
                            d='M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z'
                            clipRule='evenodd'
                          />
                        </svg>
                        <span className='relative text-red-400'>Delete</span>
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
