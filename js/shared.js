/* ============================================================
   Stackly — shared JS
   header scroll, mobile menu, reveal-on-scroll, footer year
   Used on every page. Page-specific JS files add extra behaviour.
   ============================================================ */

/* ---- Inject shared HEADER + MOBILE MENU + FOOTER ---- */
function buildHeader(activePage) {
  const links = [
    ['index.html',     'Home'],
    ['services.html',  'Services'],
    ['about.html',     'About'],
    ['team.html',      'Our Team'],
    ['gallery.html',   'Gallery'],
    ['contact.html',   'Contact'],
  ];
  const navHTML = links.map(([href,label]) =>
    `<a href="${href}" class="${href===activePage?'active':''}">${label}</a>`
  ).join('');
  const mmHTML = links.map(([href,label]) =>
    `<a href="${href}" class="${href===activePage?'active':''}">${label} <span class="dot"></span></a>`
  ).join('');

  return `
  <header class="site-header" id="siteHeader">
    <div class="container header-inner">
      <a href="index.html" class="brand">
        <img
          src="images/logo.webp"
          alt="Stackly Veterinary Clinic"
          class="brand-logo"
        >
      </a>
      <nav class="nav">${navHTML}</nav>
      <div class="header-cta">
        <a href="contact.html" class="btn btn-primary btn-text">Book a Visit</a>
        <a href="login.html" class="btn btn-coral">Login</a>
        <button class="hamburger" id="hamburger" aria-label="Open menu">
          <span></span><span></span><span></span>
        </button>
      </div>
    </div>
  </header>

  <aside class="mobile-menu" id="mobileMenu">
    <button class="mm-close" id="mmClose" aria-label="Close menu">&times;</button>
    <div class="mm-greet">Welcome to<strong>Stackly</strong></div>
    <nav>${mmHTML}</nav>
    <div class="mm-divider"></div>
    <a href="login.html" class="mm-login">
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"/><polyline points="10 17 15 12 10 7"/><line x1="15" y1="12" x2="3" y2="12"/></svg>
      Login / Sign Up
    </a>
    <div class="mm-foot">Open daily 8am–8pm<br>123 Barkwood Lane, Petville</div>
  </aside>
  <div class="overlay" id="overlay"></div>`;
}

function buildFooter() {
  const year = new Date().getFullYear();
  return `
  <footer class="site-footer">
    <div class="container">
      <div class="footer-grid">
        <div class="footer-brand">
          <a href="index.html" class="brand">
            <img
              src="images/logo.webp"
              alt="Stackly Veterinary Clinic"
              class="brand-logo"
            >
          </a>
          <p>Compassionate, modern veterinary care for every member of your family — furry, feathered, and floppy-eared.</p>
          <div class="footer-social">
            <a href="error.html" aria-label="Instagram">
              <i class="fa-brands fa-instagram"></i>
            </a>

            <a href="error.html" aria-label="Facebook">
              <i class="fa-brands fa-facebook-f"></i>
            </a>

            <a href="error.html" aria-label="X">
              <i class="fa-brands fa-x-twitter"></i>
            </a>

            <a href="error.html" aria-label="WhatsApp">
              <i class="fa-brands fa-whatsapp"></i>
            </a>
          </div>
        </div>
        <div class="footer-col">
          <h4>Care</h4>
          <ul>
            <li><a href="services.html">Wellness Exams</a></li>
            <li><a href="services.html">Surgery</a></li>
            <li><a href="services.html">Dental Care</a></li>
            <li><a href="services.html">Emergency</a></li>
            <li><a href="services.html">Vaccinations</a></li>
          </ul>
        </div>
        <div class="footer-col">
          <h4>Quick Links</h4>
          <ul>
            <li><a href="home.html">Home</a></li>
            <li><a href="services.html">Services</a></li>
            <li><a href="about.html">About</a></li>
            <li><a href="gallery.html">Gallery</a></li>
            <li><a href="contact.html">Contact</a></li>
          </ul>
        </div>
        <div class="footer-col footer-news">
          <h4>Pet Newsletter</h4>
          <p style="color:#9fb5af;font-size:.93rem;margin-bottom:14px;">Seasonal pet health tips, delivered monthly.</p>
          <input type="email" placeholder="your@email.com">
          <button class="btn btn-coral btn-block" onclick="window.location.href = 'error.html'">Subscribe</button>
        </div>
      </div>
      <div class="footer-bottom">
        <span>&copy; ${year} Stackly Veterinary Clinic. All rights reserved.</span>
        <span>Made with care for pets everywhere.</span>
      </div>
    </div>
  </footer>`;
}

/* ---- Initialise shared behaviour ---- */
function initShared(activePage) {
  // inject header + footer
  document.body.insertAdjacentHTML('afterbegin', buildHeader(activePage));
  document.body.insertAdjacentHTML('beforeend', buildFooter());

  // header scroll state
  const header = document.getElementById('siteHeader');
  const onScroll = () => {
    if (window.scrollY > 40) header.classList.add('scrolled');
    else header.classList.remove('scrolled');
  };
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  // mobile menu
  const ham = document.getElementById('hamburger');
  const menu = document.getElementById('mobileMenu');
  const overlay = document.getElementById('overlay');
  const closeBtn = document.getElementById('mmClose');
  const openMenu = () => { menu.classList.add('open'); overlay.classList.add('show'); ham.classList.add('open'); document.body.style.overflow='hidden'; };
  const closeMenu = () => { menu.classList.remove('open'); overlay.classList.remove('show'); ham.classList.remove('open'); document.body.style.overflow=''; };
  ham.addEventListener('click', openMenu);
  closeBtn.addEventListener('click', closeMenu);
  overlay.addEventListener('click', closeMenu);
  menu.querySelectorAll('a').forEach(a => a.addEventListener('click', closeMenu));
  window.addEventListener('keydown', e => { if (e.key === 'Escape') closeMenu(); });

  // reveal on scroll
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
  }, { threshold: 0.14, rootMargin: '0px 0px -40px 0px' });
  document.querySelectorAll('.reveal').forEach(el => io.observe(el));
}

/* ---- tiny helper: animated count up ---- */
function countUp(el, target, dur=1800) {
  const start = performance.now();
  const from = 0;
  const step = (now) => {
    const p = Math.min((now-start)/dur, 1);
    const eased = 1 - Math.pow(1-p, 3);
    el.textContent = Math.round(from + (target-from)*eased).toLocaleString();
    if (p < 1) requestAnimationFrame(step);
  };
  requestAnimationFrame(step);
}
