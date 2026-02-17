import Link from 'next/link';

const navLinks = [
  { label: 'About', href: '#about' },
  { label: 'Work', href: '#work' },
  { label: 'Process', href: '#process' },
  { label: 'Contact', href: '#contact' },
];

const socialLinks = [
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/griselda-putri/' },
];

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer
      className='bg-bg-dark border-t border-white/5 section-py'
      aria-label='Footer'
    >
      <div className='container'>
        {/* Top row */}
        <div className='flex flex-col md:flex-row md:items-center md:justify-between gap-8 mb-8 pb-8 border-b border-white/5'>
          {/* Brand */}
          <div className='flex flex-col gap-3 max-w-xs'>
            <Link
              href='/'
              className='flex items-center gap-2.5 group w-fit'
              aria-label='Griselda — Home'
            >
              <div className='w-8 h-8 rounded-lg bg-accent flex items-center justify-center shadow-sm shrink-0'>
                <span
                  className='text-white font-bold text-sm'
                  style={{ fontFamily: 'var(--font-playfair)' }}
                >
                  G
                </span>
              </div>
              <span
                className='text-lg font-bold text-text-light group-hover:text-accent-light transition-colors duration-200'
                style={{ fontFamily: 'var(--font-playfair)' }}
              >
                Griselda<span className='text-accent'>.</span>
              </span>
            </Link>
            <p className='text-sm text-text-light-muted leading-relaxed'>
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
                className='text-sm text-text-light-muted hover:text-text-light transition-colors duration-200'
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
                className='text-sm text-text-light-muted hover:text-accent-light transition-colors duration-200'
                aria-label={`${link.label} — opens in new tab`}
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>

        {/* Bottom row */}
        <div className='flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3'>
          <p className='text-xs text-text-light-muted'>
            © {currentYear} Griselda Putri Cahyaningtyas. All rights reserved.
          </p>
          <p className='text-xs text-text-light-muted'>
            Designed & built with <span className='text-accent-light'>♥</span>{' '}
            using Next.js & Tailwind CSS
          </p>
        </div>
      </div>
    </footer>
  );
}
