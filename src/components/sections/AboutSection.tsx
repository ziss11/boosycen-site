import ScrollReveal from '@/components/ui/ScrollReveal';

const skills = [
  {
    name: 'UI Design',
    icon: '▣',
    color: 'bg-violet-50 text-violet-700 border-violet-100 dark:bg-violet-900/30 dark:text-violet-300 dark:border-violet-800/30',
  },
  {
    name: 'UX Research',
    icon: '◎',
    color: 'bg-pink-50 text-pink-700 border-pink-100 dark:bg-pink-900/30 dark:text-pink-300 dark:border-pink-800/30',
  },
  {
    name: 'Prototyping',
    icon: '◈',
    color: 'bg-blue-50 text-blue-700 border-blue-100 dark:bg-blue-900/30 dark:text-blue-300 dark:border-blue-800/30',
  },
  {
    name: 'Design Systems',
    icon: '▦',
    color: 'bg-emerald-50 text-emerald-700 border-emerald-100 dark:bg-emerald-900/30 dark:text-emerald-300 dark:border-emerald-800/30',
  },
  {
    name: 'User Testing',
    icon: '◉',
    color: 'bg-amber-50 text-amber-700 border-amber-100 dark:bg-amber-900/30 dark:text-amber-300 dark:border-amber-800/30',
  },
  {
    name: 'Interaction Design',
    icon: '◌',
    color: 'bg-violet-50 text-violet-700 border-violet-100 dark:bg-violet-900/30 dark:text-violet-300 dark:border-violet-800/30',
  },
];

const tools = [{ name: 'Figma', color: '#F24E1E' }];

const highlights = [
  { number: '1+', label: 'Years crafting\ndigital experiences' },
  { number: '10+', label: 'Projects shipped\nacross platforms' },
];

export default function AboutSection() {
  return (
    <section
      id='about'
      className='section-py bg-bg-subtle'
      aria-label='About me'
    >
      <div className='container'>
        {/* Section header */}
        <ScrollReveal
          animation='fade-up'
          className='text-center mb-10 md:mb-14'
        >
          <span className='badge mb-4 inline-flex'>About Me</span>
          <h2 className='heading-xl'>
            Designing with{' '}
            <span className='text-gradient'>Purpose & Empathy</span>
          </h2>
        </ScrollReveal>

        {/* Bento Grid */}
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5'>
          {/* Card 1: Bio (large — spans 2 cols on lg) */}
          <ScrollReveal
            animation='slide-left'
            className='md:col-span-2 lg:col-span-2'
          >
            <div className='card card-hover h-full p-6 md:p-8 flex flex-col sm:flex-row gap-6 md:gap-8 items-start'>
              {/* Bio text */}
              <div className='flex-1 space-y-4'>
                <div>
                  <h3 className='heading-sm mb-1 text-text-primary'>
                    Griselda Putri Cahyaningtyas
                  </h3>
                  <p className='text-sm font-medium text-accent'>
                    UI/UX Designer · Product Designer
                  </p>
                </div>
                <p className='body-base text-text-muted'>
                  I&apos;m a passionate UI/UX designer who believes that great
                  design starts with understanding people deeply. I transform
                  complex user challenges into intuitive, delightful experiences
                  — always grounding my decisions in research and data.
                </p>
                <p className='body-base text-text-muted'>
                  When I&apos;m not designing, you&apos;ll find me exploring
                  design trends, sharing knowledge with aspiring designers, or
                  brewing the perfect cup of coffee.
                </p>
                {/* Tags */}
                <div className='flex flex-wrap gap-2 pt-1'>
                  {[
                    'Empathy-Driven',
                    'Detail-Oriented',
                    'Collaborative',
                    'Data-Informed',
                  ].map((tag) => (
                    <span
                      key={tag}
                      className='chip chip-accent text-xs'
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </ScrollReveal>

          {/* Card 2: Quick stats (tall card on right) */}
          <ScrollReveal
            animation='slide-right'
            className='md:col-span-2 lg:col-span-1'
          >
            <div className='card card-hover h-full p-6 md:p-8 flex flex-col justify-between min-h-[200px]'>
              <div>
                <span className='label text-accent mb-4 block'>Experience</span>
                <div className='space-y-5'>
                  {highlights.map((item) => (
                    <div
                      key={item.label}
                      className='flex items-start gap-3'
                    >
                      <span
                        className='text-4xl font-bold text-gradient leading-none shrink-0 pt-0.5'
                        style={{ fontFamily: 'var(--font-playfair)' }}
                      >
                        {item.number}
                      </span>
                      <span className='text-sm text-text-muted leading-snug whitespace-pre-line font-medium'>
                        {item.label}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
              <div className='mt-6 pt-5 border-t border-(--border-light)'>
                <p className='text-xs text-text-muted italic'>
                  &quot;Great design is invisible — it just works.&quot;
                </p>
              </div>
            </div>
          </ScrollReveal>

          {/* Card 3: Skills */}
          <ScrollReveal
            animation='fade-up'
            delay={100}
            className='md:col-span-2 lg:col-span-2'
          >
            <div className='card card-hover p-6 md:p-8'>
              <span className='label text-accent mb-5 block'>
                Skills & Expertise
              </span>
              <div className='grid grid-cols-2 sm:grid-cols-3 gap-3'>
                {skills.map((skill) => (
                  <div
                    key={skill.name}
                    className={`flex items-center gap-2.5 px-3 py-2.5 rounded-xl border ${skill.color} transition-all hover:scale-[1.02] hover:shadow-sm cursor-default`}
                  >
                    <span className='text-base font-bold opacity-80 shrink-0'>
                      {skill.icon}
                    </span>
                    <span className='text-sm font-semibold'>{skill.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </ScrollReveal>

          {/* Card 4: Tools */}
          <ScrollReveal
            animation='fade-up'
            delay={200}
          >
            <div className='card card-hover p-6 md:p-8 h-full'>
              <span className='label text-accent mb-5 block'>Tools I Use</span>
              <div className='flex flex-wrap gap-2'>
                {tools.map((tool) => (
                  <span
                    key={tool.name}
                    className='chip text-xs font-semibold hover:scale-[1.03] transition-transform cursor-default'
                    style={{
                      borderLeftColor: tool.color,
                      borderLeftWidth: '3px',
                    }}
                  >
                    {tool.name}
                  </span>
                ))}
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
