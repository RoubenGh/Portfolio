"use client";

import { useEffect, useRef, useState } from "react";
import type { CSSProperties, PointerEvent as ReactPointerEvent } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";

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
  { prompt: false, text: "● traefik.service - Traefik Proxy" },
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
  { text: "import { OpenAI } from 'openai';", color: "var(--text-faint)" },
  { text: "import { WikiService } from './WikiService';", color: "var(--text-faint)" },
  { text: "", color: "var(--text-faint)" },
  { text: "const ai = new OpenAI({", color: "var(--text-faint)" },
  { text: '  baseURL: "https://generativelanguage.googleapis.com",', color: "var(--text-faint)" },
  { text: "  apiKey: process.env.GEMINI_KEY,", color: "var(--text-faint)" },
  { text: "});", color: "var(--text-faint)" },
  { text: "", color: "var(--text-faint)" },
  { text: "async function *streamGuidance(ticket) {", color: "var(--text-secondary)" },
  { text: "  const wiki = WikiService.getInstance(ticket.workspaceId);", color: "var(--text-faint)" },
  { text: "  const pages = await wiki.findRelevantPages(ticket.subject);", color: "var(--text-faint)" },
  { text: "  const docs = await docService.findRelevant(ticket.subject);", color: "var(--text-faint)" },
  { text: "", color: "var(--text-faint)" },
  { text: "  const context = buildPrompt({", color: "var(--text-faint)" },
  { text: "    ticket,", color: "var(--text-faint)" },
  { text: "    wikiPages: pages.slice(0, 5),", color: "var(--text-faint)" },
  { text: "    documents: docs.slice(0, 5),", color: "var(--text-faint)" },
  { text: "  });", color: "var(--text-faint)" },
  { text: "", color: "var(--text-faint)" },
  { text: "  const stream = await ai.chat.completions.create({", color: "var(--text-faint)" },
  { text: '    model: "gemini-2.0-flash",', color: "var(--text-faint)" },
  { text: "    stream: true,", color: "var(--text-faint)" },
  { text: "    messages: context.messages,", color: "var(--text-faint)" },
  { text: "  });", color: "var(--text-faint)" },
  { text: "", color: "var(--text-faint)" },
  { text: "  for await (const chunk of stream) {", color: "var(--text-faint)" },
  { text: "    const token = chunk.choices[0]?.delta?.content;", color: "var(--text-muted)" },
  { text: "    if (token) yield token;", color: "var(--text-muted)" },
  { text: "  }", color: "var(--text-faint)" },
  { text: "}", color: "var(--text-secondary)" },
  { text: "", color: "var(--text-faint)" },
  { text: "export async function handleGuidanceRequest(req, res) {", color: "var(--text-secondary)" },
  { text: '  res.setHeader("Content-Type", "text/plain");', color: "var(--text-faint)" },
  { text: '  res.setHeader("Transfer-Encoding", "chunked");', color: "var(--text-faint)" },
  { text: "", color: "var(--text-faint)" },
  { text: "  const ticket = await TicketService.getById(req.params.id);", color: "var(--text-faint)" },
  { text: "  for await (const token of streamGuidance(ticket)) {", color: "var(--text-faint)" },
  { text: "    res.write(token);", color: "var(--text-muted)" },
  { text: "  }", color: "var(--text-faint)" },
  { text: "  res.end();", color: "var(--text-faint)" },
  { text: "}", color: "var(--text-secondary)" },
];

const services = [
  { name: "nginx-proxy",   uptime: "99.98%", upDays: "14d" },
  { name: "api-gateway",   uptime: "99.99%", upDays: "14d" },
  { name: "postgres-main", uptime: "100%",   upDays: "31d" },
  { name: "redis-cache",   uptime: "100%",   upDays: "31d" },
  { name: "traefik",       uptime: "99.97%", upDays: "61d" },
];

const cardBase = {
  background: "linear-gradient(190deg, #1c1c1c, #0e0e0e)",
  border: "1px solid rgba(242,242,242,0.06)",
  boxShadow:
    "0 30px 60px rgba(0,0,0,0.5), inset 0 1px 0 rgba(242,242,242,0.04), inset 0 0 20px rgba(0,0,0,0.2)",
};

/**
 * SSR/hydration-safe reduced-motion read — same pattern as FadeIn.tsx and
 * Work.tsx's useSafeReducedMotion. useReducedMotion() resolves to `null` on
 * the server and the real value on the client's first paint, so reading it
 * directly desyncs server/client markup; gate behind a mounted flag.
 */
function useSafeReducedMotion() {
  const prefersReducedMotion = useReducedMotion();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  return mounted && !!prefersReducedMotion;
}

/** Inline style helper for the CSS custom properties the about.css
 *  keyframes/entrance classes read (--about-delay, --about-rise-y).
 *  Typed loosely because React's CSSProperties doesn't know about custom
 *  properties. Mirrors Hero.tsx's heroVars helper. */
function aboutVars(vars: Record<string, string>): CSSProperties {
  return vars as CSSProperties;
}

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
              <span className="text-[var(--text-muted)]">{line.text}</span>
            </span>
          ) : (
            <span className="text-[var(--text-faint)]">{line.text}</span>
          )}
        </div>
      ))}
      {isTyping && visibleLines < terminalLines.length && terminalLines[visibleLines]?.prompt && (
        <div>
          <span style={{ color: "rgba(127,207,255,0.6)" }}>$</span>{" "}
          <span className="text-[var(--text-muted)]">
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
            {line.text || " "}
          </div>
        ))}
      </motion.div>
    </div>
  );
}

/* ── Status card ── */
function StatusCard({ className = "", style = {} }: { className?: string; style?: React.CSSProperties }) {
  return (
    <div
      className={`rounded-[14px] overflow-hidden ${className}`}
      style={{ ...cardBase, ...style }}
    >
      <div
        className="flex items-center justify-between px-3.5 py-2.5"
        style={{ borderBottom: "1px solid rgba(242,242,242,0.04)" }}
      >
        <span className="text-[9.5px] uppercase tracking-[0.08em] text-[var(--text-faint)]">
          system status
        </span>
        <div className="flex items-center gap-1.5">
          <motion.div
            animate={{ opacity: [1, 0.3, 1] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="w-[5px] h-[5px] rounded-full"
            style={{ background: "rgba(39,201,63,0.85)" }}
          />
          <span className="text-[8.5px] text-[var(--text-faint)]">all operational</span>
        </div>
      </div>
      <div className="px-3.5 py-3 flex flex-col gap-[9px]">
        {services.map((svc, i) => (
          <div key={svc.name} className="flex items-center justify-between">
            <div className="flex items-center gap-[6px]">
              <motion.div
                animate={{ opacity: [0.8, 0.25, 0.8] }}
                transition={{ duration: 2.2 + i * 0.3, delay: i * 0.38, repeat: Infinity, ease: "easeInOut" }}
                className="w-[4px] h-[4px] rounded-full shrink-0"
                style={{ background: "rgba(39,201,63,0.75)" }}
              />
              <span className="text-[9px] font-mono text-[var(--text-faint)]">{svc.name}</span>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <span className="text-[8.5px] text-[var(--text-faint)]">{svc.uptime}</span>
              <span className="text-[8px] text-[var(--text-faint)]">↑{svc.upDays}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ── Terminal card (reusable) ── */
function TerminalCard({
  className = "",
  style = {},
  height = "160px",
}: {
  className?: string;
  style?: React.CSSProperties;
  height?: string;
}) {
  return (
    <div
      className={`rounded-[14px] overflow-hidden relative ${className}`}
      style={{ ...cardBase, ...style }}
    >
      <div
        className="flex items-center gap-1.5 px-3.5 py-2.5"
        style={{ borderBottom: "1px solid rgba(242,242,242,0.04)" }}
      >
        <div className="w-[7px] h-[7px] rounded-full" style={{ background: "rgba(255,95,87,0.7)" }} />
        <div className="w-[7px] h-[7px] rounded-full" style={{ background: "rgba(255,189,46,0.7)" }} />
        <div className="w-[7px] h-[7px] rounded-full" style={{ background: "rgba(39,201,63,0.7)" }} />
        <span className="ml-2 text-[10px] text-[var(--text-faint)] tracking-[0.05em]">
          prod-web-03
        </span>
      </div>
      <AnimatedTerminal height={height} />
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
        <span className="text-[10px] text-[var(--text-faint)] tracking-[0.05em]">
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
function CodeCard({
  className = "",
  style = {},
  height = "140px",
}: {
  className?: string;
  style?: React.CSSProperties;
  height?: string;
}) {
  return (
    <div
      className={`rounded-[14px] overflow-hidden relative ${className}`}
      style={{ ...cardBase, ...style }}
    >
      <div
        className="flex items-center gap-1.5 px-3.5 py-2.5"
        style={{ borderBottom: "1px solid rgba(242,242,242,0.04)" }}
      >
        <span className="text-[10px] text-[var(--text-faint)] tracking-[0.05em]">
          streamGuidance.ts
        </span>
      </div>
      <ScrollingCode height={height} />
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

/**
 * Desktop overlapping card stack — gives the previously-inert mockup two
 * kinds of life:
 *  1. A cursor-reactive 3D tilt on the whole stack (fine pointers only,
 *     same matchMedia + mounted-gated approach as Hero's constellation
 *     parallax — checked once on mount so it can't cause a hydration
 *     mismatch), applied imperatively via a ref so it never fights with
 *     React's render cycle.
 *  2. Per-card scroll parallax via framer-motion's useScroll/useTransform
 *     (same primitive as Work.tsx's ParallaxImage), so the four cards
 *     drift at different rates as the section scrolls through view.
 * Entrance (opacity/rise) is handled by the plain-CSS `.about-reveal`
 * class on each card's OUTER wrapper — never on the element framer-motion
 * controls — so the two animation systems never contend for the same
 * `transform` property on the same node.
 */
function DesktopCardStack() {
  const reduced = useSafeReducedMotion();
  const groupRef = useRef<HTMLDivElement>(null);
  const tiltRef = useRef<HTMLDivElement>(null);
  const pointerRef = useRef<{ x: number; y: number } | null>(null);
  const rafRef = useRef<number | null>(null);
  const [tiltEnabled, setTiltEnabled] = useState(false);

  useEffect(() => {
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const reducedPref = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    setTiltEnabled(fine && !reducedPref);
  }, []);

  useEffect(() => {
    return () => {
      if (rafRef.current != null) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  const applyTilt = () => {
    rafRef.current = null;
    const el = tiltRef.current;
    if (!el) return;
    const p = pointerRef.current;
    if (!p) {
      el.style.transform = "";
      return;
    }
    const rotateX = (-p.y * 5).toFixed(2);
    const rotateY = (p.x * 7).toFixed(2);
    el.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
  };

  const handlePointerMove = (e: ReactPointerEvent<HTMLDivElement>) => {
    const rect = groupRef.current?.getBoundingClientRect();
    if (!rect) return;
    pointerRef.current = {
      x: ((e.clientX - rect.left) / rect.width) * 2 - 1,
      y: ((e.clientY - rect.top) / rect.height) * 2 - 1,
    };
    if (rafRef.current == null) rafRef.current = requestAnimationFrame(applyTilt);
  };

  const handlePointerLeave = () => {
    pointerRef.current = null;
    if (rafRef.current == null) rafRef.current = requestAnimationFrame(applyTilt);
  };

  const { scrollYProgress } = useScroll({ target: groupRef, offset: ["start end", "end start"] });
  const yStatus = useTransform(scrollYProgress, [0, 1], reduced ? [0, 0] : [20, -20]);
  const yDashboard = useTransform(scrollYProgress, [0, 1], reduced ? [0, 0] : [14, -14]);
  const yTerminal = useTransform(scrollYProgress, [0, 1], reduced ? [0, 0] : [-10, 10]);
  const yCode = useTransform(scrollYProgress, [0, 1], reduced ? [0, 0] : [-22, 22]);

  return (
    <div
      ref={groupRef}
      className="hidden md:block relative mt-12 group/cards"
      style={{ height: "360px", perspective: "1100px" }}
      onPointerMove={tiltEnabled ? handlePointerMove : undefined}
      onPointerLeave={tiltEnabled ? handlePointerLeave : undefined}
    >
      <div ref={tiltRef} className="about-tilt-group relative w-full h-full">
        {/* Card 0: Status — deepest */}
        <div
          className="about-reveal about-card-wrap absolute"
          style={{
            top: "0px",
            left: "188px",
            width: "168px",
            zIndex: 0,
            ...aboutVars({ "--about-delay": "0.15s", "--about-rise-y": "38px" }),
          }}
        >
          <motion.div
            className="rounded-[14px] overflow-hidden"
            style={{ rotate: "8deg", opacity: 0.48, y: yStatus }}
            whileHover={{ scale: 1.03, rotate: 0, opacity: 1 }}
            transition={{ duration: 0.4, ease }}
          >
            <div className="transition-transform duration-500 ease-out group-hover/cards:translate-x-5 group-hover/cards:-translate-y-3">
              <StatusCard />
            </div>
          </motion.div>
        </div>

        {/* Card 2: Dashboard — back right */}
        <div
          className="about-reveal about-card-wrap absolute"
          style={{
            top: "8px",
            left: "150px",
            width: "215px",
            zIndex: 1,
            ...aboutVars({ "--about-delay": "0.32s", "--about-rise-y": "38px" }),
          }}
        >
          <motion.div
            className="rounded-[14px] overflow-hidden"
            style={{ rotate: "3.5deg", opacity: 0.62, y: yDashboard }}
            whileHover={{ scale: 1.03, rotate: 0, opacity: 1 }}
            transition={{ duration: 0.4, ease }}
          >
            <div className="transition-transform duration-500 ease-out group-hover/cards:translate-x-3 group-hover/cards:-translate-y-2">
              <DashboardCard />
            </div>
          </motion.div>
        </div>

        {/* Card 1: Terminal — center front */}
        <div
          className="about-reveal about-card-wrap absolute"
          style={{
            top: "26px",
            left: "5px",
            width: "288px",
            zIndex: 3,
            ...aboutVars({ "--about-delay": "0.2s", "--about-rise-y": "38px" }),
          }}
        >
          <motion.div
            className="rounded-[14px] overflow-hidden"
            style={{ rotate: "-1.5deg", y: yTerminal }}
            whileHover={{ scale: 1.03, rotate: 0 }}
            transition={{ duration: 0.4, ease }}
          >
            <div className="transition-transform duration-500 ease-out group-hover/cards:-translate-x-2 group-hover/cards:-translate-y-1">
              <TerminalCard height="200px" />
            </div>
          </motion.div>
        </div>

        {/* Card 3: Code — front bottom */}
        <div
          className="about-reveal about-card-wrap absolute"
          style={{
            top: "168px",
            left: "20px",
            width: "263px",
            zIndex: 4,
            ...aboutVars({ "--about-delay": "0.45s", "--about-rise-y": "38px" }),
          }}
        >
          <motion.div
            className="rounded-[14px] overflow-hidden"
            style={{ rotate: "1.5deg", y: yCode }}
            whileHover={{ scale: 1.03, rotate: 0 }}
            transition={{ duration: 0.4, ease }}
          >
            <div className="transition-transform duration-500 ease-out group-hover/cards:translate-x-0.5 group-hover/cards:translate-y-2">
              <CodeCard height="170px" />
            </div>
          </motion.div>
        </div>
      </div>
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
        <div
          className="about-reveal"
          style={aboutVars({ "--about-delay": "0s", "--about-rise-y": "14px" })}
        >
          <span className="text-[11px] uppercase tracking-[0.15em] text-[var(--text-muted)] block mb-14">
            About
          </span>
        </div>

        {/* ── Mobile fanned card stack ── */}
        <div className="md:hidden mb-14">
          <div
            className="about-reveal"
            style={aboutVars({ "--about-delay": "0.1s", "--about-rise-y": "32px" })}
          >
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
                  <span className="text-[10px] text-[var(--text-faint)] tracking-[0.05em]">
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
                  <span className="text-[10px] text-[var(--text-faint)] tracking-[0.05em]">
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
                  <span className="ml-2 text-[10px] text-[var(--text-faint)] tracking-[0.05em]">
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
          </div>
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

            <DesktopCardStack />
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
