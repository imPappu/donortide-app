
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from '@/hooks/use-toast';
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle, DatabaseIcon, RefreshCw } from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";

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
      {error && (
        <Alert variant="destructive" className="mb-4">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="db_type">Database Type</Label>
                <Select 
                  value={config.type} 
                  onValueChange={(value) => handleChange('type', value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select database type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="postgresql">PostgreSQL</SelectItem>
                    <SelectItem value="mysql">MySQL</SelectItem>
                    <SelectItem value="mariadb">MariaDB</SelectItem>
                    <SelectItem value="sqlite">SQLite</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="db_host">Host</Label>
                <Input 
                  id="db_host" 
                  value={config.host} 
                  onChange={(e) => handleChange('host', e.target.value)} 
                  placeholder="e.g., localhost or 127.0.0.1"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="db_port">Port</Label>
                <Input 
                  id="db_port" 
                  value={config.port} 
                  onChange={(e) => handleChange('port', e.target.value)} 
                  placeholder="e.g., 5432 for PostgreSQL"
                />
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="db_name">Database Name</Label>
                <Input 
                  id="db_name" 
                  value={config.database} 
                  onChange={(e) => handleChange('database', e.target.value)} 
                  placeholder="e.g., blood_donation"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="db_username">Username</Label>
                <Input 
                  id="db_username" 
                  value={config.username} 
                  onChange={(e) => handleChange('username', e.target.value)} 
                  placeholder="e.g., postgres"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="db_password">Password</Label>
                <Input 
                  id="db_password" 
                  type="password"
                  value={config.password} 
                  onChange={(e) => handleChange('password', e.target.value)} 
                  placeholder="Database password"
                />
              </div>
            </div>
          </div>
          
          <div className="flex items-center space-x-2 mt-4">
            <Switch 
              id="ssl_enabled"
              checked={config.ssl_enabled}
              onCheckedChange={(checked) => handleChange('ssl_enabled', checked)}
            />
            <Label htmlFor="ssl_enabled">Enable SSL Connection</Label>
          </div>
        </CardContent>
        
        <CardFooter className="flex justify-between">
          <Button 
            variant="outline" 
            onClick={testConnection}
            disabled={testing}
          >
            {testing ? (
              <>
                <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                Testing...
              </>
            ) : (
              'Test Connection'
            )}
          </Button>
          <Button 
            onClick={saveConfig}
            disabled={loading}
          >
            Save Configuration
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default DatabaseSettings;
