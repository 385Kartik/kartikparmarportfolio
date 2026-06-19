import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { SEO } from '../components/SEO';
import Navbar from '../components/Navbar';
import FooterSection from '../components/FooterSection';
import { blogData } from '../data/blogData';

export default function BlogDetail() {
  const { slug } = useParams();
  const post = blogData.find(p => p.slug === slug);

  if (!post) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center">
        <p className="text-muted-foreground mb-4 font-mono">POST_NOT_FOUND</p>
        <Link to="/blog" className="text-primary hover:underline">Back to Blog</Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SEO 
        title={`${post.title} | Kartik Parmar`}
        description={post.excerpt}
        image={post.image}
      />
      <Navbar />
      
      <main className="pt-24 pb-16 px-4 max-w-3xl mx-auto">
        <Link to="/blog" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-8 text-sm font-mono transition-colors">
          <ArrowLeft className="w-4 h-4" /> Back to Blog
        </Link>
        
        <motion.article 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="flex gap-2 mb-4 text-sm text-muted-foreground font-mono">
            <span>{new Date(post.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight leading-tight">{post.title}</h1>
          
          <div className="flex flex-wrap gap-2 mb-8">
            {post.tags.map(tag => (
              <span key={tag} className="text-xs px-3 py-1 bg-secondary rounded-full text-secondary-foreground font-medium">
                {tag}
              </span>
            ))}
          </div>

          <div className="aspect-video rounded-2xl overflow-hidden mb-12 border border-border">
            <img src={post.image} alt={post.title} className="w-full h-full object-cover" />
          </div>

          <div className="prose prose-invert max-w-none">
            <p className="text-xl text-muted-foreground leading-relaxed mb-8">
              {post.excerpt}
            </p>
            <div className="text-foreground leading-relaxed">
              {post.content}
            </div>
          </div>
        </motion.article>
      </main>

      <FooterSection />
    </div>
  );
}
