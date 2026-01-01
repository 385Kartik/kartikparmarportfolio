import { useEffect, useState } from 'react';
import { motion, useSpring } from 'framer-motion';

export default function CursorFollower() {
  const [isHovering, setIsHovering] = useState(false);

  const springConfig = { damping: 30, stiffness: 400 };
  const cursorX = useSpring(0, springConfig);
  const cursorY = useSpring(0, springConfig);
  const trailX = useSpring(0, { damping: 50, stiffness: 200 });
  const trailY = useSpring(0, { damping: 50, stiffness: 200 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      trailX.set(e.clientX);
      trailY.set(e.clientY);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.tagName === 'A' || target.tagName === 'BUTTON' || target.closest('a') || target.closest('button')) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, [cursorX, cursorY, trailX, trailY]);

  return (
    <>
      {/* Trail circle */}
      <motion.div
        className="fixed pointer-events-none z-[9998] rounded-full border border-primary/50"
        style={{
          x: trailX,
          y: trailY,
          translateX: '-50%',
          translateY: '-50%',
          width: isHovering ? 60 : 40,
          height: isHovering ? 60 : 40,
        }}
      />
      
      {/* Main cursor dot */}
      <motion.div
        className="fixed pointer-events-none z-[9999] rounded-full bg-primary"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: '-50%',
          translateY: '-50%',
          width: 8,
          height: 8,
        }}
      />
    </>
  );
}
