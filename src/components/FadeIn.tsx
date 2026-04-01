"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ReactNode } from "react";

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
  const reduced = useReducedMotion();
  return (
    <motion.div
      initial={{ opacity: 0, y: reduced ? 0 : y, ...(scale && !reduced ? { scale: 0.97 } : {}) }}
      whileInView={{ opacity: 1, y: 0, ...(scale ? { scale: 1 } : {}) }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: reduced ? 0.01 : 1, delay: reduced ? 0 : delay, ease }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
