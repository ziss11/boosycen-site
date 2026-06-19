import Footer from '@/components/Footer';
import Header from '@/components/Header';
import AboutSection from '@/components/sections/AboutSection';
import ContactSection from '@/components/sections/ContactSection';
import HeroSection from '@/components/sections/HeroSection';
import ProcessSection from '@/components/sections/ProcessSection';
import WorkSection from '@/components/sections/WorkSection';
import { projectService } from '@/lib/project-service';
import { settingsService } from '@/lib/settings-service';

// Project and settings data live in Vercel Blob (mutable via admin), so always read fresh
export const dynamic = 'force-dynamic';

export default async function Home() {
  const [projects, settings] = await Promise.all([
    projectService.getAll(),
    settingsService.get(),
  ]);

  return (
    <>
      <Header email={settings.email} />
      <main>
        <HeroSection />
        <AboutSection />
        <WorkSection projects={projects} />
        <ProcessSection />
        <ContactSection
          email={settings.email}
          linkedinUrl={settings.linkedinUrl}
        />
      </main>
      <Footer linkedinUrl={settings.linkedinUrl} />
    </>
  );
}
