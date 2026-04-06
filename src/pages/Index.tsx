import Scene3D from '@/components/Scene3D';
import CursorFollower from '@/components/CursorFollower';
import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import ServicesSection from '@/components/ServicesSection';
import ProjectsSection from '@/components/ProjectsSection';
import ContactSection from '@/components/ContactSection';
import FooterSection from '@/components/FooterSection';
import LoadingScreen from '@/components/LoadingScreen';
import SmoothScroll from '@/components/SmoothScroll';

import { useEffect, useState, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';

const Index = () => {
  const location = useLocation();
  const [isReady, setIsReady] = useState(() => sessionStorage.getItem('hasLoaded') === 'true');
  const hasScrolledToHash = useRef(false);

  // Force scroll to top on initial mount (prevents auto-scroll to random sections)
  useEffect(() => {
    if (!location.hash) {
      window.scrollTo(0, 0);
    }
  }, []);

  // Watch for loading screen to finish
  useEffect(() => {
    if (isReady) return;
    const interval = setInterval(() => {
      if (sessionStorage.getItem('hasLoaded') === 'true') {
        setTimeout(() => setIsReady(true), 800);
        clearInterval(interval);
      }
    }, 100);
    return () => clearInterval(interval);
  }, [isReady]);

  // Hash-based scroll after page loads (only once per hash)
  useEffect(() => {
    if (location.hash && !hasScrolledToHash.current) {
      hasScrolledToHash.current = true;
      const id = location.hash.substring(1);
      setTimeout(() => {
        const el = document.getElementById(id);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 800);
    } else if (!location.hash) {
      hasScrolledToHash.current = false;
    }
  }, [location.hash]);

  return (
    <SmoothScroll>
      <div className="relative min-h-screen cursor-none bg-transparent text-white selection:bg-blue-500/30">
        <LoadingScreen />
        
        {/* 1. SCENE FIXED HAI (Hamesha piche rahega) */}
        <Scene3D />
        
        <CursorFollower />

        {/* Entrance animation wrapper */}
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={isReady ? { opacity: 1, y: 0 } : { opacity: 0, y: 60 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        >
          <Navbar />
          
          <main>
            {/* 2. HERO SECTION TRANSPARENT HAI (Yahan 3D Model dikhega) */}
            <HeroSection />

            {/* 3. SMOOTH CURVED WRAPPER — slides up over hero with rounded top */}
            <div className="relative z-10">
              {/* Gradient fade for smooth transition */}
              <div className="h-32 bg-gradient-to-b from-transparent via-[#020202]/60 to-[#020202] -mt-32 relative z-10" />
              
              {/* Main content — overflow-clip preserves rounded corners WITHOUT breaking position:sticky */}
              <div className="bg-[#020202] rounded-t-[3rem] -mt-12 relative z-20 shadow-[0_-40px_80px_rgba(0,0,0,0.8)]" style={{ overflow: 'clip' }}>
                 <ServicesSection />
                 <ProjectsSection />
                 <ContactSection />
                 <FooterSection />
              </div>
            </div>
          </main>
        </motion.div>
      </div>
    </SmoothScroll>
  );
};

export default Index;