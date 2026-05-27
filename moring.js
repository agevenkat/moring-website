/* Moring.ai · nav dropdown toggle
 * CSS handles desktop hover. JS adds tap-to-toggle for touch devices
 * and click-outside-to-close. Keyboard nav works via :focus-within in CSS. */
(function () {
  function init() {
    var triggers = document.querySelectorAll('.nav-dropdown-trigger');
    if (!triggers.length) return;

    triggers.forEach(function (trigger) {
      trigger.setAttribute('aria-haspopup', 'true');
      trigger.setAttribute('aria-expanded', 'false');

      trigger.addEventListener('click', function (e) {
        e.preventDefault();
        e.stopPropagation();
        var dropdown = trigger.closest('.nav-dropdown');
        var willOpen = !dropdown.classList.contains('open');

        // close all open dropdowns first
        document.querySelectorAll('.nav-dropdown.open').forEach(function (d) {
          d.classList.remove('open');
          var t = d.querySelector('.nav-dropdown-trigger');
          if (t) t.setAttribute('aria-expanded', 'false');
        });

        if (willOpen) {
          dropdown.classList.add('open');
          trigger.setAttribute('aria-expanded', 'true');
        }
      });
    });

    // click outside closes
    document.addEventListener('click', function (e) {
      if (e.target.closest('.nav-dropdown')) return;
      document.querySelectorAll('.nav-dropdown.open').forEach(function (d) {
        d.classList.remove('open');
        var t = d.querySelector('.nav-dropdown-trigger');
        if (t) t.setAttribute('aria-expanded', 'false');
      });
    });

    // escape closes
    document.addEventListener('keydown', function (e) {
      if (e.key !== 'Escape') return;
      document.querySelectorAll('.nav-dropdown.open').forEach(function (d) {
        d.classList.remove('open');
        var t = d.querySelector('.nav-dropdown-trigger');
        if (t) {
          t.setAttribute('aria-expanded', 'false');
          t.focus();
        }
      });
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
