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

## Platzhalter

Alle `[PLATZHALTER ...]`-Markierungen in `index.html` (Texte, Bilder,
Videos, Kontaktdaten) sind Ausgangsbasis und durch finales Material zu
ersetzen. Bild-/Video-Flächen sind aktuell CSS-Gradients — Original-
Dateien nach `assets/images/` bzw. `assets/video/` legen und in den
jeweiligen HTML-Kommentaren referenzieren.

## Kontaktformular

Ist aktuell rein clientseitig (zeigt nur eine Erfolgsmeldung, sendet
nichts). Für den Live-Betrieb muss ein Formular-Backend oder ein
Service wie Formspree/Netlify Forms angebunden werden.
