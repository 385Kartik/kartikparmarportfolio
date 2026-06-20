import { motion, useScroll, useTransform, useMotionTemplate, useMotionValue } from 'framer-motion';
import { useRef, MouseEvent } from 'react';
import { ArrowRight, Code, ScanFace, Activity, Zap, Rocket, Trophy, Server, Briefcase, GraduationCap } from 'lucide-react';
import MagneticButton from './MagneticButton';
import InteractiveText from './InteractiveText';

const stats = [
  { label: 'VENTURES FOUNDED', value: '3', icon: Rocket },
  { label: 'HACKATHON WINS', value: '2×', icon: Trophy },
  { label: 'RECORDS HANDLED', value: '2.4M+', icon: Server },
  { label: 'EXPERIENCE', value: '1+ YR', icon: Briefcase },
];

const skills = {
  frontend: ['React.js', 'TypeScript', 'JavaScript (ES6+)', 'HTML5', 'CSS3', 'Tailwind CSS', 'Bootstrap'],
  backend: ['Node.js', 'Express.js', 'Django', 'Django REST Framework'],
  databases: ['PostgreSQL (Supabase)', 'MongoDB', 'MySQL'],
  cloud: ['AWS (S3, EC2)', 'Vercel', 'Netlify', 'Firebase', 'Git', 'GitHub'],
  integrations: ['Razorpay', 'OTP Auth', 'Nodemailer', 'Amazon S3', 'Recharts'],
};

const processSteps = [
  { 
    number: '01', 
    title: 'DISCOVERY', 
    description: 'Deep dive into your vision — understanding requirements, business logic, and architectural needs before writing a single line.',
    icon: ScanFace
  },
  { 
    number: '02', 
    title: 'DESIGN', 
    description: 'Crafting user-centric interfaces with modern aesthetics. Every pixel intentional, every interaction smooth.',
    icon: Zap
  },
  { 
    number: '03', 
    title: 'DEVELOP', 
    description: 'Clean, scalable code with production-grade architecture — atomic transactions, RLS, performance optimization, the works.',
    icon: Code
  },
  { 
    number: '04', 
    title: 'DEPLOY', 
    description: 'From staging to production with CI/CD, security headers, monitoring, and zero-downtime deployment.',
    icon: Activity
  },
];

// --- PROFILE PHOTO CARD ---
function ProfileCard() {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useTransform(y, [-100, 100], [8, -8]);
  const rotateY = useTransform(x, [-100, 100], [-8, 8]);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove(event: MouseEvent<HTMLDivElement>) {
    const rect = event.currentTarget.getBoundingClientRect();
    x.set((event.clientX - rect.left - rect.width / 2));
    y.set((event.clientY - rect.top - rect.height / 2));
    mouseX.set(event.clientX - rect.left);
    mouseY.set(event.clientY - rect.top);
  }

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      onMouseLeave={() => { x.set(0); y.set(0); }}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      className="relative w-full rounded-3xl bg-[#050505] border border-white/10 overflow-hidden group shadow-2xl"
    >
      {/* Photo */}
      <div className="relative aspect-[3/4] overflow-hidden rounded-3xl">
        <img 
          src="/Kartik.jpeg" 
          alt="Kartik Parmar Full Stack Developer" 
          className="w-full h-full object-cover object-top grayscale-[30%] group-hover:grayscale-0 transition-all duration-700 scale-105 group-hover:scale-100"
        />
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/30 to-transparent" />
        
        {/* Spotlight effect */}
        <motion.div 
          className="pointer-events-none absolute -inset-px opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10 mix-blend-soft-light rounded-3xl"
          style={{
            background: useMotionTemplate`
              radial-gradient(
                400px circle at ${mouseX}px ${mouseY}px,
                rgba(255, 255, 255, 0.25),
                transparent 80%
              )
            `,
          }}
        />

        {/* Scanner beam */}
        <motion.div 
          className="absolute w-full h-[1px] blur-[2px] z-20 opacity-0 group-hover:opacity-60 transition-opacity bg-blue-500"
          animate={{ top: ['0%', '100%'] }}
          transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
        />
      </div>

      {/* Info overlay at bottom */}
      <div className="absolute bottom-0 left-0 right-0 p-6 z-20" style={{ transform: "translateZ(30px)" }}>
        <div className="flex items-center gap-2 mb-2">
          <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
          <span className="text-[10px] font-mono text-green-400 tracking-[0.2em]">AVAILABLE FOR WORK</span>
        </div>
        <h1 className="text-3xl font-display text-white mb-1">KARTIK PARMAR</h1>
        <p className="text-xs font-bold tracking-[0.15em] uppercase text-blue-400">Full-Stack Developer • Entrepreneur</p>
      </div>

      {/* Corner accents */}
      <div className="absolute top-4 right-4 z-20">
        <div className="text-[10px] tracking-[0.2em] text-zinc-600 uppercase font-mono">UNIT_ID</div>
        <div className="font-mono text-xs font-bold text-blue-500">CORE_001</div>
      </div>
    </motion.div>
  );
}

// --- SKILL SECTION ---
function SkillCategory({ title, items, color }: { title: string; items: string[]; color: string }) {
  return (
    <div className="space-y-3">
      <h4 className="text-xs font-bold tracking-[0.2em] uppercase" style={{ color }}>{title}</h4>
      <div className="flex flex-wrap gap-2">
        {items.map((skill) => (
          <span 
            key={skill} 
            className="px-3 py-1.5 rounded-full text-[10px] font-mono tracking-wider bg-white/5 border border-white/10 text-zinc-400 hover:border-white/30 hover:text-white transition-all duration-300"
          >
            {skill}
          </span>
        ))}
      </div>
    </div>
  );
}

export default function AboutSection() {
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  const lineHeight = useTransform(scrollYProgress, [0.2, 0.8], ['0%', '100%']);
  
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
      id="about" 
      className="relative py-32 bg-[#020202] overflow-hidden min-h-screen"
      onMouseMove={handleMouseMove}
    >
      {/* --- BACKGROUND --- */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#020202_80%)]" />
        <motion.div 
          className="absolute inset-0 opacity-10"
          style={{ 
            background: useMotionTemplate`
              radial-gradient(
                600px circle at ${mouseX}px ${mouseY}px,
                #3b82f6,
                transparent 80%
              )
            `,
          }}
        />
        <div 
          className="absolute inset-0 opacity-[0.03]"
          style={{ 
            backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)',
            backgroundSize: '40px 40px'
          }} 
        />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          
          {/* LEFT: Sticky Profile Card + Stats */}
          <div className="lg:block h-full">
             <div className="relative top-12" style={{ perspective: '1000px' }}>
                <motion.div
                  initial={{ opacity: 0, x: -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8 }}
                >
                   <ProfileCard />

                   {/* Quick Stats Grid */}
                   <div className="grid grid-cols-2 gap-3 mt-4">
                     {stats.map((stat, i) => (
                       <motion.div 
                         key={stat.label}
                         initial={{ opacity: 0, y: 20 }}
                         whileInView={{ opacity: 1, y: 0 }}
                         viewport={{ once: true }}
                         transition={{ delay: 0.3 + i * 0.1 }}
                         className="p-4 rounded-2xl bg-[#0a0a0a] border border-white/10 group hover:border-blue-500/30 transition-all duration-300"
                       >
                         <stat.icon className="w-4 h-4 text-blue-500 mb-2 group-hover:scale-110 transition-transform" />
                         <div className="text-2xl font-display font-bold text-white">{stat.value}</div>
                         <div className="text-[9px] tracking-[0.15em] text-zinc-600 uppercase">{stat.label}</div>
                       </motion.div>
                     ))}
                   </div>
                </motion.div>
             </div>
          </div>

          {/* RIGHT: Bio, Skills, Process */}
          <div className="relative pt-8">
            {/* Title */}
            <motion.div 
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-12"
            >
              <h2 className="text-6xl md:text-8xl font-display leading-[0.85] mb-8 text-white">
                ABOUT
                <br />
                <InteractiveText text="ME" className="text-blue-500" />
              </h2>
            </motion.div>

            {/* Bio */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-16 space-y-6"
            >
              <p className="text-lg text-zinc-300 leading-relaxed border-l-2 border-blue-500/30 pl-6">
                Full-stack web developer and entrepreneur with <span className="text-white font-semibold">1+ year of production experience</span>, 
                <span className="text-blue-400 font-semibold"> 3 ventures founded</span>, and 
                <span className="text-purple-400 font-semibold"> 2× hackathon wins</span>.
              </p>
              <p className="text-zinc-400 leading-relaxed pl-6">
                Built platforms handling <span className="text-white">2.4M+ records</span>, reduced print queues by 50%, and earned official 
                institutional adoption. Proficient in React.js, TypeScript, Node.js, Django, Supabase, AWS, and Razorpay — 
                with a consistent track record of shipping real-world systems used by real users.
              </p>
            </motion.div>
          </div>
        </div>

        {/* Full-width sections below the 2-column grid */}
        <div className="max-w-4xl mx-auto mt-24 space-y-16">
            {/* Experience Highlights */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-16 p-6 rounded-2xl bg-white/[0.02] border border-white/10"
            >
              <h3 className="text-xs font-bold tracking-[0.3em] uppercase text-blue-500 mb-6 flex items-center gap-2">
                <Briefcase className="w-4 h-4" /> Career_Highlights
              </h3>
              <div className="space-y-5">
                <div className="flex gap-4">
                  <div className="w-px bg-gradient-to-b from-indigo-500 to-transparent flex-shrink-0" />
                  <div>
                    <div className="flex items-center gap-3 mb-1">
                      <h4 className="text-white font-display text-lg">Full Stack Developer — Numberwale</h4>
                      <span className="text-[10px] font-mono text-zinc-600">Present</span>
                    </div>
                    <p className="text-zinc-400 text-sm">Building AI automation systems and agentic workflows to streamline business operations.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-px bg-gradient-to-b from-blue-500 to-transparent flex-shrink-0" />
                  <div>
                    <div className="flex items-center gap-3 mb-1">
                      <h4 className="text-white font-display text-lg">Web Dev Intern — Get Analyticx</h4>
                      <span className="text-[10px] font-mono text-zinc-600">2025 – Present</span>
                    </div>
                    <p className="text-zinc-400 text-sm">Built Task-Based Learning Platform & College Predictor Tool used by 50%+ Mira Road students.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-px bg-gradient-to-b from-pink-500 to-transparent flex-shrink-0" />
                  <div>
                    <div className="flex items-center gap-3 mb-1">
                      <h4 className="text-white font-display text-lg">Freelance Dev — Waves & Wires</h4>
                      <span className="text-[10px] font-mono text-zinc-600">2026</span>
                    </div>
                    <p className="text-zinc-400 text-sm">Architected complete e-commerce platform with Razorpay, atomic RPC, admin dashboard.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-px bg-gradient-to-b from-orange-500 to-transparent flex-shrink-0" />
                  <div>
                    <div className="flex items-center gap-3 mb-1">
                      <h4 className="text-white font-display text-lg">Founder — KARTIK, Print-It, NavRang</h4>
                      <span className="text-[10px] font-mono text-zinc-600">2025 – Present</span>
                    </div>
                    <p className="text-zinc-400 text-sm">Founded 3 ventures. Print-It officially adopted by Universal College of Engineering.</p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Skills Grid */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-16 space-y-6"
            >
              <h3 className="text-xs font-bold tracking-[0.3em] uppercase text-zinc-500 mb-4">Technical_Stack</h3>
              <SkillCategory title="Frontend" items={skills.frontend} color="#3b82f6" />
              <SkillCategory title="Backend" items={skills.backend} color="#f97316" />
              <SkillCategory title="Databases" items={skills.databases} color="#10b981" />
              <SkillCategory title="Cloud & DevOps" items={skills.cloud} color="#8b5cf6" />
              <SkillCategory title="Integrations" items={skills.integrations} color="#ec4899" />
            </motion.div>

            {/* Education */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-16 p-6 rounded-2xl bg-white/[0.02] border border-white/10"
            >
              <h3 className="text-xs font-bold tracking-[0.3em] uppercase text-blue-500 mb-6 flex items-center gap-2">
                <GraduationCap className="w-4 h-4" /> Education
              </h3>
              <div className="space-y-4">
                <div>
                  <h4 className="text-white font-display text-lg">B.E. Computer Engineering</h4>
                  <p className="text-zinc-500 text-sm">Universal College of Engineering, Mumbai — Expected 2027</p>
                </div>
                <div className="flex gap-6 text-sm">
                  <div>
                    <span className="text-zinc-600 text-xs uppercase tracking-wider">MHT-CET</span>
                    <p className="text-white font-display text-lg">84.44%ile</p>
                  </div>
                  <div>
                    <span className="text-zinc-600 text-xs uppercase tracking-wider">SSC</span>
                    <p className="text-white font-display text-lg">71.4%</p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* MY APPROACH — Process Steps */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-8"
            >
              <h3 className="text-xs font-bold tracking-[0.3em] uppercase text-zinc-500 mb-8">My_Approach</h3>
            </motion.div>

            {/* Neural Pathway Container */}
            <div className="relative border-l border-white/10 pl-12 md:pl-16 space-y-24">
              
              <motion.div 
                className="absolute left-0 top-0 w-[2px] bg-gradient-to-b from-blue-500 via-purple-500 to-blue-500 shadow-[0_0_15px_#3b82f6]"
                style={{ height: lineHeight }}
              />

              {processSteps.map((step, index) => (
                <motion.div
                  key={step.number}
                  initial={{ opacity: 0, x: 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="relative group"
                >
                  <div className="absolute -left-[55px] md:-left-[71px] top-0 w-3 h-3 md:w-4 md:h-4 rounded-full bg-[#030303] border-2 border-white/20 group-hover:border-blue-500 group-hover:scale-125 transition-all duration-300 z-10">
                    <div className="absolute inset-0 rounded-full bg-blue-500 opacity-0 group-hover:opacity-100 group-hover:animate-ping" />
                  </div>

                  <div className="flex flex-col gap-4">
                    <div className="flex items-center gap-4">
                      <span className="text-5xl font-display text-white/5 font-bold group-hover:text-white/20 transition-colors">
                        {step.number}
                      </span>
                      <div className="h-px w-12 bg-white/10 group-hover:w-24 group-hover:bg-blue-500/50 transition-all duration-500" />
                      <step.icon className="w-6 h-6 text-blue-500 opacity-50 group-hover:opacity-100 transition-opacity" />
                    </div>
                    
                    <div>
                      <h3 className="text-3xl font-display text-white mb-2 group-hover:text-blue-500 transition-colors">
                        {step.title}
                      </h3>
                      <p className="text-zinc-400 leading-relaxed max-w-md group-hover:text-white/70 transition-colors">
                        {step.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.div 
              className="mt-24 flex justify-center"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
            >
              <MagneticButton href="#contact" className="group relative px-8 py-4 rounded-full bg-white/5 border border-white/10 text-white hover:bg-white/10 hover:border-white/30 transition-all">
                <span className="flex items-center gap-3 tracking-widest text-sm font-bold">
                  LET'S BUILD TOGETHER
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </span>
              </MagneticButton>
            </motion.div>
        </div>
      </div>
    </section>
  );
}