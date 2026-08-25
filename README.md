# Plan F — Lothar Pusch Landing Page

Eigenständiges, statisches Landingpage-Projekt (kein Build-Tool nötig).
Webinar-Funnel: Meta Ad → Landing Page → 25-Min. Video → WhatsApp CTA zu Lothar.

## Struktur

```
index.html                Alle Sections inline (HTML + CSS + JS, keine externen Dateien ausser Google Fonts)
lothar-hero-desktop.jpg    Vom Auftraggeber zu ergänzen (Titelbild Hero, Desktop, Querformat)
lothar-hero-mobile.jpg     Vom Auftraggeber zu ergänzen (Titelbild Hero, Mobile, Hochformat)
lothar-foto.jpg            Vom Auftraggeber zu ergänzen (Porträt, Format 3:4, Über-Lothar-Section)
```

Einfach `index.html` im Browser öffnen — kein Server/Build nötig.

## Hero-Aufbau

Der Hero ist ein raumfüllendes Titelbild (volle Viewport-Höhe, Text unten links, dunkler
Verlauf für Lesbarkeit) statt des ursprünglichen 2-Spalten-Layouts mit Formular — angelehnt
an den Hero-Aufbau von `viveahora.github.io/pages` (Reto Bucher / vive ahora). Der CTA-Button
scrollt per Anchor-Link zur Anmeldesektion (`#registrierung`), es gibt kein Formular mehr im
Hero selbst.

Es werden **zwei separate Bilddateien** geladen — unter 640px Breite (Mobile) schaltet eine
Media Query von `lothar-hero-desktop.jpg` auf `lothar-hero-mobile.jpg` um, damit der
Bildausschnitt auf schmalen Screens nicht einfach nur zugeschnitten, sondern gezielt fürs
Hochformat komponiert werden kann. Fehlt eine der beiden Dateien, fällt der Hintergrund
automatisch auf einen warmen Gradient zurück (kein kaputtes Bild-Icon) — CSS-Layer-Fallback,
kein JS nötig.

**Empfohlene Masse:**

| Datei | Format | Grösse (empfohlen) | Hinweis |
|---|---|---|---|
| `lothar-hero-desktop.jpg` | Querformat, ca. 16:9–3:2 | 2400×1350px (min. 1920×1080px) | Motiv/Fokuspunkt eher rechts oder zentriert platzieren — der Text liegt unten links über einem dunklen Verlauf, der untere Bilddrittel darf ruhig etwas "leerer" sein |
| `lothar-hero-mobile.jpg` | Hochformat, ca. 4:5–3:4 | 1080×1350px (min. 828×1035px) | Eigener Bildausschnitt statt einfach nur zugeschnittenes Desktop-Bild — Motiv zentriert, Kopf/Gesicht (falls Lothar im Bild) im oberen Drittel |
| `lothar-foto.jpg` | Hochformat, exakt 3:4 | 900×1200px (min. 600×800px) | Porträt, freundlich, professionell — wird als `object-fit: cover` in eine 3:4-Fläche gesetzt |

Format: JPG (q≈80–85%) ist für Fotos ausreichend; alle drei Dateien sollten unter ~400–600KB
bleiben für schnelle Ladezeit. Beide Hero-Bilder sollten zueinander farblich/stilistisch
konsistent sein (gleiches Motiv/Location, gleiche Bearbeitung), da sie je nach Bildschirmgrösse
gegeneinander ausgetauscht werden.

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
| Hero-Titelbild Desktop | `.hero-bg` im `<style>`-Block | `lothar-hero-desktop.jpg`, Querformat. Wirkt bei Lifestyle-/Freiheits-Motiven (Reisen, Golf, o.ä.) am stärksten. Bis dahin zeigt der Hero einen warmen Gradient. |
| Hero-Titelbild Mobile | `.hero-bg` in der 640px-Media-Query | `lothar-hero-mobile.jpg`, Hochformat, eigener Bildausschnitt (siehe Tabelle oben). |
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
