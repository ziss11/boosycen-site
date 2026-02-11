/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';

import { Project } from '@/lib/project-service';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import FileUpload from './FileUpload';
import CategoryInput from './CategoryInput';
import { generateColorGradient } from '@/lib/color-generator';

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
    slug: initialData?.slug || '',
    description: initialData?.description || '',
    thumbnail: initialData?.thumbnail || '',
    color: initialData?.color || '',
    tags: initialData?.tags || [],
    externalUrl: initialData?.externalUrl || '',
  });

  const [tagsInput, setTagsInput] = useState(
    initialData?.tags?.join(', ') || '',
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const dataToSubmit: Partial<Project> = {
        ...formData,
        color: generateColorGradient(formData.slug || formData.title || ''),
        tags: tagsInput
          .split(',')
          .map((t) => t.trim())
          .filter(Boolean),
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
      className='space-y-6 max-w-4xl clay-card p-8 animate-fade-in-up delay-100'
    >
      {error && (
        <div className='px-4 py-3 rounded-lg bg-pastel-pink text-accent-secondary text-sm font-medium'>
          {error}
        </div>
      )}

      <div className='grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6'>
        <div className='sm:col-span-4'>
          <label className='block text-sm font-semibold text-foreground mb-2'>
            Title
          </label>
          <input
            type='text'
            name='title'
            required
            value={formData.title}
            onChange={handleChange}
            className='clay-input w-full text-foreground placeholder:text-muted'
          />
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
          <label className='block text-sm font-semibold text-foreground mb-2'>
            Slug (URL)
          </label>
          <input
            type='text'
            name='slug'
            required
            value={formData.slug}
            onChange={handleChange}
            className='clay-input w-full text-foreground placeholder:text-muted'
          />
        </div>

        <div className='sm:col-span-6'>
          <label className='block text-sm font-semibold text-foreground mb-2'>
            Description
          </label>
          <textarea
            name='description'
            rows={3}
            required
            value={formData.description}
            onChange={handleChange}
            className='clay-input w-full text-foreground placeholder:text-muted resize-none'
          />
        </div>

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
          <label className='block text-sm font-semibold text-foreground mb-2'>
            Tags (comma separated)
          </label>
          <input
            type='text'
            value={tagsInput}
            onChange={(e) => setTagsInput(e.target.value)}
            className='clay-input w-full text-foreground placeholder:text-muted'
          />
        </div>

        <div className='sm:col-span-6'>
          <label className='block text-sm font-semibold text-foreground mb-2'>
            External URL (opsional)
          </label>
          <input
            type='url'
            name='externalUrl'
            value={formData.externalUrl || ''}
            onChange={handleChange}
            placeholder='https://...'
            className='clay-input w-full text-foreground placeholder:text-muted'
          />
          <p className='text-xs text-muted mt-1'>
            Jika diisi, card project akan mengarah ke URL eksternal ini (Figma, Dribbble, dll)
          </p>
        </div>
      </div>

      <div className='flex flex-col sm:flex-row justify-end gap-4 pt-6'>
        <button
          type='button'
          onClick={() => router.back()}
          className='group relative px-6 py-3 rounded-xl font-semibold text-foreground overflow-hidden transition-all duration-300 hover:scale-105 active:scale-95'
          style={{
            background: 'linear-gradient(145deg, rgba(255,255,255,0.9), rgba(245,245,245,0.85))',
            boxShadow: '0 4px 15px rgba(139, 124, 255, 0.15), inset 0 1px 0 rgba(255,255,255,0.8), inset 0 -1px 0 rgba(0,0,0,0.05)',
            border: '2px solid rgba(139, 124, 255, 0.25)',
          }}
        >
          <span className='relative flex items-center justify-center gap-2'>
            <svg
              className='w-5 h-5 transition-transform duration-300 group-hover:-translate-x-1'
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
            <span>Cancel</span>
          </span>
        </button>
        <button
          type='submit'
          disabled={loading}
          className='group relative px-8 py-3 rounded-xl font-semibold text-white overflow-hidden transition-all duration-300 hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100'
          style={{
            background: 'linear-gradient(145deg, #8b7cff, #7c6cef)',
            boxShadow: '0 4px 15px rgba(139, 124, 255, 0.4), inset 0 1px 0 rgba(255,255,255,0.3), inset 0 -1px 0 rgba(0,0,0,0.1)',
          }}
        >
          <span className='absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300'></span>
          <span className='relative flex items-center justify-center gap-2'>
            {loading ? (
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
                <span>Saving...</span>
              </>
            ) : (
              <>
                <span>Save Project</span>
                <svg
                  className='w-5 h-5 transition-transform duration-300 group-hover:translate-x-1'
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
          </span>
        </button>
      </div>
    </form>
  );
}
