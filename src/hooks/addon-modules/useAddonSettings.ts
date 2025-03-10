
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { ModuleSettings, AddonSpecificSettings, AddonPermissionGroups } from "./types";

export function useAddonSettings(
  initialModuleSettings: ModuleSettings,
  initialAddonSpecificSettings: AddonSpecificSettings,
  initialAddonPermissionGroups: AddonPermissionGroups
) {
  const { toast } = useToast();
  const [moduleSettings, setModuleSettings] = useState<ModuleSettings>(initialModuleSettings);
  const [activeAddonSettings, setActiveAddonSettings] = useState<number | null>(null);
  const [activeAddonPermissions, setActiveAddonPermissions] = useState<number | null>(null);
  const [addonSpecificSettings, setAddonSpecificSettings] = useState<AddonSpecificSettings>(initialAddonSpecificSettings);
  const [addonPermissionGroups, setAddonPermissionGroups] = useState<AddonPermissionGroups>(initialAddonPermissionGroups);

  const handleSettingChange = (setting: string, value: boolean) => {
    setModuleSettings(prev => ({
      ...prev,
      [setting]: value
    }));
  };

  const openAddonSettings = (id: number) => {
    setActiveAddonSettings(id);
  };

  const openAddonPermissions = (id: number) => {
    setActiveAddonPermissions(id);
  };

  const updateAddonSpecificSetting = (addonId: number, settingKey: string, value: any) => {
    setAddonSpecificSettings(prev => ({
      ...prev,
      [addonId]: {
        ...prev[addonId as keyof typeof prev],
        [settingKey]: value
      }
    }));

    toast({
      title: "Setting Updated",
      description: `Updated ${settingKey} for addon #${addonId}.`
    });
  };

  const updateAddonPermission = (addonId: number, permissionId: number, enabled: boolean) => {
    setAddonPermissionGroups(prev => {
      const addonGroup = [...prev[addonId as keyof typeof prev]];
      const updatedGroup = addonGroup.map(p => 
        p.id === permissionId ? { ...p, enabled } : p
      );
      
      return {
        ...prev,
        [addonId]: updatedGroup
      };
    });

    const permission = addonPermissionGroups[addonId as keyof typeof addonPermissionGroups]?.find(p => p.id === permissionId);
    
    toast({
      title: `Permission ${enabled ? 'Enabled' : 'Disabled'}`,
      description: `${permission?.name} for addon #${addonId}.`
    });
  };

  return {
    moduleSettings,
    activeAddonSettings,
    activeAddonPermissions,
    addonSpecificSettings,
    addonPermissionGroups,
    handleSettingChange,
    openAddonSettings,
    openAddonPermissions,
    updateAddonSpecificSetting,
    updateAddonPermission
  };
}
