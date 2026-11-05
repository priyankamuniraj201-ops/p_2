import { useEffect, useRef } from "react";

const LABELS: [string, string][] = [["top", "Intro"], ["toolkit", "Toolkit"], ["experience", "Experience"], ["works", "Works"], ["about", "About"], ["connect", "Connect"]];

/** Fixed background contour pattern + side progress rail tied to page scroll,
 *  giving one continuous thread from the hero to the footer. */
export function ContinuityLayer() {
  const label = useRef<HTMLSpanElement>(null);
  const bg = useRef<HTMLDivElement>(null);
  const rail = useRef<HTMLDivElement>(null);
  useEffect(() => {
    let raf = 0;
    const tick = () => {
      raf = 0;
      const max = document.documentElement.scrollHeight - innerHeight;
      // Set on these two only: setting it on <html> restyles the whole page on every scroll.
      const sp = String(max > 0 ? Math.min(1, scrollY / max) : 0);
      bg.current?.style.setProperty("--sp", sp);
      rail.current?.style.setProperty("--sp", sp);
      let cur = "Intro";
      for (const [id, name] of LABELS) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top < innerHeight * 0.5) cur = name;
      }
      if (label.current && label.current.textContent !== cur) label.current.textContent = cur;
    };
    const on = () => { if (!raf) raf = requestAnimationFrame(tick); };
    tick();
    addEventListener("scroll", on, { passive: true });
    addEventListener("resize", on);
    return () => { removeEventListener("scroll", on); removeEventListener("resize", on); cancelAnimationFrame(raf); };
  }, []);
  const rings = Array.from({ length: 14 }, (_, i) => {
    const r = 60 + i * 55;
    return `M ${700 - r} 500 C ${700 - r} ${500 - r * 0.62}, ${700 + r} ${500 - r * 0.62}, ${700 + r} 500 S ${700 - r} ${500 + r * 0.7}, ${700 - r} 500`;
  });
  return (
    <>
      <div ref={bg} className="ct-bg" aria-hidden>
        <div className="ct-blob" />
        <svg viewBox="0 0 1400 1000" preserveAspectRatio="xMidYMid slice">{rings.map((d, i) => <path key={i} d={d} />)}</svg>
      </div>
      <div ref={rail} className="ct-rail" aria-hidden><i /><b /><span ref={label}>Intro</span></div>
    </>
  );
}
