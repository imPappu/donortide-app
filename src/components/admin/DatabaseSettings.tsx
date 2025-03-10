
import React, { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import DBErrorAlert from './DBErrorAlert';
import DatabaseConnectionTab from './database/DatabaseConnectionTab';
import DatabaseMaintenanceTab from './database/DatabaseMaintenanceTab';
import DatabaseBackupTab from './database/DatabaseBackupTab';
import { DatabaseConfig, DatabaseTestResult } from './database/types';

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
  const [activeTab, setActiveTab] = useState('connection');
  const [lastTestResult, setLastTestResult] = useState<DatabaseTestResult | null>(null);
  const [showPassword, setShowPassword] = useState(false);

  // Fetch the database configuration
  const fetchConfig = async () => {
    setLoading(true);
    setError(null);
    try {
      // Simulated API call
      setTimeout(() => {
        setLoading(false);
        toast({
          title: "Configuration Loaded",
          description: "Database configuration loaded successfully",
        });
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
      // Simulate a successful connection
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const result: DatabaseTestResult = {
        success: true,
        message: "Successfully connected to the database",
        timestamp: new Date().toISOString()
      };
      
      setLastTestResult(result);
      
      toast({
        title: "Connection Successful",
        description: "Successfully connected to the database",
      });
    } catch (error) {
      console.error('Error testing connection:', error);
      setError('Failed to connect to the database. Check your credentials and try again.');
      
      const result: DatabaseTestResult = {
        success: false,
        message: "Failed to connect to the database",
        timestamp: new Date().toISOString()
      };
      
      setLastTestResult(result);
    } finally {
      setTesting(false);
    }
  };

  const saveConfig = async () => {
    setLoading(true);
    setError(null);
    try {
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

  const runDatabaseMigration = async () => {
    setLoading(true);
    setError(null);
    try {
      // Simulate a successful migration
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      toast({
        title: "Migration Successful",
        description: "Database migration completed successfully",
      });
    } catch (error) {
      console.error('Error running migration:', error);
      setError('Failed to run database migration');
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

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid grid-cols-3 mb-4">
          <TabsTrigger value="connection">Connection</TabsTrigger>
          <TabsTrigger value="maintenance">Maintenance</TabsTrigger>
          <TabsTrigger value="backup">Backup & Restore</TabsTrigger>
        </TabsList>
        
        <TabsContent value="connection">
          <DatabaseConnectionTab 
            config={config}
            handleChange={handleChange}
            testConnection={testConnection}
            saveConfig={saveConfig}
            testing={testing}
            loading={loading}
            lastTestResult={lastTestResult}
            showPassword={showPassword}
            setShowPassword={setShowPassword}
          />
        </TabsContent>
        
        <TabsContent value="maintenance">
          <DatabaseMaintenanceTab 
            loading={loading}
            runDatabaseMigration={runDatabaseMigration}
          />
        </TabsContent>
        
        <TabsContent value="backup">
          <DatabaseBackupTab />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default DatabaseSettings;
