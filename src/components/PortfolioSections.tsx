import { siBlender, siFigma, siAutodesk, siRhinoceros } from "simple-icons";
import swara from "@/assets/Swara.png";
import cozy from "@/assets/Cozygrow.png";
import kosha from "@/assets/Kosha.png";

type Tool = { name: string; role: string; icon: React.ReactNode };

const Si = ({ path, hex }: { path: string; hex: string }) => (
  <svg viewBox="0 0 24 24" aria-hidden><path d={path} fill={`#${hex}`} /></svg>
);
const Adobe = ({ label, bg, fg }: { label: string; bg: string; fg: string }) => (
  <svg viewBox="0 0 24 24" aria-hidden>
    <rect x="1" y="1" width="22" height="22" rx="5" fill={bg} />
    <text x="12" y="16.2" textAnchor="middle" fontFamily="Manrope, sans-serif" fontWeight="700" fontSize="10" fill={fg}>{label}</text>
  </svg>
);

const tools: Tool[] = [
  { name: "Fusion 360", role: "Parametric CAD", icon: <Si path={siAutodesk.path} hex="FF6B00" /> },
  { name: "Rhino", role: "Surface modelling", icon: <Si path={siRhinoceros.path} hex={siRhinoceros.hex} /> },
  { name: "Blender", role: "Rendering", icon: <Si path={siBlender.path} hex={siBlender.hex} /> },
  { name: "Figma", role: "Layout & UI", icon: <Si path={siFigma.path} hex={siFigma.hex} /> },
  { name: "Photoshop", role: "Image editing", icon: <Adobe label="Ps" bg="#001E36" fg="#31A8FF" /> },
  { name: "Illustrator", role: "Vector & drawings", icon: <Adobe label="Ai" bg="#330000" fg="#FF9A00" /> },
];
const skills = ["Design thinking", "Problem solving", "User research", "Sketching", "Prototyping", "CAD modelling", "Ergonomics", "Materials"];
const interests = [
  { n: "Toys", d: "Play that teaches" },
  { n: "Furniture", d: "Forms you live with" },
  { n: "Home & kitchen", d: "Daily appliances" },
  { n: "Everyday objects", d: "Small, kept things" },
  { n: "Material craft", d: "Wood, foam, finish" },
];

export function Toolkit() {
  return (
    <section className="ps-block wrap" id="resume" aria-labelledby="tk-h">
      <header className="ps-head reveal">
        <span className="ps-eyebrow">Toolkit &amp; practice</span>
        <h2 id="tk-h">The tools behind <em>the objects.</em></h2>
      </header>

      <div className="ps-panel reveal">
        <div className="ps-label"><span>01</span> Software</div>
        <ul className="tk-grid">
          {tools.map((t, i) => (
            <li key={t.name} className="tk-tile" style={{ "--i": i } as React.CSSProperties}>
              <span className="tk-ico">{t.icon}</span>
              <span className="tk-name">{t.name}</span>
              <span className="tk-role">{t.role}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="ps-split">
        <div className="ps-panel reveal">
          <div className="ps-label"><span>02</span> Skills</div>
          <ul className="sk-chips">
            {skills.map((s, i) => <li key={s} style={{ "--i": i } as React.CSSProperties}>{s}</li>)}
          </ul>
        </div>
        <div className="ps-panel reveal">
          <div className="ps-label"><span>03</span> Interests</div>
          <ol className="in-list">
            {interests.map((x, i) => (
              <li key={x.n} style={{ "--i": i } as React.CSSProperties}>
                <span className="in-n">{String(i + 1).padStart(2, "0")}</span>
                <b>{x.n}</b><span className="in-d">{x.d}</span>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}

const works = [
  { id: "kosha", n: "01", name: "Kosha", kind: "Furniture · Lounge chair", img: kosha, pdf: "/docs/KOSHA.pdf" },
  { id: "cozy-grow", n: "02", name: "Cozy Grow", kind: "Baby product · Cradle to feeding chair", img: cozy, pdf: "/docs/COZY%20GROW.pdf" },
  { id: "swara", n: "03", name: "Swara Pull Toy", kind: "Children's product · Musical toy", img: swara, pdf: "/docs/SWARA.pdf" },
];

export function WorksGrid() {
  return (
    <section className="ps-block wrap" id="works" aria-labelledby="wk-h">
      <header className="ps-head reveal">
        <span className="ps-eyebrow">Selected works</span>
        <h2 id="wk-h">Three products, <em>one process.</em></h2>
      </header>
      <div className="wk-grid">
        {works.map((w, i) => (
          <a key={w.id} href={`#${w.id}`} className="wk-card reveal" style={{ "--i": i } as React.CSSProperties}>
            <div className="wk-img"><img src={w.img} alt={w.name} loading="lazy" /></div>
            <div className="wk-meta">
              <span className="wk-n">{w.n}</span>
              <div><h3>{w.name}</h3><p>{w.kind}</p></div>
              <span className="wk-go" aria-hidden>↘</span>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}

export function Connect() {
  return (
    <section className="cx wrap" id="connect">
      <div className="cx-card reveal">
        <span className="cx-status"><i /> Open to design roles &amp; freelance</span>
        <h2>Looking for a <em>product designer?</em></h2>
        <p>I'm looking for studios and teams that care about how things are used and made. Let's talk.</p>
        <div className="cx-actions">
          <a className="cx-btn solid" href="mailto:priyankamuniraj201@gmail.com">priyankamuniraj201@gmail.com <span aria-hidden>→</span></a>
          <a className="cx-btn" href="https://www.linkedin.com/in/priyankamuniraj/" target="_blank" rel="noopener noreferrer">LinkedIn <span aria-hidden>↗</span></a>
        </div>
      </div>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="ft">
      <div className="wrap">
        <div className="ft-big reveal">Priyanka M</div>
        <div className="ft-row">
          <span>Industrial designer · India</span>
          <nav aria-label="Footer">
            <a href="#top">Home</a><a href="#works">Works</a><a href="#about">About</a><a href="#connect">Contact</a>
          </nav>
          <span>© {new Date().getFullYear()} Priyanka M</span>
        </div>
      </div>
    </footer>
  );
}
