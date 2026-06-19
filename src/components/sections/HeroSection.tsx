'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

const phrases = [
  'feel natural',
  'delight users',
  'solve problems',
  'inspire action',
  'build trust',
];

interface HeroSectionProps {
  resumeUrl?: string;
}

export default function HeroSection({ resumeUrl }: HeroSectionProps) {
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [isFading, setIsFading] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsFading(true);
      setTimeout(() => {
        setPhraseIndex((prev) => (prev + 1) % phrases.length);
        setIsFading(false);
      }, 350);
    }, 2800);
    return () => clearInterval(interval);
  }, []);

  return (
    <section
      className='relative min-h-svh flex flex-col overflow-hidden bg-bg-primary pt-6 md:pt-24 pb-16'
      aria-label='Hero section'
    >
      {/* Grid texture background */}
      <div
        className='absolute inset-0 pointer-events-none grid-bg opacity-60'
        aria-hidden='true'
      />

      {/* Gradient orbs */}
      <div
        className='absolute inset-0 pointer-events-none overflow-hidden'
        aria-hidden='true'
      >
        <div className='absolute -top-32 -right-32 w-[500px] h-[500px] rounded-full bg-accent/8 blur-[80px]' />
        <div className='absolute top-1/2 -right-16 w-72 h-72 rounded-full bg-accent-pink/8 blur-[60px]' />
        <div className='absolute -bottom-24 left-1/4 w-80 h-80 rounded-full bg-accent-light/6 blur-[70px]' />
      </div>

      <div className='container relative z-10 pt-28 md:pt-32 pb-16 flex-1 flex flex-col justify-center'>
        <div className='grid grid-cols-1 lg:grid-cols-[1fr_0.9fr] gap-10 lg:gap-16 items-center'>
          {/* ── LEFT: Text Content ── */}
          <div className='space-y-6 md:space-y-8 text-center lg:text-left'>
            {/* Main Headline */}
            <h1 className='heading-display'>
              I design
              <br className='hidden sm:block' />
              experiences that
              <br className='hidden lg:block' />
              <span
                className='text-gradient inline-block min-w-0'
                style={{
                  opacity: isFading ? 0 : 1,
                  transform: isFading ? 'translateY(10px)' : 'translateY(0)',
                  transition:
                    'opacity 0.35s ease-out, transform 0.35s ease-out',
                }}
              >
                {phrases[phraseIndex]}
              </span>
            </h1>

            {/* Subtitle */}
            <p className='body-lg text-text-muted max-w-lg mx-auto lg:mx-0'>
              Hi, I&apos;m{' '}
              <span className='font-semibold text-text-primary'>
                Griselda Putri
              </span>{' '}
              — a UI/UX Designer who transforms complex problems into elegant,
              user-centered solutions. I design with empathy, iterate with data.
            </p>

            {/* Inline stats */}
            <div className='flex flex-wrap items-center justify-center lg:justify-start gap-6 md:gap-8 pt-1'>
              {[
                { value: '1+', label: 'Years Exp.' },
                { value: '10+', label: 'Projects Done' },
              ].map((stat) => (
                <div
                  key={stat.label}
                  className='flex flex-col items-center lg:items-start'
                >
                  <span
                    className='text-2xl md:text-3xl font-bold text-text-primary leading-none'
                    style={{ fontFamily: 'var(--font-playfair)' }}
                  >
                    {stat.value}
                  </span>
                  <span className='text-xs md:text-sm text-text-muted font-medium mt-0.5'>
                    {stat.label}
                  </span>
                </div>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className='flex flex-col sm:flex-row gap-3 justify-center lg:justify-start pt-1'>
              <Link
                href='#work'
                className='btn-primary'
              >
                See My Work
                <svg
                  width='16'
                  height='16'
                  viewBox='0 0 16 16'
                  fill='none'
                  aria-hidden='true'
                >
                  <path
                    d='M8 3L13 8M13 8L8 13M13 8H3'
                    stroke='currentColor'
                    strokeWidth='1.5'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                  />
                </svg>
              </Link>
              <Link
                href='#contact'
                className='btn-secondary'
              >
                Let&apos;s Connect
              </Link>
              {resumeUrl && (
                <a
                  href={resumeUrl}
                  target='_blank'
                  rel='noopener noreferrer'
                  className='btn-secondary'
                >
                  Download CV
                  <svg
                    width='16'
                    height='16'
                    viewBox='0 0 16 16'
                    fill='none'
                    aria-hidden='true'
                  >
                    <path
                      d='M8 2v8m0 0L5 7m3 3l3-3M3 13h10'
                      stroke='currentColor'
                      strokeWidth='1.5'
                      strokeLinecap='round'
                      strokeLinejoin='round'
                    />
                  </svg>
                </a>
              )}
            </div>
          </div>

          {/* ── RIGHT: Design Canvas Visual ── */}
          <div className='relative flex justify-center items-center mt-8 lg:mt-0'>
            <div className='relative w-full max-w-[340px] sm:max-w-[380px] lg:max-w-[420px]'>
              {/* Main Mockup Card */}
              <div className='card p-4 md:p-5 animate-float shadow-lg'>
                {/* Browser chrome bar */}
                <div className='flex items-center gap-1.5 pb-3 mb-3 border-b border-(--border-light)'>
                  <div className='w-2.5 h-2.5 rounded-full bg-red-400' />
                  <div className='w-2.5 h-2.5 rounded-full bg-yellow-400' />
                  <div className='w-2.5 h-2.5 rounded-full bg-green-400' />
                  <div className='ml-2 flex-1 h-5 rounded-md bg-gray-100 dark:bg-gray-800 flex items-center px-2'>
                    <div className='w-20 h-1.5 rounded bg-gray-200 dark:bg-gray-700' />
                  </div>
                </div>

                {/* Hero banner mock */}
                <div className='h-24 md:h-28 rounded-xl bg-linear-to-br from-violet-50 to-pink-50 dark:from-violet-950/30 dark:to-pink-950/20 border border-violet-100/50 dark:border-violet-800/30 mb-3 flex flex-col items-center justify-center gap-2.5'>
                  <div className='w-20 h-2 rounded-full bg-violet-300' />
                  <div className='w-32 h-1.5 rounded-full bg-violet-200' />
                  <div className='flex gap-2 mt-1'>
                    <div className='w-14 h-5 rounded-full bg-violet-500' />
                    <div className='w-14 h-5 rounded-full border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900' />
                  </div>
                </div>

                {/* Card grid mock */}
                <div className='grid grid-cols-3 gap-2 mb-2'>
                  {[
                    {
                      bg: 'bg-violet-100 dark:bg-violet-900/30',
                      dot: 'bg-violet-400',
                    },
                    {
                      bg: 'bg-pink-100 dark:bg-pink-900/30',
                      dot: 'bg-pink-400',
                    },
                    {
                      bg: 'bg-blue-100 dark:bg-blue-900/30',
                      dot: 'bg-blue-400',
                    },
                  ].map((item, i) => (
                    <div
                      key={i}
                      className={`h-14 rounded-lg ${item.bg} flex flex-col items-center justify-center gap-1.5`}
                    >
                      <div
                        className={`w-4 h-4 rounded ${item.dot} opacity-70`}
                      />
                      <div className='w-8 h-1 rounded bg-black/10' />
                    </div>
                  ))}
                </div>

                {/* Input + button row */}
                <div className='flex gap-2'>
                  <div className='flex-1 h-8 rounded-lg bg-gray-50 dark:bg-gray-800 border border-gray-100 dark:border-gray-700 flex items-center px-2'>
                    <div className='w-16 h-1.5 rounded bg-gray-200 dark:bg-gray-600' />
                  </div>
                  <div className='w-16 h-8 rounded-lg bg-violet-600 flex items-center justify-center'>
                    <div className='w-8 h-1.5 rounded bg-white/70' />
                  </div>
                </div>
              </div>

              {/* Floating chip — top left */}
              <div className='absolute -top-5 -left-2 sm:-left-6 animate-float-delayed'>
                <div className='chip shadow-md text-xs'>🎨 Figma Expert</div>
              </div>

              {/* Floating chip — bottom right */}
              <div className='absolute -bottom-4 -right-2 sm:-right-4 animate-float-alt'>
                <div className='chip shadow-md text-xs'>✦ User Research</div>
              </div>

              {/* Color palette — left side */}
              <div className='absolute -left-6 sm:-left-10 top-1/2 -translate-y-1/2 flex flex-col gap-1.5 animate-float-slow'>
                {['#7C3AED', '#EC4899', '#3B82F6', '#10B981', '#F59E0B'].map(
                  (color) => (
                    <div
                      key={color}
                      className='w-4 h-4 rounded-full border-2 border-white shadow-sm'
                      style={{ backgroundColor: color }}
                      aria-hidden='true'
                    />
                  ),
                )}
              </div>

              {/* Approval badge — top right */}
              <div className='absolute -top-7 right-4 hidden sm:flex items-center gap-1.5 bg-white dark:bg-gray-900 rounded-full pl-2.5 pr-3 py-1.5 shadow-md border border-(--border-light) animate-float'>
                <div className='w-5 h-5 rounded-full bg-green-100 flex items-center justify-center'>
                  <svg
                    width='10'
                    height='10'
                    viewBox='0 0 10 10'
                    fill='none'
                    aria-hidden='true'
                  >
                    <path
                      d='M2 5L4 7L8 3'
                      stroke='#22c55e'
                      strokeWidth='1.5'
                      strokeLinecap='round'
                      strokeLinejoin='round'
                    />
                  </svg>
                </div>
                <span className='text-xs font-semibold text-gray-700 dark:text-gray-300'>
                  Design Approved
                </span>
              </div>

              {/* Layers panel hint — right side */}
              <div className='absolute -right-4 sm:-right-10 top-1/3 flex flex-col gap-1 animate-float-delayed'>
                {[
                  'bg-violet-200',
                  'bg-gray-200',
                  'bg-pink-200',
                  'bg-blue-200',
                ].map((c, i) => (
                  <div
                    key={i}
                    className={`${c} h-2 rounded-sm`}
                    style={{ width: `${28 - i * 4}px` }}
                    aria-hidden='true'
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
