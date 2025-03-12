
<?php
/**
 * Blood Donation System - Installation Script
 * This is the main entry point for the installation process.
 * Rename this file to install.php after configuring it.
 */

// Include configuration
require_once __DIR__ . '/config.php.example';

// Include installation controller
require_once __DIR__ . '/controllers/install_controller.php';

// Set headers for CORS and JSON content type
header("Access-Control-Allow-Origin: {$API_CONFIG['allow_origin']}");
header("Access-Control-Allow-Methods: {$API_CONFIG['allow_methods']}");
header("Access-Control-Allow-Headers: {$API_CONFIG['allow_headers']}");
header("Content-Type: application/json");

// Handle preflight requests
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit(0);
}

// Create installation controller
$installController = new InstallController([
    'DB_CONFIG' => $DB_CONFIG,
    'API_CONFIG' => $API_CONFIG,
    'PATHS' => $PATHS,
    'SYSTEM_SETTINGS' => $SYSTEM_SETTINGS
]);

// Handle the API endpoints
$method = $_SERVER['REQUEST_METHOD'];
$path = trim(parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH), '/');
$path_parts = explode('/', $path);
$endpoint = end($path_parts);

// Get request body for POST requests
$requestBody = null;
if ($method === 'POST') {
    $requestBody = json_decode(file_get_contents('php://input'), true);
}

// Route requests to appropriate controller methods
switch ($endpoint) {
    case 'test-connection':
        if ($method === 'POST') {
            $result = $installController->testConnection($requestBody);
            echo json_encode($result);
        } else {
            http_response_code(405); // Method Not Allowed
            echo json_encode(["error" => "Method not allowed"]);
        }
        break;
        
    case 'create-admin':
        if ($method === 'POST') {
            $result = $installController->createAdmin($requestBody);
            echo json_encode($result);
        } else {
            http_response_code(405); // Method Not Allowed
            echo json_encode(["error" => "Method not allowed"]);
        }
        break;
        
    case 'install':
        if ($method === 'POST') {
            $result = $installController->fullInstall($requestBody);
            echo json_encode($result);
        } else {
            http_response_code(405); // Method Not Allowed
            echo json_encode(["error" => "Method not allowed"]);
        }
        break;
        
    case 'admin/login':
        if ($method === 'POST') {
            $result = $installController->adminLogin($requestBody);
            echo json_encode($result);
        } else {
            http_response_code(405); // Method Not Allowed
            echo json_encode(["error" => "Method not allowed"]);
        }
        break;
        
    default:
        // Return 404 for unknown endpoints
        http_response_code(404);
        echo json_encode(["error" => "Endpoint not found"]);
}
