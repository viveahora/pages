# Projektregeln für Claude

## Netlify Deployment
- **NIEMALS automatisch auf Netlify deployen** — nur wenn der Benutzer es explizit anweist (z.B. "deploy auf Netlify" oder "push auf Netlify").
- Der Netlify-Produktionsbranch ist `Reto-Test`. Deployment erfolgt durch Merge von `preview` in `Reto-Test` und Push.
- Zum Deployen: `git checkout Reto-Test` → `git merge preview` → `git push origin Reto-Test` → `git checkout preview`

## Branch-Struktur
- `preview` — Entwicklungsbranch, hier werden alle Änderungen gemacht
- `Reto-Test` — Netlify Produktionsbranch, nur bei expliziter Deploy-Anweisung aktualisieren

## Allgemeines
- Alle Änderungen auf dem `preview` Branch committen und pushen
- Netlify-URL: reto-test.netlify.app
- GitHub-Repo: viveahora/pages
