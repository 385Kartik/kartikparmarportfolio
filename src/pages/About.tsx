import Navbar from "../components/Navbar";
import AboutSection from "../components/AboutSection"; // <--- Importing your "Dual Core" component
import ContactSection from "../components/ContactSection"; // Optional: Adds the footer/contact area
import FooterSection from '@/components/FooterSection';
import SmoothScroll from '../components/SmoothScroll';
import { SEO } from "../components/SEO";

export default function About() {
  return (
    <SmoothScroll>
    <div className="bg-[#020202] min-h-screen text-white selection:bg-blue-500/30">
      <SEO title="About Kartik Parmar | Full Stack Developer" />
      {/* 1. Navigation */}
      <Navbar />

      {/* 2. The Main "Crazy" About Section */}
      {/* We add pt-20 to push it down below the fixed navbar if needed, 
          though AboutSection has its own padding too. */}
      <main>
        <AboutSection />
      </main>

      {/* 3. Footer / Contact (Optional, keeps consistency) */}
      <ContactSection />
       <FooterSection />
    </div>
    </SmoothScroll>
  );
}