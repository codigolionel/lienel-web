# Backend API de Contacto - Linel

Este es un microservicio en Node.js puro usando **Express** y **Resend**, diseñado como Web Service independiente de la aplicación de Frontend (Vite/React). 

Posee las siguientes características:
- **Rate-Limiting**: Bloquea ataques de DDOS con un máximo de 5 peticiones cada 15 min.
- **Validación Básica**: Revisa el formato del email y asegura que vengan datos obligatorios.
- **Sanitización Rápida**: Filtra tags `<HTML>` dentro del cuerpo del mensaje para prevenir *Cross-site scripting (XSS)* en la casilla destinatario de Linel.
- **Honeypot Anti-Spam**: Analiza una variable trampa (`telefono`) que los bots automáticos intentan rellenar y lo descarta silenciosamente, ahorrándote el molesto correo spam.
- **CORS Dual Seguro**: Evita que otras páginas web hagan peticiones simuladas en producción usando el origen declarado (`ALLOWED_ORIGIN`), y en desarrollo tolera local `http://localhost:5173`.
- **Ecosistema**: Modulos ESM nativos (`type="module"`), lo que facilita su desarrollo directo sobre funciones asíncronas de última generación.

---

## 🚀 Guía de Despliegue en Render (Recomendado Gratuito)

Render es excelente para alojar un Web Service "sin estado" como este.

1. **Sube este backend a GitHub**:
   - Crea un repositorio de Github exclusivo sólo para la carpeta `server/` (o si ya está subido junto a Linel, especificaremos en Render que el "Root Directory" es `server`).
2. **Entra a [Render.com](https://render.com) en Dashboard**.
3. Clickea en **"New +" -> "Web Service"**.
4. Conecta tu repositorio.
5. Selecciona el entorno Node (Build Command será ignorado o pon `npm install`).
6. En **Settings**:
   - Environment: `Node`
   - Build Command: `npm install`
   - Start Command: `npm start`
7. **Importante - Variables de Entorno (`Environment Variables`)**:
   Ve a "Advanced" y carga las siguientes llaves basándote en tu archivo oculto de sistema:
   ```
   NODE_ENV = production
   RESEND_API_KEY = re_1234567890
   ALLOWED_ORIGIN = https://linel.com.ar
   EMAIL_DESTINO = proyectos.linel@gmail.com
   ```
8. **Dale a "Create Web Service"**. Render te dará un link como `https://linel-api.onrender.com`.

Ese será tu endpoint de Fetch oficial para la Request de React (`https://linel-api.onrender.com/api/contact`).

---

## 🛠️ Guía de Despliegue en Railway (Alternativa Rápida)

1. En **[Railway.app](https://railway.app)** click en **"New Project"**.
2. Selecciona **"Deploy from GitHub repo"**. 
3. Selecciona tu repositorio. (Si la app está en `server/`, ve a Settings del servicio y en **Root Directory** escribe `/server`).
4. Ve a la pestaña **Variables** y añade exactamente las mismas variables del `.env` mencionadas arriba.
5. Ve a la pestaña **Settings -> Networking** y genera un **"Public Domain"**. (Ese será tu link en producción para poner en el Fetch).
6. El proyecto iniciará solo gracias al archivo `package.json` leyendo el `start`.

---

## 💻 Cómo correr esto en tu computadora (Desarrollo)

Para encender y probar el envío de emails localmente:

1. **Obtener la API Key de Resend:**
   - Entrá a [https://resend.com/](https://resend.com/) y logueate (o creá cuenta).
   - Andá a la pestaña **API Keys**, hacé clic en "Create API Key" y copiá el código generado (suele empezar con `re_...`).
2. **Configurar el Entorno Local:**
   - Dentro de esta carpeta `server/`, copiá el archivo `.env.example` y renombralo a `.env`.
   - Abrí el `.env` y pegá tu API Key real donde dice `RESEND_API_KEY=`.
3. **Instalar y Arrancar:**
   - Abrí una terminal apuntando a esta carpeta (`cd server`).
   - Instalá los paquetes corriendo: `npm install`
   - Prendé el servidor corriendo: `npm start`

Verás en tu consola que el backend ya está corriendo en el `puerto 3000`. ¡Ya podés enviar formularios desde tu React!
