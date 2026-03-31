"use client";

import FadeIn from "./FadeIn";

export default function About() {
  return (
    <section id="about" className="relative py-36 md:py-52">
      {/* Ambient light */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(242,242,242,0.012), transparent 70%)",
        }}
      />

      <div className="relative mx-auto max-w-[880px] px-4 md:px-0">
        <FadeIn>
          <span className="text-[11px] uppercase tracking-[0.15em] text-[var(--color-fg-15)] block mb-14">
            About
          </span>
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-6">
          <div className="md:col-span-5">
            <FadeIn delay={0.08}>
              <p className="text-[26px] md:text-[32px] font-medium leading-[1.12] tracking-[-0.8px] text-[var(--color-fg)]">
                Engineer who
                <br />
                builds things that
                <br />
                <span
                  className="gradient-text-fade inline-block"
                  style={{
                    fontFamily: "var(--font-serif)",
                    fontStyle: "italic",
                    fontWeight: 400,
                    letterSpacing: "-0.5px",
                  }}
                >
                  run themselves.
                </span>
              </p>
            </FadeIn>
          </div>

          <div className="md:col-span-6 md:col-start-7">
            <FadeIn delay={0.16}>
              <p className="text-[14px] md:text-[15px] leading-[1.7] text-[var(--color-fg-30)]">
                I build production infrastructure at scale: cloud platforms,
                backend services, data automation pipelines, and AI-assisted
                tools. My work sits at the intersection of systems engineering
                and product thinking.
              </p>
            </FadeIn>
            <FadeIn delay={0.2}>
              <p className="mt-5 text-[14px] md:text-[15px] leading-[1.7] text-[var(--color-fg-30)]">
                I founded{" "}
                <span className="text-[var(--color-fg-80)]">RLA Studios</span>{" "}
                to apply systems thinking to creative work, turning manual
                processes into pipelines that scale without adding complexity.
              </p>
            </FadeIn>
          </div>
        </div>
      </div>
    </section>
  );
}
