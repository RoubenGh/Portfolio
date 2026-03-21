"use client";

import { motion } from "framer-motion";
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
  return (
    <motion.div
      initial={{ opacity: 0, y, ...(scale ? { scale: 0.97 } : {}) }}
      whileInView={{ opacity: 1, y: 0, ...(scale ? { scale: 1 } : {}) }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 1, delay, ease }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
