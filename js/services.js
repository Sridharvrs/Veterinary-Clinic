/* SERVICES PAGE — filter tabs + FAQ accordion */
document.addEventListener('DOMContentLoaded', () => {
  initShared('services.html');

  // filter tabs
  const tabs = document.querySelectorAll('.ftab');
  const cards = document.querySelectorAll('.service-card');
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      const f = tab.dataset.filter;
      cards.forEach(c => {
        const show = (f === 'all' || c.dataset.cat === f);
        c.classList.toggle('hide', !show);
        if (show) { c.style.animation = 'none'; void c.offsetWidth; c.style.animation = 'cardIn .5s ease both'; }
      });
    });
  });

  // FAQ accordion
  document.querySelectorAll('.faq-q').forEach(q => {
    q.addEventListener('click', () => {
      const item = q.parentElement;
      const wasOpen = item.classList.contains('open');
      document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('open'));
      if (!wasOpen) item.classList.add('open');
    });
  });
});

// keyframes injected
const style = document.createElement('style');
style.textContent = `@keyframes cardIn { from { opacity: 0; transform: scale(.92); } to { opacity: 1; transform: none; } }`;
document.head.appendChild(style);
