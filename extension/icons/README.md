## Icon Placeholder

Place the following icon files in this directory:

- `icon16.png` - 16x16 px (toolbar)
- `icon48.png` - 48x48 px (extensions page)
- `icon128.png` - 128x128 px (Chrome Web Store)

After adding them, update `manifest.json` icons field:

```json
"icons": {
  "16": "icons/icon16.png",
  "48": "icons/icon48.png",
  "128": "icons/icon128.png"
}
```

You can generate simple placeholder PNGs with ImageMagick:

```bash
convert -size 16x16 xc:#6C5CE7 -gravity center -fill white -pointsize 10 -annotate 0 "G" icons/icon16.png
convert -size 48x48 xc:#6C5CE7 -gravity center -fill white -pointsize 28 -annotate 0 "G" icons/icon48.png
convert -size 128x128 xc:#6C5CE7 -gravity center -fill white -pointsize 72 -annotate 0 "G" icons/icon128.png
```
