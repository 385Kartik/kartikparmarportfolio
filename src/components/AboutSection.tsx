import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

const processSteps = [
  { number: '01', title: 'CONCEPT', description: 'Strategic foundation and visual direction.' },
  { number: '02', title: 'DESIGN', description: 'User-centric interfaces that captivate.' },
  { number: '03', title: 'DEVELOP', description: 'Clean code and robust architecture.' },
  { number: '04', title: 'LAUNCH', description: 'Seamless deployment and optimization.' },
];

export default function AboutSection() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);

  return (
    <section
      ref={ref}
      id="about"
      className="relative py-32 bg-foreground text-background overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left - 3D Visual placeholder */}
          <motion.div
            initial={{ opacity: 0, x: -100 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="aspect-square bg-background rounded-3xl overflow-hidden relative">
              {/* 3D Sphere visual */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-64 h-64 rounded-full bg-gradient-to-br from-primary/30 to-primary/5 animate-pulse-glow" />
              </div>
              <div className="absolute bottom-6 left-6 right-6">
                <div className="flex items-center gap-4 text-foreground">
                  <span className="text-xs tracking-wider">REAL-TIME 3D ENGINE</span>
                  <div className="flex-1 h-1 bg-muted rounded-full overflow-hidden">
                    <motion.div 
                      className="h-full bg-primary rounded-full"
                      initial={{ width: 0 }}
                      whileInView={{ width: '75%' }}
                      transition={{ duration: 1.5, delay: 0.5 }}
                      viewport={{ once: true }}
                    />
                  </div>
                </div>
              </div>
            </div>
            
            {/* Cursor indicator */}
            <motion.div 
              style={{ y }}
              className="absolute -top-4 -left-4 w-12 h-12 rounded-full border-2 border-primary flex items-center justify-center"
            >
              <div className="w-2 h-2 rounded-full bg-primary" />
            </motion.div>
          </motion.div>

          {/* Right - Content */}
          <motion.div
            initial={{ opacity: 0, x: 100 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-6xl md:text-8xl font-display leading-none mb-6">
              WE
              <br />
              BUILD
              <br />
              THE
              <br />
              <span className="text-primary italic">UNIMAGINABLE</span>
            </h2>
            
            <p className="text-background/60 text-lg mb-12 max-w-md">
              Our process is a fusion of logic and art. We dissect complex problems to create simple, beautiful, and powerful solutions that move the needle.
            </p>

            {/* Process steps */}
            <div className="space-y-6">
              {processSteps.map((step, index) => (
                <motion.div
                  key={step.number}
                  initial={{ opacity: 0, x: 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="flex items-start gap-6"
                >
                  <span className="text-5xl font-display text-background/10">{step.number}</span>
                  <div>
                    <h4 className="font-display text-xl mb-1">{step.title}</h4>
                    <p className="text-background/50">{step.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
