/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function AdminLogin() {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ password }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        router.push('/admin');
        router.refresh();
      } else {
        setError(data.message || 'Invalid password');
      }
    } catch (_) {
      setError('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='min-h-screen flex items-center justify-center bg-bg-subtle px-4'>
      <div className='max-w-sm w-full animate-fade-in-up'>
        <div className='text-center mb-6'>
          <div className='text-5xl mb-3'>🔐</div>
          <h2 className='heading-sm text-foreground'>Admin Login</h2>
          <p className='mt-1 text-sm text-muted'>
            Enter your password to access the panel
          </p>
        </div>

        <form
          className='card p-6 space-y-4'
          onSubmit={handleSubmit}
        >
          <div>
            <label
              htmlFor='password'
              className='block text-xs font-semibold text-foreground mb-3 uppercase tracking-wide'
            >
              Password
            </label>
            <input
              id='password'
              name='password'
              type='password'
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className='site-input py-2! px-3! text-sm!'
              placeholder='Enter your password'
            />
          </div>

          {error && (
            <div className='flex items-center gap-2 px-3 py-2.5 rounded-lg bg-red-50 border border-red-200 text-sm text-red-600 dark:bg-red-900/20 dark:border-red-800/40 dark:text-red-400'>
              <svg
                className='w-4 h-4 shrink-0'
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
              {error}
            </div>
          )}

          <button
            type='submit'
            disabled={loading}
            className='btn btn-primary w-full flex justify-center items-center gap-2 px-2.5! py-2! text-sm! disabled:opacity-50 disabled:cursor-not-allowed'
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
                Signing in...
              </>
            ) : (
              <>
                Sign in
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
                    d='M17 8l4 4m0 0l-4 4m4-4H3'
                  />
                </svg>
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
