
import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import CoreSystemTab from "./system/tabs/CoreSystemTab";
import MobileTab from "./system/tabs/MobileTab";
import WebsiteTab from "./system/tabs/WebsiteTab";

const SystemUpdatePanel = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("core");
  
  // Core system state
  const [updating, setUpdating] = useState(false);
  const [progress, setProgress] = useState(0);
  
  // Mobile state
  const [mobileUpdating, setMobileUpdating] = useState(false);
  
  // Website state
  const [websiteVersion, setWebsiteVersion] = useState("1.5.2");
  
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
  
  const handleMobileUpdate = async (platform: string) => {
    setMobileUpdating(true);
    
    // Simulate update process
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    toast({
      title: "Mobile Updates Synchronized",
      description: "Mobile applications have been updated successfully.",
    });
    
    setMobileUpdating(false);
  };
  
  const handleWebsiteSettingsSave = async (settings: any) => {
    // Simulate saving settings
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    toast({
      title: "Website Settings Saved",
      description: "Your website configuration has been updated.",
    });
  };
  
  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold">System Management</h1>
        <p className="text-muted-foreground">Manage system updates</p>
      </div>
      
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="grid grid-cols-3 lg:w-[600px]">
          <TabsTrigger value="core">Core System</TabsTrigger>
          <TabsTrigger value="mobile">Mobile Updates</TabsTrigger>
          <TabsTrigger value="website">Website</TabsTrigger>
        </TabsList>
        
        <TabsContent value="core" className="space-y-4">
          <CoreSystemTab 
            updating={updating}
            progress={progress}
            handleSystemUpdate={handleSystemUpdate}
          />
        </TabsContent>
        
        <TabsContent value="mobile" className="space-y-4">
          <MobileTab 
            mobileUpdating={mobileUpdating}
            handleMobileUpdate={handleMobileUpdate}
          />
        </TabsContent>
        
        <TabsContent value="website" className="space-y-4">
          <WebsiteTab 
            websiteVersion={websiteVersion}
            handleWebsiteSettingsSave={handleWebsiteSettingsSave}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SystemUpdatePanel;
