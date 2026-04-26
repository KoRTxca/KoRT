/* ── Mobile nav toggle ── */
const toggle = document.getElementById('navToggle');
const nav = document.getElementById('nav');
if (toggle && nav) {
  toggle.addEventListener('click', () => nav.classList.toggle('open'));
  document.addEventListener('click', (e) => {
    if (!nav.contains(e.target) && !toggle.contains(e.target)) nav.classList.remove('open');
  });
}

/* ── Active link highlight ── */
const path = window.location.pathname;
document.querySelectorAll('.header-nav a:not(.header-cta)').forEach(a => {
  a.classList.toggle('active', a.getAttribute('href') === path ||
    (path === '/' && a.getAttribute('href') === '/'));
});
