
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Brain } from "lucide-react";
import { useAIConfiguration } from "@/hooks/useAIConfiguration";
import AIModelsTab from "../ai/AIModelsTab";
import MonitoringTab from "../ai/MonitoringTab";
import SocialMediaTab from "../ai/SocialMediaTab";

const AIConfiguration = () => {
  const {
    activeTab,
    setActiveTab,
    saving,
    aiModels,
    socialMedia,
    monitoringSettings,
    handleModelChange,
    testConnection,
    handleSocialMediaChange,
    handleMonitoringChange,
    saveSettings
  } = useAIConfiguration();
  
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Brain className="mr-2 h-5 w-5 text-purple-500" />
            AI Configuration
          </CardTitle>
          <CardDescription>
            Configure AI models, social media integration, and monitoring tools for your platform.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="models" value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid grid-cols-3 mb-6">
              <TabsTrigger value="models">AI Models</TabsTrigger>
              <TabsTrigger value="monitoring">Monitoring</TabsTrigger>
              <TabsTrigger value="social">Social Media</TabsTrigger>
            </TabsList>
            
            <TabsContent value="models">
              <AIModelsTab 
                models={aiModels}
                handleChange={handleModelChange}
                testConnection={testConnection}
                saving={saving}
              />
            </TabsContent>
            
            <TabsContent value="monitoring">
              <MonitoringTab 
                monitoringSettings={monitoringSettings}
                handleChange={handleMonitoringChange}
                saving={saving}
                saveSettings={saveSettings}
              />
            </TabsContent>
            
            <TabsContent value="social">
              <SocialMediaTab 
                socialMediaState={socialMedia}
                handleChange={handleSocialMediaChange}
                saving={saving}
                saveSettings={saveSettings}
              />
            </TabsContent>
          </Tabs>
          
          <div className="mt-6">
            <Button 
              onClick={saveSettings} 
              disabled={saving}
              className="w-full md:w-auto"
            >
              {saving ? "Saving..." : "Save Configuration"}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AIConfiguration;
