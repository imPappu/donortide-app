
import React from 'react';
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { RefreshCw } from 'lucide-react';

interface DatabaseConfig {
  ssl_enabled: boolean;
}

interface DatabaseConnectionActionsProps {
  config: DatabaseConfig;
  handleChange: (key: keyof DatabaseConfig, value: boolean) => void;
  testConnection: () => Promise<void>;
  saveConfig: () => Promise<void>;
  testing: boolean;
  loading: boolean;
}

const DatabaseConnectionActions = ({ 
  config, 
  handleChange, 
  testConnection, 
  saveConfig, 
  testing, 
  loading 
}: DatabaseConnectionActionsProps) => {
  return (
    <>
      <div className="flex items-center space-x-2 mt-4">
        <Switch 
          id="ssl_enabled"
          checked={config.ssl_enabled}
          onCheckedChange={(checked) => handleChange('ssl_enabled', checked)}
        />
        <Label htmlFor="ssl_enabled">Enable SSL Connection</Label>
      </div>
      
      <div className="flex justify-between mt-6">
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
      </div>
    </>
  );
};

export default DatabaseConnectionActions;
