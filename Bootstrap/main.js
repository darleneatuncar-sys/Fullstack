document.addEventListener('DOMContentLoaded', function () {

    // Cerrar el menú hamburguesa al hacer clic en un enlace (móvil)
    document.querySelectorAll('.navbar-nav .nav-link').forEach(function (link) {
        link.addEventListener('click', function () {
            if (window.innerWidth <= 991.98) {
                var collapse = document.getElementById('navbarPrincipal');
                if (collapse && collapse.classList.contains('show')) {
                    var bsCollapse = bootstrap.Collapse.getInstance(collapse);
                    if (bsCollapse) bsCollapse.hide();
                }
            }
        });
    });

    // Navbar transparente sobre el hero: fondo sólido al llegar al borde superior
    var heroNav = document.querySelector('.navbar-hero');
    if (heroNav) {
        var heroNavTop = heroNav.getBoundingClientRect().top + window.scrollY;
        var actualizarHeroNav = function () {
            heroNav.classList.toggle('scrolled', window.scrollY > heroNavTop);
        };
        actualizarHeroNav();
        window.addEventListener('scroll', actualizarHeroNav, { passive: true });
        window.addEventListener('resize', function () {
            heroNav.classList.remove('scrolled');
            heroNavTop = heroNav.getBoundingClientRect().top + window.scrollY;
            actualizarHeroNav();
        });
    }

    // IntersectionObserver para animaciones fade-in
    var fadeElements = document.querySelectorAll('.fade-in');
    if (fadeElements.length > 0 && 'IntersectionObserver' in window) {
        var observer = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -40px 0px'
        });

        fadeElements.forEach(function (el) {
            observer.observe(el);
        });
    } else {
        // Fallback: mostrar todos los elementos si IntersectionObserver no está disponible
        fadeElements.forEach(function (el) {
            el.classList.add('visible');
        });
    }

    // Smooth scroll para enlaces internos con #
    document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
        anchor.addEventListener('click', function (e) {
            var targetId = this.getAttribute('href');
            if (targetId.length > 1) {
                var target = document.querySelector(targetId);
                if (target) {
                    e.preventDefault();
                    var navbarHeight = document.querySelector('.navbar-undc').offsetHeight;
                    var topBarHeight = document.querySelector('.barra-info') ? document.querySelector('.barra-info').offsetHeight : 0;
                    var offset = navbarHeight + topBarHeight + 16;
                    var targetPosition = target.getBoundingClientRect().top + window.pageYOffset - offset;
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

    // Navbar sobre el encabezado (páginas internas): transparente arriba, sólido al bajar
    var navbarInterno = document.querySelector('.navbar-undc:not(.navbar-hero)');
    var encabezadoInterno = document.querySelector('.page-header');
    if (navbarInterno) {
        var ajustarEncabezado = function () {
            if (!encabezadoInterno) return;
            var h = navbarInterno.offsetHeight;
            encabezadoInterno.style.marginTop = '-' + h + 'px';
            encabezadoInterno.style.paddingTop = (h + 32) + 'px';
        };

        var actualizarNavbarInterno = function () {
            navbarInterno.classList.toggle('scrolled-solido', window.scrollY > 10);
        };

        ajustarEncabezado();
        actualizarNavbarInterno();
        window.addEventListener('scroll', actualizarNavbarInterno, { passive: true });
        window.addEventListener('resize', function () {
            navbarInterno.classList.remove('scrolled-solido');
            ajustarEncabezado();
        });
    }

});