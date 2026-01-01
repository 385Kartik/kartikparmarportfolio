import { motion } from 'framer-motion';
import { useState } from 'react';
import { ArrowUpRight } from 'lucide-react';

const projects = [
  {
    id: 1,
    title: 'NEXUS PLATFORM',
    category: 'Web Development',
    year: '2024',
    image: '🌐',
  },
  {
    id: 2,
    title: 'QUANTUM APP',
    category: 'Mobile Experience',
    year: '2024',
    image: '📱',
  },
  {
    id: 3,
    title: 'NEURAL DASHBOARD',
    category: 'AI Integration',
    year: '2023',
    image: '🧠',
  },
  {
    id: 4,
    title: 'PRISMA DESIGN',
    category: 'Brand Identity',
    year: '2023',
    image: '💎',
  },
];

export default function ProjectsSection() {
  const [hoveredId, setHoveredId] = useState<number | null>(null);

  return (
    <section id="projects" className="relative py-32">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <span className="text-primary text-sm tracking-[0.3em] mb-4 block">
            SELECTED WORK
          </span>
          <h2 className="text-6xl md:text-8xl font-display leading-none">
            FEATURED
            <br />
            <span className="text-outline italic">PROJECTS</span>
          </h2>
        </motion.div>

        {/* Projects list */}
        <div className="space-y-0">
          {projects.map((project, index) => (
            <motion.a
              key={project.id}
              href="#"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              onMouseEnter={() => setHoveredId(project.id)}
              onMouseLeave={() => setHoveredId(null)}
              className="group block border-t border-border py-8 relative overflow-hidden"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-8">
                  {/* Project number */}
                  <span className="text-muted-foreground text-sm w-8">
                    0{project.id}
                  </span>
                  
                  {/* Project title */}
                  <h3 className="text-4xl md:text-6xl font-display group-hover:text-primary transition-colors">
                    {project.title}
                  </h3>
                </div>

                <div className="flex items-center gap-8">
                  {/* Category */}
                  <span className="hidden md:block text-muted-foreground">
                    {project.category}
                  </span>
                  
                  {/* Year */}
                  <span className="text-muted-foreground">
                    {project.year}
                  </span>
                  
                  {/* Arrow */}
                  <motion.div
                    animate={{ 
                      x: hoveredId === project.id ? 0 : -10,
                      opacity: hoveredId === project.id ? 1 : 0 
                    }}
                  >
                    <ArrowUpRight className="w-6 h-6" />
                  </motion.div>
                </div>
              </div>

              {/* Hover image preview */}
              <motion.div
                className="absolute right-32 top-1/2 -translate-y-1/2 text-8xl pointer-events-none"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ 
                  opacity: hoveredId === project.id ? 1 : 0,
                  scale: hoveredId === project.id ? 1 : 0.8,
                }}
              >
                {project.image}
              </motion.div>
            </motion.a>
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
          <a 
            href="#" 
            className="btn-outline inline-flex items-center gap-3"
          >
            VIEW ALL PROJECTS
            <ArrowUpRight className="w-5 h-5" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
