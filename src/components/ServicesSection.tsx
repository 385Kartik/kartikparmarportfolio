import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { Code2, Smartphone, Cpu, ArrowUpRight } from 'lucide-react';

const services = [
  {
    icon: Code2,
    number: '01',
    category: 'WEB DEVELOPMENT',
    title: 'BESPOKE SYSTEMS',
    description: 'High-performance architectures built with the precision of modern engineering.',
    color: 'hsl(var(--primary))',
  },
  {
    icon: Smartphone,
    number: '02',
    category: 'MOBILE EXPERIENCE',
    title: 'NEXT-GEN APPS',
    description: 'Immersive mobile solutions that redefine user engagement and performance.',
    color: 'hsl(var(--secondary))',
  },
  {
    icon: Cpu,
    number: '03',
    category: 'AUTOMATION',
    title: 'INTELLIGENT AI',
    description: 'Custom AI ecosystems that transform complex data into actionable intelligence.',
    color: 'hsl(var(--secondary))',
    featured: true,
  },
];

export default function ServicesSection() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const x = useTransform(scrollYProgress, [0, 1], ['100%', '-100%']);

  return (
    <section
      ref={ref}
      id="services"
      className="relative py-32 overflow-hidden bg-background"
    >
      {/* Section header */}
      <div className="max-w-7xl mx-auto px-6 mb-16">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <span className="text-primary text-sm tracking-[0.3em] mb-4 block">
            WHAT WE DO
          </span>
          <h2 className="text-6xl md:text-8xl font-display leading-none">
            OUR
            <br />
            CORE
            <br />
            <span className="text-outline italic">EXPERTISE</span>
          </h2>
          <p className="text-muted-foreground mt-8 max-w-md text-lg">
            We don't just build software; we engineer digital experiences that push the boundaries of what's possible.
          </p>
        </motion.div>
      </div>

      {/* Services grid */}
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              viewport={{ once: true }}
              whileHover={{ 
                y: -12, 
                transition: { duration: 0.3 } 
              }}
              className={`service-card group cursor-pointer ${service.featured ? 'border-secondary/50' : ''}`}
            >
              {/* Number background */}
              <span className="absolute top-6 right-6 text-8xl font-display text-foreground/5 group-hover:text-foreground/10 transition-colors">
                {service.number}
              </span>
              
              {/* Icon */}
              <motion.div 
                className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6"
                style={{ background: `linear-gradient(135deg, ${service.color}, ${service.color}80)` }}
                whileHover={{ scale: 1.1, rotate: 5 }}
                transition={{ type: 'spring', stiffness: 300 }}
              >
                <service.icon className="w-7 h-7 text-foreground" />
              </motion.div>

              {/* Category */}
              <span className="text-xs tracking-[0.2em] text-muted-foreground mb-3 block">
                {service.category}
              </span>

              {/* Title */}
              <h3 
                className="text-3xl font-display mb-4 group-hover:text-primary transition-colors"
                style={{ color: service.featured ? service.color : 'inherit' }}
              >
                {service.title}
              </h3>

              {/* Description */}
              <p className="text-muted-foreground mb-8 group-hover:text-foreground/70 transition-colors">
                {service.description}
              </p>

              {/* Explore link */}
              <motion.a 
                href="#" 
                className="inline-flex items-center gap-2 text-sm tracking-wider transition-all"
                style={{ color: service.color }}
                whileHover={{ gap: '12px' }}
              >
                EXPLORE
                <ArrowUpRight className="w-4 h-4" />
              </motion.a>

              {/* Bottom accent line for featured */}
              {service.featured && (
                <motion.div 
                  className="absolute bottom-0 left-0 right-0 h-1 rounded-b-3xl"
                  style={{ background: service.color }}
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  transition={{ duration: 0.8, delay: 0.5 }}
                />
              )}

              {/* Hover glow effect */}
              <div 
                className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"
                style={{ boxShadow: `0 0 60px ${service.color}30` }}
              />
            </motion.div>
          ))}
        </div>
      </div>

      {/* Marquee text */}
      <motion.div
        style={{ x }}
        className="mt-32 text-[12vw] font-display text-foreground/5 whitespace-nowrap pointer-events-none"
      >
        DIGITAL FIRST • AI POWERED • DIGITAL FIRST • AI POWERED •
      </motion.div>
    </section>
  );
}
