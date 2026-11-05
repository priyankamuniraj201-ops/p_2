// Ported from the original site's inline script: starfield, scroll reveal, product dropdown.
export function initPortfolioEffects(): () => void {
  const cleanups: Array<() => void> = [];

  const c = document.getElementById("stars") as HTMLCanvasElement | null;
  if (c && getComputedStyle(c).display !== "none") {
    const ctx = c.getContext("2d")!;
    type Star = { x: number; y: number; r: number; s: number; a: number; da: number };
    let stars: Star[] = [];
    let w = 0, h = 0, raf = 0;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const resize = () => {
      w = c.width = innerWidth * dpr; h = c.height = innerHeight * dpr;
      c.style.width = innerWidth + "px"; c.style.height = innerHeight + "px";
      const n = Math.floor((innerWidth * innerHeight) / 5200);
      stars = Array.from({ length: n }, () => ({
        x: Math.random() * w, y: Math.random() * h,
        r: (Math.random() * 1.3 + 0.3) * dpr, s: Math.random() * 0.25 + 0.05,
        a: Math.random(), da: (Math.random() * 0.012 + 0.003) * (Math.random() < 0.5 ? -1 : 1),
      }));
    };
    const frame = () => {
      ctx.clearRect(0, 0, w, h);
      for (const s of stars) {
        s.a += s.da; if (s.a <= 0.05 || s.a >= 1) s.da *= -1;
        s.y += s.s * dpr * 0.4; if (s.y > h) { s.y = 0; s.x = Math.random() * w; }
        ctx.globalAlpha = 0.25 + s.a * 0.6;
        ctx.beginPath(); ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fillStyle = "#e9ffe0"; ctx.fill();
      }
      raf = requestAnimationFrame(frame);
    };
    resize(); addEventListener("resize", resize);
    if (!matchMedia("(prefers-reduced-motion: reduce)").matches) frame();
    else {
      ctx.globalAlpha = 0.5;
      stars.forEach((s) => { ctx.beginPath(); ctx.arc(s.x, s.y, s.r, 0, 6.283); ctx.fillStyle = "#e9ffe0"; ctx.fill(); });
    }
    cleanups.push(() => { removeEventListener("resize", resize); cancelAnimationFrame(raf); });
  }

  const els = document.querySelectorAll(".reveal");
  const io = new IntersectionObserver((entries) => {
    entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } });
  }, { threshold: 0.12 });
  els.forEach((el) => io.observe(el));
  cleanups.push(() => io.disconnect());

  // Numbers count up the first time they scroll into view. The HTML keeps the final value.
  const counters = document.querySelectorAll<HTMLElement>("[data-count]");
  if (!matchMedia("(prefers-reduced-motion: reduce)").matches) {
    const rafs = new Set<number>();
    const countIo = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (!e.isIntersecting) return;
        countIo.unobserve(e.target);
        const el = e.target as HTMLElement;
        const end = Number(el.dataset["count"]), suffix = el.dataset["suffix"] ?? "";
        el.textContent = end + suffix;
        el.style.minWidth = `${el.getBoundingClientRect().width}px`; // no text reflow while counting
        const start = performance.now();
        const step = (now: number) => {
          const t = Math.min(1, (now - start) / 1600);
          el.textContent = Math.round(end * (1 - Math.pow(1 - t, 3))) + suffix;
          if (t < 1) rafs.add(requestAnimationFrame(step));
          else el.style.minWidth = "";
        };
        rafs.add(requestAnimationFrame(step));
      });
    }, { threshold: 0.8 });
    counters.forEach((el) => {
      el.textContent = `0${el.dataset["suffix"] ?? ""}`;
      countIo.observe(el);
    });
    cleanups.push(() => { countIo.disconnect(); rafs.forEach(cancelAnimationFrame); });
  }

  const toggle = document.getElementById("product-toggle");
  const panel = document.getElementById("product-work") as HTMLElement | null;
  const arrow = document.getElementById("product-arrow");
  if (toggle && panel && arrow) {
    const setOpen = (open: boolean) => {
      panel.style.height = `${panel.getBoundingClientRect().height}px`;
      void panel.offsetHeight;
      panel.classList.toggle("open", open);
      panel.inert = !open;
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
      arrow.textContent = open ? "↑" : "↓";
      panel.style.height = open ? `${panel.scrollHeight}px` : "0px";
    };
    const onEnd = (e: TransitionEvent) => {
      if (e.target === panel && e.propertyName === "height" && panel.classList.contains("open")) panel.style.height = "auto";
    };
    const onClick = (e: Event) => { e.preventDefault(); setOpen(!panel.classList.contains("open")); };
    panel.addEventListener("transitionend", onEnd);
    toggle.addEventListener("click", onClick);
    setOpen(location.hash === "#product-work");
    cleanups.push(() => { panel.removeEventListener("transitionend", onEnd); toggle.removeEventListener("click", onClick); });
  }

  return () => cleanups.forEach((f) => f());
}
