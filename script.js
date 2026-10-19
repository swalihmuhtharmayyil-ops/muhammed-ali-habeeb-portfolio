const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// Gallery position indicator; Motion handles scroll-linked movement and reveals.
const reel = document.querySelector('#reel-track');
const progress = document.querySelector('.reel-progress i');
function updateScrollEffects() {
  if (reel && progress) {
    const max = reel.scrollWidth - reel.clientWidth;
    const amount = max > 0 ? reel.scrollLeft / max : 0;
    progress.style.width = `${18 + amount * 82}%`;
  }
}
window.addEventListener('resize', updateScrollEffects, { passive: true });

// Expandable profile details.
const expandButton = document.querySelector('.expand-trigger');
const expandPanel = document.querySelector('.expand-content');
expandButton?.addEventListener('click', () => {
  const open = expandButton.getAttribute('aria-expanded') !== 'true';
  expandButton.setAttribute('aria-expanded', String(open));
  expandPanel?.classList.toggle('open', open);
});

// Touch, mouse drag, wheel and keyboard all work on the elastic reel.
if (reel) {
  let pointerDown = false;
  let pointerStart = 0;
  let scrollStart = 0;
  reel.addEventListener('pointerdown', (event) => {
    if (event.pointerType === 'mouse' && event.button !== 0) return;
    pointerDown = true;
    pointerStart = event.clientX;
    scrollStart = reel.scrollLeft;
    reel.classList.add('dragging');
    reel.setPointerCapture(event.pointerId);
  });
  reel.addEventListener('pointermove', (event) => {
    if (pointerDown) reel.scrollLeft = scrollStart - (event.clientX - pointerStart) * 1.12;
  });
  const endDrag = () => { pointerDown = false; reel.classList.remove('dragging'); };
  reel.addEventListener('pointerup', endDrag);
  reel.addEventListener('pointercancel', endDrag);
  reel.addEventListener('lostpointercapture', endDrag);
  reel.addEventListener('wheel', (event) => {
    if (Math.abs(event.deltaY) > Math.abs(event.deltaX)) {
      reel.scrollLeft += event.deltaY;
      event.preventDefault();
    }
  }, { passive: false });
  reel.addEventListener('scroll', updateScrollEffects, { passive: true });
  reel.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowRight' || event.key === 'ArrowLeft') {
      event.preventDefault();
      reel.scrollBy({ left: event.key === 'ArrowRight' ? 280 : -280, behavior: reducedMotion ? 'instant' : 'smooth' });
    }
  });
}

// Build text paths so the small labels follow the orbit around each component.
document.querySelectorAll('.orbit, .contact-orbit').forEach((orbit, index) => {
  const label = orbit.querySelector('span')?.textContent.trim();
  if (!label) return;
  const id = `orbit-path-${index}`;
  orbit.innerHTML = `<svg viewBox="0 0 100 100" aria-hidden="true"><defs><path id="${id}" d="M50,50 m-43,0 a43,43 0 1,1 86,0 a43,43 0 1,1 -86,0"/></defs><text><textPath href="#${id}">${label}</textPath></text></svg><i aria-hidden="true">✳</i>`;
});

// Small pull toward the pointer gives the primary actions a soft, springy feel.
if (!reducedMotion && matchMedia('(pointer:fine)').matches) {
  const glow = document.querySelector('.cursor-glow');
  window.addEventListener('pointermove', (event) => {
    if (!glow || event.pointerType !== 'mouse') return;
    glow.style.opacity = '.9';
    glow.style.left = `${event.clientX}px`;
    glow.style.top = `${event.clientY}px`;
  }, { passive: true });
  document.body.addEventListener('pointerleave', () => { if (glow) glow.style.opacity = '0'; });
}

// Compact navigation for mobile.
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');
menuToggle?.addEventListener('click', () => {
  const open = menuToggle.getAttribute('aria-expanded') !== 'true';
  menuToggle.setAttribute('aria-expanded', String(open));
  navLinks?.classList.toggle('open', open);
});
navLinks?.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => {
  menuToggle?.setAttribute('aria-expanded', 'false');
  navLinks.classList.remove('open');
}));

document.querySelector('#year').textContent = new Date().getFullYear();
updateScrollEffects();
