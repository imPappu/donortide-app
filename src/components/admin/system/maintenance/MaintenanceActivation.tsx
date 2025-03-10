
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AlertCircle, Check, Wrench } from "lucide-react";

interface MaintenanceActivationProps {
  maintenanceActive: boolean;
  toggleMaintenance: () => void;
  maintenanceMessage: string;
  setMaintenanceMessage: (message: string) => void;
  scheduledMaintenance: boolean;
  setScheduledMaintenance: (scheduled: boolean) => void;
  maintenanceDate: string;
  setMaintenanceDate: (date: string) => void;
  maintenanceTime: string;
  setMaintenanceTime: (time: string) => void;
  maintenanceDuration: string;
  setMaintenanceDuration: (duration: string) => void;
  saving: boolean;
  saveSettings: () => Promise<void>;
}

const MaintenanceActivation: React.FC<MaintenanceActivationProps> = ({
  maintenanceActive,
  toggleMaintenance,
  maintenanceMessage,
  setMaintenanceMessage,
  scheduledMaintenance,
  setScheduledMaintenance,
  maintenanceDate,
  setMaintenanceDate,
  maintenanceTime,
  setMaintenanceTime,
  maintenanceDuration,
  setMaintenanceDuration,
  saving,
  saveSettings
}) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Wrench className="mr-2 h-5 w-5 text-orange-500" />
          Maintenance Mode
        </CardTitle>
        <CardDescription>
          Enable maintenance mode to make your site inaccessible to regular users while you perform updates.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Switch 
              checked={maintenanceActive} 
              onCheckedChange={toggleMaintenance}
              id="maintenance-mode"
            />
            <Label htmlFor="maintenance-mode" className="font-medium">
              {maintenanceActive ? "Maintenance Mode Active" : "Maintenance Mode Inactive"}
            </Label>
          </div>
          <div>
            {maintenanceActive && (
              <span className="bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200 text-xs px-2 py-1 rounded-full">
                Site Offline
              </span>
            )}
          </div>
        </div>
        
        {maintenanceActive && (
          <div className="mt-6 space-y-4">
            <div>
              <Label htmlFor="maintenance-message">Maintenance Message</Label>
              <Textarea
                id="maintenance-message"
                value={maintenanceMessage}
                onChange={(e) => setMaintenanceMessage(e.target.value)}
                placeholder="Enter the message to display to users"
                className="mt-1"
              />
            </div>
            
            <div className="flex items-center space-x-2 mt-4">
              <Switch 
                checked={scheduledMaintenance} 
                onCheckedChange={setScheduledMaintenance}
                id="scheduled-maintenance"
              />
              <Label htmlFor="scheduled-maintenance" className="font-medium">
                Schedule Maintenance
              </Label>
            </div>
            
            {scheduledMaintenance && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                <div>
                  <Label htmlFor="maintenance-date">Maintenance Date</Label>
                  <Input
                    id="maintenance-date"
                    type="date"
                    value={maintenanceDate}
                    onChange={(e) => setMaintenanceDate(e.target.value)}
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="maintenance-time">Maintenance Time</Label>
                  <Input
                    id="maintenance-time"
                    type="time"
                    value={maintenanceTime}
                    onChange={(e) => setMaintenanceTime(e.target.value)}
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="maintenance-duration">Duration (minutes)</Label>
                  <Input
                    id="maintenance-duration"
                    type="number"
                    value={maintenanceDuration}
                    onChange={(e) => setMaintenanceDuration(e.target.value)}
                    min="1"
                    className="mt-1"
                  />
                </div>
              </div>
            )}
            
            <div className="bg-muted p-4 rounded-md mt-4">
              <h4 className="text-sm font-medium mb-2 flex items-center">
                <AlertCircle className="h-4 w-4 mr-1 text-amber-500" />
                Important Notes
              </h4>
              <ul className="text-sm space-y-1 text-muted-foreground">
                <li className="flex items-start">
                  <Check className="h-3 w-3 mr-1 mt-1 text-green-500" />
                  Admin users can still access the site during maintenance
                </li>
                <li className="flex items-start">
                  <Check className="h-3 w-3 mr-1 mt-1 text-green-500" />
                  You can customize who can bypass maintenance mode in settings
                </li>
                <li className="flex items-start">
                  <Check className="h-3 w-3 mr-1 mt-1 text-green-500" />
                  API endpoints can still be accessed by authenticated requests
                </li>
              </ul>
            </div>
          </div>
        )}
        
        <div className="mt-6">
          <Button 
            onClick={saveSettings} 
            disabled={saving}
            className="w-full md:w-auto"
          >
            {saving ? "Saving..." : "Save Settings"}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default MaintenanceActivation;
