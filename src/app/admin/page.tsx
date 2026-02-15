'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

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
  const [logoutLoading, setLogoutLoading] = useState(false);

  useEffect(() => {
    fetch('/api/projects')
      .then((res) => res.json())
      .then((data) => setProjects(data))
      .finally(() => setLoading(false));
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this project?')) return;

    const res = await fetch('/api/projects', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id }),
    });

    if (res.ok) {
      setProjects((prev) => prev.filter((p) => p.id !== id));
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
          <div className='flex items-center gap-3'>
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
            <button
              onClick={handleLogout}
              disabled={logoutLoading}
              className='group relative inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl font-semibold text-red-400 overflow-hidden transition-all duration-300 hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100'
              style={{
                background: 'linear-gradient(145deg, rgba(255, 100, 100, 0.1), rgba(255, 80, 80, 0.05))',
                boxShadow: '0 2px 8px rgba(255, 100, 100, 0.1), inset 0 1px 0 rgba(255,255,255,0.6)',
                border: '1.5px solid rgba(255, 100, 100, 0.2)',
              }}
            >
              <span className='absolute inset-0 bg-gradient-to-r from-red-400/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300'></span>
              {logoutLoading ? (
                <>
                  <svg
                    className='animate-spin h-5 w-5'
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
                </>
              ) : (
                <>
                  <svg
                    className='w-5 h-5 transition-all duration-300 group-hover:scale-110'
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
                  <span>Logout</span>
                </>
              )}
            </button>
          </div>
        </div>

        {loading ? (
          <div className='clay-card p-12 text-center animate-fade-in-up delay-100'>
            <div className='inline-block animate-spin h-8 w-8 border-4 border-accent-primary border-t-transparent rounded-full'></div>
            <p className='text-muted mt-4'>Loading projects...</p>
          </div>
        ) : projects.length === 0 ? (
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

                  {/* Thumbnail Preview */}
                  {project.thumbnail && (
                    <div className='relative aspect-video rounded-lg overflow-hidden'>
                      <Image
                        src={project.thumbnail}
                        alt={project.title}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
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
                    <button
                      onClick={() => handleDelete(project.id)}
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
