"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Nav() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50"
      style={{
        backgroundImage:
          "linear-gradient(rgba(10,10,10,0.5), transparent)",
        height: "100px",
        pointerEvents: "none",
      }}
    >
      <div
        className="mx-auto max-w-[880px] px-5 md:px-10 flex items-center justify-between"
        style={{ paddingTop: "24px", pointerEvents: "auto" }}
      >
        {/* Left — name only, no subtitle */}
        <a
          href="#"
          className="text-[14px] font-medium tracking-[-0.01em] text-[var(--color-fg-80)] hover:text-[var(--color-fg)] transition-colors duration-300"
        >
          Rouben Ghambaryan
        </a>

        {/* Center — minimal pill */}
        <div className="hidden md:flex items-center">
          <div
            className="flex items-center rounded-full px-0.5 py-0.5"
            style={{
              background: "rgba(242,242,242,0.03)",
              border: "1px solid rgba(242,242,242,0.06)",
              backdropFilter: "blur(12px)",
            }}
          >
            <a
              href="#work"
              className="px-4 py-1 text-[12px] font-medium tracking-[0.3px] text-[var(--color-fg-80)] hover:text-[var(--color-fg)] transition-colors duration-300"
            >
              Work
            </a>
            <a
              href="#about"
              className="px-4 py-1 text-[12px] font-medium tracking-[0.3px] text-[var(--color-fg-30)] hover:text-[var(--color-fg-80)] transition-colors duration-300"
            >
              About
            </a>
          </div>
        </div>

        {/* Right — quiet links */}
        <div className="hidden md:flex items-center gap-4">
          <a
            href="https://www.linkedin.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[12px] font-medium tracking-[0.3px] text-[var(--color-fg-30)] hover:text-[var(--color-fg-80)] transition-colors duration-300"
          >
            Li
          </a>
          <a
            href="https://github.com/RoubenGh"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[12px] font-medium tracking-[0.3px] text-[var(--color-fg-30)] hover:text-[var(--color-fg-80)] transition-colors duration-300"
          >
            Gh
          </a>
        </div>

        {/* Mobile toggle */}
        <button
          className="md:hidden p-2"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          <span
            className={`block w-4 h-[1px] bg-[var(--color-fg-50)] transition-all duration-300 ${
              mobileOpen ? "rotate-45 translate-y-[3px]" : ""
            }`}
          />
          <span
            className={`block w-4 h-[1px] bg-[var(--color-fg-50)] transition-all duration-300 mt-[5px] ${
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
              backdropFilter: "blur(4px)",
              pointerEvents: "auto",
            }}
          >
            <div className="flex flex-col items-start justify-center h-full px-8 gap-7">
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
