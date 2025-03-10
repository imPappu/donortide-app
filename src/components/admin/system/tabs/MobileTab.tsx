
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Smartphone, Download } from "lucide-react";

export interface MobileTabProps {
  mobileUpdating: boolean;
  handleMobileUpdate: (platform: string) => Promise<void>;
}

const MobileTab = ({ mobileUpdating, handleMobileUpdate }: MobileTabProps) => {
  return (
    <div className="space-y-4">
      <Card>
        <CardContent className="pt-6">
          <div className="mb-6">
            <h2 className="text-xl font-bold flex items-center">
              <Smartphone className="mr-2 h-5 w-5 text-primary" />
              Mobile Apps
            </h2>
            <p className="text-muted-foreground">Manage your mobile application versions</p>
          </div>
          
          <div className="space-y-6">
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-4 border p-4 rounded-lg">
                <h3 className="font-medium">iOS Application</h3>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Current: v2.1.0</span>
                  <span className="text-sm text-green-600">New: v2.1.1</span>
                </div>
                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={() => handleMobileUpdate('ios')}
                  disabled={mobileUpdating}
                >
                  <Download className="mr-2 h-4 w-4" />
                  Update iOS App
                </Button>
              </div>
              
              <div className="space-y-4 border p-4 rounded-lg">
                <h3 className="font-medium">Android Application</h3>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Current: v2.0.8</span>
                  <span className="text-sm text-green-600">New: v2.1.0</span>
                </div>
                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={() => handleMobileUpdate('android')}
                  disabled={mobileUpdating}
                >
                  <Download className="mr-2 h-4 w-4" />
                  Update Android App
                </Button>
              </div>
            </div>
            
            {mobileUpdating && (
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">Updating mobile applications...</p>
                <Progress value={45} className="h-2" />
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default MobileTab;
