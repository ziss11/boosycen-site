import Image from 'next/image';
import Link from 'next/link';

const navLinks = [
  { label: 'About', href: '#about' },
  { label: 'Work', href: '#work' },
  { label: 'Process', href: '#process' },
  { label: 'Contact', href: '#contact' },
];

interface FooterProps {
  linkedinUrl?: string;
}

export default function Footer({
  linkedinUrl = 'https://www.linkedin.com/in/griselda-putri/',
}: FooterProps) {
  const currentYear = new Date().getFullYear();

  const socialLinks = [{ label: 'LinkedIn', href: linkedinUrl }];

  return (
    <footer
      className='bg-bg-subtle dark:bg-bg-dark border-t border-(--border-light) dark:border-white/5 section-py'
      aria-label='Footer'
    >
      <div className='container'>
        {/* Top row */}
        <div className='flex flex-col md:flex-row md:items-center md:justify-between gap-8 mb-8 pb-8 border-b border-(--border-light) dark:border-white/5'>
          {/* Brand */}
          <div className='flex flex-col gap-3 max-w-xs'>
            <Link
              href='/'
              className='flex items-center gap-2.5 group w-fit'
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
                Griselda<span className='text-accent'>.</span>
              </span>
            </Link>
            <p className='text-sm text-text-muted leading-relaxed'>
              Crafting intuitive digital experiences through thoughtful UI/UX
              design.
            </p>
          </div>

          {/* Navigation */}
          <nav
            className='flex flex-wrap gap-x-8 gap-y-2'
            aria-label='Footer navigation'
          >
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className='text-sm text-text-muted hover:text-text-primary transition-colors duration-200'
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Social */}
          <div className='flex items-center gap-4'>
            {socialLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target='_blank'
                rel='noopener noreferrer'
                className='text-sm text-text-muted hover:text-accent transition-colors duration-200'
                aria-label={`${link.label} — opens in new tab`}
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>

        {/* Bottom row */}
        <div className='flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3'>
          <p className='text-xs text-text-muted'>
            © {currentYear} Griselda Putri Cahyaningtyas. All rights reserved.
          </p>
          <p className='text-xs text-text-muted'>
            Designed & built with <span className='text-accent'>♥</span>{' '}
            using Next.js & Tailwind CSS
          </p>
        </div>
      </div>
    </footer>
  );
}
