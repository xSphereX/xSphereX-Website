# xSphereX-Website

Personal site for **Sphere (xSphereX)** — gamer, music collector and occasional poet. ✦

A static site, no build step, no dependencies to install. Light editorial design: serif
display type with italic accents, numbered sections, coral + periwinkle accents on a
lavender field, with dark plum panels for the skins and socials.

## Structure

```
index.html          markup only — no inline CSS or JS
css/style.css       all styles, organised in numbered sections
js/                 one small module per feature, loaded in order
  00-utils.js         shared helpers + the .js flag
  01-images.js        fallback chains for every <img>
  02-avatar.js        resolves the live Discord avatar
  03-nav.js           mobile menu + active-section dot
  04-ticker.js        seamless marquee loop
  05-reveal.js        scroll reveal (with a safety net)
  06-clipboard.js     copy buttons + toast
  07-games.js         game filter chips
  08-poem.js          poem ⇄ meaning toggle
  09-parallax.js      pointer parallax on the hero glow
  10-skin.js          3D Minecraft skin viewer
  11-game-modal.js    game detail dialog
```

All imagery is referenced by URL, so there are no binary assets in the repo.
assets/             optimised WebP art (game covers + artist photos)
```

## Run locally

```bash
python3 -m http.server 8000
# → http://localhost:8000
```

Open `index.html` directly also works, though the relative `css/`, `js/` and `assets/`
paths are happier over a local server.

## Notes

- **Game details** — click (or press Enter on) a game card for a dialog with its
  release date, developer, platforms and official link. Art is shown at full size.
- **Profile picture** — the Discord avatar is resolved at runtime, so changing it on
  Discord updates the site on the next load. Falls back to the Minecraft head, then a
  monogram. Discord invalidates old CDN hashes, which is why a hard-coded URL breaks.
- **Minecraft skin** — loaded by username and cache-busted, so changing your skin in-game
  shows up here. The viewer has a refresh button; it degrades to a static render if
  skinview3d, WebGL or every texture provider fails.
- **Third-party** — fonts (Google Fonts), icons (Font Awesome) and the 3D renderer
  (skinview3d via jsDelivr) load from CDNs. Local art and code are served from the repo.
- **Motion** — everything respects `prefers-reduced-motion`.
