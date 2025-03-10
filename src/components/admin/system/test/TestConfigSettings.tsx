
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { RefreshCw, TestTube } from "lucide-react";

interface EndpointConfig {
  api: boolean;
  database: boolean;
  auth: boolean;
  payment: boolean;
}

interface TestConfigSettingsProps {
  testModeEnabled: boolean;
  testingInProgress: boolean;
  mockDataEnabled: boolean;
  testEndpoints: EndpointConfig;
  setMockDataEnabled: (enabled: boolean) => void;
  handleEndpointToggle: (endpoint: keyof EndpointConfig) => void;
  runTestSuite: () => void;
}

const TestConfigSettings = ({
  testModeEnabled,
  testingInProgress,
  mockDataEnabled,
  testEndpoints,
  setMockDataEnabled,
  handleEndpointToggle,
  runTestSuite
}: TestConfigSettingsProps) => {
  return (
    <Card>
      <CardContent className="space-y-4 pt-6">
        <div className="border rounded-lg p-4">
          <h3 className="font-medium mb-3">Test Environment Configuration</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="mockData">Use Mock Data</Label>
                <p className="text-xs text-muted-foreground">Generate synthetic data for testing</p>
              </div>
              <Switch 
                id="mockData" 
                checked={mockDataEnabled} 
                onCheckedChange={() => setMockDataEnabled(!mockDataEnabled)}
                disabled={!testModeEnabled}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="apiEndpoint">API Endpoints</Label>
                <p className="text-xs text-muted-foreground">Test REST API endpoints</p>
              </div>
              <Switch 
                id="apiEndpoint" 
                checked={testEndpoints.api} 
                onCheckedChange={() => handleEndpointToggle("api")}
                disabled={!testModeEnabled}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="dbEndpoint">Database Connections</Label>
                <p className="text-xs text-muted-foreground">Test database queries and operations</p>
              </div>
              <Switch 
                id="dbEndpoint" 
                checked={testEndpoints.database} 
                onCheckedChange={() => handleEndpointToggle("database")}
                disabled={!testModeEnabled}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="authEndpoint">Authentication</Label>
                <p className="text-xs text-muted-foreground">Test login and registration flows</p>
              </div>
              <Switch 
                id="authEndpoint" 
                checked={testEndpoints.auth} 
                onCheckedChange={() => handleEndpointToggle("auth")}
                disabled={!testModeEnabled}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="paymentEndpoint">Payment Gateways</Label>
                <p className="text-xs text-muted-foreground">Test payment processing with test cards</p>
              </div>
              <Switch 
                id="paymentEndpoint" 
                checked={testEndpoints.payment} 
                onCheckedChange={() => handleEndpointToggle("payment")}
                disabled={!testModeEnabled}
              />
            </div>
          </div>
        </div>
        
        <Button 
          onClick={runTestSuite} 
          disabled={!testModeEnabled || testingInProgress}
          className="w-full"
        >
          {testingInProgress ? (
            <>
              <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
              Running Tests...
            </>
          ) : (
            <>
              <TestTube className="mr-2 h-4 w-4" />
              Run Test Suite
            </>
          )}
        </Button>
      </CardContent>
    </Card>
  );
};

export default TestConfigSettings;
