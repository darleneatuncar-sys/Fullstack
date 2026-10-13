/* ===================== NAVEGACIÓN (Navbar / TopBar) =====================
   - Menú móvil (hamburguesa)
   - Acordeones móviles (Universidad / Facultades)
   - Dropdown "Universidad" y mega-dropdown "Facultades" en desktop
     (abren con hover y con click; cierran con click fuera y con Esc)
   Los bloques están protegidos para no romper otras páginas que no
   incluyan estos componentes.
   ====================================================================== */

(function () {
  'use strict';

  var isDesktop = function () {
    return window.matchMedia('(min-width: 1024px)').matches;
  };

  /* ------------------- Menú móvil ------------------- */
  var menuBtn = document.getElementById('menuBtn');
  var mobileMenu = document.getElementById('mobileMenu');

  if (menuBtn && mobileMenu) {
    menuBtn.setAttribute('aria-expanded', 'false');

    menuBtn.addEventListener('click', function () {
      var isOpen = mobileMenu.classList.toggle('hidden') === false;
      menuBtn.setAttribute('aria-expanded', String(isOpen));
    });

    /* Cierra el menú al elegir un enlace */
    mobileMenu.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        mobileMenu.classList.add('hidden');
        menuBtn.setAttribute('aria-expanded', 'false');
      });
    });
  }

  /* ------------------- Acordeones móviles ------------------- */
  var accordions = Array.prototype.slice.call(
    document.querySelectorAll('[data-accordion-trigger]')
  );

  function closeAccordion(trigger) {
    trigger.setAttribute('aria-expanded', 'false');
    var panel = trigger.nextElementSibling;
    if (panel) panel.style.maxHeight = null;
  }

  accordions.forEach(function (trigger) {
    var panel = trigger.nextElementSibling;
    if (!panel) return;
    trigger.setAttribute('aria-expanded', 'false');

    trigger.addEventListener('click', function () {
      var isOpen = trigger.getAttribute('aria-expanded') === 'true';

      /* Solo un acordeón abierto a la vez */
      accordions.forEach(function (t) {
        if (t !== trigger) closeAccordion(t);
      });

      trigger.setAttribute('aria-expanded', String(!isOpen));
      panel.style.maxHeight = isOpen ? null : panel.scrollHeight + 'px';
    });
  });

  /* ------------------- Dropdowns / Mega-dropdown ------------------- */
  var panels = Array.prototype.slice.call(document.querySelectorAll('[data-panel]'));

  function triggerFor(panel) {
    return document.querySelector('[data-panel-trigger="' + panel.dataset.panel + '"]');
  }

  function openPanel(panel) {
    panel.setAttribute('data-open', 'true');
    var t = triggerFor(panel);
    if (t) t.setAttribute('aria-expanded', 'true');
  }

  function closePanel(panel) {
    panel.setAttribute('data-open', 'false');
    var t = triggerFor(panel);
    if (t) t.setAttribute('aria-expanded', 'false');
  }

  function closeAll(except) {
    panels.forEach(function (p) {
      if (p !== except) closePanel(p);
    });
  }

  var closeTimer = null;

  panels.forEach(function (panel) {
    var trigger = triggerFor(panel);

    if (trigger) {
      trigger.addEventListener('click', function (event) {
        event.preventDefault();
        var isOpen = panel.getAttribute('data-open') === 'true';
        closeAll(panel);
        if (isOpen) closePanel(panel);
        else openPanel(panel);
      });

      /* Hover en desktop (con pequeño retardo para poder bajar al panel) */
      trigger.addEventListener('mouseenter', function () {
        if (!isDesktop()) return;
        window.clearTimeout(closeTimer);
        closeAll(panel);
        openPanel(panel);
      });
      trigger.addEventListener('mouseleave', function () {
        if (!isDesktop()) return;
        window.clearTimeout(closeTimer);
        closeTimer = window.setTimeout(function () {
          closePanel(panel);
        }, 160);
      });
    }

    panel.addEventListener('mouseenter', function () {
      if (!isDesktop()) return;
      window.clearTimeout(closeTimer);
    });
    panel.addEventListener('mouseleave', function () {
      if (!isDesktop()) return;
      window.clearTimeout(closeTimer);
      closeTimer = window.setTimeout(function () {
        closePanel(panel);
      }, 160);
    });
  });

  /* Cierra al hacer click fuera de la zona de navegación */
  document.addEventListener('click', function (event) {
    if (!event.target.closest('[data-nav-root]')) closeAll(null);
  });

  /* Cierra con la tecla Esc */
  document.addEventListener('keydown', function (event) {
    if (event.key === 'Escape') {
      closeAll(null);
      if (mobileMenu) mobileMenu.classList.add('hidden');
      if (menuBtn) menuBtn.setAttribute('aria-expanded', 'false');
    }
  });

  /* Al volver a móvil, cierra los paneles de desktop */
  window.addEventListener('resize', function () {
    if (!isDesktop()) closeAll(null);
  });
})();
