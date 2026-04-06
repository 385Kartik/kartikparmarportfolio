import { useState } from 'react';
import { motion } from 'framer-motion';

interface InteractiveTextProps {
  text: string;
  className?: string;
  style?: React.CSSProperties; 
}

export default function InteractiveText({ text, className, style }: InteractiveTextProps) {
  const [hovered, setHovered] = useState(false);
  const characters = text.split('');

  return (
    <span 
      className={`inline-block relative cursor-default overflow-hidden ${className}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={style}
    >
      <span className="opacity-0">{text}</span>
      <div className="absolute inset-0 flex">
        {characters.map((char, i) => (
          <motion.span
            key={i}
            initial={{ y: 0 }}
            animate={{ y: hovered ? '-100%' : '0%' }}
            transition={{ duration: 0.5, ease: [0.33, 1, 0.68, 1], delay: 0.02 * i }}
            className="inline-block"
          >
            {char === ' ' ? '\u00A0' : char}
          </motion.span>
        ))}
      </div>
      <div className="absolute inset-0 flex translate-y-full">
        {characters.map((char, i) => (
          <motion.span
            key={i}
            initial={{ y: 0 }}
            animate={{ y: hovered ? '-100%' : '0%' }}
            transition={{ duration: 0.5, ease: [0.33, 1, 0.68, 1], delay: 0.02 * i }}
            className="inline-block"
          >
            {char === ' ' ? '\u00A0' : char}
          </motion.span>
        ))}
      </div>
    </span>
  );
}