/* ─── NAV SCROLL STATE ─── */
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 20);
}, { passive: true });

/* ─── MOBILE MENU ─── */
const burger  = document.getElementById('burger');
const mobMenu = document.getElementById('mobMenu');

burger.addEventListener('click', () => {
  const open = mobMenu.classList.toggle('open');
  burger.classList.toggle('open', open);
});

function closeMenu() {
  mobMenu.classList.remove('open');
  burger.classList.remove('open');
}

document.addEventListener('click', e => {
  if (!nav.contains(e.target)) closeMenu();
});

/* ─── SCROLL REVEAL ─── */
const revealObs = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
      revealObs.unobserve(e.target);
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -36px 0px' });

document.querySelectorAll('.reveal').forEach(el => revealObs.observe(el));

/* ─── LANGUAGE BAR ANIMATION ─── */
const fills = document.querySelectorAll('.fill');
const barObs = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      fills.forEach(f => { f.style.width = f.dataset.w + '%'; });
      barObs.disconnect();
    }
  });
}, { threshold: 0.3 });

const skillsSec = document.getElementById('skills');
if (skillsSec) barObs.observe(skillsSec);

/* ─── EXPERIENCE TABS ─── */
document.querySelectorAll('.tab').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.tab').forEach(b => b.classList.remove('active'));
    document.querySelectorAll('.tab-pane').forEach(p => p.classList.remove('active'));

    btn.classList.add('active');
    const pane = document.getElementById('tab-' + btn.dataset.tab);
    if (pane) {
      pane.classList.add('active');
      // trigger reveal on newly shown cards
      pane.querySelectorAll('.reveal:not(.visible)').forEach(el => {
        el.classList.add('visible');
      });
    }
  });
});

/* ─── ACTIVE NAV HIGHLIGHT ─── */
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');

new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      navLinks.forEach(a => {
        const active = a.getAttribute('href') === '#' + e.target.id;
        a.style.color = active ? 'var(--ink)' : '';
      });
    }
  });
}, { threshold: 0.45 }).observe || sections.forEach(s =>
  new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        navLinks.forEach(a => {
          a.style.color = a.getAttribute('href') === '#' + e.target.id ? 'var(--ink)' : '';
        });
      }
    });
  }, { threshold: 0.45 }).observe(s)
);

// simpler fallback
const secObs = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (!e.isIntersecting) return;
    navLinks.forEach(a => {
      a.style.color = a.getAttribute('href') === '#' + e.target.id ? 'var(--ink)' : '';
    });
  });
}, { threshold: 0.4 });
sections.forEach(s => secObs.observe(s));
