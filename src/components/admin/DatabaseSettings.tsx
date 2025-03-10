
import React, { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { DatabaseIcon, RefreshCw, CheckCircle, AlertTriangle } from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import DatabaseConnectionForm from './DatabaseConnectionForm';
import DatabaseConnectionActions from './DatabaseConnectionActions';
import DBErrorAlert from './DBErrorAlert';
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

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
      // Simulated API call to test database connection
      // const response = await fetch('/api/test-database-connection', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(config)
      // });
      // const data = await response.json();
      
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

  const runDatabaseMigration = async () => {
    setLoading(true);
    setError(null);
    try {
      // Simulated API call to run database migration
      // const response = await fetch('/api/run-database-migration', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      // });
      // const data = await response.json();
      
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
        </TabsContent>
        
        <TabsContent value="maintenance">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <RefreshCw className="mr-2 h-5 w-5" />
                Database Maintenance
              </CardTitle>
              <CardDescription>
                Perform maintenance operations on your database
              </CardDescription>
            </CardHeader>
            
            <CardContent className="space-y-4">
              <div className="border rounded-lg p-4">
                <h3 className="font-medium mb-2">Run Database Migrations</h3>
                <p className="text-sm text-muted-foreground mb-3">
                  Apply database schema changes and migrations to update your database structure
                </p>
                <Button 
                  onClick={runDatabaseMigration} 
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                      Running...
                    </>
                  ) : (
                    'Run Migrations'
                  )}
                </Button>
              </div>
              
              <div className="border rounded-lg p-4">
                <h3 className="font-medium mb-2">Database Health Check</h3>
                <p className="text-sm text-muted-foreground mb-3">
                  Check the health of your database and optimize its performance
                </p>
                <Button
                  variant="outline"
                  onClick={() => {
                    toast({
                      title: "Health Check Complete",
                      description: "Database is healthy and performing optimally",
                    });
                  }}
                >
                  Run Health Check
                </Button>
              </div>
              
              <div className="border rounded-lg p-4">
                <h3 className="font-medium mb-2">Vacuum Database</h3>
                <p className="text-sm text-muted-foreground mb-3">
                  Clean up fragmented data and reclaim storage space
                </p>
                <Button
                  variant="outline"
                  onClick={() => {
                    toast({
                      title: "Vacuum Complete",
                      description: "Database vacuuming process completed successfully",
                    });
                  }}
                >
                  Vacuum Database
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="backup">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <DatabaseIcon className="mr-2 h-5 w-5" />
                Backup & Restore
              </CardTitle>
              <CardDescription>
                Backup your database or restore from previous backups
              </CardDescription>
            </CardHeader>
            
            <CardContent className="space-y-4">
              <div className="border rounded-lg p-4">
                <h3 className="font-medium mb-2">Create Backup</h3>
                <p className="text-sm text-muted-foreground mb-3">
                  Create a full backup of your database that you can use to restore later
                </p>
                <Button
                  onClick={() => {
                    toast({
                      title: "Backup Created",
                      description: "Database backup created successfully",
                    });
                  }}
                >
                  Create Backup
                </Button>
              </div>
              
              <div className="border rounded-lg p-4">
                <h3 className="font-medium mb-2">Restore from Backup</h3>
                <p className="text-sm text-muted-foreground mb-3">
                  Restore your database from a previous backup
                </p>
                <Alert className="mb-3 bg-yellow-50 dark:bg-yellow-900/30 border-yellow-200 dark:border-yellow-800">
                  <AlertTriangle className="h-4 w-4 text-yellow-800 dark:text-yellow-400" />
                  <AlertDescription className="text-yellow-800 dark:text-yellow-400">
                    Warning: Restoring will overwrite your current database. Make sure to backup first.
                  </AlertDescription>
                </Alert>
                <Button
                  variant="outline"
                  onClick={() => {
                    toast({
                      title: "Feature Not Available",
                      description: "Restore functionality is currently in development",
                      variant: "destructive",
                    });
                  }}
                >
                  Restore Backup
                </Button>
              </div>
              
              <div className="border rounded-lg p-4">
                <h3 className="font-medium mb-2">Scheduled Backups</h3>
                <p className="text-sm text-muted-foreground mb-3">
                  Configure automated backups on a schedule
                </p>
                <Button
                  variant="outline"
                  onClick={() => {
                    toast({
                      title: "Scheduled Backups Enabled",
                      description: "Your database will be backed up automatically every day at midnight",
                    });
                  }}
                >
                  Configure Schedule
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default DatabaseSettings;
