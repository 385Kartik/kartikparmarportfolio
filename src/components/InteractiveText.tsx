import { motion } from 'framer-motion';
import { useState, useCallback } from 'react';

interface InteractiveTextProps {
  text: string;
  className?: string;
}

const colors = [
  '#3b82f6', // blue
  '#f97316', // orange
  '#ec4899', // pink
  '#10b981', // green
  '#f59e0b', // amber
  '#8b5cf6', // purple
  '#06b6d4', // cyan
  '#ef4444', // red
];

export default function InteractiveText({ text, className = '' }: InteractiveTextProps) {
  const [letterColors, setLetterColors] = useState<{ [key: number]: string }>({});
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const handleLetterHover = useCallback((index: number) => {
    setHoveredIndex(index);
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    setLetterColors((prev) => ({ ...prev, [index]: randomColor }));
  }, []);

  return (
    <span className={className}>
      {text.split('').map((letter, index) => (
        <motion.span
          key={index}
          onMouseEnter={() => handleLetterHover(index)}
          onMouseLeave={() => setHoveredIndex(null)}
          animate={{
            scale: hoveredIndex === index ? 1.3 : 1,
            y: hoveredIndex === index ? -15 : 0,
            rotate: hoveredIndex === index ? [0, -5, 5, 0] : 0,
          }}
          transition={{ 
            duration: 0.3,
            rotate: { duration: 0.4 }
          }}
          className="inline-block cursor-default relative"
          style={{ 
            color: letterColors[index] || 'inherit',
            textShadow: letterColors[index] 
              ? `0 0 30px ${letterColors[index]}, 0 0 60px ${letterColors[index]}50` 
              : 'none',
            filter: hoveredIndex === index ? 'brightness(1.3)' : 'none',
          }}
        >
          {letter === ' ' ? '\u00A0' : letter}
          
          {/* Particle effect on hover */}
          {hoveredIndex === index && (
            <>
              {[...Array(3)].map((_, i) => (
                <motion.span
                  key={i}
                  className="absolute w-1 h-1 rounded-full pointer-events-none"
                  style={{ backgroundColor: letterColors[index] }}
                  initial={{ 
                    x: 0, y: 0, opacity: 1, scale: 1 
                  }}
                  animate={{ 
                    x: (Math.random() - 0.5) * 40,
                    y: -30 - Math.random() * 20,
                    opacity: 0,
                    scale: 0
                  }}
                  transition={{ duration: 0.6 }}
                />
              ))}
            </>
          )}
        </motion.span>
      ))}
    </span>
  );
}
