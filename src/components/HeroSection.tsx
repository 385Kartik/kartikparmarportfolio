import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { ArrowRight } from 'lucide-react';
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

  return (
    <section
      ref={ref}
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20"
    >
      {/* Large background text */}
      <motion.div
        style={{ y, opacity }}
        className="absolute inset-0 flex items-center justify-center pointer-events-none select-none"
      >
        <h1 className="text-[15vw] font-display text-primary/10 leading-none tracking-tight">
          DEVELOPER
        </h1>
      </motion.div>

      {/* Main content */}
      <motion.div
        style={{ scale, opacity }}
        className="relative z-10 text-center px-6 max-w-6xl mx-auto"
      >
        {/* Tagline */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mb-8"
        >
          <span className="text-primary text-sm tracking-[0.3em] font-medium">
            THE FUTURE OF DIGITAL INNOVATION
          </span>
        </motion.div>

        {/* Large title with interactive letters */}
        <motion.h1
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="text-7xl md:text-9xl font-display leading-none mb-8"
        >
          <InteractiveText text="CREATIVE" className="text-primary" />
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-12 font-light"
        >
          A high-end developer specializing in bespoke
          <br />
          web systems, next-gen apps, and intelligent AI.
        </motion.p>

        {/* CTA Buttons with magnetic effect */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.9 }}
          className="flex flex-wrap gap-6 justify-center"
        >
          <MagneticButton href="#projects" className="btn-primary inline-flex items-center gap-3">
            Launch Project
            <ArrowRight className="w-5 h-5" />
          </MagneticButton>
          <MagneticButton href="#about" className="btn-outline inline-flex items-center gap-3">
            View Reel
          </MagneticButton>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-10 left-10"
      >
        <motion.span 
          className="text-xs tracking-[0.3em] text-muted-foreground"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          SCROLL TO EXPLORE
        </motion.span>
      </motion.div>

      {/* Social links - vertical on right */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute right-10 top-1/2 -translate-y-1/2 hidden lg:flex flex-col gap-6"
      >
        {['INSTAGRAM', 'TWITTER', 'DRIBBBLE'].map((social, index) => (
          <motion.a
            key={social}
            href="#"
            className="text-xs tracking-widest text-muted-foreground hover:text-primary transition-colors"
            style={{ writingMode: 'vertical-rl' }}
            whileHover={{ x: -5, color: 'hsl(var(--primary))' }}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1.5 + index * 0.1 }}
          >
            {social}
          </motion.a>
        ))}
      </motion.div>
    </section>
  );
}
