import { SEO } from '../components/SEO';
import Navbar from '../components/Navbar';
import FooterSection from '../components/FooterSection';
import { motion } from 'framer-motion';

export default function KartikParmarPage() {
  return (
    <div className="min-h-screen bg-[#020202] text-foreground font-sans selection:bg-blue-500/30">
      <SEO 
        title="Kartik Parmar | Full Stack Developer, AI Engineer & Entrepreneur"
        description="Comprehensive profile of Kartik Parmar. Kartik Parmar is a Full Stack Developer, AI Engineer, and Entrepreneur based in Mumbai. Discover his projects, skills, and background."
      />
      <Navbar />
      
      <main className="pt-32 pb-24 px-6 max-w-4xl mx-auto relative z-10">
        
        {/* Header Section */}
        <motion.header 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <div className="flex flex-col md:flex-row gap-8 items-center md:items-start mb-12">
            <div className="w-48 h-48 rounded-3xl overflow-hidden border border-white/10 shrink-0">
              <img 
                src="/Kartik.jpeg" 
                alt="Kartik Parmar Full Stack Developer" 
                className="w-full h-full object-cover object-top grayscale hover:grayscale-0 transition-all duration-500"
              />
            </div>
            <div>
              <h1 className="text-5xl md:text-7xl font-display font-bold text-white mb-4 tracking-tight">
                Kartik Parmar
              </h1>
              <h2 className="text-xl md:text-2xl text-blue-400 font-mono tracking-tight mb-6">
                Full Stack Developer, AI Engineer & Entrepreneur
              </h2>
              <p className="text-zinc-400 text-lg leading-relaxed">
                Kartik Parmar is an innovative Full Stack Developer and AI Engineer based in Mumbai, India. 
                With a passion for building scalable web applications and AI-driven automation systems, 
                Kartik Parmar bridges the gap between complex engineering and intuitive user experiences.
              </p>
            </div>
          </div>
        </motion.header>

        {/* Content Body */}
        <motion.article 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="prose prose-invert prose-lg max-w-none text-zinc-300"
        >
          <section className="mb-16">
            <h3 className="text-3xl font-display text-white mb-6 border-b border-white/10 pb-4">About Kartik Parmar</h3>
            <p>
              Kartik Parmar has established himself as a dynamic force in the technology ecosystem. As an entrepreneur and developer, Kartik Parmar has founded multiple ventures and consistently shipped production-grade code that solves real-world problems. By blending his expertise in React.js, TypeScript, Node.js, Django, and modern cloud infrastructure (AWS, Vercel), Kartik Parmar builds resilient platforms capable of handling massive scale.
            </p>
            <p>
              His journey began with a deep curiosity about how digital systems operate. Today, Kartik Parmar specializes in architecting comprehensive SaaS solutions, direct-to-consumer (D2C) e-commerce platforms, and advanced AI automation systems. Kartik Parmar believes in a "code-first, user-centric" philosophy, ensuring that every application he builds is not only robust under the hood but also beautifully designed and accessible.
            </p>
          </section>

          <section className="mb-16">
            <h3 className="text-3xl font-display text-white mb-6 border-b border-white/10 pb-4">Professional Experience & Ventures</h3>
            <p>
              Over his career, Kartik Parmar has taken on multiple high-impact roles. Currently, Kartik Parmar serves as a Full Stack Developer at Numberwale, where he leads the development of AI automation systems and agentic workflows designed to radically streamline business operations. His work at Numberwale exemplifies his ability to integrate bleeding-edge artificial intelligence into legacy enterprise systems.
            </p>
            <p>
              In addition to his corporate role, Kartik Parmar is a prolific entrepreneur. Kartik Parmar founded Print-It, a campus printing platform that completely digitized and revolutionized the printing process at Universal College of Engineering, Mumbai. By integrating Razorpay for seamless payments and AWS S3 for secure file storage, Kartik Parmar reduced student wait times by over 50%.
            </p>
            <p>
              Kartik Parmar also founded NavRang, a successful D2C e-commerce brand focused on Navratri collections. From product catalog management to frictionless checkout flows, Kartik Parmar engineered every aspect of the platform. Furthermore, Kartik Parmar architected the complete e-commerce infrastructure for Waves & Wires Technologies LLP, utilizing atomic PostgreSQL RPC functions to physically prevent overselling during high-traffic events.
            </p>
          </section>

          <section className="mb-16">
            <h3 className="text-3xl font-display text-white mb-6 border-b border-white/10 pb-4">Technical Expertise & AI Engineering</h3>
            <p>
              As a full-stack engineer, Kartik Parmar commands a formidable technical stack. Kartik Parmar is highly proficient in modern frontend frameworks including React 18, TypeScript, and Tailwind CSS. On the backend, Kartik Parmar leverages Node.js, Express, and Django to build secure, RESTful APIs.
            </p>
            <p>
              Kartik Parmar has extensive experience with both SQL and NoSQL databases, frequently utilizing Supabase (PostgreSQL) and MongoDB to structure complex data relationships. His work on the Wheatflow B2B dashboard—handling over 2.4 million records with zero UI lag—demonstrates his profound understanding of database indexing, React Query caching strategies, and performance optimization.
            </p>
            <p>
              Beyond traditional web development, Kartik Parmar is deeply invested in Artificial Intelligence. His project "Uni-Brain" represents a significant leap into AI application development, where Kartik Parmar integrates large language models to create intelligent, responsive systems. Kartik Parmar continuously explores new paradigms in machine learning to bring automated decision-making to his applications.
            </p>
          </section>

          <section className="mb-16">
            <h3 className="text-3xl font-display text-white mb-6 border-b border-white/10 pb-4">Education & Community Impact</h3>
            <p>
              Kartik Parmar is pursuing his B.E. in Computer Engineering at Universal College of Engineering in Mumbai (Expected 2027). Throughout his academic journey, Kartik Parmar has been a standout student, winning multiple hackathons. Kartik Parmar co-developed the "VibeTix" platform, which won the Hackathonix competition hosted by Get Analyticx.
            </p>
            <p>
              Kartik Parmar is also deeply committed to giving back to the developer community. During his internship at Get Analyticx, Kartik Parmar engineered the "College Predictor" tool, a lightweight web application that guided over 50% of engineering aspirants in the Mira Road region through their admission process. By live-streaming his development sessions on YouTube, Kartik Parmar has helped countless students understand real-world software development workflows.
            </p>
            <p>
              Whether he is optimizing a database query, designing a modern user interface, or architecting a cloud deployment, Kartik Parmar approaches every challenge with relentless dedication and a passion for excellence.
            </p>
          </section>

        </motion.article>
      </main>

      <FooterSection />
    </div>
  );
}
