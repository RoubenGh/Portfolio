"use client";

import { motion, useScroll, useSpring, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";

/**
 * Thin read-position indicator pinned to the top of the viewport.
 *
 * Reduced-motion users get nothing rendered at all (see the `mounted`
 * gating note in FadeIn.tsx for why useReducedMotion needs this guard —
 * it can disagree between the server render and the client's first
 * paint, which would otherwise trip a hydration mismatch).
 */
export default function ScrollProgress() {
  const prefersReducedMotion = useReducedMotion();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 200,
    damping: 32,
    restDelta: 0.001,
  });

  if (mounted && prefersReducedMotion) return null;

  return (
    <motion.div
      aria-hidden="true"
      className="fixed top-0 left-0 right-0 z-[60] h-[2px] origin-left pointer-events-none"
      style={{
        scaleX,
        background:
          "linear-gradient(to right, var(--text-faint), var(--text-primary))",
        opacity: 0.55,
      }}
    />
  );
}
