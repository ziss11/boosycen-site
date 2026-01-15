import ProjectCard from '@/components/ProjectCard';
import ScrollReveal from '@/components/ui/ScrollReveal';
import { projects } from '@/data/projects';

export default function WorkSection() {
  return (
    <section
      id='work'
      className='section bg-gradient-to-b from-background to-pastel-lavender/10'
    >
      <div className='container'>
        {/* Section Header */}
        <ScrollReveal
          animation='fade-up'
          className='text-center max-w-2xl mx-auto mb-16'
        >
          <span className='inline-block px-4 py-2 rounded-full bg-accent-primary/10 text-accent-primary font-medium text-sm mb-4'>
            Featured Work
          </span>
          <h2 className='heading-lg mb-4'>
            Selected{' '}
            <span className='bg-gradient-to-r from-accent-primary to-accent-secondary bg-clip-text text-transparent'>
              Projects
            </span>
          </h2>
          <p className='text-muted'>
            A curated collection of my recent work, showcasing user-centered
            design solutions across various industries and platforms.
          </p>
        </ScrollReveal>

        {/* Projects Grid */}
        <div className='grid md:grid-cols-2 gap-8'>
          {projects.map((project, index) => (
            <ScrollReveal
              key={project.id}
              animation={index % 2 === 0 ? 'slide-left' : 'slide-right'}
              delay={index * 100}
            >
              <ProjectCard
                project={project}
                index={index}
              />
            </ScrollReveal>
          ))}
        </div>

        {/* View All Link */}
        <ScrollReveal
          animation='fade-up'
          delay={400}
          className='text-center mt-12'
        >
          <p className='text-muted'>
            Want to see more?{' '}
            <a
              href='https://dribbble.com'
              target='_blank'
              rel='noopener noreferrer'
              className='text-accent-primary font-medium hover:underline'
            >
              Check out my Dribbble →
            </a>
          </p>
        </ScrollReveal>
      </div>
    </section>
  );
}
