
export interface DatabaseConfig {
  host: string;
  port: string;
  database: string;
  username: string;
  password: string;
  type: string;
  ssl_enabled: boolean;
  connection_timeout?: number;
  pool_size?: number;
  auto_reconnect?: boolean;
}

export interface DatabaseTestResult {
  success: boolean;
  message: string;
  timestamp: string;
  details?: {
    version?: string;
    connection_time?: number;
    error_code?: string;
  }
}

export interface DatabaseBackupConfig {
  auto_backup: boolean;
  backup_frequency: string;
  retention_days: number;
  storage_path: string;
  include_media: boolean;
}

export interface DatabaseMaintenanceLog {
  id: string;
  operation: string;
  status: 'success' | 'failed';
  timestamp: string;
  details: string;
}
