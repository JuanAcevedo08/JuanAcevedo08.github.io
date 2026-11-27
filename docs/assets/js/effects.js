/* ============================================================
   EFFECTS — reveals, counters, clock, nav, spotlight, easter eggs.
   ============================================================ */
(function () {
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const profile = (window.PORTFOLIO || {}).profile || {};
  const root = document.documentElement;

  /* ---- Reveal on scroll ---- */
  const io = new IntersectionObserver(
    (entries) => entries.forEach((e) => {
      if (e.isIntersecting) { e.target.classList.add("is-in"); io.unobserve(e.target); }
    }),
    { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
  );
  document.querySelectorAll(".reveal").forEach((el) => io.observe(el));

  /* ---- Count-up stats ---- */
  const countIO = new IntersectionObserver((entries) => entries.forEach((e) => {
    if (!e.isIntersecting) return;
    countIO.unobserve(e.target);
    const end = +e.target.dataset.count;
    if (reduce) { e.target.textContent = end; return; }
    const t0 = performance.now();
    const tick = (t) => {
      const k = Math.min(1, (t - t0) / 1200);
      e.target.textContent = Math.round(end * (1 - Math.pow(1 - k, 3)));
      if (k < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }));
  document.querySelectorAll("[data-count]").forEach((el) => countIO.observe(el));

  /* ---- Typed role ---- */
  const typed = document.getElementById("typed");
  if (typed && !reduce) {
    const full = typed.textContent;
    typed.textContent = "";
    let i = 0;
    setTimeout(function type() {
      typed.textContent = full.slice(0, ++i);
      if (i < full.length) setTimeout(type, 55 + Math.random() * 60);
    }, 500);
  }

  /* ---- Local clock ---- */
  const clock = document.getElementById("clock");
  const tz = profile.timezone || undefined;
  const fmt = new Intl.DateTimeFormat("en-GB", { hour: "2-digit", minute: "2-digit", timeZone: tz });
  const city = (tz || "").split("/").pop().replace(/_/g, " ");
  const updateClock = () => { if (clock) clock.textContent = `${city ? city + " · " : ""}${fmt.format(new Date())}`; };
  updateClock();
  setInterval(updateClock, 30000);

  /* ---- Mobile nav ---- */
  const nav = document.querySelector(".nav");
  const toggle = document.querySelector(".nav__toggle");
  toggle.addEventListener("click", () => {
    const open = nav.classList.toggle("is-open");
    toggle.setAttribute("aria-expanded", open);
  });
  nav.querySelectorAll(".nav__links a").forEach((a) => a.addEventListener("click", () => {
    nav.classList.remove("is-open");
    toggle.setAttribute("aria-expanded", false);
  }));

  /* ---- Active link + scroll progress + sky shift ---- */
  const links = [...nav.querySelectorAll(".nav__links a")];
  const sections = links.map((a) => document.querySelector(a.getAttribute("href"))).filter(Boolean);
  let ticking = false;
  function onScroll() {
    const max = document.documentElement.scrollHeight - innerHeight;
    const p = max > 0 ? scrollY / max : 0;
    root.style.setProperty("--p", p.toFixed(4));
    nav.classList.toggle("is-scrolled", scrollY > 30);
    let current = null;
    for (const s of sections) if (s.getBoundingClientRect().top < innerHeight * 0.4) current = s;
    links.forEach((a) => a.classList.toggle("is-active", current && a.getAttribute("href") === "#" + current.id));
    ticking = false;
  }
  addEventListener("scroll", () => { if (!ticking) { ticking = true; requestAnimationFrame(onScroll); } }, { passive: true });
  onScroll();

  /* ---- Spotlight that follows the cursor on cards ---- */
  document.addEventListener("pointermove", (e) => {
    const card = e.target.closest(".mission, .constellation, .patch, .social, .stop__card");
    if (!card) return;
    const r = card.getBoundingClientRect();
    card.style.setProperty("--mx", `${e.clientX - r.left}px`);
    card.style.setProperty("--my", `${e.clientY - r.top}px`);
  }, { passive: true });

  /* ---- Constellation lines between skills ---- */
  function drawConstellations() {
    document.querySelectorAll(".constellation").forEach((card) => {
      const svg = card.querySelector(".constellation__lines");
      const icons = [...card.querySelectorAll(".star-skill__icon")];
      const cr = card.getBoundingClientRect();
      svg.setAttribute("viewBox", `0 0 ${cr.width} ${cr.height}`);
      const pts = icons.map((i) => {
        const r = i.getBoundingClientRect();
        return [r.left - cr.left + r.width / 2, r.top - cr.top + r.height / 2];
      });
      svg.innerHTML = pts.length > 1
        ? `<polyline points="${pts.map((p) => p.join(",")).join(" ")}" pathLength="1" />`
        : "";
    });
  }
  addEventListener("load", drawConstellations);
  addEventListener("resize", () => requestAnimationFrame(drawConstellations));
  setTimeout(drawConstellations, 300);

  /* ---- Toast ---- */
  const toastEl = document.getElementById("toast");
  let toastTimer;
  function toast(msg) {
    toastEl.textContent = msg;
    toastEl.classList.add("is-on");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toastEl.classList.remove("is-on"), 3200);
  }

  /* ---- Easter eggs: type "moto" or "farm" (or the Konami code) ---- */
  function rideMoto() {
    const m = document.createElement("div");
    m.className = "moto-run";
    m.innerHTML = '<svg viewBox="0 0 120 60" width="150" height="75"><use href="#moto-shape"/></svg><span class="moto-run__trail"></span>';
    document.body.appendChild(m);
    toast("vroom · off-duty mode: two wheels, open road");
    setTimeout(() => m.remove(), 2600);
  }
  function farmMode() {
    if (!window.COSMOS) return;
    const on = window.COSMOS.mode !== "farm";
    window.COSMOS.setMode(on ? "farm" : "space");
    document.body.classList.toggle("farm-mode", on);
    toast(on ? "farm mode · the stars became fireflies over the fields" : "back to deep space");
  }

  let buffer = "";
  const konami = "ArrowUpArrowUpArrowDownArrowDownArrowLeftArrowRightArrowLeftArrowRightba";
  let kbuf = "";
  addEventListener("keydown", (e) => {
    if (e.target.closest("input, textarea, [contenteditable]")) return;
    kbuf = (kbuf + e.key).slice(-konami.length);
    if (kbuf === konami) { rideMoto(); farmMode(); kbuf = ""; }
    if (e.key.length !== 1) return;
    buffer = (buffer + e.key.toLowerCase()).slice(-8);
    if (buffer.endsWith("moto")) { rideMoto(); buffer = ""; }
    if (buffer.endsWith("farm")) { farmMode(); buffer = ""; }
  });
  // touch-friendly: tap the footer rider to trigger it too
  const rider = document.querySelector(".rider");
  if (rider) { rider.style.pointerEvents = "auto"; rider.addEventListener("click", rideMoto); }
  document.querySelectorAll(".hint kbd").forEach((k) =>
    k.addEventListener("click", () => (k.textContent === "moto" ? rideMoto() : farmMode()))
  );

  /* ---- A message for curious devs ---- */
  console.log(
    "%c🚀 Hey, curious engineer!%c\nThis portfolio is data-driven: every section is rendered from /data/*.js.\nCode: https://github.com/JuanAcevedo08",
    "font:700 16px 'Space Grotesk',sans-serif;color:#ffb547",
    "color:#4fd1c5"
  );
})();
