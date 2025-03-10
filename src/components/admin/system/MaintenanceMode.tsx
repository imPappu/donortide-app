
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertTriangle, Clock, Tool, Calendar, Power } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const MaintenanceMode = () => {
  const { toast } = useToast();
  const [maintenanceEnabled, setMaintenanceEnabled] = useState(false);
  const [scheduledMaintenance, setScheduledMaintenance] = useState(false);
  const [maintenanceMessage, setMaintenanceMessage] = useState(
    "Our system is currently undergoing scheduled maintenance. We'll be back shortly. Thank you for your patience."
  );
  const [maintenanceDate, setMaintenanceDate] = useState("");
  const [maintenanceTime, setMaintenanceTime] = useState("");
  const [maintenanceDuration, setMaintenanceDuration] = useState("60");
  const [whitelistedIPs, setWhitelistedIPs] = useState("127.0.0.1");

  const toggleMaintenanceMode = () => {
    const newStatus = !maintenanceEnabled;
    setMaintenanceEnabled(newStatus);
    
    toast({
      title: newStatus ? "Maintenance Mode Activated" : "Maintenance Mode Deactivated",
      description: newStatus 
        ? "Your site is now in maintenance mode and is not accessible to regular users." 
        : "Your site is now live and accessible to all users.",
    });
  };

  const saveMaintenanceSettings = () => {
    toast({
      title: "Settings Saved",
      description: "Maintenance mode settings have been updated successfully.",
    });
  };

  const scheduleMaintenanceWindow = () => {
    if (!maintenanceDate || !maintenanceTime || !maintenanceDuration) {
      toast({
        title: "Validation Error",
        description: "Please fill all required fields for scheduled maintenance.",
        variant: "destructive"
      });
      return;
    }
    
    toast({
      title: "Maintenance Scheduled",
      description: `Maintenance has been scheduled for ${maintenanceDate} at ${maintenanceTime} for ${maintenanceDuration} minutes.`,
    });
    
    setScheduledMaintenance(true);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Tool className="mr-2 h-5 w-5 text-amber-500" />
            Maintenance Mode
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {maintenanceEnabled && (
            <Alert className="bg-amber-50 border-amber-200 dark:bg-amber-950 dark:border-amber-800">
              <AlertTriangle className="h-4 w-4 text-amber-600 dark:text-amber-400" />
              <AlertDescription className="text-amber-800 dark:text-amber-200">
                Maintenance mode is currently active. Only administrators and whitelisted IPs can access the site.
              </AlertDescription>
            </Alert>
          )}

          <div className="flex items-center justify-between border p-4 rounded-lg">
            <div>
              <h3 className="font-medium">Maintenance Mode</h3>
              <p className="text-sm text-muted-foreground">
                {maintenanceEnabled 
                  ? "Visitors will see a maintenance page" 
                  : "Site is currently live for all visitors"}
              </p>
            </div>
            <Switch 
              checked={maintenanceEnabled} 
              onCheckedChange={toggleMaintenanceMode}
            />
          </div>

          <div className="border rounded-lg p-4 space-y-4">
            <h3 className="font-medium">Maintenance Message</h3>
            <Textarea 
              value={maintenanceMessage} 
              onChange={(e) => setMaintenanceMessage(e.target.value)}
              className="min-h-[100px]"
              placeholder="Enter the message to display during maintenance"
            />
          </div>

          <div className="border rounded-lg p-4 space-y-4">
            <h3 className="font-medium">IP Whitelist</h3>
            <p className="text-sm text-muted-foreground">
              These IPs will still be able to access the site during maintenance
            </p>
            <Textarea 
              value={whitelistedIPs} 
              onChange={(e) => setWhitelistedIPs(e.target.value)}
              placeholder="Enter IP addresses, one per line"
              className="min-h-[80px]"
            />
            <p className="text-xs text-muted-foreground">
              Enter one IP address per line. Your current IP is automatically whitelisted.
            </p>
          </div>
          
          <div className="border rounded-lg p-4 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium">Schedule Maintenance</h3>
                <p className="text-sm text-muted-foreground">
                  Plan ahead and schedule maintenance windows
                </p>
              </div>
              <div className="flex items-center space-x-2">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">
                  {scheduledMaintenance ? "Maintenance Scheduled" : "No Schedule"}
                </span>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="maintenance-date">Date</Label>
                <Input 
                  id="maintenance-date"
                  type="date" 
                  value={maintenanceDate}
                  onChange={(e) => setMaintenanceDate(e.target.value)}
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="maintenance-time">Time</Label>
                <Input 
                  id="maintenance-time"
                  type="time" 
                  value={maintenanceTime}
                  onChange={(e) => setMaintenanceTime(e.target.value)}
                  className="mt-1"
                />
              </div>
            </div>
            
            <div>
              <Label htmlFor="maintenance-duration">Duration (minutes)</Label>
              <Input 
                id="maintenance-duration"
                type="number" 
                min="5"
                value={maintenanceDuration}
                onChange={(e) => setMaintenanceDuration(e.target.value)}
                className="mt-1"
              />
            </div>
            
            <Button onClick={scheduleMaintenanceWindow}>
              <Clock className="mr-2 h-4 w-4" />
              Schedule Maintenance
            </Button>
          </div>
          
          <div className="flex justify-end">
            <Button onClick={saveMaintenanceSettings}>
              Save Maintenance Settings
            </Button>
          </div>
        </CardContent>
      </Card>
      
      {scheduledMaintenance && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Clock className="mr-2 h-5 w-5 text-blue-500" />
              Scheduled Maintenance
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="border rounded-lg p-4">
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                <div>
                  <p className="text-sm font-medium">Date</p>
                  <p className="text-lg">{maintenanceDate}</p>
                </div>
                <div>
                  <p className="text-sm font-medium">Time</p>
                  <p className="text-lg">{maintenanceTime}</p>
                </div>
                <div>
                  <p className="text-sm font-medium">Duration</p>
                  <p className="text-lg">{maintenanceDuration} minutes</p>
                </div>
              </div>
              
              <div className="mt-4 flex justify-end">
                <Button variant="destructive" size="sm" onClick={() => setScheduledMaintenance(false)}>
                  Cancel Scheduled Maintenance
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default MaintenanceMode;
