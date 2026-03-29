import express from 'express';
import cors from 'cors';
import rateLimit from 'express-rate-limit';
import { Resend } from 'resend';
import dotenv from 'dotenv';

// Cargar variables de entorno desde .env local si no están en sistema
dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// Inicializa Resend con la API key de las vars
const resend = new Resend(process.env.RESEND_API_KEY);

// Middleware para entender JSON en el body
app.use(express.json());

// -- Configuración de CORS dinámico --
// Permitimos `http://localhost:5173` para desarrollo y el dominio real de prod
const allowedOrigins = [process.env.ALLOWED_ORIGIN, 'http://localhost:5173'];
const corsOptions = {
    origin: (origin, callback) => {
        // Permitir solicitudes sin "origin" (postman, utilidades, etc.) si estamos en desarrollo
        if (!origin && process.env.NODE_ENV !== 'production') return callback(null, true);
        
        if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
            callback(null, true);
        } else {
            callback(new Error('Cross-Origin Request Blocked by CORS policy'));
        }
    },
    optionsSuccessStatus: 200
};
app.use(cors(corsOptions));

// -- Rate Limiting Middleware (Anti-Spam Básico) --
// Máximo 5 requests por IP cada 15 minutos en el submit del correo
const contactLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, 
    limit: 5,
    message: { error: 'Demasiados intentos. Has superado el límite de 5 envíos. Por favor espera 15 minutos.' },
    standardHeaders: 'draft-7',
    legacyHeaders: false,
});

// Endpoint GET /health
// Devuelve un JSON simple para asegurar que el server despertó
app.get('/health', (req, res) => {
    res.status(200).json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Endpoint POST /api/contact
app.post('/api/contact', contactLimiter, async (req, res) => {
    try {
        const { nombre, email, mensaje, telefono } = req.body;

        // 1. Honeypot Anti-Spam Oculto
        // Si el robot lee un campo 'telefono' y lo completa, entra pero se ignora y aparenta éxito (silencioso).
        if (telefono) {
            console.log('Honeypot atrapó a un bot. Petición ignorada.');
            return res.status(200).json({ success: true, message: 'Mensaje recibido correctamente (hon)' });
        }

        // 2. Validación Básica
        if (!nombre || !email || !mensaje) {
            return res.status(400).json({ error: 'Faltan campos obligatorios' });
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({ error: 'Formato de correo inválido' });
        }

        // 3. Sanitización manual mínima de XSS (Prevenir inyección HTML en tu bandeja de entrada)
        const sanitize = (str) => String(str).replace(/</g, "&lt;").replace(/>/g, "&gt;");
        const safeNombre = sanitize(nombre);
        const safeMensaje = sanitize(mensaje);
        const emailDestino = process.env.EMAIL_DESTINO || 'proyectos.linel@gmail.com';

        // 4. Envío con Resend
        const { data, error } = await resend.emails.send({
            from: 'Linel Forms <onboarding@resend.dev>', // Si activan dominio verificado en Resend cambiar a: ej. `contacto@${process.env.ALLOWED_ORIGIN.replace('https://', '')}`
            to: emailDestino,
            reply_to: email, // Para responder directo en Gmail al cliente
            subject: `💡 Nuevo mensaje de Linel web: ${safeNombre}`,
            html: `
                <h3>Nuevo contacto web de Linel</h3>
                <p><strong>Nombre:</strong> ${safeNombre}</p>
                <p><strong>Email:</strong> ${email}</p>
                <br/>
                <p><strong>Mensaje del cliente:</strong></p>
                <p style="white-space: pre-wrap;">${safeMensaje}</p>
            `,
        });

        if (error) {
            console.error('API Resend devolvió un error:', error);
            return res.status(500).json({ error: 'Error interno del servicio de mailing.' });
        }

        // Éxito Total
        console.log(`Nuevo Lead de ${safeNombre} procesado correctamente. Id: ${data?.id}`);
        res.status(200).json({ success: true, data });

    } catch (err) {
        console.error('Error no capturado en /api/contact:', err);
        res.status(500).json({ error: 'Ocurrió un error inesperado en el servidor.' });
    }
});

// Arranca el servidor Express
app.listen(port, () => {
    console.log(`🚀 [Backend Contacto] Corriendo activamente en el puerto ${port}`);
    console.log(`🛡️  Modo: ${process.env.NODE_ENV || 'Desarrollo'}`);
});
