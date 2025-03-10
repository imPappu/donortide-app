
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Shield, Download } from "lucide-react";

export interface CoreSystemTabProps {
  updating: boolean;
  progress: number;
  handleSystemUpdate: () => Promise<void>;
}

const CoreSystemTab = ({ updating, progress, handleSystemUpdate }: CoreSystemTabProps) => {
  const updateAvailable = true; // This should be determined by your API
  
  return (
    <div className="space-y-4">
      <Card>
        <CardContent className="pt-6">
          <div className="mb-6">
            <h2 className="text-xl font-bold flex items-center">
              <Shield className="mr-2 h-5 w-5 text-primary" />
              Core System
            </h2>
            <p className="text-muted-foreground">Manage your core system updates</p>
          </div>
          
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-medium">Current Version</h3>
                <p className="text-sm text-muted-foreground">v3.2.1</p>
              </div>
              {updateAvailable && (
                <div className="text-right">
                  <h3 className="text-lg font-medium">New Version Available</h3>
                  <p className="text-sm text-green-600">v3.3.0</p>
                </div>
              )}
            </div>
            
            {updating ? (
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">Updating system... {progress}%</p>
                <Progress value={progress} className="h-2" />
              </div>
            ) : (
              <Button 
                className="w-full" 
                onClick={handleSystemUpdate}
                disabled={!updateAvailable}
              >
                <Download className="mr-2 h-4 w-4" />
                {updateAvailable ? "Update Now" : "No Updates Available"}
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CoreSystemTab;
