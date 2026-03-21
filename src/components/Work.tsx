"use client";

import { motion } from "framer-motion";
import FadeIn from "./FadeIn";

const ease = [0.165, 0.84, 0.44, 1] as const;

const projects = [
  {
    title: "RLA Studios",
    meta: "Founder — 2024",
    description:
      "Scalable content production & delivery platform",
    color:
      "radial-gradient(circle at 50% 0%, rgba(127,207,255,0.12), transparent 65%), radial-gradient(circle at 50% 0%, rgba(0,51,85,0.5), transparent)",
    accent: "rgba(127,207,255,0.25)",
  },
  {
    title: "AI Ticketing System",
    meta: "Internal — 2024",
    description:
      "Email parsing and intelligent automated response engine",
    color:
      "radial-gradient(circle at 50% 0%, rgba(255,255,255,0.08), transparent 55%)",
    accent: "rgba(255,255,255,0.2)",
  },
  {
    title: "Infrastructure Systems",
    meta: "Ongoing — 2023",
    description:
      "Kubernetes, AWS, CI/CD, and zero-downtime deployments",
    color:
      "radial-gradient(circle at 50% 0%, rgba(8,144,251,0.1), transparent 55%), radial-gradient(circle at 50% 0%, rgba(158,5,214,0.08), transparent)",
    accent: "rgba(8,144,251,0.25)",
  },
  {
    title: "ChefPickle",
    meta: "Client — 2024",
    description:
      "Deep debugging and legacy system stabilization",
    color:
      "radial-gradient(circle at 50% 0%, rgba(0,106,195,0.15), transparent 55%)",
    accent: "rgba(0,106,195,0.25)",
  },
];

function ProjectCard({
  project,
  index,
}: {
  project: (typeof projects)[0];
  index: number;
}) {
  return (
    <FadeIn delay={index * 0.08} y={60}>
      <motion.div
        className="group relative rounded-[20px] p-[6px] cursor-pointer"
        style={{
          background: "rgba(242,242,242,0.015)",
          outline: "1px solid rgba(242,242,242,0.03)",
          boxShadow: "0 32px 64px rgba(0,0,0,0.35)",
        }}
        whileHover={{ y: -3 }}
        transition={{ duration: 0.45, ease }}
      >
        {/* Glare */}
        <div className="glare-line absolute top-0 left-[12%] right-[12%] z-10 opacity-0 group-hover:opacity-60 transition-opacity duration-600" />

        {/* Inner card */}
        <div
          className="relative rounded-[14px] overflow-hidden transition-[border-color] duration-500"
          style={{
            background: "linear-gradient(185deg, #161616, var(--color-bg))",
            border: "1px solid rgba(242,242,242,0.05)",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = project.accent;
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = "rgba(242,242,242,0.05)";
          }}
        >
          {/* Color glow */}
          <div
            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-600 pointer-events-none"
            style={{ backgroundImage: project.color }}
          />

          {/* Content — tight, editorial */}
          <div className="relative z-10 px-6 py-5 md:px-7 md:py-6">
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-baseline gap-3 min-w-0">
                <h3 className="text-[18px] md:text-[20px] font-medium tracking-[-0.02em] text-[var(--color-fg)] shrink-0">
                  {project.title}
                </h3>
                <span className="text-[12px] tracking-[0.2px] text-[var(--color-fg-30)] shrink-0">
                  {project.meta}
                </span>
              </div>
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                className="shrink-0 text-[var(--color-fg-15)] group-hover:text-[var(--color-fg-50)] transition-all duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              >
                <path
                  d="M7 17L17 7M17 7H10M17 7v7"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <p className="mt-2 text-[13px] md:text-[14px] leading-[1.5] tracking-[0.1px] text-[var(--color-fg-30)] group-hover:text-[var(--color-fg-50)] transition-colors duration-500">
              {project.description}
            </p>
          </div>
        </div>
      </motion.div>
    </FadeIn>
  );
}

export default function Work() {
  return (
    <section id="work" className="relative pt-4 pb-40 md:pb-56">
      <div className="mx-auto max-w-[840px] px-4 md:px-0">
        <FadeIn>
          <span className="text-[11px] uppercase tracking-[0.15em] text-[var(--color-fg-15)] block mb-12 md:mb-14">
            Selected Work
          </span>
        </FadeIn>

        <div className="flex flex-col gap-4 md:gap-5">
          {projects.map((project, i) => (
            <ProjectCard key={project.title} project={project} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
