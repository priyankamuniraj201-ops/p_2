import { useScrollProgress } from "@/lib/use-scroll-progress";

const roles = [
  { co: "Smith Studio", role: "Product Design Intern", from: "May 2026", to: "Jul 2026", year: "2026",
    pts: ["Modelled brass handles and knobs in Fusion 360 & AutoCAD", "Created technical drawings and supported production detailing", "Explored brass materials, finishes and CMF for product cataloguing"], tags: ["Fusion 360", "Hardware", "Finishes"] },
  { co: "NoviTech", role: "Product Design Intern", from: "Aug 2025", to: "Sep 2025", year: "2025",
    pts: ["Designed and refined web and mobile interfaces", "Built Figma wireframes and clickable prototypes", "Focused on usability throughout"], tags: ["Figma", "UI/UX", "Prototyping"] },
];

export function ExperienceTimeline() {
  const ref = useScrollProgress<HTMLElement>("pass");
  return (
    <section ref={ref} className="ps-block wrap xt" id="experience" aria-labelledby="xp-h">
      <header className="ps-head reveal">
        <span className="ps-eyebrow">Professional experience</span>
        <h2 id="xp-h">Two internships, <em>two kinds of making.</em></h2>
      </header>
      <div className="xt-list">
        <div className="xt-line"><i /></div>
        {roles.map((r, i) => (
          <article key={r.co} className="xt-item reveal" style={{ "--i": i } as React.CSSProperties}>
            <div className="xt-date"><b>{r.year}</b><span>{r.from} — {r.to}</span></div>
            <span className="xt-dot" />
            <div className="xt-card">
              <div className="xt-top"><h3>{r.co}</h3><span>{r.role}</span></div>
              <ul>{r.pts.map((p) => <li key={p}>{p}</li>)}</ul>
              <div className="xt-tags">{r.tags.map((t) => <span key={t}>{t}</span>)}</div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
