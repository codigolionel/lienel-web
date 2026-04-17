<?php
// Cargar configuración
$config = require __DIR__ . '/config.php';

$SMTP_HOST        = $config['SMTP_HOST'];
$SMTP_PORT        = $config['SMTP_PORT'];
$SMTP_USER        = $config['SMTP_USER'];
$SMTP_PASS        = $config['SMTP_PASS'];
$EMAIL_TO         = $config['EMAIL_TO'];
$TURNSTILE_SECRET = $config['TURNSTILE_SECRET'];

// CORS
$allowed_origins = [$config['CORS_ORIGIN'], 'https://www.tuaiti.com.ar', 'http://localhost:8080'];
$origin = $_SERVER['HTTP_ORIGIN'] ?? '';

if (in_array($origin, $allowed_origins)) {
    header("Access-Control-Allow-Origin: $origin");
}
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');
header('Content-Type: application/json; charset=utf-8');

// Preflight
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['error' => 'Método no permitido.']);
    exit;
}

// Rate limiting simple por IP (archivo temporal)
$rate_dir = sys_get_temp_dir() . '/contact_rate';
if (!is_dir($rate_dir)) mkdir($rate_dir, 0700, true);
$ip = $_SERVER['REMOTE_ADDR'] ?? 'unknown';
$rate_file = $rate_dir . '/' . md5($ip);
$now = time();
$window = 15 * 60; // 15 minutos
$max_requests = 5;

$attempts = [];
if (file_exists($rate_file)) {
    $attempts = json_decode(file_get_contents($rate_file), true) ?: [];
    $attempts = array_filter($attempts, fn($t) => $t > $now - $window);
}

if (count($attempts) >= $max_requests) {
    http_response_code(429);
    echo json_encode(['error' => 'Demasiados envíos. Intenta de nuevo en 15 minutos.']);
    exit;
}

// Leer body
$input = json_decode(file_get_contents('php://input'), true);
if (!$input) {
    http_response_code(400);
    echo json_encode(['error' => 'Datos inválidos.']);
    exit;
}

$name    = $input['name'] ?? '';
$contact = $input['contact'] ?? '';
$message = $input['message'] ?? '';
$token   = $input['token'] ?? '';

// Validar campos
if (!is_string($name) || !trim($name) ||
    !is_string($contact) || !trim($contact) ||
    !is_string($message) || !trim($message) ||
    !is_string($token) || !trim($token)) {
    http_response_code(400);
    echo json_encode(['error' => 'Todos los campos son obligatorios.']);
    exit;
}

if (mb_strlen($name) > 500 || mb_strlen($contact) > 500) {
    http_response_code(400);
    echo json_encode(['error' => 'Nombre o contacto demasiado largo.']);
    exit;
}

if (mb_strlen($message) > 5000) {
    http_response_code(400);
    echo json_encode(['error' => 'Mensaje demasiado largo.']);
    exit;
}

// Verificar Turnstile
$turnstile_response = file_get_contents('https://challenges.cloudflare.com/turnstile/v0/siteverify', false, stream_context_create([
    'http' => [
        'method' => 'POST',
        'header' => 'Content-Type: application/x-www-form-urlencoded',
        'content' => http_build_query([
            'secret' => $TURNSTILE_SECRET,
            'response' => $token,
        ]),
    ],
]));

$turnstile_data = json_decode($turnstile_response, true);

if (!$turnstile_data || !$turnstile_data['success']) {
    http_response_code(400);
    echo json_encode(['error' => 'Verificación de seguridad fallida. Intenta nuevamente.']);
    exit;
}

// Registrar intento exitoso para rate limiting
$attempts[] = $now;
file_put_contents($rate_file, json_encode($attempts));

// Escapar HTML
$safeName    = htmlspecialchars(trim($name), ENT_QUOTES, 'UTF-8');
$safeContact = htmlspecialchars(trim($contact), ENT_QUOTES, 'UTF-8');
$safeMessage = htmlspecialchars(trim($message), ENT_QUOTES, 'UTF-8');

// Sanitizar subject
$safeSubject = "Nuevo Lead Comercial: " . str_replace(["\r", "\n"], '', $safeName);

// Construir email HTML
$html = <<<HTML
<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #e0e0e0; border-radius: 8px; overflow: hidden;">
  <div style="background-color: #0044cc; color: white; padding: 20px; text-align: center;">
    <h2 style="margin: 0;">Nuevo Lead de Contacto</h2>
  </div>
  <div style="padding: 20px;">
    <p style="font-size: 16px; color: #333;">Has recibido un nuevo mensaje desde el formulario web.</p>
    <table style="width: 100%; border-collapse: collapse; margin-top: 20px;">
      <tr>
        <td style="padding: 12px 10px; border-bottom: 1px solid #eee; font-weight: bold; width: 30%; color: #333;">Nombre:</td>
        <td style="padding: 12px 10px; border-bottom: 1px solid #eee; color: #555;">{$safeName}</td>
      </tr>
      <tr>
        <td style="padding: 12px 10px; border-bottom: 1px solid #eee; font-weight: bold; color: #333;">Contacto (Email/Tel):</td>
        <td style="padding: 12px 10px; border-bottom: 1px solid #eee; color: #555;">{$safeContact}</td>
      </tr>
      <tr>
        <td style="padding: 12px 10px; font-weight: bold; color: #333; vertical-align: top;">Mensaje:</td>
        <td style="padding: 12px 10px; color: #555; white-space: pre-wrap;">{$safeMessage}</td>
      </tr>
    </table>
  </div>
  <div style="background-color: #f8f9fa; padding: 15px; text-align: center; color: #888; font-size: 12px; border-top: 1px solid #e0e0e0;">
    Este mensaje fue generado automáticamente desde tu landing page web.
  </div>
</div>
HTML;

// Enviar email via SMTP directo (SSL, puerto 465)
$safeReplyTo = htmlspecialchars(trim($contact), ENT_QUOTES, 'UTF-8');

$boundary = md5(uniqid());
$emailBody = "MIME-Version: 1.0\r\n";
$emailBody .= "From: {$SMTP_USER}\r\n";
$emailBody .= "To: {$EMAIL_TO}\r\n";
$emailBody .= "Reply-To: {$safeReplyTo}\r\n";
$emailBody .= "Subject: {$safeSubject}\r\n";
$emailBody .= "Content-Type: text/html; charset=UTF-8\r\n";
$emailBody .= "\r\n";
$emailBody .= $html;

$errno = 0;
$errstr = '';
$socket = @stream_socket_client(
    "ssl://{$SMTP_HOST}:{$SMTP_PORT}",
    $errno,
    $errstr,
    10,
    STREAM_CLIENT_CONNECT,
    stream_context_create(['ssl' => ['verify_peer' => true, 'verify_peer_name' => true]])
);

if (!$socket) {
    error_log("SMTP connection failed: {$errstr} ({$errno})");
    http_response_code(500);
    echo json_encode(['error' => 'Error al enviar el email.']);
    exit;
}

function smtp_read($socket) {
    $response = '';
    while ($line = fgets($socket, 512)) {
        $response .= $line;
        if ($line[3] === ' ') break;
    }
    return $response;
}

function smtp_send($socket, $command, $expectedCode) {
    fwrite($socket, $command . "\r\n");
    $response = smtp_read($socket);
    if ((int)substr($response, 0, 3) !== $expectedCode) {
        throw new Exception("SMTP error: expected {$expectedCode}, got: {$response}");
    }
    return $response;
}

try {
    smtp_read($socket); // banner
    smtp_send($socket, "EHLO tuaiti.com.ar", 250);
    smtp_send($socket, "AUTH LOGIN", 334);
    smtp_send($socket, base64_encode($SMTP_USER), 334);
    smtp_send($socket, base64_encode($SMTP_PASS), 235);
    smtp_send($socket, "MAIL FROM:<{$SMTP_USER}>", 250);
    smtp_send($socket, "RCPT TO:<{$EMAIL_TO}>", 250);
    smtp_send($socket, "DATA", 354);
    fwrite($socket, $emailBody . "\r\n.\r\n");
    $dataResponse = smtp_read($socket);
    if ((int)substr($dataResponse, 0, 3) !== 250) {
        throw new Exception("SMTP DATA error: {$dataResponse}");
    }
    smtp_send($socket, "QUIT", 221);
    fclose($socket);

    echo json_encode(['success' => true]);
} catch (Exception $e) {
    @fclose($socket);
    error_log("SMTP error: " . $e->getMessage());
    http_response_code(500);
    echo json_encode(['error' => 'Error al enviar el email.']);
    exit;
}
