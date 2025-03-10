
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { PlayCircle, Database, Globe, Lock, CreditCard } from 'lucide-react';

export interface TestConfigSettingsProps {
  mockDataEnabled: boolean;
  setMockDataEnabled: (enabled: boolean) => void;
  testingInProgress: boolean;
  testEndpoints: {
    api: boolean;
    database: boolean;
    auth: boolean;
    payment: boolean;
  };
  handleEndpointToggle: (endpoint: 'api' | 'database' | 'auth' | 'payment') => void;
  runTestSuite: () => void;
}

const TestConfigSettings: React.FC<TestConfigSettingsProps> = ({
  mockDataEnabled,
  setMockDataEnabled,
  testingInProgress,
  testEndpoints,
  handleEndpointToggle,
  runTestSuite
}) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Test Configuration</CardTitle>
        <CardDescription>Configure test settings and run test suites</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="mock-data">Use Mock Data</Label>
              <p className="text-sm text-muted-foreground">Use sample data instead of real API calls</p>
            </div>
            <Switch 
              id="mock-data" 
              checked={mockDataEnabled}
              onCheckedChange={setMockDataEnabled}
            />
          </div>
          
          <div className="space-y-2">
            <Label>Test Endpoints</Label>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center space-x-2">
                <Switch 
                  id="api-endpoint" 
                  checked={testEndpoints.api}
                  onCheckedChange={() => handleEndpointToggle('api')}
                />
                <Label htmlFor="api-endpoint" className="flex items-center gap-1">
                  <Globe className="h-4 w-4" /> API
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <Switch 
                  id="db-endpoint" 
                  checked={testEndpoints.database}
                  onCheckedChange={() => handleEndpointToggle('database')}
                />
                <Label htmlFor="db-endpoint" className="flex items-center gap-1">
                  <Database className="h-4 w-4" /> Database
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <Switch 
                  id="auth-endpoint" 
                  checked={testEndpoints.auth}
                  onCheckedChange={() => handleEndpointToggle('auth')}
                />
                <Label htmlFor="auth-endpoint" className="flex items-center gap-1">
                  <Lock className="h-4 w-4" /> Auth
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <Switch 
                  id="payment-endpoint" 
                  checked={testEndpoints.payment}
                  onCheckedChange={() => handleEndpointToggle('payment')}
                />
                <Label htmlFor="payment-endpoint" className="flex items-center gap-1">
                  <CreditCard className="h-4 w-4" /> Payment
                </Label>
              </div>
            </div>
          </div>
        </div>
        
        <Button 
          onClick={runTestSuite} 
          disabled={testingInProgress}
          className="w-full"
        >
          <PlayCircle className="mr-2 h-4 w-4" />
          {testingInProgress ? 'Running Tests...' : 'Run Test Suite'}
        </Button>
      </CardContent>
    </Card>
  );
};

export default TestConfigSettings;
