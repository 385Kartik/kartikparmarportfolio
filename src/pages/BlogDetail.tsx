import { useParams, Link } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef, useEffect } from 'react';
import { ArrowLeft, Share2, Calendar, Clock, Tag, Loader2, Edit3 } from 'lucide-react';
import { SEO } from '../components/SEO';
import Navbar from '../components/Navbar';
import FooterSection from '../components/FooterSection';
import SmoothScroll from '../components/SmoothScroll';
import { supabase, BlogPost } from '../lib/supabase';

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
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);

  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  useEffect(() => { 
    window.scrollTo(0, 0); 
    fetchPostAndCheckAuth();
  }, [slug]);

  const fetchPostAndCheckAuth = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    setIsAdmin(!!session);

    if (slug) {
      const { data } = await supabase.from('blogs').select('*').eq('slug', slug).single();
      setPost(data);
    }
    setLoading(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#020202] text-white flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-purple-500 animate-spin" />
      </div>
    );
  }

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

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": post.title,
    "image": [post.image_url],
    "datePublished": post.created_at,
    "dateModified": post.updated_at,
    "author": {
      "@type": "Person",
      "name": "Kartik Parmar",
      "url": "https://kartikparmarportfolio.vercel.app/kartik-parmar"
    }
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [{
      "@type": "ListItem",
      "position": 1,
      "name": "Home",
      "item": "https://kartikparmarportfolio.vercel.app/"
    },{
      "@type": "ListItem",
      "position": 2,
      "name": "Blog",
      "item": "https://kartikparmarportfolio.vercel.app/blog"
    },{
      "@type": "ListItem",
      "position": 3,
      "name": post.title,
      "item": `https://kartikparmarportfolio.vercel.app/blog/${post.slug}`
    }]
  };

  return (
    <SmoothScroll>
      <div className="min-h-screen bg-[#020202] text-white selection:bg-purple-500/30">
        <SEO 
          title={`${post.title} | Kartik Parmar`}
          description={post.excerpt}
          image={post.image_url}
          schemas={[articleSchema, breadcrumbSchema]}
        />
        <ReadingProgress />
        <Navbar />
        
        {/* HERO SECTION WITH PARALLAX */}
        <div ref={heroRef} className="relative h-[70vh] md:h-[85vh] flex flex-col justify-end overflow-hidden">
          <motion.div className="absolute inset-0" style={{ y }}>
            <img src={post.image_url} alt={post.image_alt || post.title} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#020202] via-[#020202]/80 to-transparent" />
            <div className="absolute inset-0 bg-purple-500/10 mix-blend-overlay" />
          </motion.div>

          <motion.div style={{ opacity }} className="relative z-10 w-full max-w-4xl mx-auto px-6 pb-16 md:pb-24">
            <div className="flex items-center justify-between mb-8">
              <Link to="/blog" className="inline-flex items-center gap-2 text-zinc-400 hover:text-white text-xs font-mono tracking-widest uppercase transition-colors group">
                <ArrowLeft className="w-3 h-3 group-hover:-translate-x-1 transition-transform" /> Back to Journal
              </Link>
              
              {isAdmin && (
                <Link to={`/kartik-admin/edit/${post.slug}`} className="inline-flex items-center gap-2 px-3 py-1.5 bg-purple-500/10 border border-purple-500/30 text-purple-400 rounded hover:bg-purple-500/20 transition-colors text-xs font-mono tracking-widest uppercase">
                  <Edit3 className="w-3 h-3" /> Edit Blog
                </Link>
              )}
            </div>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
              {/* META ROW */}
              <div className="flex flex-wrap items-center gap-4 md:gap-6 mb-6 text-xs font-mono text-zinc-400 tracking-wider">
                <div className="flex items-center gap-2">
                  <Calendar className="w-3.5 h-3.5 text-purple-400" />
                  {new Date(post.created_at).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
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
              <div className="flex items-center gap-3 mb-8 bg-white/5 border border-white/10 p-4 rounded-2xl w-fit backdrop-blur-md">
                <img src="/Kartik.jpeg" alt="Kartik Parmar" className="w-12 h-12 rounded-full object-cover border border-white/20 grayscale" />
                <div>
                  <p className="text-sm font-semibold text-white">Written by Kartik Parmar</p>
                  <p className="text-[10px] font-mono text-zinc-400 tracking-widest uppercase">Full Stack Developer & AI Engineer</p>
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

          {/* ABOUT THE AUTHOR REUSABLE CARD */}
          <div className="mt-24 pt-12 border-t border-white/10">
            <div className="bg-[#0a0a0a] border border-white/10 rounded-3xl p-8 md:p-12 flex flex-col md:flex-row items-center md:items-start gap-8 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-purple-500/10 blur-[80px] rounded-full pointer-events-none" />
              <img src="/Kartik.jpeg" alt="Kartik Parmar" className="w-24 h-24 md:w-32 md:h-32 rounded-full object-cover grayscale hover:grayscale-0 transition-all duration-500 border-2 border-purple-500/30 relative z-10" />
              <div className="text-center md:text-left relative z-10">
                <h3 className="text-xs font-mono tracking-widest uppercase text-purple-400 mb-2">About the Author</h3>
                <h2 className="text-3xl font-display font-bold text-white mb-4">Kartik Parmar</h2>
                <p className="text-zinc-400 text-sm leading-relaxed mb-6 max-w-2xl">
                  Kartik Parmar is an innovative Full Stack Developer and AI Engineer based in Mumbai. He specializes in architecting comprehensive SaaS solutions, direct-to-consumer e-commerce platforms, and advanced AI automation systems. 
                </p>
                <div className="flex flex-col sm:flex-row items-center gap-4 justify-center md:justify-start">
                  <Link to="/kartik-parmar" className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-white text-black font-semibold hover:bg-zinc-200 transition-colors text-sm">
                    View Full Profile <ArrowLeft className="w-4 h-4 rotate-180" />
                  </Link>
                  <button className="flex items-center gap-2 px-6 py-2.5 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 hover:border-purple-500/50 transition-all text-sm font-semibold text-white">
                    <Share2 className="w-4 h-4" /> Share Article
                  </button>
                </div>
              </div>
            </div>
          </div>
        </main>

        <FooterSection />
      </div>
    </SmoothScroll>
  );
}
