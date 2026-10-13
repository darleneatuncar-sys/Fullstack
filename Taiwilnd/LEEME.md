# UNDC — Sitio web con Tailwind CSS

Réplica/maqueta institucional de la **Universidad Nacional de Cañete** hecha con **Tailwind CSS** (vía CDN, sin build).
El menú tiene solo 3 secciones: **Universidad · Facultades · Posgrado**.

## Estructura

```
Taiwilnd/
├── index.html                    → Página principal (navbar, hero, eventos, footer)
│
├── universidad.html              → Sección Universidad (resumen)
├── resena-historica.html         → Reseña histórica
├── mision-vision.html            → Misión y visión
├── rectorado.html                → Rectorado (autoridades)
├── documentos.html               → Documentos UNDC
│
├── facultades.html               → Sección Facultades (resumen)
├── ciencias-empresariales.html   → Facultad de Ciencias Empresariales
├── ingenieria.html               → Facultad de Ingeniería
├── ciencias-agrarias.html        → Facultad de Ciencias Agrarias
├── posgrado.html                 → Escuela de Posgrado
├── css/
│   └── estilos.css         → Estilos propios (ajustes personalizados)
├── js/
│   ├── main.js             → Navegación: menú móvil, dropdown y mega-dropdown
│   ├── carousel.js         → Carrusel de eventos (sin librerías)
│   └── tailwind.config.js  → Configuración del tema Tailwind (compartida por todas las páginas)
├── public/                 → TODAS las imágenes del sitio van aquí
│   ├── UNDC_logo_transp.png → Logo institucional (navbar)
│   ├── hero1.jpg           → Imagen de portada (hero) del inicio
│   └── evento-1..3.jpg     → Imágenes de las cards de eventos (pendientes)
└── LEEME.md                → Este archivo
```

## Cómo verlo

Solo abre `index.html` en el navegador. No necesita instalar nada (Tailwind se carga por CDN).

> Nota: si más adelante lo subes con un build real, reemplaza el `<script src="https://cdn.tailwindcss.com">`
> por tu CSS compilado de Tailwind.

## Dónde van las imágenes

Todas las imágenes van en `public/`. Cada `<img>` ya está puesto con el nombre correcto:
**solo suelta el archivo con ese nombre y aparece automáticamente.**

Si una imagen falta, se muestra un recuadro gris con el nombre esperado (no se rompe el diseño).

Nombres requeridos:

| Archivo | Dónde se usa |
|---|---|
| `UNDC_logo_transp.png` | Logo en el navbar del inicio |
| `hero1.jpg` | Hero (portada) del inicio |
| `campus.jpg` | Sección "Nosotros" del inicio y encabezado de Universidad |
| `facultad-empresariales.jpg` | Facultad de Ciencias Empresariales |
| `facultad-ingenieria.jpg` | Facultad de Ingeniería |
| `facultad-agrarias.jpg` | Facultad de Ciencias Agrarias |
| `posgrado.jpg` | Encabezado y bloque de Posgrado |
| `maestria-docencia.jpg` | Maestría en Docencia Superior e Investigación |
| `maestria-gestion-publica.jpg` | Maestría en Gestión Pública |
| `doctorado-administracion.jpg` | Doctorado en Administración |
| `rector.jpg` | Rector (y retrato del director de Posgrado) |
| `vicerrector-academico.jpg` | Vicerrector Académico |
| `vicerrectora-investigacion.jpg` | Vicerrectora de Investigación |
| `noticia-1.jpg`, `noticia-2.jpg`, `noticia-3.jpg` | Noticias del inicio |

## Contenido institucional cargado

- **Facultades:** Ciencias Empresariales (Administración, Contabilidad, Adm. de Turismo y Hotelería, Derecho y Ciencias Políticas), Ingeniería (Ingeniería de Sistemas), Ciencias Agrarias (Agronomía).
- **Posgrado:** Maestrías en Docencia Superior e Investigación y en Gestión Pública; Doctorado en Administración.
- **Autoridades (2026):** Rector, vicerrector académico, vicerrectora de investigación y decanos.
- **Datos:** creación por Ley N.º 29488 (2009), licenciamiento SUNEDU (2018), sedes y contacto.

Los enlaces a las escuelas y a Posgrado apuntan a los sitios oficiales (`web.undc.edu.pe` y `posgrado.undc.edu.pe`).

## Cómo poner tus imágenes (paso a paso)

Todas las imágenes van en la carpeta **`public/`**.

1. Copia tu foto dentro de la carpeta `public/`.
2. Abre `index.html`.
3. Busca el comentario `IMAGEN DEL EVENTO` (usa Ctrl+F).
4. Cambia el nombre dentro de `src="public/evento-1.jpg"` por el nombre de tu archivo.
5. Guarda y recarga la página con F5.

Resumen de imágenes del inicio:

| Dónde se ve | Archivo esperado |
|---|---|
| Logo del navbar | `public/UNDC_logo_transp.png` |
| Imagen grande (hero) | `public/hero1.jpg` |
| Evento 1 | `public/evento-1.jpg` |
| Evento 2 | `public/evento-2.jpg` |
| Evento 3 | `public/evento-3.jpg` |

> Si una imagen todavía no existe, la web muestra un recuadro de ejemplo
> y el diseño no se rompe.

## Pendiente / editable

- Colocar las imágenes (nombres de arriba).
- Revisar los textos institucionales (misión, visión, descripciones) por si quieres ajustarlos.
- Reemplazar los enlaces `#` de "Privacidad", "Términos", "Transparencia" y "Ver todas" por sus URLs reales.
- Las noticias del inicio son de ejemplo (fechas 2026); actualízalas con las que quieras.
