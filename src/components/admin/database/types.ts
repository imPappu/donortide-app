
export interface DatabaseConfig {
  host: string;
  port: string;
  database: string;
  username: string;
  password: string;
  type: string;
  ssl_enabled: boolean;
}

export interface DatabaseTestResult {
  success: boolean;
  message: string;
  timestamp: string;
}
