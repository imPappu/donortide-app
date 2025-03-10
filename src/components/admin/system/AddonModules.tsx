
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Component } from "lucide-react";
import { useAddonModules } from "@/hooks/useAddonModules";
import InstalledAddonsTab from "./addons/InstalledAddonsTab";
import RepositoryTab from "./addons/RepositoryTab";
import UploadTab from "./addons/UploadTab";
import ModuleSettings from "./addons/ModuleSettings";
import AddonSystemLoading from "./addons/AddonSystemLoading";

const AddonModules = () => {
  const [activeTab, setActiveTab] = useState("installed");
  
  const {
    isInitialized,
    installedAddons,
    repositoryAddons,
    moduleSettings,
    uploadingAddon,
    installingFromRepo,
    toggleAddonStatus,
    uninstallAddon,
    updateAddon,
    handleUploadAddon,
    installFromRepository,
    handleSettingChange
  } = useAddonModules();

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
            <AddonSystemLoading />
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
