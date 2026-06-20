import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef, useEffect } from 'react';
import { ArrowRight, BookOpen } from 'lucide-react';
import { SEO } from '../components/SEO';
import Navbar from '../components/Navbar';
import FooterSection from '../components/FooterSection';
import SmoothScroll from '../components/SmoothScroll';
import { blogData } from '../data/blogData';

export default function BlogList() {
  useEffect(() => { window.scrollTo(0, 0); }, []);
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
  const heroOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 100]);

  return (
    <SmoothScroll>
      <div className="min-h-screen bg-[#020202] text-white selection:bg-purple-500/30">
        <SEO 
          title="Blog | Kartik Parmar"
          description="Read the latest articles on web development, AI automation, and building products by Kartik Parmar."
        />
        
        {/* Progress bar */}
        <motion.div 
          className="fixed top-0 left-0 right-0 h-[2px] z-50 origin-left bg-gradient-to-r from-purple-500 to-blue-500" 
          style={{ scaleX: useScroll().scrollYProgress }} 
        />
        
        <Navbar />
        
        {/* HERO SECTION */}
        <div ref={heroRef} className="relative pt-40 pb-20 px-6 overflow-hidden min-h-[50vh] flex items-center">
          <div className="absolute inset-0 pointer-events-none">
             <div className="absolute top-0 left-1/4 w-[40vw] h-[40vw] rounded-full blur-[150px] opacity-20 bg-purple-600/30" />
             <div className="absolute top-1/4 -right-10 w-[30vw] h-[30vw] rounded-full blur-[120px] opacity-10 bg-blue-500/20" />
             <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
          </div>
          
          <motion.div style={{ opacity: heroOpacity, y: heroY }} className="max-w-5xl mx-auto w-full relative z-10">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex items-center gap-3 mb-6">
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/20 w-fit">
                <BookOpen className="w-3.5 h-3.5 text-purple-400" />
                <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-purple-400">Engineering Log</span>
              </div>
            </motion.div>
            
            <motion.h1 
              initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1, duration: 0.8 }}
              className="text-5xl md:text-7xl lg:text-8xl font-display leading-[0.9] text-white tracking-tight mb-8"
            >
              WRITINGS &
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-500">REFLECTIONS</span>
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
              className="text-zinc-400 text-lg md:text-xl max-w-2xl font-light leading-relaxed border-l-2 border-purple-500/20 pl-6"
            >
              Insights on AI automation, web architectures, and the journey of building scalable digital products.
            </motion.p>
          </motion.div>
        </div>

        {/* BLOG GRID */}
        <div className="bg-[#020202] rounded-t-[3rem] -mt-12 relative z-20 shadow-[0_-40px_80px_rgba(0,0,0,0.8)]" style={{ overflow: 'clip' }}>
          <main className="max-w-5xl mx-auto px-6 py-20">
            <div className="grid gap-8 md:grid-cols-2">
              {blogData.map((post, i) => (
                <motion.article 
                  key={post.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.6 }}
                  className="group relative border border-white/10 rounded-3xl overflow-hidden bg-white/[0.02] hover:bg-white/[0.04] transition-colors duration-500"
                >
                  <Link to={`/blog/${post.slug}`} className="block h-full">
                    {/* Hover Glow */}
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" 
                         style={{ background: 'radial-gradient(circle at 50% 0%, rgba(168,85,247,0.1), transparent 70%)' }} />
                    
                    <div className="aspect-[16/10] overflow-hidden relative border-b border-white/5">
                      <img 
                        src={post.image} 
                        alt={post.title} 
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500" />
                    </div>
                    
                    <div className="p-8 relative">
                      <div className="flex gap-2 mb-4 text-xs text-zinc-500 font-mono uppercase tracking-widest">
                        <span className="flex items-center gap-2">
                           <span className="w-1.5 h-1.5 rounded-full bg-purple-500" />
                           {new Date(post.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                        </span>
                      </div>
                      
                      <h2 className="text-2xl font-display font-bold mb-4 text-white group-hover:text-purple-400 transition-colors leading-snug">
                        {post.title}
                      </h2>
                      
                      <p className="text-zinc-400 mb-6 line-clamp-3 leading-relaxed font-light text-sm">
                        {post.excerpt}
                      </p>
                      
                      <div className="flex flex-wrap gap-2 mb-8">
                        {post.tags.map(tag => (
                          <span key={tag} className="text-[10px] font-mono tracking-widest uppercase px-3 py-1 bg-white/5 border border-white/10 rounded-full text-zinc-400 group-hover:border-purple-500/30 transition-colors">
                            {tag}
                          </span>
                        ))}
                      </div>

                      <div className="flex items-center gap-2 text-sm font-bold tracking-widest uppercase text-white group-hover:text-purple-400 transition-colors mt-auto pt-4 border-t border-white/5">
                        Read Article <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </Link>
                </motion.article>
              ))}
            </div>
          </main>
        </div>

        <FooterSection />
      </div>
    </SmoothScroll>
  );
}
