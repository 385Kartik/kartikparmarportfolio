import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { ArrowRight } from 'lucide-react';

export default function HeroSection() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.9]);

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

        {/* Large title - behind the 3D sphere */}
        <motion.h1
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="text-7xl md:text-9xl font-display leading-none mb-8"
        >
          <span className="text-primary">CREATIVE</span>
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

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.9 }}
          className="flex flex-wrap gap-4 justify-center"
        >
          <motion.a
            href="#projects"
            className="btn-primary inline-flex items-center gap-3"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Launch Project
            <ArrowRight className="w-5 h-5" />
          </motion.a>
          <motion.a
            href="#about"
            className="btn-outline inline-flex items-center gap-3"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            View Reel
          </motion.a>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-10 left-10"
      >
        <span className="text-xs tracking-[0.3em] text-muted-foreground">
          SCROLL TO EXPLORE
        </span>
      </motion.div>

      {/* Social links - vertical on right */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute right-10 top-1/2 -translate-y-1/2 hidden lg:flex flex-col gap-6"
      >
        {['INSTAGRAM', 'TWITTER', 'DRIBBBLE'].map((social) => (
          <a
            key={social}
            href="#"
            className="text-xs tracking-widest text-muted-foreground hover:text-foreground transition-colors"
            style={{ writingMode: 'vertical-rl' }}
          >
            {social}
          </a>
        ))}
      </motion.div>
    </section>
  );
}
