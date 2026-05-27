/* ============================================================
   Moring shared behaviors
   ============================================================ */

(function () {
  'use strict';

  // ─── Workshop bar dismiss ─────────────────────────────────
  var bar = document.getElementById('workshop-bar');
  if (bar) {
    var closeBtn = bar.querySelector('.bar-close');
    var dismissed = false;
    try { dismissed = localStorage.getItem('moring_wsbar_dismissed') === '1'; } catch (e) {}
    if (dismissed) bar.classList.add('is-hidden');
    if (closeBtn) {
      closeBtn.addEventListener('click', function () {
        bar.classList.add('is-hidden');
        try { localStorage.setItem('moring_wsbar_dismissed', '1'); } catch (e) {}
      });
    }
  }

  // ─── Active nav highlight ─────────────────────────────────
  var path = (location.pathname.split('/').pop() || 'index.html').toLowerCase();
  var navLinks = document.querySelectorAll('.site-nav .nav-links a[href]');
  navLinks.forEach(function (a) {
    var href = (a.getAttribute('href') || '').toLowerCase();
    if (href === path) a.classList.add('active');
    if (path === '' && href === 'index.html') a.classList.add('active');
  });

  // ─── Hero stage rotation ──────────────────────────────────
  var stages = document.querySelectorAll('.stage');
  stages.forEach(function (stage) {
    var cards = stage.querySelectorAll('.stage-card');
    if (!cards.length) return;
    var indicator = stage.querySelector('.stage-indicator');
    var dots = indicator ? indicator.querySelectorAll('span') : [];
    var i = 0;
    function tick() {
      cards.forEach(function (c, idx) { c.classList.toggle('is-active', idx === i); });
      dots.forEach(function (d, idx) { d.classList.toggle('is-active', idx === i); });
      i = (i + 1) % cards.length;
    }
    tick();
    setInterval(tick, 5400);
  });

  // ─── Cost simulator (homepage) ────────────────────────────
  var sim = document.getElementById('term-sim');
  if (sim) {
    var input = sim.querySelector('input');
    var output = sim.querySelector('.term-output');
    var modelTier = {
      'gpt-4': { name: 'GPT-4', price: 30 },
      'gpt-4o': { name: 'GPT-4o', price: 5 },
      'gpt-4o-mini': { name: 'GPT-4o mini', price: 0.6 },
      'claude': { name: 'Claude Sonnet', price: 3 },
      'claude-sonnet': { name: 'Claude Sonnet', price: 3 },
      'claude-opus': { name: 'Claude Opus', price: 15 },
      'gemini': { name: 'Gemini Pro', price: 1.25 }
    };

    function parseCmd(cmd) {
      var out = { calls: 5, model: 'claude' };
      var m1 = cmd.match(/--calls\s+(\d+(?:\.\d+)?)([mMkK]?)/);
      if (m1) {
        var n = parseFloat(m1[1]);
        var unit = (m1[2] || '').toLowerCase();
        if (unit === 'k') n = n / 1000;
        out.calls = n;
      }
      var m2 = cmd.match(/--model\s+([a-z0-9\-]+)/i);
      if (m2) {
        var key = m2[1].toLowerCase();
        if (modelTier[key]) out.model = key;
      }
      return out;
    }

    function fmtMoney(n) {
      if (n >= 1000000) return '$' + (n / 1000000).toFixed(2) + 'M';
      if (n >= 1000) return '$' + (n / 1000).toFixed(1) + 'K';
      return '$' + n.toFixed(2);
    }

    function render(cmd) {
      var p = parseCmd(cmd || 'moring estimate --calls 5M --model claude');
      var tier = modelTier[p.model];
      var callsM = p.calls;
      var baseline = callsM * tier.price * 1000;
      var routed = baseline * 0.58;
      var cached = routed * 0.66;
      var governed = cached * 0.69;
      var savings = baseline - governed;
      var pct = Math.round((savings / baseline) * 100);

      var lines = [
        '<p class="out-line out-dim">$ moring estimate --calls ' + callsM + 'M --model ' + p.model + '</p>',
        '<p class="out-line">  <span class="out-key">model</span>          ' + tier.name + '  <span class="out-dim">($' + tier.price.toFixed(2) + ' / 1M input tokens)</span></p>',
        '<p class="out-line">  <span class="out-key">calls</span>          ' + callsM + ' million / month</p>',
        '<p class="out-line out-dim">  ─────────────────────────────────────────────────</p>',
        '<p class="out-line">  <span class="out-key">baseline</span>       <span class="out-num">' + fmtMoney(baseline) + '</span>  <span class="out-dim">no substrate</span></p>',
        '<p class="out-line">  <span class="out-key">+ routing</span>      <span class="out-num">' + fmtMoney(routed) + '</span>  <span class="out-ok">tier-aware model selection</span></p>',
        '<p class="out-line">  <span class="out-key">+ cache</span>        <span class="out-num">' + fmtMoney(cached) + '</span>  <span class="out-ok">semantic cache hits</span></p>',
        '<p class="out-line">  <span class="out-key">+ governance</span>   <span class="out-num">' + fmtMoney(governed) + '</span>  <span class="out-ok">budget gates + FinOps</span></p>',
        '<p class="out-line out-dim">  ─────────────────────────────────────────────────</p>',
        '<p class="out-line">  <span class="out-key">monthly savings</span>  <span class="out-accent">' + fmtMoney(savings) + '</span>  <span class="out-warn">(' + pct + '% reduction)</span></p>',
        '<p class="out-line">  <span class="out-key">annualized</span>      <span class="out-accent">' + fmtMoney(savings * 12) + '</span></p>',
        '<p class="out-line out-dim">  done in 0.27s</p>'
      ];
      output.innerHTML = lines.join('');
    }

    render('moring estimate --calls 5M --model claude');

    if (input) {
      input.addEventListener('keyup', function (e) {
        if (e.key === 'Enter') {
          var v = input.value.trim();
          if (v) render(v);
        }
      });
      input.addEventListener('input', function () {
        var v = input.value.trim();
        if (v.indexOf('moring estimate') === 0) render(v);
      });
    }
  }
})();
