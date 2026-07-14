<?php
// Secure Gemini API Proxy for Hostinger
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Content-Type: application/json");

// Handle CORS preflight
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit(0);
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(["error" => "Method not allowed"]);
    exit;
}

// Get raw POST data
$rawData = file_get_contents('php://input');
$data = json_decode($rawData, true);

if (!isset($data['contents'])) {
    http_response_code(400);
    echo json_encode(["error" => "Missing contents in request body"]);
    exit;
}

// Load API Key from environment variable (set in hosting environment or .env)
$GEMINI_API_KEY = getenv('GEMINI_API_KEY') ?: $_ENV['GEMINI_API_KEY'] ?? '';
$url = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=" . $GEMINI_API_KEY;

// Re-serialize the parameters received from frontend
$payload = [
    "contents" => $data['contents']
];

if (isset($data['systemInstruction'])) {
    $payload['systemInstruction'] = $data['systemInstruction'];
}

if (isset($data['generationConfig'])) {
    $payload['generationConfig'] = $data['generationConfig'];
}

// Forward to Google Gemini API
$ch = curl_init($url);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_POST, true);
curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($payload));
curl_setopt($ch, CURLOPT_HTTPHEADER, [
    'Content-Type: application/json'
]);

// Execute and capture response
$response = curl_exec($ch);
$httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
$curlError = curl_error($ch);
curl_close($ch);

if ($curlError) {
    http_response_code(500);
    echo json_encode([
        "error" => "cURL error occurred",
        "details" => $curlError
    ]);
    exit;
}

http_response_code($httpCode);
echo $response;
?>
