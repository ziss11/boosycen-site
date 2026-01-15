import Button from '@/components/ui/Button';
import Clay3DIcon from '@/components/ui/Clay3DIcon';
import FloatingElement from '@/components/ui/FloatingElement';

export default function HeroSection() {
  return (
    <section className='relative min-h-screen flex items-center justify-center overflow-hidden gradient-mesh'>
      {/* Floating Background Shapes */}
      <div className='absolute inset-0 pointer-events-none'>
        <FloatingElement
          speed='slow'
          delay={0}
          className='absolute top-[10%] left-[5%]'
        >
          <div className='w-32 h-32 rounded-full bg-gradient-to-br from-[var(--pastel-lavender)] to-[var(--pastel-pink)] opacity-60 blur-sm' />
        </FloatingElement>
        <FloatingElement
          speed='slow'
          delay={1}
          className='absolute top-[20%] right-[10%]'
        >
          <div className='w-24 h-24 rounded-[var(--radius-lg)] bg-gradient-to-br from-[var(--pastel-mint)] to-[var(--pastel-sky)] opacity-50 blur-sm' />
        </FloatingElement>
        <FloatingElement
          speed='slow'
          delay={2}
          className='absolute bottom-[15%] left-[15%]'
        >
          <div className='w-20 h-20 rounded-full bg-gradient-to-br from-[var(--pastel-peach)] to-[var(--pastel-cream)] opacity-50 blur-sm' />
        </FloatingElement>
        <FloatingElement
          speed='slow'
          delay={1.5}
          className='absolute bottom-[25%] right-[20%]'
        >
          <div className='w-28 h-28 rounded-[var(--radius-md)] bg-gradient-to-br from-[var(--pastel-pink)] to-[var(--pastel-lavender)] opacity-40 blur-sm' />
        </FloatingElement>
      </div>

      <div className='container relative z-10 pt-24'>
        <div className='grid lg:grid-cols-2 gap-12 lg:gap-8 items-center'>
          {/* Text Content */}
          <div className='text-center lg:text-left space-y-6 animate-fade-in-up'>
            <span className='inline-block px-4 py-2 rounded-full bg-[rgba(139,124,255,0.1)] text-[var(--accent-primary)] font-medium text-sm'>
              ✨ UI/UX Designer
            </span>

            <h1 className='heading-xl'>
              Crafting{' '}
              <span className='bg-gradient-to-r from-[var(--accent-primary)] to-[var(--accent-secondary)] bg-clip-text text-transparent'>
                Intuitive
              </span>{' '}
              Digital Experiences
            </h1>

            <p className='text-lg text-muted max-w-xl mx-auto lg:mx-0'>
              I transform complex problems into elegant, user-centered
              solutions. With empathy at the core, I design interfaces that not
              only look beautiful but feel natural to use.
            </p>

            <div className='flex flex-col sm:flex-row gap-4 justify-center lg:justify-start pt-4'>
              <Button
                href='#work'
                size='lg'
              >
                View My Work
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
              </Button>
              <Button
                href='#contact'
                variant='secondary'
                size='lg'
              >
                Let&apos;s Connect
              </Button>
            </div>
          </div>

          {/* 3D Hero Illustration */}
          <div className='relative flex justify-center lg:justify-end'>
            <div className='relative'>
              {/* Main 3D Element */}
              <FloatingElement
                speed='normal'
                className='relative z-10'
              >
                <div className='w-64 h-64 sm:w-80 sm:h-80 lg:w-96 lg:h-96 rounded-[var(--radius-xl)] bg-gradient-to-br from-[var(--pastel-lavender)] via-[var(--pastel-pink)] to-[var(--pastel-peach)] shadow-[var(--clay-shadow)] flex items-center justify-center'>
                  <div className='text-center space-y-4'>
                    <div className='text-8xl'>🎨</div>
                    <p className='text-lg font-semibold text-[var(--foreground)] opacity-80'>
                      Design. Create. Inspire.
                    </p>
                  </div>
                </div>
              </FloatingElement>

              {/* Floating Icons Around */}
              <FloatingElement
                speed='slow'
                delay={0.5}
                className='absolute -top-4 -left-8 z-20'
              >
                <Clay3DIcon
                  gradient='lavender'
                  size='lg'
                  floating
                >
                  <span className='text-2xl'>💡</span>
                </Clay3DIcon>
              </FloatingElement>

              <FloatingElement
                speed='slow'
                delay={1}
                className='absolute top-1/4 -right-12 z-20'
              >
                <Clay3DIcon
                  gradient='mint'
                  size='md'
                  floating
                >
                  <span className='text-xl'>✏️</span>
                </Clay3DIcon>
              </FloatingElement>

              <FloatingElement
                speed='slow'
                delay={1.5}
                className='absolute -bottom-6 left-1/4 z-20'
              >
                <Clay3DIcon
                  gradient='peach'
                  size='md'
                  floating
                >
                  <span className='text-xl'>🚀</span>
                </Clay3DIcon>
              </FloatingElement>

              <FloatingElement
                speed='slow'
                delay={2}
                className='absolute bottom-1/4 -left-16 z-20'
              >
                <Clay3DIcon
                  gradient='sky'
                  size='sm'
                  floating
                >
                  <span className='text-lg'>⭐</span>
                </Clay3DIcon>
              </FloatingElement>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className='absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce'>
          <div className='w-8 h-12 rounded-full border-2 border-[var(--foreground)] opacity-30 flex justify-center pt-2'>
            <div className='w-1.5 h-3 bg-[var(--foreground)] rounded-full opacity-50 animate-pulse' />
          </div>
        </div>
      </div>
    </section>
  );
}
