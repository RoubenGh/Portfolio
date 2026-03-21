"use client";

import FadeIn from "./FadeIn";

export default function Footer() {
  return (
    <footer
      className="relative"
      style={{ borderTop: "1px solid rgba(242,242,242,0.06)" }}
    >
      <div className="mx-auto max-w-[880px] px-4 md:px-0 pt-20 pb-16">
        <FadeIn y={30}>
          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-12">
            {/* Left — brand */}
            <div>
              <span className="block text-[15px] font-medium tracking-[-0.01em] text-[var(--color-fg)]">
                Rouben Ghambaryan
              </span>
              <span className="block text-[12px] tracking-[0.2px] text-[var(--color-fg-30)] mt-1.5">
                Systems Engineer & Founder
              </span>
            </div>

            {/* Right — link columns */}
            <div className="flex gap-16 md:gap-20">
              <div>
                <span className="block text-[10px] uppercase tracking-[0.15em] text-[var(--color-fg-30)] mb-4">
                  Main
                </span>
                <div className="flex flex-col gap-3">
                  <a
                    href="#work"
                    className="text-[14px] font-medium text-[var(--color-fg-50)] hover:text-[var(--color-fg)] transition-colors duration-300"
                  >
                    Work
                  </a>
                  <a
                    href="#about"
                    className="text-[14px] font-medium text-[var(--color-fg-50)] hover:text-[var(--color-fg)] transition-colors duration-300"
                  >
                    About
                  </a>
                </div>
              </div>
              <div>
                <span className="block text-[10px] uppercase tracking-[0.15em] text-[var(--color-fg-30)] mb-4">
                  Contact
                </span>
                <div className="flex flex-col gap-3">
                  <a
                    href="https://www.linkedin.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[14px] font-medium text-[var(--color-fg-50)] hover:text-[var(--color-fg)] transition-colors duration-300 inline-flex items-center gap-1.5"
                  >
                    LinkedIn
                    <svg
                      width="10"
                      height="10"
                      viewBox="0 0 12 12"
                      fill="none"
                      className="opacity-40"
                    >
                      <path
                        d="M2 10L10 2M10 2H5M10 2v5"
                        stroke="currentColor"
                        strokeWidth="1.2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </a>
                  <a
                    href="https://github.com/RoubenGh"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[14px] font-medium text-[var(--color-fg-50)] hover:text-[var(--color-fg)] transition-colors duration-300 inline-flex items-center gap-1.5"
                  >
                    GitHub
                    <svg
                      width="10"
                      height="10"
                      viewBox="0 0 12 12"
                      fill="none"
                      className="opacity-40"
                    >
                      <path
                        d="M2 10L10 2M10 2H5M10 2v5"
                        stroke="currentColor"
                        strokeWidth="1.2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </FadeIn>

        <FadeIn delay={0.1} y={20}>
          <div className="mt-16 pt-8 flex flex-col md:flex-row md:items-center md:justify-between gap-2" style={{ borderTop: "1px solid rgba(242,242,242,0.06)" }}>
            <span className="text-[13px] font-medium text-[var(--color-fg-50)]">
              &copy; {new Date().getFullYear()} Rouben Ghambaryan. All Rights
              Reserved.
            </span>
            <span className="text-[13px] text-[var(--color-fg-30)]">
              Built with precision and too much coffee.
            </span>
          </div>
        </FadeIn>
      </div>
    </footer>
  );
}
