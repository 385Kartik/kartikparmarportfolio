import { motion, useScroll, useTransform } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight, FileText, ExternalLink, MapPin, Package, Truck, Route, BarChart3, Zap, CheckCircle2, GitBranch } from 'lucide-react';
import SmoothScroll from '../components/SmoothScroll';
import FooterSection from '../components/FooterSection';
import Navbar from '../components/Navbar';
import { SEO } from '../components/SEO';

const ACCENT = '#06b6d4';

function AnimatedCounter({ value, suffix = '' }: { value: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const [hasAnimated, setHasAnimated] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !hasAnimated) {
        setHasAnimated(true);
        let start = 0;
        const duration = 2000;
        const step = (timestamp: number) => {
          if (!start) start = timestamp;
          const progress = Math.min((timestamp - start) / duration, 1);
          setCount(Math.floor(progress * value));
          if (progress < 1) requestAnimationFrame(step);
        };
        requestAnimationFrame(step);
      }
    }, { threshold: 0.5 });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [value, hasAnimated]);
  return <span ref={ref}>{count}{suffix}</span>;
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-3 mb-4">
      <span className="w-6 h-px bg-cyan-500" />
      <span className="text-xs font-bold tracking-[0.35em] uppercase font-mono text-cyan-500">{children}</span>
    </div>
  );
}

const contributions = [
  { icon: Package, title: 'GMSP Algorithm', desc: 'Greedy multi-store partitioning that decomposes orders into minimal sub-orders based on availability, load, and distance.' },
  { icon: Route, title: 'DCAT Traversal', desc: 'Directional cluster-aware traversal using DBSCAN clustering, eliminating backtracking for optimal route sequencing.' },
  { icon: BarChart3, title: 'Approximation Bound', desc: 'Formal guarantees under the triangle inequality with proven NP-hardness via TSP reduction.' },
  { icon: Zap, title: 'Real-World Validation', desc: '500 randomized orders on Mumbai stores confirm 26.2% route reduction and 28.8% delivery time improvement.' },
];

const algorithmSteps = [
  { step: '01', title: 'Order Received', desc: 'Customer places a multi-item order on the platform.', color: '#06b6d4' },
  { step: '02', title: 'GMSP Partitioning', desc: 'Order decomposed into sub-orders assigned to nearby stores based on availability, load & distance.', color: '#14b8a6' },
  { step: '03', title: 'DCAT Clustering', desc: 'DBSCAN clusters store locations. Farthest-node-first routing with directional inward alignment.', color: '#0ea5e9' },
  { step: '04', title: 'Optimized Delivery', desc: 'Rider follows the cluster-aware route — no backtracking, minimal distance, fast delivery.', color: '#8b5cf6' },
];

export default function ResearchPaperPage() {
  useEffect(() => { window.scrollTo(0, 0); }, []);
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
  const heroOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 100]);

  return (
    <SmoothScroll>
      <div className="min-h-screen bg-[#020202] text-white selection:bg-cyan-500/30">
        <SEO 
          title="GMSP-DCAT Research Paper | Kartik Parmar"
          description="Greedy Multi-Store Partitioning with Directional Cluster-Aware Traversal for Inventory-Less Hyperlocal Order Fulfillment."
        />
        {/* Progress bar */}
        <motion.div className="fixed top-0 left-0 right-0 h-[2px] z-50 origin-left bg-cyan-500" style={{ scaleX: useScroll().scrollYProgress }} />
        <Navbar />

        {/* ── HERO ── */}
        <div ref={heroRef} className="relative min-h-screen flex items-center overflow-hidden">
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute -top-[20%] -right-[10%] w-[70vw] h-[70vw] rounded-full blur-[150px] opacity-15 bg-cyan-500" />
            <div className="absolute -bottom-[20%] -left-[10%] w-[50vw] h-[50vw] rounded-full blur-[120px] opacity-10 bg-teal-600" />
            <motion.div className="absolute top-1/3 right-1/4 w-32 h-32 rounded-full blur-xl opacity-30 bg-cyan-400"
              animate={{ y: [0, -30, 0], x: [0, 20, 0], scale: [1, 1.2, 1] }}
              transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }} />
            <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)', backgroundSize: '50px 50px' }} />
          </div>

          <motion.div style={{ opacity: heroOpacity, y: heroY }} className="relative z-10 max-w-6xl mx-auto px-6 pt-32 pb-20">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex items-center gap-2 text-white/40 text-xs font-mono tracking-widest uppercase mb-8">
              <Link to="/" className="hover:text-white transition-colors">Portfolio</Link>
              <ArrowRight className="w-3 h-3" />
              <span className="text-cyan-400">GMSP-DCAT</span>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}>
              <div className="flex items-center gap-3 mb-6 flex-wrap">
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-500/15 border border-amber-500/30">
                  <div className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
                  <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-amber-400">Under Review</span>
                </div>
                <span className="text-[10px] font-mono tracking-widest text-zinc-500 uppercase px-3 py-1.5 rounded-full border border-white/10 bg-white/5">IEEE ICOCO 2025</span>
              </div>

              <h1 className="text-5xl md:text-[7rem] lg:text-[9rem] font-display leading-[0.85] text-white mb-6">
                GMSP
                <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-teal-500">DCAT</span>
              </h1>
              <p className="text-lg md:text-xl text-cyan-300/70 max-w-3xl leading-relaxed font-light">
                Greedy Multi-Store Partitioning with Directional Cluster-Aware Traversal for Inventory-Less Hyperlocal Order Fulfillment
              </p>
            </motion.div>
          </motion.div>

          <motion.div className="absolute bottom-8 right-8 text-white/20 z-10" animate={{ y: [0, 6, 0] }} transition={{ duration: 2, repeat: Infinity }}>
            <span className="text-[9px] font-mono tracking-widest uppercase rotate-90 block">scroll</span>
          </motion.div>
        </div>

        {/* ── BODY ── */}
        <div className="bg-[#020202] rounded-t-[3rem] -mt-12 relative z-20 shadow-[0_-40px_80px_rgba(0,0,0,0.8)]" style={{ overflow: 'clip' }}>
          <div className="max-w-5xl mx-auto px-6 md:px-16 py-20 space-y-32">

            {/* STATS */}
            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { label: 'Route Reduction', value: 26, suffix: '.2%', color: '#06b6d4' },
                { label: 'Time Improvement', value: 28, suffix: '.8%', color: '#14b8a6' },
                { label: 'Orders Tested', value: 500, suffix: '', color: '#0ea5e9' },
                { label: 'Avg Improvement', value: 76, suffix: '.8%', color: '#8b5cf6' },
              ].map((s, i) => (
                <motion.div key={s.label} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                  className="relative rounded-2xl border border-white/8 bg-white/[0.03] p-6 overflow-hidden group hover:border-white/15 transition-colors">
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{ background: `radial-gradient(circle at 50% 0%, ${s.color}15, transparent 70%)` }} />
                  <div className="text-3xl md:text-4xl font-display font-bold mb-1" style={{ color: s.color }}><AnimatedCounter value={s.value} suffix={s.suffix} /></div>
                  <div className="text-xs text-white/40 tracking-widest uppercase font-mono">{s.label}</div>
                </motion.div>
              ))}
            </motion.div>

            {/* THE PROBLEM */}
            <div>
              <SectionLabel>The Problem</SectionLabel>
              <h2 className="text-4xl md:text-6xl font-display text-white mb-8">WHY THIS MATTERS</h2>
              <div className="grid md:grid-cols-2 gap-8">
                <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                  className="rounded-2xl border border-red-500/20 bg-red-500/[0.03] p-8">
                  <div className="flex items-center gap-3 mb-4">
                    <MapPin className="w-5 h-5 text-red-400" />
                    <span className="text-xs font-bold tracking-[0.2em] uppercase text-red-400">Dark Store Problem</span>
                  </div>
                  <p className="text-zinc-400 leading-relaxed">
                    Platforms like Blinkit, Zepto, and Swiggy Instamart use <span className="text-white">inventory-less marketplaces</span> — 
                    no dedicated dark stores, no held inventory. A single order may require items from <span className="text-white">multiple local stores</span>, 
                    creating a combinatorial fulfillment challenge.
                  </p>
                </motion.div>
                <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}
                  className="rounded-2xl border border-cyan-500/20 bg-cyan-500/[0.03] p-8">
                  <div className="flex items-center gap-3 mb-4">
                    <Truck className="w-5 h-5 text-cyan-400" />
                    <span className="text-xs font-bold tracking-[0.2em] uppercase text-cyan-400">Dual Challenge</span>
                  </div>
                  <p className="text-zinc-400 leading-relaxed">
                    Two sub-problems must be solved simultaneously: <span className="text-white">(1) partition the order</span> across minimum stores, 
                    and <span className="text-white">(2) compute an efficient multi-stop pickup route</span>. 
                    Both are NP-hard and must run in milliseconds.
                  </p>
                </motion.div>
              </div>
            </div>

            {/* ALGORITHM PIPELINE */}
            <div>
              <SectionLabel>How It Works</SectionLabel>
              <h2 className="text-4xl md:text-6xl font-display text-white mb-12">ALGORITHM PIPELINE</h2>
              <div className="relative">
                <div className="absolute left-6 top-0 bottom-0 w-px bg-gradient-to-b from-cyan-500/50 via-teal-500/30 to-purple-500/50 hidden md:block" />
                <div className="space-y-12">
                  {algorithmSteps.map((s, i) => (
                    <motion.div key={s.step} initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
                      transition={{ delay: i * 0.15, duration: 0.6 }} className="relative md:pl-20 group">
                      <div className="hidden md:flex absolute left-0 top-1 w-12 h-12 rounded-full border-2 items-center justify-center text-sm font-display font-bold bg-[#020202] z-10 transition-all duration-300 group-hover:scale-110"
                        style={{ borderColor: s.color, color: s.color }}>
                        {s.step}
                      </div>
                      <div className="rounded-2xl border border-white/8 bg-white/[0.02] p-6 md:p-8 hover:border-white/15 transition-all duration-300 overflow-hidden relative">
                        <div className="absolute top-0 left-0 w-full h-[2px] origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500" style={{ backgroundColor: s.color }} />
                        <div className="flex items-center gap-3 mb-2 md:hidden">
                          <span className="text-lg font-display font-bold" style={{ color: s.color }}>{s.step}</span>
                        </div>
                        <h3 className="text-2xl md:text-3xl font-display text-white mb-2 group-hover:text-cyan-300 transition-colors">{s.title}</h3>
                        <p className="text-zinc-400 leading-relaxed">{s.desc}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>

            {/* ROUTE COMPARISON */}
            <div>
              <SectionLabel>Visual Comparison</SectionLabel>
              <h2 className="text-4xl md:text-6xl font-display text-white mb-8">BEFORE VS AFTER</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                  className="rounded-2xl border border-red-500/20 bg-white/[0.02] p-8 relative overflow-hidden">
                  <div className="absolute -right-10 -top-10 w-40 h-40 rounded-full blur-[60px] bg-red-500 opacity-10 pointer-events-none" />
                  <h3 className="text-xl font-display text-red-400 mb-4 flex items-center gap-2">
                    <GitBranch className="w-5 h-5" /> Naive Approach
                  </h3>
                  <svg viewBox="0 0 300 200" className="w-full h-48 mb-4">
                    <motion.path d="M30,180 L150,30 L270,150 L80,60 L250,180 L30,100 L200,40" fill="none" stroke="#ef4444" strokeWidth="2" strokeDasharray="4,4"
                      initial={{ pathLength: 0, opacity: 0 }} whileInView={{ pathLength: 1, opacity: 0.6 }} viewport={{ once: true }} transition={{ duration: 2 }} />
                    {[[30,180],[150,30],[270,150],[80,60],[250,180],[30,100],[200,40]].map(([cx,cy], i) => (
                      <motion.circle key={i} cx={cx} cy={cy} r="6" fill="#ef4444" initial={{ scale: 0 }} whileInView={{ scale: 1 }} viewport={{ once: true }} transition={{ delay: i * 0.15 }} />
                    ))}
                  </svg>
                  <div className="space-y-2 text-sm text-zinc-400">
                    <p>❌ Random store sequencing</p><p>❌ Excessive backtracking</p><p>❌ Longer delivery times</p>
                  </div>
                </motion.div>

                <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}
                  className="rounded-2xl border border-cyan-500/30 p-8 relative overflow-hidden" style={{ background: 'linear-gradient(135deg, rgba(6,182,212,0.06), transparent)' }}>
                  <div className="absolute -right-10 -top-10 w-40 h-40 rounded-full blur-[60px] bg-cyan-500 opacity-10 pointer-events-none" />
                  <h3 className="text-xl font-display text-cyan-400 mb-4 flex items-center gap-2">
                    <Route className="w-5 h-5" /> DCAT Optimized
                  </h3>
                  <svg viewBox="0 0 300 200" className="w-full h-48 mb-4">
                    <motion.path d="M30,180 L30,100 L80,60 L150,30 L200,40 L250,100 L270,150" fill="none" stroke="#06b6d4" strokeWidth="2.5"
                      initial={{ pathLength: 0, opacity: 0 }} whileInView={{ pathLength: 1, opacity: 0.8 }} viewport={{ once: true }} transition={{ duration: 2, delay: 0.5 }} />
                    {[[30,180],[30,100],[80,60],[150,30],[200,40],[250,100],[270,150]].map(([cx,cy], i) => (
                      <motion.circle key={i} cx={cx} cy={cy} r="6" fill="#06b6d4" initial={{ scale: 0 }} whileInView={{ scale: 1 }} viewport={{ once: true }} transition={{ delay: 0.5 + i * 0.15 }} />
                    ))}
                  </svg>
                  <div className="space-y-2 text-sm text-zinc-400">
                    <p>✅ Cluster-aware sequencing</p><p>✅ No backtracking</p><p>✅ 26.2% shorter routes</p>
                  </div>
                </motion.div>
              </div>
            </div>

            {/* KEY CONTRIBUTIONS */}
            <div>
              <SectionLabel>Key Contributions</SectionLabel>
              <h2 className="text-4xl md:text-6xl font-display text-white mb-12">WHAT'S NEW</h2>
              <div className="grid md:grid-cols-2 gap-6">
                {contributions.map((c, i) => (
                  <motion.div key={c.title} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }} className="group rounded-2xl border border-white/8 bg-white/[0.02] p-6 hover:border-cyan-500/30 transition-all duration-300 overflow-hidden relative">
                    <div className="absolute top-0 left-0 w-full h-[2px] origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500 bg-cyan-500" />
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 shrink-0 group-hover:scale-110 transition-transform">
                        <c.icon className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="text-lg font-display text-white mb-1">{c.title}</h4>
                        <p className="text-sm text-zinc-400 leading-relaxed">{c.desc}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* CONCLUSION */}
            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              className="relative rounded-3xl p-10 md:p-14 overflow-hidden border border-cyan-500/30"
              style={{ background: 'linear-gradient(135deg, rgba(6,182,212,0.08) 0%, transparent 60%)' }}>
              <div className="absolute -right-20 -top-20 w-72 h-72 rounded-full blur-[80px] bg-cyan-500 opacity-10 pointer-events-none" />
              <div className="relative">
                <div className="flex items-center gap-3 mb-6">
                  <CheckCircle2 className="w-5 h-5 text-cyan-400" />
                  <span className="text-xs font-bold tracking-[0.35em] uppercase font-mono text-cyan-400">Conclusion</span>
                </div>
                <h2 className="text-3xl md:text-4xl font-display text-white mb-5">The Result</h2>
                <p className="text-white/65 text-lg leading-relaxed max-w-3xl mb-8">
                  GMSP-DCAT demonstrates that inventory-less hyperlocal platforms can achieve near-optimal fulfillment 
                  using lightweight, zero-training heuristics. Validated on real Mumbai store data, it delivers 
                  <span className="text-cyan-300 font-semibold"> 26.2% route reduction</span> and 
                  <span className="text-cyan-300 font-semibold"> 28.8% delivery time improvement</span> — 
                  proving practical superiority over baseline methods in low-data deployment scenarios.
                </p>
                <a href="/manuscript_paper.pdf" target="_blank" rel="noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-cyan-500 to-teal-500 text-black font-bold text-sm tracking-wider uppercase hover:shadow-[0_0_40px_rgba(6,182,212,0.4)] transition-all duration-300">
                  <FileText className="w-4 h-4" /> Read Full Paper <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </motion.div>

            {/* NAV */}
            <div className="border-t border-white/8 pt-12 flex justify-between items-center">
              <Link to="/#projects" className="group flex items-center gap-2 text-sm font-mono text-white/40 hover:text-white transition-colors">
                <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> PROJECTS
              </Link>
              <Link to="/" className="group flex items-center gap-2 text-sm font-mono text-white/40 hover:text-white transition-colors">
                HOME <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </div>

        <FooterSection />
      </div>
    </SmoothScroll>
  );
}
