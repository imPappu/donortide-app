
import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { DatabaseIcon, CheckCircle, AlertTriangle } from "lucide-react";
import DatabaseConnectionForm from '../DatabaseConnectionForm';
import DatabaseConnectionActions from '../DatabaseConnectionActions';

interface DatabaseConfig {
  host: string;
  port: string;
  database: string;
  username: string;
  password: string;
  type: string;
  ssl_enabled: boolean;
}

interface DatabaseTestResult {
  success: boolean;
  message: string;
  timestamp: string;
}

interface DatabaseConnectionTabProps {
  config: DatabaseConfig;
  handleChange: (key: keyof DatabaseConfig, value: string | boolean) => void;
  testConnection: () => Promise<void>;
  saveConfig: () => Promise<void>;
  testing: boolean;
  loading: boolean;
  lastTestResult: DatabaseTestResult | null;
  showPassword: boolean;
  setShowPassword: (show: boolean) => void;
}

const DatabaseConnectionTab: React.FC<DatabaseConnectionTabProps> = ({
  config,
  handleChange,
  testConnection,
  saveConfig,
  testing,
  loading,
  lastTestResult,
  showPassword,
  setShowPassword
}) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <DatabaseIcon className="mr-2 h-5 w-5" />
          Database Connection
        </CardTitle>
        <CardDescription>
          Configure your database connection settings
        </CardDescription>
      </CardHeader>
      
      <CardContent>
        <DatabaseConnectionForm 
          config={config} 
          handleChange={handleChange} 
          showPassword={showPassword}
          setShowPassword={setShowPassword}
        />
        
        {lastTestResult && (
          <div className={`mt-4 p-3 rounded-md ${lastTestResult.success ? 'bg-green-50 border border-green-200 dark:bg-green-900/30 dark:border-green-800' : 'bg-red-50 border border-red-200 dark:bg-red-900/30 dark:border-red-800'}`}>
            <div className="flex items-center">
              {lastTestResult.success ? 
                <CheckCircle className="h-5 w-5 text-green-500 mr-2" /> : 
                <AlertTriangle className="h-5 w-5 text-red-500 mr-2" />
              }
              <div>
                <p className={`text-sm font-medium ${lastTestResult.success ? 'text-green-700 dark:text-green-300' : 'text-red-700 dark:text-red-300'}`}>
                  {lastTestResult.message}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  {new Date(lastTestResult.timestamp).toLocaleString()}
                </p>
              </div>
            </div>
          </div>
        )}
        
        <DatabaseConnectionActions 
          config={config}
          handleChange={handleChange}
          testConnection={testConnection}
          saveConfig={saveConfig}
          testing={testing}
          loading={loading}
        />
      </CardContent>
    </Card>
  );
};

export default DatabaseConnectionTab;
