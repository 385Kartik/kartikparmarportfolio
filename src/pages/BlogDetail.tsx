import { useParams, Link } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef, useEffect } from 'react';
import { ArrowLeft, Share2, Calendar, Clock, Tag } from 'lucide-react';
import { SEO } from '../components/SEO';
import Navbar from '../components/Navbar';
import FooterSection from '../components/FooterSection';
import SmoothScroll from '../components/SmoothScroll';
import { blogData } from '../data/blogData';

// Reading progress bar
function ReadingProgress() {
  const { scrollYProgress } = useScroll();
  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-[2px] z-50 origin-left bg-gradient-to-r from-purple-500 to-blue-500"
      style={{ scaleX: scrollYProgress }}
    />
  );
}

export default function BlogDetail() {
  const { slug } = useParams();
  const post = blogData.find(p => p.slug === slug);
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  useEffect(() => { window.scrollTo(0, 0); }, [slug]);

  if (!post) {
    return (
      <div className="min-h-screen bg-[#020202] text-white flex flex-col items-center justify-center font-mono">
        <p className="text-zinc-500 mb-4 tracking-widest uppercase">404_POST_NOT_FOUND</p>
        <Link to="/blog" className="text-purple-400 hover:text-purple-300 underline underline-offset-4 transition-colors">
          Return to Logs
        </Link>
      </div>
    );
  }

  return (
    <SmoothScroll>
      <div className="min-h-screen bg-[#020202] text-white selection:bg-purple-500/30">
        <SEO 
          title={`${post.title} | Kartik Parmar`}
          description={post.excerpt}
          image={post.image}
        />
        <ReadingProgress />
        <Navbar />
        
        {/* HERO SECTION WITH PARALLAX */}
        <div ref={heroRef} className="relative h-[70vh] md:h-[85vh] flex flex-col justify-end overflow-hidden">
          <motion.div className="absolute inset-0" style={{ y }}>
            <img src={post.image} alt={post.title} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#020202] via-[#020202]/80 to-transparent" />
            <div className="absolute inset-0 bg-purple-500/10 mix-blend-overlay" />
          </motion.div>

          <motion.div style={{ opacity }} className="relative z-10 w-full max-w-4xl mx-auto px-6 pb-16 md:pb-24">
            <Link to="/blog" className="inline-flex items-center gap-2 text-zinc-400 hover:text-white mb-8 text-xs font-mono tracking-widest uppercase transition-colors group">
              <ArrowLeft className="w-3 h-3 group-hover:-translate-x-1 transition-transform" /> Back to Journal
            </Link>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
              {/* META ROW */}
              <div className="flex flex-wrap items-center gap-4 md:gap-6 mb-6 text-xs font-mono text-zinc-400 tracking-wider">
                <div className="flex items-center gap-2">
                  <Calendar className="w-3.5 h-3.5 text-purple-400" />
                  {new Date(post.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-3.5 h-3.5 text-blue-400" />
                  {Math.ceil(post.content.length / 1000)} MIN READ
                </div>
              </div>

              {/* TITLE */}
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-display leading-[1.1] mb-6 text-white tracking-tight">
                {post.title}
              </h1>

              {/* AUTHOR HEADER */}
              <div className="flex items-center gap-3 mb-8">
                <img src="/Kartik.jpeg" alt="Kartik Parmar" className="w-10 h-10 rounded-full object-cover border border-white/20 grayscale" />
                <div>
                  <p className="text-sm font-semibold text-white">Kartik Parmar</p>
                  <p className="text-[10px] font-mono text-zinc-400 tracking-widest uppercase">Author & AI Engineer</p>
                </div>
              </div>

              {/* TAGS */}
              <div className="flex flex-wrap gap-2">
                {post.tags.map(tag => (
                  <span key={tag} className="flex items-center gap-1.5 text-[10px] font-mono tracking-widest uppercase px-3 py-1.5 bg-white/5 border border-white/10 rounded-full text-zinc-300">
                    <Tag className="w-3 h-3 text-purple-400" />
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* CONTENT SECTION */}
        <main className="relative z-20 max-w-3xl mx-auto px-6 py-20 md:py-32 bg-[#020202]">
          <motion.article 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="prose prose-invert prose-lg md:prose-xl max-w-none 
                       prose-headings:font-display prose-headings:font-bold prose-headings:tracking-tight 
                       prose-p:text-zinc-300 prose-p:leading-relaxed prose-p:font-light
                       prose-a:text-purple-400 prose-a:no-underline hover:prose-a:text-purple-300 prose-a:transition-colors
                       prose-strong:text-white prose-strong:font-semibold
                       prose-blockquote:border-l-purple-500 prose-blockquote:bg-white/5 prose-blockquote:px-6 prose-blockquote:py-2 prose-blockquote:rounded-r-xl prose-blockquote:not-italic
                       prose-code:text-purple-300 prose-code:bg-white/5 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:before:content-none prose-code:after:content-none
                       prose-pre:bg-[#0a0a0a] prose-pre:border prose-pre:border-white/10 prose-pre:rounded-2xl
                       prose-img:rounded-3xl prose-img:border prose-img:border-white/10"
          >
            {/* Lead Paragraph */}
            <p className="text-2xl md:text-3xl text-zinc-200 leading-relaxed font-light mb-16 !mt-0">
              {post.excerpt}
            </p>

            {/* Main Content Render */}
            <div dangerouslySetInnerHTML={{ __html: post.content }} />
            
            {post.content === "Content coming soon..." && (
              <div className="flex flex-col items-center justify-center py-20 border border-white/5 rounded-3xl bg-white/[0.02]">
                 <div className="w-12 h-12 rounded-full border-t-2 border-l-2 border-purple-500 animate-spin mb-4" />
                 <p className="font-mono text-xs tracking-widest uppercase text-zinc-500">DECRYPTING_CONTENT...</p>
              </div>
            )}
          </motion.article>

          {/* SHARE FOOTER */}
          <div className="mt-24 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <img src="/Kartik.jpeg" alt="Kartik Parmar" className="w-12 h-12 rounded-full object-cover grayscale border border-white/20" />
              <div>
                <p className="font-display text-white text-lg leading-none mb-1">Kartik Parmar</p>
                <p className="font-mono text-[10px] uppercase tracking-widest text-zinc-500">Author & Engineer</p>
              </div>
            </div>
            
            <button className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 hover:border-purple-500/50 transition-all font-mono text-xs tracking-widest uppercase text-zinc-300">
              <Share2 className="w-3.5 h-3.5" /> Share Article
            </button>
          </div>
        </main>

        <FooterSection />
      </div>
    </SmoothScroll>
  );
}
