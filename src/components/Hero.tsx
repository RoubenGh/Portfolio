"use client";

import { useEffect, useRef, useState } from "react";
import type { CSSProperties, PointerEvent as ReactPointerEvent } from "react";

// Shared easing curve used site-wide by framer-motion. Kept here for the
// continuous node-glow loops below; the entrance/reveal animations were
// moved to plain CSS (see the "Hero" block at the end of globals.css) so
// the hero is guaranteed to reach a fully visible state even if React
// never hydrates. The CSS keyframes use the same cubic-bezier values.
const ease = [0.165, 0.84, 0.44, 1] as const;

const NET_NODES: { id: number; x: number; y: number; glow?: boolean }[] = [
  { id: 0,  x: 45,  y: 48,  glow: true  },
  { id: 1,  x: 188, y: 22               },
  { id: 2,  x: 338, y: 60,  glow: true  },
  { id: 3,  x: 498, y: 18               },
  { id: 4,  x: 638, y: 55,  glow: true  },
  { id: 5,  x: 762, y: 28               },
  { id: 6,  x: 812, y: 82               },
  { id: 7,  x: 65,  y: 172              },
  { id: 8,  x: 218, y: 192              },
  { id: 9,  x: 392, y: 158, glow: true  },
  { id: 10, x: 555, y: 185              },
  { id: 11, x: 702, y: 162              },
  { id: 12, x: 800, y: 195              },
  { id: 13, x: 132, y: 318              },
  { id: 14, x: 308, y: 348              },
  { id: 15, x: 498, y: 328, glow: true  },
  { id: 16, x: 668, y: 352              },
  { id: 17, x: 798, y: 315              },
];

const NET_EDGES = [
  [0,1],[1,2],[2,3],[3,4],[4,5],[5,6],
  [0,7],[7,8],[8,9],[9,10],[10,11],[11,12],
  [1,8],[2,9],[4,10],[5,11],[6,12],
  [7,13],[8,13],[9,14],[10,15],[11,16],[12,17],
  [13,14],[14,15],[15,16],[16,17],
];

// viewBox dimensions of the constellation svg — used to map pointer
// position into the same coordinate space as the node data above.
const VB_W = 820;
const VB_H = 380;
// Cursor-parallax tuning: nodes within MAX_DIST (viewBox units) of the
// pointer drift toward it by up to MAX_OFFSET units, falling off with the
// square of distance so the effect stays tight around the cursor instead
// of nudging the whole graph.
const MAX_DIST = 260;
const MAX_OFFSET = 9;

/** Inline style helper for the CSS custom properties the hero.css
 *  keyframes read (--hero-delay, --hero-rise-y). Typed loosely because
 *  React's CSSProperties doesn't know about custom properties. */
function heroVars(vars: Record<string, string>): CSSProperties {
  return vars as CSSProperties;
}

export default function Hero() {
  const contentRef = useRef<HTMLDivElement>(null);
  const nodeRefs = useRef<Record<number, SVGGElement | null>>({});
  const svgRef = useRef<SVGSVGElement>(null);
  const pointerRef = useRef<{ x: number; y: number } | null>(null);
  const rafRef = useRef<number | null>(null);
  const [parallaxEnabled, setParallaxEnabled] = useState(false);
  // Starts false (running) because the hero is the first thing on the
  // page and is almost always in view on load — unlike OpsWall, which
  // starts paused because it's below the fold. IntersectionObserver
  // corrects this quickly if the hero is ever scrolled past (e.g. a
  // deep link landing further down the page).
  const [constellationPaused, setConstellationPaused] = useState(false);

  // Pause the constellation's CSS animations the moment the hero
  // scrolls out of view, same pattern as OpsWall's IntersectionObserver
  // + `.opswall--paused` class — a visitor scrolled past the hero pays
  // nothing for it.
  useEffect(() => {
    const el = svgRef.current;
    if (!el || typeof IntersectionObserver === "undefined") return;
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) setConstellationPaused(!entry.isIntersecting);
      },
      { threshold: 0.1 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // Only wire up the cursor-reactive constellation for devices that
  // actually have a precise, hover-capable pointer (i.e. not touch), and
  // never for users who asked for reduced motion. Checked once on mount —
  // this only toggles whether the pointer handlers are attached, so it
  // can't cause a hydration mismatch (the SSR/first-paint markup is
  // identical either way).
  useEffect(() => {
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    setParallaxEnabled(fine && !reduced);
  }, []);

  useEffect(() => {
    return () => {
      if (rafRef.current != null) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  const applyParallax = () => {
    rafRef.current = null;
    const p = pointerRef.current;
    for (const node of NET_NODES) {
      const el = nodeRefs.current[node.id];
      if (!el) continue;
      if (!p) {
        el.style.transform = "";
        continue;
      }
      const dx = p.x - node.x;
      const dy = p.y - node.y;
      const dist = Math.hypot(dx, dy) || 1;
      const falloff = Math.max(0, 1 - dist / MAX_DIST);
      const strength = falloff * falloff * MAX_OFFSET;
      const ox = (dx / dist) * strength;
      const oy = (dy / dist) * strength;
      el.style.transform = `translate(${ox.toFixed(2)}px, ${oy.toFixed(2)}px)`;
    }
  };

  const handlePointerMove = (e: ReactPointerEvent<HTMLDivElement>) => {
    if (!contentRef.current) return;
    const rect = contentRef.current.getBoundingClientRect();
    pointerRef.current = {
      x: ((e.clientX - rect.left) / rect.width) * VB_W,
      y: ((e.clientY - rect.top) / rect.height) * VB_H,
    };
    if (rafRef.current == null) {
      rafRef.current = requestAnimationFrame(applyParallax);
    }
  };

  const handlePointerLeave = () => {
    pointerRef.current = null;
    if (rafRef.current == null) {
      rafRef.current = requestAnimationFrame(applyParallax);
    }
  };

  return (
    <section
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{
        paddingTop: "100px",
        paddingBottom: "60px",
        backgroundImage:
          "radial-gradient(circle closest-corner at 50% 0%, rgba(242,242,242,0.04), transparent)",
      }}
    >
      {/* Hero window card — CSS-driven entrance (see globals.css) so it
          reaches full opacity even if JS never hydrates. */}
      <div
        className="hero-anim relative mx-auto w-full max-w-[840px] md:max-w-[1120px] px-4 md:px-0"
        style={heroVars({ "--hero-rise-y": "48px", "--hero-delay": "0s" })}
      >
        {/* Outer bezel */}
        <div
          className="relative rounded-[22px] p-[7px]"
          style={{
            background:
              "radial-gradient(circle farthest-side at 50% 0%, rgba(242,242,242,0.09), transparent)",
            outline: "1px solid rgba(242,242,242,0.06)",
            boxShadow:
              "inset 0 0 6px rgba(0,0,0,0.3), 0 0 50px rgba(0,0,0,0.15), 0 30px 100px rgba(0,0,0,0.6)",
          }}
        >
          {/* Outer glare */}
          <div className="glare-line absolute top-0 left-[12%] right-[12%] z-10" />

          {/* Inner window */}
          <div
            className="relative rounded-[15px] overflow-hidden"
            style={{
              border: "1px solid rgba(242,242,242,0.1)",
              backdropFilter: "blur(20px)",
              boxShadow:
                "inset 0 0 8px rgba(0,0,0,0.08), 0 0 10px rgba(0,0,0,0.3)",
            }}
          >
            {/* Inner glare */}
            <div
              className="glare-line absolute top-0 left-[18%] right-[18%] z-10"
              style={{ height: "1.5px" }}
            />

            {/* Window title bar */}
            <div
              className="relative flex items-center h-[38px] px-4"
              style={{
                backgroundImage:
                  "linear-gradient(to right, rgba(242,242,242,0.03), rgba(242,242,242,0.08) 50%, rgba(242,242,242,0.03))",
                backdropFilter: "blur(40px)",
                boxShadow: "0 8px 16px 2px rgba(0,0,0,0.15)",
              }}
            >
              <div className="flex items-center gap-[6px]">
                <span
                  className="w-[10px] h-[10px] rounded-full"
                  style={{
                    background: "#f46b5d",
                    boxShadow: "0 0 12px 1px rgba(244,107,93,0.3)",
                  }}
                />
                <span
                  className="w-[10px] h-[10px] rounded-full"
                  style={{
                    background: "#f9bd4e",
                    boxShadow: "0 0 12px 1px rgba(249,189,78,0.3)",
                  }}
                />
                <span
                  className="w-[10px] h-[10px] rounded-full"
                  style={{
                    background: "#57c353",
                    boxShadow: "0 0 12px 1px rgba(87,195,83,0.3)",
                  }}
                />
              </div>
            </div>

            {/* Window content */}
            <div
              ref={contentRef}
              onPointerMove={parallaxEnabled ? handlePointerMove : undefined}
              onPointerLeave={parallaxEnabled ? handlePointerLeave : undefined}
              className="relative px-7 pt-14 pb-28 md:px-12 md:pt-16 md:pb-40"
              style={{ background: "rgba(10,10,10,0.65)" }}
            >
              {/* Network graph — nodes drift subtly toward the cursor
                  (desktop pointers only, see parallaxEnabled above). */}
              <svg
                ref={svgRef}
                className={`hero-constellation absolute inset-0 w-full h-full pointer-events-none${
                  constellationPaused ? " hero-constellation--paused" : ""
                }`}
                viewBox="0 0 820 380"
                preserveAspectRatio="xMidYMid slice"
                style={{ opacity: 0.4 }}
              >
                {NET_EDGES.map(([a, b]) => (
                  <line
                    key={`${a}-${b}`}
                    x1={NET_NODES[a].x} y1={NET_NODES[a].y}
                    x2={NET_NODES[b].x} y2={NET_NODES[b].y}
                    stroke="rgba(127,207,255,0.1)"
                    strokeWidth="0.8"
                  />
                ))}
                {NET_NODES.map((node) => {
                  // Per-node timing variation, computed once at render time
                  // (not per-frame) and applied as plain CSS animation
                  // properties — the pulse itself runs on the compositor,
                  // no JS involved once mounted. See the "Hero constellation"
                  // block in globals.css for the keyframes.
                  const duration = 3 + (node.id % 4) * 0.65;
                  const delay = node.id * 0.22;
                  const timing: CSSProperties = {
                    animationDuration: `${duration}s`,
                    animationDelay: `${delay}s`,
                  };
                  return (
                    <g
                      key={node.id}
                      ref={(el) => {
                        nodeRefs.current[node.id] = el;
                      }}
                      style={{ transition: "transform 0.4s cubic-bezier(0.165, 0.84, 0.44, 1)" }}
                    >
                      {node.glow && (
                        <circle
                          cx={node.x} cy={node.y} r={4}
                          fill="none"
                          stroke="rgba(127,207,255,0.25)"
                          strokeWidth="1"
                          className="hero-node-glow"
                          style={timing}
                        />
                      )}
                      <circle
                        cx={node.x} cy={node.y}
                        r={node.glow ? 2.5 : 1.8}
                        fill="rgba(127,207,255,0.75)"
                        className="hero-node"
                        style={timing}
                      />
                    </g>
                  );
                })}
              </svg>

              {/* Headline — per-line masked reveal. Each line rises out of
                  an overflow-hidden mask on its own stagger (CSS keyframes,
                  see globals.css) instead of the whole block fading in at
                  once. Technique follows the "SplitText"-style reveal
                  popularized by React Bits (reactbits.dev, MIT + Commons
                  Clause) but is hand-rolled at the line level rather than
                  copied/split per character: that keeps a single real text
                  node per line (selection stays intact) and lets us put the
                  full sentence in one aria-label so the accessible name
                  doesn't fragment across the three lines. */}
              <h1
                aria-label="I build & operate production systems at scale."
                className="text-[clamp(36px,7.5vw,72px)] font-medium tracking-[-2px]"
                style={{
                  lineHeight: "0.92",
                  textShadow:
                    "0 4px 8px rgba(0,87,255,0.08), 0 -3px 8px rgba(255,90,0,0.05), 0 -4px 20px rgba(255,255,255,0.12)",
                }}
              >
                <span aria-hidden="true">
                  <span className="hero-line-mask">
                    <span
                      className="hero-line-inner"
                      style={heroVars({ "--hero-delay": "0.2s" })}
                    >
                      I build &amp; operate
                    </span>
                  </span>
                  <span className="hero-line-mask">
                    <span
                      className="hero-line-inner"
                      style={heroVars({ "--hero-delay": "0.32s" })}
                    >
                      production systems
                    </span>
                  </span>
                  <span className="hero-line-mask">
                    <span
                      className="hero-line-inner gradient-text-fade inline-block mt-1"
                      style={{
                        fontFamily: "var(--font-serif)",
                        fontStyle: "italic",
                        fontWeight: 400,
                        letterSpacing: "-1px",
                        ...heroVars({ "--hero-delay": "0.44s" }),
                      }}
                    >
                      at scale.
                    </span>
                  </span>
                </span>
              </h1>

              {/* Composition row — CTA fills the previously-dead
                  lower-left quadrant, tagline rebalanced to the right. */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-14 md:mt-16 md:items-end">
                <div className="flex">
                  <a
                    href="#work"
                    className="hero-anim group inline-flex items-center gap-2 rounded-full pl-5 pr-4 py-2.5 text-[13px] font-medium tracking-[0.1px] text-[var(--text-primary)] hover:text-white transition-colors duration-200"
                    style={{
                      background: "rgba(242,242,242,0.04)",
                      border: "1px solid rgba(242,242,242,0.1)",
                      backdropFilter: "blur(20px)",
                      boxShadow:
                        "0 4px 24px rgba(0,0,0,0.25), inset 0 0.5px 0 rgba(242,242,242,0.06)",
                      ...heroVars({ "--hero-rise-y": "16px", "--hero-delay": "0.7s" }),
                    }}
                  >
                    View work
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      className="group-hover:translate-y-0.5 group-hover:translate-x-0.5 transition-transform duration-200"
                    >
                      <path
                        d="M7 17L17 7M17 7H8M17 7V16"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </a>
                </div>
                <div
                  className="hero-anim"
                  style={heroVars({ "--hero-rise-y": "16px", "--hero-delay": "0.6s" })}
                >
                  <p className="text-[15px] md:text-[17px] font-medium leading-[1.45] text-[var(--text-primary)]">
                    Systems Engineer &amp; Founder.
                    <br className="hidden md:block" />{" "}
                    Based in Los Angeles.
                  </p>
                  <p className="text-[13px] md:text-[14px] leading-[1.5] text-[var(--text-body)] mt-2 tracking-[0.1px]">
                    Keeping hundreds of environments running.
                  </p>
                </div>
              </div>

              {/* Scroll cue — anchored to the bottom of the frame itself
                  rather than floating in the section's outer margin. */}
              <div
                aria-hidden="true"
                className="hero-anim absolute bottom-5 md:bottom-7 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
                style={heroVars({ "--hero-rise-y": "10px", "--hero-delay": "0.95s" })}
              >
                <span className="text-[9px] uppercase tracking-[0.2em] text-[var(--text-faint)]">
                  Scroll
                </span>
                <span
                  className="hero-scroll-line w-px h-6"
                  style={{
                    background: "linear-gradient(to bottom, var(--color-fg), transparent)",
                    ...heroVars({ "--hero-delay": "1.75s" }),
                  }}
                />
              </div>

              {/* Grain texture — barely visible */}
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  opacity: 0.12,
                  mixBlendMode: "overlay",
                  backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E")`,
                  backgroundRepeat: "repeat",
                  backgroundSize: "200px 200px",
                }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Bottom fade */}
      <div
        className="absolute bottom-0 left-0 right-0 h-[160px] pointer-events-none"
        style={{
          background:
            "linear-gradient(to bottom, transparent, var(--color-bg) 75%)",
        }}
      />
    </section>
  );
}
