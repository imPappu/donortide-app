
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
  Youtube
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const AIManagement = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("configuration");
  
  // AI Configuration state
  const [aiModels, setAiModels] = useState({
    chatgpt: { enabled: true, apiKey: "", model: "gpt-4o" },
    deepseek: { enabled: false, apiKey: "", model: "deepseek-v2" },
    grok: { enabled: false, apiKey: "", model: "grok-1.5" },
    qwen: { enabled: false, apiKey: "", model: "qwen-72b" }
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
  const [socialMediaSettings, setSocialMediaSettings] = useState({
    twitter: { enabled: false, autoPost: false, schedule: "daily" },
    facebook: { enabled: false, autoPost: false, schedule: "weekly" },
    instagram: { enabled: false, autoPost: false, schedule: "weekly" },
    youtube: { enabled: false, autoPost: false, schedule: "monthly" }
  });
  
  const handleAIModelChange = (model: string, field: string, value: any) => {
    setAiModels(prev => ({
      ...prev,
      [model]: {
        ...prev[model as keyof typeof prev],
        [field]: value
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
        ...prev[platform as keyof typeof prev],
        [field]: value
      }
    }));
  };
  
  const saveAIConfiguration = () => {
    // In a real app, this would save to your database
    toast({
      title: "AI Configuration Saved",
      description: "Your AI settings have been updated successfully.",
    });
  };
  
  const testAIConnection = (model: string) => {
    // In a real app, this would test the connection to the AI model
    if (aiModels[model as keyof typeof aiModels].apiKey) {
      toast({
        title: "Connection Successful",
        description: `Successfully connected to ${model} API.`,
      });
    } else {
      toast({
        title: "Connection Failed",
        description: "Please enter a valid API key.",
        variant: "destructive",
      });
    }
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
            <div className="border rounded-lg p-4 space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Bot className="h-5 w-5 text-green-500" />
                  <h3 className="text-lg font-medium">ChatGPT / OpenAI</h3>
                </div>
                <Switch 
                  checked={aiModels.chatgpt.enabled} 
                  onCheckedChange={(checked) => handleAIModelChange('chatgpt', 'enabled', checked)}
                />
              </div>
              
              {aiModels.chatgpt.enabled && (
                <div className="space-y-4 mt-4">
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="chatgpt-key">API Key</Label>
                      <Input 
                        id="chatgpt-key" 
                        type="password" 
                        value={aiModels.chatgpt.apiKey} 
                        onChange={(e) => handleAIModelChange('chatgpt', 'apiKey', e.target.value)}
                        placeholder="Enter OpenAI API Key" 
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="chatgpt-model">Model</Label>
                      <Select 
                        value={aiModels.chatgpt.model}
                        onValueChange={(value) => handleAIModelChange('chatgpt', 'model', value)}
                      >
                        <SelectTrigger id="chatgpt-model">
                          <SelectValue placeholder="Select model" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="gpt-4o">GPT-4o</SelectItem>
                          <SelectItem value="gpt-4o-mini">GPT-4o Mini</SelectItem>
                          <SelectItem value="gpt-3.5-turbo">GPT-3.5 Turbo</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <Button 
                    variant="outline" 
                    onClick={() => testAIConnection('chatgpt')}
                  >
                    Test Connection
                  </Button>
                </div>
              )}
            </div>
            
            {/* DeepSeek Configuration */}
            <div className="border rounded-lg p-4 space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Bot className="h-5 w-5 text-purple-500" />
                  <h3 className="text-lg font-medium">DeepSeek</h3>
                </div>
                <Switch 
                  checked={aiModels.deepseek.enabled} 
                  onCheckedChange={(checked) => handleAIModelChange('deepseek', 'enabled', checked)}
                />
              </div>
              
              {aiModels.deepseek.enabled && (
                <div className="space-y-4 mt-4">
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="deepseek-key">API Key</Label>
                      <Input 
                        id="deepseek-key" 
                        type="password" 
                        value={aiModels.deepseek.apiKey} 
                        onChange={(e) => handleAIModelChange('deepseek', 'apiKey', e.target.value)}
                        placeholder="Enter DeepSeek API Key" 
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="deepseek-model">Model</Label>
                      <Select 
                        value={aiModels.deepseek.model}
                        onValueChange={(value) => handleAIModelChange('deepseek', 'model', value)}
                      >
                        <SelectTrigger id="deepseek-model">
                          <SelectValue placeholder="Select model" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="deepseek-v2">DeepSeek-V2</SelectItem>
                          <SelectItem value="deepseek-coder">DeepSeek Coder</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <Button 
                    variant="outline" 
                    onClick={() => testAIConnection('deepseek')}
                  >
                    Test Connection
                  </Button>
                </div>
              )}
            </div>
            
            {/* Grok Configuration */}
            <div className="border rounded-lg p-4 space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Bot className="h-5 w-5 text-red-500" />
                  <h3 className="text-lg font-medium">Grok</h3>
                </div>
                <Switch 
                  checked={aiModels.grok.enabled} 
                  onCheckedChange={(checked) => handleAIModelChange('grok', 'enabled', checked)}
                />
              </div>
              
              {aiModels.grok.enabled && (
                <div className="space-y-4 mt-4">
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="grok-key">API Key</Label>
                      <Input 
                        id="grok-key" 
                        type="password" 
                        value={aiModels.grok.apiKey} 
                        onChange={(e) => handleAIModelChange('grok', 'apiKey', e.target.value)}
                        placeholder="Enter Grok API Key" 
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="grok-model">Model</Label>
                      <Select 
                        value={aiModels.grok.model}
                        onValueChange={(value) => handleAIModelChange('grok', 'model', value)}
                      >
                        <SelectTrigger id="grok-model">
                          <SelectValue placeholder="Select model" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="grok-1.5">Grok 1.5</SelectItem>
                          <SelectItem value="grok-1">Grok 1</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <Button 
                    variant="outline" 
                    onClick={() => testAIConnection('grok')}
                  >
                    Test Connection
                  </Button>
                </div>
              )}
            </div>
            
            {/* Qwen Configuration */}
            <div className="border rounded-lg p-4 space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Bot className="h-5 w-5 text-blue-500" />
                  <h3 className="text-lg font-medium">Qwen</h3>
                </div>
                <Switch 
                  checked={aiModels.qwen.enabled} 
                  onCheckedChange={(checked) => handleAIModelChange('qwen', 'enabled', checked)}
                />
              </div>
              
              {aiModels.qwen.enabled && (
                <div className="space-y-4 mt-4">
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="qwen-key">API Key</Label>
                      <Input 
                        id="qwen-key" 
                        type="password" 
                        value={aiModels.qwen.apiKey} 
                        onChange={(e) => handleAIModelChange('qwen', 'apiKey', e.target.value)}
                        placeholder="Enter Qwen API Key" 
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="qwen-model">Model</Label>
                      <Select 
                        value={aiModels.qwen.model}
                        onValueChange={(value) => handleAIModelChange('qwen', 'model', value)}
                      >
                        <SelectTrigger id="qwen-model">
                          <SelectValue placeholder="Select model" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="qwen-72b">Qwen 72B</SelectItem>
                          <SelectItem value="qwen-max">Qwen Max</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <Button 
                    variant="outline" 
                    onClick={() => testAIConnection('qwen')}
                  >
                    Test Connection
                  </Button>
                </div>
              )}
            </div>
            
            <div className="flex justify-end mt-6">
              <Button onClick={saveAIConfiguration}>Save AI Configuration</Button>
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
                <Button>Save Monitoring Settings</Button>
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
                <Button>Save Social Media Settings</Button>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default AIManagement;
