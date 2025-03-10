import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { AddonModule, RepositoryAddon, ModuleSettings } from "@/components/admin/system/types";

export function useAddonModules() {
  const { toast } = useToast();
  const [uploadingAddon, setUploadingAddon] = useState(false);
  const [installingFromRepo, setInstallingFromRepo] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);
  const [activeAddonSettings, setActiveAddonSettings] = useState<number | null>(null);
  const [activeAddonPermissions, setActiveAddonPermissions] = useState<number | null>(null);
  
  const [installedAddons, setInstalledAddons] = useState<AddonModule[]>([
    { 
      id: 1, 
      name: "Blood Matching Algorithm", 
      version: "1.0.0", 
      status: "Active",
      author: "Internal Team",
      description: "Advanced blood type matching and compatibility engine for donor-recipient pairing.",
      hasSettings: true,
      permissions: ["admin.blood.match", "admin.blood.view"],
      isCustom: true
    },
    { 
      id: 2, 
      name: "Donor Eligibility Check", 
      version: "1.1.0", 
      status: "Active",
      author: "Internal Team",
      description: "Automated donor eligibility verification based on health criteria and donation history.",
      hasSettings: true,
      permissions: ["admin.eligibility.manage", "admin.eligibility.view"],
      isCustom: true
    },
    { 
      id: 3, 
      name: "Donation Inventory", 
      version: "1.0.2", 
      status: "Active",
      author: "Internal Team",
      description: "Blood inventory tracking with expiration monitoring and shortage alerts.",
      hasSettings: true,
      permissions: ["admin.inventory.manage", "admin.inventory.view"],
      isCustom: true
    },
  ]);
  
  const repositoryAddons: RepositoryAddon[] = [];

  const [moduleSettings, setModuleSettings] = useState<ModuleSettings>({
    autoUpdates: true,
    compatibilityCheck: true,
    developmentMode: false,
    securityScanning: true
  });

  const [addonSpecificSettings, setAddonSpecificSettings] = useState({
    1: { // Blood Matching Algorithm
      enableAdvancedMatching: true,
      matchThreshold: 85,
      useHistoricData: true,
      notifyOnMatch: true
    },
    2: { // Donor Eligibility Check
      strictMode: true,
      waitPeriodDays: 56,
      healthChecksEnabled: true,
      autoDecline: false
    },
    3: { // Donation Inventory
      lowStockThreshold: 10,
      expiryNotificationDays: 7,
      trackByBloodType: true,
      trackByLocation: true
    }
  });

  const [addonPermissionGroups, setAddonPermissionGroups] = useState({
    1: [ // Blood Matching Algorithm
      { id: 1, name: "View Matches", key: "admin.blood.view", enabled: true },
      { id: 2, name: "Create Matches", key: "admin.blood.match", enabled: true },
      { id: 3, name: "Override Matches", key: "admin.blood.override", enabled: false }
    ],
    2: [ // Donor Eligibility Check
      { id: 1, name: "View Eligibility", key: "admin.eligibility.view", enabled: true },
      { id: 2, name: "Manage Eligibility", key: "admin.eligibility.manage", enabled: true },
      { id: 3, name: "Override Eligibility", key: "admin.eligibility.override", enabled: false }
    ],
    3: [ // Donation Inventory
      { id: 1, name: "View Inventory", key: "admin.inventory.view", enabled: true },
      { id: 2, name: "Manage Inventory", key: "admin.inventory.manage", enabled: true },
      { id: 3, name: "Transfer Inventory", key: "admin.inventory.transfer", enabled: false }
    ]
  });

  useEffect(() => {
    const initializeAddonSystem = async () => {
      try {
        await new Promise(resolve => setTimeout(resolve, 1000));
        console.log("Addon module system initialized");
        setIsInitialized(true);
        
        toast({
          title: "Addon System Ready",
          description: "Custom blood donation addon modules have been initialized successfully",
        });
      } catch (error) {
        console.error("Error initializing addon system:", error);
        toast({
          title: "Initialization Error",
          description: "Failed to initialize addon system. Please try again.",
          variant: "destructive",
        });
      }
    };
    
    initializeAddonSystem();
  }, [toast]);

  const handleUploadAddon = async (e: React.ChangeEvent<HTMLInputElement>) => {
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
  
  const toggleAddonStatus = (id: number) => {
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
  
  const installFromRepository = async (id: number, name: string) => {
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
  
  const uninstallAddon = (id: number, name: string) => {
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
  
  const updateAddon = async (id: number, name: string) => {
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

    const addon = installedAddons.find(a => a.id === addonId);
    toast({
      title: "Setting Updated",
      description: `Updated ${settingKey} for ${addon?.name}.`
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

    const addon = installedAddons.find(a => a.id === addonId);
    const permission = addonPermissionGroups[addonId as keyof typeof addonPermissionGroups]?.find(p => p.id === permissionId);
    
    toast({
      title: `Permission ${enabled ? 'Enabled' : 'Disabled'}`,
      description: `${permission?.name} for ${addon?.name}.`
    });
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
