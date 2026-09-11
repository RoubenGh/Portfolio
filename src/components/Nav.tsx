"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useSpring,
  useReducedMotion,
} from "framer-motion";
import ScrollProgress from "./ScrollProgress";

const MotionLink = motion.create(Link);

/** True only for a fine-pointer, hover-capable input (i.e. a real mouse),
 *  and only once mounted so the server/client first paint agree. */
function useMagneticEnabled() {
  const prefersReducedMotion = useReducedMotion();
  const [mounted, setMounted] = useState(false);
  const [hoverCapable, setHoverCapable] = useState(false);

  useEffect(() => {
    setMounted(true);
    if (typeof window === "undefined" || !window.matchMedia) return;
    const mq = window.matchMedia("(hover: hover) and (pointer: fine)");
    setHoverCapable(mq.matches);
    const update = (e: MediaQueryListEvent) => setHoverCapable(e.matches);
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  return mounted && hoverCapable && !prefersReducedMotion;
}

/** Nav link with a small, spring-backed pull toward the cursor on approach.
 *  Fully inert (no listeners attached at all) unless magnetic hover is enabled. */
function MagneticLink({
  href,
  className,
  children,
  target,
  rel,
  onElementRef,
  strength = 0.35,
}: {
  href: string;
  className?: string;
  children: React.ReactNode;
  target?: string;
  rel?: string;
  onElementRef?: (el: HTMLAnchorElement | null) => void;
  strength?: number;
}) {
  const enabled = useMagneticEnabled();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 300, damping: 22, mass: 0.4 });
  const springY = useSpring(y, { stiffness: 300, damping: 22, mass: 0.4 });
  const elRef = useRef<HTMLAnchorElement | null>(null);

  const handleMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const el = elRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    x.set((e.clientX - rect.left - rect.width / 2) * strength);
    y.set((e.clientY - rect.top - rect.height / 2) * strength);
  };
  const handleLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <MotionLink
      href={href}
      target={target}
      rel={rel}
      ref={(node: HTMLAnchorElement | null) => {
        elRef.current = node;
        onElementRef?.(node);
      }}
      className={className}
      style={enabled ? { x: springX, y: springY } : undefined}
      onMouseMove={enabled ? handleMove : undefined}
      onMouseLeave={enabled ? handleLeave : undefined}
    >
      {children}
    </MotionLink>
  );
}

export default function Nav() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<"work" | "about" | null>(
    null
  );

  const pillRef = useRef<HTMLDivElement>(null);
  const workLinkRef = useRef<HTMLAnchorElement | null>(null);
  const aboutLinkRef = useRef<HTMLAnchorElement | null>(null);
  const [indicator, setIndicator] = useState({ left: 0, width: 24, opacity: 0.6 });

  // Track which section is actually in view as the reader scrolls.
  useEffect(() => {
    const ids = ["work", "about"] as const;
    const observer = new IntersectionObserver(
      (entries) => {
        let best: { id: "work" | "about"; ratio: number } | null = null;
        for (const entry of entries) {
          if (
            entry.isIntersecting &&
            (!best || entry.intersectionRatio > best.ratio)
          ) {
            best = {
              id: entry.target.id as "work" | "about",
              ratio: entry.intersectionRatio,
            };
          }
        }
        if (best) setActiveSection(best.id);
      },
      { rootMargin: "-30% 0px -55% 0px", threshold: [0, 0.25, 0.5, 0.75, 1] }
    );

    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    // Above both sections (e.g. still on the hero) — fall back to the
    // neutral, centered treatment rather than sticking on a stale section.
    const clearIfAboveWork = () => {
      const workEl = document.getElementById("work");
      if (workEl && workEl.getBoundingClientRect().top > window.innerHeight * 0.6) {
        setActiveSection(null);
      }
    };
    window.addEventListener("scroll", clearIfAboveWork, { passive: true });
    clearIfAboveWork();

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", clearIfAboveWork);
    };
  }, []);

  // Measure the active link's position (in px, relative to the pill) so the
  // existing indicator line can glide to sit above it instead of staying
  // centered. Sections that don't exist on this page (case studies) simply
  // never set activeSection, so the indicator keeps its original default.
  useEffect(() => {
    function measure() {
      const pill = pillRef.current;
      if (!pill) return;
      const pillRect = pill.getBoundingClientRect();
      const target =
        activeSection === "work"
          ? workLinkRef.current
          : activeSection === "about"
          ? aboutLinkRef.current
          : null;

      if (target) {
        const linkRect = target.getBoundingClientRect();
        setIndicator({
          left: linkRect.left - pillRect.left + linkRect.width / 2 - 12,
          width: 24,
          opacity: 0.85,
        });
      } else {
        setIndicator({
          left: pillRect.width / 2 - 12,
          width: 24,
          opacity: 0.6,
        });
      }
    }

    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [activeSection]);

  return (
    <>
      <ScrollProgress />
      <nav
        className="fixed top-0 left-0 right-0 z-50"
        style={{
          backgroundImage:
            "linear-gradient(rgba(10,10,10,0.55), transparent)",
          height: "120px",
          pointerEvents: "none",
        }}
      >
        <div
          className="mx-auto max-w-[960px] px-6 md:px-10 flex items-center justify-between"
          style={{ paddingTop: "24px", pointerEvents: "auto" }}
        >
          {/* Left — Identity */}
          <Link href="/" className="flex flex-col gap-0.5 group">
            <span className="text-[14px] font-medium tracking-[-0.01em] text-[var(--text-primary)] group-hover:text-white transition-colors duration-300">
              Rouben Ghambaryan
            </span>
            <span className="text-[11px] tracking-[0.15px] text-[var(--text-body)]">
              Systems Engineer
            </span>
          </Link>

          {/* Center — Floating pill */}
          <div className="hidden md:flex items-center">
            <div
              ref={pillRef}
              className="relative flex items-center rounded-full px-1 py-1"
              style={{
                background: "rgba(242,242,242,0.04)",
                border: "1px solid rgba(242,242,242,0.07)",
                backdropFilter: "blur(20px)",
                boxShadow:
                  "0 4px 24px rgba(0,0,0,0.25), inset 0 0.5px 0 rgba(242,242,242,0.06)",
              }}
            >
              <motion.div
                className="absolute top-0 h-[3px] rounded-full pointer-events-none"
                style={{
                  background: "white",
                  boxShadow: "0 0 12px 2px rgba(255,255,255,0.4)",
                }}
                animate={indicator}
                transition={{ duration: 0.45, ease: [0.165, 0.84, 0.44, 1] }}
              />
              <MagneticLink
                href="/#work"
                onElementRef={(el) => (workLinkRef.current = el)}
                className={`relative z-10 px-5 py-1.5 text-[12px] font-medium tracking-[0.2px] transition-colors duration-300 ${
                  activeSection === "work"
                    ? "text-white"
                    : "text-[var(--text-primary)] hover:text-white"
                }`}
              >
                Work
              </MagneticLink>
              <MagneticLink
                href="/#about"
                onElementRef={(el) => (aboutLinkRef.current = el)}
                className={`relative z-10 px-5 py-1.5 text-[12px] font-medium tracking-[0.2px] transition-colors duration-300 ${
                  activeSection === "about"
                    ? "text-[var(--text-primary)]"
                    : "text-[var(--text-muted)] hover:text-[var(--text-primary)]"
                }`}
              >
                About
              </MagneticLink>
            </div>
          </div>

          {/* Right */}
          <div className="hidden md:flex items-center gap-1">
            <MagneticLink
              href="https://www.linkedin.com/in/rouben-ghambaryan/"
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 py-1.5 rounded-full text-[12px] font-medium tracking-[0.2px] text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-[rgba(242,242,242,0.04)] transition-all duration-300"
            >
              LinkedIn
            </MagneticLink>
            <MagneticLink
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 py-1.5 rounded-full text-[12px] font-medium tracking-[0.2px] text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-[rgba(242,242,242,0.04)] transition-all duration-300"
            >
              Resume
            </MagneticLink>
          </div>

          {/* Mobile toggle */}
          <button
            className="md:hidden p-2.5 rounded-full"
            style={{
              background: "rgba(242,242,242,0.05)",
              backdropFilter: "blur(12px)",
              border: "1px solid rgba(242,242,242,0.06)",
            }}
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            <span
              className={`block w-4 h-[1.5px] bg-[var(--color-fg-80)] transition-all duration-300 ${
                mobileOpen ? "rotate-45 translate-y-[3.5px]" : ""
              }`}
            />
            <span
              className={`block w-4 h-[1.5px] bg-[var(--color-fg-80)] transition-all duration-300 mt-[5px] ${
                mobileOpen ? "-rotate-45 -translate-y-[3px]" : ""
              }`}
            />
          </button>
        </div>

        {/* Mobile menu */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 z-40 md:hidden"
              style={{
                background: "rgba(10,10,10,0.96)",
                backdropFilter: "blur(8px)",
                pointerEvents: "auto",
              }}
            >
              <div className="flex flex-col items-start justify-center h-full px-8 gap-7">
                {[
                  { label: "Work", href: "/#work" },
                  { label: "About", href: "/#about" },
                  { label: "LinkedIn", href: "https://www.linkedin.com/in/rouben-ghambaryan/" },
                  { label: "Resume", href: "/resume.pdf" },
                ].map((link, i) => (
                  <motion.a
                    key={link.label}
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      delay: 0.08 + i * 0.05,
                      duration: 0.5,
                      ease: [0.165, 0.84, 0.44, 1] as const,
                    }}
                    className="text-[28px] font-light tracking-[-0.5px] text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
                  >
                    {link.label}
                  </motion.a>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </>
  );
}
