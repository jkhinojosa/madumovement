const WA   = "https://wa.me/593988219741?text=Hola%20MADU,%20quiero%20información%20sobre%20las%20clases";
const MAPS = "https://maps.app.goo.gl/HiDWPjHNQknCuARd6";

// ── Schedule data (moved from inline <script> → CSP compliant) ────────────
const SCHEDULE = [
  { day:"Lunes",     short:"LU", slots:[{t:"07:00",label:"PK 1",c:"#FF5000"},{t:"09:00",label:"CIRCO",c:"#9333EA"},{t:"15:00",label:"PK 2",c:"#FF5000"},{t:"16:00",label:"PK 3",c:"#FF6A00"},{t:"18:00",label:"DANZA CONTEMP. 2",c:"#DB2777"}]},
  { day:"Martes",    short:"MA", slots:[{t:"09:00",label:"DANZA CONTEMP. 1",c:"#DB2777"},{t:"11:00",label:"TAI CHI",c:"#0891B2"},{t:"16:00",label:"PK 4",c:"#FF5000"},{t:"18:00",label:"PK 5",c:"#FF6A00"}]},
  { day:"Miércoles", short:"MI", slots:[{t:"07:00",label:"PK 1",c:"#FF5000"},{t:"09:00",label:"CIRCO",c:"#9333EA"},{t:"16:00",label:"PK 3",c:"#FF6A00"},{t:"18:00",label:"PK 5",c:"#FF6A00"}]},
  { day:"Jueves",    short:"JU", slots:[{t:"09:00",label:"DANZA CONTEMP. 1",c:"#DB2777"},{t:"11:00",label:"TAI CHI",c:"#0891B2"},{t:"16:00",label:"PK 4",c:"#FF5000"},{t:"18:00",label:"PK 5",c:"#FF6A00"}]},
  { day:"Viernes",   short:"VI", slots:[{t:"07:00",label:"PK 1",c:"#FF5000"},{t:"15:00",label:"PK 2",c:"#FF5000"},{t:"17:00",label:"OPEN GYM",c:"#D97706"},{t:"18:00",label:"DANZA CONTEMP. 2",c:"#DB2777"}]},
  { day:"Sábado",    short:"SÁ", slots:[{t:"10:00",label:"PK 6",c:"#FF5000"}]},
  { day:"Domingo",   short:"DO", slots:[{t:"10:00",label:"PK 6",c:"#FF5000"}]},
];
const grid = document.getElementById("sched-grid");
SCHEDULE.forEach(d => {
  const col = document.createElement("div"); col.className = "day-col";
  col.innerHTML = `<div class="day-head"><span class="day-short">${d.short}</span><span class="day-full">${d.day.slice(0,3).toUpperCase()}</span></div>`;
  d.slots.forEach(s => {
    const pill = document.createElement("div");
    pill.className = "slot";
    pill.style.cssText = `background:${s.c}18;border:1px solid ${s.c}55`;
    pill.innerHTML = `<div class="slot-lbl" style="color:${s.c}">${s.label}</div><div class="slot-time">${s.t}</div>`;
    col.appendChild(pill);
  });
  grid.appendChild(col);
});

// ── Particle canvas ──────────────────────────────────────────
const canvas = document.getElementById("particles");
const ctx    = canvas.getContext("2d");
const resize = () => { canvas.width = innerWidth; canvas.height = innerHeight; };
resize();
window.addEventListener("resize", resize);

const pts = Array.from({ length: 90 }, () => ({
  x: Math.random() * innerWidth,  y: Math.random() * innerHeight,
  vx: (Math.random() - .5) * .4,  vy: -Math.random() * .5 - .1,
  r: Math.random() * 2.5 + .4,    a: Math.random() * .55 + .05,
  c: Math.random() > .65 ? "#FF5000" : "#fff",
}));

(function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  pts.forEach(p => {
    p.x += p.vx; p.y += p.vy;
    if (p.y < -4) p.y = canvas.height + 4;
    if (p.x < -4) p.x = canvas.width  + 4;
    if (p.x > canvas.width + 4) p.x = -4;
    ctx.save(); ctx.globalAlpha = p.a; ctx.fillStyle = p.c;
    ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2); ctx.fill(); ctx.restore();
  });
  requestAnimationFrame(draw);
})();

// ── Hero ready ───────────────────────────────────────────────
setTimeout(() => {
  document.querySelector(".hero-logo").classList.add("ready");
  document.querySelector(".hero-text").classList.add("ready");
}, 80);

// ── Navbar scroll ────────────────────────────────────────────
const nav = document.querySelector("nav");
window.addEventListener("scroll", () => nav.classList.toggle("scrolled", scrollY > 60));

// ── Mobile menu ───────────────────────────────────────────────
document.getElementById("menu-btn").addEventListener("click",  () => document.getElementById("mobile-menu").classList.add("open"));
document.getElementById("menu-close").addEventListener("click",() => document.getElementById("mobile-menu").classList.remove("open"));
document.querySelectorAll(".mobile-menu a").forEach(a => a.addEventListener("click", () => document.getElementById("mobile-menu").classList.remove("open")));

// ── Reveal on scroll ─────────────────────────────────────────
const io = new IntersectionObserver(
  es => es.forEach(e => { if (e.isIntersecting) e.target.classList.add("in"); }),
  { threshold: .08 }
);
document.querySelectorAll(".reveal").forEach(el => io.observe(el));

// ── Lucide icons ─────────────────────────────────────────────
lucide.createIcons();

// ── WA / Maps links ──────────────────────────────────────────
document.querySelectorAll("[data-wa]").forEach(el => el.href = WA);
document.querySelectorAll("[data-maps]").forEach(el => el.href = MAPS);

// ── Hover color handlers (CSP-compliant — replaces inline onmouseenter) ──
document.querySelectorAll("[data-hover-color]").forEach(el => {
  const hover = el.dataset.hoverColor;
  const base  = el.dataset.baseColor || "";
  el.addEventListener("mouseenter", () => el.style.color = hover);
  el.addEventListener("mouseleave", () => el.style.color = base);
});

// ── Lucide icons update for dynamic elements ───────────────
lucide.createIcons();


