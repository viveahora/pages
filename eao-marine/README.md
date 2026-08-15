# EAO Marine — Landingpage (Fischerboot-/Werftmarkt)

Eigenständiges, statisches Landingpage-Projekt (kein Build-Tool nötig)
im EAO Corporate Design, für die Zielgruppe Fischerboot-Hersteller /
Werften im Marine-Markt.

## Struktur

```
eao-marine/
├── index.html          Alle Sections (Hero, Problem, Lösung/Produkt, Referenzen, FAQ, Kontakt, Footer)
├── css/style.css        Design-System (Farben, Typografie, Layout) gemäss Corporate Design Guide
├── js/main.js           Mobile-Nav, FAQ-Accordion, Feature-Panel-Toggle, Kontaktformular (Mock)
└── assets/
    ├── images/          Hier finale Produkt-/Referenzbilder ablegen
    └── video/            Hier finale Videos ablegen
```

Einfach `index.html` im Browser öffnen — kein Server/Build nötig.

## Design-Quelle

Farben, Schriftgrössen und Layoutwerte stammen aus dem vom Kunden
bereitgestellten **EAO Corporate Design Guide** (Stand August 2026):

- **Rot:** `#E32013` (Hover: `#BD081D`)
- **Schwarz:** `#000000`, **Footer-Anthrazit:** `#393939`
- **Grautöne:** Hell `#F2F2F2` · Mittel `#626262` · Border `#CECECE` · Text `#444444`
- **Headlines:** Minion Pro (Serif) — H1 56/70px, H2 32/37px, H3 24/34px
- **Fliesstext/Nav:** Helvetica Neue LT Light, 17px Nav / letter-spacing 0.53px

### Schriftlizenzen — offener Punkt

Die Originalseite lädt **Minion Pro** über Adobe Typekit und eine
lizenzierte **Helvetica Neue LT W05_45 Light** als Custom Web Font.
Beides sind kostenpflichtige Fonts. Diese Seite nutzt bewusst den vom
Guide selbst definierten Fallback-Stack (`Times New Roman`/Georgia bzw.
`Helvetica Neue`/Arial), bis eine Kit-ID bzw. Lizenzdatei vorliegt.
Sobald verfügbar: Typekit-`<link>` in `index.html` `<head>` ergänzen.

## Offene Inhalte

Die `[PLATZHALTER ...]`-Markierungen wurden aus `index.html` entfernt;
Texte, Kontaktdaten und Bild-/Video-Flächen enthalten aktuell
Arbeitstexte bzw. CSS-Gradients als Ausgangsbasis und sind durch
finales Material zu ersetzen. Bild-/Video-Dateien nach
`assets/images/` bzw. `assets/video/` legen und in den jeweiligen
HTML-Kommentaren/`<img src>` referenzieren.

## Hero-Slider

Der Hero-Bereich ist ein automatischer Bild-Slider (Cross-Fade + leichter
Ken-Burns-Zoom, Wechsel alle 6s; Logik in `js/main.js`, Styling in
`css/style.css` unter `.hero-slide`). Erwartet genau diese drei Dateien:

```
assets/images/hero/hero-1-boot.webp        Boot auf dem Wasser
assets/images/hero/hero-2-cockpit.webp     Cockpit-Detail mit Bedienelementen
assets/images/hero/hero-3-produkte.webp    Produktaufnahme (Keypads/Joystick)
```

Format bewusst **WebP** (kleinere Dateigrösse bei gleicher Qualität,
Browser-Support >97% — für diese B2B-Zielgruppe ohne JPG-Fallback
ausreichend). JPG/PNG-Originale vor dem Ablegen zu WebP konvertieren,
z.B. mit `cwebp original.jpg -q 82 -o hero-1-boot.webp`.

Bis diese Dateien vorhanden sind, fällt der Bereich optisch auf den
Gradient-Hintergrund von `.hero-media` zurück (kein kaputtes Bild-Icon).
Weitere Slides: einfach ein zusätzliches `<div class="hero-slide" ...>`
in `index.html` ergänzen — der Slider erkennt die Anzahl automatisch.

## Referenzen-Video

Die grosse Kachel im "Marine sectors we serve"-Grid ist ein
`<video>`-Element mit eigenem Play/Pause-Button (Logik in
`js/main.js`). Erwartet folgende Datei:

```
assets/video/marine-sectors.mp4
```

Bis die Datei vorliegt, zeigt die Kachel nur das Poster-Bild
(`assets/images/marine.webp`) — der Play-Button ist sichtbar, startet
aber kein Video. MP4 (H.264/AAC) ist die sicherste Wahl für
Browser-Kompatibilität ohne zusätzliche Formate/Fallbacks.

**Hinweis Container-Format:** Falls die Datei direkt aus einer
Video-App/Kamera exportiert wird, kann der Container als QuickTime
(`ftyp: qt`) statt Standard-MP4 (`isom`) markiert sein — das führt bei
manchen Browsern zu Wiedergabefehlern trotz gültigem H.264/AAC-Codec.
Verlustfreier Fix: `ffmpeg -i input.mp4 -c copy -movflags +faststart -f mp4 output.mp4`.

## "Why EAO"-Video

Das Bild im "Why EAO for the Fishing Boat Market?"-Panel ist ein
`<video>`-Element im Hochformat 4:5, das automatisch startet, sobald
der Bereich in den sichtbaren Viewport scrollt (IntersectionObserver,
Logik in `js/main.js`; pausiert wieder, wenn der Bereich den Viewport
verlässt). Erwartet folgende Datei:

```
assets/video/why-eao-fishing-boat.mp4
```

Bis die Datei vorliegt, zeigt der Bereich das bisherige Foto
(`assets/images/fishing-boat-danny.webp`) als Poster-Bild. Video ist
stumm (`muted`) und in Dauerschleife (`loop`), damit Autoplay ohne
Nutzerinteraktion in allen Browsern zuverlässig funktioniert.

## Kontaktformular

Ist aktuell rein clientseitig (zeigt nur eine Erfolgsmeldung, sendet
nichts). Für den Live-Betrieb muss ein Formular-Backend oder ein
Service wie Formspree/Netlify Forms angebunden werden.
