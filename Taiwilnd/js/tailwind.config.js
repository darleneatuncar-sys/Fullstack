/* ===================== TEMA TAILWIND =====================
   Configuración compartida por todas las páginas.
   Se carga DESPUÉS del script del CDN de Tailwind.
   Identidad visual UNDC: azul institucional + dorado.
   ========================================================= */

tailwind.config = {
  theme: {
    extend: {
      colors: {
        /* Azul institucional UNDC (#0B1F45 / #122B5C / #173A7A) */
        undc: {
          50: '#eff3fa',
          100: '#dbe4f2',
          200: '#b8c9e6',
          300: '#8ba6d3',
          400: '#5a7cba',
          500: '#2f5499',
          600: '#173A7A',
          700: '#122B5C',
          800: '#0B1F45',
          900: '#081733',
          950: '#050f22'
        },
        /* Amarillo / dorado UNDC (#F5B800 / #FFC400) */
        gold: {
          300: '#ffd968',
          400: '#FFC400',
          500: '#F5B800',
          600: '#d99a00',
          700: '#b57e00'
        },
        /* Gris claro institucional (#F5F7FA) */
        mist: '#F5F7FA'
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif']
      },
      boxShadow: {
        soft: '0 10px 30px -12px rgba(11, 31, 69, 0.25)',
        card: '0 22px 45px -22px rgba(11, 31, 69, 0.35)'
      },
      keyframes: {
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' }
        },
        'slide-down': {
          '0%': { opacity: '0', transform: 'translateY(-10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' }
        },
        'slide-up': {
          '0%': { opacity: '0', transform: 'translateY(18px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' }
        },
        'float-slow': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-14px)' }
        }
      },
      animation: {
        'fade-in': 'fade-in .2s ease-out',
        'slide-down': 'slide-down .25s ease-out',
        'slide-up': 'slide-up .5s ease-out both',
        'float-slow': 'float-slow 7s ease-in-out infinite'
      }
    }
  }
};
