# Jana Kramer — Webseite

Eigenständiges, statisches Webseiten-Projekt (kein Build-Tool nötig).

## Struktur

```
├── index.html          Startseite
├── css/style.css       Design-System (Farben, Typografie, Layout)
├── js/main.js          Interaktionen (Navigation etc.)
└── assets/
    ├── images/         Bilder
    └── video/          Videos
```

Einfach `index.html` im Browser öffnen — kein Server/Build nötig.

## Design-Quelle

Grundlage: Mood-Board-Entwurf des Kunden (Oktober 2026). Farben aus dem Entwurf
abgeleitet, Schriften als Vorschlag (Google Fonts).

- **Pink (Akzent, Buttons, «KRAMER»):** `#F0508A` · dunkler für Hover `#C93C6C`
- **Navy (Headlines auf hell):** `#0C1C34`
- **Nachtblau (Hero/dunkle Flächen):** `#070A15`
- **Rosa-Hintergrund (Sections):** `#FBEFF3` · Weiss-Hintergrund `#FBF9FA`
- **Headlines:** Barlow Condensed, 800 Italic, Grossbuchstaben
- **Slogans/Handschrift-Akzente:** Caveat («Small Steps Big Dreams», «I love running…»)
- **Fliesstext/Nav:** Montserrat

Zielgruppen: Sponsoren/Medien (professionell, Erfolge, Kontakt) und Teens 10–16
(Energie, Bilder, Slogans).

Datenschutz (Jana ist minderjährig): Kontakt nur über Eltern/Management, keine
Angaben zu Schule, Wohnort oder Trainingszeiten, Einverständnis für alle Fotos.

## Inhalte (aus Instagram @itsjanajulia, Stand Oktober 2026)

- Bio: «Jana Julia Kramer | Nachwuchsläuferin U12» · «Official profile | Managed exclusively by her parents» ·
  «Mille Gruyère Champion 2026 | 1000 m» · «Swiss Final Winner W10 '26» · «Track & XC»
- 1'112 Follower, 23 Beiträge, Highlights: RUN · SWIM · MEDIA
- Erfolge/Wettkämpfe 2026: Schweizermeisterin Mille Gruyère Swiss Final W10 1000 m ·
  Regionalfinal Bern Mille Gruyère 1000 m · Siegerin Kantonalfinal Solothurn Swiss Athletics
  Cross Cup · Neuer Bahnrekord · Aarauer Altstadtlauf · Buchsilauf · Intersport Ingold · Rennen in Deutschland
- Eigene Slogans: «Little Steps. Big Dreams.» · «Just me & 1000 m.» · «on track» · «Wrong turn? NO! before the finish!»
- Echtes Vereinsdress LV Langenthal: Navy/Blau mit gelben Streifen, pinke Socken als Akzent

## Struktur & Navigation (abgestimmt Oktober 2026)

One-Page mit Anker-Navigation. **Grundsprache Deutsch**, englische Slogans/Akzente
für jungen, coolen Look (z. B. «Meet Jana», «Little Steps. Big Dreams.»).

Navigation: Über mich · Erfolge · Running & Triathlon · Medien · Partner · Kontakt (+ Instagram-Icon)

1. Hero — Actionfoto, Name, «Run. Swim. Ride.», «Little Steps. Big Dreams ♡»
2. Highlights-Leiste — 4 Kacheln (Schweizermeisterin, Cross-Cup-Siegerin SO, Bahnrekord, Follower)
3. Meet Jana — Porträt, Text, Steckbrief, Zitat
4. Erfolge — Zeitleiste Saison 2026
5. Running & Triathlon — zwei Bildkacheln
6. Galerie — Bildraster mit Lightbox
7. In den Medien — Presseartikel-Karten
8. Partner — Eistee-Sponsor + «Dein Logo hier?»
9. Ziele 2027
10. Follow the Journey — Instagram-Leiste @itsjanajulia
11. Kontakt — über die Eltern, Formular
12. Footer — Impressum, Datenschutz, «Managed by her parents»

Vorerst weggelassen: Rubrik «Sponsoring-Angebot» (noch nicht definiert).

## Bilderliste (Upload nach `assets/images/`)

Format: JPG/PNG in voller Auflösung. Dateinamen klein, ohne Leerzeichen/Umlaute.
Komprimierung/WebP-Umwandlung erfolgt danach im Projekt.

| Datei | Section | Format | Mindestgrösse |
|---|---|---|---|
| `hero-desktop.jpg` | Hero (Desktop) | Quer 16:9, Jana rechts, links Freiraum für Text | 2400 × 1350 |
| `hero-mobile.jpg` | Hero (Handy) | Hoch 9:16, oben Freiraum für Text | 1080 × 1920 |
| `about-portrait.jpg` | Meet Jana | Hoch 4:5, lachend, ruhiger Hintergrund | 1200 × 1500 |
| `erfolg-swiss-final.jpg` | Erfolge | Quer 4:3, Siegerehrung/Medaille | 1600 × 1200 |
| `erfolg-cross-cup.jpg` | Erfolge | Quer 4:3 | 1600 × 1200 |
| `erfolg-bahnrekord.jpg` | Erfolge (optional) | Quer 4:3 | 1600 × 1200 |
| `running.jpg` | Running & Triathlon | Hoch 4:5, Laufen in Action | 1200 × 1500 |
| `triathlon.jpg` | Running & Triathlon | Hoch 4:5, Schwimmen oder Rad | 1200 × 1500 |
| `galerie-01.jpg` … `galerie-12.jpg` | Galerie | gemischt hoch/quer | 1600 px lange Seite |
| `medien-01.jpg` … | In den Medien | Quer 3:2, Foto/Screenshot des Artikels | 1200 × 800 |
| `medien.txt` | In den Medien | pro Zeile: Zeitung · Titel · Datum · Link | – |
| `logo-sponsor.svg` / `.png` | Partner | Logo Eistee-Sponsor, transparent | 800 px breit |
