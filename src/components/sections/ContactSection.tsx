import Clay3DIcon from '@/components/ui/Clay3DIcon';
import ScrollReveal from '@/components/ui/ScrollReveal';

const socialLinks = [
  {
    name: 'LinkedIn',
    icon: '💼',
    href: 'https://linkedin.com',
    gradient: 'lavender' as const,
  },
  {
    name: 'Dribbble',
    icon: '🎨',
    href: 'https://dribbble.com',
    gradient: 'pink' as const,
  },
  {
    name: 'Behance',
    icon: '🅱️',
    href: 'https://behance.net',
    gradient: 'sky' as const,
  },
  {
    name: 'Twitter',
    icon: '🐦',
    href: 'https://twitter.com',
    gradient: 'mint' as const,
  },
];

export default function ContactSection() {
  return (
    <section
      id='contact'
      className='section bg-linear-to-b from-pastel-lavender/10 to-background'
    >
      <div className='container'>
        <div className='max-w-2xl mx-auto text-center'>
          <ScrollReveal animation='fade-up'>
            <span className='inline-block px-4 py-2 rounded-full bg-accent-primary/10 text-accent-primary font-medium text-sm mb-4'>
              Get In Touch
            </span>
            <h2 className='heading-lg mb-4'>
              Let&apos;s Create Something{' '}
              <span className='bg-linear-to-r from-accent-primary to-accent-secondary bg-clip-text text-transparent'>
                Amazing
              </span>{' '}
              Together
            </h2>
            <p className='text-muted text-lg mb-8'>
              Have a project in mind? I&apos;d love to hear about it. Whether
              you need a complete product design or just want to chat about
              design, feel free to reach out.
            </p>
          </ScrollReveal>

          {/* Email */}
          <ScrollReveal
            animation='fade-up'
            delay={100}
          >
            <div className='clay-card p-8 mb-8'>
              <h3 className='font-semibold mb-2'>Email me at</h3>
              <a
                href='mailto:griselda@designer.com'
                className='text-2xl text-accent-primary hover:underline font-medium'
              >
                griselda@designer.com
              </a>
            </div>
          </ScrollReveal>

          {/* Social Links */}
          <ScrollReveal
            animation='fade-up'
            delay={200}
          >
            <div className='space-y-4'>
              <h3 className='font-semibold'>Connect with me</h3>
              <div className='flex flex-wrap justify-center gap-4'>
                {socialLinks.map((link) => (
                  <a
                    key={link.name}
                    href={link.href}
                    target='_blank'
                    rel='noopener noreferrer'
                    className='group flex items-center gap-3 p-4 rounded-lg bg-white/50 hover:bg-white/80 transition-all hover:shadow-lg hover:-translate-y-1'
                  >
                    <Clay3DIcon
                      gradient={link.gradient}
                      size='sm'
                    >
                      <span className='text-sm'>{link.icon}</span>
                    </Clay3DIcon>
                    <span className='font-medium group-hover:text-accent-primary transition-colors'>
                      {link.name}
                    </span>
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
