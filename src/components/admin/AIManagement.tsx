import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { 
  AlertCircle, 
  Bot, 
  Database, 
  MessageSquare, 
  BugPlay, 
  Shield, 
  Twitter, 
  Facebook, 
  Instagram,
  Youtube,
  EyeIcon,
  EyeOffIcon,
  CheckCircle,
  AlertTriangle
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface AIModelConfig {
  enabled: boolean;
  apiKey: string;
  model: string;
  connectionTested: boolean;
  connectionSuccess?: boolean;
}

interface SocialMediaConfig {
  enabled: boolean;
  autoPost: boolean;
  schedule: string;
}

interface AIModelsState {
  chatgpt: AIModelConfig;
  deepseek: AIModelConfig;
  grok: AIModelConfig;
  qwen: AIModelConfig;
}

interface SocialMediaState {
  twitter: SocialMediaConfig;
  facebook: SocialMediaConfig;
  instagram: SocialMediaConfig;
  youtube: SocialMediaConfig;
}

const AIManagement = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("configuration");
  const [showApiKeys, setShowApiKeys] = useState<Record<string, boolean>>({
    chatgpt: false,
    deepseek: false,
    grok: false,
    qwen: false
  });
  
  // AI Configuration state
  const [aiModels, setAiModels] = useState<AIModelsState>({
    chatgpt: { enabled: true, apiKey: "", model: "gpt-4o", connectionTested: false },
    deepseek: { enabled: false, apiKey: "", model: "deepseek-v2", connectionTested: false },
    grok: { enabled: false, apiKey: "", model: "grok-1.5", connectionTested: false },
    qwen: { enabled: false, apiKey: "", model: "qwen-72b", connectionTested: false }
  });
  
  // Monitoring settings
  const [monitoringSettings, setMonitoringSettings] = useState({
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
  
  const handleAIModelChange = (model: string, field: string, value: any) => {
    setAiModels(prev => ({
      ...prev,
      [model]: {
        ...prev[model as keyof AIModelsState],
        [field]: value,
        // Reset connection status when changing API key or model
        ...(field === 'apiKey' || field === 'model' ? { connectionTested: false, connectionSuccess: undefined } : {})
      }
    }));
  };
  
  const handleMonitoringChange = (setting: string, value: boolean) => {
    setMonitoringSettings(prev => ({
      ...prev,
      [setting]: value
    }));
  };
  
  const handleSocialMediaChange = (platform: string, field: string, value: any) => {
    setSocialMediaSettings(prev => ({
      ...prev,
      [platform]: {
        ...prev[platform as keyof SocialMediaState],
        [field]: value
      }
    }));
  };
  
  const saveAIConfiguration = async () => {
    setSaving(true);
    
    try {
      // In a real app, this would save to your database
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: "AI Configuration Saved",
        description: "Your AI settings have been updated successfully.",
      });
    } catch (error) {
      toast({
        title: "Error Saving Configuration",
        description: "There was a problem saving your AI settings.",
        variant: "destructive",
      });
    } finally {
      setSaving(false);
    }
  };
  
  const testAIConnection = async (model: string) => {
    // In a real app, this would test the connection to the AI model
    const modelConfig = aiModels[model as keyof AIModelsState];
    
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

  const renderApiKeyInput = (modelKey: string, modelConfig: AIModelConfig) => {
    return (
      <div className="space-y-2">
        <Label htmlFor={`${modelKey}-key`}>API Key</Label>
        <div className="relative">
          <Input 
            id={`${modelKey}-key`} 
            type={showApiKeys[modelKey] ? "text" : "password"} 
            value={modelConfig.apiKey} 
            onChange={(e) => handleAIModelChange(modelKey, 'apiKey', e.target.value)}
            placeholder={`Enter ${modelKey} API Key`}
            className="pr-10"
          />
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
            onClick={() => toggleShowApiKey(modelKey)}
          >
            {showApiKeys[modelKey] ? (
              <EyeOffIcon className="h-4 w-4 text-gray-500" />
            ) : (
              <EyeIcon className="h-4 w-4 text-gray-500" />
            )}
          </Button>
        </div>
        
        {modelConfig.connectionTested && (
          <div className={`mt-1 flex items-center text-xs ${modelConfig.connectionSuccess ? 'text-green-600' : 'text-red-600'}`}>
            {modelConfig.connectionSuccess ? (
              <>
                <CheckCircle className="h-3 w-3 mr-1" />
                Connection verified
              </>
            ) : (
              <>
                <AlertTriangle className="h-3 w-3 mr-1" />
                Connection failed
              </>
            )}
          </div>
        )}
      </div>
    );
  };

  const renderModelSection = (
    modelKey: string, 
    modelName: string, 
    iconColor: string, 
    modelOptions: { value: string; label: string }[]
  ) => {
    const modelConfig = aiModels[modelKey as keyof AIModelsState];
    
    return (
      <div className="border rounded-lg p-4 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Bot className={`h-5 w-5 ${iconColor}`} />
            <h3 className="text-lg font-medium">{modelName}</h3>
          </div>
          <Switch 
            checked={modelConfig.enabled} 
            onCheckedChange={(checked) => handleAIModelChange(modelKey, 'enabled', checked)}
          />
        </div>
        
        {modelConfig.enabled && (
          <div className="space-y-4 mt-4">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              {renderApiKeyInput(modelKey, modelConfig)}
              
              <div className="space-y-2">
                <Label htmlFor={`${modelKey}-model`}>Model</Label>
                <Select 
                  value={modelConfig.model}
                  onValueChange={(value) => handleAIModelChange(modelKey, 'model', value)}
                >
                  <SelectTrigger id={`${modelKey}-model`}>
                    <SelectValue placeholder="Select model" />
                  </SelectTrigger>
                  <SelectContent>
                    {modelOptions.map(option => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <Button 
              variant="outline" 
              onClick={() => testAIConnection(modelKey)}
            >
              Test Connection
            </Button>
          </div>
        )}
      </div>
    );
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-2xl">AI Management</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
          <TabsList className="grid grid-cols-3 w-full">
            <TabsTrigger value="configuration">AI Configuration</TabsTrigger>
            <TabsTrigger value="monitoring">Platform Monitoring</TabsTrigger>
            <TabsTrigger value="social">Social Media Automation</TabsTrigger>
          </TabsList>
          
          <TabsContent value="configuration" className="space-y-4">
            <Alert className="bg-blue-50 dark:bg-blue-950 border-blue-200 dark:border-blue-800">
              <AlertCircle className="h-4 w-4 text-blue-600 dark:text-blue-400" />
              <AlertDescription className="text-blue-700 dark:text-blue-300">
                Configure AI models to power your platform monitoring and automation. All processing happens on your server to protect user data privacy.
              </AlertDescription>
            </Alert>
            
            {/* ChatGPT Configuration */}
            {renderModelSection(
              'chatgpt',
              'ChatGPT / OpenAI',
              'text-green-500',
              [
                { value: 'gpt-4o', label: 'GPT-4o' },
                { value: 'gpt-4o-mini', label: 'GPT-4o Mini' },
                { value: 'gpt-3.5-turbo', label: 'GPT-3.5 Turbo' }
              ]
            )}
            
            {/* DeepSeek Configuration */}
            {renderModelSection(
              'deepseek',
              'DeepSeek',
              'text-purple-500',
              [
                { value: 'deepseek-v2', label: 'DeepSeek-V2' },
                { value: 'deepseek-coder', label: 'DeepSeek Coder' }
              ]
            )}
            
            {/* Grok Configuration */}
            {renderModelSection(
              'grok',
              'Grok',
              'text-red-500',
              [
                { value: 'grok-1.5', label: 'Grok 1.5' },
                { value: 'grok-1', label: 'Grok 1' }
              ]
            )}
            
            {/* Qwen Configuration */}
            {renderModelSection(
              'qwen',
              'Qwen',
              'text-blue-500',
              [
                { value: 'qwen-72b', label: 'Qwen 72B' },
                { value: 'qwen-max', label: 'Qwen Max' }
              ]
            )}
            
            <div className="flex justify-end mt-6">
              <Button 
                onClick={saveAIConfiguration} 
                disabled={saving}
              >
                {saving ? 'Saving...' : 'Save AI Configuration'}
              </Button>
            </div>
          </TabsContent>
          
          <TabsContent value="monitoring" className="space-y-4">
            <Alert className="bg-blue-50 dark:bg-blue-950 border-blue-200 dark:border-blue-800">
              <Database className="h-4 w-4 text-blue-600 dark:text-blue-400" />
              <AlertDescription className="text-blue-700 dark:text-blue-300">
                Configure how AI monitors your platform for issues, content violations, and performance problems.
              </AlertDescription>
            </Alert>
            
            <div className="space-y-4">
              <div className="border rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <BugPlay className="h-5 w-5 text-red-500" />
                    <div>
                      <h3 className="font-medium">Bug Detection</h3>
                      <p className="text-sm text-muted-foreground">AI will monitor application logs for errors and anomalies</p>
                    </div>
                  </div>
                  <Switch 
                    checked={monitoringSettings.bugDetection} 
                    onCheckedChange={(checked) => handleMonitoringChange('bugDetection', checked)}
                  />
                </div>
              </div>
              
              <div className="border rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Shield className="h-5 w-5 text-amber-500" />
                    <div>
                      <h3 className="font-medium">Spam Detection</h3>
                      <p className="text-sm text-muted-foreground">AI will flag suspicious activity and potential spam</p>
                    </div>
                  </div>
                  <Switch 
                    checked={monitoringSettings.spamDetection} 
                    onCheckedChange={(checked) => handleMonitoringChange('spamDetection', checked)}
                  />
                </div>
              </div>
              
              <div className="border rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <MessageSquare className="h-5 w-5 text-blue-500" />
                    <div>
                      <h3 className="font-medium">Content Moderation</h3>
                      <p className="text-sm text-muted-foreground">AI will monitor community posts for inappropriate content</p>
                    </div>
                  </div>
                  <Switch 
                    checked={monitoringSettings.contentModeration} 
                    onCheckedChange={(checked) => handleMonitoringChange('contentModeration', checked)}
                  />
                </div>
              </div>
              
              <div className="border rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Database className="h-5 w-5 text-green-500" />
                    <div>
                      <h3 className="font-medium">Data Analysis</h3>
                      <p className="text-sm text-muted-foreground">AI will analyze database and provide insights</p>
                    </div>
                  </div>
                  <Switch 
                    checked={monitoringSettings.dataAnalysis} 
                    onCheckedChange={(checked) => handleMonitoringChange('dataAnalysis', checked)}
                  />
                </div>
              </div>
              
              <div className="border rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <AlertCircle className="h-5 w-5 text-purple-500" />
                    <div>
                      <h3 className="font-medium">Scheduled Reports</h3>
                      <p className="text-sm text-muted-foreground">AI will generate periodic reports on platform health</p>
                    </div>
                  </div>
                  <Switch 
                    checked={monitoringSettings.scheduledReports} 
                    onCheckedChange={(checked) => handleMonitoringChange('scheduledReports', checked)}
                  />
                </div>
              </div>
            </div>
            
            <div className="mt-6 space-y-4">
              <h3 className="text-lg font-medium">Monitoring Rules & Thresholds</h3>
              <div className="space-y-3">
                <div className="space-y-2">
                  <Label htmlFor="spam-threshold">Spam Detection Threshold</Label>
                  <Select defaultValue="medium">
                    <SelectTrigger id="spam-threshold">
                      <SelectValue placeholder="Select threshold" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="low">Low (catch more, higher false positives)</SelectItem>
                      <SelectItem value="medium">Medium (balanced)</SelectItem>
                      <SelectItem value="high">High (less false positives)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="content-rules">Content Moderation Rules</Label>
                  <Textarea 
                    id="content-rules" 
                    placeholder="Enter custom rules for content moderation..." 
                    className="min-h-[100px]"
                    defaultValue="No profanity, hate speech, or personal attacks.\nNo solicitation or spam.\nNo sharing of personal contact information."
                  />
                </div>
              </div>
              
              <div className="flex justify-end mt-6">
                <Button 
                  onClick={() => {
                    toast({
                      title: "Monitoring Settings Saved",
                      description: "Your AI monitoring settings have been updated successfully."
                    });
                  }}
                >
                  Save Monitoring Settings
                </Button>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="social" className="space-y-4">
            <Alert className="bg-blue-50 dark:bg-blue-950 border-blue-200 dark:border-blue-800">
              <AlertCircle className="h-4 w-4 text-blue-600 dark:text-blue-400" />
              <AlertDescription className="text-blue-700 dark:text-blue-300">
                Configure AI to help automate your social media posting and engagement. Connect your accounts and set schedules.
              </AlertDescription>
            </Alert>
            
            <div className="space-y-4">
              {/* Twitter/X Configuration */}
              <div className="border rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Twitter className="h-5 w-5 text-blue-400" />
                    <h3 className="font-medium">Twitter/X</h3>
                  </div>
                  <Switch 
                    checked={socialMediaSettings.twitter.enabled} 
                    onCheckedChange={(checked) => handleSocialMediaChange('twitter', 'enabled', checked)}
                  />
                </div>
                
                {socialMediaSettings.twitter.enabled && (
                  <div className="mt-4 space-y-4">
                    <div className="flex items-center space-x-2">
                      <Switch 
                        id="twitter-auto"
                        checked={socialMediaSettings.twitter.autoPost} 
                        onCheckedChange={(checked) => handleSocialMediaChange('twitter', 'autoPost', checked)}
                      />
                      <Label htmlFor="twitter-auto">Auto-post updates</Label>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="twitter-schedule">Posting Schedule</Label>
                      <Select 
                        value={socialMediaSettings.twitter.schedule}
                        onValueChange={(value) => handleSocialMediaChange('twitter', 'schedule', value)}
                      >
                        <SelectTrigger id="twitter-schedule">
                          <SelectValue placeholder="Select schedule" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="daily">Daily</SelectItem>
                          <SelectItem value="weekly">Weekly</SelectItem>
                          <SelectItem value="monthly">Monthly</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="twitter-api">API Key</Label>
                      <Input id="twitter-api" type="password" placeholder="Enter Twitter API key" />
                    </div>
                    
                    <Button variant="outline" size="sm">Connect Account</Button>
                  </div>
                )}
              </div>
              
              {/* Facebook Configuration */}
              <div className="border rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Facebook className="h-5 w-5 text-blue-600" />
                    <h3 className="font-medium">Facebook</h3>
                  </div>
                  <Switch 
                    checked={socialMediaSettings.facebook.enabled} 
                    onCheckedChange={(checked) => handleSocialMediaChange('facebook', 'enabled', checked)}
                  />
                </div>
                
                {socialMediaSettings.facebook.enabled && (
                  <div className="mt-4 space-y-4">
                    <div className="flex items-center space-x-2">
                      <Switch 
                        id="facebook-auto"
                        checked={socialMediaSettings.facebook.autoPost} 
                        onCheckedChange={(checked) => handleSocialMediaChange('facebook', 'autoPost', checked)}
                      />
                      <Label htmlFor="facebook-auto">Auto-post updates</Label>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="facebook-schedule">Posting Schedule</Label>
                      <Select 
                        value={socialMediaSettings.facebook.schedule}
                        onValueChange={(value) => handleSocialMediaChange('facebook', 'schedule', value)}
                      >
                        <SelectTrigger id="facebook-schedule">
                          <SelectValue placeholder="Select schedule" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="daily">Daily</SelectItem>
                          <SelectItem value="weekly">Weekly</SelectItem>
                          <SelectItem value="monthly">Monthly</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <Button variant="outline" size="sm">Connect Account</Button>
                  </div>
                )}
              </div>
              
              {/* Instagram Configuration */}
              <div className="border rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Instagram className="h-5 w-5 text-pink-500" />
                    <h3 className="font-medium">Instagram</h3>
                  </div>
                  <Switch 
                    checked={socialMediaSettings.instagram.enabled} 
                    onCheckedChange={(checked) => handleSocialMediaChange('instagram', 'enabled', checked)}
                  />
                </div>
                
                {socialMediaSettings.instagram.enabled && (
                  <div className="mt-4 space-y-4">
                    <div className="flex items-center space-x-2">
                      <Switch 
                        id="instagram-auto"
                        checked={socialMediaSettings.instagram.autoPost} 
                        onCheckedChange={(checked) => handleSocialMediaChange('instagram', 'autoPost', checked)}
                      />
                      <Label htmlFor="instagram-auto">Auto-post updates</Label>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="instagram-schedule">Posting Schedule</Label>
                      <Select 
                        value={socialMediaSettings.instagram.schedule}
                        onValueChange={(value) => handleSocialMediaChange('instagram', 'schedule', value)}
                      >
                        <SelectTrigger id="instagram-schedule">
                          <SelectValue placeholder="Select schedule" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="daily">Daily</SelectItem>
                          <SelectItem value="weekly">Weekly</SelectItem>
                          <SelectItem value="monthly">Monthly</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <Button variant="outline" size="sm">Connect Account</Button>
                  </div>
                )}
              </div>
              
              {/* YouTube Configuration */}
              <div className="border rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Youtube className="h-5 w-5 text-red-500" />
                    <h3 className="font-medium">YouTube</h3>
                  </div>
                  <Switch 
                    checked={socialMediaSettings.youtube.enabled} 
                    onCheckedChange={(checked) => handleSocialMediaChange('youtube', 'enabled', checked)}
                  />
                </div>
                
                {socialMediaSettings.youtube.enabled && (
                  <div className="mt-4 space-y-4">
                    <div className="flex items-center space-x-2">
                      <Switch 
                        id="youtube-auto"
                        checked={socialMediaSettings.youtube.autoPost} 
                        onCheckedChange={(checked) => handleSocialMediaChange('youtube', 'autoPost', checked)}
                      />
                      <Label htmlFor="youtube-auto">Auto-post updates</Label>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="youtube-schedule">Posting Schedule</Label>
                      <Select 
                        value={socialMediaSettings.youtube.schedule}
                        onValueChange={(value) => handleSocialMediaChange('youtube', 'schedule', value)}
                      >
                        <SelectTrigger id="youtube-schedule">
                          <SelectValue placeholder="Select schedule" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="weekly">Weekly</SelectItem>
                          <SelectItem value="monthly">Monthly</SelectItem>
                          <SelectItem value="quarterly">Quarterly</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <Button variant="outline" size="sm">Connect Account</Button>
                  </div>
                )}
              </div>
            </div>
            
            <div className="mt-6 space-y-4">
              <h3 className="text-lg font-medium">AI Content Generation</h3>
              <div className="space-y-2">
                <Label htmlFor="social-content-style">Content Style</Label>
                <Select defaultValue="informative">
                  <SelectTrigger id="social-content-style">
                    <SelectValue placeholder="Select style" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="informative">Informative</SelectItem>
                    <SelectItem value="promotional">Promotional</SelectItem>
                    <SelectItem value="casual">Casual & Friendly</SelectItem>
                    <SelectItem value="professional">Professional</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="content-topics">Content Topics & Keywords</Label>
                <Textarea 
                  id="content-topics" 
                  placeholder="Enter topics and keywords to include in generated content..." 
                  className="min-h-[100px]"
                  defaultValue="Blood donation, health awareness, community support, volunteer opportunities"
                />
              </div>
              
              <div className="flex justify-end mt-6">
                <Button
                  onClick={() => {
                    toast({
                      title: "Social Media Settings Saved",
                      description: "Your social media automation settings have been updated."
                    });
                  }}
                >
                  Save Social Media Settings
                </Button>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default AIManagement;
