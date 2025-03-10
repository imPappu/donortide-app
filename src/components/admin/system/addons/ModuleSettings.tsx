
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Sliders, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import ModuleSetting from "./ModuleSetting";
import { useToast } from "@/hooks/use-toast";

interface ModuleSettingsProps {
  moduleSettings: {
    autoUpdates: boolean;
    compatibilityCheck: boolean;
    developmentMode: boolean;
    securityScanning: boolean;
  };
  onSettingChange: (setting: string, value: boolean) => void;
}

const ModuleSettings = ({ moduleSettings, onSettingChange }: ModuleSettingsProps) => {
  const { toast } = useToast();
  
  const handleSaveSettings = () => {
    toast({
      title: "Settings Saved",
      description: "Module settings have been updated successfully",
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Sliders className="mr-2 h-5 w-5 text-primary" />
          Module Settings
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <Alert className="bg-blue-50 dark:bg-blue-950 border-blue-200 dark:border-blue-800">
            <AlertTriangle className="h-4 w-4 text-blue-600 dark:text-blue-400" />
            <AlertDescription className="text-blue-700 dark:text-blue-300">
              Configure global settings for how addon modules operate in your system.
            </AlertDescription>
          </Alert>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <ModuleSetting
              title="Auto-Updates"
              description="Automatically update modules when new versions are available"
              enabled={moduleSettings.autoUpdates}
              onChange={(value) => onSettingChange("autoUpdates", value)}
            />
            
            <ModuleSetting
              title="Compatibility Check"
              description="Run compatibility checks before installing modules"
              enabled={moduleSettings.compatibilityCheck}
              onChange={(value) => onSettingChange("compatibilityCheck", value)}
            />
            
            <ModuleSetting
              title="Development Mode"
              description="Enable development tools for custom module creation"
              enabled={moduleSettings.developmentMode}
              onChange={(value) => onSettingChange("developmentMode", value)}
            />
            
            <ModuleSetting
              title="Security Scanning"
              description="Scan uploaded modules for security vulnerabilities"
              enabled={moduleSettings.securityScanning}
              onChange={(value) => onSettingChange("securityScanning", value)}
            />
          </div>
          
          <div className="flex justify-end mt-2">
            <Button onClick={handleSaveSettings}>
              Save Module Settings
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ModuleSettings;
