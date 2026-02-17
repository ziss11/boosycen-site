import Footer from '@/components/Footer';
import Header from '@/components/Header';
import AboutSection from '@/components/sections/AboutSection';
import ContactSection from '@/components/sections/ContactSection';
import HeroSection from '@/components/sections/HeroSection';
import ProcessSection from '@/components/sections/ProcessSection';
import WorkSection from '@/components/sections/WorkSection';
import { projectService } from '@/lib/project-service';

export default async function Home() {
  const projects = await projectService.getAll();

  return (
    <>
      <Header />
      <main>
        <HeroSection />
        <AboutSection />
        <WorkSection projects={projects} />
        <ProcessSection />
        <ContactSection />
      </main>
      <Footer />
    </>
  );
}
