"use client";

import { motion } from "framer-motion";
import FadeIn from "./FadeIn";

const ease = [0.165, 0.84, 0.44, 1] as const;

const projects = [
  {
    title: "RLA Studios",
    company: "RLA Studios, '24",
    description:
      "End-to-end media automation platform — from data scraping to invoicing, managed through a single admin panel.",
    color:
      "radial-gradient(circle at 50% 0%, rgba(127,207,255,0.15), transparent 70%), radial-gradient(circle at 50% 0%, rgba(0,51,85,0.6), transparent)",
    accentBorder: "rgba(127,207,255,0.3)",
  },
  {
    title: "AI Ticketing System",
    company: "Internal Tool, '24",
    description:
      "Email parsing and automated response system using internal knowledge bases. Tickets classified, routed, and answered intelligently.",
    color:
      "radial-gradient(circle at 50% 0%, rgba(255,255,255,0.12), transparent 60%)",
    accentBorder: "rgba(255,255,255,0.25)",
  },
  {
    title: "Infrastructure Systems",
    company: "Ongoing, '23–Present",
    description:
      "Production-grade cloud infrastructure — Kubernetes, AWS, SSL automation, CI/CD pipelines, and zero-downtime deployments.",
    color:
      "radial-gradient(circle at 50% 0%, rgba(8,144,251,0.15), transparent 60%), radial-gradient(circle at 50% 0%, rgba(158,5,214,0.12), transparent)",
    accentBorder: "rgba(8,144,251,0.3)",
  },
  {
    title: "ChefPickle",
    company: "Client Work, '24",
    description:
      "Deep debugging and legacy system stabilization. Root cause analysis, performance profiling, and systematic resolution of critical production issues.",
    color:
      "radial-gradient(circle at 50% 0%, rgba(0,106,195,0.2), transparent 60%)",
    accentBorder: "rgba(0,106,195,0.3)",
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
    <FadeIn delay={index * 0.1} y={80}>
      <motion.div
        className="group relative rounded-[24px] p-2 cursor-pointer"
        style={{
          background: "rgba(242,242,242,0.02)",
          outline: "1px solid rgba(242,242,242,0.04)",
          boxShadow: "0 40px 80px rgba(0,0,0,0.4)",
        }}
        whileHover={{ y: -4 }}
        transition={{ duration: 0.4, ease }}
      >
        {/* Outer glare */}
        <div className="glare-line absolute top-0 left-[10%] right-[10%] z-10 opacity-50 group-hover:opacity-100 transition-opacity duration-500" />

        {/* Inner card */}
        <div
          className="relative rounded-[16px] overflow-hidden transition-[border-color] duration-500"
          style={{
            background: "linear-gradient(190deg, #1a1a1a, var(--color-bg))",
            border: "1px solid #2a2a2a",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = project.accentBorder;
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = "#2a2a2a";
          }}
        >
          {/* Inner glare */}
          <div className="glare-line absolute top-0 left-[15%] right-[15%] z-10 opacity-30 group-hover:opacity-60 transition-opacity duration-500" />

          {/* Color glow on hover */}
          <div
            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
            style={{ backgroundImage: project.color }}
          />

          {/* Content */}
          <div className="relative z-10 px-6 pt-6 pb-8 md:px-8 md:pt-7 md:pb-10">
            {/* Header row */}
            <div className="flex items-start justify-between gap-4">
              <div>
                <h3 className="text-[22px] md:text-[24px] font-medium tracking-[-0.01em] text-[var(--color-fg)]">
                  {project.title}
                </h3>
                <p className="mt-1.5 text-[13px] md:text-[14px] leading-[20px] tracking-[0.2px]">
                  <span className="text-[var(--color-fg)] opacity-80 font-medium">
                    {project.company}
                  </span>
                  <span className="text-[var(--color-fg-50)]">
                    {" — "}
                    {project.description}
                  </span>
                </p>
              </div>
              <div className="shrink-0 mt-1">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  className="text-[var(--color-fg-30)] group-hover:text-[var(--color-fg)] transition-all duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
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
            </div>
          </div>
        </div>
      </motion.div>
    </FadeIn>
  );
}

export default function Work() {
  return (
    <section id="work" className="relative pt-8 pb-48">
      <div className="mx-auto max-w-[880px] px-4 md:px-0">
        <FadeIn>
          <div className="flex items-baseline gap-4 mb-16">
            <span className="text-[11px] uppercase tracking-[0.15em] text-[var(--color-fg-30)]">
              Selected Work
            </span>
            <div className="flex-1 h-px bg-[var(--color-fg-05)]" />
          </div>
        </FadeIn>

        <div className="flex flex-col gap-12">
          {projects.map((project, i) => (
            <ProjectCard key={project.title} project={project} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
