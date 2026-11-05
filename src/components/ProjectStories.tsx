import { useScrollProgress } from "@/lib/use-scroll-progress";
import chair from "@/assets/cozy-chair.png";
import toy from "@/assets/swara-toy.png";

export function CozyGrowMechanism({ detail }: { detail: string }) {
  const ref = useScrollProgress<HTMLElement>("pass");
  return (
    <section ref={ref} className="cg" aria-label="Cozy Grow">
      <div className="cg-stage">
        <div className="pd cg-detail" dangerouslySetInnerHTML={{ __html: detail }} />
        <figure className="cg-final"><img src={chair} alt="Cozy Grow convertible chair" /></figure>
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
