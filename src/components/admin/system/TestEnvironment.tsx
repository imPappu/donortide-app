
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle, TestTube, Server, RefreshCw } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const TestEnvironment = () => {
  const { toast } = useToast();
  const [testModeEnabled, setTestModeEnabled] = useState(false);
  const [testingInProgress, setTestingInProgress] = useState(false);
  const [mockDataEnabled, setMockDataEnabled] = useState(true);
  const [testEndpoints, setTestEndpoints] = useState({
    api: true,
    database: true,
    auth: true,
    payment: false
  });

  const toggleTestMode = () => {
    const newStatus = !testModeEnabled;
    setTestModeEnabled(newStatus);
    toast({
      title: newStatus ? "Test Mode Enabled" : "Test Mode Disabled",
      description: newStatus 
        ? "System is now running in test mode. No real data will be affected." 
        : "System is now running in production mode.",
    });
  };

  const runTestSuite = async () => {
    setTestingInProgress(true);
    
    // Simulate test process
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    setTestingInProgress(false);
    toast({
      title: "Tests Completed",
      description: "All test suites passed successfully.",
    });
  };

  const handleEndpointToggle = (endpoint: keyof typeof testEndpoints) => {
    setTestEndpoints(prev => ({
      ...prev,
      [endpoint]: !prev[endpoint]
    }));
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <TestTube className="mr-2 h-5 w-5 text-blue-500" />
            Test Environment Controls
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Alert className="bg-blue-50 dark:bg-blue-950 border-blue-200 dark:border-blue-800">
            <AlertCircle className="h-4 w-4 text-blue-600 dark:text-blue-400" />
            <AlertDescription className="text-blue-700 dark:text-blue-300">
              Test mode allows you to test features and integrations without affecting production data.
              All operations performed in test mode are isolated from your live environment.
            </AlertDescription>
          </Alert>

          <div className="flex items-center justify-between border p-4 rounded-lg">
            <div>
              <h3 className="font-medium">Test Mode</h3>
              <p className="text-sm text-muted-foreground">
                {testModeEnabled 
                  ? "Currently running in test mode - production data is safe" 
                  : "Currently in production mode"}
              </p>
            </div>
            <Switch 
              checked={testModeEnabled} 
              onCheckedChange={toggleTestMode}
            />
          </div>

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
      
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Server className="mr-2 h-5 w-5 text-green-500" />
            Environment Information
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="border rounded-lg p-3">
                <p className="text-sm font-medium">Current Environment</p>
                <p className="text-lg font-semibold text-blue-600 dark:text-blue-400">
                  {testModeEnabled ? "Testing" : "Production"}
                </p>
              </div>
              <div className="border rounded-lg p-3">
                <p className="text-sm font-medium">Test Database</p>
                <p className="text-lg font-semibold text-green-500">Connected</p>
              </div>
              <div className="border rounded-lg p-3">
                <p className="text-sm font-medium">Test API Endpoint</p>
                <p className="text-xs text-muted-foreground mt-1 break-all">
                  https://api.donortide.com/test/v1
                </p>
              </div>
              <div className="border rounded-lg p-3">
                <p className="text-sm font-medium">Last Test Run</p>
                <p className="text-sm mt-1">2 hours ago</p>
              </div>
            </div>
            
            <div className="border rounded-lg p-3">
              <p className="text-sm font-medium mb-2">Available Test Accounts</p>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Admin:</span>
                  <span className="font-mono">testadmin@example.com / testpass123</span>
                </div>
                <div className="flex justify-between">
                  <span>Donor:</span>
                  <span className="font-mono">testdonor@example.com / testpass123</span>
                </div>
                <div className="flex justify-between">
                  <span>Organization:</span>
                  <span className="font-mono">testorg@example.com / testpass123</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default TestEnvironment;
