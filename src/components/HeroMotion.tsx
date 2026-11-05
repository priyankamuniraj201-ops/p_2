import { useEffect, useRef } from "react";
import { useScrollProgress } from "@/lib/use-scroll-progress";
import kosha from "@/assets/kosha-chair.webp";
import cozy from "@/assets/cozy-chair.webp";
import swara from "@/assets/swara-toy.webp";

/** Pinned hero: text always stays readable; scroll fills the intro word by word,
 *  a giant outlined word slides behind, the portrait opens up and the three
 *  products drift in around it. */
export function HeroMotion({ html }: { html: string }) {
  const ref = useScrollProgress<HTMLDivElement>("pin");
  return (
    <div ref={ref} className="hm">
      <div className="hm-stage">
        <div className="hm-bigword" aria-hidden><span>Industrial</span><span>Designer</span></div>
        <div className="hm-content" dangerouslySetInnerHTML={{ __html: html }} />
        <div className="hm-orbit" aria-hidden>
          <img className="hm-o hm-o1" src={kosha} alt="" />
          <img className="hm-o hm-o2" src={cozy} alt="" />
          <img className="hm-o hm-o3" src={swara} alt="" />
        </div>
        <div className="hm-bar" aria-hidden><i /></div>
        <div className="hm-cue" aria-hidden><span>Scroll</span><i /></div>
      </div>
    </div>
  );
}

const words = ["Research", "Ideation", "Ergonomics", "Mechanisms", "Prototyping", "Renders", "Materials", "Manufacturing"];

/** Two-row ribbon moving in opposite directions; scrolling speeds it up and skews it. */
export function Ribbon() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const [r0, r1] = Array.from(el.querySelectorAll<HTMLElement>(".rb-track"));
    if (!r0 || !r1) return;
    let x = 0, v = 0, last = scrollY, raf = 0, hover = false;
    const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
    const enter = () => (hover = true), leave = () => (hover = false);
    el.addEventListener("mouseenter", enter); el.addEventListener("mouseleave", leave);
    const tick = () => {
      const d = scrollY - last; last = scrollY;
      v += (d * 0.25 - v) * 0.12;
      x += (reduce ? 0 : hover ? 0.12 : 0.6) + Math.abs(v);
      const w = r0.scrollWidth / 2;
      const o = x % w;
      r0.style.transform = `translateX(${-o}px)`;
      r1.style.transform = `translateX(${o - w}px)`;
      el.style.setProperty("--skew", `${Math.max(-8, Math.min(8, v * 0.6))}deg`);
      raf = requestAnimationFrame(tick);
    };
    tick();
    return () => { cancelAnimationFrame(raf); el.removeEventListener("mouseenter", enter); el.removeEventListener("mouseleave", leave); };
  }, []);
  const row = (k: string) => [...words, ...words].map((w, i) => (
    <span key={k + i} className="rb-item"><i>✦</i>{w}</span>
  ));
  return (
    <div ref={ref} className="rb" aria-hidden>
      <div className="rb-row"><div className="rb-track">{row("a")}</div></div>
      <div className="rb-row rb-alt"><div className="rb-track">{row("b")}</div></div>
    </div>
  );
}
