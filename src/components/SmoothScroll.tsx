"use client"

import { ReactLenis } from '@studio-freight/react-lenis'

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  return (
    <ReactLenis
      root
      options={{
        // Mobile-like Momentum Settings
        lerp: 0.12,         // Tighter, faster response = less frame budget used
        duration: 0.8,      // Shorter slide duration
        smoothWheel: true,
        wheelMultiplier: 1,   // Standard multiplier
        touchMultiplier: 1.5,
        infinite: false,
      }}
    >
      {children}
    </ReactLenis>
  )
}