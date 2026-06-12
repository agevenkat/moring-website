/* ============================================================
   moring · chrome.js
   Shared site shell: logo symbol defs, sticky nav (with dropdowns),
   footer, and shared behavior (mobile menu, scroll-reveal).
   Each page sets <body data-page="..."> for active-nav state.
   Page content lives inline in <main> and stays directly editable.
   ============================================================ */
(function () {
  document.documentElement.classList.add('js');

  /* ---- logo symbol defs ---- */
  var SYMBOLS = '<svg width="0" height="0" style="position:absolute" aria-hidden="true">' +
    '<symbol id="m-mark" viewBox="0 0 267 240" fill="currentColor"><g transform="translate(0,-7)">' +
    '<path d="M133.37,223.9c-1.01,0-1.88-.71-2.08-1.7-5.85-28.7-15.23-41.04-22.07-50.04-9.34-12.28-12.92-18.74,0-43.09,22.63-42.65,22.02-114.91,22.02-115.64-.01-1.17.92-2.13,2.1-2.15.01,0,.03,0,.03,0,.01,0,.02,0,.03,0,1.17.01,2.11.97,2.1,2.15,0,.72-.61,72.99,22.02,115.64,12.92,24.36,9.34,30.81,0,43.09-6.84,9-16.22,21.34-22.07,50.04-.2.99-1.07,1.7-2.08,1.7ZM133.37,52.94c-2.56,24.29-8.15,55.04-20.39,78.12-12.2,22.99-8.74,27.54-.38,38.54,6.33,8.32,14.74,19.39,20.77,42.73,6.03-23.34,14.45-34.41,20.77-42.73,8.36-11,11.82-15.55-.38-38.54-12.24-23.07-17.84-53.83-20.39-78.12Z"></path>' +
    '<path d="M133.37,223.9c-.89,0-1.68-.55-1.99-1.38-10.61-28.57-27.68-40.91-40.14-49.92-8.22-5.94-14.71-10.64-15.34-17.73-.59-6.63,4.02-14.49,15.41-26.28,41.03-42.48,39.95-114.41,39.93-115.13-.02-1.17.9-2.14,2.07-2.17h.11c1.17.02,2.1,1,2.07,2.17-.02.72-1.1,72.66,39.93,115.13,11.39,11.8,16,19.65,15.41,26.28-.63,7.1-7.12,11.79-15.34,17.73-12.46,9-29.53,21.34-40.14,49.92-.31.83-1.1,1.38-1.99,1.38ZM133.37,41.41c-3.59,25.61-13.22,63.43-39.01,90.13-10.31,10.67-14.7,17.75-14.24,22.95.46,5.17,5.97,9.16,13.6,14.67,12.16,8.78,28.54,20.63,39.64,46.87,11.1-26.24,27.49-38.08,39.64-46.87,7.63-5.52,13.15-9.5,13.6-14.67.46-5.2-3.93-12.28-14.24-22.95-25.79-26.7-35.42-64.52-39.01-90.13Z"></path>' +
    '<path d="M133.37,223.9c-.74,0-1.42-.38-1.8-1-17.72-28.61-46.35-41.02-67.25-50.07-14.46-6.26-24.91-10.79-25.47-18.46-.5-6.87,6.97-14.43,25.78-26.11C133.02,85.82,131.26,14.2,131.24,13.49c-.04-1.17.87-2.15,2.04-2.2.03,0,.06,0,.09,0,.02,0,.06,0,.09,0,1.17.05,2.09,1.03,2.04,2.2-.02.72-1.79,72.33,66.61,114.77,18.82,11.68,26.29,19.24,25.78,26.11-.56,7.67-11.01,12.19-25.47,18.46-20.9,9.06-49.53,21.46-67.25,50.07-.39.62-1.07,1-1.8,1ZM133.37,34.7c-4.66,25.4-19.5,67.99-66.51,97.17-16.36,10.15-24.14,17.41-23.79,22.2.37,5.11,10.33,9.42,22.93,14.88,20.73,8.98,48.88,21.18,67.37,48.92,18.49-27.75,46.64-39.94,67.37-48.92,12.6-5.46,22.55-9.77,22.93-14.88.35-4.78-7.43-12.04-23.79-22.2-47.01-29.17-61.85-71.77-66.51-97.17Z"></path>' +
    '<path d="M133.37,225.16c-.64,0-1.24-.29-1.64-.78-23.42-28.7-61.27-41.14-88.9-50.23-19.79-6.51-32.87-10.81-33.35-18.72-.43-6.95,9.39-14.5,33.89-26.03C133.54,86.93,131.26,15.48,131.23,14.76c-.05-1.17.85-2.16,2.02-2.22.04,0,.08-.01.12,0,.05,0,.08,0,.12,0,1.17.05,2.07,1.05,2.02,2.22-.03.72-2.31,72.17,87.87,114.64,24.49,11.53,34.31,19.08,33.88,26.03-.48,7.92-13.56,12.22-33.35,18.72-27.63,9.09-65.47,21.53-88.9,50.23-.4.49-1,.78-1.64.78ZM133.3,33.36c-5.41,25.06-24.08,69.71-88.13,99.87-21.16,9.96-31.74,17.34-31.46,21.93.31,5.04,14.27,9.64,30.44,14.95,27.5,9.05,64.94,21.35,89.21,49.62,24.28-28.26,61.71-40.57,89.21-49.62,16.17-5.31,30.13-9.91,30.44-14.95.28-4.59-10.3-11.97-31.46-21.93-48.45-22.81-70.41-53.78-80.32-75.73-4.09-9.07-6.52-17.33-7.96-24.13Z"></path>' +
    '<path d="M133.44,74.63c0,73.44-6.48,79.92-79.92,79.92,71.4,0,79.51,2.14,79.9,69.73h.04c.4-67.6,8.5-69.73,79.9-69.73-73.44,0-79.92-6.48-79.92-79.92Z"></path>' +
    '</g></symbol>' +
    '<symbol id="m-word" viewBox="0 0 782 214" fill="currentColor"><g transform="translate(-288,-36)">' +
    '<path d="M291.03,208.1v-125.85h20.82l.95,28.39-2.6-.71c1.58-9.62,4.69-17.11,9.35-22.47,4.65-5.36,10.53-8.04,17.63-8.04,7.57,0,13.28,2.68,17.15,8.04,3.86,5.36,6.27,13.33,7.21,23.89h-2.6c1.42-10.09,4.65-17.94,9.7-23.54,5.04-5.6,11.35-8.39,18.93-8.39,9.94,0,17.15,3.43,21.65,10.29,4.49,6.86,6.74,18.02,6.74,33.47v84.93h-23.18v-80.91c0-10.09-1.07-17.11-3.19-21.05-2.13-3.94-5.41-5.92-9.82-5.92-2.84,0-5.41.95-7.69,2.84-2.29,1.89-4.06,4.85-5.32,8.87-1.27,4.02-1.89,9.27-1.89,15.73v80.43h-22.71v-80.91c0-9.77-.99-16.71-2.96-20.82-1.97-4.1-5.24-6.15-9.82-6.15-3,0-5.6.95-7.8,2.84-2.21,1.89-3.99,4.85-5.32,8.87-1.34,4.02-2.01,9.27-2.01,15.73v80.43h-23.18Z"></path>' +
    '<path d="M493.24,210.94c-11.67,0-21.89-2.68-30.64-8.05-8.75-5.36-15.54-13.01-20.34-22.95-4.82-9.94-7.22-21.53-7.22-34.77s2.4-25.04,7.22-34.9c4.81-9.86,11.59-17.46,20.34-22.83,8.75-5.36,18.96-8.04,30.64-8.04s21.88,2.68,30.63,8.04c8.76,5.36,15.53,12.97,20.35,22.83,4.81,9.86,7.21,21.49,7.21,34.9s-2.41,24.84-7.21,34.77c-4.82,9.94-11.59,17.59-20.35,22.95-8.75,5.36-18.96,8.05-30.63,8.05ZM493.24,188.93c10.56,0,18.73-3.86,24.48-11.59,5.75-7.72,8.63-18.45,8.63-32.17s-2.88-24.45-8.63-32.17c-5.76-7.73-13.92-11.59-24.48-11.59s-18.73,3.86-24.49,11.59c-5.76,7.73-8.63,18.45-8.63,32.17s2.87,24.45,8.63,32.17c5.76,7.73,13.92,11.59,24.49,11.59Z"></path>' +
    '<path d="M560.15,102.35v-20.11h45.42v20.11h-45.42ZM560.15,208.1v-20.11h95.1v20.11h-95.1ZM592.08,208.1v-125.85h18.93l2.13,32.17-2.13-.24c1.58-10.88,4.97-18.93,10.17-24.13,5.2-5.21,12.38-7.81,21.52-7.81h26.73v20.82h-25.79c-6,0-11.04,1.15-15.14,3.43-4.11,2.28-7.22,5.68-9.35,10.17-2.13,4.5-3.19,10.06-3.19,16.68v74.75h-23.89Z"></path>' +
    '<path d="M689.31,208.1v-20.11h115.45v20.11h-115.45ZM691.67,102.35v-20.11h68.84v20.11h-68.84ZM737.1,64.03v-24.84h24.6v24.84h-24.6ZM738.51,208.1v-125.85h24.13v125.85h-24.13Z"></path>' +
    '<path d="M821.31,208.1v-125.85h22l.71,32.88-2.6-1.89c1.57-7.72,4.37-14.07,8.39-19.04,4.02-4.97,8.95-8.68,14.79-11.12,5.83-2.44,12.07-3.66,18.69-3.66,9.46,0,17.27,2.09,23.42,6.27,6.15,4.18,10.8,9.86,13.96,17.03,3.15,7.18,4.73,15.26,4.73,24.25v81.14h-23.89v-74.99c0-10.88-2.09-19.08-6.27-24.6-4.18-5.52-10.45-8.28-18.81-8.28-5.84,0-11.08,1.27-15.73,3.79-4.65,2.52-8.4,6.27-11.24,11.24-2.84,4.97-4.26,11.08-4.26,18.34v74.52h-23.89Z"></path>' +
    '<path d="M1003.7,246.42c-9.46,0-17.9-1.5-25.32-4.49-7.41-3-13.52-7.26-18.33-12.78-4.82-5.52-8.16-11.91-10.06-19.16l25.07-1.66c1.74,5.2,4.81,9.3,9.23,12.3,4.42,2.99,10.88,4.49,19.4,4.49,10.56,0,18.65-2.21,24.25-6.62,5.6-4.42,8.4-10.96,8.4-19.63v-18.45c-3,6.47-7.69,11.59-14.08,15.38s-13.76,5.68-22.12,5.68c-10.41,0-19.72-2.6-27.91-7.8-8.2-5.21-14.59-12.34-19.16-21.41-4.58-9.07-6.86-19.52-6.86-31.35s2.25-23.03,6.74-32.17c4.5-9.15,10.76-16.32,18.81-21.53,8.05-5.21,17.19-7.8,27.44-7.8,8.83,0,16.6,2.01,23.3,6.03,6.7,4.02,11.55,9.5,14.55,16.44l.24-19.63h22.95v114.97c0,10.57-2.29,19.52-6.86,26.85-4.58,7.33-11.08,12.89-19.52,16.67-8.44,3.79-18.49,5.68-30.16,5.68ZM1003.47,180.18c9.77,0,17.66-3.47,23.66-10.41,5.99-6.94,9.07-16.64,9.23-29.1.15-8.52-1.15-15.73-3.9-21.65-2.76-5.91-6.62-10.45-11.59-13.6s-10.76-4.73-17.39-4.73c-10.25,0-18.18,3.51-23.77,10.53-5.6,7.02-8.4,16.84-8.4,29.45s2.87,22.16,8.63,29.1c5.76,6.94,13.6,10.41,23.54,10.41Z"></path>' +
    '</g></symbol></svg>';

  var LOGO = '<a class="logo" href="index.html" aria-label="moring home">' +
    '<span class="mk"><svg viewBox="0 0 267 240"><use href="#m-mark"/></svg></span>' +
    '<span class="wm"><svg viewBox="0 0 782 214"><use href="#m-word"/></svg></span></a>';

  var page = document.body.getAttribute('data-page') || '';
  var on = function (cond) { return cond ? ' active' : ''; };

  var NAV = '<header class="nav" id="nav"><div class="wrap nav-inner">' + LOGO +
    '<nav class="nav-links" id="navLinks">' +
      '<div class="nav-item' + (page === 'aidlc' || page === 'aiops' ? ' open-active' : '') + '">' +
        '<button class="nav-trigger' + on(page === 'aidlc' || page === 'aiops') + '" aria-expanded="false">Solutions <span class="caret"><svg viewBox="0 0 12 8" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M1 2 L6 6.5 L11 2"/></svg></span></button>' +
        '<div class="nav-menu">' +
          '<a href="aidlc.html"><b>AI-DLC</b><span>AI for software engineering \u00B7 governed agentic SDLC</span></a>' +
          '<a href="aiops.html"><b>AI Ops</b><span>AI for operations \u00B7 correlation, RCA, self-healing</span></a>' +
        '</div></div>' +
      '<a class="nav-link' + on(page === 'platform') + '" href="platform.html">Platform</a>' +
      '<div class="nav-item">' +
        '<button class="nav-trigger' + on(page === 'insurance' || page === 'fintech') + '" aria-expanded="false">Verticals <span class="caret"><svg viewBox="0 0 12 8" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M1 2 L6 6.5 L11 2"/></svg></span></button>' +
        '<div class="nav-menu">' +
          '<a href="insurance.html"><b>Insurance</b><span>Carriers \u00B7 NAIC, MRM, claims &amp; UW agents</span></a>' +
          '<a href="fintech.html"><b>Fintech &amp; Banks</b><span>SR 11-7, FFIEC, regulated agentic adoption</span></a>' +
        '</div></div>' +
      '<div class="nav-item">' +
        '<button class="nav-trigger' + on(page === 'aws' || page === 'anthropic') + '" aria-expanded="false">Partners <span class="caret"><svg viewBox="0 0 12 8" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M1 2 L6 6.5 L11 2"/></svg></span></button>' +
        '<div class="nav-menu">' +
          '<a href="aws.html"><b>AWS</b><span>Bedrock-native, IAM-aware, marketplace-listed</span></a>' +
        '</div></div>' +
      '<a class="nav-link' + on(page === 'about') + '" href="about.html">About</a>' +
    '</nav>' +
    '<div class="nav-actions">' +
      '<a class="btn btn-ink" href="signup.html">Request a workshop</a>' +
      '<button class="nav-toggle" id="navToggle" aria-label="Menu" aria-expanded="false">' +
        '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"><line x1="3" y1="7" x2="21" y2="7"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="17" x2="21" y2="17"/></svg>' +
      '</button></div>' +
    '</div></header>';

  var FOOTER = '<footer class="footer"><div class="wrap">' +
    '<div class="footer-grid">' +
      '<div class="footer-brand">' + LOGO +
        '<p>AI outcomes, delivered. Bespoke AI-DLC and AI Ops for the enterprise.</p></div>' +
      '<div class="footer-col"><h4>Solutions</h4>' +
        '<a href="aidlc.html">AI-DLC \u00B7 Engineering</a><a href="aiops.html">AI Ops \u00B7 Operations</a><a href="platform.html">The moring Platform</a></div>' +
      '<div class="footer-col"><h4>Industries &amp; Partners</h4>' +
        '<a href="insurance.html">Insurance</a><a href="fintech.html">Fintech &amp; Banks</a><a href="aws.html">AWS</a></div>' +
      '<div class="footer-col"><h4>Company</h4>' +
        '<a href="about.html">About</a><a href="signup.html">Request a workshop</a><a href="mailto:nikhil.devlapur@moring.ai">Contact sales</a></div>' +
    '</div>' +
    '<div class="footer-bottom"><span class="c">\u00A9 2026 moring, Inc.</span>' +
      '<a class="footer-li" href="https://www.linkedin.com/company/moring-ai" aria-label="moring on LinkedIn" target="_blank" rel="noopener"><svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M4.98 3.5C4.98 4.88 3.87 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1s2.48 1.12 2.48 2.5zM.2 8h4.6v14H.2V8zm7.5 0h4.4v1.9h.06c.61-1.16 2.1-2.38 4.32-2.38 4.62 0 5.47 3.04 5.47 7v8.48h-4.6v-7.5c0-1.79-.03-4.1-2.5-4.1-2.5 0-2.88 1.95-2.88 3.97V22H7.7V8z"></path></svg></a>' +
      '<span class="m">OUTCOMES, NOT TOOLS, NOT HOURS.</span></div>' +
    '</div></footer>';

  /* ---- inject ---- */
  var main = document.querySelector('main');
  document.body.insertAdjacentHTML('afterbegin', SYMBOLS + NAV);
  if (main) main.insertAdjacentHTML('afterend', FOOTER);
  else document.body.insertAdjacentHTML('beforeend', FOOTER);

  /* ---- sticky nav ---- */
  var nav = document.getElementById('nav');
  var onScroll = function () { nav.classList.toggle('scrolled', window.scrollY > 8); };
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  /* ---- mobile menu ---- */
  var toggle = document.getElementById('navToggle');
  toggle.addEventListener('click', function () {
    var open = nav.classList.toggle('menu-open');
    toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
  });

  /* ---- dropdown triggers (click = mobile accordion; hover handles desktop via CSS) ---- */
  nav.querySelectorAll('.nav-trigger').forEach(function (btn) {
    btn.addEventListener('click', function (e) {
      e.preventDefault();
      var item = btn.closest('.nav-item');
      var wasOpen = item.classList.contains('open');
      nav.querySelectorAll('.nav-item.open').forEach(function (i) { if (i !== item) i.classList.remove('open'); });
      item.classList.toggle('open', !wasOpen);
      btn.setAttribute('aria-expanded', !wasOpen ? 'true' : 'false');
    });
  });
  document.addEventListener('click', function (e) {
    if (!e.target.closest('.nav-item')) nav.querySelectorAll('.nav-item.open').forEach(function (i) { i.classList.remove('open'); });
  });
  // close mobile menu when a real link is tapped
  document.getElementById('navLinks').addEventListener('click', function (e) {
    if (e.target.closest('a')) { nav.classList.remove('menu-open'); toggle.setAttribute('aria-expanded', 'false'); }
  });

  /* ---- scroll reveal (transform-only; capture-safe) ---- */
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) {
          var sibs = [].slice.call(en.target.parentElement.querySelectorAll(':scope > .reveal'));
          var i = Math.max(0, sibs.indexOf(en.target));
          en.target.style.transitionDelay = (i * 70) + 'ms';
          en.target.classList.add('in');
          io.unobserve(en.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });
    document.querySelectorAll('.reveal').forEach(function (el) { io.observe(el); });
  } else {
    document.querySelectorAll('.reveal').forEach(function (el) { el.classList.add('in'); });
  }
})();
