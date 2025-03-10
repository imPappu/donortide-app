
import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Check, Play, RefreshCcw } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";

interface TestConfigSettingsProps {
  testConfig: {
    mockedResponses: boolean;
    useSandboxAPI: boolean;
    simulateLatency: boolean;
    customTestData: string;
  };
  onConfigChange: (config: any) => void;
  onRunTests: () => void;
  isRunningTests: boolean;
  testResults: {
    success: boolean;
    message: string;
  } | null;
}

const TestConfigSettings: React.FC<TestConfigSettingsProps> = ({
  testConfig,
  onConfigChange,
  onRunTests,
  isRunningTests,
  testResults,
}) => {
  // Define the testEndpoints that was missing
  const testEndpoints = [
    { name: "Users API", path: "/api/users" },
    { name: "Donations API", path: "/api/donations" },
    { name: "Settings API", path: "/api/settings" },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl">Test Configuration</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="mocked-responses">Use Mocked Responses</Label>
              <div className="text-xs text-muted-foreground">
                Return predefined responses instead of calling real APIs
              </div>
            </div>
            <Switch
              id="mocked-responses"
              checked={testConfig.mockedResponses}
              onCheckedChange={(checked) =>
                onConfigChange({ ...testConfig, mockedResponses: checked })
              }
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="sandbox-api">Use Sandbox API</Label>
              <div className="text-xs text-muted-foreground">
                Connect to sandbox environment for testing
              </div>
            </div>
            <Switch
              id="sandbox-api"
              checked={testConfig.useSandboxAPI}
              onCheckedChange={(checked) =>
                onConfigChange({ ...testConfig, useSandboxAPI: checked })
              }
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="simulate-latency">Simulate Network Latency</Label>
              <div className="text-xs text-muted-foreground">
                Add artificial delay to API responses
              </div>
            </div>
            <Switch
              id="simulate-latency"
              checked={testConfig.simulateLatency}
              onCheckedChange={(checked) =>
                onConfigChange({ ...testConfig, simulateLatency: checked })
              }
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="custom-test-data">Custom Test Data (JSON)</Label>
          <Textarea
            id="custom-test-data"
            placeholder='{"userId": "test-123", "role": "admin"}'
            value={testConfig.customTestData}
            onChange={(e) =>
              onConfigChange({ ...testConfig, customTestData: e.target.value })
            }
            className="font-mono text-sm"
            rows={4}
          />
        </div>

        <div className="space-y-2">
          <Label>Test Endpoints</Label>
          <div className="grid gap-2">
            {testEndpoints.map((endpoint) => (
              <div
                key={endpoint.path}
                className="flex items-center justify-between rounded border p-2 text-sm"
              >
                <span className="font-medium">{endpoint.name}</span>
                <code className="text-xs text-muted-foreground">
                  {endpoint.path}
                </code>
              </div>
            ))}
          </div>
        </div>

        <div className="pt-2">
          <Button
            onClick={onRunTests}
            disabled={isRunningTests}
            className="w-full"
          >
            {isRunningTests ? (
              <RefreshCcw className="mr-2 h-4 w-4 animate-spin" />
            ) : testResults?.success ? (
              <Check className="mr-2 h-4 w-4" />
            ) : (
              <Play className="mr-2 h-4 w-4" />
            )}
            {isRunningTests
              ? "Running Tests..."
              : testResults
              ? "Run Tests Again"
              : "Run Tests"}
          </Button>
        </div>

        {testResults && (
          <div
            className={`mt-4 rounded-md p-3 text-sm ${
              testResults.success
                ? "bg-green-50 text-green-800 dark:bg-green-900/30 dark:text-green-300"
                : "bg-red-50 text-red-800 dark:bg-red-900/30 dark:text-red-300"
            }`}
          >
            {testResults.message}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default TestConfigSettings;
