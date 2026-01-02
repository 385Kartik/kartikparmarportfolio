import { motion } from 'framer-motion';
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import MagneticButton from './MagneticButton';

const navItems = [
  { name: 'SERVICES', href: '/#services' },
  { name: 'PROJECTS', href: '/#projects' },
  { name: 'ABOUT', href: '/about' },
  { name: 'CONTACT', href: '/#contact' },
];

export default function Navbar() {
  const location = useLocation();
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);

  const handleNavClick = (href: string) => {
    if (href.startsWith('/#')) {
      const section = href.replace('/#', '');
      if (location.pathname === '/') {
        const element = document.querySelector(`#${section}`);
        element?.scrollIntoView({ behavior: 'smooth' });
      } else {
        window.location.href = href;
      }
    }
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
        <Link to="/">
          <motion.div
            className="flex items-center gap-2 cursor-pointer"
            whileHover={{ scale: 1.02 }}
          >
            <span className="text-2xl font-display tracking-wider">PORTFOLIO</span>
            <motion.span 
              className="w-2 h-2 rounded-full bg-primary"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </motion.div>
        </Link>

        {/* Navigation */}
        <ul className="hidden md:flex gap-10">
          {navItems.map((item) => (
            <li key={item.name}>
              {item.href.startsWith('/') && !item.href.startsWith('/#') ? (
                <Link to={item.href}>
                  <motion.span
                    onMouseEnter={() => setHoveredItem(item.name)}
                    onMouseLeave={() => setHoveredItem(null)}
                    className="text-sm tracking-widest text-muted-foreground hover:text-foreground transition-colors cursor-pointer relative"
                    whileHover={{ y: -2 }}
                  >
                    {item.name}
                    <motion.span
                      className="absolute -bottom-1 left-0 h-0.5 bg-primary"
                      initial={{ width: 0 }}
                      animate={{ width: hoveredItem === item.name ? '100%' : 0 }}
                      transition={{ duration: 0.2 }}
                    />
                  </motion.span>
                </Link>
              ) : (
                <motion.a
                  href={item.href}
                  onMouseEnter={() => setHoveredItem(item.name)}
                  onMouseLeave={() => setHoveredItem(null)}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick(item.href);
                  }}
                  className="text-sm tracking-widest text-muted-foreground hover:text-foreground transition-colors relative"
                  whileHover={{ y: -2 }}
                >
                  {item.name}
                  <motion.span
                    className="absolute -bottom-1 left-0 h-0.5 bg-primary"
                    initial={{ width: 0 }}
                    animate={{ width: hoveredItem === item.name ? '100%' : 0 }}
                    transition={{ duration: 0.2 }}
                  />
                </motion.a>
              )}
            </li>
          ))}
        </ul>

        {/* CTA Button */}
        <MagneticButton className="btn-primary text-sm tracking-wider">
          GET IN TOUCH
        </MagneticButton>
      </div>
    </motion.nav>
  );
}
