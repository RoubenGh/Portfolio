"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ReactNode, useEffect, useState } from "react";

const ease = [0.165, 0.84, 0.44, 1] as const;

interface FadeInProps {
  children: ReactNode;
  delay?: number;
  className?: string;
  y?: number;
  scale?: boolean;
}

export default function FadeIn({
  children,
  delay = 0,
  className,
  y = 60,
  scale = false,
}: FadeInProps) {
  // useReducedMotion() reads matchMedia, which doesn't exist on the server.
  // It resolves to `null` during SSR and to a real boolean on the client's
  // very first render, so using it directly makes the server and client
  // markup disagree and breaks hydration. Gate it behind a `mounted` flag
  // that is false on both the server render and the client's first render,
  // then flips true in an effect — by that point the real preference is
  // safe to read and reduced-motion users still get the non-animated state
  // before anything (including whileInView) can trigger the animation.
  const prefersReducedMotion = useReducedMotion();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const reduced = mounted && !!prefersReducedMotion;

  return (
    <motion.div
      initial={{ opacity: 0, y: reduced ? 0 : y, ...(scale && !reduced ? { scale: 0.97 } : {}) }}
      whileInView={{ opacity: 1, y: 0, ...(scale ? { scale: 1 } : {}) }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: reduced ? 0.01 : 0.6, delay: reduced ? 0 : delay, ease }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
