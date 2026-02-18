'use client';

import ThemeToggle from '@/components/ui/ThemeToggle';
import ProjectForm from '@/components/admin/ProjectForm';
import { createProject } from '../../actions';
import Link from 'next/link';

export default function NewProjectPage() {
  return (
    <div className='min-h-screen bg-bg-subtle px-4 py-8 md:px-8'>
      <div className='max-w-4xl mx-auto'>
        <div className='mb-8 animate-fade-in-up flex items-start justify-between'>
          <div>
            <div className='flex items-center gap-2 mb-2'>
              <Link
                href='/admin'
                className='text-sm text-muted hover:text-foreground transition-colors flex items-center gap-1'
              >
                <svg width='14' height='14' viewBox='0 0 24 24' fill='none' aria-hidden='true'>
                  <path d='M19 12H5M5 12l7-7M5 12l7 7' stroke='currentColor' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round' />
                </svg>
                Back
              </Link>
            </div>
            <h1 className='heading-lg text-foreground flex items-center gap-3'>
              <span className='text-4xl'>✨</span>
              Add New Project
            </h1>
            <p className='mt-2 text-sm text-muted'>
              Fill in the details to create a new portfolio project
            </p>
          </div>
          <ThemeToggle className='text-muted mt-1' />
        </div>
        <ProjectForm action={createProject} />
      </div>
    </div>
  );
}
