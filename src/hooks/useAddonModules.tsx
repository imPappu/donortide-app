
import { useState } from "react";
import { useAddonInitialization } from "./addon-modules/useAddonInitialization";
import { useAddonInstallation } from "./addon-modules/useAddonInstallation";
import { useAddonManagement } from "./addon-modules/useAddonManagement";
import { useAddonSettings } from "./addon-modules/useAddonSettings";
import { 
  initialInstalledAddons, 
  initialRepositoryAddons, 
  initialModuleSettings, 
  initialAddonSpecificSettings, 
  initialAddonPermissionGroups 
} from "./addon-modules/data";
import { AddonModule, RepositoryAddon } from "./addon-modules/types";

export function useAddonModules() {
  const [installedAddons, setInstalledAddons] = useState<AddonModule[]>(initialInstalledAddons);
  const [repositoryAddons] = useState<RepositoryAddon[]>(initialRepositoryAddons);
  
  const { isInitialized } = useAddonInitialization();
  
  const { 
    uploadingAddon, 
    installingFromRepo, 
    handleUploadAddon: baseHandleUploadAddon, 
    installFromRepository: baseInstallFromRepository 
  } = useAddonInstallation();
  
  const { 
    toggleAddonStatus: baseToggleAddonStatus, 
    uninstallAddon: baseUninstallAddon, 
    updateAddon: baseUpdateAddon 
  } = useAddonManagement();
  
  const {
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
  } = useAddonSettings(
    initialModuleSettings,
    initialAddonSpecificSettings,
    initialAddonPermissionGroups
  );

  // Wrapper functions that provide the necessary context
  const handleUploadAddon = (e: React.ChangeEvent<HTMLInputElement>) => {
    return baseHandleUploadAddon(e, setInstalledAddons);
  };

  const installFromRepository = (id: number, name: string) => {
    return baseInstallFromRepository(id, name, repositoryAddons, setInstalledAddons);
  };

  const toggleAddonStatus = (id: number) => {
    return baseToggleAddonStatus(id, installedAddons, setInstalledAddons);
  };

  const uninstallAddon = (id: number, name: string) => {
    return baseUninstallAddon(id, name, installedAddons, setInstalledAddons);
  };

  const updateAddon = (id: number, name: string) => {
    return baseUpdateAddon(id, name, installedAddons, setInstalledAddons);
  };

  return {
    isInitialized,
    installedAddons,
    repositoryAddons,
    moduleSettings,
    uploadingAddon,
    installingFromRepo,
    activeAddonSettings,
    activeAddonPermissions,
    addonSpecificSettings,
    addonPermissionGroups,
    toggleAddonStatus,
    uninstallAddon,
    updateAddon,
    handleUploadAddon,
    installFromRepository,
    handleSettingChange,
    openAddonSettings,
    openAddonPermissions,
    updateAddonSpecificSetting,
    updateAddonPermission
  };
}
