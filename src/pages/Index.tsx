import Scene3D from '@/components/Scene3D';
import CursorFollower from '@/components/CursorFollower';
import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import ServicesSection from '@/components/ServicesSection';
import ProjectsSection from '@/components/ProjectsSection';
import ContactSection from '@/components/ContactSection';
import LoadingScreen from '@/components/LoadingScreen';

const Index = () => {
  return (
    <div className="relative min-h-screen cursor-none">
      <LoadingScreen />
      <Scene3D />
      <CursorFollower />
      <Navbar />
      <main>
        <HeroSection />
        <ServicesSection />
        <ProjectsSection />
        <ContactSection />
      </main>
    </div>
  );
};

export default Index;
