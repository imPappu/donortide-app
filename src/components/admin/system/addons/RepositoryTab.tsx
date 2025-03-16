
import React from "react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertTriangle } from "lucide-react";
import RepositoryAddonCard from "./RepositoryAddonCard";

interface RepositoryAddon {
  id: number;
  name: string;
  version: string;
  author: string;
  description: string;
  installed: boolean;
  category?: string;
}

interface AddonModule {
  id: number;
  name: string;
  version: string;
  status: "Active" | "Inactive" | "Needs Update";
  author: string;
  description: string;
  hasSettings: boolean;
  permissions?: string[];
  isCustom?: boolean;
}

interface RepositoryTabProps {
  repositoryAddons: RepositoryAddon[];
  installedAddons: AddonModule[];
  installingFromRepo: boolean;
  installFromRepository: (id: number, name: string) => Promise<void>;
}

const RepositoryTab = ({ 
  repositoryAddons, 
  installedAddons, 
  installingFromRepo, 
  installFromRepository 
}: RepositoryTabProps) => {
  // Filter out third-party addons
  const customAddons = repositoryAddons.filter(addon => addon.author === "DonorTide");

  // Group addons by category
  const groupedAddons: Record<string, RepositoryAddon[]> = {};
  
  customAddons.forEach(addon => {
    const category = addon.category || "Other";
    if (!groupedAddons[category]) {
      groupedAddons[category] = [];
    }
    groupedAddons[category].push(addon);
  });

  return (
    <div className="space-y-6">
      <Alert className="bg-blue-50 dark:bg-blue-950 border-blue-200 dark:border-blue-800">
        <AlertTriangle className="h-4 w-4 text-blue-600 dark:text-blue-400" />
        <AlertDescription className="text-blue-700 dark:text-blue-300">
          Browse verified addon modules for blood donation management from our official repository. 
          All modules are scanned for security and compatibility.
        </AlertDescription>
      </Alert>
      
      {Object.entries(groupedAddons).map(([category, addons]) => (
        <div key={category} className="space-y-3">
          <h3 className="font-medium text-sm text-muted-foreground">{category}</h3>
          <div className="space-y-4">
            {addons.map(addon => {
              // Check if the addon is already installed
              const isInstalled = installedAddons.some(
                installed => installed.id === addon.id
              );
              
              return (
                <RepositoryAddonCard
                  key={addon.id}
                  addon={addon}
                  installingFromRepo={installingFromRepo}
                  isInstalled={isInstalled}
                  onInstall={() => installFromRepository(addon.id, addon.name)}
                />
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
};

export default RepositoryTab;
