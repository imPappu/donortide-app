
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle, Download, Smartphone, Globe, Cog, AlertTriangle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import CoreSystemTab from "./tabs/CoreSystemTab";
import MobileTab from "./tabs/MobileTab";
import WebsiteTab from "./tabs/WebsiteTab";

// Define interfaces for our tab components
interface CoreSystemTabProps {
  updateAvailable: boolean;
  updating: boolean;
  progress: number;
  handleSystemUpdate: () => Promise<void>;
}

interface MobileTabProps {
  mobileUpdating: boolean;
  handleMobileUpdate: (platform: string) => Promise<void>;
}

interface WebsiteTabProps {
  websiteVersion: string;
  handleWebsiteSettingsSave: () => void;
}

const SystemUpdatePanel = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("core");
  const [updating, setUpdating] = useState(false);
  const [progress, setProgress] = useState(0);
  const [mobileUpdating, setMobileUpdating] = useState(false);
  
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
    
    try {
      // Simulate mobile update process
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      toast({
        title: "Mobile Update Successful",
        description: `The ${platform} app has been updated to the latest version.`,
      });
    } catch (error) {
      toast({
        title: "Update Failed",
        description: `Failed to update ${platform} app. Please try again.`,
        variant: "destructive",
      });
    } finally {
      setMobileUpdating(false);
    }
  };

  const handleWebsiteSettingsSave = () => {
    toast({
      title: "Website Settings Saved",
      description: "Your website settings have been updated successfully.",
    });
  };
  
  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold">System Management</h1>
        <p className="text-muted-foreground">Manage system updates and settings</p>
      </div>
      
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="grid grid-cols-3 lg:w-[450px]">
          <TabsTrigger value="core">Core System</TabsTrigger>
          <TabsTrigger value="mobile">Mobile Updates</TabsTrigger>
          <TabsTrigger value="website">Website</TabsTrigger>
        </TabsList>
        
        <TabsContent value="core" className="space-y-4">
          <CoreSystemTab 
            updateAvailable={true}
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
            websiteVersion="2.1.0"
            handleWebsiteSettingsSave={handleWebsiteSettingsSave}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SystemUpdatePanel;
