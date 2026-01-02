import { motion } from 'framer-motion';
import { ArrowRight, Mail, MapPin, Phone, Send } from 'lucide-react';
import { useState } from 'react';
import MagneticButton from './MagneticButton';

const socials = [
  { name: 'Twitter', handle: '@creative_dev', url: '#' },
  { name: 'LinkedIn', handle: '/in/creativedev', url: '#' },
  { name: 'Dribbble', handle: '@creativedev', url: '#' },
  { name: 'GitHub', handle: '@creativedev', url: '#' },
];

export default function ContactSection() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [isHovered, setIsHovered] = useState(false);

  return (
    <section id="contact" className="relative py-32 overflow-hidden bg-background">
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div 
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full opacity-10"
          style={{ background: 'radial-gradient(circle, hsl(var(--primary)), transparent 60%)' }}
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 8, repeat: Infinity }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-6">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <span className="text-primary text-sm tracking-[0.3em] mb-4 block">
            LET'S CONNECT
          </span>
          <h2 className="text-6xl md:text-9xl font-display leading-none mb-4">
            GOT A
            <br />
            <span className="text-primary italic">PROJECT?</span>
          </h2>
          <p className="text-muted-foreground text-xl max-w-xl mx-auto">
            I'm currently accepting new projects for Q1 2025.
            Let's build something extraordinary together.
          </p>
        </motion.div>

        {/* Content grid */}
        <div className="grid lg:grid-cols-2 gap-16">
          {/* Contact form */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <form className="space-y-6">
              <div>
                <label className="text-sm tracking-wider text-muted-foreground block mb-2">YOUR NAME</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full bg-transparent border-b border-border py-4 text-xl focus:outline-none focus:border-primary transition-colors"
                  placeholder="John Doe"
                />
              </div>
              <div>
                <label className="text-sm tracking-wider text-muted-foreground block mb-2">EMAIL ADDRESS</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full bg-transparent border-b border-border py-4 text-xl focus:outline-none focus:border-primary transition-colors"
                  placeholder="john@example.com"
                />
              </div>
              <div>
                <label className="text-sm tracking-wider text-muted-foreground block mb-2">YOUR MESSAGE</label>
                <textarea
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  rows={4}
                  className="w-full bg-transparent border-b border-border py-4 text-xl focus:outline-none focus:border-primary transition-colors resize-none"
                  placeholder="Tell me about your project..."
                />
              </div>
              <MagneticButton className="btn-primary inline-flex items-center gap-3 mt-8">
                <Send className="w-5 h-5" />
                Send Message
                <ArrowRight className="w-5 h-5" />
              </MagneticButton>
            </form>
          </motion.div>

          {/* Contact info */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-12"
          >
            {/* Quick contact */}
            <div className="space-y-6">
              <h3 className="text-2xl font-display mb-6">QUICK CONTACT</h3>
              {[
                { icon: Mail, label: 'Email', value: 'hello@creativedev.io' },
                { icon: Phone, label: 'Phone', value: '+1 (555) 123-4567' },
                { icon: MapPin, label: 'Location', value: 'New York, NY' },
              ].map((item) => (
                <motion.div 
                  key={item.label}
                  className="flex items-center gap-4 group cursor-pointer"
                  whileHover={{ x: 10 }}
                >
                  <div className="w-12 h-12 rounded-xl bg-muted flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                    <item.icon className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <span className="text-xs text-muted-foreground">{item.label}</span>
                    <p className="text-foreground group-hover:text-primary transition-colors">{item.value}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Social links */}
            <div>
              <h3 className="text-2xl font-display mb-6">FOLLOW ME</h3>
              <div className="grid grid-cols-2 gap-4">
                {socials.map((social, i) => (
                  <motion.a
                    key={social.name}
                    href={social.url}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                    whileHover={{ scale: 1.02, backgroundColor: 'hsl(var(--primary) / 0.1)' }}
                    className="p-4 rounded-xl border border-border hover:border-primary transition-all"
                  >
                    <span className="font-display text-lg">{social.name}</span>
                    <p className="text-sm text-muted-foreground">{social.handle}</p>
                  </motion.a>
                ))}
              </div>
            </div>

            {/* Availability badge */}
            <motion.div
              className="p-6 rounded-2xl bg-gradient-to-br from-primary/20 to-secondary/10 border border-primary/20"
              animate={{ boxShadow: ['0 0 20px rgba(59, 130, 246, 0.1)', '0 0 40px rgba(59, 130, 246, 0.2)', '0 0 20px rgba(59, 130, 246, 0.1)'] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <div className="flex items-center gap-3 mb-2">
                <motion.span
                  className="w-3 h-3 rounded-full bg-green-500"
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                />
                <span className="text-sm font-medium text-green-500">AVAILABLE FOR WORK</span>
              </div>
              <p className="text-muted-foreground">
                Currently accepting new projects. Response time: within 24 hours.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Footer */}
      <footer className="max-w-7xl mx-auto px-6 mt-32">
        <div className="border-t border-border pt-12">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8">
            {/* Logo */}
            <motion.div 
              className="flex items-center gap-2"
              whileHover={{ scale: 1.02 }}
            >
              <span className="text-3xl font-display tracking-wider">CREATIVE</span>
              <motion.span 
                className="w-3 h-3 rounded-full bg-primary"
                animate={{ scale: [1, 1.3, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              <span className="text-3xl font-display tracking-wider text-outline">DEV</span>
            </motion.div>

            {/* Copyright */}
            <p className="text-muted-foreground text-sm">
              © 2024 Creative Developer. Crafted with passion and precision.
            </p>

            {/* Back to top */}
            <MagneticButton 
              className="w-12 h-12 rounded-full border border-border flex items-center justify-center hover:border-primary transition-colors"
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            >
              <ArrowRight className="w-5 h-5 -rotate-90" />
            </MagneticButton>
          </div>
        </div>
      </footer>
    </section>
  );
}
