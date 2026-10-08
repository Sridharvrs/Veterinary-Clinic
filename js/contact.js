/* CONTACT PAGE — booking form + newsletter validation */
document.addEventListener('DOMContentLoaded', () => {
  initShared('contact.html');

  // booking form
  const form = document.getElementById('bookingForm');
  const ok = document.getElementById('formSuccess');
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    ok.classList.add('show');
    form.querySelectorAll('input,select,textarea,button').forEach(el => el.blur());
    ok.scrollIntoView({ behavior: 'smooth', block: 'center' });
    setTimeout(() => { form.reset(); }, 600);
  });

  // newsletter
  const nl = document.getElementById('nlForm');
  const nlOk = document.getElementById('nlOk');
  nl.addEventListener('submit', (e) => {
    e.preventDefault();
    nlOk.classList.add('show');
    nl.reset();
    setTimeout(() => nlOk.classList.remove('show'), 4000);
  });

  // set min date to today
  const dateField = form.querySelector('input[name="date"]');
  if (dateField) {
    const today = new Date().toISOString().split('T')[0];
    dateField.min = today;
  }
});
