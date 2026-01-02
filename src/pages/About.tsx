import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import Navbar from '@/components/Navbar';
import CursorFollower from '@/components/CursorFollower';
import InteractiveText from '@/components/InteractiveText';
import MagneticButton from '@/components/MagneticButton';
import { ArrowRight } from 'lucide-react';

const skills = [
  { name: 'React & Next.js', level: 95 },
  { name: 'TypeScript', level: 90 },
  { name: 'Node.js', level: 85 },
  { name: 'Three.js & WebGL', level: 80 },
  { name: 'AI & Machine Learning', level: 75 },
];

const experiences = [
  { year: '2023 - Present', role: 'Senior Developer', company: 'Tech Innovations' },
  { year: '2021 - 2023', role: 'Full Stack Developer', company: 'Digital Agency' },
  { year: '2019 - 2021', role: 'Frontend Developer', company: 'Startup Inc' },
];

export default function About() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);

  return (
    <div className="relative min-h-screen bg-background cursor-none">
      <CursorFollower />
      <Navbar />

      {/* Hero */}
      <section className="min-h-screen flex items-center pt-20 px-6">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
          <motion.div initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }}>
            <span className="text-primary text-sm tracking-[0.3em] mb-4 block">ABOUT ME</span>
            <h1 className="text-6xl md:text-8xl font-display leading-none mb-8">
              <InteractiveText text="CREATIVE" className="text-primary" />
              <br />
              <span className="text-foreground">DEVELOPER</span>
            </h1>
            <p className="text-muted-foreground text-lg max-w-md mb-8">
              I'm a passionate developer with 5+ years of experience crafting digital experiences that blend creativity with cutting-edge technology.
            </p>
            <MagneticButton href="/#contact" className="btn-primary inline-flex items-center gap-3">
              Let's Work Together <ArrowRight className="w-5 h-5" />
            </MagneticButton>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 50 }} 
            animate={{ opacity: 1, x: 0 }} 
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="aspect-square bg-muted rounded-3xl flex items-center justify-center">
              <motion.div 
                className="w-48 h-48 rounded-full bg-gradient-to-br from-primary/30 to-secondary/30"
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 3, repeat: Infinity }}
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Skills */}
      <section ref={ref} className="py-32 px-6 bg-muted/30">
        <div className="max-w-7xl mx-auto">
          <motion.h2 
            initial={{ opacity: 0, y: 30 }} 
            whileInView={{ opacity: 1, y: 0 }} 
            className="text-5xl md:text-7xl font-display mb-16"
          >
            SKILLS & <span className="text-primary italic">EXPERTISE</span>
          </motion.h2>
          
          <div className="space-y-8">
            {skills.map((skill, i) => (
              <motion.div 
                key={skill.name}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                className="group"
              >
                <div className="flex justify-between mb-2">
                  <span className="font-display text-xl group-hover:text-primary transition-colors">{skill.name}</span>
                  <span className="text-muted-foreground">{skill.level}%</span>
                </div>
                <div className="h-2 bg-border rounded-full overflow-hidden">
                  <motion.div 
                    className="h-full bg-gradient-to-r from-primary to-secondary rounded-full"
                    initial={{ width: 0 }}
                    whileInView={{ width: `${skill.level}%` }}
                    transition={{ duration: 1, delay: i * 0.1 }}
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Experience */}
      <section className="py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.h2 
            initial={{ opacity: 0, y: 30 }} 
            whileInView={{ opacity: 1, y: 0 }} 
            className="text-5xl md:text-7xl font-display mb-16"
          >
            WORK <span className="text-outline italic">EXPERIENCE</span>
          </motion.h2>
          
          <div className="space-y-0">
            {experiences.map((exp, i) => (
              <motion.div 
                key={exp.year}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ x: 20, backgroundColor: 'hsl(var(--primary) / 0.05)' }}
                className="border-t border-border py-8 flex flex-col md:flex-row md:items-center gap-4 md:gap-16 transition-all cursor-pointer"
              >
                <span className="text-muted-foreground w-40">{exp.year}</span>
                <h3 className="text-3xl font-display">{exp.role}</h3>
                <span className="text-primary ml-auto">{exp.company}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
