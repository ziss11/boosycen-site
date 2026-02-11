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
    <div className='min-h-screen flex items-center justify-center gradient-mesh px-4'>
      <div className='max-w-md w-full space-y-8 animate-fade-in-up'>
        <div className='text-center'>
          <div className='text-6xl mb-4'>🔐</div>
          <h2 className='heading-lg text-foreground'>
            Admin Login
          </h2>
          <p className='mt-2 text-sm text-muted'>
            Please enter the password to access the panel
          </p>
        </div>
        <form
          className='mt-8 space-y-6 clay-card p-8'
          onSubmit={handleSubmit}
        >
          <div>
            <label
              htmlFor='password'
              className='block text-sm font-medium text-foreground mb-2'
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
              className='clay-input w-full text-foreground placeholder:text-muted'
              placeholder='Enter your password'
            />
          </div>

          {error && (
            <div className='px-4 py-3 rounded-lg bg-pastel-pink text-accent-secondary text-sm text-center font-medium'>
              {error}
            </div>
          )}

          <div>
            <button
              type='submit'
              disabled={loading}
              className='clay-button w-full flex justify-center items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed'
            >
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
                  <span>Signing in...</span>
                </>
              ) : (
                <>
                  <span>Sign in</span>
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
                      d='M17 8l4 4m0 0l-4 4m4-4H3'
                    />
                  </svg>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
