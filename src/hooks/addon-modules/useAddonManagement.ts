
import { useToast } from "@/hooks/use-toast";
import { AddonModule } from "./types";

export function useAddonManagement() {
  const { toast } = useToast();

  const toggleAddonStatus = (id: number, installedAddons: AddonModule[], setInstalledAddons: React.Dispatch<React.SetStateAction<AddonModule[]>>) => {
    setInstalledAddons(prev => prev.map(addon => {
      if (addon.id === id) {
        const newStatus = addon.status === "Active" ? "Inactive" : "Active";
        
        setTimeout(() => {
          toast({
            title: newStatus === "Active" ? "Addon Activated" : "Addon Deactivated",
            description: `${addon.name} has been ${newStatus === "Active" ? "activated" : "deactivated"}.`,
          });
        }, 500);
        
        return { ...addon, status: newStatus };
      }
      return addon;
    }));
  };
  
  const uninstallAddon = (id: number, name: string, installedAddons: AddonModule[], setInstalledAddons: React.Dispatch<React.SetStateAction<AddonModule[]>>) => {
    const addon = installedAddons.find(a => a.id === id);
    if (addon?.isCustom) {
      toast({
        title: "Cannot Uninstall",
        description: `${name} is a core custom addon and cannot be uninstalled.`,
        variant: "destructive",
      });
      return;
    }
    
    setInstalledAddons(prev => prev.filter(addon => addon.id !== id));
    
    toast({
      title: "Addon Uninstalled",
      description: `${name} has been uninstalled successfully.`,
    });
  };
  
  const updateAddon = async (id: number, name: string, installedAddons: AddonModule[], setInstalledAddons: React.Dispatch<React.SetStateAction<AddonModule[]>>) => {
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      setInstalledAddons(prev => prev.map(addon => {
        if (addon.id === id) {
          const versionParts = addon.version.split('.');
          const newMinorVersion = parseInt(versionParts[1]) + 1;
          const newVersion = `${versionParts[0]}.${newMinorVersion}.0`;
          
          return { 
            ...addon, 
            version: newVersion,
            status: "Active" 
          };
        }
        return addon;
      }));
      
      toast({
        title: "Addon Updated",
        description: `${name} has been updated successfully.`,
      });
    } catch (error) {
      toast({
        title: "Update Failed",
        description: `Failed to update ${name}. Please try again.`,
        variant: "destructive",
      });
    }
  };

  return {
    toggleAddonStatus,
    uninstallAddon,
    updateAddon
  };
}
