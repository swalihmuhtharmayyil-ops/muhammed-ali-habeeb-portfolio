# Muhammed Ali Habeeb portfolio

Static, responsive portfolio built with HTML, CSS and JavaScript. It runs without a build step. The Motion animation module is loaded from a version-pinned jsDelivr URL; Google Fonts are also remote. The speaker photo is included in `assets/speaker.jpg`.

## Preview locally

From this folder, run `python -m http.server 4173` and open <http://localhost:4173>. Scroll-triggered motion needs a network connection to load the Motion module. If the module is unavailable, the page content remains visible without those animations.

## Motion effects

The animation layer uses Motion, the JavaScript and React animation library from the Framer Motion team. It imports the pinned `motion@14.3.0` module from jsDelivr and uses `animate`, `scroll`, `inView`, and `stagger`.

Scroll-linked transforms, the ticker and page progress follow the scroll position in both directions. Scroll-triggered reveal groups also animate back toward their initial state when they leave the viewport, then replay on re-entry.

## Deploy to Vercel

Import the Git repository in Vercel and set the project **Root Directory** to `portfolio`. Choose **Other** as the framework preset; no build command is needed and the output directory is `.`. Then deploy. The Instagram link is already configured. No secrets or environment variables are required.

Motion API reference: <https://motion.dev/docs/quick-start>
