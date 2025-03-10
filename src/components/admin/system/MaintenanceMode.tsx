
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { 
  AlertCircle, 
  Clock, 
  Settings, 
  Calendar, 
  Users,
  MessageSquare,
  Check,
  Wrench
} from "lucide-react";

const MaintenanceMode = () => {
  const { toast } = useToast();
  const [maintenanceActive, setMaintenanceActive] = useState(false);
  const [scheduledMaintenance, setScheduledMaintenance] = useState(false);
  const [maintenanceMessage, setMaintenanceMessage] = useState("We're currently performing maintenance. Please check back soon.");
  const [maintenanceDate, setMaintenanceDate] = useState("");
  const [maintenanceTime, setMaintenanceTime] = useState("");
  const [maintenanceDuration, setMaintenanceDuration] = useState("60");
  const [saving, setSaving] = useState(false);

  const toggleMaintenance = () => {
    setMaintenanceActive(!maintenanceActive);
  };

  const saveSettings = async () => {
    try {
      setSaving(true);
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: maintenanceActive ? "Maintenance Mode Activated" : "Maintenance Mode Deactivated",
        description: maintenanceActive 
          ? "Your site is now in maintenance mode and is inaccessible to regular users." 
          : "Your site is now live and accessible to all users.",
      });
      
    } catch (error) {
      console.error("Error saving maintenance settings:", error);
      toast({
        title: "Error",
        description: "Failed to save maintenance settings. Please try again.",
        variant: "destructive",
      });
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-6">
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
      
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Users className="mr-2 h-5 w-5 text-blue-500" />
            Whitelist Access
          </CardTitle>
          <CardDescription>
            Configure IP addresses and user roles that can bypass maintenance mode
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <Label htmlFor="ip-whitelist">IP Whitelist (one per line)</Label>
              <Textarea
                id="ip-whitelist"
                placeholder="127.0.0.1
192.168.1.100"
                className="mt-1 font-mono text-sm"
              />
            </div>
            
            <div>
              <Label>Roles with Access</Label>
              <div className="grid grid-cols-2 gap-2 mt-2">
                <div className="flex items-center space-x-2">
                  <Switch id="role-admin" defaultChecked={true} disabled />
                  <Label htmlFor="role-admin">Administrators</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch id="role-staff" defaultChecked={false} />
                  <Label htmlFor="role-staff">Staff</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch id="role-editors" defaultChecked={false} />
                  <Label htmlFor="role-editors">Editors</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch id="role-moderators" defaultChecked={false} />
                  <Label htmlFor="role-moderators">Moderators</Label>
                </div>
              </div>
            </div>
            
            <Button variant="outline" className="w-full mt-4">
              Update Access Settings
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default MaintenanceMode;
