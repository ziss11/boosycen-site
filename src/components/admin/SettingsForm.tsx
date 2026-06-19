'use client';

import { Settings } from '@/lib/settings-service';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import ResumeUpload from './ResumeUpload';

interface SettingsFormProps {
  initialData: Settings;
  action: (
    data: Partial<Settings>,
  ) => Promise<{ success: boolean; message?: string }>;
}

export default function SettingsForm({
  initialData,
  action,
}: SettingsFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const [formData, setFormData] = useState<Settings>({
    email: initialData.email || '',
    linkedinUrl: initialData.linkedinUrl || '',
    resumeUrl: initialData.resumeUrl || '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess(false);

    const email = formData.email.trim();
    const linkedinUrl = formData.linkedinUrl.trim();

    // Lightweight validation
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError('Please enter a valid email address');
      return;
    }
    if (!/^https?:\/\//i.test(linkedinUrl)) {
      setError('LinkedIn URL must start with http:// or https://');
      return;
    }

    setLoading(true);
    try {
      const result = await action({
        email,
        linkedinUrl,
        resumeUrl: formData.resumeUrl,
      });

      if (result.success) {
        setSuccess(true);
        router.refresh();
      } else {
        setError(result.message || 'Failed to save settings');
      }
    } catch (_) {
      setError('An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSuccess(false);
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <form
      onSubmit={handleSubmit}
      className='space-y-6 max-w-2xl card p-6 animate-fade-in-up delay-100'
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

      {success && (
        <div className='flex items-start gap-3 px-4 py-3.5 rounded-lg bg-emerald-50 border border-emerald-200 text-sm text-emerald-700'>
          <svg
            className='w-5 h-5 mt-0.5 shrink-0 text-emerald-500'
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
          <span className='font-medium'>Settings saved successfully</span>
        </div>
      )}

      {/* Section: Contact */}
      <div className='space-y-4'>
        <h3 className='text-sm font-bold text-foreground uppercase tracking-wide border-b border-foreground/10 pb-2'>
          Contact
        </h3>

        <div className='grid grid-cols-1 gap-y-4'>
          <div>
            <label className='block text-xs font-semibold text-foreground mb-1.5 uppercase tracking-wide'>
              Email
            </label>
            <input
              type='email'
              name='email'
              required
              value={formData.email}
              onChange={handleChange}
              placeholder='you@example.com'
              className='site-input py-2! px-3! text-sm! text-foreground placeholder:text-muted'
            />
            <p className='text-xs text-muted mt-1.5'>
              Shown in the header menu and contact section
            </p>
          </div>

          <div>
            <label className='block text-xs font-semibold text-foreground mb-1.5 uppercase tracking-wide'>
              LinkedIn URL
            </label>
            <input
              type='url'
              name='linkedinUrl'
              required
              value={formData.linkedinUrl}
              onChange={handleChange}
              placeholder='https://www.linkedin.com/in/...'
              className='site-input py-2! px-3! text-sm! text-foreground placeholder:text-muted'
            />
            <p className='text-xs text-muted mt-1.5'>
              Linked from the footer and contact section
            </p>
          </div>

          <div>
            <ResumeUpload
              value={formData.resumeUrl}
              onChange={(url) =>
                setFormData((prev) => ({ ...prev, resumeUrl: url }))
              }
            />
            <p className='text-xs text-muted mt-1.5'>
              When set, a “Download CV” button appears on the landing page
            </p>
          </div>
        </div>
      </div>

      <div className='flex flex-col sm:flex-row justify-end gap-3 pt-4 border-t border-foreground/10'>
        <button
          type='button'
          onClick={() => router.push('/admin')}
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
          Back
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
              Save Settings
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
