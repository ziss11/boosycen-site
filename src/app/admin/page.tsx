'use client';

import ThemeToggle from '@/components/ui/ThemeToggle';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

const categoryColors: Record<string, string> = {
  'Mobile App': 'bg-violet-100 text-violet-700 dark:bg-violet-900/30 dark:text-violet-300',
  'Web Application': 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300',
  'E-Commerce': 'bg-pink-100 text-pink-700 dark:bg-pink-900/30 dark:text-pink-300',
  Dashboard: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300',
};

interface Project {
  id: string;
  slug: string;
  title: string;
  category: string[];
  description: string;
  thumbnail: string;
  color: string;
  externalUrl?: string;
}

export default function AdminDashboard() {
  const router = useRouter();
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [logoutLoading, setLogoutLoading] = useState(false);

  useEffect(() => {
    fetch('/api/projects')
      .then((res) => {
        if (!res.ok) {
          throw new Error(`Failed to fetch projects: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        if (!Array.isArray(data)) {
          throw new Error('Invalid response format');
        }
        setProjects(data);
        setError(null);
      })
      .catch((err) => {
        console.error('Error loading projects:', err);
        setError(
          err instanceof Error ? err.message : 'Failed to load projects',
        );
      })
      .finally(() => setLoading(false));
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this project?')) return;

    try {
      const res = await fetch('/api/projects', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id }),
      });

      if (res.ok) {
        setProjects((prev) => prev.filter((p) => p.id !== id));
      } else {
        const data = await res.json();
        alert(`Failed to delete project: ${data.message || 'Unknown error'}`);
      }
    } catch (error) {
      console.error('Delete error:', error);
      alert('Failed to delete project. Please try again.');
    }
  };

  const handleLogout = async () => {
    setLogoutLoading(true);
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
      router.push('/admin/login');
    } catch (error) {
      console.error('Logout failed:', error);
    } finally {
      setLogoutLoading(false);
    }
  };

  return (
    <div className='min-h-screen bg-bg-subtle'>
      {/* Header bar */}
      <div className='glass border-b border-b-(--border-light) sticky top-0 z-10'>
        <div className='max-w-7xl mx-auto px-4 py-2.5 flex justify-between items-center gap-3'>
          {/* Left: title + badge */}
          <div className='flex items-center gap-2.5 animate-fade-in'>
            <span className='text-xs font-semibold text-muted uppercase tracking-wider hidden sm:block'>
              Admin /
            </span>
            <h1 className='text-base font-bold text-foreground'>
              Projects Dashboard
            </h1>
            {!loading && !error && (
              <span className='badge text-xs py-0.5 px-2.5 inline-flex items-center gap-1'>
                <svg className='w-3 h-3 shrink-0' fill='none' stroke='currentColor' viewBox='0 0 24 24' aria-hidden='true'>
                  <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M3 7h18M3 12h18M3 17h18' />
                </svg>
                <span className='hidden sm:inline'>
                  {projects.length}{' '}{projects.length === 1 ? 'project' : 'projects'}
                </span>
                <span className='sm:hidden'>{projects.length}</span>
              </span>
            )}
          </div>

          {/* Right: actions */}
          <div className='flex items-center gap-2'>
            <ThemeToggle className='text-muted' />
            <Link
              href='/admin/projects/new'
              className='btn btn-primary inline-flex items-center gap-1 px-3! py-1.5! text-sm!'
              aria-label='Add New Project'
            >
              <span className='hidden sm:inline'>Add New</span>
              <svg
                className='w-3.5 h-3.5'
                fill='none'
                stroke='currentColor'
                viewBox='0 0 24 24'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2.5}
                  d='M12 4v16m8-8H4'
                />
              </svg>
            </Link>
            <button
              onClick={handleLogout}
              disabled={logoutLoading}
              className='btn inline-flex items-center gap-1.5 px-3! py-1.5! text-sm! border border-red-200 text-red-500 hover:bg-red-50 hover:border-red-300 dark:border-red-800/40 dark:text-red-400 dark:hover:bg-red-900/20 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed'
              aria-label='Logout'
            >
              {logoutLoading ? (
                <svg
                  className='animate-spin h-4 w-4'
                  fill='none'
                  viewBox='0 0 24 24'
                >
                  <circle
                    className='opacity-25'
                    cx='12'
                    cy='12'
                    r='10'
                    stroke='currentColor'
                    strokeWidth='4'
                  />
                  <path
                    className='opacity-75'
                    fill='currentColor'
                    d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'
                  />
                </svg>
              ) : (
                <>
                  <svg
                    className='w-4 h-4'
                    fill='none'
                    stroke='currentColor'
                    viewBox='0 0 24 24'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth={2}
                      d='M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1'
                    />
                  </svg>
                  <span className='hidden sm:inline'>Logout</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      <div className='max-w-7xl mx-auto px-6 py-8'>
        {error && (
          <div className='card p-12 text-center animate-fade-in-up'>
            <div className='text-5xl mb-4'>⚠️</div>
            <p className='text-red-600 font-semibold mb-2'>
              Error Loading Projects
            </p>
            <p className='text-muted text-sm mb-6'>{error}</p>
            <button
              onClick={() => window.location.reload()}
              className='btn btn-primary btn-sm'
            >
              Retry
            </button>
          </div>
        )}

        {!error && loading ? (
          <div className='card p-12 text-center animate-fade-in-up'>
            <div className='inline-block animate-spin h-8 w-8 border-4 border-accent-primary border-t-transparent rounded-full mb-4'></div>
            <p className='text-muted'>Loading projects...</p>
          </div>
        ) : !error && projects.length === 0 ? (
          <div className='card p-16 text-center animate-fade-in-up border-dashed'>
            <div className='text-5xl mb-4'>📁</div>
            <p className='heading-sm text-foreground mb-2'>No projects yet</p>
            <p className='text-muted text-sm mb-6'>
              Create your first project to get started.
            </p>
            <Link
              href='/admin/projects/new'
              className='btn btn-primary btn-sm'
            >
              Add New Project
            </Link>
          </div>
        ) : !error ? (
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-fade-in-up'>
            {projects.map((project, index) => (
              <div
                key={project.id}
                className='card card-hover p-6'
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                <div className='space-y-4'>
                  {/* Header with category badges */}
                  <div className='flex flex-wrap gap-1.5'>
                    {project.category.map((cat) => (
                      <span
                        key={cat}
                        className={`text-xs font-semibold px-2.5 py-0.5 rounded-full ${
                          categoryColors[cat] ?? 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300'
                        }`}
                      >
                        {cat}
                      </span>
                    ))}
                  </div>

                  {/* Thumbnail Preview */}
                  {project.thumbnail && (
                    <div className='relative aspect-video rounded-lg overflow-hidden'>
                      <Image
                        src={project.thumbnail}
                        alt={project.title}
                        fill
                        className='object-cover'
                        sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
                      />
                    </div>
                  )}

                  {/* Title */}
                  <h3 className='font-serif font-semibold text-lg text-foreground line-clamp-2'>
                    {project.title}
                  </h3>

                  {/* Description */}
                  <p className='text-sm text-muted line-clamp-3'>
                    {project.description}
                  </p>

                  {/* Actions */}
                  <div className='flex gap-3 pt-3 border-t border-(--border-light)'>
                    <Link
                      href={`/admin/projects/${project.id}`}
                      className='btn btn-sm btn-secondary flex-1 text-sm!'
                    >
                      <svg
                        className='w-4 h-4'
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
                      Edit
                    </Link>
                    <button
                      onClick={() => handleDelete(project.id)}
                      className='btn btn-sm inline-flex items-center gap-2 text-sm! border border-red-200 text-red-500 hover:bg-red-50 hover:border-red-300 dark:border-red-800/40 dark:text-red-400 dark:hover:bg-red-900/20 transition-colors duration-200'
                      title='Delete'
                    >
                      <svg
                        className='h-4 w-4'
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
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : null}
      </div>
    </div>
  );
}
