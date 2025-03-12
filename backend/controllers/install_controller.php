
<?php
// Installation controller for the Blood Donation System

require_once __DIR__ . '/../utils/database.php';

class InstallController {
    private $config;
    
    public function __construct($config) {
        $this->config = $config;
    }
    
    public function testConnection($data) {
        $dbConfig = [
            'host' => $data['host'] ?? $this->config['DB_CONFIG']['host'],
            'database' => $data['database'] ?? $this->config['DB_CONFIG']['database'],
            'user' => $data['user'] ?? $this->config['DB_CONFIG']['user'],
            'password' => $data['password'] ?? $this->config['DB_CONFIG']['password'],
            'type' => $data['type'] ?? $this->config['DB_CONFIG']['type']
        ];
        
        $result = testDatabaseConnection($dbConfig);
        
        if ($result['success']) {
            return ['connected' => true, 'message' => $result['message']];
        } else {
            return ['connected' => false, 'message' => $result['message']];
        }
    }
    
    public function createAdmin($data) {
        // Connect to database first
        $dbConfig = [
            'host' => $_ENV['DB_HOST'] ?? $this->config['DB_CONFIG']['host'],
            'database' => $_ENV['DB_NAME'] ?? $this->config['DB_CONFIG']['database'],
            'user' => $_ENV['DB_USER'] ?? $this->config['DB_CONFIG']['user'],
            'password' => $_ENV['DB_PASSWORD'] ?? $this->config['DB_CONFIG']['password'],
            'type' => $_ENV['DB_TYPE'] ?? $this->config['DB_CONFIG']['type']
        ];
        
        try {
            if ($dbConfig['type'] === 'mysql' || $dbConfig['type'] === 'mariadb') {
                $dsn = "mysql:host={$dbConfig['host']};dbname={$dbConfig['database']};";
            } else {
                $dsn = "pgsql:host={$dbConfig['host']};dbname={$dbConfig['database']};";
            }
            
            $pdo = new PDO($dsn, $dbConfig['user'], $dbConfig['password']);
            $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
            
            $result = createAdminUser($pdo, $data);
            
            return ['success' => $result['success'], 'message' => $result['message']];
        } catch (PDOException $e) {
            return ['success' => false, 'error' => 'Database connection failed: ' . $e->getMessage()];
        }
    }
    
    public function fullInstall($data) {
        $dbConfig = $data['database'];
        $admin = $data['admin'];
        $settings = $data['settings'];
        
        // Test database connection
        $connectionResult = testDatabaseConnection($dbConfig);
        if (!$connectionResult['success']) {
            return ['success' => false, 'error' => $connectionResult['message']];
        }
        
        // Connect to the database
        try {
            if ($dbConfig['type'] === 'mysql' || $dbConfig['type'] === 'mariadb') {
                $dsn = "mysql:host={$dbConfig['host']};dbname={$dbConfig['database']};";
            } else {
                $dsn = "pgsql:host={$dbConfig['host']};dbname={$dbConfig['database']};";
            }
            
            $pdo = new PDO($dsn, $dbConfig['user'], $dbConfig['password']);
            $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
            
            // Run migrations
            $migrationsResult = runDatabaseMigrations($pdo, $this->config['PATHS']['database_setup']);
            if (!$migrationsResult['success']) {
                return ['success' => false, 'error' => $migrationsResult['message']];
            }
            
            // Create admin user
            $adminResult = createAdminUser($pdo, $admin);
            if (!$adminResult['success']) {
                return ['success' => false, 'error' => $adminResult['message']];
            }
            
            // Create app settings
            $settingsResult = createAppSettings($pdo, $settings);
            if (!$settingsResult['success']) {
                return ['success' => false, 'error' => $settingsResult['message']];
            }
            
            // Save database config
            $configResult = saveDbConfigFile($dbConfig, __DIR__ . '/../db.config.php');
            if (!$configResult['success']) {
                return ['success' => false, 'error' => $configResult['message']];
            }
            
            return ['success' => true, 'message' => 'Installation completed successfully'];
        } catch (PDOException $e) {
            return ['success' => false, 'error' => 'Installation process failed: ' . $e->getMessage()];
        }
    }
    
    public function adminLogin($data) {
        $username = $data['username'];
        $password = $data['password'];
        
        // Connect to database
        $dbConfig = [
            'host' => $_ENV['DB_HOST'] ?? $this->config['DB_CONFIG']['host'],
            'database' => $_ENV['DB_NAME'] ?? $this->config['DB_CONFIG']['database'],
            'user' => $_ENV['DB_USER'] ?? $this->config['DB_CONFIG']['user'],
            'password' => $_ENV['DB_PASSWORD'] ?? $this->config['DB_CONFIG']['password'],
            'type' => $_ENV['DB_TYPE'] ?? $this->config['DB_CONFIG']['type']
        ];
        
        try {
            if ($dbConfig['type'] === 'mysql' || $dbConfig['type'] === 'mariadb') {
                $dsn = "mysql:host={$dbConfig['host']};dbname={$dbConfig['database']};";
            } else {
                $dsn = "pgsql:host={$dbConfig['host']};dbname={$dbConfig['database']};";
            }
            
            $pdo = new PDO($dsn, $dbConfig['user'], $dbConfig['password']);
            $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
            
            // Get user
            $stmt = $pdo->prepare("SELECT id, email, password_hash FROM users WHERE (email = :username OR name = :username) AND role = 'admin'");
            $stmt->bindParam(':username', $username);
            $stmt->execute();
            
            $user = $stmt->fetch(PDO::FETCH_ASSOC);
            
            if ($user && password_verify($password, $user['password_hash'])) {
                return [
                    'success' => true,
                    'user' => [
                        'id' => $user['id'],
                        'email' => $user['email']
                    ]
                ];
            } else {
                return [
                    'success' => false,
                    'error' => 'Invalid credentials'
                ];
            }
        } catch (PDOException $e) {
            return [
                'success' => false,
                'error' => 'Login failed: ' . $e->getMessage()
            ];
        }
    }
}
