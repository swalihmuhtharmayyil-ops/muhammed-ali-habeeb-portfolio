// Motion's JavaScript engine is the lightweight, framework-free API from the
// same project previously known as Framer Motion. CDN version is pinned.
import { animate, inView, scroll, stagger } from "https://cdn.jsdelivr.net/npm/motion@14.3.0/+esm";

const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const ease = [0.22, 0.8, 0.24, 1];

if (!reducedMotion) {
  // Without JavaScript/CDN access or with reduced motion, content stays visible.
  document.documentElement.classList.add("motion-ready");
  // Split headline entrance, with a gentle three-dimensional settle.
  animate(".split-line", {
    opacity: [0, 1],
    y: [56, 0],
    rotateX: [-10, 0],
    filter: ["blur(8px)", "blur(0px)"],
  }, {
    duration: 1.05,
    delay: stagger(0.12),
    ease,
  });

  animate(".nav", { opacity: [0, 1], y: [-18, 0] }, { duration: 0.8, delay: 0.12, ease });
  animate(".hero-visual", { opacity: [0, 1], scale: [0.94, 1], y: [22, 0] }, { duration: 1.15, delay: 0.25, ease });

  // Scroll-triggered reveals: stagger groups, blur-to-sharp, and lift.
  inView(".bento-grid", (grid) => {
    const cards = grid.querySelectorAll(".bento-card");
    animate(cards, {
      opacity: [0, 1], y: [48, 0], rotateX: [7, 0], scale: [0.97, 1],
    }, { duration: 0.85, delay: stagger(0.12), ease });
    return () => animate(cards, {
      opacity: 0, y: 26, rotateX: -4, scale: 0.985,
    }, { duration: 0.38, delay: stagger(0.035), ease: "easeIn" });
  });

  inView(".reveal, .reveal-card:not(.bento-card)", (element) => {
    animate(element, {
      opacity: [0, 1], y: [30, 0], filter: ["blur(5px)", "blur(0px)"],
    }, { duration: 0.8, ease });
    return () => animate(element, {
      opacity: 0, y: 18, filter: "blur(3px)",
    }, { duration: 0.32, ease: "easeIn" });
  });

  inView(".reel-card", (card) => {
    animate(card, { opacity: [0, 1], y: [42, 0], rotate: [2, 0] }, { duration: 0.75, ease });
    return () => animate(card, { opacity: 0, y: 24, rotate: -1 }, { duration: 0.32, ease: "easeIn" });
  });

  const hero = document.querySelector(".hero");
  if (hero) {
    // Different travel distances create layered depth as the hero passes.
    scroll(animate(".image-frame", { y: [-24, 86], scale: [1.02, 1.09] }, { ease: "linear" }), {
      target: hero, offset: ["start end", "end start"],
    });
    scroll(animate(".chip-top", { y: [58, -74], rotate: [-5, 5] }, { ease: "linear" }), {
      target: hero, offset: ["start end", "end start"],
    });
    scroll(animate(".chip-bottom", { y: [72, -44] }, { ease: "linear" }), {
      target: hero, offset: ["start end", "end start"],
    });
    scroll(animate(".hero-waves", { y: [-48, 116], x: [25, -28] }, { ease: "linear" }), {
      target: hero, offset: ["start end", "end start"],
    });
    scroll(animate(".ticker", { y: [28, -22], rotate: [-1.4, 0.8] }, { ease: "linear" }), {
      target: hero, offset: ["start end", "end start"],
    });
    scroll(animate(".orbit-one svg", { rotate: [-110, 110] }, { ease: "linear" }), {
      target: hero, offset: ["start end", "end start"],
    });
  }

  const profile = document.querySelector(".profile-section");
  if (profile) {
    scroll(animate(".profile-image-wrap img", { y: [34, -34], scale: [1.06, 1.13] }, { ease: "linear" }), {
      target: profile, offset: ["start end", "end start"],
    });
    scroll(animate(".profile-stamp", { y: [58, -54], rotate: [15, -9] }, { ease: "linear" }), {
      target: profile, offset: ["start end", "end start"],
    });
  }

  // Reading progress and continuous text drift are linked to page scroll.
  scroll(animate(".page-progress i", { scaleX: [0, 1] }, { ease: "linear" }));
  const ticker = document.querySelector(".ticker");
  if (ticker) {
    scroll(animate(".ticker-track", { x: ["0%", "-42%"] }, { ease: "linear" }), {
      target: ticker, offset: ["start end", "end start"],
    });
  }
  const intro = document.querySelector(".intro-section");
  if (intro) {
    scroll(animate(".loop-type", { x: [-14, 14], rotate: [-0.8, 0.8] }, { ease: "linear" }), {
      target: intro, offset: ["start end", "end start"],
    });
  }

  const contact = document.querySelector(".contact-section");
  if (contact) {
    scroll(animate(".contact-orbit svg", { rotate: [-90, 180] }, { ease: "linear" }), {
      target: contact, offset: ["start end", "end start"],
    });
  }

  // Spring hover and press feedback for cards and calls to action.
  document.querySelectorAll(".bento-card, .reel-card").forEach((card) => {
    card.addEventListener("pointerenter", () => animate(card, {
      y: -7, scale: 1.018, rotateY: card.matches(".bento-card") ? -1.2 : 0,
    }, { type: "spring", stiffness: 230, damping: 18 }));
    card.addEventListener("pointerleave", () => animate(card, {
      y: 0, scale: 1, rotateY: 0,
    }, { type: "spring", stiffness: 230, damping: 20 }));
  });

  document.querySelectorAll(".magnetic").forEach((button) => {
    button.addEventListener("pointermove", (event) => {
      const rect = button.getBoundingClientRect();
      animate(button, {
        x: (event.clientX - rect.left - rect.width / 2) * 0.1,
        y: (event.clientY - rect.top - rect.height / 2) * 0.12,
      }, { type: "spring", stiffness: 180, damping: 14 });
    });
    button.addEventListener("pointerleave", () => animate(button, { x: 0, y: 0 }, {
      type: "spring", stiffness: 220, damping: 16,
    }));
    button.addEventListener("pointerdown", () => animate(button, { scale: 0.96 }, {
      type: "spring", stiffness: 420, damping: 16,
    }));
    button.addEventListener("pointerup", () => animate(button, { scale: 1 }, {
      type: "spring", stiffness: 420, damping: 16,
    }));
  });

  // Tilt inside the hero photo adds depth without moving its scroll layer.
  const heroVisual = document.querySelector(".hero-visual");
  const heroPhoto = document.querySelector(".image-frame img");
  heroVisual?.addEventListener("pointermove", (event) => {
    if (event.pointerType !== "mouse" || !heroPhoto) return;
    const rect = heroVisual.getBoundingClientRect();
    const px = (event.clientX - rect.left) / rect.width - 0.5;
    const py = (event.clientY - rect.top) / rect.height - 0.5;
    animate(heroPhoto, { rotateY: px * 5, rotateX: py * -4, scale: 1.045 }, {
      type: "spring", stiffness: 120, damping: 18,
    });
  });
  heroVisual?.addEventListener("pointerleave", () => {
    if (heroPhoto) animate(heroPhoto, { rotateX: 0, rotateY: 0, scale: 1.03 }, {
      type: "spring", stiffness: 120, damping: 18,
    });
  });

  // Animate the mobile menu in as a staggered spring cascade.
  const menu = document.querySelector(".menu-toggle");
  const nav = document.querySelector(".nav-links");
  menu?.addEventListener("click", () => {
    requestAnimationFrame(() => {
      if (!nav?.classList.contains("open")) return;
      animate(nav.querySelectorAll("a"), { opacity: [0, 1], x: [18, 0] }, {
        duration: 0.38, delay: stagger(0.06), ease,
      });
    });
  });

  // Let the carousel coast briefly after a quick drag, then settle naturally.
  const reel = document.querySelector(".reel-track");
  let dragX = 0;
  let dragTime = 0;
  let velocity = 0;
  let momentum;
  reel?.addEventListener("pointerdown", (event) => {
    momentum?.stop();
    dragX = event.clientX;
    dragTime = performance.now();
    velocity = 0;
  });
  reel?.addEventListener("pointermove", (event) => {
    const now = performance.now();
    const elapsed = Math.max(1, now - dragTime);
    velocity = (event.clientX - dragX) / elapsed;
    dragX = event.clientX;
    dragTime = now;
  });
  reel?.addEventListener("pointerup", () => {
    if (!reel || Math.abs(velocity) < 0.16) return;
    const from = reel.scrollLeft;
    const to = Math.max(0, Math.min(reel.scrollWidth - reel.clientWidth, from - velocity * 240));
    const value = { scrollLeft: from };
    momentum = animate(value, { scrollLeft: to }, {
      type: "spring", stiffness: 70, damping: 22,
      onUpdate: (latest) => { reel.scrollLeft = latest.scrollLeft; },
    });
  });

}
