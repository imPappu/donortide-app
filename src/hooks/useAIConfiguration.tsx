
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { AIModelsState, SocialMediaState, MonitoringSettings, SocialMediaConfig } from "@/components/admin/types";

export function useAIConfiguration() {
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

  return {
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
  };
}
