(function () {
  "use strict";
  document.documentElement.classList.add("js");

  /* ---------- Header & Navigation ---------- */
  var header = document.querySelector(".site-header");
  var burger = document.querySelector(".burger");
  var nav = document.getElementById("nav");

  function onScroll() { if (!header.hasAttribute("data-static")) header.classList.toggle("is-solid", window.scrollY > 40); }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  function setMenu(open) {
    burger.setAttribute("aria-expanded", String(open));
    burger.setAttribute("aria-label", open ? "Menü schliessen" : "Menü öffnen");
    nav.classList.toggle("is-open", open);
    document.body.classList.toggle("nav-open", open);
  }
  if (burger && nav) {
    burger.addEventListener("click", function () { setMenu(burger.getAttribute("aria-expanded") !== "true"); });
    nav.addEventListener("click", function (e) { if (e.target.closest("a")) setMenu(false); });
    document.addEventListener("keydown", function (e) { if (e.key === "Escape") setMenu(false); });
  }

  // Aktiven Menüpunkt markieren
  var links = nav ? Array.prototype.slice.call(nav.querySelectorAll("ul a")) : [];
  if ("IntersectionObserver" in window) {
    var spy = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (!en.isIntersecting) return;
        links.forEach(function (a) { a.classList.toggle("is-current", a.getAttribute("href") === "#" + en.target.id); });
      });
    }, { rootMargin: "-45% 0px -50% 0px" });
    links.forEach(function (a) { var s = document.querySelector(a.getAttribute("href")); if (s) spy.observe(s); });

    /* ---------- Reveal ---------- */
    var rev = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) { if (en.isIntersecting) { en.target.classList.add("is-in"); rev.unobserve(en.target); } });
    }, { rootMargin: "0px 0px -8% 0px" });
    document.querySelectorAll(".reveal").forEach(function (el) { rev.observe(el); });
  } else {
    document.querySelectorAll(".reveal").forEach(function (el) { el.classList.add("is-in"); });
  }

  /* ---------- E-Mail (gegen Spam-Bots zusammengesetzt) ---------- */
  var MAIL = ["kramer.david", "hotmail.com"];
  document.querySelectorAll(".js-mail").forEach(function (a) {
    var subject = a.getAttribute("data-subject");
    a.href = "mailto:" + MAIL[0] + "@" + MAIL[1] + (subject ? "?subject=" + encodeURIComponent(subject) : "");
  });
  document.querySelectorAll(".js-mail-text").forEach(function (el) { el.textContent = MAIL[0] + "@" + MAIL[1]; });

  /* ---------- Resultate ---------- */
  var data = (window.RESULTS || []).slice();
  var tbody = document.getElementById("results-body");
  if (!tbody) return;

  var TYPES = { bahn: "Bahn", strasse: "Strasse", cross: "Cross", triathlon: "Triathlon" };
  var MONTHS = ["Jan", "Feb", "Mär", "Apr", "Mai", "Jun", "Jul", "Aug", "Sep", "Okt", "Nov", "Dez"];
  var today = new Date(); today.setHours(0, 0, 0, 0);

  function parse(d) { var p = d.split("-"); return new Date(+p[0], +p[1] - 1, +p[2]); }
  function fmt(d) { var p = d.split("-"); return p[2] + "." + p[1] + "." + p[0]; }
  function esc(s) { return String(s).replace(/[&<>"]/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]; }); }

  var done = data.filter(function (r) { return typeof r.rank === "number"; })
                 .sort(function (a, b) { return a.date < b.date ? 1 : -1; });
  var upcoming = data.filter(function (r) { return typeof r.rank !== "number" && parse(r.date) >= today; })
                     .sort(function (a, b) { return a.date > b.date ? 1 : -1; });

  // Jahre
  var years = done.map(function (r) { return r.date.slice(0, 4); })
                  .filter(function (y, i, arr) { return arr.indexOf(y) === i; }).sort().reverse();
  var select = document.getElementById("year-select");
  select.innerHTML = years.map(function (y) { return '<option value="' + y + '">' + y + "</option>"; }).join("") +
                     (years.length > 1 ? '<option value="all">Alle Jahre</option>' : "");

  var LIMIT = 8;
  var state = { type: "all", year: years[0] || "all", all: false };
  var moreBtn = document.getElementById("results-more");

  function render() {
    var byYear = done.filter(function (r) { return state.year === "all" || r.date.slice(0, 4) === state.year; });
    var rows = byYear.filter(function (r) { return state.type === "all" || r.type === state.type; });

    var shown = state.all ? rows : rows.slice(0, LIMIT);
    moreBtn.hidden = rows.length <= LIMIT;
    moreBtn.textContent = state.all ? "Weniger anzeigen" : "Alle " + rows.length + " Resultate anzeigen";
    tbody.innerHTML = shown.map(function (r) {
      var rk = r.rank <= 3 ? " rank-" + r.rank : "";
      var link = r.link
        ? '<a class="res-link" href="' + esc(r.link) + '" target="_blank" rel="noopener" aria-label="Offizielles Resultat: ' + esc(r.name) + '"><svg aria-hidden="true"><use href="#i-ext"/></svg></a>'
        : "";
      return "<tr>" +
        "<td>" + fmt(r.date) + "</td>" +
        '<td class="event">' + esc(r.name) + '<span class="type-tag">' + TYPES[r.type] + "</span></td>" +
        '<td class="c-place">' + esc(r.place) + "</td>" +
        '<td class="c-disc">' + esc(r.distance) + "</td>" +
        '<td class="c-cat">' + esc(r.category) + "</td>" +
        '<td class="c-rank"><span class="rank' + rk + '">' + r.rank + ".</span></td>" +
        '<td class="c-link">' + link + "</td>" +
        "</tr>";
    }).join("");
    document.getElementById("results-empty").hidden = rows.length > 0;

    // Kennzahlen (für das gewählte Jahr, alle Disziplinen)
    setKpi("wins", byYear.filter(function (r) { return r.rank === 1; }).length);
    setKpi("podiums", byYear.filter(function (r) { return r.rank <= 3; }).length);
    setKpi("races", byYear.length);
    setKpi("year", state.year === "all" ? "" : state.year);
  }
  function setKpi(k, v) { var el = document.querySelector('[data-kpi="' + k + '"]'); if (el) el.textContent = v; }

  document.querySelectorAll(".chip").forEach(function (btn) {
    btn.addEventListener("click", function () {
      state.type = btn.getAttribute("data-type"); state.all = false;
      document.querySelectorAll(".chip").forEach(function (b) {
        var on = b === btn; b.classList.toggle("is-active", on); b.setAttribute("aria-pressed", String(on));
      });
      render();
    });
  });
  select.addEventListener("change", function () { state.year = select.value; state.all = false; render(); });
  moreBtn.addEventListener("click", function () {
    state.all = !state.all; render();
    if (!state.all) document.getElementById("results").scrollIntoView();
  });
  render();

  /* ---------- Next Races ---------- */
  var list = document.getElementById("next-races");
  if (list) {
    if (!upcoming.length) { document.getElementById("next-races-box").hidden = true; }
    list.innerHTML = upcoming.slice(0, 4).map(function (r) {
      var d = parse(r.date);
      return '<li><span class="race-date">' + d.getDate() + "<small>" + MONTHS[d.getMonth()] + "</small></span>" +
             '<span class="race-info"><strong>' + esc(r.name) + "</strong><span>" + esc(r.place) + " · " + esc(r.distance) + " · " + esc(r.category) + "</span></span></li>";
    }).join("");
  }
})();
