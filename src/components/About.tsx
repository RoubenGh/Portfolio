"use client";

import { useState, useEffect, useRef } from "react";
import FadeIn from "./FadeIn";
import { motion } from "framer-motion";

const ease = [0.165, 0.84, 0.44, 1] as const;

/* ── Terminal log lines ── */
const terminalLines = [
  { prompt: true, text: "ssh deploy@prod-web-03" },
  { prompt: false, text: "Welcome to Ubuntu 22.04.3 LTS" },
  { prompt: false, text: "Last login: Mon Mar 31 02:14:08 from 10.0.1.42" },
  { prompt: true, text: "docker ps --format 'table {{.Names}}\\t{{.Status}}'" },
  { prompt: false, text: "NAME              STATUS" },
  { prompt: false, text: "nginx-proxy       Up 14 days" },
  { prompt: false, text: "api-gateway       Up 14 days" },
  { prompt: false, text: "postgres-main     Up 31 days" },
  { prompt: false, text: "redis-cache       Up 31 days" },
  { prompt: true, text: "systemctl status traefik" },
  { prompt: false, text: "\u25cf traefik.service - Traefik Proxy" },
  { prompt: false, text: "   Active: active (running) since Mar 01" },
  { prompt: true, text: "tail -f /var/log/nginx/access.log" },
  { prompt: false, text: "200 GET /api/tickets 12ms" },
  { prompt: false, text: "200 POST /api/scrape/run 847ms" },
  { prompt: false, text: "200 GET /api/leads?page=3 8ms" },
  { prompt: false, text: "200 GET /api/tickets/42 6ms" },
  { prompt: false, text: "201 POST /api/tickets 134ms" },
  { prompt: false, text: "200 GET /api/companies 9ms" },
];

/* ── Code lines ── */
const codeLines = [
  { text: "import { OpenAI } from 'openai';", color: "var(--color-fg-15)" },
  { text: "import { WikiService } from './WikiService';", color: "var(--color-fg-15)" },
  { text: "", color: "var(--color-fg-15)" },
  { text: "const ai = new OpenAI({", color: "var(--color-fg-30)" },
  { text: '  baseURL: "https://generativelanguage.googleapis.com",', color: "var(--color-fg-15)" },
  { text: "  apiKey: process.env.GEMINI_KEY,", color: "var(--color-fg-15)" },
  { text: "});", color: "var(--color-fg-30)" },
  { text: "", color: "var(--color-fg-15)" },
  { text: "async function *streamGuidance(ticket) {", color: "var(--color-fg-80)" },
  { text: "  const wiki = WikiService.getInstance(ticket.workspaceId);", color: "var(--color-fg-30)" },
  { text: "  const pages = await wiki.findRelevantPages(ticket.subject);", color: "var(--color-fg-30)" },
  { text: "  const docs = await docService.findRelevant(ticket.subject);", color: "var(--color-fg-30)" },
  { text: "", color: "var(--color-fg-15)" },
  { text: "  const context = buildPrompt({", color: "var(--color-fg-30)" },
  { text: "    ticket,", color: "var(--color-fg-15)" },
  { text: "    wikiPages: pages.slice(0, 5),", color: "var(--color-fg-15)" },
  { text: "    documents: docs.slice(0, 5),", color: "var(--color-fg-15)" },
  { text: "  });", color: "var(--color-fg-30)" },
  { text: "", color: "var(--color-fg-15)" },
  { text: "  const stream = await ai.chat.completions.create({", color: "var(--color-fg-30)" },
  { text: '    model: "gemini-2.0-flash",', color: "var(--color-fg-15)" },
  { text: "    stream: true,", color: "var(--color-fg-15)" },
  { text: "    messages: context.messages,", color: "var(--color-fg-15)" },
  { text: "  });", color: "var(--color-fg-30)" },
  { text: "", color: "var(--color-fg-15)" },
  { text: "  for await (const chunk of stream) {", color: "var(--color-fg-30)" },
  { text: "    const token = chunk.choices[0]?.delta?.content;", color: "var(--color-fg-50)" },
  { text: "    if (token) yield token;", color: "var(--color-fg-50)" },
  { text: "  }", color: "var(--color-fg-30)" },
  { text: "}", color: "var(--color-fg-80)" },
  { text: "", color: "var(--color-fg-15)" },
  { text: "export async function handleGuidanceRequest(req, res) {", color: "var(--color-fg-80)" },
  { text: '  res.setHeader("Content-Type", "text/plain");', color: "var(--color-fg-30)" },
  { text: '  res.setHeader("Transfer-Encoding", "chunked");', color: "var(--color-fg-30)" },
  { text: "", color: "var(--color-fg-15)" },
  { text: "  const ticket = await TicketService.getById(req.params.id);", color: "var(--color-fg-30)" },
  { text: "  for await (const token of streamGuidance(ticket)) {", color: "var(--color-fg-30)" },
  { text: "    res.write(token);", color: "var(--color-fg-50)" },
  { text: "  }", color: "var(--color-fg-30)" },
  { text: "  res.end();", color: "var(--color-fg-30)" },
  { text: "}", color: "var(--color-fg-80)" },
];

const cardBase = {
  background: "linear-gradient(190deg, #1c1c1c, #0e0e0e)",
  border: "1px solid rgba(242,242,242,0.06)",
  boxShadow:
    "0 30px 60px rgba(0,0,0,0.5), inset 0 1px 0 rgba(242,242,242,0.04), inset 0 0 20px rgba(0,0,0,0.2)",
};

/* ── Animated terminal ── */
function AnimatedTerminal({ height = "200px" }: { height?: string }) {
  const [visibleLines, setVisibleLines] = useState(0);
  const [typingIndex, setTypingIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const hasStarted = useRef(false);

  useEffect(() => {
    if (hasStarted.current) return;
    hasStarted.current = true;

    let lineIdx = 0;

    const showNextLine = () => {
      if (lineIdx >= terminalLines.length) {
        setTimeout(() => {
          setVisibleLines(0);
          setTypingIndex(0);
          setIsTyping(false);
          hasStarted.current = false;
          lineIdx = 0;
          setTimeout(() => {
            hasStarted.current = true;
            showNextLine();
          }, 800);
        }, 4000);
        return;
      }

      const line = terminalLines[lineIdx];

      if (line.prompt) {
        setIsTyping(true);
        setTypingIndex(0);
        const chars = line.text.length;
        let charIdx = 0;

        const typeChar = () => {
          charIdx++;
          setTypingIndex(charIdx);
          if (charIdx < chars) {
            setTimeout(typeChar, 25 + Math.random() * 35);
          } else {
            setTimeout(() => {
              setIsTyping(false);
              lineIdx++;
              setVisibleLines(lineIdx);
              setTimeout(showNextLine, 200);
            }, 300);
          }
        };
        setTimeout(typeChar, 400);
      } else {
        lineIdx++;
        setVisibleLines(lineIdx);
        setTimeout(showNextLine, 60 + Math.random() * 40);
      }
    };

    setTimeout(showNextLine, 1500);
  }, []);

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [visibleLines, typingIndex]);

  return (
    <div
      ref={containerRef}
      className="px-3.5 py-3 font-mono text-[9.5px] leading-[1.7] overflow-hidden"
      style={{ height }}
    >
      {terminalLines.slice(0, visibleLines).map((line, i) => (
        <div key={i}>
          {line.prompt ? (
            <span>
              <span style={{ color: "rgba(127,207,255,0.6)" }}>$</span>{" "}
              <span className="text-[var(--color-fg-50)]">{line.text}</span>
            </span>
          ) : (
            <span className="text-[var(--color-fg-15)]">{line.text}</span>
          )}
        </div>
      ))}
      {isTyping && visibleLines < terminalLines.length && terminalLines[visibleLines]?.prompt && (
        <div>
          <span style={{ color: "rgba(127,207,255,0.6)" }}>$</span>{" "}
          <span className="text-[var(--color-fg-50)]">
            {terminalLines[visibleLines].text.slice(0, typingIndex)}
          </span>
          <span
            className="inline-block w-[5px] h-[11px] ml-[1px] align-middle"
            style={{
              background: "rgba(242,242,242,0.5)",
              animation: "blink 1s step-end infinite",
            }}
          />
        </div>
      )}
      {!isTyping && visibleLines > 0 && visibleLines < terminalLines.length && (
        <div>
          <span style={{ color: "rgba(127,207,255,0.6)" }}>$</span>{" "}
          <span
            className="inline-block w-[5px] h-[11px] ml-[1px] align-middle"
            style={{
              background: "rgba(242,242,242,0.5)",
              animation: "blink 1s step-end infinite",
            }}
          />
        </div>
      )}
    </div>
  );
}

/* ── Scrolling code ── */
function ScrollingCode({ height = "170px" }: { height?: string }) {
  const doubled = [...codeLines, ...codeLines];
  const lineHeight = 15.2;
  const totalHeight = codeLines.length * lineHeight;

  return (
    <div className="overflow-hidden" style={{ height }}>
      <motion.div
        animate={{ y: [0, -totalHeight] }}
        transition={{
          duration: 30,
          repeat: Infinity,
          ease: "linear",
        }}
        className="px-3.5 py-3 font-mono text-[9.5px] leading-[1.6]"
      >
        {doubled.map((line, i) => (
          <div key={i} style={{ color: line.color, height: `${lineHeight}px` }}>
            {line.text || "\u00A0"}
          </div>
        ))}
      </motion.div>
    </div>
  );
}

/* ── Terminal card (reusable) ── */
function TerminalCard({ className = "", style = {} }: { className?: string; style?: React.CSSProperties }) {
  return (
    <div
      className={`rounded-[14px] overflow-hidden ${className}`}
      style={{ ...cardBase, ...style }}
    >
      <div
        className="flex items-center gap-1.5 px-3.5 py-2.5"
        style={{ borderBottom: "1px solid rgba(242,242,242,0.04)" }}
      >
        <div className="w-[7px] h-[7px] rounded-full" style={{ background: "rgba(255,95,87,0.7)" }} />
        <div className="w-[7px] h-[7px] rounded-full" style={{ background: "rgba(255,189,46,0.7)" }} />
        <div className="w-[7px] h-[7px] rounded-full" style={{ background: "rgba(39,201,63,0.7)" }} />
        <span className="ml-2 text-[10px] text-[var(--color-fg-15)] tracking-[0.05em]">
          prod-web-03
        </span>
      </div>
      <AnimatedTerminal height="160px" />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse at 30% 20%, rgba(127,207,255,0.03), transparent 60%)",
        }}
      />
    </div>
  );
}

/* ── Dashboard card (reusable) ── */
function DashboardCard({ className = "", style = {} }: { className?: string; style?: React.CSSProperties }) {
  return (
    <div
      className={`rounded-[14px] overflow-hidden ${className}`}
      style={{ ...cardBase, ...style }}
    >
      <div
        className="px-3.5 py-2.5"
        style={{ borderBottom: "1px solid rgba(242,242,242,0.04)" }}
      >
        <span className="text-[10px] text-[var(--color-fg-15)] tracking-[0.05em]">
          Dashboard
        </span>
      </div>
      <div className="rounded-b-[14px] overflow-hidden">
        <img
          src="/images/ai-ticketing/dashboard.png"
          alt=""
          className="w-full h-auto block"
          style={{ opacity: 0.8 }}
          loading="lazy"
        />
      </div>
    </div>
  );
}

/* ── Code card (reusable) ── */
function CodeCard({ className = "", style = {} }: { className?: string; style?: React.CSSProperties }) {
  return (
    <div
      className={`rounded-[14px] overflow-hidden relative ${className}`}
      style={{ ...cardBase, ...style }}
    >
      <div
        className="flex items-center gap-1.5 px-3.5 py-2.5"
        style={{ borderBottom: "1px solid rgba(242,242,242,0.04)" }}
      >
        <span className="text-[10px] text-[var(--color-fg-15)] tracking-[0.05em]">
          streamGuidance.ts
        </span>
      </div>
      <ScrollingCode height="140px" />
      <div
        className="absolute top-[30px] left-0 right-0 h-[20px] pointer-events-none"
        style={{ background: "linear-gradient(180deg, #181818, transparent)" }}
      />
      <div
        className="absolute bottom-0 left-0 right-0 h-[30px] pointer-events-none"
        style={{ background: "linear-gradient(0deg, #0e0e0e, transparent)" }}
      />
    </div>
  );
}

export default function About() {
  return (
    <section id="about" className="relative pt-20 pb-36 md:pt-24 md:pb-52">
      {/* Blink keyframe */}
      <style>{`@keyframes blink { 0%, 100% { opacity: 1; } 50% { opacity: 0; } }`}</style>

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

        {/* ── Mobile fanned card stack ── */}
        <div className="md:hidden mb-14">
          <FadeIn delay={0.1}>
            <div className="relative" style={{ height: "270px" }}>
              {/* Back card: Code (deepest) */}
              <div
                className="absolute rounded-[14px] overflow-hidden"
                style={{
                  ...cardBase,
                  top: "0px",
                  left: "8%",
                  right: "8%",
                  height: "230px",
                  opacity: 0.4,
                  zIndex: 1,
                }}
              >
                <div
                  className="flex items-center gap-1.5 px-3.5 py-2.5"
                  style={{ borderBottom: "1px solid rgba(242,242,242,0.04)" }}
                >
                  <span className="text-[10px] text-[var(--color-fg-15)] tracking-[0.05em]">
                    streamGuidance.ts
                  </span>
                </div>
                <ScrollingCode height="190px" />
              </div>
              {/* Middle card: Dashboard */}
              <div
                className="absolute rounded-[14px] overflow-hidden"
                style={{
                  ...cardBase,
                  top: "14px",
                  left: "4%",
                  right: "4%",
                  height: "230px",
                  opacity: 0.6,
                  zIndex: 2,
                }}
              >
                <div
                  className="px-3.5 py-2.5"
                  style={{ borderBottom: "1px solid rgba(242,242,242,0.04)" }}
                >
                  <span className="text-[10px] text-[var(--color-fg-15)] tracking-[0.05em]">
                    Dashboard
                  </span>
                </div>
                <div className="overflow-hidden" style={{ height: "200px" }}>
                  <img
                    src="/images/ai-ticketing/dashboard.png"
                    alt=""
                    className="w-full h-auto block"
                    style={{ opacity: 0.8 }}
                    loading="lazy"
                  />
                </div>
              </div>
              {/* Front card: Terminal (topmost) */}
              <div
                className="absolute rounded-[14px] overflow-hidden"
                style={{
                  ...cardBase,
                  top: "28px",
                  left: "0%",
                  right: "0%",
                  height: "230px",
                  zIndex: 3,
                }}
              >
                <div
                  className="flex items-center gap-1.5 px-3.5 py-2.5"
                  style={{ borderBottom: "1px solid rgba(242,242,242,0.04)" }}
                >
                  <div className="w-[7px] h-[7px] rounded-full" style={{ background: "rgba(255,95,87,0.7)" }} />
                  <div className="w-[7px] h-[7px] rounded-full" style={{ background: "rgba(255,189,46,0.7)" }} />
                  <div className="w-[7px] h-[7px] rounded-full" style={{ background: "rgba(39,201,63,0.7)" }} />
                  <span className="ml-2 text-[10px] text-[var(--color-fg-15)] tracking-[0.05em]">
                    prod-web-03
                  </span>
                </div>
                <AnimatedTerminal height="195px" />
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    background: "radial-gradient(ellipse at 30% 20%, rgba(127,207,255,0.03), transparent 60%)",
                  }}
                />
              </div>
            </div>
          </FadeIn>
        </div>

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

            {/* ── Desktop overlapping cards ── */}
            <div className="hidden md:block relative mt-12 group/cards" style={{ height: "330px" }}>
              {/* Card 2: Dashboard — back right */}
              <FadeIn delay={0.35} y={40}>
                <motion.div
                  className="absolute rounded-[14px] overflow-hidden z-[1]"
                  style={{
                    ...cardBase,
                    top: "0px",
                    left: "155px",
                    width: "220px",
                    rotate: "4deg",
                    opacity: 0.65,
                  }}
                  whileHover={{ scale: 1.03, rotate: 0, opacity: 1, zIndex: 10 }}
                  transition={{ duration: 0.4, ease }}
                >
                  <div className="transition-transform duration-500 ease-out group-hover/cards:translate-x-3 group-hover/cards:-translate-y-2">
                    <div
                      className="px-3.5 py-2.5"
                      style={{ borderBottom: "1px solid rgba(242,242,242,0.04)" }}
                    >
                      <span className="text-[10px] text-[var(--color-fg-15)] tracking-[0.05em]">
                        Dashboard
                      </span>
                    </div>
                    <div className="rounded-b-[14px] overflow-hidden">
                      <img
                        src="/images/ai-ticketing/dashboard.png"
                        alt=""
                        className="w-full h-auto block"
                        style={{ opacity: 0.8 }}
                        loading="lazy"
                      />
                    </div>
                  </div>
                </motion.div>
              </FadeIn>

              {/* Card 1: Terminal — center front */}
              <FadeIn delay={0.2} y={40}>
                <motion.div
                  className="absolute rounded-[14px] overflow-hidden z-[3]"
                  style={{
                    ...cardBase,
                    top: "20px",
                    left: "5px",
                    width: "290px",
                    rotate: "-1.5deg",
                  }}
                  whileHover={{ scale: 1.03, rotate: 0, zIndex: 10 }}
                  transition={{ duration: 0.4, ease }}
                >
                  <div className="transition-transform duration-500 ease-out group-hover/cards:-translate-x-2 group-hover/cards:-translate-y-1">
                    <div
                      className="flex items-center gap-1.5 px-3.5 py-2.5"
                      style={{ borderBottom: "1px solid rgba(242,242,242,0.04)" }}
                    >
                      <div className="w-[7px] h-[7px] rounded-full" style={{ background: "rgba(255,95,87,0.7)" }} />
                      <div className="w-[7px] h-[7px] rounded-full" style={{ background: "rgba(255,189,46,0.7)" }} />
                      <div className="w-[7px] h-[7px] rounded-full" style={{ background: "rgba(39,201,63,0.7)" }} />
                      <span className="ml-2 text-[10px] text-[var(--color-fg-15)] tracking-[0.05em]">
                        prod-web-03
                      </span>
                    </div>
                    <AnimatedTerminal />
                    <div
                      className="absolute inset-0 pointer-events-none"
                      style={{
                        background: "radial-gradient(ellipse at 30% 20%, rgba(127,207,255,0.03), transparent 60%)",
                      }}
                    />
                  </div>
                </motion.div>
              </FadeIn>

              {/* Card 3: Code — front bottom */}
              <FadeIn delay={0.5} y={40}>
                <motion.div
                  className="absolute rounded-[14px] overflow-hidden z-[4]"
                  style={{
                    ...cardBase,
                    top: "158px",
                    left: "22px",
                    width: "265px",
                    rotate: "1.5deg",
                  }}
                  whileHover={{ scale: 1.03, rotate: 0, zIndex: 10 }}
                  transition={{ duration: 0.4, ease }}
                >
                  <div className="transition-transform duration-500 ease-out group-hover/cards:translate-x-0.5 group-hover/cards:translate-y-2">
                    <div
                      className="flex items-center gap-1.5 px-3.5 py-2.5"
                      style={{ borderBottom: "1px solid rgba(242,242,242,0.04)" }}
                    >
                      <span className="text-[10px] text-[var(--color-fg-15)] tracking-[0.05em]">
                        streamGuidance.ts
                      </span>
                    </div>
                    <ScrollingCode />
                    <div
                      className="absolute top-[30px] left-0 right-0 h-[20px] pointer-events-none"
                      style={{ background: "linear-gradient(180deg, #181818, transparent)" }}
                    />
                    <div
                      className="absolute bottom-0 left-0 right-0 h-[30px] pointer-events-none"
                      style={{ background: "linear-gradient(0deg, #0e0e0e, transparent)" }}
                    />
                  </div>
                </motion.div>
              </FadeIn>
            </div>
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
