"use client";

import {
  useState,
  useEffect,
  useRef,
  useCallback,
  Fragment,
  type CSSProperties,
  type ReactNode,
} from "react";
import Link from "next/link";
import {
  motion,
  useInView,
  animate,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import styles from "./CaseStudy.module.css";

const ease = [0.165, 0.84, 0.44, 1] as const;

/**
 * SSR/hydration-safe reduced-motion read. `useReducedMotion` resolves to
 * `null` on the server and the real value on the client's first paint, so
 * reading it directly desyncs server/client markup. Gate behind a mounted
 * flag that starts false everywhere and flips true post-mount (same
 * pattern as FadeIn.tsx / Work.tsx).
 */
function useSafeReducedMotion() {
  const prefersReducedMotion = useReducedMotion();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  return mounted && !!prefersReducedMotion;
}

/** Inline style helper for the CSS custom properties `.mountReveal`
 *  reads (--cs-delay, --cs-rise-y). Typed loosely because React's
 *  CSSProperties doesn't know about custom properties. */
function cssVars(vars: Record<string, string>): CSSProperties {
  return vars as CSSProperties;
}

/**
 * Entrance wrapper for content that is at or near the top of the page
 * (hero title, hero image, download CTA). Plays automatically the
 * instant the stylesheet is parsed — a plain CSS `@keyframes ... both`
 * animation (see CaseStudy.module.css), not framer-motion — so it is
 * guaranteed to reach a fully visible end state even if JS never loads
 * or never hydrates. Use this instead of a JS initial/animate pattern
 * for anything likely to be in the first viewport.
 */
export function MountReveal({
  children,
  className,
  style,
  delay = 0,
  y = 24,
}: {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
  delay?: number;
  y?: number;
}) {
  return (
    <div
      className={`${styles.mountReveal}${className ? ` ${className}` : ""}`}
      style={{
        ...style,
        ...cssVars({ "--cs-delay": `${delay}s`, "--cs-rise-y": `${y}px` }),
      }}
    >
      {children}
    </div>
  );
}

type RevealVariant = "up" | "up-sm" | "up-lg" | "scale";

const revealTargets: Record<
  RevealVariant,
  { hidden: Record<string, number>; show: Record<string, number> }
> = {
  up: { hidden: { opacity: 0, y: 40 }, show: { opacity: 1, y: 0 } },
  "up-sm": { hidden: { opacity: 0, y: 18 }, show: { opacity: 1, y: 0 } },
  "up-lg": { hidden: { opacity: 0, y: 56 }, show: { opacity: 1, y: 0 } },
  scale: {
    hidden: { opacity: 0, y: 26, scale: 0.975 },
    show: { opacity: 1, y: 0, scale: 1 },
  },
};

/**
 * Scroll-triggered entrance for content below the first viewport.
 *
 * Safety model: the component always *renders* at its final, fully
 * visible values (`initial={false}` + `animate` starting at the "show"
 * target), so the very first paint — server-rendered HTML, and the
 * client's first render before any effect runs — is never invisible.
 * Only once mounted does it check whether the element is currently
 * off-screen; if so (and only then, so there is no visible flash — an
 * off-screen element snapping to its hidden state is invisible to the
 * user by definition) it snaps to the hidden state and an
 * IntersectionObserver reveals it with a real animated transition the
 * first time it scrolls into view. `prefers-reduced-motion` skips all
 * of this and leaves the element at its visible resting state.
 */
export function Reveal({
  children,
  variant = "up",
  delay = 0,
  duration = 0.85,
  className,
}: {
  children: ReactNode;
  variant?: RevealVariant;
  delay?: number;
  duration?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [phase, setPhase] = useState<"visible" | "waiting" | "shown">(
    "visible"
  );
  const reduced = useSafeReducedMotion();

  useEffect(() => {
    if (reduced) return;
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const alreadyVisible =
      rect.top < window.innerHeight * 0.92 && rect.bottom > 0;
    if (alreadyVisible) return; // stays "visible" — no flash, nothing to gain

    setPhase("waiting");
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          setPhase("shown");
          observer.disconnect();
        }
      },
      { rootMargin: "0px 0px -10% 0px", threshold: 0.08 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [reduced]);

  const target = revealTargets[variant];
  const animateTo = phase === "waiting" ? target.hidden : target.show;
  // The visible -> waiting flip happens off-screen, so it is snapped
  // instantly (duration 0) rather than animated. Only the waiting ->
  // shown transition — the one the user actually sees — gets the real
  // duration/delay/ease.
  const isRevealing = phase === "shown";

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={false}
      animate={animateTo}
      transition={{
        duration: reduced ? 0.01 : isRevealing ? duration : 0,
        delay: isRevealing ? delay : 0,
        ease,
      }}
    >
      {children}
    </motion.div>
  );
}

/**
 * Wraps content in a mild scroll-linked vertical drift — the same
 * useScroll/useTransform mechanism as Work.tsx's card parallax. If the
 * scroll target hasn't measured yet, the motion value simply reads at
 * its default and resolves to a finite, in-range offset, never to a
 * missing/NaN value, so the wrapped content is always fully visible.
 * Reduced motion disables the transform outright.
 */
function ParallaxWrap({
  children,
  range = 20,
}: {
  children: ReactNode;
  range?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useSafeReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const rawY = useTransform(scrollYProgress, [0, 1], [-range, range]);
  const y = reduced ? 0 : rawY;

  return (
    <motion.div ref={ref} style={{ y }}>
      {children}
    </motion.div>
  );
}

/* ── Back button ── */
export function BackButton() {
  return (
    <MountReveal y={16}>
      <Link
        href="/#work"
        className="inline-flex items-center gap-2 text-[13px] font-medium tracking-[0.2px] text-[var(--text-body)] hover:text-[var(--text-primary)] transition-colors duration-300 group"
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
    </MountReveal>
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
    <MountReveal y={40}>
      <div
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
      </div>
    </MountReveal>
  );
}

/* ── Project metadata grid ── */
export function ProjectMeta({
  items,
}: {
  items: { label: string; value: string }[];
}) {
  return (
    <Reveal variant="up-sm" delay={0.1}>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 py-8 border-t border-b" style={{ borderColor: "rgba(242,242,242,0.06)" }}>
        {items.map((item) => (
          <div key={item.label}>
            <span className="block text-[10px] uppercase tracking-[0.15em] text-[var(--text-muted)] mb-2">
              {item.label}
            </span>
            <span className="block text-[13px] md:text-[14px] font-medium leading-[1.5] text-[var(--text-secondary)]">
              {item.value}
            </span>
          </div>
        ))}
      </div>
    </Reveal>
  );
}

/* ── Sticky sidebar table of contents ── */
export function TableOfContents({
  sections,
}: {
  sections: { id: string; label: string }[];
}) {
  const [active, setActive] = useState("");
  const navRef = useRef<HTMLElement>(null);
  const linkRefs = useRef<Record<string, HTMLAnchorElement | null>>({});
  const [indicator, setIndicator] = useState({ top: 0, height: 0, opacity: 0 });
  const reduced = useSafeReducedMotion();

  // Scroll-spy: unchanged mechanics — still the single source of truth
  // for which section is "active", and still drives the anchor links'
  // text color the same way it always did.
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

  // Measure the active link's position so a gliding indicator can track
  // reading position, echoing the home nav's active-section indicator.
  useEffect(() => {
    function measure() {
      const nav = navRef.current;
      const link = linkRefs.current[active];
      if (!nav || !link) {
        setIndicator((prev) => ({ ...prev, opacity: 0 }));
        return;
      }
      const navRect = nav.getBoundingClientRect();
      const linkRect = link.getBoundingClientRect();
      setIndicator({
        top: linkRect.top - navRect.top,
        height: linkRect.height,
        opacity: 1,
      });
    }
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [active]);

  return (
    <div className="hidden lg:block">
      <div className="sticky top-32">
        <span className="block text-[10px] uppercase tracking-[0.15em] text-[var(--text-muted)] mb-4">
          Contents
        </span>
        <nav ref={navRef} className="relative flex flex-col gap-2 pl-4">
          <div
            className="absolute left-0 top-0 bottom-0 w-px"
            style={{ background: "rgba(242,242,242,0.07)" }}
          />
          <motion.div
            className="absolute left-0 w-[2px] rounded-full"
            style={{
              background: "var(--text-primary)",
              boxShadow: "0 0 8px rgba(127,207,255,0.5)",
            }}
            animate={indicator}
            transition={{ duration: reduced ? 0.01 : 0.4, ease }}
          />
          {sections.map((s) => (
            <a
              key={s.id}
              ref={(el) => {
                linkRefs.current[s.id] = el;
              }}
              href={`#${s.id}`}
              className={`text-[12px] font-medium tracking-[0.1px] transition-colors duration-300 ${
                active === s.id
                  ? "text-[var(--text-primary)]"
                  : "text-[var(--text-muted)] hover:text-[var(--text-primary)]"
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
    <Reveal variant="up-sm" duration={0.7}>
      <div className="mb-8">
        <span className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.15em] text-[var(--text-muted)] mb-3">
          {number}
          <span
            className="inline-block h-px w-6"
            style={{ background: "rgba(127,207,255,0.35)" }}
          />
        </span>
        <h2 className="text-[24px] md:text-[28px] font-medium tracking-[-0.5px] text-[var(--text-primary)] leading-[1.15]">
          {title}
        </h2>
        {subtitle && (
          <p className="mt-3 text-[15px] md:text-[16px] leading-[1.6] text-[var(--text-body)]">
            {subtitle}
          </p>
        )}
      </div>
    </Reveal>
  );
}

/* ── Body text ── */
export function SectionBody({ children }: { children: ReactNode }) {
  return (
    <Reveal variant="up">
      <div className="text-[14px] md:text-[15px] leading-[1.75] text-[var(--text-body)] space-y-4 max-w-[640px]">
        {children}
      </div>
    </Reveal>
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
  const frame = (
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
  );

  return (
    <Reveal variant="scale" duration={0.9}>
      <div className={`my-12 md:my-16 ${wide ? "-mx-4 sm:-mx-8 md:-mx-12 lg:-mx-20" : ""}`}>
        {/* Screenshots are the best visual asset on the page — give them
            a mild scroll-linked drift instead of sitting dead still.
            Only real screenshots parallax; the flat-color placeholder
            variant (no imageSrc) stays static. */}
        {imageSrc ? <ParallaxWrap range={16}>{frame}</ParallaxWrap> : frame}
        {caption && (
          <p className={`mt-3 text-[12px] tracking-[0.1px] text-[var(--text-muted)] ${wide ? "px-4 sm:px-8 md:px-12 lg:px-20" : ""}`}>
            {caption}
          </p>
        )}
      </div>
    </Reveal>
  );
}

/* ── Animated stat number ── */
function AnimatedValue({ raw }: { raw: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-20px" });
  // Default to the real, final value — not "0" — so a reader without
  // JS (or before the count-up kicks in) always sees the correct
  // number rather than a placeholder that never resolves.
  const [display, setDisplay] = useState(raw);

  useEffect(() => {
    if (!inView) return;
    // Generic parse: optional non-numeric prefix (e.g. "$"), the
    // numeric body (commas/decimal allowed), optional non-numeric
    // suffix (e.g. "+", "K"). Anything that doesn't match this shape
    // (rare) just renders as-is, no animation.
    const match = raw.match(/^(\D*)([\d,.]+)(\D*)$/);
    if (!match) {
      setDisplay(raw);
      return;
    }
    const [, prefix, numStr, suffix] = match;
    const target = parseFloat(numStr.replace(/,/g, ""));
    if (Number.isNaN(target)) {
      setDisplay(raw);
      return;
    }
    const isDecimal = /\.\d/.test(numStr);
    const controls = animate(0, target, {
      duration: 1.8,
      ease: [0.16, 1, 0.3, 1],
      onUpdate(v) {
        const formatted = isDecimal
          ? v.toFixed(1)
          : target >= 1000
          ? Math.floor(v).toLocaleString()
          : Math.floor(v).toString();
        setDisplay(prefix + formatted + suffix);
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
    <div className="grid grid-cols-2 md:grid-cols-3 gap-6 my-10 md:my-14">
      {items.map((item, i) => (
        <Reveal key={item.label} variant="up-sm" delay={i * 0.09} duration={0.7}>
          <motion.div
            className="rounded-[12px] p-5 md:p-6"
            style={{
              background: "rgba(242,242,242,0.02)",
              border: "1px solid rgba(242,242,242,0.04)",
            }}
            whileHover={{
              y: -3,
              borderColor: "rgba(127,207,255,0.18)",
              transition: { duration: 0.3, ease },
            }}
          >
            <span className="block text-[28px] md:text-[34px] font-semibold tracking-[-0.5px] text-[var(--text-primary)] tabular-nums">
              <AnimatedValue raw={item.value} />
            </span>
            <span className="block text-[12px] tracking-[0.1px] text-[var(--text-body)] mt-1.5">
              {item.label}
            </span>
          </motion.div>
        </Reveal>
      ))}
    </div>
  );
}

/* ── Feature / principle card row ── */
export function PrincipleCards({
  items,
}: {
  items: { number: string; title: string; description: string }[];
}) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-10 md:my-14">
      {items.map((item, i) => (
        <Reveal key={item.number} variant="up" delay={i * 0.08}>
          <div
            className="rounded-[12px] p-5 md:p-6 h-full transition-[border-color] duration-500"
            style={{
              background: "linear-gradient(190deg, rgba(242,242,242,0.03), rgba(242,242,242,0.01))",
              border: "1px solid rgba(242,242,242,0.04)",
            }}
          >
            <span className="text-[11px] text-[var(--text-muted)] tracking-[0.15em] block mb-3">
              {item.number}
            </span>
            <h4 className="text-[15px] font-medium text-[var(--text-primary)] mb-2">
              {item.title}
            </h4>
            <p className="text-[13px] leading-[1.6] text-[var(--text-body)]">
              {item.description}
            </p>
          </div>
        </Reveal>
      ))}
    </div>
  );
}

/* ── Constraint / problem item ── */
export function ConstraintList({
  items,
}: {
  items: { title: string; description: string }[];
}) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-8">
      {items.map((item, i) => (
        <Reveal key={item.title} variant="up-sm" delay={i * 0.06}>
          <div
            className="flex gap-3 rounded-[10px] p-4 h-full"
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
              <h4 className="text-[14px] font-medium text-[var(--text-secondary)] mb-1">
                {item.title}
              </h4>
              <p className="text-[13px] leading-[1.5] text-[var(--text-body)]">
                {item.description}
              </p>
            </div>
          </div>
        </Reveal>
      ))}
    </div>
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
    <Reveal variant="up-sm">
      <div className="my-12 md:my-16 -mx-1 overflow-x-auto" style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}>
        <div className="flex items-start px-1" style={{ minWidth: "max-content" }}>
          {stages.map((stage, i) => (
            <Fragment key={stage.label}>
              <Reveal
                variant="up-sm"
                duration={0.5}
                delay={i * 0.12}
                className="flex flex-col items-center"
              >
                <div style={{ width: "100px" }}>
                  <div
                    className="w-full rounded-[10px] px-2.5 py-2.5 text-center"
                    style={{
                      background: "rgba(242,242,242,0.025)",
                      border: "1px solid rgba(242,242,242,0.08)",
                    }}
                  >
                    <span className="text-[11px] font-medium text-[var(--text-secondary)] leading-[1.3] block">
                      {stage.label}
                    </span>
                  </div>
                  {stage.sub && (
                    <span className="text-[9.5px] text-[var(--text-muted)] mt-1.5 text-center leading-[1.3] px-1 block">
                      {stage.sub}
                    </span>
                  )}
                </div>
              </Reveal>

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
    </Reveal>
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
    <Reveal variant="up-lg">
      <div
        className="my-20 pt-12"
        style={{ borderTop: "1px solid rgba(242,242,242,0.04)" }}
      >
        <span className="text-[10px] uppercase tracking-[0.15em] text-[var(--text-muted)] block mb-6">
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
                <h3 className="text-[18px] md:text-[20px] font-medium text-[var(--text-primary)]">
                  {title}
                </h3>
                <p className="text-[13px] text-[var(--text-body)] mt-1">
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
    </Reveal>
  );
}
