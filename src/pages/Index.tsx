import Scene3D from '@/components/Scene3D';
import CursorFollower from '@/components/CursorFollower';
import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import ServicesSection from '@/components/ServicesSection';
import AboutSection from '@/components/AboutSection';
import ProjectsSection from '@/components/ProjectsSection';
import ContactSection from '@/components/ContactSection';

const Index = () => {
  return (
    <div className="relative min-h-screen cursor-none">
      {/* 3D Background */}
      <Scene3D />
      
      {/* Custom Cursor */}
      <CursorFollower />
      
      {/* Navigation */}
      <Navbar />
      
      {/* Main Content */}
      <main>
        <HeroSection />
        <ServicesSection />
        <AboutSection />
        <ProjectsSection />
        <ContactSection />
      </main>
    </div>
  );
};

export default Index;
