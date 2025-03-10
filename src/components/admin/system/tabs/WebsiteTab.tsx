
import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Globe, Save } from "lucide-react";
import { WebsiteTabProps } from "../types";

const WebsiteTab = ({ websiteVersion, handleWebsiteSettingsSave }: WebsiteTabProps) => {
  const [localVersion, setLocalVersion] = useState(websiteVersion);
  const [maintenanceWindow, setMaintenanceWindow] = useState("2023-12-25T02:00");
  
  const handleSave = () => {
    const settings = {
      version: localVersion,
      maintenanceWindow
    };
    
    handleWebsiteSettingsSave(settings);
  };
  
  return (
    <div className="space-y-4">
      <Card>
        <CardContent className="pt-6">
          <div className="mb-6">
            <h2 className="text-xl font-bold flex items-center">
              <Globe className="mr-2 h-5 w-5 text-primary" />
              Website Settings
            </h2>
            <p className="text-muted-foreground">Manage your website version and settings</p>
          </div>
          
          <div className="space-y-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="websiteVersion" className="text-sm font-medium">
                  Website Version
                </label>
                <Input 
                  id="websiteVersion"
                  value={localVersion}
                  onChange={(e) => setLocalVersion(e.target.value)}
                  placeholder="e.g., 1.0.0"
                />
                <p className="text-xs text-muted-foreground">
                  This version will be displayed in the website footer
                </p>
              </div>
              
              <div className="space-y-2">
                <label htmlFor="maintenanceMode" className="text-sm font-medium">
                  Maintenance Window
                </label>
                <Input 
                  id="maintenanceWindow"
                  type="datetime-local"
                  value={maintenanceWindow}
                  onChange={(e) => setMaintenanceWindow(e.target.value)}
                />
                <p className="text-xs text-muted-foreground">
                  Schedule a maintenance window for your website
                </p>
              </div>
            </div>
            
            <Button 
              className="w-full" 
              onClick={handleSave}
            >
              <Save className="mr-2 h-4 w-4" />
              Save Settings
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default WebsiteTab;
