/* ============================================================
   RENDER ENGINE — reads window.PORTFOLIO (the files in /data)
   and builds every section. You shouldn't need to edit this to
   add content: edit the files in docs/data/ instead.
   ============================================================ */
(function () {
  const P = window.PORTFOLIO || {};
  const profile = P.profile || {};
  const I = window.ICONS || {};
  const $ = (sel, root = document) => root.querySelector(sel);

  const esc = (v) =>
    String(v ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const slug = (v) => String(v).toLowerCase().normalize("NFD").replace(/[^\w]+/g, "-").replace(/^-|-$/g, "");
  const ext = (url) => /^https?:/.test(url) ? ' target="_blank" rel="noopener"' : "";

  /* ---------- Simple text bindings ---------- */
  const words = (profile.name || "").split(/\s+/).filter(Boolean);
  const cut = Math.ceil(words.length / 2);
  const binds = {
    ...profile,
    firstName: words.slice(0, cut).join(" "),
    lastName: words.slice(cut).join(" ")
  };
  document.querySelectorAll("[data-bind]").forEach((el) => {
    const v = binds[el.dataset.bind];
    if (v) el.textContent = v;
  });
  if (profile.name) document.title = `${profile.shortName || profile.name} · ${profile.role || "Portfolio"}`;

  if (profile.resume) {
    const r = $("#resumeBtn");
    r.href = profile.resume;
    r.hidden = false;
  }

  /* ---------- Avatar ---------- */
  const avatar = $("#avatar");
  if (avatar) {
    avatar.innerHTML = profile.avatar
      ? `<img src="${esc(profile.avatar)}" alt="${esc(profile.name)}" />`
      : `<svg viewBox="0 0 200 200" role="img" aria-label="${esc(profile.name)} avatar">
          <defs>
            <radialGradient id="visor" cx="35%" cy="30%" r="80%">
              <stop offset="0" stop-color="#4fd1c5" stop-opacity=".9"/>
              <stop offset=".45" stop-color="#3b2d7a"/>
              <stop offset="1" stop-color="#0a0820"/>
            </radialGradient>
            <linearGradient id="shell" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0" stop-color="#f3f1ff"/><stop offset="1" stop-color="#9aa0c3"/>
            </linearGradient>
          </defs>
          <circle cx="100" cy="100" r="86" fill="url(#shell)"/>
          <rect x="34" y="58" width="132" height="92" rx="46" fill="url(#visor)"/>
          <path d="M58 78 Q78 64 104 66" stroke="#fff" stroke-opacity=".55" stroke-width="6" fill="none" stroke-linecap="round"/>
          <text x="100" y="118" text-anchor="middle" font-family="Space Grotesk, sans-serif" font-weight="700" font-size="40" fill="#ffb547" letter-spacing="2">${esc(profile.initials || "")}</text>
          <circle cx="100" cy="170" r="6" fill="#ffb547"/>
        </svg>`;
  }

  /* ---------- Orbit labels (first skill categories) ---------- */
  document.querySelectorAll("[data-orbit-label]").forEach((el) => {
    const cat = (P.skills || [])[+el.dataset.orbitLabel];
    if (cat) el.dataset.label = cat.category;
  });

  /* ---------- Stats (computed from data) ---------- */
  const projects = P.projects || [];
  const skillCount = (P.skills || []).reduce((n, c) => n + (c.items || []).length, 0);
  const stats = [
    [projects.length, "missions shipped"],
    [projects.filter((p) => p.links && p.links.demo).length, "live demos"],
    [skillCount, "tools & topics"],
    [(P.certifications || []).length, "certifications"]
  ].filter(([n]) => n > 0);
  $("#stats").innerHTML = stats
    .map(([n, l]) => `<div><dt class="mono" data-count="${n}">0</dt><dd>${esc(l)}</dd></div>`)
    .join("");

  /* ---------- About ---------- */
  $("#aboutText").innerHTML = (profile.about || []).map((p) => `<p>${esc(p)}</p>`).join("");
  $("#interests").innerHTML = (profile.interests || [])
    .map(
      (i) => `<li class="interest interest--${esc(i.icon)}">
        <span class="interest__icon">${I[i.icon] || I.spark}</span>
        <div><strong>${esc(i.title)}</strong><span>${esc(i.text)}</span></div>
      </li>`
    )
    .join("");

  /* ---------- Skills ---------- */
  const skillIcon = (s) =>
    s.icon
      ? `<img src="https://cdn.jsdelivr.net/gh/devicons/devicon@v2.16.0/icons/${esc(s.icon)}.svg" alt="" loading="lazy" width="22" height="22" onerror="this.replaceWith(Object.assign(document.createElement('b'),{textContent:'${esc(s.name).charAt(0)}'}))" />`
      : `<b>${esc(s.name.charAt(0))}</b>`;

  $("#skillsGrid").innerHTML = (P.skills || [])
    .map(
      (c, ci) => `<article class="constellation reveal" style="--d:${ci * 80}ms">
        <header>
          <span class="constellation__id mono">C-${String(ci + 1).padStart(2, "0")}</span>
          <h3>${esc(c.category)}</h3>
          ${c.description ? `<p>${esc(c.description)}</p>` : ""}
        </header>
        <svg class="constellation__lines" aria-hidden="true"></svg>
        <ul>${(c.items || [])
          .map(
            (s) => `<li class="star-skill" data-level="${esc(s.level || "core")}">
              <span class="star-skill__icon">${skillIcon(s)}</span>${esc(s.name)}
            </li>`
          )
          .join("")}</ul>
      </article>`
    )
    .join("");

  /* ---------- Projects ---------- */
  const total = projects.length;
  const linkBtn = (url, label, icon) =>
    url ? `<a class="chip-link" href="${esc(url)}"${ext(url)}>${I[icon] || ""}<span>${label}</span></a>` : "";

  $("#missionsGrid").innerHTML = projects
    .map((p, i) => {
      const l = p.links || {};
      return `<article class="mission reveal${p.featured ? " mission--featured" : ""}" data-cat="${esc(slug(p.category || "other"))}" style="--d:${(i % 3) * 80}ms">
        <div class="mission__glow" aria-hidden="true"></div>
        <header class="mission__head mono">
          <span>MISSION ${String(total - i).padStart(2, "0")}</span>
          <span>${esc(p.category || "")}${p.year ? " · " + esc(p.year) : ""}</span>
        </header>
        <h3>${esc(p.title)}</h3>
        <p class="mission__summary">${esc(p.summary)}</p>
        ${p.metric ? `<div class="metric"><strong>${esc(p.metric.value)}</strong><span>${esc(p.metric.label)}</span></div>` : ""}
        ${p.highlights && p.highlights.length ? `<ul class="mission__list">${p.highlights.map((h) => `<li>${esc(h)}</li>`).join("")}</ul>` : ""}
        <ul class="stack mono">${(p.stack || []).map((t) => `<li>${esc(t)}</li>`).join("")}</ul>
        <footer class="mission__links">
          ${linkBtn(l.repo, "Code", "github")}
          ${linkBtn(l.demo, "Live demo", "play")}
          ${linkBtn(l.article, "Read more", "book")}
        </footer>
      </article>`;
    })
    .join("");

  const cats = [...new Set(projects.map((p) => p.category || "Other"))];
  const filters = $("#filters");
  if (cats.length > 1) {
    filters.innerHTML = ["All", ...cats]
      .map(
        (c, i) => `<button class="filter mono" role="tab" aria-selected="${i === 0}" data-filter="${i === 0 ? "*" : esc(slug(c))}">${esc(c)}<sup>${
          i === 0 ? projects.length : projects.filter((p) => (p.category || "Other") === c).length
        }</sup></button>`
      )
      .join("");
    filters.addEventListener("click", (e) => {
      const b = e.target.closest(".filter");
      if (!b) return;
      filters.querySelectorAll(".filter").forEach((x) => x.setAttribute("aria-selected", x === b));
      const f = b.dataset.filter;
      document.querySelectorAll(".mission").forEach((m) => {
        m.classList.toggle("is-hidden", f !== "*" && m.dataset.cat !== f);
      });
    });
  } else filters.remove();

  const gh = (profile.social || []).find((s) => s.icon === "github");
  if (gh) $("#allRepos").href = gh.url + "?tab=repositories";
  else $("#allRepos").remove();

  /* ---------- Journey ---------- */
  const statusLabel = { done: "completed", now: "in orbit", next: "next stop" };
  const typeIcon = { education: "edu", experience: "work", learning: "rocket" };
  $("#journeyList").innerHTML = (P.journey || [])
    .map(
      (j) => `<li class="stop stop--${esc(j.status || "done")} reveal">
        <span class="stop__node" aria-hidden="true"></span>
        <div class="stop__card">
          <p class="stop__meta mono"><span class="badge badge--${esc(j.status || "done")}">${esc(statusLabel[j.status] || j.status || "")}</span> ${esc(j.period || "")}</p>
          <h3><span class="stop__icon">${I[typeIcon[j.type]] || I.spark}</span>${esc(j.title)}</h3>
          ${j.place ? `<p class="stop__place">${esc(j.place)}</p>` : ""}
          ${j.text ? `<p>${esc(j.text)}</p>` : ""}
          ${j.tags ? `<ul class="stack mono">${j.tags.map((t) => `<li>${esc(t)}</li>`).join("")}</ul>` : ""}
        </div>
      </li>`
    )
    .join("");

  /* ---------- Certifications ---------- */
  $("#certsGrid").innerHTML = (P.certifications || [])
    .map((c, i) => {
      const initials = (c.issuer || "?").split(/\s+/).map((w) => w[0]).join("").slice(0, 2).toUpperCase();
      const tag = c.url ? "a" : "div";
      return `<${tag} class="patch reveal" style="--d:${(i % 4) * 60}ms"${c.url ? ` href="${esc(c.url)}"${ext(c.url) || ' target="_blank" rel="noopener"'}` : ""}>
        <span class="patch__badge mono">${esc(initials)}</span>
        <span class="patch__body">
          <strong>${esc(c.title)}</strong>
          <span class="mono">${esc(c.issuer)}${c.kind ? " · " + esc(c.kind) : ""}</span>
        </span>
        <span class="patch__year mono">${esc(c.year || "")}</span>
      </${tag}>`;
    })
    .join("");

  /* ---------- Contact ---------- */
  $("#socials").innerHTML = (profile.social || [])
    .map(
      (s) => `<a class="social" href="${esc(s.url)}"${ext(s.url)}>
        <span class="social__icon">${I[s.icon] || I.external}</span>
        <span><strong>${esc(s.label)}</strong><small class="mono">${esc(s.url.replace(/^(https?:\/\/(www\.)?|mailto:)/, "").replace(/\/$/, ""))}</small></span>
        <span class="social__arrow">→</span>
      </a>`
    )
    .join("");

  $("#year").textContent = new Date().getFullYear();
})();
