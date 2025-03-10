
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
  return (
    <div className="space-y-4">
      <Alert className="bg-blue-50 dark:bg-blue-950 border-blue-200 dark:border-blue-800">
        <AlertTriangle className="h-4 w-4 text-blue-600 dark:text-blue-400" />
        <AlertDescription className="text-blue-700 dark:text-blue-300">
          Browse verified addon modules from our official repository. 
          All modules are scanned for security and compatibility.
        </AlertDescription>
      </Alert>
      
      <div className="space-y-4">
        {repositoryAddons.map(addon => (
          <RepositoryAddonCard
            key={addon.id}
            addon={addon}
            installingFromRepo={installingFromRepo}
            isInstalled={installedAddons.some(a => a.name === addon.name)}
            onInstall={installFromRepository}
          />
        ))}
      </div>
    </div>
  );
};

export default RepositoryTab;
