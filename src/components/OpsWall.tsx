"use client";

import { useEffect, useRef, useState } from "react";
import type { CSSProperties, PointerEvent as ReactPointerEvent, ReactNode } from "react";

/** Inline style helper for CSS custom properties (mirrors About.tsx's
 *  aboutVars) — typed loosely because React's CSSProperties doesn't know
 *  about custom properties. */
function cssVars(vars: Record<string, string>): CSSProperties {
  return vars as CSSProperties;
}

/**
 * OpsWall — a wall of live operational panels standing in for the
 * previous overlapping mockup-card stack, which on some real screens
 * overlapped badly enough that card text rendered on top of other card
 * text. This is the replacement: several columns of small "infrastructure
 * surface" panels (terminal, log tail, status grid, sparkline, scanner,
 * deploy pipeline, process list) drifting vertically at different speeds,
 * inspired by the "Drift Wall" image-wall pattern but built from live DOM
 * instead of static screenshots.
 *
 * Performance contract (see globals.css's "OpsWall" block for the actual
 * keyframes):
 *  - All motion (column drift, cursor blink, status flip, bar pulse,
 *    scanner sweep, pipeline glow) is a plain CSS @keyframes animation on
 *    `transform`/`opacity` only. There is no per-frame JavaScript driving
 *    any of it.
 *  - The only JS in the animation path is (a) an IntersectionObserver
 *    that toggles a single `.opswall--paused` class when the section
 *    scrolls out of view, which flips `animation-play-state` on every
 *    animated node at once via one CSS rule, and (b) a rAF-throttled
 *    pointer-parallax transform on the whole wall (fine pointers only),
 *    mirroring Hero.tsx's constellation parallax.
 *  - Panel count is capped at 9 live instances (3 columns x 3 panels),
 *    with the 3rd column hidden below `md` so a narrow viewport only
 *    ever renders 6.
 *
 * Visibility contract: every panel's real content (host names, log
 * lines, bar heights, dot fills) is drawn with static, non-animated
 * class-level styles and NO inline `opacity: 0` — the animated layers on
 * top (blink, flip, sweep, glow) are pure decoration that default to a
 * visible resting state, and are explicitly hidden (not left mid-
 * transition) under `prefers-reduced-motion` in globals.css. So the wall
 * can never render blank, whether or not JS/animation runs at all.
 */

const PANEL_H = 120;
const GAP = 12;
const PANELS_PER_COL = 3;
const SET_H = PANELS_PER_COL * (PANEL_H + GAP);

const DOT = {
  green: "rgba(39,201,63,0.8)",
  amber: "rgba(255,189,46,0.85)",
  blue: "rgba(127,207,255,0.75)",
} as const;

function statusColor(status: number) {
  if (status >= 500) return "rgba(255,95,87,0.85)";
  if (status >= 400) return "rgba(255,189,46,0.85)";
  return "rgba(39,201,63,0.8)";
}

/* ── Shared panel chrome ── */
function PanelFrame({
  title,
  dot,
  children,
}: {
  title: string;
  dot?: keyof typeof DOT;
  children: ReactNode;
}) {
  return (
    <div
      className="rounded-[10px] overflow-hidden flex flex-col h-full"
      style={{
        background: "linear-gradient(190deg, #1c1c1c, #0e0e0e)",
        border: "1px solid rgba(242,242,242,0.06)",
        boxShadow: "0 14px 30px rgba(0,0,0,0.35), inset 0 1px 0 rgba(242,242,242,0.03)",
      }}
    >
      <div
        className="flex items-center gap-1.5 px-2.5 py-[6px] shrink-0"
        style={{ borderBottom: "1px solid rgba(242,242,242,0.05)" }}
      >
        {dot && (
          <span
            className="w-[5px] h-[5px] rounded-full shrink-0"
            style={{ background: DOT[dot] }}
          />
        )}
        <span className="text-[8px] uppercase tracking-[0.07em] text-[var(--text-faint)] truncate">
          {title}
        </span>
      </div>
      <div className="px-2.5 py-2 font-mono text-[8px] leading-[1.5] flex-1 min-h-0 flex flex-col justify-center gap-[3px] overflow-hidden">
        {children}
      </div>
    </div>
  );
}

/* ── Terminal session ── */
function TerminalPanel({
  host,
  lines,
}: {
  host: string;
  lines: { p: boolean; t: string }[];
}) {
  return (
    <PanelFrame title={host} dot="green">
      {lines.map((l, i) => (
        <div key={i} className="truncate whitespace-pre">
          {l.p ? (
            <>
              <span style={{ color: "rgba(127,207,255,0.65)" }}>$</span>{" "}
              <span className="text-[var(--text-muted)]">{l.t}</span>
            </>
          ) : (
            <span className="text-[var(--text-faint)]">{l.t}</span>
          )}
        </div>
      ))}
      <div className="flex items-center">
        <span style={{ color: "rgba(127,207,255,0.65)" }}>$</span>
        <span
          className="wall-cursor inline-block w-[4px] h-[9px] ml-[4px]"
          style={{ background: "rgba(242,242,242,0.55)" }}
        />
      </div>
    </PanelFrame>
  );
}

/* ── Log tail ── */
function LogTailPanel({
  host,
  rows,
}: {
  host: string;
  rows: { status: number; path: string }[];
}) {
  return (
    <PanelFrame title={host} dot="blue">
      {rows.map((r, i) => (
        <div key={i} className="flex items-center gap-1.5 truncate">
          <span style={{ color: statusColor(r.status) }}>{r.status}</span>
          <span className="text-[var(--text-faint)] truncate">{r.path}</span>
        </div>
      ))}
    </PanelFrame>
  );
}

/* ── Service status grid ── */
function StatusGridPanel({ title, services }: { title: string; services: string[] }) {
  return (
    <PanelFrame title={title}>
      <div className="grid grid-cols-2 gap-x-2 gap-y-[5px]">
        {services.map((s, i) => (
          <div key={s} className="flex items-center gap-[5px] min-w-0">
            <span className="relative w-[5px] h-[5px] shrink-0">
              <span
                className="absolute inset-0 rounded-full"
                style={{ background: DOT.green }}
              />
              <span
                className="wall-dot-overlay absolute inset-0 rounded-full"
                style={{ background: DOT.amber, animationDelay: `${i * 0.9}s` }}
              />
            </span>
            <span className="text-[var(--text-faint)] truncate">{s}</span>
          </div>
        ))}
      </div>
    </PanelFrame>
  );
}

/* ── Metrics sparkline ── */
function SparklinePanel({
  title,
  values,
  caption,
}: {
  title: string;
  values: number[];
  caption: string;
}) {
  return (
    <PanelFrame title={title} dot="green">
      <div className="flex items-end gap-[3px] h-[42px]">
        {values.map((v, i) => (
          <span
            key={i}
            className="wall-bar flex-1 rounded-[1px]"
            style={{
              height: `${v}%`,
              background: "rgba(127,207,255,0.35)",
              animationDelay: `${i * 0.12}s`,
            }}
          />
        ))}
      </div>
      <div className="text-[var(--text-faint)]">{caption}</div>
    </PanelFrame>
  );
}

/* ── Scanner / health check sweep ── */
function ScannerPanel({ title, hosts }: { title: string; hosts: string[] }) {
  return (
    <PanelFrame title={title} dot="amber">
      <div className="relative">
        {hosts.map((h) => (
          <div key={h} className="flex items-center justify-between text-[var(--text-faint)]">
            <span className="truncate">{h}</span>
            <span style={{ color: DOT.green }}>ok</span>
          </div>
        ))}
        <span
          className="wall-sweep absolute inset-y-0 left-0 w-full pointer-events-none"
          style={{
            background: "linear-gradient(90deg, transparent, rgba(127,207,255,0.12), transparent)",
          }}
        />
      </div>
    </PanelFrame>
  );
}

/* ── Deploy pipeline ── */
function PipelinePanel({ title, stages }: { title: string; stages: string[] }) {
  return (
    <PanelFrame title={title} dot="blue">
      <div className="relative flex items-center justify-between mt-[6px]">
        <span
          className="absolute left-0 right-0 h-px"
          style={{ top: 3, background: "rgba(242,242,242,0.08)" }}
        />
        <span
          className="wall-stage-glow absolute h-px w-[16px]"
          style={{
            top: 3,
            background: "linear-gradient(90deg, transparent, rgba(127,207,255,0.75), transparent)",
          }}
        />
        {stages.map((s) => (
          <div
            key={s}
            className="relative z-[1] flex flex-col items-center gap-1"
            style={{ width: `${100 / stages.length}%` }}
          >
            <span className="w-[6px] h-[6px] rounded-full" style={{ background: DOT.green }} />
            <span className="text-[7px] text-[var(--text-faint)] truncate">{s}</span>
          </div>
        ))}
      </div>
    </PanelFrame>
  );
}

/* ── Process / container list ── */
function ProcessListPanel({
  host,
  procs,
}: {
  host: string;
  procs: { name: string; pct: number }[];
}) {
  return (
    <PanelFrame title={host} dot="green">
      {procs.map((p, i) => (
        <div key={p.name} className="flex items-center gap-1.5">
          <span className="text-[var(--text-faint)] w-[54px] shrink-0 truncate">{p.name}</span>
          <span
            className="flex-1 h-[3px] rounded-full overflow-hidden"
            style={{ background: "rgba(242,242,242,0.07)" }}
          >
            <span
              className="wall-bar-x block h-full rounded-full"
              style={{
                width: `${p.pct}%`,
                background: "rgba(127,207,255,0.42)",
                animationDelay: `${i * 0.3}s`,
              }}
            />
          </span>
        </div>
      ))}
    </PanelFrame>
  );
}

/* ── Column data ── */
const col1: ReactNode[] = [
  <TerminalPanel
    key="c1-1"
    host="edge-fra-02"
    lines={[
      { p: true, t: "ssh deploy@edge-fra-02" },
      { p: false, t: "Last login: Thu 03:41 from 10.0.2.11" },
      { p: true, t: "systemctl status traefik" },
      { p: false, t: "● active (running) since Aug 03" },
    ]}
  />,
  <StatusGridPanel
    key="c1-2"
    title="service health"
    services={["nginx-proxy", "api-gateway", "postgres-main", "redis-cache", "cdn-origin", "auth-svc"]}
  />,
  <SparklinePanel
    key="c1-3"
    title="req/s · api-gateway"
    values={[38, 52, 44, 60, 71, 55, 63, 80, 68, 74, 58, 66]}
    caption="p95 · 84ms"
  />,
];

const col2: ReactNode[] = [
  <LogTailPanel
    key="c2-1"
    host="access.log · prod-web-03"
    rows={[
      { status: 200, path: "GET /api/tickets" },
      { status: 200, path: "POST /webhook/stripe" },
      { status: 502, path: "POST /api/scrape/run" },
      { status: 200, path: "GET /api/leads?page=3" },
      { status: 404, path: "GET /favicon.ico" },
    ]}
  />,
  <PipelinePanel key="c2-2" title="deploy · rla-studios" stages={["build", "test", "deploy", "live"]} />,
  <ProcessListPanel
    key="c2-3"
    host="db-primary"
    procs={[
      { name: "postgres", pct: 34 },
      { name: "pgbouncer", pct: 12 },
      { name: "wal-archive", pct: 58 },
    ]}
  />,
];

const col3: ReactNode[] = [
  <ScannerPanel
    key="c3-1"
    title="health check sweep"
    hosts={["cache-01", "cache-02", "queue-worker", "cdn-origin"]}
  />,
  <TerminalPanel
    key="c3-2"
    host="build-runner-04"
    lines={[
      { p: true, t: "terraform apply -auto-approve" },
      { p: false, t: "Apply complete. Resources: 3 added" },
      { p: true, t: "docker compose up -d" },
      { p: false, t: "Started 4 containers" },
    ]}
  />,
  <StatusGridPanel
    key="c3-3"
    title="dns / zones"
    services={["rla-studios.com", "api.rla.dev", "cdn.rla.dev", "mail.rla.dev", "status.rla.dev", "app.rla.dev"]}
  />,
];

/* ── Drifting column ── */
function WallColumn({
  panels,
  duration,
  delay = 0,
}: {
  panels: ReactNode[];
  duration: number;
  delay?: number;
}) {
  const doubled = [...panels, ...panels];
  return (
    <div className="relative overflow-hidden" style={{ height: SET_H }}>
      <div
        className="wall-col-track flex flex-col"
        style={{ animationDuration: `${duration}s`, animationDelay: `-${delay}s` }}
      >
        {doubled.map((panel, i) => (
          <div key={i} style={{ height: PANEL_H, marginBottom: GAP }}>
            {panel}
          </div>
        ))}
      </div>
    </div>
  );
}

export default function OpsWall() {
  const rootRef = useRef<HTMLDivElement>(null);
  const parallaxRef = useRef<HTMLDivElement>(null);
  const pointerRef = useRef<{ x: number; y: number } | null>(null);
  const rafRef = useRef<number | null>(null);
  const [paused, setPaused] = useState(true);
  const [parallaxEnabled, setParallaxEnabled] = useState(false);

  // Fine-pointer + reduced-motion gate for the wall's cursor parallax —
  // same matchMedia + mounted-gated approach as Hero's constellation and
  // the previous card stack's tilt, so it can't cause a hydration
  // mismatch (SSR/first-paint markup never depends on this).
  useEffect(() => {
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    setParallaxEnabled(fine && !reduced);
  }, []);

  // Pause every CSS animation in the wall the moment it scrolls off
  // screen — a visitor who never scrolls to About pays nothing for it.
  useEffect(() => {
    const el = rootRef.current;
    if (!el || typeof IntersectionObserver === "undefined") {
      setPaused(false);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) setPaused(!entry.isIntersecting);
      },
      { threshold: 0.1 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    return () => {
      if (rafRef.current != null) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  const applyParallax = () => {
    rafRef.current = null;
    const el = parallaxRef.current;
    if (!el) return;
    const p = pointerRef.current;
    if (!p) {
      el.style.transform = "";
      return;
    }
    el.style.transform = `translate3d(${(p.x * 6).toFixed(2)}px, ${(p.y * 5).toFixed(2)}px, 0)`;
  };

  const handlePointerMove = (e: ReactPointerEvent<HTMLDivElement>) => {
    const rect = rootRef.current?.getBoundingClientRect();
    if (!rect) return;
    pointerRef.current = {
      x: ((e.clientX - rect.left) / rect.width) * 2 - 1,
      y: ((e.clientY - rect.top) / rect.height) * 2 - 1,
    };
    if (rafRef.current == null) rafRef.current = requestAnimationFrame(applyParallax);
  };

  const handlePointerLeave = () => {
    pointerRef.current = null;
    if (rafRef.current == null) rafRef.current = requestAnimationFrame(applyParallax);
  };

  return (
    <div
      ref={rootRef}
      aria-hidden="true"
      className={`about-reveal opswall relative mt-12 overflow-hidden${paused ? " opswall--paused" : ""}`}
      style={{ height: SET_H, ...cssVars({ "--about-delay": "0.3s", "--about-rise-y": "34px" }) }}
      onPointerMove={parallaxEnabled ? handlePointerMove : undefined}
      onPointerLeave={parallaxEnabled ? handlePointerLeave : undefined}
    >
      <div
        ref={parallaxRef}
        className="opswall-parallax grid grid-cols-2 md:grid-cols-3 gap-3 h-full"
      >
        <WallColumn panels={col1} duration={78} />
        <WallColumn panels={col2} duration={64} delay={14} />
        <div className="hidden md:block h-full">
          <WallColumn panels={col3} duration={92} delay={30} />
        </div>
      </div>
      <div
        className="absolute inset-x-0 top-0 h-10 pointer-events-none"
        style={{ background: "linear-gradient(180deg, var(--color-bg), transparent)" }}
      />
      <div
        className="absolute inset-x-0 bottom-0 h-14 pointer-events-none"
        style={{ background: "linear-gradient(0deg, var(--color-bg), transparent)" }}
      />
    </div>
  );
}
