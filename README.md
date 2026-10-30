# Jana Kramer — Webseite

Eigenständiges, statisches Webseiten-Projekt (kein Build-Tool nötig).

## Struktur

```
├── index.html          Startseite
├── css/style.css       Design-System (Farben, Typografie, Layout)
├── js/main.js          Interaktionen (Navigation etc.)
└── assets/
    ├── images/         Bilder, je Section ein Ordner (hero, story, sports, highlights, next, partner, team, medien, instagram)
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

## Struktur & Navigation (Version Auftraggeber, abgestimmt 26.10.2026)

Quelle: «JJK_Website_Texte» (Copy Master), Mockup des Auftraggebers, Wettkampfliste «2026-Plan».
One-Page, Texte Deutsch, **Navigation & Überschriften Englisch**.

Navigation: Home · My Story · My Sports · Highlights · Results · What's Next · Partners (+ Button «Meine Resultate ↓», Instagram)

1. Hero — «Small Steps. Big Dreams.», Name, Intro, Hinweis Elternbetreuung, «Run. Swim. Ride. ♡»
2. Highlight-Statistik — Swiss Champion 2026 · PB 600 m 1:48.38 · Sieg trotz Sturz · Running & Triathlon
3. My Sports — Running · Cross Country · Triathlon (je Verein + Link)
4. My Story — Porträt + Text
5. My Highlights 2026 — 3 Karten (Swiss Final · 600 m PB Zofingen · Bären GP)
6. My Results — Kennzahl «20 Siege 2026» oberhalb; Tabelle aus Datendatei, neueste zuerst,
   Filter Alle/Bahn/Strasse/Cross Country/Triathlon + Jahr; mobil als Karten.
   Spalten: Datum · Anlass · Ort · Disziplin · Kategorie · Rang · Resultat-Link (**keine Zeit-Spalte**)
7. What's Next — Back on Track 2027 · Triathlon 2027 + «Next Races» (angemeldete Rennen)
8. Sponsors & Supporters — Sommertee.ch · Neven Lanz Immobilien · OKOA + Button «Partner werden?» (E-Mail an Eltern)
9. My Team Behind the Scenes — Familie, LV Langenthal, TRI Team Oensingen
10. Press & Media
11. Follow my Journey — @itsjanajulia
12. Footer + Impressum (Eltern als Betreiber)

Entscheide: Schwimmen Aarau (16.05.) wird als **Triathlon** geführt · Spalte «Betreuung» aus Excel
wird **nicht** veröffentlicht · Galerie und Kontaktformular entfallen.

## Bilderliste (Upload nach `assets/images/<ordner>/`)

Format: WebP oder JPG, Qualität ca. 85 %. Dateinamen klein, ohne Leerzeichen/Umlaute.
Bilder werden in Karten zugeschnitten (object-fit) → Jana mittig mit etwas Rand.

| Datei | Section | Format | Mindestgrösse | Status |
|---|---|---|---|---|
| `hero/hero-desktop.webp` | Hero Desktop | 16:9, 3200 × 1800, KI-Hintergrund links, Jana = Originalpixel | 2400 × 1350 | ✓ |
| `hero/hero-mobile.webp` | Hero Handy | 1200 × 2982, Original ohne KI | 1080 breit | ✓ |
| `story/story-portrait.webp` | My Story | 4:5 hoch | 1200 × 1500 | ✓ |
| `sports/running.webp` | My Sports | 4:5 hoch | 1200 × 1500 | ✓ |
| `sports/cross-country.webp` | My Sports | 4:5 hoch | 1200 × 1500 | ✓ |
| `sports/triathlon.webp` | My Sports | 4:5 hoch | 1200 × 1500 | |
| `highlights/swiss-final.webp` | Highlights | 3:2 quer | 1200 × 800 | ✓ |
| `highlights/zofingen.webp` | Highlights | 3:2 quer | 1200 × 800 | Platzhalter, Bild folgt |
| `highlights/baeren-gp.webp` | Highlights | 3:2 quer | 1200 × 800 | ✓ |
| `next/track-2027.webp` | What's Next | 4:3 quer | 1200 × 900 | ✓ |
| `next/triathlon-2027.webp` | What's Next | 4:3 quer | 1200 × 900 | |
| `partner/logo-sommertee.svg/.png` | Sponsors | Logo, transparent | 800 breit | |
| `partner/logo-nevenlanz.svg/.png` | Sponsors | Logo, transparent | 800 breit | |
| `partner/logo-okoa.svg/.png` | Sponsors | Logo, transparent | 800 breit | |
| `partner/sommertee-produkt.png` | Sponsors (optional) | freigestellt, transparent | 800 hoch | |
| `team/team-01.webp`, `team-02.webp` | Team | 1:1 quadratisch | 1200 × 1200 | ✓ |
| `team/logo-lv-langenthal.svg/.png` | Team | Logo, transparent | 800 breit | |
| `team/logo-triteam-oensingen.svg/.png` | Team | Logo, transparent | 800 breit | |
| `medien/medien-01.webp` … `-03` | Press & Media | 3:2 quer | 1200 × 800 | ✓ |
| `medien/medien.txt` | Press & Media | Zeitung · Titel · Datum · Link | – | |
| `instagram/insta-01.webp` … `insta-06.webp` | Follow my Journey | 1:1 | 1080 × 1080 | ✓ |

Offen (liefert Auftraggeber nach): Triathlon-Bilder (sports, next), Zofingen, Logos Sponsoren/Vereine,
Pressetitel/-links. Quellbilder (36 Stück) liegen nicht im Repo (öffentlich) — nur freigegebene Zuschnitte.
