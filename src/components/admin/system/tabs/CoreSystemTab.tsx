
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { AlertCircle, Download } from "lucide-react";

interface CoreSystemTabProps {
  updateAvailable: boolean;
  updating: boolean;
  progress: number;
  handleSystemUpdate: () => Promise<void>;
}

const CoreSystemTab = ({ 
  updateAvailable, 
  updating, 
  progress, 
  handleSystemUpdate 
}: CoreSystemTabProps) => {
  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Core System Updates</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {updateAvailable && (
            <div className="bg-blue-50 dark:bg-blue-900 p-4 rounded-lg">
              <div className="flex items-start gap-3">
                <div className="mt-0.5">
                  <AlertCircle className="h-5 w-5 text-blue-500" />
                </div>
                <div>
                  <h3 className="font-medium text-blue-800 dark:text-blue-200">Update Available</h3>
                  <p className="text-sm text-blue-700 dark:text-blue-300 mt-1">
                    Version 2.5.0 is available (Current: 2.4.2)
                  </p>
                  <div className="mt-2 text-sm text-blue-700 dark:text-blue-300">
                    <p className="font-medium">What's new:</p>
                    <ul className="list-disc list-inside mt-1 space-y-1">
                      <li>Enhanced security features</li>
                      <li>Improved performance and stability</li>
                      <li>New admin dashboard widgets</li>
                      <li>Bug fixes and minor improvements</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {updating && (
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Updating system...</span>
                <span>{progress}%</span>
              </div>
              <Progress value={progress} />
            </div>
          )}
          
          <div className="flex justify-end">
            <Button 
              onClick={handleSystemUpdate} 
              disabled={updating}
              className="flex items-center gap-2"
            >
              <Download className="h-4 w-4" />
              {updating ? "Updating..." : "Update Now"}
            </Button>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>System Information</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm font-medium">Current Version</p>
              <p className="text-lg">2.4.2</p>
            </div>
            <div>
              <p className="text-sm font-medium">Last Updated</p>
              <p className="text-lg">2023-10-15</p>
            </div>
            <div>
              <p className="text-sm font-medium">Database Version</p>
              <p className="text-lg">1.8.3</p>
            </div>
            <div>
              <p className="text-sm font-medium">Server Environment</p>
              <p className="text-lg">Production</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </>
  );
};

export default CoreSystemTab;
