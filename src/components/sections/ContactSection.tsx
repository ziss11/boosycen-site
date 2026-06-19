'use client';

import ScrollReveal from '@/components/ui/ScrollReveal';

interface ContactSectionProps {
  email?: string;
  linkedinUrl?: string;
}

export default function ContactSection({
  email = 'putrigriseldac@gmail.com',
  linkedinUrl = 'https://www.linkedin.com/in/griselda-putri/',
}: ContactSectionProps) {
  const socialLinks = [
    {
      name: 'LinkedIn',
      href: linkedinUrl,
      description: "Let's connect professionally",
      icon: (
        <svg
          width='20'
          height='20'
          viewBox='0 0 20 20'
          fill='currentColor'
          aria-hidden='true'
        >
          <path d='M16.667 2.5H3.333A.833.833 0 002.5 3.333v13.334a.833.833 0 00.833.833h13.334a.833.833 0 00.833-.833V3.333a.833.833 0 00-.833-.833zM6.667 14.167H4.583V8.333h2.084v5.834zM5.625 7.5a1.042 1.042 0 110-2.083 1.042 1.042 0 010 2.083zM15.417 14.167h-2.084v-2.917c0-.775-.014-1.772-1.08-1.772-1.08 0-1.245.843-1.245 1.714v2.975H8.924V8.333h2v.792h.028c.277-.525.955-1.08 1.966-1.08 2.1 0 2.49 1.383 2.49 3.18v2.942h.009z' />
        </svg>
      ),
    },
  ];

  return (
    <section
      id='contact'
      className='relative overflow-hidden bg-bg-subtle dark:bg-bg-dark section-py'
      aria-label='Contact me'
    >
      {/* Background gradients */}
      <div
        className='absolute inset-0 pointer-events-none'
        aria-hidden='true'
      >
        <div className='absolute top-0 left-0 w-full h-px bg-linear-to-r from-transparent via-black/5 dark:via-white/10 to-transparent' />
        <div className='absolute -top-40 -left-40 w-[500px] h-[500px] rounded-full bg-accent/10 blur-[120px]' />
        <div className='absolute -bottom-40 -right-40 w-[500px] h-[500px] rounded-full bg-accent-pink/8 blur-[120px]' />
      </div>

      <div className='container relative z-10'>
        <div className='max-w-2xl mx-auto space-y-8'>
          {/* Header */}
          <ScrollReveal animation='fade-up'>
            <span className='badge mb-4 inline-flex'>Get In Touch</span>
            <h2 className='heading-xl text-text-primary mb-4'>
              Let&apos;s build something{' '}
              <span className='text-gradient'>great together</span>
            </h2>
            <p className='body-lg text-text-muted max-w-md'>
              Have a project in mind? Looking to collaborate? Or just want to
              chat about design? I&apos;d love to hear from you.
            </p>
          </ScrollReveal>

          {/* Contact details */}
          <ScrollReveal
            animation='fade-up'
            delay={100}
          >
            <div className='space-y-4'>
              {/* Email */}
              <a
                href={`mailto:${email}`}
                className='group flex items-center gap-4 p-4 rounded-2xl border border-(--border-light) dark:border-white/8 hover:border-accent/30 hover:bg-black/5 dark:hover:bg-white/5 transition-all duration-300'
              >
                <div className='w-10 h-10 rounded-xl bg-accent/15 flex items-center justify-center shrink-0 group-hover:bg-accent/25 transition-colors'>
                  <svg
                    width='18'
                    height='18'
                    viewBox='0 0 18 18'
                    fill='none'
                    aria-hidden='true'
                  >
                    <path
                      d='M2.25 4.5h13.5v10.5H2.25V4.5z'
                      stroke='#A78BFA'
                      strokeWidth='1.5'
                      strokeLinejoin='round'
                    />
                    <path
                      d='M2.25 4.5L9 10.5l6.75-6'
                      stroke='#A78BFA'
                      strokeWidth='1.5'
                      strokeLinecap='round'
                      strokeLinejoin='round'
                    />
                  </svg>
                </div>
                <div>
                  <p className='text-xs font-semibold text-text-muted uppercase tracking-wider mb-0.5'>
                    Email
                  </p>
                  <span className='text-text-primary font-medium text-sm group-hover:text-accent transition-colors'>
                    {email}
                  </span>
                </div>
              </a>

              {/* Availability */}
              <div className='flex items-center gap-4 p-4 rounded-2xl border border-(--border-light) dark:border-white/8'>
                <div className='w-10 h-10 rounded-xl bg-emerald-500/15 flex items-center justify-center shrink-0'>
                  <svg
                    width='18'
                    height='18'
                    viewBox='0 0 18 18'
                    fill='none'
                    aria-hidden='true'
                  >
                    <circle
                      cx='9'
                      cy='9'
                      r='7'
                      stroke='#34d399'
                      strokeWidth='1.5'
                    />
                    <path
                      d='M9 5.5V9l2.5 2.5'
                      stroke='#34d399'
                      strokeWidth='1.5'
                      strokeLinecap='round'
                      strokeLinejoin='round'
                    />
                  </svg>
                </div>
                <div>
                  <p className='text-xs font-semibold text-text-muted uppercase tracking-wider mb-0.5'>
                    Availability
                  </p>
                  <div className='flex items-center gap-2'>
                    <span className='w-2 h-2 rounded-full bg-emerald-400 animate-pulse-dot shrink-0' />
                    <span className='text-text-primary font-medium text-sm'>
                      Open to new projects
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </ScrollReveal>

          {/* Social links */}
          <ScrollReveal
            animation='fade-up'
            delay={200}
          >
            <div className='space-y-3'>
              <p className='text-xs font-semibold text-text-muted uppercase tracking-wider'>
                Find me on
              </p>
              <div className='flex flex-col gap-3'>
                {socialLinks.map((link) => (
                  <a
                    key={link.name}
                    href={link.href}
                    target='_blank'
                    rel='noopener noreferrer'
                    className='group flex items-center gap-3 p-3.5 rounded-xl border border-(--border-light) dark:border-white/8 hover:border-accent/30 hover:bg-black/5 dark:hover:bg-white/5 transition-all duration-300'
                  >
                    <div className='text-accent group-hover:text-accent-hover transition-colors shrink-0'>
                      {link.icon}
                    </div>
                    <div>
                      <span className='text-sm font-semibold text-text-primary block'>
                        {link.name}
                      </span>
                      <span className='text-xs text-text-muted'>
                        {link.description}
                      </span>
                    </div>
                    <svg
                      width='14'
                      height='14'
                      viewBox='0 0 14 14'
                      fill='none'
                      className='ml-auto text-text-muted group-hover:translate-x-1 transition-transform'
                      aria-hidden='true'
                    >
                      <path
                        d='M3 7H11M11 7L7.5 3.5M11 7L7.5 10.5'
                        stroke='currentColor'
                        strokeWidth='1.5'
                        strokeLinecap='round'
                        strokeLinejoin='round'
                      />
                    </svg>
                  </a>
                ))}
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
