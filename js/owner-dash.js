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

/* PET OWNER DASHBOARD — module-specific interactions */
document.addEventListener('DOMContentLoaded', () => {
  initDashboard('Pet Owner');

  // animate progress bars on initial load
  animateProgress(document.querySelector('.module.active'));

  // re-animate progress bars when switching modules
  const navItems = document.querySelectorAll('.sb-nav-item');
  navItems.forEach(item => {
    item.addEventListener('click', () => {
      setTimeout(() => {
        const active = document.querySelector('.module.active');
        animateProgress(active);
        triggerCountUp(active);
      }, 100);
    });
  });

  // data-jump links (from overview to other modules)
  document.querySelectorAll('[data-jump]').forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const target = link.dataset.jump;
      const nav = document.querySelector(`.sb-nav-item[data-module="${target}"]`);
      if (nav) nav.click();
    });
  });

  // appointment tabs
  const apTabs = document.querySelectorAll('.ap-tab');
  const apPanes = document.querySelectorAll('.ap-pane');
  apTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      apTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      apPanes.forEach(p => p.classList.remove('active'));
      document.querySelector(`.ap-pane[data-pane="${tab.dataset.tab}"]`).classList.add('active');
    });
  });

  // records pet tabs (switch vitals + timeline)
  const recTabs = document.querySelectorAll('.rpt');
  recTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      recTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      const pet = tab.dataset.pet;
      document.getElementById('vitalsBruno').style.display = pet === 'bruno' ? 'block' : 'none';
      document.getElementById('vitalsMisty').style.display = pet === 'misty' ? 'block' : 'none';
    });
  });

  // add pet modal
  const addPetBtn = document.getElementById('addPetBtn');
  const addPetModal = document.getElementById('addPetModal');
  const addPetClose = document.getElementById('addPetClose');
  const addPetForm = document.getElementById('addPetForm');
  const addPetOk = document.getElementById('addPetOk');
  addPetBtn.addEventListener('click', () => addPetModal.classList.add('open'));
  addPetClose.addEventListener('click', () => addPetModal.classList.remove('open'));
  addPetModal.addEventListener('click', e => { if (e.target === addPetModal) addPetModal.classList.remove('open'); });
  addPetForm.addEventListener('submit', e => {
    e.preventDefault();
    addPetOk.classList.add('show');
    setTimeout(() => { addPetForm.reset(); addPetOk.classList.remove('show'); addPetModal.classList.remove('open'); }, 1500);
  });

  // book form
  const bookForm = document.getElementById('bookForm');
  const bookOk = document.getElementById('bookOk');
  bookForm.addEventListener('submit', e => {
    e.preventDefault();
    bookOk.classList.add('show');
    setTimeout(() => { bookForm.reset(); bookOk.classList.remove('show'); }, 3000);
  });
});
