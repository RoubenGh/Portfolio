"use client";

import FadeIn from "./FadeIn";

export default function Footer() {
  return (
    <footer
      style={{
        borderTop: "1px solid rgba(242,242,242,0.06)",
        background: "linear-gradient(to bottom, rgba(242,242,242,0.01), rgba(242,242,242,0.02))",
      }}
    >
      <div className="mx-auto max-w-[880px] px-4 md:px-0 pt-24 pb-16">
        <FadeIn y={24}>
          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-12">
            <div>
              <span className="block text-[14px] font-medium tracking-[-0.01em] text-[var(--text-primary)]">
                Rouben Ghambaryan
              </span>
              <span className="block text-[11px] tracking-[0.15px] text-[var(--text-muted)] mt-1.5">
                Systems Engineer &amp; Founder
              </span>
            </div>

            <div className="flex gap-16">
              <div>
                <span className="block text-[10px] uppercase tracking-[0.15em] text-[var(--text-muted)] mb-4">
                  Main
                </span>
                <div className="flex flex-col gap-3">
                  <a
                    href="#work"
                    className="text-[13px] font-medium text-[var(--text-body)] hover:text-[var(--text-primary)] transition-all duration-200"
                    style={{ "--transition-easing": "cubic-bezier(0.165, 0.84, 0.44, 1)" } as React.CSSProperties}
                  >
                    Work
                  </a>
                  <a
                    href="#about"
                    className="text-[13px] font-medium text-[var(--text-body)] hover:text-[var(--text-primary)] transition-all duration-200"
                    style={{ "--transition-easing": "cubic-bezier(0.165, 0.84, 0.44, 1)" } as React.CSSProperties}
                  >
                    About
                  </a>
                </div>
              </div>
              <div>
                <span className="block text-[10px] uppercase tracking-[0.15em] text-[var(--text-muted)] mb-4">
                  Elsewhere
                </span>
                <div className="flex flex-col gap-3">
                  <a
                    href="https://www.linkedin.com/in/rouben-ghambaryan/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[13px] font-medium text-[var(--text-body)] hover:text-[var(--text-primary)] transition-all duration-200"
                    style={{ "--transition-easing": "cubic-bezier(0.165, 0.84, 0.44, 1)" } as React.CSSProperties}
                  >
                    LinkedIn
                  </a>
                  <a
                    href="/resume.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[13px] font-medium text-[var(--text-body)] hover:text-[var(--text-primary)] transition-all duration-200"
                    style={{ "--transition-easing": "cubic-bezier(0.165, 0.84, 0.44, 1)" } as React.CSSProperties}
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
            className="mt-16 pt-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4"
            style={{ borderTop: "1px solid rgba(242,242,242,0.04)" }}
          >
            <span className="text-[12px] text-[var(--text-faint)]">
              &copy; {new Date().getFullYear()} Rouben Ghambaryan. All Rights
              Reserved.
            </span>
            <span className="text-[12px] text-[var(--text-faint)]">
              Built with precision and too much coffee.
            </span>
          </div>
        </FadeIn>
      </div>
    </footer>
  );
}
