"use client";

import FadeIn from "./FadeIn";

export default function Footer() {
  return (
    <footer style={{ borderTop: "1px solid rgba(242,242,242,0.04)" }}>
      <div className="mx-auto max-w-[880px] px-4 md:px-0 pt-20 pb-14">
        <FadeIn y={24}>
          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-12">
            <div>
              <span className="block text-[14px] font-medium tracking-[-0.01em] text-[var(--color-fg-80)]">
                Rouben Ghambaryan
              </span>
              <span className="block text-[11px] tracking-[0.15px] text-[var(--color-fg-15)] mt-1.5">
                Systems Engineer &amp; Founder
              </span>
            </div>

            <div className="flex gap-16">
              <div>
                <span className="block text-[10px] uppercase tracking-[0.15em] text-[var(--color-fg-15)] mb-4">
                  Main
                </span>
                <div className="flex flex-col gap-3">
                  <a
                    href="#work"
                    className="text-[13px] font-medium text-[var(--color-fg-30)] hover:text-[var(--color-fg-80)] transition-colors duration-300"
                  >
                    Work
                  </a>
                  <a
                    href="#about"
                    className="text-[13px] font-medium text-[var(--color-fg-30)] hover:text-[var(--color-fg-80)] transition-colors duration-300"
                  >
                    About
                  </a>
                </div>
              </div>
              <div>
                <span className="block text-[10px] uppercase tracking-[0.15em] text-[var(--color-fg-15)] mb-4">
                  Elsewhere
                </span>
                <div className="flex flex-col gap-3">
                  <a
                    href="https://www.linkedin.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[13px] font-medium text-[var(--color-fg-30)] hover:text-[var(--color-fg-80)] transition-colors duration-300"
                  >
                    LinkedIn
                  </a>
                  <a
                    href="#"
                    className="text-[13px] font-medium text-[var(--color-fg-30)] hover:text-[var(--color-fg-80)] transition-colors duration-300"
                  >
                    Resume
                  </a>
                </div>
              </div>
            </div>
          </div>
        </FadeIn>

        <FadeIn delay={0.08} y={16}>
          <div
            className="mt-14 pt-6 flex flex-col md:flex-row md:items-center md:justify-between gap-1"
            style={{ borderTop: "1px solid rgba(242,242,242,0.04)" }}
          >
            <span className="text-[12px] text-[var(--color-fg-15)]">
              &copy; {new Date().getFullYear()} Rouben Ghambaryan. All Rights
              Reserved.
            </span>
            <span className="text-[12px] text-[var(--color-fg-10)]">
              Built with precision and too much coffee.
            </span>
          </div>
        </FadeIn>
      </div>
    </footer>
  );
}
