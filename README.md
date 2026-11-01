# xSphereX-Website

Personal profile site for **xSphereX** — gamer, anime fan, music lover and creative soul from Germany. ✦

A single-file website (`index.html`) with a light, colorful "pastel sticker-book" design:

- Animated gradient-sky background with drifting blobs & pastel particles
- Floating pill navigation with a live local-time clock (Europe/Berlin)
- Hero with rotating rainbow avatar ring, sticker badges & typewriter line
- Crossing marquee bands and a bento-grid layout
- **Interactive 3D Minecraft skin viewer** (drag to rotate, animation controls — idle / walk / run / wave / fly) powered by [skinview3d](https://github.com/bs-community/skinview3d), with automatic static-image fallbacks
- Spotify embed, personal quote, interests & social links with copy-to-clipboard

## Run locally

Just open `index.html` in a browser, or serve the folder:

```bash
python3 -m http.server 8000
# → http://localhost:8000
```

No build step required — fonts, icons (Font Awesome) and the 3D viewer load from CDNs.
