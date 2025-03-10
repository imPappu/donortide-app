
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle, Brain } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import AIModelsTab from "../ai/AIModelsTab";
import MonitoringTab from "../ai/MonitoringTab";
import SocialMediaTab from "../ai/SocialMediaTab";
import { AIModelsState, MonitoringSettings, SocialMediaState } from "../types";

const AIConfiguration = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("models");
  const [saving, setSaving] = useState(false);
  const [showApiKeys, setShowApiKeys] = useState<Record<string, boolean>>({
    chatgpt: false,
    deepseek: false,
    grok: false,
    qwen: false,
  });
  
  // AI Models state
  const [aiModels, setAiModels] = useState<AIModelsState>({
    chatgpt: { 
      enabled: true, 
      apiKey: "sk-.......................", 
      model: "gpt-4o", 
      connectionTested: true,
      connectionSuccess: true
    },
    deepseek: { 
      enabled: false, 
      apiKey: "", 
      model: "deepseek-v2", 
      connectionTested: false
    },
    grok: { 
      enabled: false, 
      apiKey: "", 
      model: "grok-1.5", 
      connectionTested: false
    },
    qwen: { 
      enabled: true, 
      apiKey: "qw-.......................", 
      model: "qwen-72b", 
      connectionTested: true,
      connectionSuccess: true
    }
  });
  
  // Monitoring settings
  const [monitoringSettings, setMonitoringSettings] = useState<MonitoringSettings>({
    bugDetection: true,
    spamDetection: true,
    contentModeration: true,
    dataAnalysis: false,
    scheduledReports: true
  });
  
  // Social media settings
  const [socialMedia, setSocialMedia] = useState<SocialMediaState>({
    twitter: { enabled: true, autoPost: true, schedule: "daily" },
    facebook: { enabled: true, autoPost: false, schedule: "weekly" },
    instagram: { enabled: false, autoPost: false, schedule: "manual" },
    youtube: { enabled: false, autoPost: false, schedule: "manual" }
  });
  
  const toggleShowApiKey = (model: string) => {
    setShowApiKeys(prev => ({
      ...prev,
      [model]: !prev[model]
    }));
  };
  
  const handleAIModelChange = (model: string, field: string, value: any) => {
    setAiModels(prev => ({
      ...prev,
      [model]: {
        ...prev[model as keyof AIModelsState],
        [field]: value,
        // Reset connection test status when API key or model changes
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
  
  const handleSocialMediaChange = (platform: keyof SocialMediaState, field: keyof SocialMediaConfig, value: any) => {
    setSocialMedia(prev => ({
      ...prev,
      [platform]: {
        ...prev[platform],
        [field]: value
      }
    }));
  };
  
  const testAIConnection = async (model: string) => {
    const modelConfig = aiModels[model as keyof AIModelsState];
    
    if (!modelConfig.apiKey) {
      toast({
        title: "API Key Required",
        description: "Please enter an API key before testing the connection.",
        variant: "destructive"
      });
      return;
    }
    
    // Set as testing
    setAiModels(prev => ({
      ...prev,
      [model]: {
        ...prev[model as keyof AIModelsState],
        connectionTested: false
      }
    }));
    
    // Simulate API connection test
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // For demo, make OpenAI and Qwen successful, others failed
    const success = model === 'chatgpt' || model === 'qwen';
    
    setAiModels(prev => ({
      ...prev,
      [model]: {
        ...prev[model as keyof AIModelsState],
        connectionTested: true,
        connectionSuccess: success
      }
    }));
    
    toast({
      title: success ? "Connection Successful" : "Connection Failed",
      description: success 
        ? `Successfully connected to ${model} API` 
        : `Failed to connect to ${model} API. Please check your credentials.`,
      variant: success ? "default" : "destructive"
    });
  };
  
  const saveAIConfiguration = async () => {
    setSaving(true);
    
    // Simulate saving
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    toast({
      title: "Configuration Saved",
      description: "AI configuration has been updated successfully."
    });
    
    setSaving(false);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Brain className="mr-2 h-5 w-5 text-purple-500" />
            AI Configuration
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
            <TabsList className="grid grid-cols-3 w-full max-w-md">
              <TabsTrigger value="models">AI Models</TabsTrigger>
              <TabsTrigger value="monitoring">Monitoring</TabsTrigger>
              <TabsTrigger value="social">Social Media</TabsTrigger>
            </TabsList>
            
            <TabsContent value="models">
              <AIModelsTab 
                aiModels={aiModels}
                showApiKeys={showApiKeys}
                toggleShowApiKey={toggleShowApiKey}
                handleAIModelChange={handleAIModelChange}
                testAIConnection={testAIConnection}
                saving={saving}
                saveAIConfiguration={saveAIConfiguration}
              />
            </TabsContent>
            
            <TabsContent value="monitoring">
              <MonitoringTab 
                settings={monitoringSettings}
                handleChange={handleMonitoringChange}
                saving={saving}
                saveSettings={saveAIConfiguration}
              />
            </TabsContent>
            
            <TabsContent value="social">
              <SocialMediaTab 
                socialMedia={socialMedia}
                handleChange={handleSocialMediaChange}
                saving={saving}
                saveSettings={saveAIConfiguration}
              />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

interface SocialMediaConfig {
  enabled: boolean;
  autoPost: boolean;
  schedule: string;
}

export default AIConfiguration;
