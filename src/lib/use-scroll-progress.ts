import { useEffect, useRef } from "react";

/** How far --p trails the real scroll position, in ms. Higher = floatier. */
const TRAIL_MS = 110;

/** Writes eased scroll progress (0→1) of a pinned/tall element to its --p CSS variable.
 *  mode "pin": 0 when top hits viewport top, 1 when bottom hits viewport bottom.
 *  mode "pass": 0 when top enters bottom of viewport, 1 when bottom leaves the top. */
export function useScrollProgress<T extends HTMLElement>(mode: "pin" | "pass" = "pin") {
  const ref = useRef<T>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const trail = matchMedia("(prefers-reduced-motion: reduce)").matches ? 0.001 : TRAIL_MS;
    const target = () => {
      const r = el.getBoundingClientRect();
      const p = mode === "pin"
        ? -r.top / Math.max(1, r.height - innerHeight)
        : (innerHeight - r.top) / (r.height + innerHeight);
      return Math.min(1, Math.max(0, p));
    };
    const write = (v: number) => el.style.setProperty("--p", v.toFixed(4));

    let cur = target(), raf = 0, last = 0;
    const tick = (now: number) => {
      const t = target();
      if (t === cur) { raf = 0; return; } // off screen or settled: stop the loop
      cur += (t - cur) * (1 - Math.exp(-Math.min(now - last, 50) / trail));
      if (Math.abs(t - cur) < 0.0004) cur = t;
      last = now;
      write(cur);
      raf = requestAnimationFrame(tick);
    };
    const on = () => { if (!raf) { last = performance.now(); raf = requestAnimationFrame(tick); } };
    write(cur);
    addEventListener("scroll", on, { passive: true });
    addEventListener("resize", on);
    return () => { removeEventListener("scroll", on); removeEventListener("resize", on); cancelAnimationFrame(raf); };
  }, [mode]);
  return ref;
}
