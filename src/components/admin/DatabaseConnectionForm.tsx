
import React from 'react';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface DatabaseConfig {
  host: string;
  port: string;
  database: string;
  username: string;
  password: string;
  type: string;
  ssl_enabled: boolean;
}

interface DatabaseConnectionFormProps {
  config: DatabaseConfig;
  handleChange: (key: keyof DatabaseConfig, value: string | boolean) => void;
}

const DatabaseConnectionForm = ({ config, handleChange }: DatabaseConnectionFormProps) => {
  return (
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
  );
};

export default DatabaseConnectionForm;
