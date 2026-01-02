import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import MagneticButton from './MagneticButton';

export default function ContactSection() {
  return (
    <section id="contact" className="relative py-32 overflow-hidden bg-background">
      {/* CTA Section */}
      <div className="max-w-7xl mx-auto px-6">
        <motion.div 
          className="bg-muted rounded-3xl p-12 md:p-20 text-center relative overflow-hidden"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          whileHover={{ scale: 1.01 }}
        >
          {/* Background decoration */}
          <div className="absolute inset-0 opacity-30">
            <motion.div 
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full"
              style={{ background: 'radial-gradient(circle, hsl(var(--primary) / 0.2), transparent)' }}
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 4, repeat: Infinity }}
            />
          </div>
          
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="relative z-10"
          >
            <h2 className="text-6xl md:text-9xl font-display leading-none mb-4">
              READY
              <br />
              TO
              <br />
              <span className="text-primary italic">ELEVATE?</span>
            </h2>
            
            <p className="text-muted-foreground text-lg max-w-lg mx-auto mb-12">
              We are currently accepting new projects for Q1 2025.
              <br />
              Let's build something that matters.
            </p>

            <MagneticButton
              href="#"
              className="btn-primary inline-flex items-center gap-4 text-lg"
            >
              START A CONVERSATION
              <ArrowRight className="w-6 h-6" />
            </MagneticButton>
          </motion.div>
        </motion.div>
      </div>

      {/* Footer */}
      <footer className="max-w-7xl mx-auto px-6 mt-32">
        <div className="border-t border-border pt-12">
          <div className="grid md:grid-cols-3 gap-12">
            {/* Logo & Description */}
            <div>
              <div className="flex items-center gap-2 mb-6">
                <span className="text-2xl font-display tracking-wider">PORTFOLIO</span>
                <motion.span 
                  className="w-2 h-2 rounded-full bg-primary"
                  animate={{ scale: [1, 1.3, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              </div>
              <p className="text-muted-foreground max-w-xs">
                Engineering the next generation of digital products with precision and artistic flair.
              </p>
            </div>

            {/* Navigation */}
            <div>
              <h4 className="text-sm tracking-[0.2em] text-muted-foreground mb-6">NAVIGATE</h4>
              <ul className="space-y-4">
                {['Our Services', 'Success Stories', 'About Us', 'Contact'].map((item) => (
                  <li key={item}>
                    <motion.a 
                      href="#" 
                      className="text-foreground/80 hover:text-primary transition-colors"
                      whileHover={{ x: 5 }}
                    >
                      {item}
                    </motion.a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h4 className="text-sm tracking-[0.2em] text-muted-foreground mb-6">CONTACT</h4>
              <ul className="space-y-4">
                <li>
                  <motion.a 
                    href="mailto:hello@portfolio.dev" 
                    className="text-foreground/80 hover:text-primary transition-colors"
                    whileHover={{ x: 5 }}
                  >
                    hello@portfolio.dev
                  </motion.a>
                </li>
                <li className="text-muted-foreground">
                  London / NYC / Remote
                </li>
              </ul>
            </div>
          </div>

          {/* Copyright */}
          <div className="mt-16 pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-muted-foreground text-sm">
              © 2024 Portfolio. All rights reserved.
            </p>
            <div className="flex gap-6">
              {['Twitter', 'LinkedIn', 'Dribbble', 'GitHub'].map((social) => (
                <motion.a
                  key={social}
                  href="#"
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  whileHover={{ y: -3 }}
                >
                  {social}
                </motion.a>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </section>
  );
}
