import Link from 'next/link';

const footerLinks = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '#about' },
  { label: 'Work', href: '#work' },
  { label: 'Contact', href: '#contact' },
];

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className='bg-[var(--foreground)] text-white py-16'>
      <div className='container'>
        <div className='grid md:grid-cols-3 gap-12 mb-12'>
          {/* Brand */}
          <div className='space-y-4'>
            <Link
              href='/'
              className='text-2xl font-bold font-[family-name:var(--font-playfair)]'
            >
              Griselda<span className='text-[var(--accent-primary)]'>.</span>
            </Link>
            <p className='text-gray-400 max-w-xs'>
              Crafting intuitive digital experiences through thoughtful UI/UX
              design.
            </p>
          </div>

          {/* Quick Links */}
          <div className='space-y-4'>
            <h3 className='font-semibold text-lg'>Quick Links</h3>
            <nav className='flex flex-col gap-2'>
              {footerLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className='text-gray-400 hover:text-white transition-colors'
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Contact */}
          <div className='space-y-4'>
            <h3 className='font-semibold text-lg'>Get in Touch</h3>
            <div className='space-y-2'>
              <a
                href='mailto:griselda@designer.com'
                className='block text-gray-400 hover:text-[var(--accent-primary)] transition-colors'
              >
                griselda@designer.com
              </a>
              <p className='text-gray-400'>
                Available for freelance work and collaborations.
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className='pt-8 border-t border-gray-700 flex flex-col md:flex-row justify-between items-center gap-4'>
          <p className='text-gray-400 text-sm'>
            © {currentYear} Griselda Putri. All rights reserved.
          </p>
          <p className='text-gray-400 text-sm'>
            Designed with 💜 and lots of coffee
          </p>
        </div>
      </div>
    </footer>
  );
}
