const currentUser = JSON.parse(sessionStorage.getItem("currentUser"));

if (currentUser?.name) {
  // Dynamic name
  document.querySelectorAll(".profileName").forEach(element => {
    element.textContent = currentUser.name;
  });

  // First letter for avatar
  const firstLetter = currentUser.name.trim().charAt(0).toUpperCase();

  document.querySelectorAll(".avatar").forEach(element => {
    element.textContent = firstLetter;
  });
}

/* STAFF / VET DASHBOARD — module-specific interactions */
document.addEventListener('DOMContentLoaded', () => {
  initDashboard('Staff');

  // animate progress bars on load + module switch
  animateProgress(document.querySelector('.module.active'));
  document.querySelectorAll('.sb-nav-item').forEach(item => {
    item.addEventListener('click', () => {
      setTimeout(() => {
        const active = document.querySelector('.module.active');
        animateProgress(active);
        triggerCountUp(active);
      }, 100);
    });
  });

  // data-jump from overview to schedule
  document.querySelectorAll('[data-jump]').forEach(link => {
    link.addEventListener('click', e => {
      e.preventDefault();
      const nav = document.querySelector(`.sb-nav-item[data-module="${link.dataset.jump}"]`);
      if (nav) nav.click();
    });
  });

  // patient search + filter
  const search = document.getElementById('patSearch');
  const chips = document.querySelectorAll('.pf-chip');
  const rows = document.querySelectorAll('#patBody tr');
  const empty = document.getElementById('patEmpty');
  let activeFilter = 'all';

  function applyFilters() {
    const term = search.value.toLowerCase().trim();
    let visible = 0;
    rows.forEach(row => {
      const name = row.querySelector('.pat-name').textContent.toLowerCase();
      const owner = row.children[1].textContent.toLowerCase();
      const type = row.dataset.type;
      const matchSearch = !term || name.includes(term) || owner.includes(term);
      const matchFilter = activeFilter === 'all' ||
        (activeFilter === 'dog' && type === 'dog') ||
        (activeFilter === 'cat' && type === 'cat') ||
        (activeFilter === 'other' && type === 'other');
      if (matchSearch && matchFilter) { row.classList.remove('hide'); visible++; }
      else row.classList.add('hide');
    });
    empty.style.display = visible === 0 ? 'block' : 'none';
  }
  search.addEventListener('input', applyFilters);
  chips.forEach(chip => {
    chip.addEventListener('click', () => {
      chips.forEach(c => c.classList.remove('active'));
      chip.classList.add('active');
      activeFilter = chip.dataset.filter;
      applyFilters();
    });
  });

  // schedule tabs
  const schedTabs = document.querySelectorAll('.sched-tab');
  const schedPanes = [
    { id: 'today', el: document.getElementById('schedToday') },
    { id: 'tomorrow', el: document.getElementById('schedTomorrow') },
    { id: 'week', el: document.getElementById('schedWeek') },
  ];
  schedTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      schedTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      schedPanes.forEach(p => p.el.style.display = p.id === tab.dataset.day ? 'flex' : 'none');
    });
  });

  // messages: select message to read
  const msgItems = document.querySelectorAll('.msg-item');
  const msgData = {
    '1': { from: 'Jane Smith', time: '10 min ago', subject: 'Re: Bruno\'s dental prep', body: '<p>Hi Dr. Maya,</p><p>Just confirming — should I fast Bruno from 8pm the night before his dental on Nov 3? He\'s usually very food-motivated so I want to make sure I get the timing right!</p><p>Also, can he have water in the morning?</p><p>Thanks so much,<br>Jane &amp; Bruno 🐕</p>' },
    '2': { from: 'Mark Lee', time: '1 hr ago', subject: 'Whiskers won\'t eat after vaccine', body: '<p>Hi Dr. Chen gave Whiskers his booster this morning and he hasn\'t eaten since (about 4 hours). He\'s drinking water fine and seems alert. Should I be worried or is this normal?</p><p>Thanks,<br>Mark</p>' },
    '3': { from: 'Dr. Liam Chen', time: '2 hrs ago', subject: 'Need Room 2 at 11', body: '<p>Maya — I need Room 2 for the 11:15 rabbit dental. Can you take Room 1 for the Max consultation at 1:00? Let me know. 🩺</p>' },
    '4': { from: 'Priya R.', time: '5 hrs ago', subject: 'Thank you for Cinnamon\'s care!', body: '<p>Just wanted to say a huge thank you to you and the team. Cinnamon is back to her bouncy self after the dental. The fear-free approach made such a difference — she wasn\'t scared at all coming home. 💕🐰</p>' },
    '5': { from: 'James K.', time: 'Yesterday', subject: 'Luna\'s incision looks red', body: '<p>Hi Dr. Hartley, Luna\'s spay incision looks a bit red around the edges tonight. She\'s not licking it (cone is on!) but I wanted to check if this is normal healing or if I should bring her in. Photo attached. Thanks, James.</p>' },
    '6': { from: 'Dr. Noah Fischer', time: 'Yesterday', subject: 'Emergency shift swap request', body: '<p>Maya — I have a family event next Saturday evening. Could someone cover the overnight emergency shift (8pm–8am)? I can take an extra Sunday day shift in return. Let me know. Thanks! 🚑</p>' },
  };
  const mrpFrom = document.getElementById('mrpFrom');
  const mrpTime = document.getElementById('mrpTime');
  const mrpSubject = document.getElementById('mrpSubject');
  const mrpBody = document.getElementById('mrpBody');

  msgItems.forEach(item => {
    item.addEventListener('click', () => {
      msgItems.forEach(m => m.classList.remove('active'));
      item.classList.add('active');
      item.classList.remove('unread');
      const dot = item.querySelector('.msg-dot');
      if (dot) dot.remove();
      const id = item.dataset.msg;
      const d = msgData[id];
      if (d) {
        mrpFrom.textContent = d.from;
        mrpTime.textContent = d.time;
        mrpSubject.textContent = d.subject;
        mrpBody.innerHTML = d.body;
      }
    });
  });

  // mrp close (mobile)
  document.getElementById('mrpClose').addEventListener('click', () => {
    msgItems.forEach(m => m.classList.remove('active'));
  });
});
