import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef, useState } from 'react';
import { Code2, Smartphone, Cpu, ArrowUpRight, Sparkles, Globe, Database } from 'lucide-react';

const services = [
  {
    icon: Code2,
    number: '01',
    category: 'WEB DEVELOPMENT',
    title: 'BESPOKE SYSTEMS',
    description: 'High-performance architectures built with the precision of modern engineering. React, Next.js, and cutting-edge frameworks.',
    color: '#3b82f6',
    features: ['React & Next.js', 'TypeScript', 'Performance Optimized'],
  },
  {
    icon: Smartphone,
    number: '02',
    category: 'MOBILE EXPERIENCE',
    title: 'NEXT-GEN APPS',
    description: 'Immersive mobile solutions that redefine user engagement and performance across all platforms.',
    color: '#f97316',
    features: ['React Native', 'Cross-Platform', 'Offline-First'],
  },
  {
    icon: Cpu,
    number: '03',
    category: 'AUTOMATION',
    title: 'INTELLIGENT AI',
    description: 'Custom AI ecosystems that transform complex data into actionable intelligence and automated workflows.',
    color: '#ec4899',
    features: ['Machine Learning', 'ChatGPT Integration', 'Data Analytics'],
    featured: true,
  },
  {
    icon: Globe,
    number: '04',
    category: '3D & INTERACTIVE',
    title: 'IMMERSIVE WEB',
    description: 'Three.js and WebGL experiences that push the boundaries of what\'s possible in a browser.',
    color: '#10b981',
    features: ['Three.js', 'WebGL', 'Animations'],
  },
  {
    icon: Database,
    number: '05',
    category: 'BACKEND',
    title: 'SCALABLE INFRA',
    description: 'Cloud-native architectures designed to scale from zero to millions without breaking a sweat.',
    color: '#8b5cf6',
    features: ['Node.js', 'PostgreSQL', 'AWS/GCP'],
  },
  {
    icon: Sparkles,
    number: '06',
    category: 'DESIGN',
    title: 'UI/UX MAGIC',
    description: 'Pixel-perfect designs that blend aesthetics with functionality for unforgettable user experiences.',
    color: '#f59e0b',
    features: ['Figma', 'Motion Design', 'Design Systems'],
  },
];

export default function ServicesSection() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const x = useTransform(scrollYProgress, [0, 1], ['100%', '-100%']);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section
      ref={ref}
      id="services"
      className="relative py-32 overflow-hidden bg-background"
    >
      {/* Section header */}
      <div className="max-w-7xl mx-auto px-6 mb-20">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <motion.span 
            className="text-primary text-sm tracking-[0.3em] mb-4 block"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            WHAT I DO BEST
          </motion.span>
          <h2 className="text-6xl md:text-8xl font-display leading-none">
            MY
            <br />
            <span className="text-primary">CORE</span>
            <br />
            <span className="text-outline italic">EXPERTISE</span>
          </h2>
          <p className="text-muted-foreground mt-8 max-w-lg text-lg">
            I don't just build software; I engineer digital experiences that push the boundaries of what's possible.
          </p>
        </motion.div>
      </div>

      {/* Services grid */}
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              whileHover={{ y: -12 }}
              className={`service-card group cursor-pointer relative ${service.featured ? 'lg:col-span-1' : ''}`}
            >
              {/* Animated background gradient */}
              <motion.div
                className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{ 
                  background: `radial-gradient(circle at center, ${service.color}10, transparent 70%)` 
                }}
              />

              {/* Number background */}
              <motion.span 
                className="absolute top-6 right-6 text-8xl font-display text-foreground/5 group-hover:text-foreground/10 transition-all"
                animate={{ scale: hoveredIndex === index ? 1.1 : 1 }}
              >
                {service.number}
              </motion.span>
              
              {/* Icon */}
              <motion.div 
                className="w-16 h-16 rounded-2xl flex items-center justify-center mb-6 relative z-10"
                style={{ background: `linear-gradient(135deg, ${service.color}, ${service.color}80)` }}
                whileHover={{ scale: 1.1, rotate: 5 }}
                transition={{ type: 'spring', stiffness: 300 }}
              >
                <service.icon className="w-8 h-8 text-white" />
              </motion.div>

              {/* Category */}
              <span className="text-xs tracking-[0.2em] text-muted-foreground mb-3 block relative z-10">
                {service.category}
              </span>

              {/* Title */}
              <h3 
                className="text-3xl font-display mb-4 relative z-10 group-hover:text-primary transition-colors"
              >
                {service.title}
              </h3>

              {/* Description */}
              <p className="text-muted-foreground mb-6 relative z-10 group-hover:text-foreground/70 transition-colors">
                {service.description}
              </p>

              {/* Features */}
              <div className="flex flex-wrap gap-2 mb-6 relative z-10">
                {service.features.map((feature) => (
                  <span 
                    key={feature}
                    className="text-xs px-3 py-1 rounded-full bg-muted text-muted-foreground"
                  >
                    {feature}
                  </span>
                ))}
              </div>

              {/* Explore link */}
              <motion.a 
                href="#" 
                className="inline-flex items-center gap-2 text-sm tracking-wider relative z-10 transition-all"
                style={{ color: service.color }}
                whileHover={{ gap: '12px' }}
              >
                EXPLORE
                <ArrowUpRight className="w-4 h-4" />
              </motion.a>

              {/* Glow effect */}
              <motion.div 
                className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"
                style={{ boxShadow: `0 0 80px ${service.color}20` }}
              />
            </motion.div>
          ))}
        </div>
      </div>

      {/* Marquee text */}
      <motion.div
        style={{ x }}
        className="mt-32 text-[10vw] font-display text-foreground/5 whitespace-nowrap pointer-events-none"
      >
        DIGITAL FIRST • AI POWERED • FUTURE READY • PIXEL PERFECT •
      </motion.div>
    </section>
  );
}
