import Link from "next/link";

export default function NotFound() {
  return (
    <main
      className="min-h-screen flex flex-col items-center justify-center px-6"
      style={{ background: "var(--color-bg)" }}
    >
      <div className="text-center max-w-[480px]">
        <span className="text-[11px] uppercase tracking-[0.15em] text-[var(--color-fg-15)] block mb-8">
          404
        </span>
        <h1 className="text-[clamp(52px,12vw,100px)] font-medium leading-[0.9] tracking-[-3px]">
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
        <p className="mt-8 text-[14px] md:text-[15px] leading-[1.6] text-[var(--color-fg-30)]">
          This page doesn&apos;t exist. The servers are healthy though — checked
          twice.
        </p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 mt-10 text-[13px] font-medium text-[var(--color-fg-30)] hover:text-[var(--color-fg)] transition-colors duration-300 group"
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
      </div>
    </main>
  );
}
