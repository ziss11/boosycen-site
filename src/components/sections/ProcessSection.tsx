import ScrollReveal from '@/components/ui/ScrollReveal';

const steps = [
  {
    number: '01',
    title: 'Discover',
    description:
      'User interviews, surveys, competitive analysis, and stakeholder alignment to uncover real needs.',
    tags: ['User Interviews', 'Competitive Analysis', 'Stakeholder Mapping'],
    icon: (
      <svg
        width='28'
        height='28'
        viewBox='0 0 28 28'
        fill='none'
        aria-hidden='true'
      >
        <circle
          cx='12'
          cy='12'
          r='7'
          stroke='currentColor'
          strokeWidth='2'
        />
        <path
          d='M17.5 17.5L23 23'
          stroke='currentColor'
          strokeWidth='2'
          strokeLinecap='round'
        />
      </svg>
    ),
  },
  {
    number: '02',
    title: 'Define',
    description:
      'Synthesizing research into personas, journey maps, and a clear problem statement to guide design.',
    tags: ['Personas', 'Journey Maps', 'Problem Statement'],
    icon: (
      <svg
        width='28'
        height='28'
        viewBox='0 0 28 28'
        fill='none'
        aria-hidden='true'
      >
        <circle
          cx='14'
          cy='14'
          r='9'
          stroke='currentColor'
          strokeWidth='2'
        />
        <circle
          cx='14'
          cy='14'
          r='3'
          fill='currentColor'
        />
        <path
          d='M14 5V7M14 21V23M5 14H7M21 14H23'
          stroke='currentColor'
          strokeWidth='2'
          strokeLinecap='round'
        />
      </svg>
    ),
  },
  {
    number: '03',
    title: 'Design',
    description:
      'Wireframes, high-fidelity prototypes, and cohesive design systems that bring ideas to life.',
    tags: ['Wireframing', 'Prototyping', 'Visual Design'],
    icon: (
      <svg
        width='28'
        height='28'
        viewBox='0 0 28 28'
        fill='none'
        aria-hidden='true'
      >
        <path
          d='M6 22L11 11L17 17L21 8'
          stroke='currentColor'
          strokeWidth='2'
          strokeLinecap='round'
          strokeLinejoin='round'
        />
        <circle
          cx='21'
          cy='8'
          r='2'
          fill='currentColor'
        />
      </svg>
    ),
  },
  {
    number: '04',
    title: 'Test',
    description:
      'Usability testing, A/B experiments, and iterative refinement based on real user feedback.',
    tags: ['Usability Testing', 'A/B Testing', 'Iteration'],
    icon: (
      <svg
        width='28'
        height='28'
        viewBox='0 0 28 28'
        fill='none'
        aria-hidden='true'
      >
        <path
          d='M7 14L11 18L21 8'
          stroke='currentColor'
          strokeWidth='2'
          strokeLinecap='round'
          strokeLinejoin='round'
        />
        <rect
          x='4'
          y='4'
          width='20'
          height='20'
          rx='4'
          stroke='currentColor'
          strokeWidth='2'
        />
      </svg>
    ),
  },
  {
    number: '05',
    title: 'Launch',
    description:
      'Developer handoff, implementation support, and post-launch monitoring to ensure success.',
    tags: ['Dev Handoff', 'QA Support', 'Analytics'],
    icon: (
      <svg
        width='28'
        height='28'
        viewBox='0 0 28 28'
        fill='none'
        aria-hidden='true'
      >
        <path
          d='M14 4C14 4 8 10 8 16C8 19.314 10.686 22 14 22C17.314 22 20 19.314 20 16C20 10 14 4 14 4Z'
          stroke='currentColor'
          strokeWidth='2'
          strokeLinejoin='round'
        />
        <path
          d='M14 22V26M10 26H18'
          stroke='currentColor'
          strokeWidth='2'
          strokeLinecap='round'
        />
      </svg>
    ),
  },
];

export default function ProcessSection() {
  return (
    <section
      id='process'
      className='relative overflow-hidden bg-bg-dark section-py'
      aria-label='My design process'
    >
      {/* Background gradients */}
      <div
        className='absolute inset-0 pointer-events-none'
        aria-hidden='true'
      >
        <div className='absolute top-0 left-0 w-full h-px bg-linear-to-r from-transparent via-white/10 to-transparent' />
        <div className='absolute bottom-0 left-0 w-full h-px bg-linear-to-r from-transparent via-white/10 to-transparent' />
        <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-accent/6 blur-[120px]' />
      </div>

      <div className='container relative z-10'>
        {/* Header */}
        <ScrollReveal
          animation='fade-up'
          className='text-center mb-12 md:mb-16'
        >
          <span className='badge badge-dark mb-4 inline-flex'>How I Work</span>
          <h2 className='heading-xl text-text-light mb-4'>
            My Design <span className='text-gradient-light'>Process</span>
          </h2>
          <p className='body-lg text-text-light-muted max-w-xl mx-auto'>
            A structured, human-centered approach that turns ambiguity into
            clarity and ideas into impactful digital experiences.
          </p>
        </ScrollReveal>

        {/* Steps Grid */}
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 md:gap-5'>
          {steps.map((step, index) => (
            <ScrollReveal
              key={step.number}
              animation='fade-up'
              delay={index * 80}
            >
              <div className='group relative card-dark rounded-2xl p-5 md:p-6 hover:bg-bg-dark-hover transition-all duration-300 border border-white/5 hover:border-accent/20 h-full flex flex-col'>
                {/* Number (faded background) */}
                <span
                  className='absolute top-3 right-4 text-5xl font-bold leading-none select-none pointer-events-none'
                  style={{
                    fontFamily: 'var(--font-playfair)',
                    color: 'rgba(167,139,250,0.08)',
                  }}
                  aria-hidden='true'
                >
                  {step.number}
                </span>

                {/* Icon */}
                <div className='w-12 h-12 rounded-xl bg-accent/10 border border-accent/15 flex items-center justify-center text-accent-light mb-4 group-hover:bg-accent/15 transition-colors shrink-0'>
                  {step.icon}
                </div>

                {/* Step number badge */}
                <span className='text-xs font-bold tracking-widest text-accent-light/50 uppercase mb-2'>
                  Step {step.number}
                </span>

                {/* Title */}
                <h3 className='text-lg font-bold text-text-light mb-2'>
                  {step.title}
                </h3>

                {/* Description */}
                <p className='text-sm text-text-light-muted leading-relaxed flex-1'>
                  {step.description}
                </p>

                {/* Tags */}
                <div className='flex flex-wrap gap-1.5 mt-4'>
                  {step.tags.map((tag) => (
                    <span
                      key={tag}
                      className='text-[10px] px-2 py-0.5 rounded-full border border-white/8 text-text-light-muted font-medium'
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
