import { useScrollProgress } from "@/lib/use-scroll-progress";
import chair from "@/assets/cozy-chair.png";
import stages from "@/assets/cozy-stages.jpg";
import mech from "@/assets/cozy-mechanism.jpg";
import exploded from "@/assets/cozy-exploded.jpg";
import renders from "@/assets/cozy-renders.jpg";
import toy from "@/assets/swara-toy.png";

const cozyFrames = [
  { img: chair, t: "The product", d: "A convertible baby seat that grows from a cradle into a feeding chair.", cut: true },
  { img: stages, t: "One product, two stages", d: "A cradle first, then a feeding chair from six months up to 3–4 years." },
  { img: mech, t: "The mechanism", d: "A rod moves between stoppers, taking the seat from a reclined cradle to an upright 90° chair." },
  { img: exploded, t: "Every part", d: "Cradle cushion, main seat, connecting and sliding rods, and base." },
  { img: renders, t: "Both forms", d: "The reclined cradle, and the upright feeding chair with its table." },
];

export function CozyGrowMechanism({ detail }: { detail: string }) {
  const ref = useScrollProgress<HTMLElement>();
  return (
    <section ref={ref} className="cg" aria-label="Cozy Grow — how it converts">
      <div className="cg-stage">
        <div className="cg-copy">
          <span className="kr-eyebrow">02 — Mechanism · Cozy Grow</span>
          <h2 className="cg-title">One seat, <em>two stages.</em></h2>
          <ol className="cg-steps">
            {cozyFrames.map((s, i) => (
              <li key={s.t} style={{ "--s": i } as React.CSSProperties}>
                <span>{String(i + 1).padStart(2, "0")}</span><b>{s.t}</b><small>{s.d}</small>
              </li>
            ))}
          </ol>
        </div>
        <div className="pd cg-detail" dangerouslySetInnerHTML={{ __html: detail }} />
        <div className="cg-frames">
          {cozyFrames.map((f, i) => (
            <figure key={f.t} className={`cg-frame${f.cut ? " cut" : ""}`} style={{ "--s": i } as React.CSSProperties}>
              <img src={f.img} alt={`Cozy Grow — ${f.t}`} loading="lazy" />
            </figure>
          ))}
          <figure className="cg-frame cut cg-final"><img src={chair} alt="Cozy Grow convertible chair" /></figure>
        </div>
      </div>
    </section>
  );
}

const swars = ["Sa", "Re", "Ga", "Ma", "Pa", "Dha", "Ni", "Sa"];
const hues = ["#e24b4b", "#ee8a3a", "#e8b923", "#3fae9f", "#3c6fb8", "#7b5bb5", "#e48aa3", "#e24b4b"];

export function SwaraNotes({ detail }: { detail: string }) {
  const ref = useScrollProgress<HTMLElement>();
  return (
    <section ref={ref} className="sw" aria-label="Swara — a pull toy for learning the swaras">
      <div className="sw-stage">
        <div className="sw-head">
          <span className="kr-eyebrow">03 — Play · Swara</span>
          <h2 className="cg-title">Pick a note, <em>strike it, hear it.</em></h2>
        </div>
        <div className="sw-notes">
          {swars.map((n, i) => (
            <span key={i} className="sw-note" style={{ "--n": i, "--c": hues[i] } as React.CSSProperties}>
              <i>♪</i>{n}
            </span>
          ))}
        </div>
        <div className="sw-toy"><img src={toy} alt="Swara wooden pull toy" /></div>
        <div className="sw-ground" />
        <div className="pd sw-detail" dangerouslySetInnerHTML={{ __html: detail }} />
      </div>
    </section>
  );
}
