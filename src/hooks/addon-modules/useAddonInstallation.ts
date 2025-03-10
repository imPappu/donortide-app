
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { AddonModule } from "./types";

export function useAddonInstallation() {
  const { toast } = useToast();
  const [uploadingAddon, setUploadingAddon] = useState(false);
  const [installingFromRepo, setInstallingFromRepo] = useState(false);

  const handleUploadAddon = async (e: React.ChangeEvent<HTMLInputElement>, setInstalledAddons: React.Dispatch<React.SetStateAction<AddonModule[]>>) => {
    if (!e.target.files || e.target.files.length === 0) return;
    
    setUploadingAddon(true);
    const file = e.target.files[0];
    
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      if (!file.name.endsWith('.zip') && !file.name.endsWith('.addon')) {
        throw new Error("Invalid addon file format");
      }
      
      const newAddon: AddonModule = {
        id: Date.now(),
        name: file.name.replace(/\.(zip|addon)$/, ""),
        version: "1.0.0",
        status: "Inactive",
        author: "Custom Upload",
        description: "Manually uploaded addon module.",
        hasSettings: false,
        isCustom: false
      };
      
      setInstalledAddons(prev => [...prev, newAddon]);
      
      toast({
        title: "Addon Installed",
        description: `Successfully installed ${file.name}`,
      });
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Unknown error";
      toast({
        title: "Installation Failed",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setUploadingAddon(false);
    }
  };
  
  const installFromRepository = async (id: number, name: string, repositoryAddons: any[], setInstalledAddons: React.Dispatch<React.SetStateAction<AddonModule[]>>) => {
    setInstallingFromRepo(true);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const repoAddon = repositoryAddons.find(a => a.id === id);
      if (!repoAddon) throw new Error("Addon not found in repository");
      
      const newAddon: AddonModule = {
        id: Date.now(),
        name,
        version: repoAddon.version,
        status: "Inactive",
        author: repoAddon.author,
        description: repoAddon.description,
        hasSettings: false,
        isCustom: false
      };
      
      setInstalledAddons(prev => [...prev, newAddon]);
      
      toast({
        title: "Addon Installed",
        description: `Successfully installed ${name} from repository`,
      });
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Unknown error";
      toast({
        title: "Installation Failed",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setInstallingFromRepo(false);
    }
  };

  return {
    uploadingAddon,
    installingFromRepo,
    handleUploadAddon,
    installFromRepository
  };
}
