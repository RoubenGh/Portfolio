/**
 * Page-level enter transition.
 *
 * This is intentionally plain CSS (`@keyframes` in a static <style> tag),
 * not a JS-driven `initial={{opacity: 0}}` / `animate={{opacity: 1}}`
 * framer-motion state. The animation runs the moment the browser parses
 * the stylesheet, independent of React hydration ever completing — so a
 * failed/slow hydration cannot leave the page stuck invisible. This
 * mirrors the fix already applied in Hero.tsx (see the comment block at
 * the end of globals.css) after this project previously shipped a
 * fullscreen overlay that rendered nothing because a JS opacity
 * animation never completed.
 *
 * If the animation never runs for any reason, the element still has no
 * inline opacity/visibility outside the keyframes, so it falls back to
 * the browser default (fully visible, fully interactive).
 */
export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <div className="page-enter">
      <style>{`
        @keyframes page-enter-kf {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .page-enter {
          animation: page-enter-kf 0.32s cubic-bezier(0.165, 0.84, 0.44, 1) both;
        }
        @media (prefers-reduced-motion: reduce) {
          .page-enter {
            animation: none;
          }
        }
      `}</style>
      {children}
    </div>
  );
}
