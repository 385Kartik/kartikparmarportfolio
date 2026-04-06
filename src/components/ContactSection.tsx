import { motion, useMotionTemplate, useMotionValue } from 'framer-motion';
import { useRef, useState, MouseEvent } from 'react';
import { ArrowRight, Mail, MapPin, Phone, Send, Terminal, Copy, Check, Linkedin, Github, Globe } from 'lucide-react';
import MagneticButton from './MagneticButton';

const socials = [
  { name: 'LinkedIn', handle: '/in/parmarkartik385', url: 'https://www.linkedin.com/in/parmarkartik385/', icon: Linkedin, color: '#0284c7' },
  { name: 'GitHub', handle: '@385Kartik', url: 'https://github.com/385Kartik', icon: Github, color: '#ffffff' },
  { name: 'Portfolio', handle: 'kartik.dev', url: 'https://my-portfolio-f96fe.firebaseapp.com/', icon: Globe, color: '#3b82f6' },
];

function SocialCard({ social }: { social: any }) {
  return (
    <motion.a
      href={social.url}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="relative group p-6 rounded-2xl bg-[#0a0a0a] border border-white/10 overflow-hidden hover:border-white/30 transition-all duration-500"
    >
      <div className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-500 rounded-2xl" style={{ backgroundColor: social.color }} />
      
      {/* Scanline */}
      <div className="absolute top-0 left-0 w-full h-[1px] bg-white/20 opacity-0 group-hover:opacity-100 group-hover:top-[100%] transition-all duration-1000" />
      
      <div className="relative z-10 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="p-3 rounded-2xl bg-white/5 group-hover:bg-white/10 transition-colors">
            <social.icon className="w-5 h-5 transition-colors duration-300" style={{ color: social.color }} />
          </div>
          <div>
            <h4 className="font-display text-lg text-white group-hover:translate-x-1 transition-transform">{social.name}</h4>
            <p className="text-xs font-mono text-zinc-500">{social.handle}</p>
          </div>
        </div>
        <ArrowRight className="w-4 h-4 -rotate-45 text-zinc-600 group-hover:text-white group-hover:rotate-0 transition-all duration-300" />
      </div>
    </motion.a>
  );
}

export default function ContactSection() {
  const containerRef = useRef<HTMLElement>(null);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [copied, setCopied] = useState(false);
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [statusMessage, setStatusMessage] = useState('');

  // Mouse Physics
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove({ currentTarget, clientX, clientY }: MouseEvent) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  const copyEmail = () => {
    navigator.clipboard.writeText('385.kartik.p@gmail.com');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    setStatusMessage('');

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok) {
        setStatus('success');
        setStatusMessage('Message sent successfully! I\'ll get back to you soon.');
        setFormData({ name: '', email: '', message: '' });
        setTimeout(() => { setStatus('idle'); setStatusMessage(''); }, 5000);
      } else {
        setStatus('error');
        setStatusMessage(data.error || 'Something went wrong. Please try again.');
        setTimeout(() => { setStatus('idle'); setStatusMessage(''); }, 5000);
      }
    } catch {
      setStatus('error');
      setStatusMessage('Network error. Please try again later.');
      setTimeout(() => { setStatus('idle'); setStatusMessage(''); }, 5000);
    }
  };

  return (
    <section 
      ref={containerRef}
      id="contact" 
      className="relative py-32 bg-[#020202] overflow-hidden min-h-screen"
      onMouseMove={handleMouseMove}
    >
      {/* --- BACKGROUND (Dark Grid + Spotlight) --- */}
      <div className="absolute inset-0 pointer-events-none">
        <div 
          className="absolute inset-0 opacity-[0.05]"
          style={{ 
            backgroundImage: 'linear-gradient(#ffffff 1px, transparent 1px), linear-gradient(90deg, #ffffff 1px, transparent 1px)',
            backgroundSize: '40px 40px'
          }} 
        />
        <motion.div 
          className="absolute inset-0 opacity-10"
          style={{ 
            background: useMotionTemplate`
              radial-gradient(
                600px circle at ${mouseX}px ${mouseY}px,
                rgba(59, 130, 246, 0.5),
                transparent 80%
              )
            `,
          }}
        />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#020202_100%)]" />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-32"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-blue-500/30 bg-blue-500/10 mb-6">
            <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
            <span className="text-[10px] font-bold tracking-[0.2em] text-blue-400 uppercase">System Status: Online</span>
          </div>
          
          <h2 className="text-7xl md:text-[10vw] font-display leading-[0.8] text-white">
            READY TO
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-purple-500 to-blue-500 animate-gradient-x">
              COLLABORATE?
            </span>
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-20">
          
          {/* LEFT: Terminal Form */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            {/* Terminal Window Decor */}
            <div className="absolute -top-12 left-0 text-xs font-mono text-zinc-600 flex gap-4">
               <span>root@portfolio:~/contact-form</span>
               <span className="animate-pulse">_</span>
            </div>

            <form onSubmit={handleSubmit} className="space-y-12">
              <div className="relative group">
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                  className="w-full bg-transparent border-b border-white/10 py-4 text-2xl md:text-4xl text-white font-display focus:outline-none focus:border-blue-500 transition-colors placeholder:text-white/10 rounded-none"
                  placeholder="ENTER NAME"
                />
                <span className="absolute -bottom-6 left-0 text-[10px] font-mono text-blue-500 opacity-0 group-focus-within:opacity-100 transition-opacity">
                  // IDENTITY_DETECTED
                </span>
              </div>

              <div className="relative group">
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                  className="w-full bg-transparent border-b border-white/10 py-4 text-2xl md:text-4xl text-white font-display focus:outline-none focus:border-blue-500 transition-colors placeholder:text-white/10 rounded-none"
                  placeholder="ENTER EMAIL"
                />
                <span className="absolute -bottom-6 left-0 text-[10px] font-mono text-blue-500 opacity-0 group-focus-within:opacity-100 transition-opacity">
                  // COMMS_LINK_ESTABLISHED
                </span>
              </div>

              <div className="relative group">
                <textarea
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  required
                  rows={4}
                  className="w-full bg-transparent border-b border-white/10 py-4 text-xl md:text-2xl text-white font-display focus:outline-none focus:border-blue-500 transition-colors resize-none placeholder:text-white/10 rounded-none"
                  placeholder="TRANSMISSION DATA..."
                />
              </div>

              {/* Status Message */}
              {statusMessage && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`text-sm font-mono px-4 py-3 rounded-2xl border ${
                    status === 'success' 
                      ? 'text-green-400 bg-green-500/10 border-green-500/30' 
                      : 'text-red-400 bg-red-500/10 border-red-500/30'
                  }`}
                >
                  {status === 'success' ? '✓ ' : '✗ '}{statusMessage}
                </motion.div>
              )}

              <MagneticButton 
                onClick={() => {
                  const form = document.querySelector('form');
                  if (form) form.requestSubmit();
                }}
                className={`w-full py-6 font-bold tracking-widest text-sm transition-all duration-500 uppercase flex items-center justify-center gap-4 group rounded-2xl ${
                  status === 'loading' 
                    ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30 cursor-wait' 
                    : status === 'success'
                    ? 'bg-green-500/20 text-green-400 border border-green-500/30'
                    : 'bg-white text-black hover:bg-blue-500 hover:text-white'
                }`}
              >
                <span>
                  {status === 'loading' ? 'Transmitting...' : status === 'success' ? 'Transmission Complete' : 'Initialize Transmission'}
                </span>
                {status === 'loading' ? (
                  <motion.div 
                    className="w-4 h-4 border-2 border-blue-400 border-t-transparent rounded-full"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                  />
                ) : status === 'success' ? (
                  <Check className="w-4 h-4" />
                ) : (
                  <Send className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                )}
              </MagneticButton>
            </form>
          </motion.div>

          {/* RIGHT: HUD Info & Socials */}
          <div className="space-y-16">
            
            {/* Quick Copy Email */}
            <motion.div 
               className="p-8 border border-white/10 rounded-2xl bg-white/5 backdrop-blur-sm cursor-pointer group hover:border-blue-500/50 transition-colors relative overflow-hidden"
               onClick={copyEmail}
               whileHover={{ scale: 1.02 }}
            >
               <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl" />
               <div className="relative z-10 flex justify-between items-center">
                  <div>
                     <span className="text-xs font-mono text-zinc-500 mb-2 block uppercase tracking-widest">Primary Channel</span>
                     <h3 className="text-2xl md:text-3xl font-display text-white">385.kartik.p@gmail.com</h3>
                  </div>
                  <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-blue-500 group-hover:text-white transition-colors">
                     {copied ? <Check className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
                  </div>
               </div>
            </motion.div>

            {/* Info Grid */}
            <div className="grid grid-cols-2 gap-8">
               <div className="space-y-2">
                  <span className="text-xs font-mono text-zinc-500 flex items-center gap-2">
                     <MapPin className="w-3 h-3" /> BASE_STATION
                  </span>
                  <p className="text-xl text-white font-display">Mira Road, Mumbai</p>
               </div>
               <div className="space-y-2">
                  <span className="text-xs font-mono text-zinc-500 flex items-center gap-2">
                     <Phone className="w-3 h-3" /> SIGNAL_FREQ
                  </span>
                  <p className="text-xl text-white font-display">+91 9619410050</p>
               </div>
            </div>

            {/* Social Matrix */}
            <div className="space-y-6">
               <h3 className="text-xs font-mono text-zinc-500 uppercase tracking-widest">Global_Network_Access</h3>
               <div className="grid gap-4">
                  {socials.map((social) => (
                     <SocialCard key={social.name} social={social} />
                  ))}
               </div>
            </div>

          </div>
        </div>

        {/* --- SYSTEM FOOTER --- */}
        <div className="mt-40 border-t border-white/10 pt-12 flex flex-col md:flex-row justify-between items-end gap-8 opacity-50 hover:opacity-100 transition-opacity">
           <div>
              <Terminal className="w-8 h-8 text-blue-500 mb-4" />
              <p className="text-xs font-mono text-zinc-500 max-w-xs">
                 SECURE CONNECTION ESTABLISHED. ALL RIGHTS RESERVED. <br/>
                 SYSTEM VERSION 2.5.0
              </p>
           </div>
           
           <div className="text-right">
              <h2 className="text-[10vw] leading-[0.8] font-display text-white/5 select-none pointer-events-none">
                 KARTIK
              </h2>
           </div>
        </div>

      </div>
    </section>
  );
}