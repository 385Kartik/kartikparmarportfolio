import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { ArrowUpRight, ExternalLink, Github } from 'lucide-react';
import MagneticButton from './MagneticButton';

const projects = [
  {
    id: 1,
    title: 'NEXUS PLATFORM',
    category: 'Web Development',
    year: '2024',
    description: 'A revolutionary SaaS platform with real-time collaboration features and AI-powered analytics.',
    tech: ['React', 'Node.js', 'PostgreSQL', 'WebSocket'],
    color: '#3b82f6',
    image: '🌐',
  },
  {
    id: 2,
    title: 'QUANTUM APP',
    category: 'Mobile Experience',
    year: '2024',
    description: 'Cross-platform mobile app with gesture-based navigation and offline-first architecture.',
    tech: ['React Native', 'TypeScript', 'GraphQL'],
    color: '#f97316',
    image: '📱',
  },
  {
    id: 3,
    title: 'NEURAL DASHBOARD',
    category: 'AI Integration',
    year: '2023',
    description: 'Real-time machine learning dashboard for monitoring and visualizing AI model performance.',
    tech: ['Python', 'TensorFlow', 'D3.js', 'FastAPI'],
    color: '#ec4899',
    image: '🧠',
  },
  {
    id: 4,
    title: 'PRISMA DESIGN',
    category: 'Brand Identity',
    year: '2023',
    description: 'Complete brand overhaul with 3D motion graphics and immersive web experience.',
    tech: ['Three.js', 'GSAP', 'Figma', 'Blender'],
    color: '#10b981',
    image: '💎',
  },
  {
    id: 5,
    title: 'VERTEX ENGINE',
    category: '3D Experience',
    year: '2023',
    description: 'WebGL-powered 3D product configurator with real-time rendering and AR preview.',
    tech: ['Three.js', 'React', 'WebXR', 'Blender'],
    color: '#8b5cf6',
    image: '🎮',
  },
];

export default function ProjectsSection() {
  const [hoveredId, setHoveredId] = useState<number | null>(null);
  const [selectedProject, setSelectedProject] = useState<typeof projects[0] | null>(null);

  return (
    <section id="projects" className="relative py-32 bg-background">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-20"
        >
          <span className="text-primary text-sm tracking-[0.3em] mb-4 block">
            SELECTED WORK
          </span>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8">
            <h2 className="text-6xl md:text-8xl font-display leading-none">
              FEATURED
              <br />
              <span className="text-outline italic">PROJECTS</span>
            </h2>
            <p className="text-muted-foreground max-w-md">
              A curated selection of projects that showcase my expertise in creating digital experiences that leave lasting impressions.
            </p>
          </div>
        </motion.div>

        {/* Projects list */}
        <div className="space-y-0">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              onMouseEnter={() => setHoveredId(project.id)}
              onMouseLeave={() => setHoveredId(null)}
              onClick={() => setSelectedProject(project)}
              className="group block border-t border-border py-10 relative overflow-hidden cursor-pointer"
            >
              {/* Background hover effect */}
              <motion.div
                className="absolute inset-0"
                style={{ background: `linear-gradient(90deg, ${project.color}05, transparent)` }}
                initial={{ x: '-100%' }}
                animate={{ x: hoveredId === project.id ? '0%' : '-100%' }}
                transition={{ duration: 0.4 }}
              />

              <div className="flex items-center justify-between relative z-10">
                <div className="flex items-center gap-8">
                  {/* Project number */}
                  <motion.span 
                    className="text-muted-foreground text-sm w-8 font-mono"
                    animate={{ 
                      color: hoveredId === project.id ? project.color : 'hsl(var(--muted-foreground))'
                    }}
                  >
                    0{project.id}
                  </motion.span>
                  
                  {/* Project title */}
                  <div>
                    <motion.h3 
                      className="text-4xl md:text-6xl font-display transition-colors"
                      animate={{
                        color: hoveredId === project.id ? project.color : 'hsl(var(--foreground))',
                        x: hoveredId === project.id ? 20 : 0
                      }}
                      transition={{ duration: 0.3 }}
                    >
                      {project.title}
                    </motion.h3>
                    
                    {/* Tech stack on hover */}
                    <motion.div
                      className="flex gap-2 mt-2"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ 
                        opacity: hoveredId === project.id ? 1 : 0,
                        y: hoveredId === project.id ? 0 : 10
                      }}
                    >
                      {project.tech.slice(0, 3).map((t) => (
                        <span key={t} className="text-xs px-2 py-1 rounded bg-muted text-muted-foreground">
                          {t}
                        </span>
                      ))}
                    </motion.div>
                  </div>
                </div>

                <div className="flex items-center gap-8">
                  {/* Category */}
                  <span className="hidden md:block text-muted-foreground">
                    {project.category}
                  </span>
                  
                  {/* Year */}
                  <span className="text-muted-foreground font-mono">
                    {project.year}
                  </span>
                  
                  {/* Arrow */}
                  <motion.div
                    animate={{ 
                      x: hoveredId === project.id ? 0 : -10,
                      opacity: hoveredId === project.id ? 1 : 0,
                      rotate: hoveredId === project.id ? 0 : -45
                    }}
                    transition={{ duration: 0.3 }}
                    style={{ color: project.color }}
                  >
                    <ArrowUpRight className="w-8 h-8" />
                  </motion.div>
                </div>
              </div>

              {/* Hover image preview */}
              <motion.div
                className="absolute right-40 top-1/2 -translate-y-1/2 text-9xl pointer-events-none"
                initial={{ opacity: 0, scale: 0.5, rotate: -20 }}
                animate={{ 
                  opacity: hoveredId === project.id ? 1 : 0,
                  scale: hoveredId === project.id ? 1 : 0.5,
                  rotate: hoveredId === project.id ? 0 : -20,
                }}
                transition={{ type: 'spring', stiffness: 200 }}
              >
                {project.image}
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* View all button */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <MagneticButton href="#" className="btn-outline inline-flex items-center gap-3">
            VIEW ALL PROJECTS
            <ArrowUpRight className="w-5 h-5" />
          </MagneticButton>
        </motion.div>
      </div>

      {/* Project Modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-background/90 backdrop-blur-lg"
            onClick={() => setSelectedProject(null)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 50 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 50 }}
              className="bg-card border border-border rounded-3xl p-8 max-w-2xl w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="text-8xl mb-6">{selectedProject.image}</div>
              <h3 className="text-4xl font-display mb-2" style={{ color: selectedProject.color }}>
                {selectedProject.title}
              </h3>
              <p className="text-muted-foreground mb-4">{selectedProject.category} • {selectedProject.year}</p>
              <p className="text-foreground/80 mb-6">{selectedProject.description}</p>
              <div className="flex flex-wrap gap-2 mb-8">
                {selectedProject.tech.map((t) => (
                  <span key={t} className="text-sm px-3 py-1 rounded-full bg-muted">{t}</span>
                ))}
              </div>
              <div className="flex gap-4">
                <MagneticButton className="btn-primary inline-flex items-center gap-2">
                  <ExternalLink className="w-4 h-4" /> Live Demo
                </MagneticButton>
                <MagneticButton className="btn-outline inline-flex items-center gap-2">
                  <Github className="w-4 h-4" /> Source Code
                </MagneticButton>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
