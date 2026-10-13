/* ===================== CARRUSEL DE EVENTOS =====================
   Sin librerías. Muestra 3 cards en desktop, 2 en tablet y 1 en
   móvil, con botones ← →, indicadores y transición suave.
   ============================================================= */

(function () {
  'use strict';

  var root = document.querySelector('[data-carousel]');
  if (!root) return;

  var track = root.querySelector('[data-carousel-track]');
  if (!track) return;

  var items = Array.prototype.slice.call(track.children);
  var prevBtn = root.querySelector('[data-carousel-prev]');
  var nextBtn = root.querySelector('[data-carousel-next]');
  var dotsWrap = root.querySelector('[data-carousel-dots]');

  var page = 0;

  function perView() {
    var w = window.innerWidth;
    if (w >= 1024) return 3;
    if (w >= 640) return 2;
    return 1;
  }

  function pages() {
    return Math.max(1, Math.ceil(items.length / perView()));
  }

  function render() {
    var total = pages();
    if (page > total - 1) page = total - 1;
    if (page < 0) page = 0;

    /* Cada "página" avanza 100% del ancho visible */
    track.style.transform = 'translateX(-' + page * 100 + '%)';

    /* Indicadores */
    if (dotsWrap) {
      dotsWrap.innerHTML = '';
      for (var i = 0; i < total; i++) {
        (function (index) {
          var dot = document.createElement('button');
          dot.type = 'button';
          dot.setAttribute('aria-label', 'Ir al grupo de eventos ' + (index + 1));
          dot.className =
            'h-2.5 rounded-full transition-all duration-300 ' +
            (index === page
              ? 'w-7 bg-gold-500'
              : 'w-2.5 bg-undc-200 hover:bg-undc-300');
          dot.addEventListener('click', function () {
            page = index;
            render();
          });
          dotsWrap.appendChild(dot);
        })(i);
      }
    }

    /* Botones deshabilitados si solo hay una página */
    var single = total <= 1;
    [prevBtn, nextBtn].forEach(function (btn) {
      if (!btn) return;
      btn.disabled = single;
      btn.classList.toggle('opacity-40', single);
      btn.classList.toggle('cursor-not-allowed', single);
    });
  }

  function go(step) {
    var total = pages();
    page = (page + step + total) % total;
    render();
  }

  if (prevBtn) prevBtn.addEventListener('click', function () { go(-1); });
  if (nextBtn) nextBtn.addEventListener('click', function () { go(1); });

  /* Navegación con teclado sobre el carrusel */
  root.addEventListener('keydown', function (event) {
    if (event.key === 'ArrowLeft') go(-1);
    if (event.key === 'ArrowRight') go(1);
  });

  window.addEventListener('resize', render);
  render();
})();
