import { motion, useMotionTemplate, useMotionValue } from 'framer-motion';
import { ArrowUp, Cpu, Database, Globe, Layers, Power, ShieldCheck, FileText } from 'lucide-react';
import { MouseEvent } from 'react';
import MagneticButton from './MagneticButton';
import InteractiveText from './InteractiveText';
import { Link } from 'react-router-dom';

import { BookOpen } from 'lucide-react';

const systemLinks = [
  { name: 'Skills', href: '/#services', icon: Cpu },
  { name: 'Project Archives', href: '/#projects', icon: Database },
  { name: 'Research Paper', href: '/research-paper', icon: FileText },
  { name: 'Engineering Log', href: '/blog', icon: BookOpen },
  { name: 'Neural Profile', href: '/about', icon: Layers },
  { name: 'Uplink Channel', href: '/#contact', icon: Globe },
];

export default function FooterSection() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove({ currentTarget, clientX, clientY }: MouseEvent) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer 
      className="relative pt-32 pb-12 bg-[#020202] overflow-hidden"
      onMouseMove={handleMouseMove}
    >
      {/* --- THE QUANTUM REACTOR BACKGROUND --- */}
      <div className="absolute inset-0 pointer-events-none">
        {/* 1. The pulsing core glow */}
        <motion.div 
          className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[150vw] h-[80vh] opacity-40 mix-blend-screen"
          style={{ 
            background: 'radial-gradient(ellipse at bottom, #3b82f6 0%, #8b5cf6 30%, transparent 70%)',
          }}
          animate={{ 
            scale: [1, 1.05, 1],
            opacity: [0.3, 0.5, 0.3]
          }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        />
        
        {/* 2. Mouse interaction spotlight */}
        <motion.div 
          className="absolute inset-0 opacity-20 mix-blend-overlay"
          style={{ 
            background: useMotionTemplate`
              radial-gradient(
                600px circle at ${mouseX}px ${mouseY}px,
                rgba(255, 255, 255, 0.2),
                transparent 80%
              )
            `,
          }}
        />

        {/* 3. Digital Grid & Scanlines */}
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(0,0,0,1)_0%,transparent_20%,transparent_80%,rgba(0,0,0,1)_100%)] z-10" />
        <div 
          className="absolute inset-0 opacity-[0.05]"
          style={{ 
            backgroundImage: 'linear-gradient(rgba(59,130,246,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(59,130,246,0.3) 1px, transparent 1px)',
            backgroundSize: '30px 30px'
          }} 
        />
        {/* Scrolling data stream */}
        <div className="absolute inset-0 overflow-hidden opacity-10">
           <div className="animate-scrolling-text font-mono text-[10px] text-blue-500 leading-none whitespace-nowrap">
              01010111 01000001 01001011 01000101 00100000 01010101 01010000 00100000 01001110 01000101 01001111 // SYSTEMINTEGRITY_CHECK // QUANTUM_FIELD_STABLE // 
           </div>
        </div>
      </div>

      {/* --- TOP ENERGY BORDER --- */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-500/50 to-transparent">
        <motion.div 
           className="absolute inset-0 bg-blue-400 blur-[4px]"
           animate={{ opacity: [0.5, 1, 0.5] }}
           transition={{ duration: 2, repeat: Infinity }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-20">
        
        <div className="grid md:grid-cols-12 gap-12 mb-24 items-center">
           
           {/* LEFT: System Identity */}
           <div className="md:col-span-5 space-y-8">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="flex items-center gap-3"
              >
                 <div className="relative">
                    <div className="w-12 h-12 rounded-2xl bg-blue-500/10 border border-blue-500/30 flex items-center justify-center backdrop-blur-md">
                       <Power className="w-6 h-6 text-blue-400 animate-pulse" />
                    </div>
                    {/* Spinning ring */}
                    <motion.div 
                       className="absolute -inset-1 rounded-2xl border border-blue-500/30 border-dashed"
                       animate={{ rotate: 360 }}
                       transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                    />
                 </div>
                 <div>
                    <h2 className="text-3xl font-display text-white tracking-wider">KARTIK</h2>
                    <p className="font-mono text-xs text-blue-400 tracking-[0.3em]">SYSTEM_ONLINE // V.2.5.0</p>
                 </div>
              </motion.div>
              <p className="text-zinc-400 max-w-sm leading-relaxed border-l-2 border-blue-500/20 pl-4">
                 Architecting immersive digital experiences at the intersection of art and code. The system is ready for your input.
              </p>
              
              <div className="flex items-center gap-2 text-xs font-mono text-green-500 bg-green-500/5 border border-green-500/20 px-3 py-2 rounded-full w-fit">
                 <ShieldCheck className="w-4 h-4" />
                 ALL SYSTEMS NOMINAL
              </div>
           </div>

           {/* CENTER: The Reboot Button */}
           <div className="md:col-span-2 flex justify-center">
              <div className="relative group" onClick={scrollToTop}>
                 <div className="absolute -inset-4 bg-blue-500/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-all duration-500" />
                 <MagneticButton className="w-32 h-32 rounded-full bg-[#0a0a0a] border-2 border-blue-500/30 flex flex-col items-center justify-center gap-2 text-white hover:bg-blue-500 hover:border-blue-400 transition-all duration-300 group z-10 relative">
                    <ArrowUp className="w-8 h-8 group-hover:-translate-y-1 transition-transform duration-300" />
                    <span className="text-[10px] font-bold tracking-[0.2em] uppercase">Reboot</span>
                 </MagneticButton>
                 {/* Orbiting particle */}
                 <motion.div 
                    className="absolute inset-0 rounded-full border-[1px] border-t-blue-500/80 border-r-transparent border-b-transparent border-l-transparent pointer-events-none"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                 />
              </div>
           </div>

           {/* RIGHT: System Diagnostics (Links) */}
           <div className="md:col-span-5 grid grid-cols-2 gap-6">
              {systemLinks.map((link, i) => (
                 <motion.div
                   key={link.name}
                   initial={{ opacity: 0, x: 20 }}
                   whileInView={{ opacity: 1, x: 0 }}
                   viewport={{ once: true }}
                   transition={{ delay: i * 0.1 }}
                 >
                    <Link to={link.href} className="group flex items-center gap-3 p-4 rounded-2xl bg-white/5 border border-white/10 hover:bg-blue-500/10 hover:border-blue-500/30 transition-all duration-300 relative overflow-hidden">
                       <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                       <link.icon className="w-5 h-5 text-zinc-500 group-hover:text-blue-400 transition-colors" />
                       <span className="font-display text-sm text-zinc-300 group-hover:text-white transition-colors relative z-10">
                          <InteractiveText text={link.name} />
                       </span>
                       <div className="ml-auto w-1.5 h-1.5 rounded-full bg-blue-500/30 group-hover:bg-blue-400 group-hover:shadow-[0_0_10px_#3b82f6] transition-all" />
                    </Link>
                 </motion.div>
              ))}
           </div>
        </div>

        {/* --- BOTTOM STATUS BAR --- */}
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 font-mono text-xs text-zinc-500">
           <div className="flex items-center gap-4">
              <span>© 2026 Kartik Parmar</span>
              <span className="h-3 w-px bg-white/10" />
              <span>LATENCY: 12ms</span>
           </div>
           <div className="flex items-center gap-6 uppercase tracking-wider">
              <a href="#" className="hover:text-blue-400 transition-colors">Term_Logs</a>
              <a href="#" className="hover:text-blue-400 transition-colors">Privacy_Protocol</a>
           </div>
        </div>

      </div>
    </footer>
  );
}