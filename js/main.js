// PointRange Systems: mobile menu toggle + Formspree AJAX submit. No dependencies.
(function () {
  'use strict';

  // ----- Mobile menu -----
  var toggle = document.querySelector('.nav-toggle');
  var menu = document.getElementById('primary-nav');
  if (toggle && menu) {
    var setOpen = function (open) {
      menu.classList.toggle('open', open);
      toggle.setAttribute('aria-expanded', String(open));
      toggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    };
    toggle.addEventListener('click', function () {
      setOpen(toggle.getAttribute('aria-expanded') !== 'true');
    });
    menu.addEventListener('click', function (e) {
      if (e.target.closest('a')) setOpen(false);
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && toggle.getAttribute('aria-expanded') === 'true') {
        setOpen(false);
        toggle.focus();
      }
    });
  }

  // ----- Footer year -----
  var year = document.getElementById('year');
  if (year) year.textContent = new Date().getFullYear();

  // ----- Contact form (falls back to a normal POST if this script does not run) -----
  var form = document.getElementById('contact-form');
  var msg = document.getElementById('form-msg');
  if (!form || !msg || !window.fetch) return;

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    msg.className = 'form-msg';
    msg.textContent = '';
    if (!form.checkValidity()) { form.reportValidity(); return; }

    var button = form.querySelector('button[type="submit"]');
    button.disabled = true;
    button.textContent = 'Sending\u2026';

    fetch(form.action, { method: 'POST', body: new FormData(form), headers: { Accept: 'application/json' } })
      .then(function (res) {
        if (!res.ok) throw new Error('Form service returned ' + res.status);
        form.reset();
        msg.textContent = "Thanks! Your message is on its way. We'll be in touch soon.";
        msg.className = 'form-msg ok';
      })
      .catch(function () {
        msg.innerHTML = 'Something went wrong sending your message. Please email us directly at <a href="mailto:info@pointrangesystems.com">info@pointrangesystems.com</a>.';
        msg.className = 'form-msg err';
      })
      .then(function () {
        button.disabled = false;
        button.textContent = 'Send Message';
      });
  });
})();
