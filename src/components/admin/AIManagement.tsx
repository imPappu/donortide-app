
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";

// Import refactored components
import AIModelsTab from "./ai/AIModelsTab";
import MonitoringTab from "./ai/MonitoringTab";
import SocialMediaTab from "./ai/SocialMediaTab";
import { AIModelsState, SocialMediaState, MonitoringSettings } from "./types";
import DBErrorAlert from "./DBErrorAlert";

const AIManagement = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("configuration");
  const [showApiKeys, setShowApiKeys] = useState<Record<string, boolean>>({
    chatgpt: false,
    deepseek: false,
    grok: false,
    qwen: false
  });
  
  // Error handling state
  const [error, setError] = useState<string | null>(null);
  
  // AI Configuration state
  const [aiModels, setAiModels] = useState<AIModelsState>({
    chatgpt: { enabled: true, apiKey: "", model: "gpt-4o", connectionTested: false },
    deepseek: { enabled: false, apiKey: "", model: "deepseek-v2", connectionTested: false },
    grok: { enabled: false, apiKey: "", model: "grok-1.5", connectionTested: false },
    qwen: { enabled: false, apiKey: "", model: "qwen-72b", connectionTested: false }
  });
  
  // Monitoring settings
  const [monitoringSettings, setMonitoringSettings] = useState<MonitoringSettings>({
    bugDetection: true,
    spamDetection: true,
    contentModeration: true,
    dataAnalysis: false,
    scheduledReports: true
  });
  
  // Social media automation
  const [socialMediaSettings, setSocialMediaSettings] = useState<SocialMediaState>({
    twitter: { enabled: false, autoPost: false, schedule: "daily" },
    facebook: { enabled: false, autoPost: false, schedule: "weekly" },
    instagram: { enabled: false, autoPost: false, schedule: "weekly" },
    youtube: { enabled: false, autoPost: false, schedule: "monthly" }
  });

  // Add configuration saving status
  const [saving, setSaving] = useState(false);
  
  const toggleShowApiKey = (model: string) => {
    setShowApiKeys(prev => ({
      ...prev,
      [model]: !prev[model]
    }));
  };
  
  const handleAIModelChange = (model: keyof AIModelsState, field: string, value: any) => {
    setAiModels(prev => ({
      ...prev,
      [model]: {
        ...prev[model],
        [field]: value,
        // Reset connection status when changing API key or model
        ...(field === 'apiKey' || field === 'model' ? { connectionTested: false, connectionSuccess: undefined } : {})
      }
    }));
  };
  
  const handleMonitoringChange = (setting: keyof MonitoringSettings, value: boolean) => {
    setMonitoringSettings(prev => ({
      ...prev,
      [setting]: value
    }));
  };
  
  const handleSocialMediaChange = (platform: keyof SocialMediaState, field: string, value: any) => {
    setSocialMediaSettings(prev => ({
      ...prev,
      [platform]: {
        ...prev[platform],
        [field]: value
      }
    }));
  };
  
  const saveAIConfiguration = async () => {
    setSaving(true);
    setError(null);
    
    try {
      // In a real app, this would save to your database
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: "AI Configuration Saved",
        description: "Your AI settings have been updated successfully.",
      });
    } catch (error) {
      setError("Failed to save AI configuration. Please try again.");
      
      toast({
        title: "Error Saving Configuration",
        description: "There was a problem saving your AI settings.",
        variant: "destructive",
      });
    } finally {
      setSaving(false);
    }
  };
  
  const testAIConnection = async (model: keyof AIModelsState) => {
    // In a real app, this would test the connection to the AI model
    const modelConfig = aiModels[model];
    
    if (!modelConfig.apiKey) {
      toast({
        title: "Connection Failed",
        description: "Please enter a valid API key.",
        variant: "destructive",
      });
      
      handleAIModelChange(model, 'connectionTested', true);
      handleAIModelChange(model, 'connectionSuccess', false);
      return;
    }
    
    // Simulate API connection test
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Randomly simulate success or failure for demo purposes
      const success = Math.random() > 0.3; // 70% chance of success
      
      if (success) {
        toast({
          title: "Connection Successful",
          description: `Successfully connected to ${model} API.`,
        });
        
        handleAIModelChange(model, 'connectionTested', true);
        handleAIModelChange(model, 'connectionSuccess', true);
      } else {
        toast({
          title: "Connection Failed",
          description: `Could not connect to ${model} API. Please check your key and try again.`,
          variant: "destructive",
        });
        
        handleAIModelChange(model, 'connectionTested', true);
        handleAIModelChange(model, 'connectionSuccess', false);
      }
    } catch (error) {
      toast({
        title: "Connection Error",
        description: "An error occurred while testing the connection.",
        variant: "destructive",
      });
      
      handleAIModelChange(model, 'connectionTested', true);
      handleAIModelChange(model, 'connectionSuccess', false);
    }
  };

  return (
    <Card className="w-full shadow-md">
      <CardHeader className="border-b bg-muted/10">
        <CardTitle className="text-2xl font-semibold text-primary">AI Management</CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        {error && (
          <DBErrorAlert 
            error={error} 
            onDismiss={() => setError(null)}
            className="mb-6"
          />
        )}
        
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid grid-cols-3 w-full mb-2">
            <TabsTrigger value="configuration" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              AI Configuration
            </TabsTrigger>
            <TabsTrigger value="monitoring" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              Platform Monitoring
            </TabsTrigger>
            <TabsTrigger value="social" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              Social Media Automation
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="configuration" className="mt-6 space-y-6">
            <AIModelsTab 
              models={aiModels}
              handleChange={handleAIModelChange}
              testConnection={testAIConnection}
              saving={saving}
            />
          </TabsContent>
          
          <TabsContent value="monitoring" className="mt-6 space-y-6">
            <MonitoringTab 
              monitoringSettings={monitoringSettings}
              handleChange={handleMonitoringChange}
              saving={saving}
              saveSettings={saveAIConfiguration}
            />
          </TabsContent>
          
          <TabsContent value="social" className="mt-6 space-y-6">
            <SocialMediaTab 
              socialMediaState={socialMediaSettings}
              handleChange={handleSocialMediaChange}
              saving={saving}
              saveSettings={saveAIConfiguration}
            />
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default AIManagement;
