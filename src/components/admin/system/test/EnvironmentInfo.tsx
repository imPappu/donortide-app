
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Server } from "lucide-react";

interface EnvironmentInfoProps {
  testModeEnabled: boolean;
  testResults?: {
    passed: number;
    failed: number;
    skipped: number;
  };
}

const EnvironmentInfo = ({ testModeEnabled, testResults }: EnvironmentInfoProps) => {
  // Get current date/time for "Last Test Run"
  const lastTestRun = testResults ? new Date().toLocaleString() : '2 hours ago';
  
  return (
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
              <p className="text-sm mt-1">{lastTestRun}</p>
            </div>
          </div>
          
          {testResults && (
            <div className="border rounded-lg p-3">
              <p className="text-sm font-medium mb-2">Test Results</p>
              <div className="grid grid-cols-3 gap-2">
                <div className="bg-green-50 dark:bg-green-900 p-2 rounded-md text-center">
                  <p className="text-xs text-muted-foreground">Passed</p>
                  <p className="text-xl font-semibold text-green-600 dark:text-green-400">{testResults.passed}</p>
                </div>
                <div className="bg-red-50 dark:bg-red-900 p-2 rounded-md text-center">
                  <p className="text-xs text-muted-foreground">Failed</p>
                  <p className="text-xl font-semibold text-red-600 dark:text-red-400">{testResults.failed}</p>
                </div>
                <div className="bg-gray-50 dark:bg-gray-800 p-2 rounded-md text-center">
                  <p className="text-xs text-muted-foreground">Skipped</p>
                  <p className="text-xl font-semibold text-gray-600 dark:text-gray-400">{testResults.skipped}</p>
                </div>
              </div>
            </div>
          )}
          
          <div className="border rounded-lg p-3">
            <p className="text-sm font-medium mb-2">Available Test Accounts</p>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span>Admin:</span>
                <span className="font-mono">admin@example.com / admin123</span>
              </div>
              <div className="flex justify-between">
                <span>Donor:</span>
                <span className="font-mono">donor@example.com / password</span>
              </div>
              <div className="flex justify-between">
                <span>Provider:</span>
                <span className="font-mono">provider@example.com / password</span>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default EnvironmentInfo;
