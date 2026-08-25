# Plan F — Lothar Pusch Landing Page

Eigenständiges, statisches Landingpage-Projekt (kein Build-Tool nötig).
Webinar-Funnel: Meta Ad → Landing Page (`index.html`) → Anmeldung → Video-Training-Page
(`training.html`, Wistia-Video eingebettet) → WhatsApp CTA zu Lothar.

## Struktur

```
index.html                 Landing Page — alles inline (HTML + CSS + JS, keine externen Dateien ausser Google Fonts)
training.html               Zweite Seite nach der Anmeldung — eingebettetes Wistia-Video + WhatsApp-CTA + nächste Schritte
lothar-hero-desktop.webp    Vom Auftraggeber zu ergänzen (Titelbild Hero, Desktop, Querformat)
lothar-hero-mobile.webp     Vom Auftraggeber zu ergänzen (Titelbild Hero, Mobile, Hochformat)
lothar-foto.webp            Vom Auftraggeber zu ergänzen (Porträt, Format 3:4, Über-Lothar-Section)
```

Einfach `index.html` im Browser öffnen — kein Server/Build nötig.

## Hero-Aufbau

Der Hero ist ein raumfüllendes Titelbild (volle Viewport-Höhe, Text unten links, dunkler
Verlauf für Lesbarkeit) statt des ursprünglichen 2-Spalten-Layouts mit Formular — angelehnt
an den Hero-Aufbau von `viveahora.github.io/pages` (Reto Bucher / vive ahora). Der CTA-Button
scrollt per Anchor-Link zur Anmeldesektion (`#registrierung`), es gibt kein Formular mehr im
Hero selbst.

Es werden **zwei separate Bilddateien** geladen — unter 640px Breite (Mobile) schaltet eine
Media Query von `lothar-hero-desktop.webp` auf `lothar-hero-mobile.webp` um, damit der
Bildausschnitt auf schmalen Screens nicht einfach nur zugeschnitten, sondern gezielt fürs
Hochformat komponiert werden kann. Fehlt eine der beiden Dateien, fällt der Hintergrund
automatisch auf einen warmen Gradient zurück (kein kaputtes Bild-Icon) — CSS-Layer-Fallback,
kein JS nötig.

Alle drei Bilder sind als **WebP** eingebunden (kleinere Dateigrösse bei gleicher Qualität,
Browser-Support >97% — für diesen Funnel ohne JPG-Fallback ausreichend, kein `<picture>`-Tag
nötig). Einfach unter genau diesen Dateinamen ins Repo-Root hochladen, keine Code-Änderung
nötig.

**Empfohlene Masse:**

| Datei | Format | Grösse (empfohlen) | Hinweis |
|---|---|---|---|
| `lothar-hero-desktop.webp` | Querformat, ca. 16:9–3:2 | 2400×1350px (min. 1920×1080px) | Motiv/Fokuspunkt eher rechts oder zentriert platzieren — der Text liegt unten links über einem dunklen Verlauf, der untere Bilddrittel darf ruhig etwas "leerer" sein |
| `lothar-hero-mobile.webp` | Hochformat, ca. 4:5–3:4 | 1080×1350px (min. 828×1035px) | Eigener Bildausschnitt statt einfach nur zugeschnittenes Desktop-Bild — Motiv zentriert, Kopf/Gesicht (falls Lothar im Bild) im oberen Drittel |
| `lothar-foto.webp` | Hochformat, exakt 3:4 | 900×1200px (min. 600×800px) | Porträt, freundlich, professionell — wird als `object-fit: cover` in eine 3:4-Fläche gesetzt |

WebP-Qualität q≈80–85% ist für Fotos ausreichend; alle drei Dateien sollten unter ~250–400KB
bleiben für schnelle Ladezeit (WebP ist bei gleicher Qualität ohnehin kleiner als JPG). Beide
Hero-Bilder sollten zueinander farblich/stilistisch konsistent sein (gleiches Motiv/Location,
gleiche Bearbeitung), da sie je nach Bildschirmgrösse gegeneinander ausgetauscht werden.

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

## Anmeldeformular

Das Formular in der Anmeldesektion (`#reg-form`) ist auf **Netlify Forms** verdrahtet:
`name="plan-f-anmeldung"`, `data-netlify="true"`, ein verstecktes `form-name`-Feld und ein
Honeypot-Feld (`bot-field`, per CSS unsichtbar) gegen Spam-Bots. Das JS in `handleSubmit()`
schickt die Eingaben per `fetch()` an Netlify statt die Seite neu zu laden, und zeigt danach
den Erfolgs-Zustand am Button.

**Wichtig:** Netlify Forms funktioniert nur, sobald die Seite tatsächlich auf Netlify deployed
ist — der Netlify-Build-Bot muss das Formular beim Build anhand von `data-netlify="true"` im
HTML registrieren. Auf der reinen GitHub-Vorschau (`htmlpreview.github.io` o.ä.) läuft der
`fetch()`-Aufruf ins Leere (404) — das ist vor dem ersten Netlify-Deploy normal, kein Bug.
Nach dem Deploy tauchen Einträge im Netlify-Dashboard unter *Forms* auf.

**Brevo-Anbindung (später):** Sobald ihr so weit seid, lässt sich Netlify Forms per Zapier/Make
oder über einen Netlify-Forms-Webhook automatisch an Brevo weiterleiten (neuer Kontakt bei
jeder Submission) — dafür ist keine Code-Änderung an dieser Seite nötig, nur ein Zap/Szenario
auf Netlify-Seite.

## Video-Training-Page (training.html)

Nach erfolgreicher Anmeldung leitet `handleSubmit()` nicht mehr direkt zu Wistia weiter,
sondern zu `training.html` — mit dem eingetragenen Vornamen als URL-Parameter
(`training.html?name=Max`) für eine persönliche Begrüssung ("Schön, dass du da bist, Max!").
Ohne Parameter (z.B. bei direktem Aufruf) zeigt die Seite einen neutralen Titel.

Aufbau: Titel → eingebettetes Wistia-Video (offizieller `wistia-player`-Embed, Media-ID aus
der gelieferten URL extrahiert) → WhatsApp-CTA-Button direkt darunter → kurze "Deine nächsten
Schritte"-Liste (3 Punkte) → gleicher Footer wie die Landing Page (inkl. Facebook-Disclaimer,
da auch diese Seite öffentlich erreichbar/crawlbar ist).

Der WhatsApp-Button hat eine vorausgefüllte Nachricht ("Hallo Lothar, ich habe dein
Video-Training gesehen und hätte gerne mehr Infos.") — Text lässt sich jederzeit anpassen oder
entfernen (`href="https://wa.me/...?text=..."` im `<a class="btn">`-Tag).

**Eingebettetes Video:** Media-ID `6k671balyz`, per offiziellem Wistia-Embed-Code vom
Auftraggeber eingesetzt (inkl. Blur-Swatch-Ladeanimation, bis der Player geladen ist). Falls
später ein anderes Video eingesetzt werden soll, drei Stellen anpassen: `media-id` im
`wistia-player`-Tag, die Media-ID im `<script src="https://fast.wistia.com/embed/...">` und
im CSS-Selektor `wistia-player[media-id='...']:not(:defined)`.

## Offene Punkte für den Auftraggeber

| Was | Wo im Code | Details |
|---|---|---|
| Hero-Titelbild Desktop | `.hero-bg` im `<style>`-Block (index.html) | `lothar-hero-desktop.webp`, Querformat. Wirkt bei Lifestyle-/Freiheits-Motiven (Reisen, Golf, o.ä.) am stärksten. Bis dahin zeigt der Hero einen warmen Gradient. |
| Hero-Titelbild Mobile | `.hero-bg` in der 640px-Media-Query (index.html) | `lothar-hero-mobile.webp`, Hochformat, eigener Bildausschnitt (siehe Tabelle oben). |
| Lothar-Foto | `<img src="lothar-foto.webp">` in der Über-Lothar-Section (index.html) | Professionell, freundlich, Porträt-Format (3:4). Bis dahin zeigt die Section einen Sand-Platzhalter. |
| ~~Lothars WhatsApp-Nummer~~ | `training.html`, `.cta-block` | ✅ Erledigt — `+41 76 604 78 54` eingetragen |
| Meta Pixel ID | `<head>` in index.html **und** training.html, auskommentierte Blöcke | Von Meta Business Manager. Empfehlung: `PageView` auf index.html, `Lead` auf training.html (Anmeldung ist dort tatsächlich abgeschlossen) |
| Impressum/Datenschutz | Footer-Links `href="#"` in beiden Dateien | Gesetzliche Pflicht in DACH |
| og:image | `<head>` in index.html, Meta-Tag fehlt noch | 1200×630px. **Empfehlung:** hierfür JPG/PNG statt WebP verwenden — manche Social-Media-Crawler (u.a. ältere Facebook/Meta-Debugger-Fälle) lesen WebP für Link-Vorschaubilder unzuverlässig |
| Domain | Netlify-Dashboard | Erst bei explizitem Deploy-Auftrag |

## Deployment

**Live auf Netlify:** https://lothar-plan-f.netlify.app — Site `lothar-plan-f`, per
Continuous Deployment direkt mit GitHub-Branch `claude/lothar-landingpage-468izq` verknüpft
(Netlify-Dashboard → Project configuration → Branch to deploy). Netlify Forms ist aktiviert,
das Formular `plan-f-anmeldung` wurde erfolgreich getestet.

**Deploy-Policy (Stand 25.08.2026):** Um unnötige Netlify-Build-Minuten zu sparen, läuft
**nicht** jeder Push automatisch live. Commits für normale Anpassungen (Text/Design/Layout)
enthalten `[skip netlify]` in der Commit-Message — GitHub bekommt den Push, Netlify baut aber
nicht. Ein Deploy wird nur ausgelöst, wenn der Auftraggeber explizit Bescheid gibt ("deploy
das"/"push auf Netlify"), oder automatisch bei **funktionalen** Änderungen (Formular-Logik,
Netlify-Forms-Konfig, Weiterleitungen), die ohne Live-Test wenig Sinn ergeben.
