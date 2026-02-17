/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';

import { generateColorGradient } from '@/lib/color-generator';
import { Project } from '@/lib/project-service';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import CategoryInput from './CategoryInput';
import FileUpload from './FileUpload';

interface ProjectFormProps {
  initialData?: Project;
  action: (
    data: Partial<Project>,
  ) => Promise<{ success: boolean; message?: string }>;
}

export default function ProjectForm({ initialData, action }: ProjectFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const [formData, setFormData] = useState<Partial<Project>>({
    title: initialData?.title || '',
    category: initialData?.category || [],
    description: initialData?.description || '',
    thumbnail: initialData?.thumbnail || '',
    color: initialData?.color || '',
    externalUrl: initialData?.externalUrl || '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const dataToSubmit: Partial<Project> = {
        ...formData,
        color: generateColorGradient(formData.title || ''),
      };

      const result = await action(dataToSubmit);

      if (result.success) {
        router.push('/admin');
        router.refresh();
      } else {
        setError(result.message || 'Failed to save project');
      }
    } catch (_) {
      setError('An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <form
      onSubmit={handleSubmit}
      className='space-y-6 max-w-4xl card p-6 animate-fade-in-up delay-100'
    >
      {error && (
        <div className='flex items-start gap-3 px-4 py-3.5 rounded-lg bg-red-50 border border-red-200 text-sm text-red-700'>
          <svg
            className='w-5 h-5 mt-0.5 shrink-0 text-red-500'
            fill='none'
            stroke='currentColor'
            viewBox='0 0 24 24'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth={2}
              d='M12 9v2m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z'
            />
          </svg>
          <span className='font-medium'>{error}</span>
        </div>
      )}

      {/* Section 1: Project Details */}
      <div className='space-y-4'>
        <h3 className='text-sm font-bold text-foreground uppercase tracking-wide border-b border-foreground/10 pb-2'>
          Project Details
        </h3>

        <div className='grid grid-cols-1 gap-y-4 gap-x-4 sm:grid-cols-6'>
          <div className='sm:col-span-4'>
            <label className='block text-xs font-semibold text-foreground mb-1.5 uppercase tracking-wide'>
              Title
            </label>
            <input
              type='text'
              name='title'
              required
              value={formData.title}
              onChange={handleChange}
              placeholder='e.g. E-Commerce Redesign'
              className='site-input py-2! px-3! text-sm! text-foreground placeholder:text-muted'
            />
            <p className='text-xs text-muted mt-1.5'>
              Keep it concise — ideally under 60 characters
            </p>
          </div>

          <div className='sm:col-span-6'>
            <CategoryInput
              value={formData.category || []}
              onChange={(categories) =>
                setFormData((prev) => ({ ...prev, category: categories }))
              }
            />
          </div>

          <div className='sm:col-span-6'>
            <label className='block text-xs font-semibold text-foreground mb-1.5 uppercase tracking-wide'>
              Description
            </label>
            <textarea
              name='description'
              rows={3}
              required
              value={formData.description}
              onChange={handleChange}
              placeholder='Briefly describe the project, its goals and your role...'
              className='site-input py-2! px-3! text-sm! text-foreground placeholder:text-muted resize-none'
            />
          </div>
        </div>
      </div>

      {/* Section 2: Media & Links */}
      <div className='space-y-4'>
        <h3 className='text-sm font-bold text-foreground uppercase tracking-wide border-b border-foreground/10 pb-2'>
          Media &amp; Links
        </h3>

        <div className='grid grid-cols-1 gap-y-4 gap-x-4 sm:grid-cols-6'>
          <div className='sm:col-span-6'>
            <FileUpload
              value={formData.thumbnail || ''}
              onChange={(url) =>
                setFormData((prev) => ({ ...prev, thumbnail: url }))
              }
              label='Project Thumbnail'
            />
          </div>

          <div className='sm:col-span-6'>
            <label className='block text-xs font-semibold text-foreground mb-1.5 uppercase tracking-wide'>
              External URL{' '}
              <span className='font-normal text-muted'>(optional)</span>
            </label>
            <input
              type='url'
              name='externalUrl'
              value={formData.externalUrl || ''}
              onChange={handleChange}
              placeholder='https://...'
              className='site-input py-2! px-3! text-sm! text-foreground placeholder:text-muted'
            />
            <p className='text-xs text-muted mt-1.5'>
              If set, the project card will link to this URL (Figma, Dribbble,
              etc.)
            </p>
          </div>
        </div>
      </div>

      <div className='flex flex-col sm:flex-row justify-end gap-3 pt-4 border-t border-foreground/10'>
        <button
          type='button'
          onClick={() => router.back()}
          className='btn btn-secondary inline-flex items-center gap-1.5 px-4! py-2! text-sm!'
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
              d='M10 19l-7-7m0 0l7-7m-7 7h18'
            />
          </svg>
          Cancel
        </button>
        <button
          type='submit'
          disabled={loading}
          className='btn btn-primary inline-flex items-center gap-1.5 px-4! py-2! text-sm! disabled:opacity-50 disabled:cursor-not-allowed'
        >
          {loading ? (
            <>
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
              Saving...
            </>
          ) : (
            <>
              Save Project
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
                  d='M5 13l4 4L19 7'
                />
              </svg>
            </>
          )}
        </button>
      </div>
    </form>
  );
}
