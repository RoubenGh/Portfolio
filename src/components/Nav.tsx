"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

export default function Nav() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
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
          <span className="text-[14px] font-medium tracking-[-0.01em] text-[var(--color-fg)] group-hover:text-white transition-colors duration-300">
            Rouben Ghambaryan
          </span>
          <span className="text-[11px] tracking-[0.15px] text-[var(--color-fg-30)]">
            Systems Engineer
          </span>
        </Link>

        {/* Center — Floating pill */}
        <div className="hidden md:flex items-center">
          <div
            className="relative flex items-center rounded-full px-1 py-1"
            style={{
              background: "rgba(242,242,242,0.04)",
              border: "1px solid rgba(242,242,242,0.07)",
              backdropFilter: "blur(20px)",
              boxShadow:
                "0 4px 24px rgba(0,0,0,0.25), inset 0 0.5px 0 rgba(242,242,242,0.06)",
            }}
          >
            <div
              className="absolute top-0 left-1/2 -translate-x-1/2 w-6 h-[3px] rounded-full"
              style={{
                background: "white",
                boxShadow: "0 0 12px 2px rgba(255,255,255,0.4)",
                opacity: 0.6,
              }}
            />
            <Link
              href="/#work"
              className="relative z-10 px-5 py-1.5 text-[12px] font-medium tracking-[0.2px] text-[var(--color-fg)] hover:text-white transition-colors duration-300"
            >
              Work
            </Link>
            <Link
              href="/#about"
              className="relative z-10 px-5 py-1.5 text-[12px] font-medium tracking-[0.2px] text-[var(--color-fg-50)] hover:text-[var(--color-fg)] transition-colors duration-300"
            >
              About
            </Link>
          </div>
        </div>

        {/* Right */}
        <div className="hidden md:flex items-center gap-1">
          <a
            href="https://www.linkedin.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="px-3 py-1.5 rounded-full text-[12px] font-medium tracking-[0.2px] text-[var(--color-fg-50)] hover:text-[var(--color-fg)] hover:bg-[rgba(242,242,242,0.04)] transition-all duration-300"
          >
            LinkedIn
          </a>
          <a
            href="#"
            className="px-3 py-1.5 rounded-full text-[12px] font-medium tracking-[0.2px] text-[var(--color-fg-50)] hover:text-[var(--color-fg)] hover:bg-[rgba(242,242,242,0.04)] transition-all duration-300"
          >
            Resume
          </a>
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
                { label: "LinkedIn", href: "https://www.linkedin.com/" },
                { label: "Resume", href: "#" },
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
                  className="text-[28px] font-light tracking-[-0.5px] text-[var(--color-fg-80)] hover:text-[var(--color-fg)] transition-colors"
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
