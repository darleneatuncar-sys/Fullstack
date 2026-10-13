# GMACADEMY — Notificaciones académicas

Aplicación web sencilla para el parcial del curso **Desarrollo Web Full Stack**.
Permite a un estudiante enviar una notificación por correo mediante **EmailJS**.

Tecnologías: **HTML5 + CSS3 + JavaScript puro** (sin frameworks ni bases de datos).

## Estructura

```
GMACADEMY/
├── index.html      → Estructura de la página y formulario
├── css/styles.css  → Estilos (paleta azul/blanco, responsive)
├── js/app.js       → Validaciones, estados y envío con EmailJS
└── README.md       → Este archivo
```

## Cómo abrir la página

**Opción 1 (más simple):** doble clic en `index.html` para abrirla en el navegador.

**Opción 2 (recomendada):** usar un servidor local desde la carpeta `GMACADEMY`:

```bash
# con Node.js
npx serve .

# o con Python
python -m http.server 8000
```

Luego abrir `http://localhost:8000` (o la puerto que indique la consola).

## Cómo probar la aplicación

1. Abrir la página y pulsar **Enviar notificación** sin llenar nada → debe mostrar errores de validación.
2. Escribir un correo inválido (ej: `ana@correo`) → debe rechazarlo.
3. Llenar los tres campos correctamente → se activa el envío real con EmailJS.
4. Si el envío funciona, aparece un mensaje de éxito y el formulario se limpia.
5. Si falla, aparece un mensaje de error y **los datos se conservan**; los detalles del error se ven en la consola del navegador (F12 → pestaña Console).

## Configuración de EmailJS

La integración usa el SDK oficial **@emailbrowser** por CDN.

### Valores actuales (en `js/app.js`)

```js
const EMAILJS_PUBLIC_KEY  = "1Sazzy8CQlNMGYSwE";   // configurada
const EMAILJS_SERVICE_ID  = "service_0u3u93r";     // configurada
const EMAILJS_TEMPLATE_ID = "template_5i2d9wy";    // configurada
```

> La **Public Key** es pública y segura en el navegador. Nunca incluyas la **Private Key** en el código.

### Variables de la plantilla

Tu plantilla de EmailJS usa estas variables, que `js/app.js` envía en cada petición:

| Variable      | Valor enviado                                  |
| ------------- | ---------------------------------------------- |
| `to_email`    | Correo ingresado por el estudiante (destinatario) |
| `from_name`   | Nombre completo del estudiante                 |
| `from_email`  | Correo del estudiante (para responder)         |
| `message`     | Mensaje escrito en el formulario               |
| `subject`     | `Notificación académica de {nombre}`            |
| `name`        | Nombre del estudiante (usado en el cuerpo)     |
| `time`        | Fecha y hora del envío                         |

Si cambias los nombres en la plantilla, actualiza también `buildTemplateVariables()` en `js/app.js`.

### Pasos en el panel de EmailJS

1. **Email Services**: conectar el correo (Gmail u otro) y copiar el *Service ID*.
2. **Email Templates**: crear/editar la plantilla y copiar el *Template ID*.
3. **Account → General → API Keys**: copiar la *Public Key*.
4. Pegar los tres valores en `js/app.js` (bloque de configuración al inicio del archivo).

### Prueba real

1. Guardar los cambios y recargar la página.
2. Llenar el formulario con **un correo al que tengas acceso**.
3. Pulsar **Enviar notificación**.
4. Verificar que llegue el correo al destinatario y que aparezca el mensaje de éxito en pantalla.

> El envío real solo se confirma al probarlo con credenciales válidas y recibir el correo.

## Git

Para trabajar sin tocar la rama `main`:

```bash
git status                      # revisar el estado actual
git checkout -b parcial-emailjs # crear y entrar a la rama nueva
# ... trabajar en los archivos ...
git add GMACADEMY
git commit -m "Adds GMACADEMY notification form with EmailJS"
git checkout main               # volver a main (queda intacto)
```

## Autor

Proyecto GMACADEMY — parcial del curso Desarrollo Web Full Stack.
