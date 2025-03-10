
import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AlertCircle, Box, Cog, Download, Globe, Layers, Smartphone, Upload } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

// Import refactored components
import CoreSystemTab from "./tabs/CoreSystemTab";
import AddonsTab from "./tabs/AddonsTab";
import MobileTab from "./tabs/MobileTab";
import WebsiteTab from "./tabs/WebsiteTab";

const SystemUpdatePanel = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("core");
  const [updating, setUpdating] = useState(false);
  const [progress, setProgress] = useState(0);
  const [uploadingAddon, setUploadingAddon] = useState(false);
  
  const handleSystemUpdate = async () => {
    setUpdating(true);
    setProgress(0);
    
    // Simulate update process
    for (let i = 0; i <= 100; i += 10) {
      await new Promise(resolve => setTimeout(resolve, 500));
      setProgress(i);
    }
    
    toast({
      title: "Update Successful",
      description: "The system has been updated to the latest version.",
    });
    
    setUpdating(false);
  };
  
  const handleUploadAddon = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;
    
    setUploadingAddon(true);
    const file = e.target.files[0];
    
    // Simulate upload and installation
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    toast({
      title: "Addon Installed",
      description: `Successfully installed ${file.name}`,
    });
    
    setUploadingAddon(false);
  };
  
  const installedAddons = [
    { id: 1, name: "Payment Gateway Plus", version: "1.2.0", status: "Active" },
    { id: 2, name: "Analytics Dashboard", version: "2.0.1", status: "Active" },
    { id: 3, name: "Community Manager", version: "1.0.5", status: "Inactive" },
  ];
  
  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold">System Management</h1>
        <p className="text-muted-foreground">Manage system updates and addon modules</p>
      </div>
      
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="grid grid-cols-4 lg:w-[600px]">
          <TabsTrigger value="core">Core System</TabsTrigger>
          <TabsTrigger value="addons">Addon Modules</TabsTrigger>
          <TabsTrigger value="mobile">Mobile Updates</TabsTrigger>
          <TabsTrigger value="website">Website</TabsTrigger>
        </TabsList>
        
        <TabsContent value="core">
          <CoreSystemTab 
            updating={updating} 
            progress={progress} 
            handleSystemUpdate={handleSystemUpdate} 
          />
        </TabsContent>
        
        <TabsContent value="addons">
          <AddonsTab 
            uploadingAddon={uploadingAddon} 
            handleUploadAddon={handleUploadAddon} 
            installedAddons={installedAddons} 
          />
        </TabsContent>
        
        <TabsContent value="mobile">
          <MobileTab />
        </TabsContent>
        
        <TabsContent value="website">
          <WebsiteTab />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SystemUpdatePanel;
