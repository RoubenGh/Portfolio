"use client";

import { useState, useEffect, useRef, useCallback, Fragment } from "react";
import Link from "next/link";
import { motion, useInView, animate } from "framer-motion";
import FadeIn from "./FadeIn";

const ease = [0.165, 0.84, 0.44, 1] as const;

/* ── Back button ── */
export function BackButton() {
  return (
    <FadeIn y={20}>
      <Link
        href="/#work"
        className="inline-flex items-center gap-2 text-[13px] font-medium tracking-[0.2px] text-[var(--color-fg-30)] hover:text-[var(--color-fg)] transition-colors duration-300 group"
      >
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          className="group-hover:-translate-x-0.5 transition-transform duration-300"
        >
          <path
            d="M19 12H5M5 12l6 6M5 12l6-6"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        Back to work
      </Link>
    </FadeIn>
  );
}

/* ── Project hero banner ── */
export function ProjectHero({
  bannerBg,
  bannerLabel,
  bannerLabelColor,
}: {
  bannerBg: string;
  bannerLabel: string;
  bannerLabelColor: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, ease }}
      className="relative rounded-[16px] overflow-hidden"
      style={{
        background: bannerBg,
        aspectRatio: "21/9",
        boxShadow:
          "0 40px 80px rgba(0,0,0,0.5), inset 0 1px 0 rgba(242,242,242,0.04)",
        border: "1px solid rgba(242,242,242,0.05)",
      }}
    >
      <div className="absolute inset-0 flex items-center justify-center">
        <span
          className="text-[48px] md:text-[72px] font-semibold tracking-[-2px] select-none"
          style={{ color: bannerLabelColor }}
        >
          {bannerLabel}
        </span>
      </div>
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ boxShadow: "inset 0 0 60px rgba(0,0,0,0.5)" }}
      />
    </motion.div>
  );
}

/* ── Project metadata grid ── */
export function ProjectMeta({
  items,
}: {
  items: { label: string; value: string }[];
}) {
  return (
    <FadeIn delay={0.15}>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 py-8 border-t border-b" style={{ borderColor: "rgba(242,242,242,0.06)" }}>
        {items.map((item) => (
          <div key={item.label}>
            <span className="block text-[10px] uppercase tracking-[0.15em] text-[var(--color-fg-15)] mb-2">
              {item.label}
            </span>
            <span className="block text-[13px] md:text-[14px] font-medium leading-[1.5] text-[var(--color-fg-80)]">
              {item.value}
            </span>
          </div>
        ))}
      </div>
    </FadeIn>
  );
}

/* ── Sticky sidebar table of contents ── */
export function TableOfContents({
  sections,
}: {
  sections: { id: string; label: string }[];
}) {
  const [active, setActive] = useState("");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting);
        if (visible.length > 0) {
          setActive(visible[0].target.id);
        }
      },
      { rootMargin: "-20% 0px -60% 0px" }
    );

    sections.forEach((s) => {
      const el = document.getElementById(s.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [sections]);

  return (
    <div className="hidden lg:block">
      <div className="sticky top-32">
        <span className="block text-[10px] uppercase tracking-[0.15em] text-[var(--color-fg-15)] mb-4">
          Contents
        </span>
        <nav className="flex flex-col gap-2">
          {sections.map((s) => (
            <a
              key={s.id}
              href={`#${s.id}`}
              className={`text-[12px] font-medium tracking-[0.1px] transition-colors duration-300 ${
                active === s.id
                  ? "text-[var(--color-fg)]"
                  : "text-[var(--color-fg-15)] hover:text-[var(--color-fg-50)]"
              }`}
            >
              {s.label}
            </a>
          ))}
        </nav>
      </div>
    </div>
  );
}

/* ── Section heading ── */
export function SectionHeading({
  number,
  title,
  subtitle,
}: {
  number: string;
  title: string;
  subtitle?: string;
}) {
  return (
    <FadeIn>
      <div className="mb-8">
        <span className="text-[11px] uppercase tracking-[0.15em] text-[var(--color-fg-15)] block mb-3">
          {number}
        </span>
        <h2 className="text-[24px] md:text-[28px] font-medium tracking-[-0.5px] text-[var(--color-fg)] leading-[1.15]">
          {title}
        </h2>
        {subtitle && (
          <p className="mt-3 text-[15px] md:text-[16px] leading-[1.6] text-[var(--color-fg-30)]">
            {subtitle}
          </p>
        )}
      </div>
    </FadeIn>
  );
}

/* ── Body text ── */
export function SectionBody({ children }: { children: React.ReactNode }) {
  return (
    <FadeIn>
      <div className="text-[14px] md:text-[15px] leading-[1.75] text-[var(--color-fg-30)] space-y-4 max-w-[640px]">
        {children}
      </div>
    </FadeIn>
  );
}

/* ── Magnifier zoom image ── */
function MagnifierImage({ src, alt }: { src: string; alt: string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [zoomed, setZoomed] = useState(false);
  const [origin, setOrigin] = useState("50% 50%");

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setOrigin(`${x}% ${y}%`);
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative overflow-hidden cursor-zoom-in"
      onMouseEnter={() => setZoomed(true)}
      onMouseLeave={() => setZoomed(false)}
      onMouseMove={handleMouseMove}
    >
      <img
        src={src}
        alt={alt}
        className="w-full h-auto block transition-transform duration-300 ease-out"
        style={{
          transform: zoomed ? "scale(2.5)" : "scale(1)",
          transformOrigin: origin,
        }}
        loading="lazy"
      />
    </div>
  );
}

/* ── Visual frame (for mockups / diagrams) ── */
export function VisualFrame({
  bg,
  label,
  labelColor,
  caption,
  aspectRatio = "16/9",
  imageSrc,
  zoomable = false,
  wide = false,
}: {
  bg: string;
  label: string;
  labelColor: string;
  caption?: string;
  aspectRatio?: string;
  imageSrc?: string;
  zoomable?: boolean;
  wide?: boolean;
}) {
  return (
    <FadeIn>
      <div className={`my-12 md:my-16 ${wide ? "-mx-4 sm:-mx-8 md:-mx-12 lg:-mx-20" : ""}`}>
        <div
          className="relative rounded-[14px] overflow-hidden"
          style={{
            background: bg,
            aspectRatio: imageSrc ? undefined : aspectRatio,
            boxShadow:
              "0 40px 80px rgba(0,0,0,0.55), 0 8px 24px rgba(0,0,0,0.3), inset 0 1px 0 rgba(242,242,242,0.05)",
            border: "1px solid rgba(242,242,242,0.07)",
          }}
        >
          {imageSrc && (
            <div
              className="flex items-center gap-[5px] px-3 py-2.5"
              style={{
                background: "rgba(18,18,18,0.9)",
                borderBottom: "1px solid rgba(242,242,242,0.05)",
              }}
            >
              <span className="w-[8px] h-[8px] rounded-full" style={{ background: "rgba(255,95,87,0.6)" }} />
              <span className="w-[8px] h-[8px] rounded-full" style={{ background: "rgba(255,189,46,0.6)" }} />
              <span className="w-[8px] h-[8px] rounded-full" style={{ background: "rgba(39,201,63,0.6)" }} />
            </div>
          )}
          {imageSrc ? (
            zoomable ? (
              <MagnifierImage src={imageSrc} alt={label} />
            ) : (
              <img src={imageSrc} alt={label} className="w-full h-auto block" loading="lazy" />
            )
          ) : (
            <div className="absolute inset-0 flex items-center justify-center">
              <span
                className="text-[24px] md:text-[32px] font-medium tracking-[-0.5px] select-none"
                style={{ color: labelColor }}
              >
                {label}
              </span>
            </div>
          )}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{ boxShadow: "inset 0 0 40px rgba(0,0,0,0.35)" }}
          />
        </div>
        {caption && (
          <p className={`mt-3 text-[12px] tracking-[0.1px] text-[var(--color-fg-15)] ${wide ? "px-4 sm:px-8 md:px-12 lg:px-20" : ""}`}>
            {caption}
          </p>
        )}
      </div>
    </FadeIn>
  );
}

/* ── Animated stat number ── */
function AnimatedValue({ raw }: { raw: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-20px" });
  const [display, setDisplay] = useState("0");

  useEffect(() => {
    if (!inView) return;
    const hasPlus = raw.endsWith("+");
    const hasK = raw.endsWith("K");
    const isDecimal = /\d\.\d/.test(raw);
    const target = parseFloat(raw.replace(/[+K,]/g, ""));
    const suffix = hasPlus ? "+" : hasK ? "K" : "";
    const controls = animate(0, target, {
      duration: 1.8,
      ease: [0.16, 1, 0.3, 1],
      onUpdate(v) {
        const formatted = isDecimal
          ? v.toFixed(1)
          : target >= 1000
          ? Math.floor(v).toLocaleString()
          : Math.floor(v).toString();
        setDisplay(formatted + suffix);
      },
    });
    return () => controls.stop();
  }, [inView, raw]);

  return <span ref={ref}>{display}</span>;
}

/* ── Stat callout ── */
export function StatBlock({
  items,
}: {
  items: { value: string; label: string }[];
}) {
  return (
    <FadeIn>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-6 my-10 md:my-14">
        {items.map((item) => (
          <div
            key={item.label}
            className="rounded-[12px] p-5 md:p-6"
            style={{
              background: "rgba(242,242,242,0.02)",
              border: "1px solid rgba(242,242,242,0.04)",
            }}
          >
            <span className="block text-[24px] md:text-[28px] font-medium tracking-[-0.5px] text-[var(--color-fg)]">
              <AnimatedValue raw={item.value} />
            </span>
            <span className="block text-[12px] tracking-[0.1px] text-[var(--color-fg-30)] mt-1">
              {item.label}
            </span>
          </div>
        ))}
      </div>
    </FadeIn>
  );
}

/* ── Feature / principle card row ── */
export function PrincipleCards({
  items,
}: {
  items: { number: string; title: string; description: string }[];
}) {
  return (
    <FadeIn>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-10 md:my-14">
        {items.map((item) => (
          <div
            key={item.number}
            className="rounded-[12px] p-5 md:p-6"
            style={{
              background: "linear-gradient(190deg, rgba(242,242,242,0.03), rgba(242,242,242,0.01))",
              border: "1px solid rgba(242,242,242,0.04)",
            }}
          >
            <span className="text-[11px] text-[var(--color-fg-15)] tracking-[0.15em] block mb-3">
              {item.number}
            </span>
            <h4 className="text-[15px] font-medium text-[var(--color-fg)] mb-2">
              {item.title}
            </h4>
            <p className="text-[13px] leading-[1.6] text-[var(--color-fg-30)]">
              {item.description}
            </p>
          </div>
        ))}
      </div>
    </FadeIn>
  );
}

/* ── Constraint / problem item ── */
export function ConstraintList({
  items,
}: {
  items: { title: string; description: string }[];
}) {
  return (
    <FadeIn>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-8">
        {items.map((item) => (
          <div
            key={item.title}
            className="flex gap-3 rounded-[10px] p-4"
            style={{
              background: "rgba(242,242,242,0.015)",
              border: "1px solid rgba(242,242,242,0.03)",
            }}
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              className="shrink-0 mt-0.5 text-[var(--color-fg-15)]"
            >
              <circle
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="1.5"
              />
              <path
                d="M12 8v4M12 16h.01"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </svg>
            <div>
              <h4 className="text-[14px] font-medium text-[var(--color-fg-80)] mb-1">
                {item.title}
              </h4>
              <p className="text-[13px] leading-[1.5] text-[var(--color-fg-30)]">
                {item.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </FadeIn>
  );
}

/* ── Pipeline flow diagram ── */
export function PipelineFlow({
  stages,
}: {
  stages: { label: string; sub?: string }[];
}) {
  const connCount = stages.length - 1;
  const travelDuration = 1.5;
  const stagger = 0.65;
  const repeatDelay = connCount * stagger;

  return (
    <FadeIn>
      <div className="my-12 md:my-16 -mx-1 overflow-x-auto" style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}>
        <div className="flex items-start px-1" style={{ minWidth: "max-content" }}>
          {stages.map((stage, i) => (
            <Fragment key={stage.label}>
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.5, delay: i * 0.12, ease }}
                className="flex flex-col items-center"
                style={{ width: "100px" }}
              >
                <div
                  className="w-full rounded-[10px] px-2.5 py-2.5 text-center"
                  style={{
                    background: "rgba(242,242,242,0.025)",
                    border: "1px solid rgba(242,242,242,0.08)",
                  }}
                >
                  <span className="text-[11px] font-medium text-[var(--color-fg-80)] leading-[1.3] block">
                    {stage.label}
                  </span>
                </div>
                {stage.sub && (
                  <span className="text-[9.5px] text-[var(--color-fg-15)] mt-1.5 text-center leading-[1.3] px-1">
                    {stage.sub}
                  </span>
                )}
              </motion.div>

              {i < stages.length - 1 && (
                <div
                  className="relative shrink-0 mt-[15px]"
                  style={{ width: "48px" }}
                >
                  <div
                    className="w-full h-px"
                    style={{ background: "rgba(242,242,242,0.08)" }}
                  />
                  <motion.div
                    className="absolute top-1/2 -translate-y-1/2 rounded-full"
                    style={{
                      width: "5px",
                      height: "5px",
                      background: "rgba(127,207,255,0.85)",
                      left: 0,
                      boxShadow: "0 0 6px rgba(127,207,255,0.6)",
                    }}
                    animate={{ x: [0, 43] }}
                    transition={{
                      duration: travelDuration,
                      delay: i * stagger,
                      repeat: Infinity,
                      repeatDelay,
                      ease: "easeInOut",
                    }}
                  />
                </div>
              )}
            </Fragment>
          ))}
        </div>
      </div>
    </FadeIn>
  );
}

/* ── Next project card at bottom ── */
export function NextProject({
  title,
  meta,
  href,
  previewBg,
  previewLabel,
  previewLabelColor,
  previewImageSrc,
}: {
  title: string;
  meta: string;
  href: string;
  previewBg: string;
  previewLabel: string;
  previewLabelColor: string;
  previewImageSrc?: string;
}) {
  return (
    <FadeIn>
      <div
        className="my-20 pt-12"
        style={{ borderTop: "1px solid rgba(242,242,242,0.04)" }}
      >
        <span className="text-[10px] uppercase tracking-[0.15em] text-[var(--color-fg-15)] block mb-6">
          Next Project
        </span>
        <Link href={href} className="block group">
          <div
            className="rounded-[16px] p-6 md:p-7 transition-[border-color] duration-500"
            style={{
              background: "linear-gradient(190deg, #1a1a1a, #0e0e0e)",
              border: "1px solid rgba(242,242,242,0.04)",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = "rgba(242,242,242,0.12)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = "rgba(242,242,242,0.04)";
            }}
          >
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-[18px] md:text-[20px] font-medium text-[var(--color-fg)]">
                  {title}
                </h3>
                <p className="text-[13px] text-[var(--color-fg-30)] mt-1">
                  {meta}
                </p>
              </div>
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                className="text-[var(--color-fg-15)] group-hover:text-[var(--color-fg-50)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-500"
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
            <div
              className="rounded-[8px] overflow-hidden"
              style={{
                background: previewBg,
                ...(!previewImageSrc && { aspectRatio: "21/9" }),
                border: "1px solid rgba(242,242,242,0.03)",
              }}
            >
              {previewImageSrc ? (
                <img src={previewImageSrc} alt={title} className="w-full h-auto block" />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <span
                    className="text-[28px] font-semibold tracking-[-1px] select-none"
                    style={{ color: previewLabelColor }}
                  >
                    {previewLabel}
                  </span>
                </div>
              )}
            </div>
          </div>
        </Link>
      </div>
    </FadeIn>
  );
}
