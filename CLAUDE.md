# eao-marine-general — Hinweise für Claude

## Bild-Hochskalierung (4K-Upscale)

Für das Hochskalieren bestehender Bilder (z.B. auf 4K) **niemals** den KI-Upscaler
(`mcp__Higgsfield__upscale_image`, bytedance-Modell) verwenden — dieser verändert
feine Details wie Icons/Text (z.B. Keypad-Beschriftungen) und generiert sie neu
statt sie exakt zu erhalten.

**Stattdessen:** klassisches, verlustfreies Lanczos-Resize via ImageMagick in der
Higgsfield-Sandbox (`mcp__Higgsfield__sandbox_exec`). Das verändert nur die Auflösung,
niemals den Bildinhalt.

Ablauf (alles in **einem** `sandbox_exec`-Call, da Sandbox-Dateien nicht zwischen
Calls persistieren):

```bash
curl -sS -o orig.jpg "<quell-url>" \
  && convert orig.jpg -filter Lanczos -resize <ZIELBREITE>x<ZIELHOEHE> \
       -unsharp 0x0.75+0.4+0.02 -quality 92 out.webp \
  && identify out.webp \
  && curl -sS -o /dev/null -w "upload_http_code:%{http_code}\n" -X PUT \
       -H "Content-Type: image/webp" --data-binary @out.webp '<presigned_put_url>'
```

- Zielauflösung IMMER im exakten Seitenverhältnis des Originals berechnen
  (z.B. Original 2336×1744 → 4096 Breite → Höhe = 1744×(4096/2336) ≈ 3058),
  nie auf ein Standard-Seitenverhältnis (4:3, 16:9) zuschneiden/strecken lassen.
- Presigned Upload-URL vorher per `mcp__Higgsfield__media_upload` (filename mit
  `.webp`, content_type `image/webp`) holen, danach `mcp__Higgsfield__media_confirm`
  (type `image`) aufrufen.
- Ergebnis-URL liegt auf `cloudfront.net` — das ist von der eigenen Bash-Sandbox aus
  (Egress-Proxy-Policy) nicht erreichbar. Dem User den Download-Link geben; er lädt
  die Datei wie gewohnt direkt auf GitHub hoch (gleicher Workflow wie bei neuen
  Hero-Bildern), danach erst git fetch + Integration ins HTML.
