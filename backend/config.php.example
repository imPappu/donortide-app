
<?php
// Configuration file for the Blood Donation System
// Rename to config.php after setting up

// Database Configuration
$DB_CONFIG = [
    'host' => 'localhost',
    'database' => 'bloodmate',
    'user' => 'postgres',
    'password' => '',
    'port' => '5432',
    'type' => 'pgsql' // or 'mysql' for MySQL
];

// API Configuration
$API_CONFIG = [
    'allow_origin' => '*', // In production, replace * with your domain
    'allow_methods' => 'GET, POST, OPTIONS',
    'allow_headers' => 'Content-Type'
];

// Paths Configuration
$PATHS = [
    'database_setup' => __DIR__ . '/database_setup.sql'
];

// System Settings
$SYSTEM_SETTINGS = [
    'environment' => 'production', // 'production', 'development', 'testing'
    'debug' => false
];

// Do not modify below this line
if (file_exists(__DIR__ . '/local.config.php')) {
    include_once __DIR__ . '/local.config.php';
}
