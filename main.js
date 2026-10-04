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

// ══════════════════════════════════════════════════════════════════════════════
// ── INSTAGRAM INTEGRATION ────────────────────────────────────────────────────
// ══════════════════════════════════════════════════════════════════════════════

// ── Instagram Reels Embed Configuration ──────────────────────────────────────
// INSTRUCCIONES: Reemplaza los URLs de abajo con los URLs reales de tus Reels.
// Cada URL debe ser un permalink público de Instagram (post o reel).
// Cuando configures URLs reales, los placeholders se reemplazan automáticamente.
const IG_REELS = [
  "https://www.instagram.com/reel/DdxmBQquYiJ/",
  "https://www.instagram.com/reel/DdxWZyEJwN9/",
  "https://www.instagram.com/reel/Ddty3r6u84m/",
];

// Inyectar embeds reales si hay URLs configurados
if (IG_REELS.length > 0) {
  const reelsGrid = document.getElementById("ig-reels-grid");
  if (reelsGrid) {
    // Limpiar placeholders
    reelsGrid.innerHTML = "";
    IG_REELS.forEach(url => {
      const wrapper = document.createElement("div");
      wrapper.className = "ig-embed-wrapper";
      wrapper.innerHTML = `
        <blockquote class="instagram-media"
          data-instgrm-permalink="${url}"
          data-instgrm-version="14">
        </blockquote>`;
      reelsGrid.appendChild(wrapper);
    });
    // Re-procesar embeds de Instagram
    if (window.instgrm && window.instgrm.Embeds) {
      window.instgrm.Embeds.process();
    }
  }
}

// ── Elfsight Feed: auto-ocultar placeholder cuando el widget renderiza ───
// Elfsight inyecta un iframe dentro del div .elfsight-app-*. Cuando eso ocurre,
// ocultamos el placeholder con las instrucciones de activación.
(function watchElfsight() {
  const placeholder = document.getElementById("ig-feed-placeholder");
  if (!placeholder) return;

  const observer = new MutationObserver((mutations) => {
    for (const m of mutations) {
      for (const node of m.addedNodes) {
        // Elfsight inyecta un div o iframe cuando el widget carga correctamente
        if (node.nodeType === 1 && (node.tagName === "IFRAME" || node.classList?.contains("elfsight-app-rendered"))) {
          placeholder.style.display = "none";
          observer.disconnect();
          return;
        }
      }
    }
  });
  // Observar el contenedor padre del placeholder
  const feedWidget = placeholder.closest(".ig-feed-widget");
  if (feedWidget) {
    observer.observe(feedWidget, { childList: true, subtree: true });
  }
})();

// ══════════════════════════════════════════════════════════════════════════════
// ── COOKIE CONSENT + META PIXEL (LOPDP Ecuador) ─────────────────────────────
// ══════════════════════════════════════════════════════════════════════════════
// El Meta Pixel SOLO se carga si el usuario acepta explícitamente.
// Si rechaza, no se carga ningún script de tracking.
// La decisión se guarda en localStorage para no preguntar de nuevo.

const COOKIE_KEY = "madu_cookie_consent";
const cookieBanner = document.getElementById("cookie-banner");
const cookieAccept = document.getElementById("cookie-accept");
const cookieReject = document.getElementById("cookie-reject");

/**
 * Carga el Meta Pixel de forma dinámica.
 * ═══════════════════════════════════════════════════════════════
 * INSTRUCCIONES:
 *   1. Ve a https://business.facebook.com → Events Manager
 *   2. Crea un Pixel y copia tu PIXEL_ID
 *   3. Reemplaza 'TU_PIXEL_ID_AQUI' con tu ID real
 * ═══════════════════════════════════════════════════════════════
 */
function loadMetaPixel() {
  const PIXEL_ID = "TU_PIXEL_ID_AQUI";
  if (PIXEL_ID === "TU_PIXEL_ID_AQUI") {
    console.info("[MADU] Meta Pixel: Consentimiento aceptado pero PIXEL_ID no configurado. Edita main.js → loadMetaPixel().");
    return;
  }

  // Carga fbevents.js dinámicamente (no en el HTML, solo si hay consentimiento)
  !function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){
  n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};
  if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
  n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;
  s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}
  (window,document,'script','https://connect.facebook.net/en_US/fbevents.js');

  fbq('init', PIXEL_ID);
  fbq('track', 'PageView');

  // Eventos de conversión MADU
  document.querySelectorAll("[data-wa]").forEach(el => {
    el.addEventListener("click", () => {
      if (window.fbq) {
        // Distinguir entre CTA principal y otros links de WhatsApp
        const isLeadBtn = el.classList.contains("btn-primary") || el.textContent.includes("CLASE DE PRUEBA");
        fbq('track', isLeadBtn ? 'Lead' : 'Contact', {
          content_name: isLeadBtn ? 'Clase de Prueba Gratis' : 'WhatsApp Contact',
          content_category: 'MADU Parkour'
        });
      }
    });
  });

  // Track clicks en RESERVAR
  document.querySelectorAll(".class-cta").forEach(el => {
    el.addEventListener("click", () => {
      if (window.fbq) {
        fbq('track', 'Schedule', {
          content_name: el.closest(".class-card")?.querySelector(".class-name")?.textContent || 'Clase',
          content_category: 'Reserva'
        });
      }
    });
  });

  console.info("[MADU] Meta Pixel cargado correctamente (ID: " + PIXEL_ID + ")");
}

// Gestión del banner de consentimiento
function handleCookieConsent() {
  const stored = localStorage.getItem(COOKIE_KEY);

  if (stored === "accepted") {
    loadMetaPixel();
    if (cookieBanner) cookieBanner.classList.add("hidden");
    return;
  }
  if (stored === "rejected") {
    if (cookieBanner) cookieBanner.classList.add("hidden");
    return;
  }

  // Primera visita: mostrar banner (se anima con CSS)
  if (cookieAccept) {
    cookieAccept.addEventListener("click", () => {
      localStorage.setItem(COOKIE_KEY, "accepted");
      cookieBanner.classList.add("hidden");
      loadMetaPixel();
    });
  }
  if (cookieReject) {
    cookieReject.addEventListener("click", () => {
      localStorage.setItem(COOKIE_KEY, "rejected");
      cookieBanner.classList.add("hidden");
    });
  }
}

handleCookieConsent();

