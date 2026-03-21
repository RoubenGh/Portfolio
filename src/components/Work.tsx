"use client";

import { motion } from "framer-motion";
import FadeIn from "./FadeIn";

const ease = [0.165, 0.84, 0.44, 1] as const;

const projects = [
  {
    title: "RLA Studios",
    meta: "Founder — 2024",
    description:
      "End-to-end media automation platform for real estate content production. Data scraping, file management, invoicing — one admin panel.",
    color:
      "radial-gradient(circle at 50% 0%, rgba(127,207,255,0.2), transparent 70%), radial-gradient(circle at 50% 0%, rgba(0,51,85,0.6), transparent)",
    accent: "rgba(127,207,255,0.3)",
    preview: {
      bg: "linear-gradient(135deg, #0f1a2e 0%, #0a1628 40%, #061020 100%)",
      label: "RLA",
      labelColor: "rgba(127,207,255,0.7)",
    },
  },
  {
    title: "AI Ticketing System",
    meta: "Internal Tool — 2024",
    description:
      "Email parsing and automated response system using internal knowledge bases. Tickets classified, routed, and answered intelligently.",
    color:
      "radial-gradient(circle at 50% 0%, rgba(255,255,255,0.1), transparent 60%)",
    accent: "rgba(255,255,255,0.2)",
    preview: {
      bg: "linear-gradient(135deg, #1a1a1a 0%, #111 40%, #0a0a0a 100%)",
      label: "AI",
      labelColor: "rgba(242,242,242,0.5)",
    },
  },
  {
    title: "Infrastructure Systems",
    meta: "Ongoing — 2023",
    description:
      "Production-grade cloud infrastructure. Kubernetes, AWS, SSL automation, CI/CD pipelines, and zero-downtime deployments at scale.",
    color:
      "radial-gradient(circle at 50% 0%, rgba(8,144,251,0.15), transparent 60%), radial-gradient(circle at 50% 0%, rgba(158,5,214,0.1), transparent)",
    accent: "rgba(8,144,251,0.3)",
    preview: {
      bg: "linear-gradient(135deg, #0d0a1a 0%, #120e22 40%, #0a0818 100%)",
      label: "INFRA",
      labelColor: "rgba(8,144,251,0.6)",
    },
  },
  {
    title: "ChefPickle",
    meta: "Client — 2024",
    description:
      "Deep debugging and legacy system stabilization. Root cause analysis, performance profiling, and systematic resolution of critical issues.",
    color:
      "radial-gradient(circle at 50% 0%, rgba(0,106,195,0.2), transparent 60%)",
    accent: "rgba(0,106,195,0.3)",
    preview: {
      bg: "linear-gradient(135deg, #0a1520 0%, #071018 40%, #050c14 100%)",
      label: "CP",
      labelColor: "rgba(0,106,195,0.6)",
    },
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
          boxShadow:
            "0 40px 80px rgba(0,0,0,0.5), 0 0 0 0.5px rgba(242,242,242,0.03)",
        }}
        whileHover={{ y: -6, scale: 1.008 }}
        transition={{ duration: 0.5, ease }}
      >
        {/* Outer glare */}
        <div className="glare-line absolute top-0 left-[8%] right-[8%] z-10 opacity-40 group-hover:opacity-80 transition-opacity duration-600" />

        {/* Inner card */}
        <div
          className="relative rounded-[16px] overflow-hidden transition-[border-color] duration-500"
          style={{
            background: "linear-gradient(190deg, #1c1c1c, #0e0e0e)",
            border: "1px solid rgba(242,242,242,0.06)",
            boxShadow:
              "inset 0 1px 0 rgba(242,242,242,0.04), inset 0 0 20px rgba(0,0,0,0.2)",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = project.accent;
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = "rgba(242,242,242,0.06)";
          }}
        >
          {/* Inner glare */}
          <div className="glare-line absolute top-0 left-[12%] right-[12%] z-10 opacity-20 group-hover:opacity-50 transition-opacity duration-500" style={{ height: "1.5px" }} />

          {/* Color glow on hover */}
          <div
            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
            style={{ backgroundImage: project.color }}
          />

          {/* Content */}
          <div className="relative z-10 p-6 md:p-7">
            {/* Header */}
            <div className="flex items-start justify-between gap-4 mb-5">
              <div>
                <h3 className="text-[20px] md:text-[22px] font-medium tracking-[-0.02em] text-[var(--color-fg)]">
                  {project.title}
                </h3>
                <p className="mt-1 text-[13px] tracking-[0.1px] text-[var(--color-fg-30)]">
                  {project.meta}
                </p>
              </div>
              <motion.svg
                width="28"
                height="28"
                viewBox="0 0 24 24"
                fill="none"
                className="shrink-0 mt-0.5 text-[var(--color-fg-15)] group-hover:text-[var(--color-fg-50)] transition-colors duration-500"
                whileHover={{ x: 2, y: -2 }}
              >
                <path
                  d="M7 17L17 7M17 7H10M17 7v7"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </motion.svg>
            </div>

            {/* Description */}
            <p className="text-[13px] md:text-[14px] leading-[1.6] tracking-[0.1px] text-[var(--color-fg-30)] group-hover:text-[var(--color-fg-50)] transition-colors duration-500 max-w-[480px]">
              {project.description}
            </p>

            {/* Preview image frame */}
            <div className="mt-6 md:mt-8">
              <motion.div
                className="relative rounded-[10px] overflow-hidden"
                style={{
                  background: project.preview.bg,
                  boxShadow:
                    "0 20px 40px rgba(0,0,0,0.3), inset 0 1px 0 rgba(242,242,242,0.04)",
                  border: "1px solid rgba(242,242,242,0.04)",
                  aspectRatio: "16/9",
                }}
                whileHover={{ scale: 1.015 }}
                transition={{ duration: 0.5, ease }}
              >
                {/* Preview content */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <span
                    className="text-[32px] md:text-[40px] font-semibold tracking-[-1px] select-none"
                    style={{ color: project.preview.labelColor }}
                  >
                    {project.preview.label}
                  </span>
                </div>

                {/* Subtle inner shadow */}
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    boxShadow: "inset 0 0 40px rgba(0,0,0,0.4)",
                  }}
                />

                {/* Noise grain on preview */}
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    opacity: 0.08,
                    mixBlendMode: "overlay",
                    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E")`,
                    backgroundRepeat: "repeat",
                    backgroundSize: "200px 200px",
                  }}
                />
              </motion.div>
            </div>
          </div>
        </div>
      </motion.div>
    </FadeIn>
  );
}

export default function Work() {
  return (
    <section id="work" className="relative pt-6 pb-48 md:pb-64">
      {/* Section ambient light */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(242,242,242,0.015), transparent 70%)",
        }}
      />

      <div className="relative mx-auto max-w-[880px] px-4 md:px-0">
        <FadeIn>
          <span className="text-[11px] uppercase tracking-[0.15em] text-[var(--color-fg-15)] block mb-14 md:mb-16">
            Selected Work
          </span>
        </FadeIn>

        <div className="flex flex-col gap-12 md:gap-14">
          {projects.map((project, i) => (
            <ProjectCard key={project.title} project={project} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
