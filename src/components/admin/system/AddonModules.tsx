
import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Component, RefreshCw } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import InstalledAddonsTab from "./addons/InstalledAddonsTab";
import RepositoryTab from "./addons/RepositoryTab";
import UploadTab from "./addons/UploadTab";
import ModuleSettings from "./addons/ModuleSettings";
import { AddonModule, RepositoryAddon, ModuleSettings as ModuleSettingsType } from "./types";

const AddonModules = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("installed");
  const [uploadingAddon, setUploadingAddon] = useState(false);
  const [installingFromRepo, setInstallingFromRepo] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);
  
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
  
  const repositoryAddons: RepositoryAddon[] = [
    { 
      id: 103, 
      name: "Blood Analytics", 
      version: "1.2.0", 
      author: "Data Insights",
      description: "Advanced analytics dashboard for blood donation patterns and trends.",
      installed: false,
      category: "Analytics"
    },
  ];

  const [moduleSettings, setModuleSettings] = useState<ModuleSettingsType>({
    autoUpdates: true,
    compatibilityCheck: true,
    developmentMode: false,
    securityScanning: true
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
      setActiveTab("installed");
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
      setActiveTab("installed");
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

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Component className="mr-2 h-5 w-5 text-primary" />
            Blood Donation Addon Modules
          </CardTitle>
        </CardHeader>
        <CardContent>
          {!isInitialized ? (
            <div className="flex items-center justify-center py-8">
              <div className="text-center">
                <RefreshCw className="h-10 w-10 mx-auto text-primary animate-spin mb-3" />
                <h3 className="font-medium">Initializing Addon System</h3>
                <p className="text-sm text-muted-foreground mt-1">
                  Please wait while we set up the custom blood donation addon modules...
                </p>
              </div>
            </div>
          ) : (
            <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
              <TabsList className="grid grid-cols-3 w-full max-w-md">
                <TabsTrigger value="installed">Installed</TabsTrigger>
                <TabsTrigger value="repository">Repository</TabsTrigger>
                <TabsTrigger value="upload">Upload</TabsTrigger>
              </TabsList>
              
              <TabsContent value="installed" className="space-y-4">
                <InstalledAddonsTab 
                  installedAddons={installedAddons}
                  toggleAddonStatus={toggleAddonStatus}
                  uninstallAddon={uninstallAddon}
                  updateAddon={updateAddon}
                />
              </TabsContent>
              
              <TabsContent value="repository" className="space-y-4">
                <RepositoryTab 
                  repositoryAddons={repositoryAddons}
                  installedAddons={installedAddons}
                  installingFromRepo={installingFromRepo}
                  installFromRepository={installFromRepository}
                />
              </TabsContent>
              
              <TabsContent value="upload" className="space-y-4">
                <UploadTab 
                  uploadingAddon={uploadingAddon}
                  handleUploadAddon={handleUploadAddon}
                />
              </TabsContent>
            </Tabs>
          )}
        </CardContent>
      </Card>
      
      <ModuleSettings 
        moduleSettings={moduleSettings}
        onSettingChange={handleSettingChange}
      />
    </div>
  );
};

export default AddonModules;
