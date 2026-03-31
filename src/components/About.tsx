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
                Engineer building
                <br />
                systems that
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
                I work on production infrastructure and applications that
                support real users at scale. That includes everything from
                cloud environments and DNS to backend services, automation
                pipelines, and legacy systems that need to stay online no
                matter what.
              </p>
            </FadeIn>
            <FadeIn delay={0.2}>
              <p className="mt-5 text-[14px] md:text-[15px] leading-[1.7] text-[var(--color-fg-30)]">
                Most of my experience comes from operating live systems, not
                just building them. Debugging broken payment flows, tracing
                down infrastructure issues, and keeping hundreds of
                environments stable has shaped how I approach engineering:
                keep it simple, make it reliable, and remove as many failure
                points as possible.
              </p>
            </FadeIn>
            <FadeIn delay={0.24}>
              <p className="mt-5 text-[14px] md:text-[15px] leading-[1.7] text-[var(--color-fg-30)]">
                I tend to focus on turning messy, manual processes into clean,
                repeatable systems. Whether it&apos;s internal tools, data
                pipelines, or full application workflows, the goal is always
                the same: make it predictable, scalable, and low maintenance.
              </p>
            </FadeIn>
            <FadeIn delay={0.28}>
              <p className="mt-5 text-[14px] md:text-[15px] leading-[1.7] text-[var(--color-fg-30)]">
                <span className="text-[var(--color-fg-80)]">RLA Studios</span>{" "}
                came out of that same mindset. What started as creative work
                evolved into building systems behind it, automating everything
                from client intake to delivery so it can scale without becoming
                operational overhead.
              </p>
            </FadeIn>
            <FadeIn delay={0.32}>
              <p className="mt-5 text-[14px] md:text-[15px] leading-[1.7] text-[var(--color-fg-30)]">
                I&apos;m less interested in perfect architecture diagrams and
                more in systems that actually hold up in production, under
                load, with real users.
              </p>
            </FadeIn>
            <FadeIn delay={0.36}>
              <p className="mt-5 text-[14px] md:text-[15px] leading-[1.7] text-[var(--color-fg-30)]">
                Outside of work, I&apos;m usually watching tennis or F1, which
                probably explains why I care a bit too much about performance,
                consistency, and things working exactly the way they should.
              </p>
            </FadeIn>
          </div>
        </div>
      </div>
    </section>
  );
}
