import Footer from '@/components/Footer';
import Header from '@/components/Header';
import Clay3DIcon, {
  LightbulbIcon,
  TargetIcon,
} from '@/components/ui/Clay3DIcon';
import ScrollReveal from '@/components/ui/ScrollReveal';
import { projects } from '@/data/projects';
import Link from 'next/link';
import { notFound } from 'next/navigation';

interface ProjectPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return projects.map((project) => ({
    slug: project.slug,
  }));
}

export async function generateMetadata({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);

  if (!project) {
    return { title: 'Project Not Found' };
  }

  return {
    title: `${project.title} | Case Study`,
    description: project.description,
  };
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);

  if (!project || !project.caseStudy) {
    notFound();
  }

  const { caseStudy } = project;

  return (
    <>
      <Header />
      <main className='pt-24'>
        {/* Hero Section */}
        <section className={`py-20 bg-gradient-to-br ${project.color}`}>
          <div className='container'>
            <ScrollReveal animation='fade-up'>
              <Link
                href='/#work'
                className='inline-flex items-center gap-2 text-[var(--foreground)] opacity-70 hover:opacity-100 transition-opacity mb-8'
              >
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
                    d='M15 19l-7-7 7-7'
                  />
                </svg>
                Back to Projects
              </Link>
            </ScrollReveal>

            <ScrollReveal
              animation='fade-up'
              delay={100}
            >
              <span className='inline-block px-4 py-2 rounded-full bg-[rgba(255,255,255,0.5)] text-[var(--foreground)] font-medium text-sm mb-4'>
                {project.category}
              </span>
              <h1 className='heading-xl mb-6'>{project.title}</h1>
              <p className='text-xl text-muted max-w-2xl'>
                {project.description}
              </p>
            </ScrollReveal>

            <ScrollReveal
              animation='fade-up'
              delay={200}
              className='flex flex-wrap gap-2 mt-8'
            >
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className='px-4 py-2 rounded-full bg-[rgba(255,255,255,0.6)] text-sm font-medium'
                >
                  {tag}
                </span>
              ))}
            </ScrollReveal>
          </div>
        </section>

        {/* Main Mockup Placeholder */}
        <section className='section'>
          <div className='container'>
            <ScrollReveal animation='scale'>
              <div
                className={`aspect-video rounded-[var(--radius-xl)] bg-gradient-to-br ${project.color} shadow-[var(--clay-shadow)] flex items-center justify-center`}
              >
                <div className='text-center'>
                  <div className='text-8xl mb-4'>🖼️</div>
                  <p className='text-lg font-medium opacity-60'>
                    Project Mockup
                  </p>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* Case Study Content */}
        <section className='section bg-[var(--background)]'>
          <div className='container max-w-4xl'>
            {/* Overview */}
            <ScrollReveal
              animation='fade-up'
              className='mb-16'
            >
              <h2 className='heading-md mb-6'>Overview</h2>
              <p className='text-lg text-muted leading-relaxed'>
                {caseStudy.overview}
              </p>
            </ScrollReveal>

            {/* Problem */}
            <ScrollReveal
              animation='fade-up'
              className='mb-16'
            >
              <div className='flex items-start gap-4 mb-6'>
                <LightbulbIcon size='lg' />
                <div>
                  <h2 className='heading-md'>The Problem</h2>
                </div>
              </div>
              <p className='text-lg text-muted leading-relaxed ml-0 md:ml-24'>
                {caseStudy.problem}
              </p>
            </ScrollReveal>

            {/* Solution */}
            <ScrollReveal
              animation='fade-up'
              className='mb-16'
            >
              <div className='flex items-start gap-4 mb-6'>
                <TargetIcon size='lg' />
                <div>
                  <h2 className='heading-md'>The Solution</h2>
                </div>
              </div>
              <p className='text-lg text-muted leading-relaxed ml-0 md:ml-24'>
                {caseStudy.solution}
              </p>
            </ScrollReveal>

            {/* Process */}
            <ScrollReveal
              animation='fade-up'
              className='mb-16'
            >
              <h2 className='heading-md mb-8'>The Process</h2>
              <div className='space-y-4'>
                {caseStudy.process.map((step, index) => (
                  <ScrollReveal
                    key={index}
                    animation='slide-left'
                    delay={index * 100}
                  >
                    <div className='flex items-start gap-4 p-4 rounded-[var(--radius-md)] bg-[rgba(255,255,255,0.5)] hover:bg-[rgba(255,255,255,0.8)] transition-colors'>
                      <div className='w-8 h-8 rounded-full bg-gradient-to-br from-[var(--accent-primary)] to-[var(--accent-secondary)] flex items-center justify-center text-white font-bold text-sm shrink-0'>
                        {index + 1}
                      </div>
                      <p className='text-muted'>{step}</p>
                    </div>
                  </ScrollReveal>
                ))}
              </div>
            </ScrollReveal>

            {/* Results */}
            <ScrollReveal
              animation='fade-up'
              className='mb-16'
            >
              <h2 className='heading-md mb-8'>The Results</h2>
              <div className='grid sm:grid-cols-3 gap-6'>
                {caseStudy.results.map((result, index) => (
                  <ScrollReveal
                    key={index}
                    animation='scale'
                    delay={index * 100}
                  >
                    <div className='clay-card p-6 text-center'>
                      <Clay3DIcon
                        gradient={
                          index === 0
                            ? 'lavender'
                            : index === 1
                            ? 'mint'
                            : 'peach'
                        }
                        size='lg'
                        className='mx-auto mb-4'
                      >
                        <span className='text-2xl'>
                          {index === 0 ? '📈' : index === 1 ? '💬' : '⚡'}
                        </span>
                      </Clay3DIcon>
                      <p className='font-medium'>{result}</p>
                    </div>
                  </ScrollReveal>
                ))}
              </div>
            </ScrollReveal>

            {/* Navigation */}
            <ScrollReveal animation='fade-up'>
              <div className='flex justify-between items-center pt-8 border-t border-[rgba(45,45,45,0.1)]'>
                <Link
                  href='/#work'
                  className='inline-flex items-center gap-2 text-[var(--accent-primary)] font-medium hover:underline'
                >
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
                      d='M15 19l-7-7 7-7'
                    />
                  </svg>
                  All Projects
                </Link>
                <Link
                  href='#contact'
                  className='inline-flex items-center gap-2 text-[var(--accent-primary)] font-medium hover:underline'
                >
                  Start a Project
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
                      d='M9 5l7 7-7 7'
                    />
                  </svg>
                </Link>
              </div>
            </ScrollReveal>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
