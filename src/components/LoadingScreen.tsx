import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';

const codeSnippets = [
  "INITIALIZING_CORE_SYSTEMS...",
  "LOADING_ASSETS_Manifest.json...",
  "CONNECTING_TO_SATELLITE_UPLINK...",
  "DECRYPTING_SECURE_DATA...",
  "OPTIMIZING_NEURAL_NETWORKS...",
  "ESTABLISHING_SECURE_CONNECTION...",
  "RENDER_ENGINE_STARTUP...",
  "ALLOCATING_VIRTUAL_MEMORY...",
  "BYPASSING_FIREWALL_PROTOCOLS...",
  "SYSTEM_OVERRIDE_ACTIVE...",
];

export default function LoadingScreen() {
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const [currentSnippet, setCurrentSnippet] = useState(0);

  useEffect(() => {
    // 1. CHECK: Have we loaded this session before?
    const hasLoaded = sessionStorage.getItem('hasLoaded');

    if (hasLoaded) {
      // If yes, stop immediately.
      setIsLoading(false);
      return;
    }

    // 2. If not, Run the Progress Timer
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          
          // 3. SET FLAG: Remember that we have loaded
          sessionStorage.setItem('hasLoaded', 'true');
          
          setTimeout(() => setIsLoading(false), 800);
          return 100;
        }
        // Randomize speed for "real" feeling
        const jump = Math.random() > 0.8 ? 10 : 1; 
        return Math.min(prev + jump, 100);
      });
    }, 50);

    // Text Scramble Timer
    const textTimer = setInterval(() => {
      setCurrentSnippet((prev) => (prev + 1) % codeSnippets.length);
    }, 150);

    return () => {
      clearInterval(timer);
      clearInterval(textTimer);
    };
  }, []);

  // 4. PREVENT RENDER: If not loading, return nothing immediately to prevent flash
  if (!isLoading) return null;

  return (
    <AnimatePresence mode='wait'>
      {isLoading && (
        <motion.div
          className="fixed inset-0 z-[100] bg-black text-white overflow-hidden flex flex-col justify-between p-6 md:p-10 cursor-wait"
          exit={{ 
            y: '-100%', 
            transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] } // "Shutters Up" effect
          }}
        >
          {/* Top Bar: Random Data */}
          <div className="flex justify-between items-start font-mono text-xs md:text-sm opacity-50">
            <div className="flex flex-col gap-1">
              <span>SYS_ID: 0x9382</span>
              <span>LOC: LOCALHOST</span>
            </div>
            <div className="text-right">
               <span>MEM: 64TB</span>
               <br/>
               <span>CPU: OVERCLOCKED</span>
            </div>
          </div>

          {/* Center: MASSIVE Counter */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <motion.h1 
              className="text-[25vw] leading-none font-display font-bold tracking-tighter"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
            >
              {progress}
            </motion.h1>
          </div>

          {/* Bottom Bar: Loading Text */}
          <div className="relative z-10 flex justify-between items-end">
            <div className="font-mono text-sm md:text-base max-w-md h-6 overflow-hidden">
              <span className="inline-block animate-pulse text-primary mr-2">➜</span>
              {codeSnippets[currentSnippet]}
            </div>
            
            {/* Visual Progress Bar (Thin line) */}
            <div className="w-32 md:w-64 h-[1px] bg-white/20 relative overflow-hidden">
              <motion.div 
                className="absolute inset-0 bg-primary"
                initial={{ x: '-100%' }}
                animate={{ x: `${progress - 100}%` }}
              />
            </div>
          </div>

          {/* Background Grid (Subtle) */}
          <div 
            className="absolute inset-0 opacity-10 pointer-events-none"
            style={{
              backgroundImage: 'linear-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.1) 1px, transparent 1px)',
              backgroundSize: '40px 40px'
            }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}