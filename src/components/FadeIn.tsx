"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

const ease = [0.165, 0.84, 0.44, 1] as const;

interface FadeInProps {
  children: ReactNode;
  delay?: number;
  className?: string;
  y?: number;
}

export default function FadeIn({
  children,
  delay = 0,
  className,
  y = 60,
}: FadeInProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.9, delay, ease }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
