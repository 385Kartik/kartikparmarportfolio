import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Terminal, Clock, ChevronRight } from 'lucide-react';
import MagneticButton from './MagneticButton';

const navItems = [
  { name: 'SKILLS', href: '/#services' },
  { name: 'PROJECTS', href: '/#projects' },
  { name: 'RESEARCH', href: '/research-paper' },
  { name: 'BLOG', href: '/blog' },
  { name: 'ABOUT', href: '/about' },
  { name: 'CONTACT', href: '/#contact' },
];

export default function Navbar() {
  const location = useLocation();
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [time, setTime] = useState('');
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState<string | null>('home');

  // Clock Logic
  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      setTime(now.toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit' }));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  // Scroll detection for glassmorphism + active section tracking
  useEffect(() => {
    if (location.pathname !== '/') {
      setActiveSection(null);
      return;
    }

    const handleScroll = () => {
      setScrolled(window.scrollY > 50);

      // Scroll-position-based active section detection
      // Check from bottom to top — first match wins
      const sections = ['contact', 'projects', 'services'];
      
      for (const id of sections) {
        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          // Section is active when its top is in the upper third of viewport
          if (rect.top <= window.innerHeight / 3) {
            setActiveSection(id);
            return;
          }
        }
      }
      setActiveSection('home');
    };

    handleScroll(); // Run once on mount
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [location.pathname]);

  const handleNavClick = (href: string) => {
    setIsMobileOpen(false);
    if (href.startsWith('/#')) {
      const section = href.replace('/#', '');
      if (location.pathname === '/') {
        const element = document.querySelector(`#${section}`);
        element?.scrollIntoView({ behavior: 'smooth' });
      } else {
        window.location.href = href;
      }
    }
  };

  const isItemActive = (item: typeof navItems[0]) => {
    if (item.href === '/about' && location.pathname === '/about') return true;
    if (item.href.startsWith('/#')) {
      const section = item.href.replace('/#', '');
      return activeSection === section;
    }
    return false;
  };

  return (
    <>
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="fixed top-6 left-0 right-0 z-50 flex justify-center px-4 pointer-events-none"
      >
        <div className="w-full max-w-6xl pointer-events-auto">
          <div className={`relative flex items-center justify-between px-6 py-3.5 rounded-full shadow-2xl overflow-hidden transition-all duration-500 ${
            scrolled 
              ? 'bg-[#0a0a0a]/90 backdrop-blur-2xl border border-white/[0.08] shadow-[0_8px_32px_rgba(0,0,0,0.4)]' 
              : 'bg-[#0a0a0a]/70 backdrop-blur-xl border border-white/[0.06]'
          }`}>
            
            {/* Gradient border shimmer */}
            <motion.div 
              className="absolute inset-0 rounded-full opacity-0 hover:opacity-100 transition-opacity duration-700 pointer-events-none"
              style={{
                background: 'linear-gradient(90deg, transparent, rgba(59,130,246,0.1), rgba(139,92,246,0.1), transparent)',
                padding: '1px',
                mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                maskComposite: 'xor',
                WebkitMaskComposite: 'xor',
              }}
            />
            
            {/* Active Scanline at bottom */}
            <motion.div 
              className="absolute bottom-0 left-0 h-[1px] bg-gradient-to-r from-transparent via-blue-500/60 to-transparent w-1/2"
              animate={{ x: ['-100%', '200%'] }}
              transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
            />

            {/* Logo Area */}
            <Link to="/" onClick={() => window.scrollTo(0,0)}>
              <div className="flex items-center gap-3 group">
                <div className="p-2 bg-white/5 rounded-full border border-white/10 group-hover:bg-blue-500/20 group-hover:border-blue-500/40 transition-all duration-300">
                  <Terminal className="w-5 h-5 text-white group-hover:text-blue-400 transition-colors" />
                </div>
                <div className="flex flex-col">
                  <span className="text-lg font-display font-bold tracking-wider text-white leading-none">KARTIK</span>
                  <span className="text-[9px] font-mono text-zinc-500 tracking-[0.2em] group-hover:text-blue-400 transition-colors">SYSTEM_ONLINE</span>
                </div>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <ul className="hidden md:flex items-center gap-1 bg-white/[0.03] p-1 rounded-full border border-white/[0.04]">
              {navItems.map((item) => {
                const isHovered = hoveredItem === item.name;
                const isCurrent = isItemActive(item);
                return (
                  <li key={item.name} className="relative">
                    {item.href.startsWith('/') && !item.href.startsWith('/#') ? (
                      <Link to={item.href}>
                        <NavPill item={item} isHovered={isHovered} isCurrent={isCurrent} setHoveredItem={setHoveredItem} />
                      </Link>
                    ) : (
                      <a 
                        href={item.href}
                        onClick={(e) => { e.preventDefault(); handleNavClick(item.href); }}
                      >
                        <NavPill item={item} isHovered={isHovered} isCurrent={isCurrent} setHoveredItem={setHoveredItem} />
                      </a>
                    )}
                  </li>
                );
              })}
            </ul>

            {/* Right Side: Clock & CTA */}
            <div className="hidden md:flex items-center gap-5">
              <div className="flex items-center gap-2 text-[11px] font-mono text-zinc-500 bg-white/[0.03] px-3 py-1.5 rounded-full border border-white/[0.04]">
                <Clock className="w-3 h-3" />
                <span>IST {time}</span>
              </div>
              <MagneticButton href="/#contact" className="px-5 py-2 rounded-full bg-white text-black text-xs font-bold tracking-widest hover:bg-blue-500 hover:text-white transition-all duration-300 uppercase shadow-[0_0_20px_rgba(255,255,255,0.1)] hover:shadow-[0_0_30px_rgba(59,130,246,0.3)]">
                Let's Talk
              </MagneticButton>
            </div>

            {/* Mobile Toggle */}
            <button 
              className="md:hidden p-2 text-white bg-white/10 rounded-full"
              onClick={() => setIsMobileOpen(true)}
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>
      </motion.nav>

      {/* --- FULL SCREEN MOBILE MENU OVERLAY --- */}
      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: '-100%' }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: '-100%' }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-[60] bg-[#050505] flex flex-col rounded-none"
          >
            {/* Mobile Background Grid */}
            <div className="absolute inset-0 opacity-10 bg-[linear-gradient(rgba(255,255,255,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[size:40px_40px]" />

            {/* Mobile Header */}
            <div className="flex justify-between items-center p-6 border-b border-white/10 relative z-10">
              <span className="font-display text-xl tracking-widest text-white">MENU_OVERRIDE</span>
              <button 
                onClick={() => setIsMobileOpen(false)}
                className="p-3 bg-white/10 rounded-full text-white hover:bg-red-500/20 hover:text-red-500 transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Mobile Links */}
            <div className="flex-1 flex flex-col justify-center px-6 gap-8 relative z-10">
              {navItems.map((item, i) => (
                <motion.div
                  key={item.name}
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 + i * 0.1 }}
                >
                  <a
                    href={item.href}
                    onClick={(e) => { 
                      if(item.href.startsWith('/#')) {
                        e.preventDefault(); 
                        handleNavClick(item.href);
                      }
                    }}
                    className="group flex items-center justify-between border-b border-white/5 pb-4"
                  >
                    <span className="text-5xl font-display font-bold text-transparent bg-clip-text bg-gradient-to-r from-zinc-500 to-zinc-700 group-hover:from-white group-hover:to-blue-500 transition-all duration-500">
                      {item.name}
                    </span>
                    <ChevronRight className="w-8 h-8 text-zinc-700 group-hover:text-blue-500 opacity-0 group-hover:opacity-100 -translate-x-4 group-hover:translate-x-0 transition-all duration-300" />
                  </a>
                </motion.div>
              ))}
            </div>

            {/* Mobile Footer */}
            <div className="p-6 border-t border-white/10 relative z-10 flex justify-between items-center">
              <div className="flex items-center gap-2 text-zinc-500 font-mono text-xs">
                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                SYSTEM OPERATIONAL
              </div>
              <span className="font-mono text-xs text-zinc-600">V.2.5.0</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

// Component for the Hover Pill Effect
function NavPill({ item, isHovered, isCurrent, setHoveredItem }: { item: any, isHovered: boolean, isCurrent: boolean, setHoveredItem: (name: string | null) => void }) {
  return (
    <div
      onMouseEnter={() => setHoveredItem(item.name)}
      onMouseLeave={() => setHoveredItem(null)}
      className="px-5 py-2 relative z-10 cursor-pointer text-xs font-bold tracking-widest transition-colors duration-300"
    >
      <span className={`relative z-20 transition-colors duration-300 ${
        isCurrent ? 'text-blue-400' : isHovered ? 'text-white' : 'text-zinc-400'
      }`}>
        {item.name}
      </span>

      {/* Active section dot indicator */}
      {isCurrent && (
        <motion.div
          layoutId="nav-active-dot"
          className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-blue-500 shadow-[0_0_8px_#3b82f6]"
          transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
        />
      )}
      
      {/* Background Sliding Pill on Hover */}
      {isHovered && (
        <motion.div
          layoutId="nav-pill"
          transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
          className="absolute inset-0 bg-white/[0.06] rounded-full border border-white/[0.04] z-10 backdrop-blur-md"
        />
      )}
    </div>
  );
}