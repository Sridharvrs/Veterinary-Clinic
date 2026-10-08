/* ============================================================
   DASHBOARD SHARED JS
   sidebar toggle, module switching, logout modal, count-up
   ============================================================ */

function initDashboard(roleLabel) {
  const sidebar = document.getElementById('dashSidebar');
  const toggle = document.getElementById('tbToggle');
  const overlay = document.getElementById('sbOverlay');
  const navItems = document.querySelectorAll('.sb-nav-item');
  const modules = document.querySelectorAll('.module');
  const tbTitle = document.getElementById('tbTitle');
  const logoutBtns = document.querySelectorAll('[data-logout]');
  const logoutModal = document.getElementById('logoutModal');
  const logoutCancel = document.getElementById('logoutCancel');
  const logoutConfirm = document.getElementById('logoutConfirm');

  // sidebar toggle (mobile)
  const openSidebar = () => { sidebar.classList.add('open'); overlay.classList.add('show'); toggle.classList.add('open'); };
  const closeSidebar = () => { sidebar.classList.remove('open'); overlay.classList.remove('show'); toggle.classList.remove('open'); };
  toggle.addEventListener('click', () => sidebar.classList.contains('open') ? closeSidebar() : openSidebar());
  overlay.addEventListener('click', closeSidebar);

  // module switching
  navItems.forEach(item => {
    item.addEventListener('click', () => {
      const target = item.dataset.module;
      navItems.forEach(n => n.classList.remove('active'));
      item.classList.add('active');
      modules.forEach(m => m.classList.remove('active'));
      const mod = document.getElementById('mod-' + target);
      if (mod) { mod.classList.add('active'); tbTitle.textContent = item.dataset.title; }
      // scroll content to top
      window.scrollTo({ top: 0, behavior: 'smooth' });
      if (window.innerWidth <= 980) closeSidebar();
      // trigger count-up in newly visible module
      triggerCountUp(mod);
    });
  });

  // logout modal
  logoutBtns.forEach(btn => btn.addEventListener('click', () => logoutModal.classList.add('open')));
  logoutCancel.addEventListener('click', () => logoutModal.classList.remove('open'));
  logoutConfirm.addEventListener('click', () => { window.location.href = 'login.html'; });
  logoutModal.addEventListener('click', e => { if (e.target === logoutModal) logoutModal.classList.remove('open'); });
  window.addEventListener('keydown', e => { if (e.key === 'Escape') { logoutModal.classList.remove('open'); closeSidebar(); } });

  // count-up for initially visible module
  triggerCountUp(document.querySelector('.module.active'));

  // set topbar title from active nav
  const activeNav = document.querySelector('.sb-nav-item.active');
  if (activeNav && tbTitle) tbTitle.textContent = activeNav.dataset.title;
}

function triggerCountUp(scope) {
  if (!scope) return;
  const els = scope.querySelectorAll('[data-count]');
  els.forEach(el => {
    const target = parseInt(el.dataset.count, 10);
    if (el.dataset.done) return;
    el.dataset.done = '1';
    const dur = 1500;
    const start = performance.now();
    const step = (now) => {
      const p = Math.min((now - start) / dur, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      const val = Math.round(target * eased);
      el.textContent = val.toLocaleString() + (el.dataset.suffix || '');
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  });
}

// animate progress bars when module becomes visible
function animateProgress(scope) {
  if (!scope) return;
  scope.querySelectorAll('.progress-fill').forEach(bar => {
    const w = bar.dataset.width;
    if (w) { bar.style.width = '0'; setTimeout(() => bar.style.width = w, 100); }
  });
}
