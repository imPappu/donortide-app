
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle, TestTube } from "lucide-react";

interface TestModeCardProps {
  testModeEnabled: boolean;
  toggleTestMode: () => void;
}

const TestModeCard = ({ testModeEnabled, toggleTestMode }: TestModeCardProps) => {
  return (
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
      </CardContent>
    </Card>
  );
};

export default TestModeCard;
