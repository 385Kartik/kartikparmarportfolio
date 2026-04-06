import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import { ArrowLeft, ArrowRight, ExternalLink, Github, ChevronRight, Zap } from 'lucide-react';
import { projectsData } from '../data/projectsData';

// ─── PROGRESS BAR ────────────────────────────────────────────────────────────
function ReadingProgress({ color }: { color: string }) {
  const { scrollYProgress } = useScroll();
  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-[2px] z-50 origin-left"
      style={{ scaleX: scrollYProgress, backgroundColor: color }}
    />
  );
}

// ─── HERO ─────────────────────────────────────────────────────────────────────
function Hero({ project }: { project: (typeof projectsData)[0] }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.08]);

  return (
    <div ref={ref} className="relative h-[90vh] flex flex-col overflow-hidden">
      {/* Parallax image */}
      <motion.div className="absolute inset-0" style={{ y, scale }}>
        <img src={project.images[0]} alt={project.title} className="w-full h-full object-cover" />
        <div className="absolute inset-0" style={{ background: `linear-gradient(to bottom, rgba(3,3,3,0.3) 0%, rgba(3,3,3,0.6) 50%, rgba(3,3,3,1) 100%)` }} />
        {/* Color tint overlay */}
        <div className="absolute inset-0 mix-blend-color" style={{ backgroundColor: project.color, opacity: 0.08 }} />
      </motion.div>

      {/* Hero content */}
      <motion.div style={{ opacity }} className="relative z-10 flex flex-col justify-end h-full px-6 md:px-16 pb-16 max-w-7xl mx-auto w-full">
        <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}>
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-white/40 text-xs font-mono tracking-widest uppercase mb-6">
            <span>Portfolio</span>
            <ChevronRight className="w-3 h-3" />
            <span>Projects</span>
            <ChevronRight className="w-3 h-3" />
            <span style={{ color: project.color }}>{project.title}</span>
          </div>

          {/* Type + Year badge */}
          <div className="flex items-center gap-3 mb-5">
            <span
              className="text-xs font-bold tracking-[0.3em] uppercase px-3 py-1.5 rounded-full border"
              style={{ color: project.color, borderColor: project.color + '50', backgroundColor: project.color + '15' }}
            >
              {project.type}
            </span>
            <span className="text-white/30 text-xs font-mono">{project.year}</span>
            <span className="text-white/20 text-xs">·</span>
            <span className="text-white/30 text-xs font-mono">{project.duration}</span>
          </div>

          {/* Title */}
          <h1 className="text-6xl md:text-[7rem] lg:text-[9rem] font-display leading-[0.85] text-white mb-6">
            {project.title}
          </h1>

          {/* Short desc */}
          <p className="text-lg md:text-xl text-white/60 max-w-2xl leading-relaxed font-light">
            {project.shortDesc}
          </p>
        </motion.div>
      </motion.div>

      {/* Scroll cue */}
      <motion.div
        className="absolute bottom-6 right-8 flex flex-col items-center gap-1 text-white/20 z-10"
        animate={{ y: [0, 6, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <span className="text-[9px] font-mono tracking-widest uppercase rotate-90">scroll</span>
      </motion.div>
    </div>
  );
}

// ─── STAT CARD ─────────────────────────────────────────────────────────────────
function StatCard({ stat, color, index }: { stat: { label: string; value: string }; color: string; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.6 }}
      className="relative rounded-2xl border border-white/8 bg-white/[0.03] p-6 overflow-hidden group hover:border-white/15 transition-colors"
    >
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl"
        style={{ background: `radial-gradient(circle at 50% 0%, ${color}15, transparent 70%)` }}
      />
      <div className="text-3xl md:text-4xl font-display font-bold mb-1" style={{ color }}>{stat.value}</div>
      <div className="text-xs text-white/40 tracking-widest uppercase font-mono">{stat.label}</div>
    </motion.div>
  );
}

// ─── SECTION HEADER ──────────────────────────────────────────────────────────
function SectionLabel({ children, color }: { children: React.ReactNode; color: string }) {
  return (
    <div className="flex items-center gap-3 mb-4">
      <span className="w-6 h-px" style={{ backgroundColor: color }} />
      <span className="text-xs font-bold tracking-[0.35em] uppercase font-mono" style={{ color }}>{children}</span>
    </div>
  );
}

// ─── FEATURE CARD ─────────────────────────────────────────────────────────────
function FeatureCard({ feature, color, index }: { feature: { title: string; description: string }; color: string; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.08, duration: 0.5 }}
      className="group relative rounded-2xl border border-white/8 bg-white/[0.02] p-6 hover:border-white/15 transition-all duration-300 overflow-hidden"
    >
      <div
        className="absolute top-0 left-0 w-full h-[2px] origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500"
        style={{ backgroundColor: color }}
      />
      <div className="flex items-start gap-3 mb-3">
        <div className="w-1.5 h-1.5 rounded-full mt-2 shrink-0" style={{ backgroundColor: color }} />
        <h4 className="text-white font-display text-lg">{feature.title}</h4>
      </div>
      <p className="text-white/45 text-sm leading-relaxed pl-4">{feature.description}</p>
    </motion.div>
  );
}

// ─── IMAGE GALLERY ─────────────────────────────────────────────────────────────
function ImageGallery({ images, title, color }: { images: string[]; title: string; color: string }) {
  const [active, setActive] = useState(0);

  return (
    <div className="space-y-4">
      {/* Main image */}
      <div className="relative rounded-2xl overflow-hidden aspect-video border border-white/10">
        <AnimatePresence mode="wait">
          <motion.img
            key={active}
            src={images[active]}
            alt={`${title} screenshot ${active + 1}`}
            className="w-full h-full object-cover"
            initial={{ opacity: 0, scale: 1.04 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          />
        </AnimatePresence>
        {/* Color frame */}
        <div className="absolute inset-0 border-2 border-transparent pointer-events-none rounded-2xl" style={{ boxShadow: `inset 0 0 0 1px ${color}30` }} />
        {/* Image counter */}
        <div className="absolute top-4 right-4 bg-black/50 backdrop-blur-md rounded-lg px-3 py-1.5 text-xs font-mono text-white/60 border border-white/10">
          {active + 1} / {images.length}
        </div>
      </div>

      {/* Thumbnails */}
      {images.length > 1 && (
        <div className="flex gap-3">
          {images.map((img, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              className={`relative flex-1 aspect-video rounded-xl overflow-hidden border transition-all duration-300 ${i === active ? 'border-white/40 scale-[1.02]' : 'border-white/10 opacity-50 hover:opacity-75'}`}
            >
              <img src={img} alt={`thumb ${i + 1}`} className="w-full h-full object-cover" />
              {i === active && (
                <div className="absolute inset-0 rounded-xl" style={{ boxShadow: `inset 0 0 0 2px ${color}80` }} />
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

// ─── TECH STACK BADGE ────────────────────────────────────────────────────────
function TechBadge({ tech, color, index }: { tech: string; color: string; index: number }) {
  return (
    <motion.span
      initial={{ opacity: 0, scale: 0.85 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.04 }}
      className="px-4 py-2 rounded-full text-xs font-mono tracking-wider uppercase border"
      style={{ color, borderColor: color + '45', backgroundColor: color + '12' }}
    >
      {tech}
    </motion.span>
  );
}

// ─── MAIN PAGE ────────────────────────────────────────────────────────────────
export default function CaseStudyPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const projectIndex = projectsData.findIndex(p => p.id === id);
  const project = projectsData[projectIndex];
  const prevProject = projectsData[projectIndex - 1];
  const nextProject = projectsData[projectIndex + 1];

  // Scroll to top on mount
  useEffect(() => { window.scrollTo(0, 0); }, [id]);

  if (!project) {
    return (
      <div className="min-h-screen bg-[#030303] flex items-center justify-center">
        <div className="text-center">
          <p className="text-white/40 mb-4 font-mono">PROJECT_NOT_FOUND</p>
          <Link to="/#projects" className="text-white underline">Back to Projects</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#030303] text-white">
      <ReadingProgress color={project.color} />

      {/* ── NAV BAR ── */}
      <nav className="fixed top-0 left-0 right-0 z-40 px-6 md:px-16 py-5 flex items-center justify-between">
        <div className="absolute inset-0 bg-[#030303]/80 backdrop-blur-xl border-b border-white/5" />
        <Link
          to="/#projects"
          className="relative flex items-center gap-2 text-white/60 hover:text-white transition-colors text-sm font-mono tracking-wider group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          BACK
        </Link>
        <div className="relative flex items-center gap-2">
          <span className="text-xs font-mono text-white/30 hidden sm:block">{project.id} /</span>
          <span className="text-sm font-display text-white/80">{project.title}</span>
        </div>
        <div className="relative flex gap-3">
          {project.liveUrl && (
            <a href={project.liveUrl} target="_blank" rel="noreferrer"
              className="flex items-center gap-1.5 text-xs font-mono text-white/50 hover:text-white transition-colors px-3 py-1.5 rounded-full border border-white/10 hover:border-white/30">
              <ExternalLink className="w-3 h-3" /> LIVE
            </a>
          )}
          {project.githubUrl && (
            <a href={project.githubUrl} target="_blank" rel="noreferrer"
              className="flex items-center gap-1.5 text-xs font-mono text-white/50 hover:text-white transition-colors px-3 py-1.5 rounded-full border border-white/10 hover:border-white/30">
              <Github className="w-3 h-3" /> CODE
            </a>
          )}
        </div>
      </nav>

      {/* ── HERO ── */}
      <Hero project={project} />

      {/* ── BODY ── */}
      <div className="max-w-6xl mx-auto px-6 md:px-16 py-20 space-y-28">

        {/* STATS ROW */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4"
        >
          {project.stats.map((stat, i) => (
            <StatCard key={stat.label} stat={stat} color={project.color} index={i} />
          ))}
        </motion.div>

        {/* OVERVIEW — role + type + 2-col layout */}
        <div className="grid md:grid-cols-[1fr_2fr] gap-12 items-start">
          <div className="space-y-6">
            <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <SectionLabel color={project.color}>Role</SectionLabel>
              <p className="text-white text-lg font-display">{project.role}</p>
            </motion.div>
            <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}>
              <SectionLabel color={project.color}>Timeline</SectionLabel>
              <p className="text-white/60 text-sm font-mono">{project.duration}</p>
            </motion.div>
            <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: 0.15 }}>
              <SectionLabel color={project.color}>Category</SectionLabel>
              <p className="text-white/60 text-sm font-mono uppercase tracking-wider">{project.category}</p>
            </motion.div>
          </div>

          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <SectionLabel color={project.color}>Overview</SectionLabel>
            <p className="text-white/65 text-lg md:text-xl leading-relaxed">{project.fullDesc}</p>
          </motion.div>
        </div>

        {/* GALLERY */}
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <SectionLabel color={project.color}>Gallery</SectionLabel>
          <ImageGallery images={project.images} title={project.title} color={project.color} />
        </motion.div>

        {/* PROBLEM + SOLUTION — 2 col */}
        <div className="grid md:grid-cols-2 gap-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="rounded-2xl border border-white/8 bg-white/[0.02] p-8"
          >
            <SectionLabel color="#ff6b6b">The Problem</SectionLabel>
            <p className="text-white/65 leading-relaxed">{project.problem}</p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="rounded-2xl border border-white/8 p-8 relative overflow-hidden"
            style={{ background: `linear-gradient(135deg, ${project.color}08, transparent)`, borderColor: project.color + '30' }}
          >
            <div className="absolute top-0 right-0 w-32 h-32 rounded-full blur-3xl pointer-events-none" style={{ backgroundColor: project.color, opacity: 0.12 }} />
            <SectionLabel color={project.color}>The Solution</SectionLabel>
            <p className="text-white/65 leading-relaxed">{project.solution}</p>
          </motion.div>
        </div>

        {/* FEATURES GRID */}
        <div>
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-8">
            <SectionLabel color={project.color}>Key Features</SectionLabel>
            <h2 className="text-4xl md:text-5xl font-display text-white">What Was Built</h2>
          </motion.div>
          <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-4">
            {project.features.map((f, i) => (
              <FeatureCard key={f.title} feature={f} color={project.color} index={i} />
            ))}
          </div>
        </div>

        {/* TECH STACK */}
        <div>
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-6">
            <SectionLabel color={project.color}>Tech Stack</SectionLabel>
            <h2 className="text-4xl font-display text-white">Built With</h2>
          </motion.div>
          <div className="flex flex-wrap gap-3">
            {project.techStack.map((t, i) => (
              <TechBadge key={t} tech={t} color={project.color} index={i} />
            ))}
          </div>
        </div>

        {/* OUTCOME */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative rounded-3xl p-10 md:p-14 overflow-hidden border"
          style={{ borderColor: project.color + '30', background: `linear-gradient(135deg, ${project.color}08 0%, transparent 60%)` }}
        >
          <div className="absolute -right-20 -top-20 w-72 h-72 rounded-full blur-[80px] pointer-events-none" style={{ backgroundColor: project.color, opacity: 0.1 }} />
          <div className="absolute -left-10 -bottom-10 w-48 h-48 rounded-full blur-[60px] pointer-events-none" style={{ backgroundColor: project.color, opacity: 0.06 }} />
          <div className="relative">
            <div className="flex items-center gap-3 mb-6">
              <Zap className="w-5 h-5" style={{ color: project.color }} />
              <span className="text-xs font-bold tracking-[0.35em] uppercase font-mono" style={{ color: project.color }}>Outcome</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-display text-white mb-5 leading-tight">The Result</h2>
            <p className="text-white/65 text-lg md:text-xl leading-relaxed max-w-3xl">{project.outcome}</p>
          </div>
        </motion.div>

        {/* PREV / NEXT NAVIGATION */}
        <div className="border-t border-white/8 pt-12">
          <div className="flex flex-col sm:flex-row justify-between gap-4">
            {prevProject ? (
              <motion.div whileHover={{ x: -4 }} className="flex-1">
                <Link to={`/project/${prevProject.id}`} className="group flex flex-col gap-1">
                  <span className="text-xs font-mono text-white/30 tracking-wider flex items-center gap-2">
                    <ArrowLeft className="w-3 h-3 group-hover:-translate-x-1 transition-transform" /> PREVIOUS
                  </span>
                  <span className="text-2xl font-display text-white/60 group-hover:text-white transition-colors">{prevProject.title}</span>
                  <span className="text-xs text-white/30">{prevProject.category}</span>
                </Link>
              </motion.div>
            ) : <div className="flex-1" />}

            {nextProject ? (
              <motion.div whileHover={{ x: 4 }} className="flex-1 text-right">
                <Link to={`/project/${nextProject.id}`} className="group flex flex-col gap-1 items-end">
                  <span className="text-xs font-mono text-white/30 tracking-wider flex items-center gap-2">
                    NEXT <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                  </span>
                  <span className="text-2xl font-display text-white/60 group-hover:text-white transition-colors">{nextProject.title}</span>
                  <span className="text-xs text-white/30">{nextProject.category}</span>
                </Link>
              </motion.div>
            ) : <div className="flex-1" />}
          </div>
        </div>
      </div>
    </div>
  );
}