"use client";

import { motion } from "framer-motion";

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

export default function Hero() {
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
      {/* Hero window card */}
      <motion.div
        initial={{ opacity: 0, y: 56 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.1, ease }}
        className="relative mx-auto w-full max-w-[840px] px-4 md:px-0"
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
              className="relative px-7 pt-14 pb-28 md:px-12 md:pt-16 md:pb-40"
              style={{ background: "rgba(10,10,10,0.65)" }}
            >
              {/* Network graph */}
              <svg
                className="absolute inset-0 w-full h-full pointer-events-none"
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
                {NET_NODES.map((node) => (
                  <g key={node.id}>
                    {node.glow && (
                      <motion.circle
                        cx={node.x} cy={node.y} r={4}
                        fill="none"
                        stroke="rgba(127,207,255,0.25)"
                        strokeWidth="1"
                        animate={{ r: [4, 13, 4], opacity: [0.4, 0, 0.4] }}
                        transition={{
                          duration: 3 + (node.id % 4) * 0.65,
                          delay: node.id * 0.22,
                          repeat: Infinity,
                          ease: "easeInOut",
                        }}
                      />
                    )}
                    <motion.circle
                      cx={node.x} cy={node.y}
                      r={node.glow ? 2.5 : 1.8}
                      fill="rgba(127,207,255,0.75)"
                      animate={{ opacity: [0.15, 0.85, 0.15] }}
                      transition={{
                        duration: 3 + (node.id % 4) * 0.65,
                        delay: node.id * 0.22,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                    />
                  </g>
                ))}
              </svg>

              {/* Headline */}
              <motion.h1
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3, ease }}
                className="text-[clamp(36px,7.5vw,72px)] font-medium tracking-[-2px]"
                style={{
                  lineHeight: "0.92",
                  textShadow:
                    "0 4px 8px rgba(0,87,255,0.08), 0 -3px 8px rgba(255,90,0,0.05), 0 -4px 20px rgba(255,255,255,0.12)",
                }}
              >
                I build &amp; operate
                <br />
                production systems
                <br />
                <span
                  className="gradient-text-fade inline-block mt-1"
                  style={{
                    fontFamily: "var(--font-serif)",
                    fontStyle: "italic",
                    fontWeight: 400,
                    letterSpacing: "-1px",
                  }}
                >
                  at scale.
                </span>
              </motion.h1>

              {/* Bio — pushed right on desktop, full-width on mobile */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.6, ease }}
                className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-14 md:mt-16"
              >
                <div className="hidden md:block" />
                <div>
                  <p className="text-[15px] md:text-[17px] font-medium leading-[1.45] text-[var(--color-fg)]">
                    Systems Engineer &amp; Founder.
                    <br className="hidden md:block" />{" "}
                    Based in Los Angeles.
                  </p>
                  <p className="text-[13px] md:text-[14px] leading-[1.5] text-[var(--color-fg-30)] mt-2 tracking-[0.1px]">
                    Keeping hundreds of environments running.
                  </p>
                </div>
              </motion.div>

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
      </motion.div>

      {/* Bottom fade */}
      <div
        className="absolute bottom-0 left-0 right-0 h-[160px] pointer-events-none"
        style={{
          background:
            "linear-gradient(to bottom, transparent, var(--color-bg) 75%)",
        }}
      />

      {/* Scroll line — replaces generic arrow */}
      <motion.div
        initial={{ opacity: 0, scaleY: 0 }}
        animate={{ opacity: 0.25, scaleY: 1 }}
        transition={{ delay: 1.6, duration: 0.8, ease }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 w-px h-8 origin-top"
        style={{ background: "linear-gradient(to bottom, var(--color-fg), transparent)" }}
      />
    </section>
  );
}
