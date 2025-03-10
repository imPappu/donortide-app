
import React, { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { DatabaseIcon } from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import DatabaseConnectionForm from './DatabaseConnectionForm';
import DatabaseConnectionActions from './DatabaseConnectionActions';
import DBErrorAlert from './DBErrorAlert';

interface DatabaseConfig {
  host: string;
  port: string;
  database: string;
  username: string;
  password: string;
  type: string;
  ssl_enabled: boolean;
}

const DatabaseSettings = () => {
  const { toast } = useToast();
  const [config, setConfig] = useState<DatabaseConfig>({
    host: 'localhost',
    port: '5432',
    database: 'blood_donation',
    username: 'postgres',
    password: '',
    type: 'postgresql',
    ssl_enabled: false
  });
  const [loading, setLoading] = useState(false);
  const [testing, setTesting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // In a real app, this would fetch the database configuration from your backend
  const fetchConfig = async () => {
    setLoading(true);
    setError(null);
    try {
      // Simulated API call
      // const response = await fetch('/api/database-config');
      // const data = await response.json();
      // setConfig(data);
      
      // For this example, we'll just use the default values
      setTimeout(() => {
        setLoading(false);
      }, 500);
    } catch (error) {
      console.error('Error fetching database config:', error);
      setError('Failed to load database configuration');
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchConfig();
  }, []);

  const handleChange = (key: keyof DatabaseConfig, value: string | boolean) => {
    setConfig(prev => ({ ...prev, [key]: value }));
  };

  const testConnection = async () => {
    setTesting(true);
    setError(null);
    try {
      // Simulated API call to test database connection
      // const response = await fetch('/api/test-database-connection', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(config)
      // });
      // const data = await response.json();
      
      // Simulate a successful connection
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: "Connection Successful",
        description: "Successfully connected to the database",
      });
    } catch (error) {
      console.error('Error testing connection:', error);
      setError('Failed to connect to the database. Check your credentials and try again.');
    } finally {
      setTesting(false);
    }
  };

  const saveConfig = async () => {
    setLoading(true);
    setError(null);
    try {
      // Simulated API call to save database configuration
      // const response = await fetch('/api/save-database-config', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(config)
      // });
      // const data = await response.json();
      
      // Simulate a successful save
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: "Configuration Saved",
        description: "Database configuration has been saved successfully",
      });
    } catch (error) {
      console.error('Error saving config:', error);
      setError('Failed to save database configuration');
    } finally {
      setLoading(false);
    }
  };

  if (loading && !config) {
    return <div className="text-center py-6">Loading database configuration...</div>;
  }

  return (
    <div className="space-y-6">
      <DBErrorAlert error={error} />

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
          />
          
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
    </div>
  );
};

export default DatabaseSettings;
