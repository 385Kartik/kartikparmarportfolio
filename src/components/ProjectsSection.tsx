import { motion, useScroll, useTransform, useMotionTemplate, useMotionValue, AnimatePresence } from 'framer-motion';
import { useRef, useState, MouseEvent } from 'react';
import { ArrowRight, Layers, Cpu } from 'lucide-react';
import { Link } from 'react-router-dom';
import MagneticButton from './MagneticButton';
import InteractiveText from './InteractiveText';
import { projectsData } from '../data/projectsData';

// --- LEFT PANEL: 3D PREVIEW CARD ---
function PreviewCard({
  activeProject,
  mouseX,
  mouseY,
}: {
  activeProject: (typeof projectsData)[0];
  mouseX: ReturnType<typeof useMotionValue<number>>;
  mouseY: ReturnType<typeof useMotionValue<number>>;
}) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useTransform(y, [-100, 100], [10, -10]);
  const rotateY = useTransform(x, [-100, 100], [-10, 10]);

  function handleMouseMove(e: MouseEvent<HTMLDivElement>) {
    const rect = e.currentTarget.getBoundingClientRect();
    x.set((e.clientX - rect.left - rect.width / 2));
    y.set((e.clientY - rect.top - rect.height / 2));
  }

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      onMouseLeave={() => { x.set(0); y.set(0); }}
      style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
      className="relative w-full min-h-[480px] max-h-[80vh] rounded-3xl bg-[#0a0a0a] border border-white/10 overflow-hidden group"
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={activeProject.id}
          initial={{ opacity: 0, scale: 1.08 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="absolute inset-0"
        >
          <img
            src={activeProject.image}
            alt={activeProject.title}
            className="w-full h-full object-cover opacity-50 group-hover:grayscale-0 transition-all duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/50 to-transparent" />
        </motion.div>
      </AnimatePresence>

      {/* Radial mouse-follow glow */}
      <motion.div
        className="pointer-events-none absolute -inset-px opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20"
        style={{
          background: useMotionTemplate`radial-gradient(600px circle at ${mouseX}px ${mouseY}px, ${activeProject.color}15, transparent 80%)`,
        }}
      />

      {/* Floating content */}
      <div className="absolute inset-0 p-8 flex flex-col justify-between z-30 pointer-events-none" style={{ transform: 'translateZ(20px)' }}>
        <div className="flex justify-between items-start">
          <div className="p-2 bg-white/5 backdrop-blur-md rounded-lg border border-white/10">
            <Layers className="w-6 h-6" style={{ color: activeProject.color }} />
          </div>
          <div className="flex flex-col items-end gap-1">
            <span className="font-mono text-xs bg-white/5 px-2 py-1 rounded" style={{ color: activeProject.color }}>
              {activeProject.type.toUpperCase()}
            </span>
            <span className="font-mono text-[10px] text-white/30">{activeProject.year}</span>
          </div>
        </div>

        {/* Stats row */}
        <motion.div
          key={activeProject.id}
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.15 }}
          className="grid grid-cols-2 gap-2"
        >
          {activeProject.stats.slice(0, 2).map(stat => (
            <div key={stat.label} className="bg-black/40 backdrop-blur-md rounded-2xl px-3 py-2 border border-white/5">
              <div className="font-display text-lg font-bold" style={{ color: activeProject.color }}>{stat.value}</div>
              <div className="text-[10px] text-white/40 tracking-wider uppercase">{stat.label}</div>
            </div>
          ))}
        </motion.div>

        <div>
          <motion.div
            key={activeProject.id + '-title'}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.1 }}
          >
            <h3 className="text-4xl font-display text-white mb-2">{activeProject.title}</h3>
            <div className="flex items-center gap-2 text-xs font-bold tracking-widest text-zinc-400 uppercase">
              <Cpu className="w-4 h-4 shrink-0" />
              <span className="truncate">{activeProject.tech}</span>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}

export default function ProjectsSection() {
  const containerRef = useRef<HTMLElement>(null);
  const [activeProject, setActiveProject] = useState(projectsData[0]);

  const { scrollYProgress } = useScroll({ target: containerRef, offset: ['start end', 'end start'] });
  const lineHeight = useTransform(scrollYProgress, [0.1, 0.9], ['0%', '100%']);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove({ currentTarget, clientX, clientY }: MouseEvent) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  return (
    <section
      ref={containerRef}
      id="projects"
      className="relative py-32 bg-[#030303] overflow-x-clip min-h-screen"
      onMouseMove={handleMouseMove}
    >
      {/* Reactive Background */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          className="absolute -top-[20%] -left-[10%] w-[70vw] h-[70vw] rounded-full blur-[120px] opacity-20"
          animate={{ backgroundColor: activeProject.color }}
          transition={{ duration: 1 }}
        />
        <motion.div
          className="absolute -bottom-[20%] -right-[10%] w-[60vw] h-[60vw] rounded-full blur-[120px] opacity-15"
          animate={{ backgroundColor: activeProject.color }}
          transition={{ duration: 1.5 }}
        />
        <motion.div
          className="absolute top-1/4 left-1/4 w-32 h-32 rounded-full blur-xl opacity-40"
          animate={{ backgroundColor: activeProject.color, y: [0, -30, 0], x: [0, 20, 0], scale: [1, 1.2, 1] }}
          transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
        />
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'url("https://grainy-gradients.vercel.app/noise.svg")' }} />
        <div
          className="absolute inset-0 opacity-[0.05]"
          style={{
            backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
            backgroundSize: '50px 50px',
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-[1.2fr,0.8fr] gap-16">

          {/* LEFT: Sticky Preview */}
          <div className="hidden lg:block">
            <div className="sticky top-32">
              <motion.div initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}>
                <span className="text-xs font-bold tracking-[0.4em] uppercase mb-8 block ml-1 transition-colors duration-500" style={{ color: activeProject.color }}>
                  Archive Viewer
                </span>
                <PreviewCard activeProject={activeProject} mouseX={mouseX} mouseY={mouseY} />
              </motion.div>
            </div>
          </div>

          {/* RIGHT: Timeline */}
          <div className="relative pt-8">
            <motion.div initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-16">
              <h2 className="text-6xl md:text-8xl font-display leading-[0.85] mb-8 text-white">
                SELECTED
                <br />
                <InteractiveText
                  text="WORKS"
                  className="transition-colors duration-500"
                  style={{ color: activeProject.color }}
                />
              </h2>
            </motion.div>

            <div className="relative border-l border-white/10 pl-12 md:pl-16 space-y-24">
              {/* Animated scroll line */}
              <motion.div
                className="absolute left-0 top-0 w-[2px] shadow-[0_0_15px_currentColor]"
                style={{ height: lineHeight, backgroundColor: activeProject.color, color: activeProject.color }}
              />

              {projectsData.map((project, index) => {
                const isActive = activeProject.id === project.id;
                return (
                  <motion.div
                    key={project.id}
                    id={`project-${project.id}`}
                    initial={{ opacity: 0, x: 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: '-100px' }}
                    transition={{ duration: 0.6, delay: index * 0.08 }}
                    className="relative group"
                    onMouseEnter={() => setActiveProject(project)}
                  >
                    {/* Timeline dot */}
                    <div
                      className="absolute -left-[55px] md:-left-[71px] top-0 w-3 h-3 md:w-4 md:h-4 rounded-full bg-[#030303] border-2 transition-all duration-300 z-10 group-hover:scale-125"
                      style={{ borderColor: isActive ? project.color : 'rgba(255,255,255,0.2)' }}
                    >
                      <div
                        className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 group-hover:animate-ping"
                        style={{ backgroundColor: project.color }}
                      />
                    </div>

                    <div className="flex flex-col gap-4">
                      <div className="flex items-center gap-4">
                        <span className="text-5xl font-display text-white/5 font-bold group-hover:text-white/20 transition-colors">
                          {project.id}
                        </span>
                        <div className="flex flex-col">
                          <span
                            className="text-xs font-bold tracking-[0.2em] uppercase transition-colors duration-300"
                            style={{ color: isActive ? project.color : 'rgb(113,113,122)' }}
                          >
                            {project.category}
                          </span>
                          <span className="text-[10px] text-white/20 font-mono">{project.year}</span>
                        </div>
                      </div>

                      <div>
                        <h3
                          className="text-3xl md:text-4xl font-display mb-3 transition-colors duration-300"
                          style={{ color: isActive ? project.color : 'white' }}
                        >
                          {project.title}
                        </h3>
                        <p className="text-zinc-400 leading-relaxed max-w-md mb-4 group-hover:text-white/70 transition-colors text-sm md:text-base">
                          {project.shortDesc}
                        </p>

                        {/* Mobile image */}
                        <div className="lg:hidden w-full h-80 rounded-2xl overflow-hidden mb-4 border border-white/10">
                          <img src={project.image} alt={project.title} className="w-full h-full object-cover object-center" />
                        </div>

                        {/* Mini stat pills */}
                        <div className="flex flex-wrap gap-2 mb-5">
                          {project.stats.map(stat => (
                            <span
                              key={stat.label}
                              className="text-[10px] font-mono px-2 py-1 rounded-full border"
                              style={{
                                color: project.color,
                                borderColor: project.color + '40',
                                backgroundColor: project.color + '10',
                              }}
                            >
                              {stat.value} {stat.label}
                            </span>
                          ))}
                        </div>

                        <Link to={`/project/${project.id}`}>
                          <MagneticButton className="px-6 py-3 rounded-full bg-white/5 border border-white/10 text-white hover:bg-white/10 hover:border-white/30 transition-all text-xs font-bold tracking-widest flex items-center gap-2 group/btn">
                            VIEW CASE STUDY
                            <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                          </MagneticButton>
                        </Link>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}