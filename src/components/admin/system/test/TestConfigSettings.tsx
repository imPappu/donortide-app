
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Settings, Play } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

interface TestConfigSettingsProps {
  testModeEnabled: boolean;
  testingInProgress: boolean;
  mockDataEnabled: boolean;
  testEndpoints: {
    api: boolean;
    database: boolean;
    auth: boolean;
    payment: boolean;
  };
  setMockDataEnabled: (enabled: boolean) => void;
  handleEndpointToggle: (endpoint: keyof typeof testEndpoints) => void;
  runTestSuite: () => Promise<void>;
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
      <CardHeader>
        <CardTitle className="flex items-center">
          <Settings className="mr-2 h-5 w-5 text-orange-500" />
          Test Configuration
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-center justify-between border p-4 rounded-lg">
            <div>
              <h3 className="font-medium">Use Mock Data</h3>
              <p className="text-sm text-muted-foreground">
                Use mock data instead of real API endpoints during testing
              </p>
            </div>
            <Switch
              checked={mockDataEnabled}
              onCheckedChange={setMockDataEnabled}
              disabled={!testModeEnabled}
            />
          </div>

          <div className="border p-4 rounded-lg space-y-3">
            <h3 className="font-medium mb-2">Test Endpoints</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="api-endpoint"
                  checked={testEndpoints.api}
                  onCheckedChange={() => handleEndpointToggle('api')}
                  disabled={!testModeEnabled}
                />
                <Label htmlFor="api-endpoint" className="text-sm">API Services</Label>
              </div>
              
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="database-endpoint"
                  checked={testEndpoints.database}
                  onCheckedChange={() => handleEndpointToggle('database')}
                  disabled={!testModeEnabled}
                />
                <Label htmlFor="database-endpoint" className="text-sm">Database</Label>
              </div>
              
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="auth-endpoint"
                  checked={testEndpoints.auth}
                  onCheckedChange={() => handleEndpointToggle('auth')}
                  disabled={!testModeEnabled}
                />
                <Label htmlFor="auth-endpoint" className="text-sm">Authentication</Label>
              </div>
              
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="payment-endpoint"
                  checked={testEndpoints.payment}
                  onCheckedChange={() => handleEndpointToggle('payment')}
                  disabled={!testModeEnabled}
                />
                <Label htmlFor="payment-endpoint" className="text-sm">Payment</Label>
              </div>
            </div>
          </div>
          
          <div className="flex justify-end">
            <Button
              onClick={runTestSuite}
              disabled={!testModeEnabled || testingInProgress}
              className="flex items-center"
            >
              <Play className="mr-2 h-4 w-4" />
              {testingInProgress ? "Running Tests..." : "Run Test Suite"}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default TestConfigSettings;
