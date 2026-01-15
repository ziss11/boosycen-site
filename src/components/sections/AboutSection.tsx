import Clay3DIcon from '@/components/ui/Clay3DIcon';
import ScrollReveal from '@/components/ui/ScrollReveal';

const skills = [
  { name: 'UI Design', icon: '🎨', gradient: 'lavender' as const },
  { name: 'UX Research', icon: '🔍', gradient: 'pink' as const },
  { name: 'Prototyping', icon: '⚡', gradient: 'mint' as const },
  { name: 'Design Systems', icon: '📐', gradient: 'peach' as const },
  { name: 'Figma', icon: '🖌️', gradient: 'sky' as const },
  { name: 'User Testing', icon: '👥', gradient: 'lavender' as const },
];

const tools = ['Figma', 'Sketch', 'Adobe XD', 'Framer', 'Principle', 'Notion'];

export default function AboutSection() {
  return (
    <section
      id='about'
      className='section bg-[var(--background)]'
    >
      <div className='container'>
        <div className='grid lg:grid-cols-2 gap-16 items-center'>
          {/* Portrait / Visual */}
          <ScrollReveal animation='slide-left'>
            <div className='relative'>
              {/* Main Image Container */}
              <div className='relative w-full aspect-[4/5] max-w-md mx-auto rounded-[var(--radius-xl)] bg-gradient-to-br from-[var(--pastel-lavender)] to-[var(--pastel-pink)] shadow-[var(--clay-shadow)] overflow-hidden'>
                {/* Placeholder for portrait - could add real image */}
                <div className='absolute inset-0 flex items-center justify-center'>
                  <div className='text-center space-y-4'>
                    <div className='text-9xl opacity-80'>👩‍💻</div>
                    <p className='text-lg font-medium text-[var(--foreground)] opacity-60'>
                      Your Photo Here
                    </p>
                  </div>
                </div>

                {/* Decorative gradient overlay */}
                <div className='absolute inset-0 bg-gradient-to-t from-[rgba(255,255,255,0.3)] to-transparent' />
              </div>

              {/* Floating decorations */}
              <div className='absolute -top-6 -right-6 animate-float-delayed'>
                <Clay3DIcon
                  gradient='mint'
                  size='lg'
                >
                  <span className='text-2xl'>✨</span>
                </Clay3DIcon>
              </div>
              <div className='absolute -bottom-4 -left-4 animate-float-slow'>
                <Clay3DIcon
                  gradient='peach'
                  size='md'
                >
                  <span className='text-xl'>💜</span>
                </Clay3DIcon>
              </div>
            </div>
          </ScrollReveal>

          {/* Content */}
          <div className='space-y-8'>
            <ScrollReveal animation='fade-up'>
              <span className='inline-block px-4 py-2 rounded-full bg-[rgba(139,124,255,0.1)] text-[var(--accent-primary)] font-medium text-sm mb-4'>
                About Me
              </span>
              <h2 className='heading-lg mb-6'>
                Designing with{' '}
                <span className='bg-gradient-to-r from-[var(--accent-primary)] to-[var(--accent-secondary)] bg-clip-text text-transparent'>
                  Purpose & Empathy
                </span>
              </h2>
            </ScrollReveal>

            <ScrollReveal
              animation='fade-up'
              delay={100}
            >
              <p className='text-lg text-muted leading-relaxed'>
                Hi! I&apos;m Griselda Putri Cahyaningtyas, a passionate UI/UX
                designer with experience crafting digital products that people
                love to use. I believe that great design starts with
                understanding users deeply and translating their needs into
                intuitive, delightful experiences.
              </p>
            </ScrollReveal>

            <ScrollReveal
              animation='fade-up'
              delay={200}
            >
              <p className='text-muted leading-relaxed'>
                My approach combines strategic thinking with creative
                exploration. I thrive on solving complex problems and
                collaborating with teams to bring ideas to life. When I&apos;m
                not designing, you&apos;ll find me exploring new design trends,
                mentoring aspiring designers, or enjoying a good cup of coffee.
              </p>
            </ScrollReveal>

            {/* Skills */}
            <ScrollReveal
              animation='fade-up'
              delay={300}
            >
              <div className='space-y-4'>
                <h3 className='font-semibold text-lg'>Skills & Expertise</h3>
                <div className='grid grid-cols-2 sm:grid-cols-3 gap-4'>
                  {skills.map((skill, index) => (
                    <div
                      key={skill.name}
                      className='flex items-center gap-3 p-3 rounded-[var(--radius-sm)] bg-[rgba(255,255,255,0.5)] hover:bg-[rgba(255,255,255,0.8)] transition-all hover:shadow-md'
                      style={{ animationDelay: `${index * 50}ms` }}
                    >
                      <Clay3DIcon
                        gradient={skill.gradient}
                        size='sm'
                      >
                        <span className='text-sm'>{skill.icon}</span>
                      </Clay3DIcon>
                      <span className='font-medium text-sm'>{skill.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            </ScrollReveal>

            {/* Tools */}
            <ScrollReveal
              animation='fade-up'
              delay={400}
            >
              <div className='space-y-3'>
                <h3 className='font-semibold text-lg'>Tools I Use</h3>
                <div className='flex flex-wrap gap-2'>
                  {tools.map((tool) => (
                    <span
                      key={tool}
                      className='px-4 py-2 rounded-full bg-[rgba(139,124,255,0.1)] text-sm font-medium hover:bg-[rgba(139,124,255,0.2)] transition-colors cursor-default'
                    >
                      {tool}
                    </span>
                  ))}
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  );
}
