"use client";

import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section className="pt-[140px] pb-[100px]">
      <div className="mx-auto max-w-[1100px] px-6">
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
          className="text-[56px] font-semibold leading-[1.1] tracking-[-1px] text-black max-w-[700px]"
        >
          I build systems, infrastructure &amp; automation.
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.7,
            delay: 0.15,
            ease: [0.25, 0.1, 0.25, 1],
          }}
          className="mt-6 text-[18px] leading-[1.6] text-[#666] max-w-[600px]"
        >
          Systems Engineer, DevOps specialist, and Founder. I build scalable
          systems, automation pipelines, and production-grade infrastructure.
          Based in Los Angeles.
        </motion.p>
      </div>
    </section>
  );
}
