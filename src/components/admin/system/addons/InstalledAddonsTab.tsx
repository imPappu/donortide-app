
import React from "react";
import { Package } from "lucide-react";
import AddonCard from "./AddonCard";
import AddonSettingsModal from "./AddonSettingsModal";
import AddonPermissionsModal from "./AddonPermissionsModal";
import { AddonModule } from "../types";

interface InstalledAddonsTabProps {
  installedAddons: AddonModule[];
  toggleAddonStatus: (id: number) => void;
  uninstallAddon: (id: number, name: string) => void;
  updateAddon: (id: number, name: string) => Promise<void>;
  activeAddonSettings: number | null;
  activeAddonPermissions: number | null;
  addonSpecificSettings: Record<number, Record<string, any>>;
  addonPermissionGroups: Record<number, { id: number; name: string; key: string; enabled: boolean; }[]>;
  openAddonSettings: (id: number) => void;
  openAddonPermissions: (id: number) => void;
  updateAddonSpecificSetting: (addonId: number, settingKey: string, value: any) => void;
  updateAddonPermission: (addonId: number, permissionId: number, enabled: boolean) => void;
}

const InstalledAddonsTab = ({ 
  installedAddons, 
  toggleAddonStatus, 
  uninstallAddon, 
  updateAddon,
  activeAddonSettings,
  activeAddonPermissions,
  addonSpecificSettings,
  addonPermissionGroups,
  openAddonSettings,
  openAddonPermissions,
  updateAddonSpecificSetting,
  updateAddonPermission
}: InstalledAddonsTabProps) => {
  // First render custom addons, then regular addons
  const sortedAddons = [...installedAddons].sort((a, b) => {
    if (a.isCustom && !b.isCustom) return -1;
    if (!a.isCustom && b.isCustom) return 1;
    return 0;
  });

  const activeSettingsAddon = installedAddons.find(addon => addon.id === activeAddonSettings);
  const activePermissionsAddon = installedAddons.find(addon => addon.id === activeAddonPermissions);

  return (
    <div className="space-y-4">
      {installedAddons.length === 0 ? (
        <div className="text-center py-8">
          <Package className="h-10 w-10 mx-auto text-muted-foreground mb-3" />
          <h3 className="font-medium">No Addons Installed</h3>
          <p className="text-sm text-muted-foreground mt-1">
            Browse the repository or upload a new addon
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {sortedAddons.map(addon => (
            <AddonCard
              key={addon.id}
              addon={addon}
              toggleAddonStatus={toggleAddonStatus}
              uninstallAddon={uninstallAddon}
              updateAddon={updateAddon}
              openAddonSettings={openAddonSettings}
              openAddonPermissions={openAddonPermissions}
            />
          ))}
        </div>
      )}

      {activeSettingsAddon && (
        <AddonSettingsModal
          addonId={activeAddonSettings}
          addonName={activeSettingsAddon.name}
          settings={addonSpecificSettings[activeAddonSettings as keyof typeof addonSpecificSettings] || {}}
          isOpen={activeAddonSettings !== null}
          onClose={() => openAddonSettings(0)}
          onUpdateSetting={updateAddonSpecificSetting}
        />
      )}

      {activePermissionsAddon && (
        <AddonPermissionsModal
          addonId={activeAddonPermissions}
          addonName={activePermissionsAddon.name}
          permissions={addonPermissionGroups[activeAddonPermissions as keyof typeof addonPermissionGroups] || []}
          isOpen={activeAddonPermissions !== null}
          onClose={() => openAddonPermissions(0)}
          onUpdatePermission={updateAddonPermission}
        />
      )}
    </div>
  );
};

export default InstalledAddonsTab;
