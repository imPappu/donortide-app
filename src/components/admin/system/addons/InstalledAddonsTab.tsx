
import React from "react";
import { Package } from "lucide-react";
import AddonCard from "./AddonCard";
import { AddonModule } from "../types";

interface InstalledAddonsTabProps {
  installedAddons: AddonModule[];
  toggleAddonStatus: (id: number) => void;
  uninstallAddon: (id: number, name: string) => void;
  updateAddon: (id: number, name: string) => Promise<void>;
}

const InstalledAddonsTab = ({ 
  installedAddons, 
  toggleAddonStatus, 
  uninstallAddon, 
  updateAddon 
}: InstalledAddonsTabProps) => {
  // First render custom addons, then regular addons
  const sortedAddons = [...installedAddons].sort((a, b) => {
    if (a.isCustom && !b.isCustom) return -1;
    if (!a.isCustom && b.isCustom) return 1;
    return 0;
  });

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
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default InstalledAddonsTab;
