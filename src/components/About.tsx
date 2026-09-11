"use client";

import type { CSSProperties } from "react";
import OpsWall from "./OpsWall";

/** Inline style helper for the CSS custom properties the about.css
 *  keyframes/entrance classes read (--about-delay, --about-rise-y).
 *  Typed loosely because React's CSSProperties doesn't know about custom
 *  properties. Mirrors Hero.tsx's heroVars helper. */
function aboutVars(vars: Record<string, string>): CSSProperties {
  return vars as CSSProperties;
}

export default function About() {
  return (
    <section id="about" className="relative pt-20 pb-36 md:pt-24 md:pb-52">
      {/* Ambient light */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(242,242,242,0.012), transparent 70%)",
        }}
      />

      <div className="relative mx-auto max-w-[880px] px-4 md:px-0">
        <div
          className="about-reveal"
          style={aboutVars({ "--about-delay": "0s", "--about-rise-y": "14px" })}
        >
          <span className="text-[11px] uppercase tracking-[0.15em] text-[var(--text-muted)] block mb-14">
            About
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-6">
          <div className="md:col-span-5">
            {/* Heading — per-line masked reveal, same technique as the
                Hero headline (see globals.css: .about-line-mask /
                .about-line-inner mirror .hero-line-mask / .hero-line-inner)
                so the two headlines read as one family. */}
            <div
              className="about-reveal"
              style={aboutVars({ "--about-delay": "0.05s", "--about-rise-y": "22px" })}
            >
              <p
                aria-label="Engineer building systems that run themselves."
                className="text-[26px] md:text-[32px] font-medium leading-[1.12] tracking-[-0.8px] text-[var(--text-primary)]"
              >
                <span aria-hidden="true">
                  <span className="about-line-mask">
                    <span
                      className="about-line-inner"
                      style={aboutVars({ "--about-delay": "0.15s" })}
                    >
                      Engineer building
                    </span>
                  </span>
                  <span className="about-line-mask">
                    <span
                      className="about-line-inner"
                      style={aboutVars({ "--about-delay": "0.24s" })}
                    >
                      systems that
                    </span>
                  </span>
                  <span className="about-line-mask">
                    <span
                      className="about-line-inner gradient-text-fade inline-block"
                      style={{
                        fontFamily: "var(--font-serif)",
                        fontStyle: "italic",
                        fontWeight: 400,
                        letterSpacing: "-0.5px",
                        ...aboutVars({ "--about-delay": "0.33s" }),
                      }}
                    >
                      run themselves.
                    </span>
                  </span>
                </span>
              </p>
            </div>

            <OpsWall />
          </div>

          <div className="md:col-span-6 md:col-start-7">
            <div
              className="about-reveal"
              style={aboutVars({ "--about-delay": "0.1s", "--about-rise-y": "18px" })}
            >
              <p className="text-[14px] md:text-[15px] leading-[1.7] text-[var(--text-body)]">
                I work on production infrastructure and applications that
                support real users at scale. That includes everything from
                cloud environments and DNS to backend services, automation
                pipelines, and legacy systems that need to stay online no
                matter what.
              </p>
            </div>

            <div
              className="about-reveal mt-5"
              style={aboutVars({ "--about-delay": "0.05s", "--about-rise-y": "18px" })}
            >
              <p className="text-[14px] md:text-[15px] leading-[1.7] text-[var(--text-body)]">
                Most of my experience comes from operating live systems, not
                just building them. Debugging broken payment flows, tracing
                down infrastructure issues, and keeping{" "}
                <span className="text-[var(--text-secondary)]">
                  hundreds of environments
                </span>{" "}
                stable has shaped how I approach engineering: keep it simple,
                make it reliable, and remove as many failure points as
                possible.
              </p>
            </div>

            <div
              className="about-reveal mt-5"
              style={aboutVars({ "--about-delay": "0.05s", "--about-rise-y": "18px" })}
            >
              <p className="text-[14px] md:text-[15px] leading-[1.7] text-[var(--text-body)]">
                I tend to focus on turning messy, manual processes into clean,
                repeatable systems. Whether it&apos;s internal tools, data
                pipelines, or full application workflows, the goal is always
                the same: make it predictable, scalable, and low maintenance.
              </p>
            </div>

            <div
              className="about-reveal mt-5"
              style={aboutVars({ "--about-delay": "0.05s", "--about-rise-y": "18px" })}
            >
              <p className="text-[14px] md:text-[15px] leading-[1.7] text-[var(--text-body)]">
                <span className="text-[var(--text-secondary)]">RLA Studios</span>{" "}
                came out of that same mindset. What started as creative work
                evolved into building systems behind it, automating everything
                from client intake to delivery so it can scale without becoming
                operational overhead.
              </p>
            </div>

            {/* Pull-quote — the same sentence, re-set as a breakout instead
                of a seventh line of body copy. No words added or removed. */}
            <div
              className="about-reveal mt-8"
              style={aboutVars({ "--about-delay": "0.05s", "--about-rise-y": "14px" })}
            >
              <p
                className="relative pl-5 md:pl-6 text-[18px] md:text-[21px] leading-[1.45] tracking-[-0.3px] text-[var(--text-primary)]"
                style={{ fontFamily: "var(--font-serif)", fontStyle: "italic", fontWeight: 400 }}
              >
                <span
                  aria-hidden="true"
                  className="absolute left-0 top-[3px] bottom-[3px] w-[2px]"
                  style={{
                    background:
                      "linear-gradient(to bottom, rgba(127,207,255,0.55), rgba(127,207,255,0))",
                  }}
                />
                I&apos;m less interested in perfect architecture diagrams and
                more in systems that actually hold up in production, under
                load, with real users.
              </p>
            </div>

            <div
              className="about-reveal mt-8"
              style={aboutVars({ "--about-delay": "0.05s", "--about-rise-y": "14px" })}
            >
              <p className="text-[14px] leading-[1.7] text-[var(--text-muted)]">
                Outside of work, I&apos;m usually watching tennis or F1, which
                probably explains why I care a bit too much about performance,
                consistency, and things working exactly the way they should.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
