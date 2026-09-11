import Link from "next/link";

export default function NotFound() {
  return (
    <main
      className="min-h-screen flex flex-col items-center justify-center px-6"
      style={{ background: "var(--color-bg)" }}
    >
      <div className="text-center max-w-[580px]">
        <span
          className="text-[11px] uppercase tracking-[0.15em] text-[var(--text-muted)] block mb-8"
          style={{ animation: "fadeInUp 0.6s cubic-bezier(0.165, 0.84, 0.44, 1) both" }}
        >
          404
        </span>
        <h1
          className="text-[clamp(52px,12vw,100px)] font-medium leading-[0.9] tracking-[-3px]"
          style={{
            color: "var(--text-primary)",
            animation: "fadeInUp 0.8s cubic-bezier(0.165, 0.84, 0.44, 1) 0.1s both",
          }}
        >
          Lost in
          <br />
          <span
            className="gradient-text-fade inline-block"
            style={{
              fontFamily: "var(--font-serif)",
              fontStyle: "italic",
              fontWeight: 400,
              letterSpacing: "-2px",
            }}
          >
            the system.
          </span>
        </h1>
        <p
          className="mt-8 text-[14px] md:text-[15px] leading-[1.6]"
          style={{
            color: "var(--text-body)",
            animation: "fadeInUp 0.8s cubic-bezier(0.165, 0.84, 0.44, 1) 0.2s both",
          }}
        >
          This page doesn&apos;t exist. The servers are healthy though, checked
          twice.
        </p>
        <div
          className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-3"
          style={{
            animation: "fadeInUp 0.8s cubic-bezier(0.165, 0.84, 0.44, 1) 0.3s both",
          }}
        >
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-[13px] font-medium text-[var(--text-body)] hover:text-[var(--text-primary)] transition-all duration-300 group"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              className="group-hover:-translate-x-0.5 transition-transform duration-300"
            >
              <path
                d="M19 12H5M5 12l6 6M5 12l6-6"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            Back home
          </Link>
          <span className="text-[var(--text-faint)] hidden sm:block">or</span>
          <Link
            href="/#work"
            className="inline-flex items-center gap-2 text-[13px] font-medium text-[var(--text-body)] hover:text-[var(--text-primary)] transition-all duration-300 group"
          >
            View work
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              className="group-hover:translate-y-0.5 group-hover:translate-x-0.5 transition-transform duration-300"
            >
              <path
                d="M7 17L17 7M17 7H8M17 7V16"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </Link>
        </div>
      </div>

      <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(12px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @media (prefers-reduced-motion: reduce) {
          * {
            animation: none !important;
          }
        }
      `}</style>
    </main>
  );
}
