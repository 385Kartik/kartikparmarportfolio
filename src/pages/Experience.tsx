import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef, useEffect } from 'react';
import { SEO } from "../components/SEO";
import Navbar from "../components/Navbar";
import FooterSection from "../components/FooterSection";
import SmoothScroll from '../components/SmoothScroll';
import { Briefcase, Calendar, MapPin, TerminalSquare, ArrowRight, Code2 } from 'lucide-react';

const experiences = [
  {
    id: 1,
    role: "Full Stack Developer",
    company: "Numberwale",
    status: "Present",
    location: "Remote",
    timeline: "2023 - Present",
    icon: TerminalSquare,
    color: "#3b82f6", // blue-500
    points: [
      "Building AI automation systems and agentic workflows to streamline business operations.",
      "Developing full-stack web applications using modern technologies including React, Node.js, and specialized AI frameworks.",
      "Designing robust architectures for scalable business tools and internal platforms."
    ],
    tech: ["React", "Node.js", "AI Frameworks", "TypeScript"]
  },
  {
    id: 2,
    role: "Web Development Intern",
    company: "Get Analyticx",
    status: "Past",
    location: "Internship",
    timeline: "2022 - 2023",
    icon: Code2,
    color: "#14b8a6", // teal-500
    points: [
      "Developed the College Predictor tool to assist students in finding appropriate educational institutions.",
      "Contributed to Hackathonix (VibeTix), building features for event management and ticketing.",
      "Collaborated with team members to implement responsive designs and optimize application performance."
    ],
    tech: ["HTML/CSS", "JavaScript", "React", "Tailwind"]
  }
];

export default function Experience() {
  useEffect(() => { window.scrollTo(0, 0); }, []);
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ['start end', 'end start'] });
  
  return (
    <SmoothScroll>
      <div className="min-h-screen bg-[#020202] text-white selection:bg-blue-500/30">
        <SEO 
          title="Experience | Kartik Parmar"
          description="Professional experience and background of Kartik Parmar, including Full Stack Developer role at Numberwale and internship at Get Analyticx."
        />
        
        {/* Progress bar */}
        <motion.div 
          className="fixed top-0 left-0 right-0 h-[2px] z-50 origin-left bg-gradient-to-r from-blue-500 to-teal-500" 
          style={{ scaleX: useScroll().scrollYProgress }} 
        />
        
        <Navbar />
        
        {/* HERO SECTION */}
        <div className="relative pt-40 pb-20 px-6 overflow-hidden">
          <div className="absolute inset-0 pointer-events-none">
             <div className="absolute top-0 right-1/4 w-[40vw] h-[40vw] rounded-full blur-[150px] opacity-20 bg-blue-600/30" />
             <div className="absolute top-1/4 -left-10 w-[30vw] h-[30vw] rounded-full blur-[120px] opacity-10 bg-teal-500/20" />
             <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
          </div>
          
          <div className="max-w-5xl mx-auto relative z-10">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex items-center gap-3 mb-6">
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 w-fit">
                <Briefcase className="w-3.5 h-3.5 text-blue-400" />
                <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-blue-400">Career Log</span>
              </div>
            </motion.div>
            
            <motion.h1 
              initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1, duration: 0.8 }}
              className="text-5xl md:text-7xl lg:text-8xl font-display leading-[0.9] text-white tracking-tight mb-8"
            >
              PROFESSIONAL
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-teal-500">EXPERIENCE</span>
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
              className="text-zinc-400 text-lg md:text-xl max-w-2xl font-light leading-relaxed border-l-2 border-blue-500/20 pl-6"
            >
              A timeline of my journey building scalable AI systems, modern web architectures, and seamless digital experiences.
            </motion.p>
          </div>
        </div>

        {/* TIMELINE SECTION */}
        <div className="max-w-5xl mx-auto px-6 py-20 relative z-20" ref={containerRef}>
          {/* Vertical connecting line */}
          <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-blue-500/50 via-teal-500/20 to-transparent hidden md:block" />
          
          <div className="space-y-24 md:space-y-32 relative">
            {experiences.map((exp, i) => {
              const isEven = i % 2 === 0;
              return (
                <motion.div 
                  key={exp.id}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.7 }}
                  className={`relative flex flex-col md:flex-row gap-8 md:gap-0 ${isEven ? 'md:flex-row-reverse' : ''}`}
                >
                  {/* Timeline Center Node (Desktop) */}
                  <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 top-0 items-center justify-center w-12 h-12 rounded-full border-4 border-[#020202] bg-[#020202] z-10">
                    <div className="w-full h-full rounded-full flex items-center justify-center" style={{ backgroundColor: `${exp.color}15`, border: `1px solid ${exp.color}40` }}>
                      <exp.icon className="w-5 h-5" style={{ color: exp.color }} />
                    </div>
                  </div>
                  
                  {/* Content Container */}
                  <div className={`md:w-1/2 ${isEven ? 'md:pl-16' : 'md:pr-16'}`}>
                    <div className="relative group rounded-3xl p-8 border border-white/[0.05] bg-white/[0.01] hover:bg-white/[0.02] transition-colors duration-500 overflow-hidden">
                      {/* Hover Gradient */}
                      <div className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-700 pointer-events-none" 
                           style={{ background: `radial-gradient(circle at ${isEven ? '100% 0%' : '0% 0%'}, ${exp.color}, transparent 70%)` }} />
                      
                      {/* Header */}
                      <div className="flex flex-wrap gap-4 items-center justify-between mb-6">
                        <div className="flex items-center gap-3">
                           {/* Mobile Icon */}
                           <div className="md:hidden w-10 h-10 rounded-full flex items-center justify-center" style={{ backgroundColor: `${exp.color}15`, border: `1px solid ${exp.color}40` }}>
                             <exp.icon className="w-4 h-4" style={{ color: exp.color }} />
                           </div>
                           <div>
                              <h3 className="text-2xl font-display font-bold text-white mb-1 group-hover:text-blue-400 transition-colors">{exp.role}</h3>
                              <h4 className="text-lg font-mono tracking-wide" style={{ color: exp.color }}>{exp.company}</h4>
                           </div>
                        </div>
                        <div className="flex flex-col items-end gap-2 text-xs font-mono tracking-widest text-zinc-500 uppercase">
                          <div className="flex items-center gap-2 bg-white/5 px-3 py-1.5 rounded-full border border-white/10">
                            <Calendar className="w-3.5 h-3.5" /> {exp.timeline}
                          </div>
                          <div className="flex items-center gap-2">
                            <MapPin className="w-3.5 h-3.5" /> {exp.location} ({exp.status})
                          </div>
                        </div>
                      </div>
                      
                      {/* Points */}
                      <ul className="space-y-4 mb-8">
                        {exp.points.map((point, idx) => (
                          <motion.li 
                            key={idx}
                            initial={{ opacity: 0, x: -10 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2 + (idx * 0.1) }}
                            className="flex items-start gap-3 text-zinc-400 group-hover:text-zinc-300 transition-colors"
                          >
                            <ArrowRight className="w-4 h-4 mt-1 shrink-0" style={{ color: exp.color }} />
                            <span className="leading-relaxed">{point}</span>
                          </motion.li>
                        ))}
                      </ul>
                      
                      {/* Tech Stack */}
                      <div className="flex flex-wrap gap-2 pt-6 border-t border-white/[0.05]">
                        {exp.tech.map((tech) => (
                          <span key={tech} className="px-3 py-1 rounded-full text-[10px] font-mono tracking-widest uppercase border border-white/10 bg-white/[0.03] text-zinc-400 group-hover:border-blue-500/30 group-hover:text-blue-300 transition-colors">
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
        
        <FooterSection />
      </div>
    </SmoothScroll>
  );
}
