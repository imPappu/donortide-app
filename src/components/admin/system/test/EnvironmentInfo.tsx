
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Server } from "lucide-react";

interface EnvironmentInfoProps {
  testModeEnabled: boolean;
}

const EnvironmentInfo = ({ testModeEnabled }: EnvironmentInfoProps) => {
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
  );
};

export default EnvironmentInfo;
