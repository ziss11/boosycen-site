'use client';

import { useTheme } from '@/contexts/ThemeContext';

interface ThemeToggleProps {
  className?: string;
}

export default function ThemeToggle({ className = '' }: ThemeToggleProps) {
  const { isDark, toggleTheme } = useTheme();
  return (
    <button
      onClick={toggleTheme}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      className={`p-2 rounded-lg hover:bg-black/5 dark:hover:bg-white/5 transition-colors ${className}`}
    >
      <svg
        width='18'
        height='18'
        viewBox='0 0 24 24'
        fill='none'
        className='transition-transform duration-500'
        style={{ transform: isDark ? 'rotate(180deg)' : 'rotate(0deg)' }}
        aria-hidden='true'
      >
        {isDark ? (
          <path
            d='M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z'
            stroke='currentColor'
            strokeWidth='2'
            strokeLinecap='round'
            strokeLinejoin='round'
          />
        ) : (
          <>
            <circle cx='12' cy='12' r='5' stroke='currentColor' strokeWidth='2' />
            <path
              d='M12 2v2M12 20v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M2 12h2M20 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42'
              stroke='currentColor'
              strokeWidth='2'
              strokeLinecap='round'
            />
          </>
        )}
      </svg>
    </button>
  );
}
