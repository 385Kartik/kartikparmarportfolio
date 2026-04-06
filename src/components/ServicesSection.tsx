import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { Monitor, Server, ShoppingCart, Cloud, Cpu, ArrowUpRight } from 'lucide-react';
import InteractiveText from './InteractiveText';

const services = [
  {
    id: '01',
    icon: Monitor,
    category: 'FRONTEND',
    title: 'UI DEVELOPMENT',
    description:
      'Pixel-perfect, responsive interfaces with React.js & TypeScript. From component systems to full pages — fast, accessible, and visually sharp. Tailwind CSS, animations, dashboards, and everything the user sees.',
    color: '#3b82f6',
    tech: 'REACT.JS / TYPESCRIPT / TAILWIND CSS / VITE',
    skills: ['React.js', 'TypeScript', 'Tailwind CSS', 'HTML5 / CSS3', 'Bootstrap', 'Recharts'],
  },
  {
    id: '02',
    icon: Server,
    category: 'BACKEND',
    title: 'SERVER & APIS',
    description:
      'Robust REST APIs, auth systems, and database architecture. Node.js + Express or Django — with OTP auth, Nodemailer/SMTP, atomic transactions, Row Level Security, and DB triggers for real production workloads.',
    color: '#f97316',
    tech: 'NODE.JS / EXPRESS / DJANGO / POSTGRESQL',
    skills: ['Node.js', 'Express.js', 'Django', 'Django REST Framework', 'PostgreSQL', 'MongoDB', 'MySQL'],
  },
  {
    id: '03',
    icon: ShoppingCart,
    category: 'E-COMMERCE',
    title: 'STORE BUILDER',
    description:
      'Full e-commerce flows — product catalog, cart, checkout, Razorpay (UPI / Card / Net Banking / COD), coupon systems, real-time order tracking, automated refunds, admin dashboards, and low-stock alerts.',
    color: '#ec4899',
    tech: 'RAZORPAY / SUPABASE / NODEMAILER / REACT',
    skills: ['Razorpay Integration', 'OTP Authentication', 'Order Management', 'Inventory System', 'Coupon Logic', 'Email Automation'],
  },
  {
    id: '04',
    icon: Cloud,
    category: 'CLOUD / DEVOPS',
    title: 'DEPLOY & SCALE',
    description:
      'Production deployments on AWS EC2, S3 file storage, Vercel serverless, Firebase, and Netlify. CSP + HSTS security headers, high-availability setups, and scalable architecture for real traffic.',
    color: '#10b981',
    tech: 'AWS S3 / EC2 / VERCEL / FIREBASE / SUPABASE',
    skills: ['AWS S3 & EC2', 'Vercel / Netlify', 'Firebase', 'Git & GitHub', 'Supabase', 'System Design'],
  },
  {
    id: '05',
    icon: Cpu,
    category: 'INTEGRATIONS',
    title: 'POWER ADD-ONS',
    description:
      'Plugging in the features that make products feel complete — payments, emails, analytics, exports, and data visualization. React Query for server state, Power BI for reporting, xlsx exports for operations.',
    color: '#8b5cf6',
    tech: 'REACT QUERY / POWER BI / RECHARTS / XLSX',
    skills: ['React Query', 'Razorpay / Payments', 'Nodemailer / SMTP', 'Power BI', 'Recharts', 'Excel (xlsx) Export'],
  },
];

export default function ServicesSection() {
  const [activeId, setActiveId] = useState<string | null>('01');

  const activeColor = services.find(s => s.id === activeId)?.color || services[0].color;

  return (
    <section
      id="services"
      className="relative py-20 md:py-32 bg-[#030303] overflow-hidden min-h-screen flex flex-col justify-center"
    >
      {/* REACTIVE BACKGROUND */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          className="absolute -top-[20%] -left-[10%] w-[70vw] h-[70vw] rounded-full blur-[120px] opacity-20"
          animate={{ backgroundColor: activeColor }}
          transition={{ duration: 1 }}
        />
        <motion.div
          className="absolute -bottom-[20%] -right-[10%] w-[60vw] h-[60vw] rounded-full blur-[120px] opacity-15"
          animate={{ backgroundColor: activeColor }}
          transition={{ duration: 1.5 }}
        />
        <motion.div
          className="absolute top-1/4 left-1/4 w-24 h-24 md:w-32 md:h-32 rounded-full blur-xl opacity-40"
          animate={{
            backgroundColor: activeColor,
            y: [0, -30, 0],
            x: [0, 20, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
        />
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{ backgroundImage: 'url("https://grainy-gradients.vercel.app/noise.svg")' }}
        />
        <div
          className="absolute inset-0 opacity-[0.05]"
          style={{
            backgroundImage:
              'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
            backgroundSize: '50px 50px',
          }}
        />
      </div>

      {/* Header */}
      <div className="container mx-auto px-6 mb-12 md:mb-16 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-6 md:gap-8"
        >
          <div className='rounded-full'>
            <span className="text-white/50 text-xs font-bold tracking-[0.4em] uppercase mb-4 block">
              System Capabilities
            </span>
            <h2 className="text-5xl md:text-8xl font-display leading-[0.9] text-white">
              CORE
              <br />
              <InteractiveText text="MODULES" className="text-outline italic opacity-80" />
            </h2>
          </div>
          <p className="text-white/40 max-w-sm text-base md:text-lg font-light">
            Select a module to expand its neural pathway.
          </p>
        </motion.div>
      </div>

      {/* Kinetic Accordion */}
      <div className="container mx-auto px-4 md:px-6 h-[800px] md:h-[600px] flex flex-col md:flex-row gap-3 md:gap-4 relative z-10">
        {services.map(service => (
          <motion.div
            key={service.id}
            layout
            onClick={() => setActiveId(service.id)}
            onMouseEnter={() => window.innerWidth > 768 && setActiveId(service.id)}
            className={`relative rounded-3xl overflow-hidden cursor-pointer border border-white/10 transition-all duration-500 ease-[0.32,0.72,0,1] ${activeId === service.id
              ? 'flex-[4] md:flex-[3]'
              : 'flex-[1] md:flex-[0.5] hover:md:flex-[0.7]'
              }`}
            style={{
              backgroundColor:
                activeId === service.id ? 'rgba(255,255,255,0.03)' : 'transparent',
            }}
          >
            {/* Active Card */}
            <AnimatePresence mode="popLayout">
              {activeId === service.id && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-0 p-6 md:p-12 flex flex-col justify-between"
                >
                  {/* Glow blob */}
                  <motion.div
                    className="absolute -right-20 -top-20 w-64 h-64 md:w-96 md:h-96 rounded-full blur-[100px] opacity-20 pointer-events-none"
                    style={{ backgroundColor: service.color }}
                    animate={{ scale: [1, 1.2, 1], rotate: [0, 90, 0] }}
                    transition={{ duration: 10, repeat: Infinity }}
                  />

                  {/* Top */}
                  <div className="flex justify-between items-start">
                    <div className="flex items-center gap-4">
                      <div
                        className="w-12 h-12 md:w-16 md:h-16 rounded-2xl flex items-center justify-center bg-white/5 backdrop-blur-md border border-white/10"
                        style={{ color: service.color }}
                      >
                        <service.icon className="w-6 h-6 md:w-8 md:h-8" />
                      </div>
                      <span className="text-4xl md:text-6xl font-display font-bold text-white/10 select-none">
                        {service.id}
                      </span>
                    </div>
                    <motion.button
                      whileHover={{ scale: 1.1, rotate: 45 }}
                      className="w-10 h-10 md:w-12 md:h-12 rounded-full border border-white/20 flex items-center justify-center text-white"
                    >
                      <ArrowUpRight className="w-4 h-4 md:w-5 md:h-5" />
                    </motion.button>
                  </div>

                  {/* Tech Stack Badge */}
                  <div className="mt-4 md:mt-0">
                    <motion.div
                      initial={{ y: 50, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.1 }}
                      className="inline-block px-3 py-1 rounded-full border border-white/10 bg-white/5 text-[9px] md:text-[10px] tracking-widest text-white/60 uppercase"
                    >
                      {service.tech}
                    </motion.div>
                  </div>

                  {/* Bottom */}
                  <div className="mt-auto">
                    <motion.h3
                      className="text-2xl md:text-5xl font-display mb-2 md:mb-4 text-white"
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.2 }}
                    >
                      {service.title}
                    </motion.h3>
                    <motion.p
                      className="text-sm md:text-base text-white/50 max-w-lg leading-relaxed line-clamp-3 md:line-clamp-none mb-4"
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.3 }}
                    >
                      {service.description}
                    </motion.p>

                    {/* Skill Pills — desktop only */}
                    <motion.div
                      className="hidden md:flex flex-wrap gap-2"
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.4 }}
                    >
                      {service.skills.map((skill, i) => (
                        <motion.span
                          key={skill}
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: 0.4 + i * 0.05 }}
                          className="px-3 py-1 rounded-full text-[10px] font-mono tracking-wider uppercase"
                          style={{
                            backgroundColor: service.color + '18',
                            border: `1px solid ${service.color}40`,
                            color: service.color,
                          }}
                        >
                          {skill}
                        </motion.span>
                      ))}
                    </motion.div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Inactive Card */}
            {activeId !== service.id && (
              <div className="absolute inset-0 flex md:flex-col items-center md:justify-center p-4 md:p-0">
                <div className="hidden md:block h-full w-px bg-white/5 absolute left-1/2 -translate-x-1/2" />
                <span className="text-sm md:text-xl font-display text-white/30 md:-rotate-90 whitespace-nowrap md:absolute md:top-24 select-none ml-2 md:ml-0 uppercase tracking-widest">
                  {service.category}
                </span>
                <motion.div
                  className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-white/5 flex items-center justify-center md:absolute md:bottom-12 border border-white/5 ml-auto md:ml-0"
                  style={{ color: service.color }}
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 2, repeat: Infinity, delay: Number(service.id) * 0.2 }}
                >
                  <service.icon className="w-3 h-3 md:w-4 md:h-4" />
                </motion.div>
                <span className="hidden md:block text-sm font-mono text-white/30 absolute top-8">
                  {service.id}
                </span>
                <span className="md:hidden text-xs font-mono text-white/20 mr-4">
                  {service.id}
                </span>
              </div>
            )}

            <div
              className={`absolute inset-0 border-2 transition-colors duration-300 pointer-events-none rounded-3xl ${activeId === service.id
                ? 'border-white/10'
                : 'border-transparent group-hover:border-white/5'
                }`}
            />
          </motion.div>
        ))}
      </div>

      {/* Bottom Line */}
      <motion.div
        className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent"
        animate={{ opacity: [0.3, 1, 0.3], scaleX: [0.8, 1, 0.8] }}
        transition={{ duration: 5, repeat: Infinity }}
      />
    </section>
  );
}