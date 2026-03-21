"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const ArrowIcon = () => (
  <svg
    width="11"
    height="11"
    viewBox="0 0 12 12"
    fill="none"
    className="opacity-50 group-hover:opacity-100 transition-opacity"
  >
    <path
      d="M2 10L10 2M10 2H5M10 2v5"
      stroke="currentColor"
      strokeWidth="1.2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default function Nav() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50" style={{
      backgroundImage: "linear-gradient(rgba(10, 10, 10, 0.6), transparent)",
      height: "140px",
      pointerEvents: "none",
    }}>
      <div
        className="mx-auto max-w-[960px] px-6 md:px-12 flex items-center justify-between"
        style={{ paddingTop: "28px", pointerEvents: "auto" }}
      >
        {/* Left — Identity */}
        <div className="flex items-center gap-3">
          <div>
            <span className="block text-[15px] font-medium tracking-[-0.01em] text-[var(--color-fg)]">
              Rouben Ghambaryan
            </span>
            <span className="block text-[11px] tracking-[0.2px] text-[var(--color-fg-50)] mt-0.5">
              Systems Engineer & Founder
            </span>
          </div>
        </div>

        {/* Center — Pill nav */}
        <div className="hidden md:flex items-center">
          <div
            className="relative flex items-center gap-0 rounded-full border px-1 py-1"
            style={{
              background: "rgba(242,242,242,0.04)",
              borderColor: "rgba(242,242,242,0.08)",
              backdropFilter: "blur(15px)",
              boxShadow: "0 10px 25px rgba(0,0,0,0.15)",
            }}
          >
            <a
              href="#work"
              className="relative z-10 px-5 py-1.5 text-[13px] font-medium tracking-[0.2px] text-[var(--color-fg)] transition-colors hover:text-white"
            >
              Work
            </a>
            <a
              href="#about"
              className="relative z-10 px-5 py-1.5 text-[13px] font-medium tracking-[0.2px] text-[var(--color-fg-50)] transition-colors hover:text-[var(--color-fg)]"
            >
              About
            </a>
          </div>
        </div>

        {/* Right — Social links */}
        <div className="hidden md:flex items-center gap-5">
          <a
            href="https://www.linkedin.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-1.5 text-[13px] font-medium tracking-[0.2px] text-[var(--color-fg-50)] transition-colors hover:text-[var(--color-fg)]"
          >
            LinkedIn <ArrowIcon />
          </a>
          <a
            href="https://github.com/RoubenGh"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-1.5 text-[13px] font-medium tracking-[0.2px] text-[var(--color-fg-50)] transition-colors hover:text-[var(--color-fg)]"
          >
            GitHub <ArrowIcon />
          </a>
        </div>

        {/* Mobile toggle */}
        <button
          className="md:hidden flex flex-col gap-[5px] p-2 rounded-full"
          style={{
            background: "rgba(242,242,242,0.05)",
            backdropFilter: "blur(8px)",
          }}
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          <span
            className={`block w-4 h-[1.5px] bg-[var(--color-fg)] transition-all duration-300 ${
              mobileOpen
                ? "rotate-45 translate-y-[3.25px]"
                : ""
            }`}
          />
          <span
            className={`block w-4 h-[1.5px] bg-[var(--color-fg)] transition-all duration-300 ${
              mobileOpen
                ? "-rotate-45 -translate-y-[3.25px]"
                : ""
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
              background: "rgba(10, 10, 10, 0.95)",
              backdropFilter: "blur(5px)",
              pointerEvents: "auto",
            }}
          >
            <div className="flex flex-col items-start justify-center h-full px-8 gap-8">
              {[
                { label: "Work", href: "#work" },
                { label: "About", href: "#about" },
                { label: "LinkedIn", href: "https://www.linkedin.com/" },
                { label: "GitHub", href: "https://github.com/RoubenGh" },
              ].map((link, i) => (
                <motion.a
                  key={link.label}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    delay: 0.1 + i * 0.06,
                    duration: 0.5,
                    ease: [0.165, 0.84, 0.44, 1],
                  }}
                  className="text-[32px] font-light tracking-[-0.5px] text-[var(--color-fg)] hover:text-white transition-colors"
                >
                  {link.label}
                </motion.a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
