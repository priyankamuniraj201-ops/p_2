import { useScrollProgress } from "@/lib/use-scroll-progress";
import peanut from "@/assets/peanut-shell.png";
import chair from "@/assets/kosha-chair.png";

/**
 * Scroll-pinned intro: a peanut shell cracks along its seam, the halves
 * swing apart and the Kosha chair emerges from inside.
 * Progress (0→1) is written to --p on the section; all motion lives in CSS.
 */
export function KoshaReveal({ detail }: { detail: string }) {
  const ref = useScrollProgress<HTMLElement>();

  return (
    <section ref={ref} className="kr" aria-label="Kosha — from peanut shell to chair">
      <div className="kr-stage">
        <div className="kr-glow" />
        <div className="kr-intro">
          <span className="kr-eyebrow">Featured project · Kosha</span>
          <h2 className="kr-title">A chair that began <em>as a peanut shell.</em></h2>
        </div>

        <div className="kr-object">
          <div className="kr-chair-wrap"><img className="kr-chair" src={chair} alt="Kosha lounge chair" width={1278} height={964} /></div>
          <div className="kr-half kr-half-bottom"><img className="kr-shell kr-shell-bottom" src={peanut} alt="Peanut shell" width={1406} height={565} /></div>
          <div className="kr-half kr-half-top"><img className="kr-shell kr-shell-top" src={peanut} alt="" aria-hidden width={1406} height={565} /></div>
          <div className="kr-seam" />
        </div>

        <div className="pd kr-detail" dangerouslySetInnerHTML={{ __html: detail }} />

        <div className="kr-hint"><span>Scroll to crack it open</span><i /></div>
      </div>
    </section>
  );
}
