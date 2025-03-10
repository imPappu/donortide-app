
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { 
  Brain, 
  Twitter, 
  Facebook, 
  Instagram, 
  Youtube, 
  Check, 
  AlertCircle,
  MessageSquare
} from "lucide-react";
import { AIModelsState, SocialMediaState, MonitoringSettings, SocialMediaConfig } from "../types";
import AIModelsTab from "../ai/AIModelsTab";
import MonitoringTab from "../ai/MonitoringTab";
import SocialMediaTab from "../ai/SocialMediaTab";

const AIConfiguration = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("models");
  const [saving, setSaving] = useState(false);
  
  // AI Models state
  const [aiModels, setAiModels] = useState<AIModelsState>({
    chatgpt: {
      enabled: true,
      apiKey: "",
      model: "gpt-4o",
      connectionTested: false
    },
    deepseek: {
      enabled: false,
      apiKey: "",
      model: "deepseek-coder",
      connectionTested: false
    },
    grok: {
      enabled: false,
      apiKey: "",
      model: "grok-1",
      connectionTested: false
    },
    qwen: {
      enabled: false,
      apiKey: "",
      model: "qwen-72b",
      connectionTested: false
    }
  });
  
  // Social Media state
  const [socialMedia, setSocialMedia] = useState<SocialMediaState>({
    twitter: {
      enabled: false,
      autoPost: false,
      schedule: "weekly"
    },
    facebook: {
      enabled: false,
      autoPost: false,
      schedule: "daily"
    },
    instagram: {
      enabled: false,
      autoPost: false,
      schedule: "weekly"
    },
    youtube: {
      enabled: false,
      autoPost: false,
      schedule: "monthly"
    }
  });
  
  // Monitoring settings
  const [monitoringSettings, setMonitoringSettings] = useState<MonitoringSettings>({
    bugDetection: true,
    spamDetection: true,
    contentModeration: true,
    dataAnalysis: false,
    scheduledReports: false
  });
  
  // Handle AI model changes
  const handleModelChange = (model: keyof AIModelsState, field: string, value: any) => {
    setAiModels(prev => ({
      ...prev,
      [model]: {
        ...prev[model],
        [field]: value
      }
    }));
  };
  
  // Test AI connection
  const testConnection = async (model: keyof AIModelsState) => {
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Simulate successful connection
      setAiModels(prev => ({
        ...prev,
        [model]: {
          ...prev[model],
          connectionTested: true,
          connectionSuccess: true
        }
      }));
      
      toast({
        title: "Connection Successful",
        description: `Successfully connected to ${model} API.`,
      });
    } catch (error) {
      setAiModels(prev => ({
        ...prev,
        [model]: {
          ...prev[model],
          connectionTested: true,
          connectionSuccess: false
        }
      }));
      
      toast({
        title: "Connection Failed",
        description: `Failed to connect to ${model} API. Please check your API key.`,
        variant: "destructive",
      });
    }
  };
  
  // Handle social media changes
  const handleSocialMediaChange = (platform: keyof SocialMediaState, field: keyof SocialMediaConfig, value: any) => {
    setSocialMedia(prev => ({
      ...prev,
      [platform]: {
        ...prev[platform],
        [field]: value
      }
    }));
  };
  
  // Handle monitoring setting changes
  const handleMonitoringChange = (setting: keyof MonitoringSettings, value: boolean) => {
    setMonitoringSettings(prev => ({
      ...prev,
      [setting]: value
    }));
  };
  
  // Save settings
  const saveSettings = async () => {
    try {
      setSaving(true);
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      toast({
        title: "Settings Saved",
        description: "AI configuration has been updated successfully.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save AI configuration. Please try again.",
        variant: "destructive",
      });
    } finally {
      setSaving(false);
    }
  };
  
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
