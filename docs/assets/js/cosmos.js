/* ============================================================
   COSMOS — animated starfield background.
   Stars near the cursor link up like a neural network.
   Respects prefers-reduced-motion and pauses when the tab is hidden.
   ============================================================ */
(function () {
  const canvas = document.getElementById("cosmos");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  let w = 0, h = 0, dpr = 1, stars = [], shooting = [], mode = "space";
  const pointer = { x: -9999, y: -9999, tx: -9999, ty: -9999 };
  let scroll = window.scrollY, nextShot = performance.now() + 2500;

  const palette = ["255,255,255", "255,255,255", "255,255,255", "79,209,197", "255,181,71", "170,160,255"];

  function resize() {
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    w = window.innerWidth;
    h = window.innerHeight;
    canvas.width = w * dpr;
    canvas.height = h * dpr;
    canvas.style.width = w + "px";
    canvas.style.height = h + "px";
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    const n = Math.min(380, Math.round((w * h) / 3800));
    stars = Array.from({ length: n }, () => ({
      x: Math.random() * w,
      y: Math.random() * h * 1.6,
      z: Math.random() * 0.85 + 0.15,
      r: Math.random() * 1.3 + 0.25,
      p: Math.random() * Math.PI * 2,
      c: palette[(Math.random() * palette.length) | 0],
      vx: (Math.random() - 0.5) * 0.25,
      vy: (Math.random() - 0.5) * 0.25
    }));
    if (reduce) draw(performance.now());
  }

  function spawnShot() {
    const fromLeft = Math.random() > 0.5;
    shooting.push({
      x: fromLeft ? Math.random() * w * 0.5 : w * 0.5 + Math.random() * w * 0.5,
      y: Math.random() * h * 0.4,
      vx: (fromLeft ? 1 : -1) * (7 + Math.random() * 5),
      vy: 3 + Math.random() * 2.5,
      life: 1
    });
  }

  function draw(t) {
    ctx.clearRect(0, 0, w, h);
    pointer.x += (pointer.tx - pointer.x) * 0.12;
    pointer.y += (pointer.ty - pointer.y) * 0.12;
    const farm = mode === "farm";
    const span = h * 1.6;
    const near = [];

    for (const s of stars) {
      if (farm) {
        s.x += s.vx + Math.sin(t / 900 + s.p) * 0.3;
        s.y += s.vy + Math.cos(t / 1100 + s.p) * 0.3;
        if (s.x < 0) s.x += w; if (s.x > w) s.x -= w;
      }
      // parallax: deeper stars move less with scroll
      let y = (s.y - scroll * s.z * 0.18) % span;
      if (y < 0) y += span;
      if (y > h + 4) continue;
      const x = s.x + (pointer.x > -999 ? (pointer.x - w / 2) * s.z * -0.012 : 0);
      const tw = reduce ? 1 : 0.55 + 0.45 * Math.sin(t / 700 * (0.6 + s.z) + s.p);
      const color = farm ? (s.z > 0.5 ? "214,255,120" : "255,214,102") : s.c;
      const r = farm ? s.r * 1.6 : s.r * (0.6 + s.z * 0.8);
      ctx.beginPath();
      ctx.fillStyle = `rgba(${color},${(farm ? 0.85 : 0.35 + 0.65 * s.z) * tw})`;
      ctx.arc(x, y, r, 0, Math.PI * 2);
      ctx.fill();
      if (farm || (s.z > 0.85 && s.r > 1.2)) {
        ctx.beginPath();
        ctx.fillStyle = `rgba(${color},${0.08 * tw})`;
        ctx.arc(x, y, r * 5, 0, Math.PI * 2);
        ctx.fill();
      }
      if (!farm && s.z > 0.4) {
        const dx = x - pointer.x, dy = y - pointer.y;
        if (dx * dx + dy * dy < 170 * 170) near.push([x, y]);
      }
    }

    // neural-network constellation around the cursor
    if (near.length) {
      ctx.lineWidth = 0.7;
      for (let i = 0; i < near.length; i++) {
        const [ax, ay] = near[i];
        const dp = Math.hypot(ax - pointer.x, ay - pointer.y);
        ctx.strokeStyle = `rgba(79,209,197,${0.35 * (1 - dp / 170)})`;
        ctx.beginPath(); ctx.moveTo(ax, ay); ctx.lineTo(pointer.x, pointer.y); ctx.stroke();
        for (let j = i + 1; j < near.length; j++) {
          const [bx, by] = near[j];
          const d = Math.hypot(ax - bx, ay - by);
          if (d < 95) {
            ctx.strokeStyle = `rgba(255,181,71,${0.28 * (1 - d / 95)})`;
            ctx.beginPath(); ctx.moveTo(ax, ay); ctx.lineTo(bx, by); ctx.stroke();
          }
        }
      }
      ctx.fillStyle = "rgba(255,181,71,.9)";
      ctx.beginPath(); ctx.arc(pointer.x, pointer.y, 2.2, 0, Math.PI * 2); ctx.fill();
    }

    // shooting stars
    if (!reduce && !farm && t > nextShot) {
      spawnShot();
      nextShot = t + 3500 + Math.random() * 5000;
    }
    shooting = shooting.filter((s) => s.life > 0);
    for (const s of shooting) {
      const g = ctx.createLinearGradient(s.x, s.y, s.x - s.vx * 12, s.y - s.vy * 12);
      g.addColorStop(0, `rgba(255,255,255,${s.life})`);
      g.addColorStop(1, "rgba(255,255,255,0)");
      ctx.strokeStyle = g;
      ctx.lineWidth = 1.6;
      ctx.beginPath(); ctx.moveTo(s.x, s.y); ctx.lineTo(s.x - s.vx * 12, s.y - s.vy * 12); ctx.stroke();
      s.x += s.vx; s.y += s.vy; s.life -= 0.016;
    }
  }

  let raf = 0;
  function loop(t) {
    draw(t);
    raf = requestAnimationFrame(loop);
  }

  window.addEventListener("resize", resize);
  window.addEventListener("scroll", () => { scroll = window.scrollY; if (reduce) draw(performance.now()); }, { passive: true });
  window.addEventListener("pointermove", (e) => {
    if (e.pointerType === "touch") return;
    pointer.tx = e.clientX; pointer.ty = e.clientY;
    if (pointer.x < -999) { pointer.x = e.clientX; pointer.y = e.clientY; }
  }, { passive: true });
  document.addEventListener("pointerleave", () => { pointer.tx = pointer.ty = pointer.x = pointer.y = -9999; });
  document.addEventListener("visibilitychange", () => {
    if (reduce) return;
    cancelAnimationFrame(raf);
    if (!document.hidden) raf = requestAnimationFrame(loop);
  });

  resize();
  if (!reduce) raf = requestAnimationFrame(loop);

  window.COSMOS = {
    setMode(m) { mode = m; if (reduce) draw(performance.now()); },
    get mode() { return mode; }
  };
})();
