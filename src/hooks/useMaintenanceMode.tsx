
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

export function useMaintenanceMode() {
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

  return {
    maintenanceActive,
    scheduledMaintenance,
    maintenanceMessage,
    maintenanceDate,
    maintenanceTime,
    maintenanceDuration,
    saving,
    toggleMaintenance,
    setScheduledMaintenance,
    setMaintenanceMessage,
    setMaintenanceDate,
    setMaintenanceTime,
    setMaintenanceDuration,
    saveSettings
  };
}
