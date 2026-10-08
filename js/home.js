/* HOME PAGE — count-up stats on view */
document.addEventListener('DOMContentLoaded', () => {
  initShared('index.html');

  const statObs = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        const el = e.target;
        const target = parseInt(el.dataset.count, 10);
        const suffix = el.textContent.includes('+') ? '+' : '';
        countUp(el, target);
        statObs.unobserve(el);
      }
    });
  }, { threshold: 0.5 });
  document.querySelectorAll('.stat-num').forEach(el => statObs.observe(el));
});
