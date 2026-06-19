'use client';

import ThemeToggle from '@/components/ui/ThemeToggle';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';

const navLinks = [
  { href: '#about', label: 'About' },
  { href: '#work', label: 'Work' },
  { href: '#process', label: 'Process' },
  { href: '#contact', label: 'Contact' },
];

interface HeaderProps {
  email?: string;
}

export default function Header({
  email = 'putrigriseldac@gmail.com',
}: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on resize to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) setIsMobileMenuOpen(false);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <>
      <header
        className={`sticky md:fixed top-0 left-0 right-0 z-50 transition-all duration-400 ${
          isScrolled
            ? 'glass border-b border-b-(--border-light) py-3 shadow-sm'
            : 'bg-bg-primary/95 backdrop-blur-sm border-b border-b-transparent py-5'
        }`}
      >
        <div className='container flex items-center justify-between'>
          {/* Logo */}
          <Link
            href='/'
            className='group flex items-center gap-2.5'
            aria-label='Griselda — Home'
          >
            <Image
              src='/logo.png'
              alt='Griselda logo'
              width={32}
              height={32}
              className='rounded-lg shrink-0'
            />
            <span
              className='text-lg font-bold text-text-primary group-hover:text-accent transition-colors duration-200'
              style={{ fontFamily: 'var(--font-playfair)' }}
            >
              Griselda
              <span className='text-accent'>.</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav
            className='hidden md:flex items-center gap-1'
            aria-label='Main navigation'
          >
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className='relative px-4 py-2 text-sm font-medium text-text-muted hover:text-text-primary rounded-full hover:bg-black/5 dark:hover:bg-white/5 transition-all duration-200'
              >
                {link.label}
              </Link>
            ))}
            <ThemeToggle className='ml-1 text-text-muted' />
          </nav>

          {/* Mobile: Theme toggle + Hamburger */}
          <div className='md:hidden flex items-center gap-1'>
            <ThemeToggle className='text-text-muted' />
            <button
              className='flex flex-col justify-center items-center w-10 h-10 rounded-lg hover:bg-black/5 dark:hover:bg-white/5 transition-colors'
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={isMobileMenuOpen}
            >
              <span
                className={`block w-5 h-0.5 bg-text-primary rounded-full transition-all duration-300 ${
                  isMobileMenuOpen ? 'rotate-45 translate-y-[3px]' : ''
                }`}
              />
              <span
                className={`block w-5 h-0.5 bg-text-primary rounded-full transition-all duration-300 my-[3px] ${
                  isMobileMenuOpen ? 'opacity-0 scale-x-0' : ''
                }`}
              />
              <span
                className={`block w-5 h-0.5 bg-text-primary rounded-full transition-all duration-300 ${
                  isMobileMenuOpen ? '-rotate-45 -translate-y-[6px]' : ''
                }`}
              />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Full-Screen Overlay Menu */}
      <div
        className={`fixed inset-0 z-40 md:hidden transition-all duration-400 ${
          isMobileMenuOpen
            ? 'opacity-100 pointer-events-auto'
            : 'opacity-0 pointer-events-none'
        }`}
        aria-hidden={!isMobileMenuOpen}
      >
        {/* Backdrop */}
        <div
          className='absolute inset-0 bg-bg-dark/95 backdrop-blur-xl'
          onClick={() => setIsMobileMenuOpen(false)}
        />

        {/* Menu Content */}
        <div className='relative flex flex-col items-center justify-center h-full gap-2 px-8'>
          {/* Decorative accent */}
          <div className='absolute top-1/4 left-1/2 -translate-x-1/2 w-64 h-64 rounded-full bg-accent/10 blur-3xl pointer-events-none' />

          <nav
            className='flex flex-col items-center gap-2 w-full max-w-xs'
            aria-label='Mobile navigation'
          >
            {navLinks.map((link, index) => (
              <Link
                key={link.href}
                href={link.href}
                className='w-full text-center py-4 text-2xl font-semibold text-text-light hover:text-accent-light transition-colors'
                style={{
                  fontFamily: 'var(--font-playfair)',
                  animationDelay: `${index * 60}ms`,
                }}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className='mt-8 pt-8 border-t border-white/10 w-full max-w-xs flex flex-col items-center gap-4'>
            <a
              href={`mailto:${email}`}
              className='text-text-light-muted text-sm hover:text-accent-light transition-colors'
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {email}
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
