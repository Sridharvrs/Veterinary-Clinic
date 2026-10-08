/* ABOUT PAGE — count-up stats */
document.addEventListener('DOMContentLoaded', () => {
  initShared('about.html');
  const obs = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) { countUp(e.target, parseInt(e.target.dataset.count,10)); obs.unobserve(e.target); }
    });
  }, { threshold: 0.5 });
  document.querySelectorAll('.as-num').forEach(el => obs.observe(el));
});
