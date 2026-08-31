/*
 * Centralized site behavior (single file for easier maintenance):
 * 1) Redirect query fallback handling
 * 2) Early theme initialization to avoid flash
 * 3) Theme toggle + persistence
 * 4) Scroll reveal animations
 */
(function () {
  var root = document.documentElement;

  function applyRedirectFallback() {
    var params = new URLSearchParams(window.location.search);
    var redirect = params.get('redirect');
    if (!redirect) return;

    params.delete('redirect');
    var suffix = params.toString();
    var next = redirect + (suffix ? (redirect.includes('?') ? '&' : '?') + suffix : '');
    window.history.replaceState(null, '', next);
  }

  function initializeThemeEarly() {
    var savedTheme = localStorage.getItem('theme');
    var defaultTheme = window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
    var initialTheme = savedTheme || defaultTheme;
    root.setAttribute('data-theme', initialTheme);
    return initialTheme;
  }

  function updateThemeMeta(mode) {
    var themeColor = mode === 'light' ? '#f8fafc' : '#060d1d';
    var meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.setAttribute('content', themeColor);
  }

  function syncThemeToggleState(button) {
    var mode = root.getAttribute('data-theme') || 'dark';
    button.textContent = mode === 'light' ? '☀️' : '🌙';
    button.setAttribute('aria-label', mode === 'light' ? 'Switch to dark mode' : 'Switch to light mode');
    updateThemeMeta(mode);
  }

  function setupThemeToggle() {
    var button = document.getElementById('theme-toggle');
    if (!button) return;

    syncThemeToggleState(button);

    button.addEventListener('click', function () {
      var current = root.getAttribute('data-theme') || 'dark';
      var next = current === 'dark' ? 'light' : 'dark';
      root.setAttribute('data-theme', next);
      localStorage.setItem('theme', next);
      syncThemeToggleState(button);
    });
  }

  function setupRevealAnimations() {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    var targets = document.querySelectorAll('#root section, #root .terminal-card, #root details, #root .space-y-8 > div');
    if (!targets.length) return;

    targets.forEach(function (element) {
      element.classList.add('reveal-up');
    });

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -2% 0px' });

    targets.forEach(function (element, index) {
      element.style.transitionDelay = (index % 8) * 52 + 'ms';
      observer.observe(element);
    });
  }

  function setupCardParallax() {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    if (window.matchMedia('(max-width: 1024px)').matches) return;

    var cards = document.querySelectorAll('#root .terminal-card');
    if (!cards.length) return;

    cards.forEach(function (card) {
      var rafId = null;

      function reset() {
        card.style.transform = '';
      }

      card.addEventListener('pointermove', function (event) {
        if (rafId) cancelAnimationFrame(rafId);

        rafId = requestAnimationFrame(function () {
          var rect = card.getBoundingClientRect();
          var x = (event.clientX - rect.left) / rect.width;
          var y = (event.clientY - rect.top) / rect.height;
          var rotateY = (x - 0.5) * 7.2;
          var rotateX = (0.5 - y) * 7.2;
          card.style.transform = 'perspective(1200px) rotateX(' + rotateX.toFixed(2) + 'deg) rotateY(' + rotateY.toFixed(2) + 'deg) translateY(-10px) scale(1.02)';
        });
      }, { passive: true });

      card.addEventListener('pointerleave', function () {
        if (rafId) cancelAnimationFrame(rafId);
        reset();
      }, { passive: true });

      card.addEventListener('blur', reset, { passive: true });
    });
  }

  applyRedirectFallback();
  updateThemeMeta(initializeThemeEarly());

  window.addEventListener('load', function () {
    setupThemeToggle();
    setupRevealAnimations();
    setupCardParallax();
  });
})();
