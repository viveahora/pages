# eao-marine-general — Hinweise für Claude

## Bild-Hochskalierung (4K-Upscale)

Für das Hochskalieren bestehender Bilder (z.B. auf 4K) **niemals** einen KI-Upscaler
(z.B. `mcp__Higgsfield__upscale_image`, bytedance-Modell) verwenden — dieser verändert
feine Details wie Icons/Text (z.B. Keypad-Beschriftungen) und generiert sie neu
statt sie exakt zu erhalten.

**Stattdessen:** klassisches, verlustfreies Lanczos-Resize — bevorzugt lokal mit
Python/Pillow direkt in dieser Session (kein Higgsfield/Sandbox nötig, kein
Netzwerk-Proxy-Problem). `pip install Pillow` falls noch nicht installiert.

```python
from PIL import Image, ImageFilter

img = Image.open(src_path).convert('RGB')
w, h = img.size
target_h = 4096  # oder target_w, je nach Ausrichtung (Hoch-/Querformat)
target_w = round(w * (target_h / h))  # IMMER exaktes Seitenverhältnis beibehalten

upscaled = img.resize((target_w, target_h), resample=Image.LANCZOS)
sharpened = upscaled.filter(ImageFilter.UnsharpMask(radius=2, percent=60, threshold=2))
sharpened.save(out_path, 'JPEG', quality=92, optimize=True)
```

- **Ausgabeformat: `.jpg`** (nicht `.webp`) — explizite User-Präferenz.
- Zielauflösung IMMER im exakten Seitenverhältnis des Originals berechnen, nie auf
  ein Standard-Seitenverhältnis (4:3, 16:9) zuschneiden/strecken lassen.
- Ergebnis per `SendUserFile` direkt an den User senden (Datei liegt lokal im
  Scratchpad, kein Upload/Download-Umweg nötig).
- Nur falls Pillow/lokale Tools für einen Spezialfall nicht reichen: Fallback auf
  ImageMagick-Lanczos in der Higgsfield-Sandbox (`mcp__Higgsfield__sandbox_exec`),
  dann Ergebnis-URL liegt auf `cloudfront.net` (von der eigenen Bash-Sandbox aus wegen
  Egress-Proxy-Policy nicht erreichbar) — Download-Link an User geben, der lädt die
  Datei direkt auf GitHub hoch.
