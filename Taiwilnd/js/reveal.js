/* ===================== REVELAR AL HACER SCROLL =====================
   Da una animación de entrada suave a los elementos que tienen el
   atributo  data-reveal.  Si el navegador no lo soporta, se muestran
   igual (no se oculta nada de forma permanente).
   ================================================================== */

(function () {
  'use strict';

  var elements = document.querySelectorAll('[data-reveal]');
  if (!elements.length) return;

  /* Solo ocultamos los elementos si este JS está activo */
  document.documentElement.classList.add('js-reveal');

  if (!('IntersectionObserver' in window)) {
    elements.forEach(function (el) { el.classList.add('is-visible'); });
    return;
  }

  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  elements.forEach(function (el) { observer.observe(el); });
})();
