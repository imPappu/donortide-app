
import React from "react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Package, RefreshCw, Settings, Shield } from "lucide-react";

interface AddonModule {
  id: number;
  name: string;
  version: string;
  status: "Active" | "Inactive" | "Needs Update";
  author: string;
  description: string;
  hasSettings: boolean;
  permissions?: string[];
}

interface AddonCardProps {
  addon: AddonModule;
  toggleAddonStatus: (id: number) => void;
  uninstallAddon: (id: number, name: string) => void;
  updateAddon: (id: number, name: string) => Promise<void>;
}

const AddonCard = ({ addon, toggleAddonStatus, uninstallAddon, updateAddon }: AddonCardProps) => {
  return (
    <div className="border rounded-lg overflow-hidden">
      <div className="bg-muted/30 p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-primary/10 p-2 rounded-md">
              <Package className="h-5 w-5 text-primary" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-medium">{addon.name}</h3>
                <span className="text-xs bg-muted px-2 py-0.5 rounded-full">v{addon.version}</span>
              </div>
              <p className="text-xs text-muted-foreground">By {addon.author}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className={`text-xs px-2 py-1 rounded-full ${
              addon.status === "Active" 
                ? "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300" 
                : addon.status === "Needs Update"
                ? "bg-amber-100 text-amber-700 dark:bg-amber-900 dark:text-amber-300"
                : "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300"
            }`}>
              {addon.status}
            </span>
            <Switch 
              checked={addon.status === "Active"} 
              onCheckedChange={() => toggleAddonStatus(addon.id)}
            />
          </div>
        </div>
      </div>
      <div className="p-4">
        <p className="text-sm">{addon.description}</p>
        <div className="flex justify-between mt-3">
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => uninstallAddon(addon.id, addon.name)}
          >
            Uninstall
          </Button>
          <div className="flex gap-2">
            {addon.status === "Needs Update" && (
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => updateAddon(addon.id, addon.name)}
              >
                <RefreshCw className="h-4 w-4 mr-1" />
                Update
              </Button>
            )}
            {addon.hasSettings && (
              <Button variant="outline" size="sm">
                <Settings className="h-4 w-4 mr-1" />
                Settings
              </Button>
            )}
            <Button variant="outline" size="sm">
              <Shield className="h-4 w-4 mr-1" />
              Permissions
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddonCard;
