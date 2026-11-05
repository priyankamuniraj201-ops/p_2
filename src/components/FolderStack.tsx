import { siBlender, siFigma, siAutodesk, siRhinoceros } from "simple-icons";

const Si = ({ path, hex }: { path: string; hex: string }) => (
  <svg viewBox="0 0 24 24" aria-hidden><path d={path} fill={`#${hex}`} /></svg>
);
const Adobe = ({ label, bg, fg }: { label: string; bg: string; fg: string }) => (
  <svg viewBox="0 0 24 24" aria-hidden>
    <rect x="1" y="1" width="22" height="22" rx="5" fill={bg} />
    <text x="12" y="16.2" textAnchor="middle" fontFamily="Manrope, sans-serif" fontWeight="700" fontSize="10" fill={fg}>{label}</text>
  </svg>
);
const Line = ({ d, c = "#1d2925" }: { d: string; c?: string }) => (
  <svg viewBox="0 0 24 24" aria-hidden fill="none" stroke={c} strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d={d} /></svg>
);

type Item = { n: string; icon: React.ReactNode };
const folders: { id: string; label: string; title: string; tone: string; items: Item[] }[] = [
  {
    id: "software", label: "01", title: "Software", tone: "var(--fd-a)", items: [
      { n: "Fusion 360", icon: <Si path={siAutodesk.path} hex="FF6B00" /> },
      { n: "Rhino", icon: <Si path={siRhinoceros.path} hex={siRhinoceros.hex} /> },
      { n: "Blender", icon: <Si path={siBlender.path} hex={siBlender.hex} /> },
      { n: "Figma", icon: <Si path={siFigma.path} hex={siFigma.hex} /> },
      { n: "Photoshop", icon: <Adobe label="Ps" bg="#001E36" fg="#31A8FF" /> },
      { n: "Illustrator", icon: <Adobe label="Ai" bg="#330000" fg="#FF9A00" /> },
    ],
  },
  {
    id: "skills", label: "02", title: "Skills", tone: "var(--fd-b)", items: [
      { n: "Design thinking", icon: <Line d="M9 18h6M10 21h4M12 3a6 6 0 0 0-3.5 10.9c.6.5 1 1.2 1 2.1h5c0-.9.4-1.6 1-2.1A6 6 0 0 0 12 3z" c="#d64f35" /> },
      { n: "Problem solving", icon: <Line d="M4 7h6v4a2 2 0 1 0 4 0V7h6v13H4zM10 7V4h4v3" /> },
      { n: "User research", icon: <Line d="M11 4a7 7 0 1 0 0 14 7 7 0 0 0 0-14zM16 16l5 5" c="#3c6fb8" /> },
      { n: "Sketching", icon: <Line d="M4 20l4-1L19 8l-3-3L5 16zM14 7l3 3" c="#d64f35" /> },
      { n: "Prototyping", icon: <Line d="M12 3l8 4.5v9L12 21l-8-4.5v-9zM12 12l8-4.5M12 12v9M12 12L4 7.5" /> },
      { n: "Ergonomics", icon: <Line d="M12 5a2 2 0 1 0 0-.1M8 21l2-7-3-3 5-2 3 4h3M12 9l1 5" c="#3e9a9a" /> },
    ],
  },
  {
    id: "interests", label: "03", title: "Interests", tone: "var(--fd-c)", items: [
      { n: "Toys", icon: <Line d="M4 14h12v4H4zM7 21a2 2 0 1 0 0-.1M14 21a2 2 0 1 0 0-.1M8 14V9h6v5M16 16h4" c="#e8913a" /> },
      { n: "Furniture", icon: <Line d="M6 11V5a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v6M4 11h16v4H4zM6 15v6M18 15v6" c="#8a5a33" /> },
      { n: "Home & kitchen", icon: <Line d="M7 9h10l-1 11H8zM5 9h14M10 9V6a2 2 0 0 1 4 0v3M17 12h2a2 2 0 0 1 0 4h-2" /> },
      { n: "Everyday objects", icon: <Line d="M9 3h6v4l2 3v11H7V10l2-3z" c="#3c6fb8" /> },
      { n: "Material craft", icon: <Line d="M3 17l6-6 4 4 8-8M15 7h6v6" c="#6fae5a" /> },
    ],
  },
];

export function FolderStack() {
  return (
    <section className="ps-block wrap" id="resume" aria-labelledby="tk-h">
      <header className="ps-head reveal">
        <span className="ps-eyebrow">Toolkit &amp; practice</span>
        <h2 id="tk-h">The tools behind <em>the products.</em></h2>
        <p className="fd-hint">Hover or tap a folder to open it.</p>
      </header>
      <div className="fd-row">
        {folders.map((f, fi) => (
          <div key={f.id} className="fd reveal" tabIndex={0}
            onMouseMove={(e) => { const r = e.currentTarget.getBoundingClientRect(); e.currentTarget.style.setProperty("--tx", `${((e.clientX - r.left) / r.width - .5) * 10}deg`); e.currentTarget.style.setProperty("--ty", `${-((e.clientY - r.top) / r.height - .5) * 8}deg`); }}
            onMouseLeave={(e) => { e.currentTarget.style.setProperty("--tx", "0deg"); e.currentTarget.style.setProperty("--ty", "0deg"); }}
            style={{ "--tone": f.tone, "--fi": fi } as React.CSSProperties} aria-label={`${f.title}: ${f.items.map((i) => i.n).join(", ")}`}>
            <div className="fd-back"><span className="fd-tab">{f.label} · {f.title}</span></div>
            <ul className="fd-items">
              {f.items.map((it, i) => (
                <li key={it.n} className="fd-item" style={{ "--k": i, "--n": f.items.length } as React.CSSProperties}>
                  <span className="fd-ico">{it.icon}</span>
                  <span className="fd-name">{it.n}</span>
                </li>
              ))}
            </ul>
            <div className="fd-front">
              <b>{f.title}</b>
              <span>{f.items.length} items</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
