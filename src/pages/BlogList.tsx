import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { SEO } from '../components/SEO';
import Navbar from '../components/Navbar';
import FooterSection from '../components/FooterSection';
import { blogData } from '../data/blogData';

export default function BlogList() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <SEO 
        title="Blog | Kartik Parmar"
        description="Read the latest articles on web development, AI automation, and building products by Kartik Parmar."
      />
      <Navbar />
      
      <main className="pt-24 pb-16 px-4 max-w-5xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold mb-12 tracking-tight">Blog</h1>
        
        <div className="grid gap-8 md:grid-cols-2">
          {blogData.map((post, i) => (
            <motion.article 
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="group border border-border rounded-2xl overflow-hidden hover:border-primary/50 transition-colors bg-card"
            >
              <Link to={`/blog/${post.slug}`}>
                <div className="aspect-video overflow-hidden">
                  <img 
                    src={post.image} 
                    alt={post.title} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-6">
                  <div className="flex gap-2 mb-3 text-xs text-muted-foreground font-mono">
                    <span>{new Date(post.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
                  </div>
                  <h2 className="text-2xl font-bold mb-2 group-hover:text-primary transition-colors">{post.title}</h2>
                  <p className="text-muted-foreground mb-4 line-clamp-2">{post.excerpt}</p>
                  <div className="flex flex-wrap gap-2">
                    {post.tags.map(tag => (
                      <span key={tag} className="text-xs px-2 py-1 bg-secondary rounded-md text-secondary-foreground">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </Link>
            </motion.article>
          ))}
        </div>
      </main>

      <FooterSection />
    </div>
  );
}
