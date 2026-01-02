import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { ArrowRight, Sparkles, Zap } from 'lucide-react';
import MagneticButton from './MagneticButton';
import InteractiveText from './InteractiveText';

export default function HeroSection() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.8]);
  const rotate = useTransform(scrollYProgress, [0, 1], [0, 10]);

  return (
    <section
      ref={ref}
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20"
    >
      {/* Animated grid background */}
      <div className="absolute inset-0 opacity-20">
        <div 
          className="absolute inset-0"
          style={{
            backgroundImage: 'linear-gradient(hsl(var(--primary) / 0.1) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--primary) / 0.1) 1px, transparent 1px)',
            backgroundSize: '100px 100px'
          }}
        />
      </div>

      {/* Large background text */}
      <motion.div
        style={{ y, opacity, rotate }}
        className="absolute inset-0 flex items-center justify-center pointer-events-none select-none"
      >
        <h1 className="text-[20vw] font-display text-primary/5 leading-none tracking-tight">
          DEVELOPER
        </h1>
      </motion.div>

      {/* Main content */}
      <motion.div
        style={{ scale, opacity }}
        className="relative z-10 text-center px-6 max-w-7xl mx-auto"
      >
        {/* Status badge */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-6 inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/30 bg-primary/5"
        >
          <motion.span
            className="w-2 h-2 rounded-full bg-green-500"
            animate={{ scale: [1, 1.2, 1], opacity: [1, 0.5, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
          <span className="text-xs tracking-wider text-foreground/80">AVAILABLE FOR PROJECTS</span>
        </motion.div>

        {/* Tagline */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mb-6"
        >
          <span className="text-primary text-sm tracking-[0.4em] font-medium inline-flex items-center gap-2">
            <Sparkles className="w-4 h-4" />
            THE FUTURE OF DIGITAL INNOVATION
            <Sparkles className="w-4 h-4" />
          </span>
        </motion.div>

        {/* HUGE title with interactive letters */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mb-4"
        >
          <h1 className="text-[12vw] md:text-[15vw] font-display leading-[0.85] tracking-tight">
            <InteractiveText text="CREATIVE" className="text-foreground" />
          </h1>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mb-8"
        >
          <h1 className="text-[10vw] md:text-[12vw] font-display leading-[0.85] tracking-tight">
            <span className="text-outline">DEVELOPER</span>
            <span className="text-primary">.</span>
          </h1>
        </motion.div>

        {/* Subtitle with highlight */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="text-lg md:text-2xl text-muted-foreground max-w-3xl mx-auto mb-12 font-light"
        >
          <p>
            Crafting <span className="text-foreground font-medium">immersive digital experiences</span> that
            <br className="hidden md:block" />
            push the boundaries of <span className="text-primary font-medium">web technology</span>.
          </p>
        </motion.div>

        {/* Stats row */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="flex flex-wrap justify-center gap-8 md:gap-16 mb-12"
        >
          {[
            { value: '50+', label: 'Projects Delivered' },
            { value: '5+', label: 'Years Experience' },
            { value: '100%', label: 'Client Satisfaction' },
          ].map((stat, i) => (
            <motion.div 
              key={stat.label} 
              className="text-center"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.9 + i * 0.1 }}
            >
              <span className="text-4xl md:text-5xl font-display text-primary">{stat.value}</span>
              <p className="text-xs tracking-wider text-muted-foreground mt-1">{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA Buttons with magnetic effect */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="flex flex-wrap gap-6 justify-center"
        >
          <MagneticButton href="#projects" className="btn-primary inline-flex items-center gap-3 text-lg">
            <Zap className="w-5 h-5" />
            View My Work
            <ArrowRight className="w-5 h-5" />
          </MagneticButton>
          <MagneticButton href="#contact" className="btn-outline inline-flex items-center gap-3 text-lg">
            Let's Talk
          </MagneticButton>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <motion.div
          className="w-6 h-10 rounded-full border-2 border-muted-foreground/30 flex justify-center p-2"
        >
          <motion.div
            className="w-1.5 h-1.5 rounded-full bg-primary"
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
        </motion.div>
        <motion.span 
          className="text-xs tracking-[0.3em] text-muted-foreground"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          SCROLL
        </motion.span>
      </motion.div>

      {/* Social links - vertical on left */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute left-6 top-1/2 -translate-y-1/2 hidden lg:flex flex-col gap-4"
      >
        <div className="w-px h-20 bg-gradient-to-b from-transparent via-muted-foreground/30 to-transparent mx-auto" />
        {['GH', 'TW', 'LI', 'DR'].map((social, index) => (
          <motion.a
            key={social}
            href="#"
            className="w-10 h-10 rounded-full border border-muted-foreground/20 flex items-center justify-center text-xs text-muted-foreground hover:text-primary hover:border-primary transition-all"
            whileHover={{ scale: 1.2, borderColor: 'hsl(var(--primary))' }}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1.5 + index * 0.1 }}
          >
            {social}
          </motion.a>
        ))}
        <div className="w-px h-20 bg-gradient-to-b from-transparent via-muted-foreground/30 to-transparent mx-auto" />
      </motion.div>

      {/* Decorative elements on right */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute right-6 top-1/2 -translate-y-1/2 hidden lg:flex flex-col items-end gap-4"
      >
        <motion.div
          className="text-xs tracking-widest text-muted-foreground"
          style={{ writingMode: 'vertical-rl' }}
          animate={{ opacity: [0.3, 1, 0.3] }}
          transition={{ duration: 3, repeat: Infinity }}
        >
          BASED IN NYC — WORKING GLOBALLY
        </motion.div>
      </motion.div>
    </section>
  );
}
