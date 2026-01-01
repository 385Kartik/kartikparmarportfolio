import { motion } from 'framer-motion';
import { useState } from 'react';

const navItems = [
  { name: 'SERVICES', href: '#services' },
  { name: 'PROJECTS', href: '#projects' },
  { name: 'ABOUT', href: '#about' },
  { name: 'CONTACT', href: '#contact' },
];

export default function Navbar() {
  const [activeSection, setActiveSection] = useState('');

  const handleClick = (href: string) => {
    const section = href.replace('#', '');
    setActiveSection(section);
    const element = document.querySelector(href);
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
      className="fixed top-0 left-0 right-0 z-50 px-8 py-6"
    >
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Logo */}
        <motion.a
          href="#"
          className="flex items-center gap-2"
          whileHover={{ scale: 1.02 }}
        >
          <span className="text-2xl font-display tracking-wider">PORTFOLIO</span>
          <span className="w-2 h-2 rounded-full bg-primary" />
        </motion.a>

        {/* Navigation */}
        <ul className="hidden md:flex gap-10">
          {navItems.map((item) => (
            <li key={item.name}>
              <motion.a
                href={item.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleClick(item.href);
                }}
                className="text-sm tracking-widest text-muted-foreground hover:text-foreground transition-colors"
                whileHover={{ y: -2 }}
              >
                {item.name}
              </motion.a>
            </li>
          ))}
        </ul>

        {/* CTA Button */}
        <motion.button
          className="btn-primary text-sm tracking-wider"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          GET IN TOUCH
        </motion.button>
      </div>
    </motion.nav>
  );
}
