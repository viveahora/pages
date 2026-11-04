/*
  Dezente Animationen (freigegeben 04.11.2026)
  Die Klasse «anim» auf <html> setzt das kleine Skript im <head>.
  Wer «Bewegung reduzieren» eingestellt hat, sieht keine Animationen.
*/
(function () {
  "use strict";
  var root = document.documentElement;
  if (!root.classList.contains("anim")) return;

  var io = "IntersectionObserver" in window;
  function once(el, fn, margin) {
    if (!el) return;
    if (!io) { fn(); return; }
    var ob = new IntersectionObserver(function (en) {
      if (en[0].isIntersecting) { ob.disconnect(); fn(); }
    }, { rootMargin: margin || "0px 0px -15% 0px" });
    ob.observe(el);
  }
  function ease(t) { return 1 - Math.pow(1 - t, 3); }
  function tween(ms, step) {
    var t0 = null;
    function f(ts) { if (t0 === null) t0 = ts; var p = Math.min((ts - t0) / ms, 1); step(ease(p)); if (p < 1) requestAnimationFrame(f); }
    requestAnimationFrame(f);
  }

  /* 1) Karten pro Section gestaffelt einblenden */
  document.querySelectorAll(".cards-3, .sports-grid, .next-grid, .team-grid, .story-grid").forEach(function (grid) {
    var items = grid.querySelectorAll(":scope > .reveal");
    items.forEach(function (el, i) { el.style.transitionDelay = (i * 130) + "ms"; });
  });

  /* 2) Zahlen zählen hoch: Kennzahlen bei den Resultaten */
  var kpis = document.querySelector(".kpis");
  if (kpis) kpis.querySelectorAll(".kpi-num").forEach(function (el) { el.setAttribute("data-target", el.textContent); el.textContent = "0"; });
  once(kpis, function () {
    kpis.querySelectorAll(".kpi-num").forEach(function (el) {
      var target = parseInt(el.textContent !== "0" ? el.textContent : el.getAttribute("data-target"), 10);
      if (isNaN(target)) return;
      tween(1300, function (p) { el.textContent = Math.round(target * p); });
    });
  });

  /* 3) Bestzeit läuft hoch wie eine Stoppuhr */
  var pb = document.querySelector(".stat-num");
  if (pb) {
    var m = pb.textContent.trim().match(/^(\d+):(\d{2})\.(\d{2})$/);
    if (m) {
      var final = pb.textContent, cs = (+m[1] * 60 + +m[2]) * 100 + +m[3];
      pb.style.fontVariantNumeric = "tabular-nums";
      pb.textContent = "0:00.00";
      once(pb, function () {
        tween(1400, function (p) {
          var v = Math.round(cs * p), mm = Math.floor(v / 6000), ss = Math.floor(v / 100) % 60, cc = v % 100;
          pb.textContent = p >= 1 ? final : mm + ":" + (ss < 10 ? "0" : "") + ss + "." + (cc < 10 ? "0" : "") + cc;
        });
      }, "0px");
    }
  }

  /* 4) Leichter Tiefeneffekt: Hero-Bild bewegt sich langsamer (nur Desktop) */
  var bg = document.querySelector(".hero-bg");
  if (bg && window.matchMedia("(min-width: 761px)").matches) {
    var ticking = false;
    window.addEventListener("scroll", function () {
      if (ticking) return; ticking = true;
      requestAnimationFrame(function () {
        var y = window.scrollY;
        if (y < window.innerHeight * 1.2) bg.style.transform = "translate3d(0," + (y * 0.25).toFixed(1) + "px,0)";
        ticking = false;
      });
    }, { passive: true });
  }

  /* 5) Resultate blenden beim Filtern weich ein */
  var tbody = document.getElementById("results-body");
  if (tbody && "MutationObserver" in window) {
    new MutationObserver(function () {
      tbody.querySelectorAll("tr").forEach(function (tr, i) {
        tr.style.animationDelay = Math.min(i, 12) * 35 + "ms";
        tr.classList.add("row-in");
      });
    }).observe(tbody, { childList: true });
  }
})();
