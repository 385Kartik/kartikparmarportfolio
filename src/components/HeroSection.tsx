import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { ArrowRight } from "lucide-react";
import MagneticButton from "./MagneticButton";
import Scene3D from "./Scene3D";

/* ---------- LETTER COMPONENT (CALM + PREMIUM) ---------- */
const HoverLetter = ({ letter }: { letter: string }) => (
  <motion.span
    className="inline-block select-none"
    initial={{ y: 0 }}
    whileHover={{
      y: -3,
      scale: 1.05,
      color: "#be8a5fff",
      textShadow: "0 0 8px rgba(251,146,60,0.4)",
    }}
    transition={{ type: "spring", stiffness: 200, damping: 18 }}
    style={{ color: "#c2410c" }}
  >
    {letter}
  </motion.span>
);

export default function HeroSection() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  const text = "KARTIK    PARMAR".split("");

  return (
    <section
      ref={ref}
      id="home"
      className="relative h-[calc(100vh+6rem)] w-full overflow-hidden flex items-center justify-center"
    >
      {/* BACKGROUND SCENE */}
      <Scene3D />

      {/* HARD FOCUS GRADIENT */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-black/70 z-0" />

      {/* HERO CONTENT */}
      <motion.div
        style={{ y, opacity }}
        className="relative z-10 flex flex-col items-center text-center"
      >
        {/* TEXT ISOLATION DOME */}
        <div className="relative px-10 py-8 rounded-full bg-black/60 backdrop-blur-xl">
          <h1 className="text-[14vw] md:text-[10vw] font-black leading-none tracking-tight flex gap-2">
            {text.map((l, i) => (
              <HoverLetter key={i} letter={l} />
            ))}
          </h1>

          {/* SOFT GLOW */}
          <div className="absolute inset-0 -z-10 bg-orange-500/10 blur-[50px] rounded-full" />
        </div>

        {/* SUBTEXT */}
        <motion.p
          className="mt-6 text-sm md:text-lg tracking-[0.25em] uppercase text-zinc-400"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
        >
          Building the{" "}
          <span className="text-green-500 font-bold underline decoration-orange-500 decoration-2 underline-offset-4">
            Unimaginable
          </span>
        </motion.p>

        {/* CTA */}
        <motion.div
          className="mt-12"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
        >
          <MagneticButton
            href="#projects"
            className="px-10 py-4 rounded-full border border-white/15 bg-white/5 backdrop-blur-md hover:border-orange-500/50 hover:bg-orange-500/10 transition-all"
          >
            <span className="flex items-center gap-3 text-xs tracking-widest uppercase text-white font-bold">
              Enter the Void
              <ArrowRight className="w-4 h-4" />
            </span>
          </MagneticButton>
        </motion.div>
      </motion.div>
    </section>
  );
}
