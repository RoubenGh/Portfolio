"use client";

import { motion } from "framer-motion";

const ease = [0.165, 0.84, 0.44, 1] as const;

export default function Hero() {
  return (
    <section
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{
        paddingTop: "120px",
        paddingBottom: "80px",
        backgroundImage:
          "radial-gradient(circle closest-corner at 50% 0%, rgba(242,242,242,0.06), transparent)",
      }}
    >
      {/* Hero window card */}
      <motion.div
        initial={{ opacity: 0, y: 64 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, ease }}
        className="relative mx-auto w-full max-w-[880px] px-4 md:px-0"
      >
        {/* Outer bezel */}
        <div
          className="relative rounded-[24px] p-2"
          style={{
            background:
              "radial-gradient(circle farthest-side at 50% 0%, rgba(242,242,242,0.12), transparent)",
            outline: "1px solid rgba(242,242,242,0.08)",
            boxShadow:
              "inset 0 0 8px rgba(0,0,0,0.4), 0 0 60px rgba(0,0,0,0.2), 0 30px 120px rgba(0,0,0,0.7)",
          }}
        >
          {/* Outer glare line */}
          <div className="glare-line absolute top-0 left-[10%] right-[10%] z-10" />

          {/* Inner window */}
          <div
            className="relative rounded-[16px] overflow-hidden"
            style={{
              border: "1px solid rgba(242,242,242,0.15)",
              backdropFilter: "blur(20px)",
              boxShadow:
                "inset 0 0 10px rgba(0,0,0,0.1), 0 0 12px rgba(0,0,0,0.4)",
            }}
          >
            {/* Inner glare line */}
            <div className="glare-line absolute top-0 left-[15%] right-[15%] z-10" style={{ height: "2px" }} />

            {/* Window title bar */}
            <div
              className="relative flex items-center h-10 px-4"
              style={{
                backgroundImage:
                  "linear-gradient(to right, rgba(242,242,242,0.04), rgba(242,242,242,0.12) 50%, rgba(242,242,242,0.04))",
                backdropFilter: "blur(40px)",
                boxShadow: "0 10px 20px 4px rgba(0,0,0,0.2)",
              }}
            >
              <div className="flex items-center gap-2">
                <span
                  className="w-3 h-3 rounded-full"
                  style={{
                    background: "#f46b5d",
                    boxShadow: "0 0 20px 2px rgba(244,107,93,0.4)",
                  }}
                />
                <span
                  className="w-3 h-3 rounded-full"
                  style={{
                    background: "#f9bd4e",
                    boxShadow: "0 0 20px 2px rgba(249,189,78,0.4)",
                  }}
                />
                <span
                  className="w-3 h-3 rounded-full"
                  style={{
                    background: "#57c353",
                    boxShadow: "0 0 20px 2px rgba(87,195,83,0.4)",
                  }}
                />
              </div>
              <span className="absolute right-4 text-[20px] text-[var(--color-fg-15)] font-light select-none">
                +
              </span>
            </div>

            {/* Window content */}
            <div
              className="relative px-8 pt-16 pb-32 md:px-14 md:pt-20 md:pb-48"
              style={{ background: "rgba(10,10,10,0.7)" }}
            >
              {/* Headline */}
              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, delay: 0.3, ease }}
                className="text-[clamp(40px,8vw,80px)] font-medium leading-[0.9] tracking-[-2px]"
                style={{
                  textShadow:
                    "0 5px 10px rgba(0,87,255,0.12), 0 -5px 10px rgba(255,90,0,0.08), 0 -5px 25px rgba(255,255,255,0.2)",
                }}
              >
                I build systems,
                <br />
                infrastructure &
                <br />
                <em
                  className="gradient-text-fade not-italic"
                  style={{ fontFamily: "var(--font-serif)" }}
                >
                  automation.
                </em>
              </motion.h1>

              {/* Bio — offset to right like Perry */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, delay: 0.55, ease }}
                className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-16"
              >
                <div />
                <div>
                  <p className="text-[16px] md:text-[18px] font-medium leading-[1.5] text-[var(--color-fg)]">
                    Engineer & Founder. Based in Los Angeles.
                  </p>
                  <p className="text-[14px] md:text-[15px] font-normal leading-[1.5] text-[var(--color-fg-50)] mt-1">
                    Founder of RLA Studios.
                  </p>
                </div>
              </motion.div>

              {/* Grain texture */}
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  opacity: 0.2,
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
        className="absolute bottom-0 left-0 right-0 h-[200px] pointer-events-none"
        style={{
          background:
            "linear-gradient(to bottom, transparent, var(--color-bg) 70%)",
        }}
      />

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.4 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.svg
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M12 5v14M5 12l7 7 7-7" />
        </motion.svg>
      </motion.div>
    </section>
  );
}
