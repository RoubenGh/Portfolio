"use client";

import Link from "next/link";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import type { Variants } from "framer-motion";
import FadeIn from "./FadeIn";

const ease = [0.165, 0.84, 0.44, 1] as const;

const projects = [
  {
    title: "RLA Studios",
    meta: "Founder - 2024",
    description:
      "Full-stack business operations platform for a real estate videography company. Lead scraping, invoicing, CRM, commission tracking. One admin panel.",
    href: "/work/rla-studios",
    color:
      "radial-gradient(circle at 50% 0%, rgba(127,207,255,0.2), transparent 70%), radial-gradient(circle at 50% 0%, rgba(0,51,85,0.6), transparent)",
    accent: "rgba(127,207,255,0.3)",
    accentSolid: "rgba(127,207,255,0.9)",
    previewSrc: "/images/rla-studios/dashboard.png",
  },
  {
    title: "AI Ticketing System",
    meta: "Internal Tool - 2024",
    description:
      "AI-powered system that transforms unstructured emails into structured, prioritized tickets with auto-generated task breakdowns and knowledge base integration.",
    href: "/work/ai-ticketing",
    color:
      "radial-gradient(circle at 50% 0%, rgba(255,255,255,0.1), transparent 60%)",
    accent: "rgba(255,255,255,0.2)",
    accentSolid: "rgba(242,242,242,0.55)",
    previewSrc: "/images/ai-ticketing/dashboard.png",
  },
  {
    title: "TwentyTwenty",
    meta: "Open Source Desktop App - 2026",
    description:
      "Cross-platform eye strain app that measures genuine screen time instead of running a timer, reading system idle and display-wake signals so a video counts and a lunch break does not.",
    href: "/work/twentytwenty",
    color:
      "radial-gradient(circle at 50% 0%, rgba(110,231,183,0.1), transparent 60%)",
    accent: "rgba(110,231,183,0.2)",
    accentSolid: "rgba(110,231,183,0.8)",
    previewSrc: "/images/twentytwenty/overlay.png",
  },
];

/**
 * SSR/hydration-safe reduced-motion read. `useReducedMotion` resolves to
 * `null` on the server and the real value on the client's first paint, so
 * reading it directly desyncs server/client markup. Gate behind a mounted
 * flag that starts false everywhere and flips true post-mount, same
 * pattern as FadeIn.tsx.
 */
function useSafeReducedMotion() {
  const prefersReducedMotion = useReducedMotion();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  return mounted && !!prefersReducedMotion;
}

/**
 * Screenshot that drifts against its frame as the card scrolls through the
 * viewport. The image is intentionally scaled up inside an overflow-hidden
 * frame so the translate range never reveals an edge or a gap. If the
 * scroll target hasn't measured yet, useScroll's motion value simply reads
 * at its default (0), which resolves through useTransform to a real,
 * finite offset — never to a missing/NaN value — so the image is always
 * fully visible even if measurement never fires. Reduced motion disables
 * the transform outright.
 */
function ParallaxImage({
  src,
  alt,
  range,
}: {
  src: string;
  alt: string;
  range: number;
}) {
  const frameRef = useRef<HTMLDivElement>(null);
  const reduced = useSafeReducedMotion();
  const { scrollYProgress } = useScroll({
    target: frameRef,
    offset: ["start end", "end start"],
  });
  const rawY = useTransform(scrollYProgress, [0, 1], [-range, range]);
  const y = reduced ? 0 : rawY;

  return (
    <div
      ref={frameRef}
      className="relative w-full overflow-hidden rounded-[10px]"
      style={{
        aspectRatio: "16 / 10",
        boxShadow:
          "0 20px 40px rgba(0,0,0,0.3), inset 0 1px 0 rgba(242,242,242,0.04)",
        border: "1px solid rgba(242,242,242,0.04)",
      }}
    >
      <motion.img
        src={src}
        alt={alt}
        style={{ y, scale: 1.14 }}
        className="absolute inset-0 h-full w-full object-cover object-top block"
      />
      <div
        className="absolute inset-0 pointer-events-none hidden md:block"
        style={{ boxShadow: "inset 0 0 40px rgba(0,0,0,0.4)" }}
      />
      <div
        className="absolute inset-0 pointer-events-none md:hidden"
        style={{ boxShadow: "inset 0 0 20px rgba(0,0,0,0.2)" }}
      />
    </div>
  );
}

/**
 * Per-card entry variants — same opacity-driven, whileInView/once
 * mechanism as FadeIn (so a stalled animation can never leave the card
 * invisible), but with a distinct shape of motion per card instead of a
 * uniform fade-up.
 */
function entryVariants(kind: "rise" | "left" | "right", reduced: boolean): Variants {
  if (reduced) {
    return {
      hidden: { opacity: 0 },
      show: { opacity: 1, transition: { duration: 0.01 } },
    };
  }
  if (kind === "rise") {
    return {
      hidden: { opacity: 0, y: 90, scale: 0.975 },
      show: {
        opacity: 1,
        y: 0,
        scale: 1,
        transition: { duration: 1.05, ease },
      },
    };
  }
  if (kind === "left") {
    return {
      hidden: { opacity: 0, x: -60, y: 40, rotate: -1.2 },
      show: {
        opacity: 1,
        x: 0,
        y: 0,
        rotate: 0,
        transition: { duration: 0.85, ease },
      },
    };
  }
  return {
    hidden: { opacity: 0, x: 60, y: 40, rotate: 1.2 },
    show: {
      opacity: 1,
      x: 0,
      y: 0,
      rotate: 0,
      transition: { duration: 0.85, ease, delay: 0.12 },
    },
  };
}

function ProjectCard({
  project,
  featured,
  entryKind,
}: {
  project: (typeof projects)[0];
  featured: boolean;
  entryKind: "rise" | "left" | "right";
}) {
  const reduced = useSafeReducedMotion();

  return (
    <motion.div
      variants={entryVariants(entryKind, reduced)}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-80px" }}
      className={featured ? "md:col-span-2" : ""}
    >
      <Link href={project.href} className="block h-full">
        <motion.div
          className="group relative h-full rounded-[24px] p-2 cursor-pointer"
          style={{
            background: "rgba(242,242,242,0.02)",
            outline: "1px solid rgba(242,242,242,0.04)",
            boxShadow:
              "0 40px 80px rgba(0,0,0,0.5), 0 0 0 0.5px rgba(242,242,242,0.03)",
          }}
          whileHover={{
            y: -10,
            scale: 1.012,
            boxShadow: `0 50px 100px rgba(0,0,0,0.6), 0 0 90px ${project.accent}, 0 0 0 0.5px rgba(242,242,242,0.06)`,
          }}
          transition={{ duration: 0.45, ease }}
        >
          {/* Outer glare */}
          <div className="glare-line absolute top-0 left-[8%] right-[8%] z-10 opacity-40 group-hover:opacity-90 transition-opacity duration-500" />

          {/* Inner card */}
          <div
            className="relative h-full rounded-[16px] overflow-hidden transition-[border-color] duration-500 flex flex-col"
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
            <div
              className="glare-line absolute top-0 left-[12%] right-[12%] z-10 opacity-20 group-hover:opacity-60 transition-opacity duration-500"
              style={{ height: "1.5px" }}
            />

            {/* Color glow on hover */}
            <div
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
              style={{ backgroundImage: project.color }}
            />

            {/* Flagship marker */}
            {featured && (
              <div className="relative z-10 px-6 md:px-7 pt-6 md:pt-7">
                <span
                  className="inline-flex items-center gap-1.5 text-[10px] uppercase tracking-[0.15em] font-medium"
                  style={{ color: project.accentSolid }}
                >
                  <span
                    className="inline-block w-1.5 h-1.5 rounded-full"
                    style={{ background: project.accentSolid }}
                  />
                  Featured
                </span>
              </div>
            )}

            {/* Content */}
            <div
              className={`relative z-10 p-6 md:p-7 flex flex-col flex-1 ${
                featured ? "md:pt-3" : ""
              }`}
            >
              {/* Header */}
              <div className="flex items-start justify-between gap-4 mb-5">
                <div>
                  <h3
                    className={`${
                      featured
                        ? "text-[24px] md:text-[30px]"
                        : "text-[20px] md:text-[22px]"
                    } font-medium tracking-[-0.02em] text-[var(--text-primary)]`}
                  >
                    {project.title}
                  </h3>
                  <p className="mt-1 text-[13px] tracking-[0.1px] text-[var(--text-body)]">
                    {project.meta}
                  </p>
                </div>
                <svg
                  width={featured ? 32 : 28}
                  height={featured ? 32 : 28}
                  viewBox="0 0 24 24"
                  fill="none"
                  className="shrink-0 mt-0.5 text-[var(--color-fg-15)] group-hover:text-[var(--color-fg-80)] transition-all duration-300 ease-out group-hover:translate-x-1 group-hover:-translate-y-1"
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

              {/* Description */}
              <p
                className={`text-[13px] md:text-[14px] leading-[1.6] tracking-[0.1px] text-[var(--text-body)] group-hover:text-[var(--text-secondary)] transition-colors duration-500 ${
                  featured ? "max-w-[620px]" : "max-w-[480px]"
                }`}
              >
                {project.description}
              </p>

              {/* Preview image frame — parallax on scroll */}
              <div className="mt-6 md:mt-8 flex-1">
                <ParallaxImage
                  src={project.previewSrc}
                  alt={project.title}
                  range={featured ? 34 : 18}
                />
              </div>
            </div>
          </div>
        </motion.div>
      </Link>
    </motion.div>
  );
}

export default function Work() {
  return (
    <section id="work" className="relative pt-6 pb-24 md:pb-32">
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(242,242,242,0.015), transparent 70%)",
        }}
      />

      <div className="relative mx-auto max-w-[880px] px-4 md:px-0">
        <FadeIn>
          <span className="text-[11px] uppercase tracking-[0.15em] text-[var(--text-muted)] block mb-14 md:mb-16">
            Selected Work
          </span>
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-8">
          {projects.map((project, i) => (
            <ProjectCard
              key={project.title}
              project={project}
              featured={i === 0}
              entryKind={i === 0 ? "rise" : i === 1 ? "left" : "right"}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
