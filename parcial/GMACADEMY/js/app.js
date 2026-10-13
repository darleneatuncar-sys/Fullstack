/* =========================================================
   GMACADEMY — Lógica del formulario de notificaciones
   JavaScript puro + SDK oficial @emailbrowser vía CDN
   ========================================================= */

/* ---------- 1. Configuración de EmailJS ----------
   Estos tres valores corresponden a tu cuenta de EmailJS:
   - PUBLIC_KEY:  Account > General > API Keys (pública, segura en el navegador)
   - SERVICE_ID:  Email Services > tu servicio conectado
   - TEMPLATE_ID: Email Templates > tu plantilla
   Si cambias la plantilla, revisa también TEMPLATE_VARS más abajo. */

const EMAILJS_PUBLIC_KEY = "1Sazzy8CQlNMGYSwE";
const EMAILJS_SERVICE_ID = "service_0u3u93r";
const EMAILJS_TEMPLATE_ID = "template_5i2d9wy";

/* Variables que usa tu plantilla de EmailJS (deben coincidir
   exactamente con las escritas entre {{ }} en la plantilla):
   - to_email  : correo del estudiante (destinatario)
   - from_name : nombre del estudiante
   - from_email: correo del estudiante (respuesta)
   - message   : mensaje escrito
   - subject   : asunto del correo
   - name      : nombre usado en el cuerpo del mensaje
   - time      : fecha y hora del envío */

function buildTemplateVariables({ name, email, message }) {
  const now = new Date();
  const time = now.toLocaleString("es-MX", {
    dateStyle: "long",
    timeStyle: "short",
  });

  return {
    to_email: email,
    from_name: name,
    from_email: email,
    message: message,
    subject: `Notificación académica de ${name}`,
    name: name,
    time: time,
  };
}

/* ---------- 2. Referencias del DOM ---------- */

const form = document.getElementById("notification-form");
const nameInput = document.getElementById("student-name");
const emailInput = document.getElementById("student-email");
const messageInput = document.getElementById("message");
const submitBtn = document.getElementById("submit-btn");
const btnText = document.getElementById("btn-text");
const spinner = document.querySelector(".btn__spinner");
const statusBox = document.getElementById("form-status");

/* Controla envíos duplicados */
let isSending = false;

/* ---------- 3. Utilidades de interfaz ---------- */

function showStatus(message, type) {
  statusBox.textContent = message;
  statusBox.className = `status status--${type}`;
}

function hideStatus() {
  statusBox.textContent = "";
  statusBox.className = "status hidden";
}

function setFieldError(input, message) {
  const small = document.querySelector(`[data-error-for="${input.id}"]`);
  if (message) {
    input.classList.add("is-invalid");
    small.textContent = message;
  } else {
    input.classList.remove("is-invalid");
    small.textContent = "";
  }
}

function setLoading(loading) {
  isSending = loading;
  submitBtn.disabled = loading;
  spinner.classList.toggle("hidden", !loading);
  btnText.textContent = loading ? "Enviando..." : "Enviar notificación";
}

function clearForm() {
  form.reset();
  [nameInput, emailInput, messageInput].forEach((input) => setFieldError(input, ""));
}

/* ---------- 4. Validación ---------- */

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

function validateForm() {
  let isValid = true;

  // Nombre: obligatorio, mínimo 3 caracteres
  if (nameInput.value.trim() === "") {
    setFieldError(nameInput, "El nombre es obligatorio.");
    isValid = false;
  } else if (nameInput.value.trim().length < 3) {
    setFieldError(nameInput, "El nombre debe tener al menos 3 caracteres.");
    isValid = false;
  } else {
    setFieldError(nameInput, "");
  }

  // Correo: obligatorio y con formato válido
  const email = emailInput.value.trim();
  if (email === "") {
    setFieldError(emailInput, "El correo es obligatorio.");
    isValid = false;
  } else if (!EMAIL_REGEX.test(email)) {
    setFieldError(emailInput, "Ingresa un correo válido (ej: ana@correo.com).");
    isValid = false;
  } else {
    setFieldError(emailInput, "");
  }

  // Mensaje: obligatorio, mínimo 10 caracteres
  if (messageInput.value.trim() === "") {
    setFieldError(messageInput, "El mensaje es obligatorio.");
    isValid = false;
  } else if (messageInput.value.trim().length < 10) {
    setFieldError(messageInput, "El mensaje debe tener al menos 10 caracteres.");
    isValid = false;
  } else {
    setFieldError(messageInput, "");
  }

  return isValid;
}

/* ---------- 5. Configuración de EmailJS ---------- */

// Inicializa el SDK con tu Public Key (una sola vez).
if (typeof emailjs !== "undefined") {
  emailjs.init({ publicKey: EMAILJS_PUBLIC_KEY });
}

function isEmailjsConfigured() {
  return (
    typeof emailjs !== "undefined" &&
    EMAILJS_PUBLIC_KEY !== "" &&
    EMAILJS_SERVICE_ID !== "" &&
    EMAILJS_TEMPLATE_ID !== ""
  );
}

/* ---------- 6. Envío ---------- */

async function sendNotification(data) {
  const templateParams = buildTemplateVariables(data);

  // Envío real con emailjs.send() — no hay simulación.
  const response = await emailjs.send(
    EMAILJS_SERVICE_ID,
    EMAILJS_TEMPLATE_ID,
    templateParams
  );

  return response;
}

form.addEventListener("submit", async (event) => {
  event.preventDefault();

  // Evita envíos duplicados mientras hay una petición en curso.
  if (isSending) return;

  // Verifica que EmailJS esté disponible y configurado.
  if (!isEmailjsConfigured()) {
    showStatus(
      "El envío no está disponible todavía: falta configurar EmailJS (SERVICE_ID, TEMPLATE_ID o PUBLIC_KEY) en js/app.js.",
      "error"
    );
    return;
  }

  if (!validateForm()) {
    showStatus("Revisa los campos marcados e intenta de nuevo.", "error");
    return;
  }

  hideStatus();
  setLoading(true);

  const data = {
    name: nameInput.value.trim(),
    email: emailInput.value.trim(),
    message: messageInput.value.trim(),
  };

  try {
    await sendNotification(data);
    showStatus(
      `¡Listo! Se envió la notificación correctamente a ${data.email}.`,
      "success"
    );
    clearForm(); // Solo se limpia si el envío fue exitoso.
  } catch (error) {
    // Los datos se conservan para que el usuario pueda reintentar.
    showStatus(
      "No se pudo enviar la notificación. Verifica tu conexión e intenta de nuevo.",
      "error"
    );
    // Detalles técnicos para depuración en la consola del navegador.
    console.error("Error al enviar la notificación con EmailJS:", error);
  } finally {
    setLoading(false);
  }
});
