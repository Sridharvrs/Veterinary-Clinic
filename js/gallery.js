/* GALLERY PAGE — filter + lightbox + count-up */
document.addEventListener('DOMContentLoaded', () => {
  initShared('gallery.html');

  // filter
  const tabs = document.querySelectorAll('.gtab');
  const items = document.querySelectorAll('.gal-item');
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      const f = tab.dataset.filter;
      items.forEach(it => {
        const show = (f === 'all' || it.dataset.cat === f);
        it.classList.toggle('hide', !show);
      });
    });
  });

  // lightbox
  const lb = document.getElementById('lightbox');
  const lbImg = document.getElementById('lbImg');
  const lbCap = document.getElementById('lbCap');
  const visible = () => Array.from(items).filter(i => !i.classList.contains('hide'));
  let current = 0;

  function openLb(item) {
    const list = visible();
    current = list.indexOf(item);
    showLb();
    lb.classList.add('open');
    document.body.style.overflow = 'hidden';
  }
  function showLb() {
    const list = visible();
    const it = list[current];
    lbImg.src = it.querySelector('img').src.replace('h=','h=900&').replace('w=','w=900&');
    const cap = it.querySelector('figcaption');
    lbCap.textContent = cap ? cap.firstChild.textContent.trim() : '';
  }
  function closeLb() { lb.classList.remove('open'); document.body.style.overflow = ''; }
  function nav(d) { const list = visible(); current = (current + d + list.length) % list.length; showLb(); }

  items.forEach(it => it.addEventListener('click', () => openLb(it)));
  document.getElementById('lbClose').addEventListener('click', closeLb);
  document.getElementById('lbPrev').addEventListener('click', () => nav(-1));
  document.getElementById('lbNext').addEventListener('click', () => nav(1));
  lb.addEventListener('click', e => { if (e.target === lb) closeLb(); });
  window.addEventListener('keydown', e => {
    if (!lb.classList.contains('open')) return;
    if (e.key === 'Escape') closeLb();
    if (e.key === 'ArrowLeft') nav(-1);
    if (e.key === 'ArrowRight') nav(1);
  });

  // count-up
  const obs = new IntersectionObserver((entries) => {
    entries.forEach(e => { if (e.isIntersecting) { countUp(e.target, parseInt(e.target.dataset.count,10)); obs.unobserve(e.target); } });
  }, { threshold: 0.5 });
  document.querySelectorAll('.gs strong').forEach(el => obs.observe(el));
});
