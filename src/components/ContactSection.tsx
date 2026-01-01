import { motion } from 'framer-motion';
import { Mail, MapPin, Phone, Send, Github, Linkedin, Twitter } from 'lucide-react';

const contactInfo = [
  { icon: Mail, label: 'Email', value: 'hello@portfolio.dev' },
  { icon: Phone, label: 'Phone', value: '+1 234 567 890' },
  { icon: MapPin, label: 'Location', value: 'San Francisco, CA' },
];

const socials = [
  { icon: Github, label: 'GitHub', href: '#' },
  { icon: Linkedin, label: 'LinkedIn', href: '#' },
  { icon: Twitter, label: 'Twitter', href: '#' },
];

export default function ContactSection() {
  return (
    <section id="contact" className="relative min-h-screen py-32 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <span className="inline-block px-4 py-2 glass-card text-sm text-primary font-medium mb-6">
            Get In Touch
          </span>
          <h2 className="text-5xl md:text-7xl font-heading font-bold mb-6">
            Let's <span className="gradient-text">Connect</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Have a project in mind? Let's discuss how we can work together to create something amazing.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -100 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <form className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <motion.div whileFocus={{ scale: 1.02 }}>
                  <label className="block text-sm font-medium mb-2">Name</label>
                  <input
                    type="text"
                    placeholder="John Doe"
                    className="w-full px-4 py-3 glass-card border border-border/50 rounded-lg focus:outline-none focus:border-primary transition-colors bg-transparent text-foreground placeholder:text-muted-foreground"
                  />
                </motion.div>
                <div>
                  <label className="block text-sm font-medium mb-2">Email</label>
                  <input
                    type="email"
                    placeholder="john@example.com"
                    className="w-full px-4 py-3 glass-card border border-border/50 rounded-lg focus:outline-none focus:border-primary transition-colors bg-transparent text-foreground placeholder:text-muted-foreground"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Subject</label>
                <input
                  type="text"
                  placeholder="Project Inquiry"
                  className="w-full px-4 py-3 glass-card border border-border/50 rounded-lg focus:outline-none focus:border-primary transition-colors bg-transparent text-foreground placeholder:text-muted-foreground"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Message</label>
                <textarea
                  rows={6}
                  placeholder="Tell me about your project..."
                  className="w-full px-4 py-3 glass-card border border-border/50 rounded-lg focus:outline-none focus:border-primary transition-colors bg-transparent text-foreground placeholder:text-muted-foreground resize-none"
                />
              </div>
              <motion.button
                type="submit"
                className="w-full px-8 py-4 bg-primary text-primary-foreground font-semibold rounded-lg inline-flex items-center justify-center gap-2"
                whileHover={{ scale: 1.02, boxShadow: '0 0 30px rgba(0, 212, 255, 0.5)' }}
                whileTap={{ scale: 0.98 }}
              >
                Send Message
                <Send className="w-5 h-5" />
              </motion.button>
            </form>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: 100 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div className="glass-card p-8 space-y-6">
              <h3 className="text-2xl font-heading font-bold">Contact Information</h3>
              {contactInfo.map((item, index) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, x: 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="flex items-center gap-4"
                >
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                    <item.icon className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground">{item.label}</div>
                    <div className="font-medium">{item.value}</div>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="glass-card p-8">
              <h3 className="text-2xl font-heading font-bold mb-6">Follow Me</h3>
              <div className="flex gap-4">
                {socials.map((social, index) => (
                  <motion.a
                    key={social.label}
                    href={social.href}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    whileHover={{ scale: 1.1, y: -5 }}
                    className="w-14 h-14 rounded-xl glass-card flex items-center justify-center border border-border/50 hover:border-primary transition-colors"
                  >
                    <social.icon className="w-6 h-6" />
                  </motion.a>
                ))}
              </div>
            </div>

            {/* Availability badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="glass-card p-6 flex items-center gap-4"
            >
              <div className="relative">
                <div className="w-4 h-4 rounded-full bg-green-500" />
                <div className="absolute inset-0 w-4 h-4 rounded-full bg-green-500 animate-ping" />
              </div>
              <div>
                <div className="font-medium">Available for new projects</div>
                <div className="text-sm text-muted-foreground">Response time: 24 hours</div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Footer */}
      <motion.footer
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="mt-32 text-center text-muted-foreground"
      >
        <p>© 2024 Portfolio. Crafted with ❤️ and lots of ☕</p>
      </motion.footer>

      {/* Gradient overlays */}
      <div className="absolute top-1/2 left-1/4 w-72 h-72 bg-primary/10 rounded-full blur-[100px] -z-10" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-secondary/10 rounded-full blur-[128px] -z-10" />
    </section>
  );
}
