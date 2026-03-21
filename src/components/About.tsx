"use client";

import FadeIn from "./FadeIn";

export default function About() {
  return (
    <section id="about" className="relative py-32 md:py-48">
      <div className="mx-auto max-w-[880px] px-4 md:px-0">
        <FadeIn>
          <div className="flex items-baseline gap-4 mb-16">
            <span className="text-[11px] uppercase tracking-[0.15em] text-[var(--color-fg-30)]">
              About
            </span>
            <div className="flex-1 h-px bg-[var(--color-fg-05)]" />
          </div>
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12">
          {/* Left label column */}
          <div className="md:col-span-4">
            <FadeIn delay={0.1}>
              <p className="text-[28px] md:text-[36px] font-medium leading-[1.15] tracking-[-1px] text-[var(--color-fg)]">
                Engineer who builds
                <br />
                things that{" "}
                <em
                  className="gradient-text-fade not-italic"
                  style={{ fontFamily: "var(--font-serif)" }}
                >
                  run themselves.
                </em>
              </p>
            </FadeIn>
          </div>

          {/* Right text column */}
          <div className="md:col-span-7 md:col-start-6">
            <FadeIn delay={0.2}>
              <p className="text-[15px] md:text-[16px] leading-[1.7] text-[var(--color-fg-50)]">
                I&apos;m a systems engineer who builds production infrastructure
                at scale — from cloud platforms and backend services to data
                automation pipelines and AI-assisted tools.
              </p>
            </FadeIn>
            <FadeIn delay={0.25}>
              <p className="mt-5 text-[15px] md:text-[16px] leading-[1.7] text-[var(--color-fg-50)]">
                I founded{" "}
                <span className="text-[var(--color-fg)] font-medium">
                  RLA Studios
                </span>{" "}
                to apply systems thinking to creative work — turning manual
                processes into automated pipelines that scale without adding
                complexity.
              </p>
            </FadeIn>
            <FadeIn delay={0.3}>
              <div className="mt-10 flex items-center gap-6">
                <a
                  href="https://www.linkedin.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[13px] font-medium tracking-[0.2px] text-[var(--color-fg-50)] hover:text-[var(--color-fg)] transition-colors duration-300"
                >
                  LinkedIn
                </a>
                <span className="w-px h-3 bg-[var(--color-fg-10)]" />
                <a
                  href="https://github.com/RoubenGh"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[13px] font-medium tracking-[0.2px] text-[var(--color-fg-50)] hover:text-[var(--color-fg)] transition-colors duration-300"
                >
                  GitHub
                </a>
                <span className="w-px h-3 bg-[var(--color-fg-10)]" />
                <a
                  href="#"
                  className="text-[13px] font-medium tracking-[0.2px] text-[var(--color-fg-50)] hover:text-[var(--color-fg)] transition-colors duration-300"
                >
                  Resume
                </a>
              </div>
            </FadeIn>
          </div>
        </div>
      </div>
    </section>
  );
}
