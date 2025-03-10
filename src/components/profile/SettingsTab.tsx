
import React from "react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { SettingsIcon, LogOut } from "lucide-react";
import { useAuth } from "@/components/auth/AuthContext";
import { useNavigate } from "react-router-dom";

const SettingsTab = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();
  
  const handleLogout = () => {
    logout();
    navigate("/");
  };
  
  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <h3 className="font-medium">Notifications</h3>
        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <Label className="text-base">Urgent Blood Requests</Label>
            <p className="text-sm text-muted-foreground">Receive alerts for urgent requests</p>
          </div>
          <Switch defaultChecked />
        </div>
        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <Label className="text-base">Nearby Requests</Label>
            <p className="text-sm text-muted-foreground">Get notified about requests in your area</p>
          </div>
          <Switch defaultChecked />
        </div>
        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <Label className="text-base">Donation Reminders</Label>
            <p className="text-sm text-muted-foreground">Reminders when you're eligible to donate again</p>
          </div>
          <Switch defaultChecked />
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="font-medium">Account</h3>
        <Button variant="outline" className="w-full justify-start">
          <SettingsIcon className="mr-2 h-4 w-4" /> Account Settings
        </Button>
        <Button 
          variant="outline" 
          className="w-full justify-start text-red-500 hover:text-red-500 hover:bg-red-50" 
          onClick={handleLogout}
        >
          <LogOut className="mr-2 h-4 w-4" /> Logout
        </Button>
      </div>
    </div>
  );
};

export default SettingsTab;
