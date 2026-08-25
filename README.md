# Plan F — Lothar Pusch Landing Page

Eigenständiges, statisches Landingpage-Projekt (kein Build-Tool nötig).
Webinar-Funnel: Meta Ad → Landing Page → 25-Min. Video → WhatsApp CTA zu Lothar.

## Struktur

```
index.html        Alle Sections inline (HTML + CSS + JS, keine externen Dateien ausser Google Fonts)
lothar-hero.jpg    Vom Auftraggeber zu ergänzen (Titelbild Hero, Querformat, volle Breite)
lothar-foto.jpg    Vom Auftraggeber zu ergänzen (Porträt, Format 3:4, Über-Lothar-Section)
```

Einfach `index.html` im Browser öffnen — kein Server/Build nötig.

## Hero-Aufbau

Der Hero ist jetzt ein raumfüllendes Titelbild (volle Viewport-Höhe, Text unten links,
dunkler Verlauf für Lesbarkeit) statt des ursprünglichen 2-Spalten-Layouts mit Formular —
angelehnt an den Hero-Aufbau von `viveahora.github.io/pages` (Reto Bucher / vive ahora).
Der CTA-Button scrollt per Anchor-Link zur Anmeldesektion (`#registrierung`), es gibt kein
Formular mehr im Hero selbst. Fehlt `lothar-hero.jpg`, fällt der Hintergrund automatisch auf
einen warmen Gradient zurück (kein kaputtes Bild-Icon) — CSS-Layer-Fallback, kein JS nötig.

## Meta-Compliance

Die Seite hält sich an die vom Auftraggeber vorgegebenen Regeln: keine Erwähnung von
Markennamen, "MLM", "Netzwerkmarketing" oder "Schneeballsystem" auf der äusseren Seite,
keine konkreten Einkommensversprechen. "Empfehlungsmarketing" und die Erwähnung von
"Schneeballsystem"/"MLM" kommen ausschliesslich innerhalb des FAQ vor (als Nutzerfrage
mit ehrlicher, transparenter Antwort). Das Geschäftsmodell selbst wird nur im verlinkten
Video erklärt.

**Hinweis zur Umsetzung:** Das Original-Briefing enthielt in der zweiten Anmeldesektion
den Satz "Kein Schneeballsystem — ehrliches Empfehlungsmarketing, transparent erklärt.",
was der eigenen Compliance-Regel (Abschnitt 2 des Briefings: dieses Wort nicht einmal in
der Verneinung auf der äusseren Seite) widersprach. Umgesetzt wurde stattdessen:
"Transparent und ehrlich — keine versteckten Kosten, keine leeren Versprechen."

## Offene Punkte für den Auftraggeber

| Was | Wo im Code | Details |
|---|---|---|
| Hero-Titelbild | `.hero-bg` im `<style>`-Block (`background-image: url('lothar-hero.jpg')`) | Querformat, wirkt bei Lifestyle-/Freiheits-Motiven (Reisen, Golf, o.ä.) am stärksten. Bis dahin zeigt der Hero einen warmen Gradient. |
| Lothar-Foto | `<img src="lothar-foto.jpg">` in der Über-Lothar-Section | Professionell, freundlich, Porträt-Format (3:4). Bis dahin zeigt die Section einen Sand-Platzhalter. |
| Video-URL | `handleSubmit()` im `<script>`-Block | URL des Webinar-Videos (Vimeo/YouTube unlisted) |
| E-Mail-Integration | `handleSubmit()` im `<script>`-Block | Mailchimp/ConvertKit API oder Netlify Forms |
| WhatsApp-Link | Ans Ende des Videos einbauen (nicht auf der Landing Page) | `https://wa.me/4179XXXXXXX` |
| Meta Pixel ID | `<head>`, auskommentierter Block | Von Meta Business Manager |
| Impressum/Datenschutz | Footer-Links `href="#"` | Gesetzliche Pflicht in DACH |
| og:image | `<head>`, Meta-Tag fehlt noch | 1200×630px, Lothar-Foto oder professionelles Bild |
| Domain | Netlify-Dashboard | Erst bei explizitem Deploy-Auftrag |

## Deployment

**Noch nicht auf Netlify deployt** — aktuell nur als GitHub-Branch-Vorschau verfügbar.
Erst nach expliziter Freigabe wird in den Netlify-Produktionsbranch gemerged.
