import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef, useState } from 'react';
import { ExternalLink, Github } from 'lucide-react';

const projects = [
  {
    id: 1,
    title: 'Immersive 3D Experience',
    description: 'A WebGL-powered immersive experience featuring real-time 3D graphics and particle systems.',
    tags: ['Three.js', 'React', 'WebGL', 'GLSL'],
    color: '#00d4ff',
    image: '🌌',
  },
  {
    id: 2,
    title: 'E-Commerce Platform',
    description: 'Modern e-commerce solution with seamless animations and micro-interactions.',
    tags: ['Next.js', 'TypeScript', 'Stripe', 'Tailwind'],
    color: '#ff00ff',
    image: '🛒',
  },
  {
    id: 3,
    title: 'Creative Agency Website',
    description: 'Award-winning agency website with scroll-based animations and parallax effects.',
    tags: ['GSAP', 'React', 'Framer Motion', 'Figma'],
    color: '#a855f7',
    image: '🎨',
  },
  {
    id: 4,
    title: 'AI Dashboard',
    description: 'Intelligent dashboard with data visualization and real-time analytics.',
    tags: ['React', 'D3.js', 'TensorFlow.js', 'Node.js'],
    color: '#00d4ff',
    image: '🤖',
  },
];

function ProjectCard({ project, index }: { project: typeof projects[0]; index: number }) {
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 100 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: index * 0.2 }}
      viewport={{ once: true, margin: '-100px' }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative group"
    >
      <motion.div
        className="glass-card overflow-hidden cursor-pointer"
        whileHover={{ y: -10 }}
        style={{
          boxShadow: isHovered ? `0 0 40px ${project.color}40` : 'none',
        }}
      >
        {/* Project Image/Visual */}
        <div
          className="relative h-64 overflow-hidden flex items-center justify-center"
          style={{ background: `linear-gradient(135deg, ${project.color}20, ${project.color}05)` }}
        >
          <motion.div
            animate={{ scale: isHovered ? 1.2 : 1, rotate: isHovered ? 10 : 0 }}
            transition={{ duration: 0.5 }}
            className="text-8xl"
          >
            {project.image}
          </motion.div>
          
          {/* Overlay on hover */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: isHovered ? 1 : 0 }}
            className="absolute inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center gap-4"
          >
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="p-4 rounded-full bg-primary text-primary-foreground"
            >
              <ExternalLink className="w-6 h-6" />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="p-4 rounded-full border border-foreground/20 text-foreground"
            >
              <Github className="w-6 h-6" />
            </motion.button>
          </motion.div>
        </div>

        {/* Project Info */}
        <div className="p-6">
          <h3 className="text-2xl font-heading font-bold mb-3" style={{ color: project.color }}>
            {project.title}
          </h3>
          <p className="text-muted-foreground mb-4">{project.description}</p>
          <div className="flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 text-sm rounded-full border border-foreground/10 text-muted-foreground"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Decorative corner element */}
      <motion.div
        className="absolute -top-2 -right-2 w-8 h-8 rounded-full"
        style={{ background: project.color }}
        animate={{ scale: isHovered ? 1.5 : 1, opacity: isHovered ? 0.8 : 0.4 }}
      />
    </motion.div>
  );
}

export default function ProjectsSection() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const x = useTransform(scrollYProgress, [0, 1], ['100%', '-100%']);

  return (
    <section
      ref={ref}
      id="projects"
      className="relative min-h-screen py-32 overflow-hidden"
    >
      {/* Animated background text */}
      <motion.div
        style={{ x }}
        className="absolute top-20 left-0 text-[200px] font-heading font-bold text-muted/10 whitespace-nowrap pointer-events-none select-none"
      >
        PROJECTS • PROJECTS • PROJECTS •
      </motion.div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <span className="inline-block px-4 py-2 glass-card text-sm text-accent font-medium mb-6">
            Selected Work
          </span>
          <h2 className="text-5xl md:text-7xl font-heading font-bold mb-6">
            My <span className="gradient-text">Projects</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            A showcase of my recent work, featuring innovative web experiences and creative solutions.
          </p>
        </motion.div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>

        {/* View All Button */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <motion.button
            className="px-8 py-4 glass-card font-semibold border border-primary/30 text-foreground inline-flex items-center gap-2"
            whileHover={{ scale: 1.05, borderColor: 'rgba(0, 212, 255, 0.8)' }}
            whileTap={{ scale: 0.95 }}
          >
            View All Projects
            <ExternalLink className="w-5 h-5" />
          </motion.button>
        </motion.div>
      </div>

      {/* Gradient overlays */}
      <div className="absolute top-1/3 right-0 w-72 h-72 bg-secondary/10 rounded-full blur-[100px] -z-10" />
      <div className="absolute bottom-1/3 left-0 w-96 h-96 bg-accent/10 rounded-full blur-[128px] -z-10" />
    </section>
  );
}
