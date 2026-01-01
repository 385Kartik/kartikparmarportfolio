import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { Code2, Palette, Rocket, Sparkles } from 'lucide-react';

const skills = [
  { icon: Code2, title: 'Development', description: 'React, TypeScript, Three.js, Node.js' },
  { icon: Palette, title: 'Design', description: 'UI/UX, Figma, Animation, 3D' },
  { icon: Rocket, title: 'Performance', description: 'Optimization, SEO, Core Web Vitals' },
  { icon: Sparkles, title: 'Creative', description: 'Motion Design, WebGL, Interactive' },
];

const stats = [
  { value: '5+', label: 'Years Experience' },
  { value: '50+', label: 'Projects Completed' },
  { value: '30+', label: 'Happy Clients' },
  { value: '∞', label: 'Coffee Cups' },
];

export default function AboutSection() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const x = useTransform(scrollYProgress, [0, 1], ['-100%', '100%']);

  return (
    <section
      ref={ref}
      id="about"
      className="relative min-h-screen py-32 overflow-hidden"
    >
      {/* Animated background text */}
      <motion.div
        style={{ x }}
        className="absolute top-20 left-0 text-[200px] font-heading font-bold text-muted/10 whitespace-nowrap pointer-events-none select-none"
      >
        ABOUT ME • ABOUT ME • ABOUT ME •
      </motion.div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <span className="inline-block px-4 py-2 glass-card text-sm text-secondary font-medium mb-6">
            Who Am I?
          </span>
          <h2 className="text-5xl md:text-7xl font-heading font-bold mb-6">
            About <span className="gradient-text">Me</span>
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16 items-center mb-20">
          {/* Left side - Image/Visual */}
          <motion.div
            initial={{ opacity: 0, x: -100 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="relative w-full aspect-square max-w-md mx-auto">
              <div className="absolute inset-0 glass-card rounded-2xl overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-secondary/20" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-9xl animate-float">👨‍💻</div>
                </div>
              </div>
              {/* Decorative elements */}
              <div className="absolute -top-4 -right-4 w-24 h-24 border border-primary/50 rounded-xl animate-float-delayed" />
              <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-secondary/30 rounded-lg blur-sm animate-float" />
            </div>
          </motion.div>

          {/* Right side - Text */}
          <motion.div
            initial={{ opacity: 0, x: 100 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h3 className="text-3xl font-heading font-bold mb-6">
              A Passionate <span className="text-primary">Creative Developer</span>
            </h3>
            <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
              I'm a creative developer with a passion for building immersive digital experiences. 
              With over 5 years of experience in web development and design, I specialize in 
              creating stunning, interactive websites that push the boundaries of what's possible 
              on the web.
            </p>
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              My expertise spans from front-end development with React and Three.js to creating 
              smooth animations and 3D experiences. I believe in the perfect blend of creativity 
              and technical excellence.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="glass-card p-4 text-center"
                >
                  <div className="text-3xl font-heading font-bold text-primary">{stat.value}</div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Skills Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {skills.map((skill, index) => (
            <motion.div
              key={skill.title}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -10, boxShadow: '0 0 30px rgba(0, 212, 255, 0.2)' }}
              className="glass-card p-6 group cursor-pointer"
            >
              <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                <skill.icon className="w-7 h-7 text-primary" />
              </div>
              <h4 className="text-xl font-heading font-bold mb-2">{skill.title}</h4>
              <p className="text-muted-foreground">{skill.description}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Gradient overlays */}
      <div className="absolute top-1/2 left-0 w-72 h-72 bg-accent/10 rounded-full blur-[100px] -z-10" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-primary/10 rounded-full blur-[128px] -z-10" />
    </section>
  );
}
