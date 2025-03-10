
import React from "react";
import { Button } from "@/components/ui/button";
import { RefreshCw, CheckCircle } from "lucide-react";

interface RepositoryAddon {
  id: number;
  name: string;
  version: string;
  author: string;
  description: string;
  installed: boolean;
}

interface RepositoryAddonCardProps {
  addon: RepositoryAddon;
  installingFromRepo: boolean;
  isInstalled: boolean;
  onInstall: (id: number, name: string) => Promise<void>;
}

const RepositoryAddonCard = ({ 
  addon, 
  installingFromRepo, 
  isInstalled, 
  onInstall 
}: RepositoryAddonCardProps) => {
  return (
    <div className="border rounded-lg overflow-hidden">
      <div className="p-4">
        <div className="flex justify-between">
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-medium">{addon.name}</h3>
              <span className="text-xs bg-muted px-2 py-0.5 rounded-full">v{addon.version}</span>
            </div>
            <p className="text-xs text-muted-foreground">By {addon.author}</p>
          </div>
          <Button 
            size="sm" 
            onClick={() => onInstall(addon.id, addon.name)}
            disabled={installingFromRepo || isInstalled}
          >
            {installingFromRepo ? (
              <>
                <RefreshCw className="h-4 w-4 mr-1 animate-spin" />
                Installing...
              </>
            ) : isInstalled ? (
              <>
                <CheckCircle className="h-4 w-4 mr-1" />
                Installed
              </>
            ) : (
              "Install"
            )}
          </Button>
        </div>
        <p className="text-sm mt-2">{addon.description}</p>
      </div>
    </div>
  );
};

export default RepositoryAddonCard;
