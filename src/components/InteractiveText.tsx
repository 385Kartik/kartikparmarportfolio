import { motion } from 'framer-motion';
import { useState } from 'react';

interface InteractiveTextProps {
  text: string;
  className?: string;
}

const colors = [
  'hsl(var(--primary))',
  'hsl(var(--secondary))',
  'hsl(var(--accent))',
  '#ec4899',
  '#10b981',
  '#f59e0b',
];

export default function InteractiveText({ text, className = '' }: InteractiveTextProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [letterColors, setLetterColors] = useState<{ [key: number]: string }>({});

  const handleLetterHover = (index: number) => {
    setHoveredIndex(index);
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    setLetterColors((prev) => ({ ...prev, [index]: randomColor }));
  };

  return (
    <span className={className}>
      {text.split('').map((letter, index) => (
        <motion.span
          key={index}
          onMouseEnter={() => handleLetterHover(index)}
          onMouseLeave={() => setHoveredIndex(null)}
          animate={{
            color: letterColors[index] || 'inherit',
            scale: hoveredIndex === index ? 1.2 : 1,
            y: hoveredIndex === index ? -5 : 0,
          }}
          transition={{ duration: 0.2 }}
          className="inline-block cursor-default"
          style={{ 
            color: letterColors[index],
            textShadow: letterColors[index] ? `0 0 20px ${letterColors[index]}` : 'none'
          }}
        >
          {letter === ' ' ? '\u00A0' : letter}
        </motion.span>
      ))}
    </span>
  );
}
