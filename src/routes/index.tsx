import { ContinuityLayer } from "@/components/ContinuityLayer";
import { createFileRoute } from "@tanstack/react-router";
import { useEffect } from "react";
import portfolioCss from "../portfolio.css?url";
import sectionsCss from "../sections.css?url";
import rawHtml from "../content/portfolio.html?raw";
import portrait from "@/assets/Priyanka_Picture.webp";
import swara from "@/assets/Swara.webp";
import cozy from "@/assets/Cozygrow.webp";
import kosha from "@/assets/Kosha.webp";
import { initPortfolioEffects } from "@/lib/portfolio-effects";
import { KoshaReveal } from "@/components/KoshaReveal";
import { WorksGrid, Connect, Footer } from "@/components/PortfolioSections";
import { FolderStack } from "@/components/FolderStack";
import { ExperienceTimeline } from "@/components/ExperienceTimeline";
import { HeroMotion, Ribbon } from "@/components/HeroMotion";
import { CozyGrowMechanism, SwaraNotes } from "@/components/ProjectStories";

const html = rawHtml
  .replace(/src="Priyanka_Picture\.png"/g, `src="${portrait}"`)
  .replace(/src="Swara\.png"/g, `src="${swara}"`)
  .replace(/src="Cozygrow\.png"/g, `src="${cozy}"`)
  .replace(/src="Kosha\.png"/g, `src="${kosha}"`);

const between = (s: string, a: string, b: string) => s.slice(s.indexOf(a), s.indexOf(b));

const topbar = html.slice(0, html.indexOf('<main id="top">'));
const words = (t: string, start: number) =>
  t.split(" ").map((w, i) => `<span class="hm-w"><span style="--w:${start + i}">${w}</span></span>`).join(" ");
const heroFull = between(html, "<!-- HERO -->", '<section class="block wrap" id="resume">');
const heroPart = heroFull
  .slice(0, heroFull.indexOf('<div class="marquee"'))
  .replace(/<p class="intro">([\s\S]*?)<\/p>/, (_m, t: string) =>
    `<p class="intro">${t.trim().split(/\s+/).map((w, i, a) => `<span class="hm-r" style="--r:${(i / a.length).toFixed(3)}">${w}</span>`).join(" ")}</p>`)
  .replace("For the everyday.<br><em>Built to be kept.</em>", `${words("For the everyday.", 0)}<br><em>${words("Built to be kept.", 3)}</em>`);
const renum = (h: string, n: string) => h.replace(/<div class="big-num">\d+<\/div>/, `<div class="big-num">${n}</div>`);
const swaraCh = renum(between(html, "<!-- 01 SWARA -->", "<!-- 02 COZY GROW -->"), "03");
const cozyCh = between(html, "<!-- 02 COZY GROW -->", "<!-- 03 KOSHA -->");
const koshaCh = renum(between(html, "<!-- 03 KOSHA -->", "<!-- ABOUT -->"), "01");
// The product description is shown inside each scroll scene, next to the product it lands beside.
const titleRe = /<div class="chapter-title reveal">[\s\S]*?<\/a>\s*<\/div>\s*<\/div>/;
const detail = (h: string) => (h.match(titleRe)?.[0] ?? "").replace("chapter-title reveal", "chapter-title");
const strip = (h: string) => h.replace(titleRe, "");
const about = between(html, "<!-- ABOUT -->", "<!-- CONNECT -->");

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Priyanka M — Industrial Designer Portfolio" },
      { name: "description", content: "Product design portfolio of Priyanka M: Swara, Cozy Grow and Kosha — research, modelling and prototyping." },
      { property: "og:title", content: "Priyanka M — Industrial Designer Portfolio" },
      { property: "og:description", content: "Product design work by Priyanka M: Swara, Cozy Grow and Kosha." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,300..800;1,9..144,300..800&family=Manrope:wght@400;500;600;700&family=Montserrat:wght@500;700;800;900&family=Poppins:wght@300;400;500;600&display=swap" },
      { rel: "stylesheet", href: portfolioCss },
      { rel: "stylesheet", href: sectionsCss },
    ],
  }),
  component: Index,
});

const Html = ({ h }: { h: string }) => <div style={{ display: "contents" }} dangerouslySetInnerHTML={{ __html: h }} />;

function Index() {
  useEffect(() => initPortfolioEffects(), []);
  return (
    <>
      <ContinuityLayer />
      <Html h={topbar} />
      <main id="top">
        <HeroMotion html={heroPart} />
        <Ribbon />
        <FolderStack />
        <ExperienceTimeline />
        <WorksGrid />
        <KoshaReveal detail={detail(koshaCh)} />
        <Html h={strip(koshaCh)} />
        <CozyGrowMechanism detail={detail(cozyCh)} />
        <Html h={strip(cozyCh)} />
        <SwaraNotes detail={detail(swaraCh)} />
        <Html h={strip(swaraCh)} />
        <Html h={about} />
        <Connect />
      </main>
      <Footer />
    </>
  );
}
