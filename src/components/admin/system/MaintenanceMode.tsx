
import React from "react";
import MaintenanceActivation from "./maintenance/MaintenanceActivation";
import WhitelistAccess from "./maintenance/WhitelistAccess";
import { useMaintenanceMode } from "@/hooks/useMaintenanceMode";

const MaintenanceMode = () => {
  const {
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
  } = useMaintenanceMode();

  return (
    <div className="space-y-6">
      <MaintenanceActivation 
        maintenanceActive={maintenanceActive}
        toggleMaintenance={toggleMaintenance}
        maintenanceMessage={maintenanceMessage}
        setMaintenanceMessage={setMaintenanceMessage}
        scheduledMaintenance={scheduledMaintenance}
        setScheduledMaintenance={setScheduledMaintenance}
        maintenanceDate={maintenanceDate}
        setMaintenanceDate={setMaintenanceDate}
        maintenanceTime={maintenanceTime}
        setMaintenanceTime={setMaintenanceTime}
        maintenanceDuration={maintenanceDuration}
        setMaintenanceDuration={setMaintenanceDuration}
        saving={saving}
        saveSettings={saveSettings}
      />
      
      <WhitelistAccess />
    </div>
  );
};

export default MaintenanceMode;
