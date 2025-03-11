
import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";
import { Facebook, Instagram, Twitter, MessageCircle, Save } from "lucide-react";
import { ADS_CONFIG } from '@/services/apiConfig';

interface SocialMediaSettings {
  facebookEnabled: boolean;
  facebookPixelId: string;
  facebookAppId: string;
  instagramEnabled: boolean;
  twitterEnabled: boolean;
  googleAdsEnabled: boolean;
  googleAdsId: string;
  chatbotEnabled: boolean;
}

const SocialMediaAdsConfiguration = () => {
  const { toast } = useToast();
  const [settings, setSettings] = useState<SocialMediaSettings>({
    facebookEnabled: true,
    facebookPixelId: ADS_CONFIG.facebookAudiencePixel || '',
    facebookAppId: '',
    instagramEnabled: false,
    twitterEnabled: false,
    googleAdsEnabled: true,
    googleAdsId: ADS_CONFIG.googleAdsId || '',
    chatbotEnabled: true
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (field: keyof SocialMediaSettings, value: any) => {
    setSettings(prev => ({ ...prev, [field]: value }));
  };

  const saveSettings = async () => {
    setLoading(true);
    
    try {
      // Simulated API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: "Settings Saved",
        description: "Social media and ads configuration has been updated successfully",
      });
    } catch (error) {
      console.error('Error saving social media settings:', error);
      toast({
        title: "Error",
        description: "Failed to save social media settings",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <MessageCircle className="mr-2 h-5 w-5" />
          Social Media & Ads Configuration
        </CardTitle>
        <CardDescription>
          Configure social media integration and advertising services
        </CardDescription>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {/* Facebook Integration */}
        <div className="space-y-4 border-b pb-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Facebook className="mr-2 h-5 w-5 text-blue-600" />
              <h3 className="text-lg font-medium">Facebook Integration</h3>
            </div>
            <Switch 
              id="facebook-enabled"
              checked={settings.facebookEnabled}
              onCheckedChange={(checked) => handleChange('facebookEnabled', checked)}
            />
          </div>
          
          {settings.facebookEnabled && (
            <div className="space-y-4 pl-7">
              <div className="space-y-2">
                <Label htmlFor="facebook-pixel-id">Facebook Pixel ID</Label>
                <Input 
                  id="facebook-pixel-id" 
                  value={settings.facebookPixelId} 
                  onChange={(e) => handleChange('facebookPixelId', e.target.value)}
                  placeholder="Enter your Facebook Pixel ID"
                />
                <p className="text-sm text-muted-foreground">
                  Used for conversion tracking, audience targeting, and ad optimization
                </p>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="facebook-app-id">Facebook App ID</Label>
                <Input 
                  id="facebook-app-id" 
                  value={settings.facebookAppId} 
                  onChange={(e) => handleChange('facebookAppId', e.target.value)}
                  placeholder="Enter your Facebook App ID"
                />
                <p className="text-sm text-muted-foreground">
                  Required for Facebook Login and social sharing features
                </p>
              </div>
            </div>
          )}
        </div>
        
        {/* Instagram Integration */}
        <div className="flex items-center justify-between border-b pb-4">
          <div className="flex items-center">
            <Instagram className="mr-2 h-5 w-5 text-pink-500" />
            <h3 className="text-lg font-medium">Instagram Integration</h3>
          </div>
          <Switch 
            id="instagram-enabled"
            checked={settings.instagramEnabled}
            onCheckedChange={(checked) => handleChange('instagramEnabled', checked)}
          />
        </div>
        
        {/* Twitter Integration */}
        <div className="flex items-center justify-between border-b pb-4">
          <div className="flex items-center">
            <Twitter className="mr-2 h-5 w-5 text-blue-400" />
            <h3 className="text-lg font-medium">Twitter Integration</h3>
          </div>
          <Switch 
            id="twitter-enabled"
            checked={settings.twitterEnabled}
            onCheckedChange={(checked) => handleChange('twitterEnabled', checked)}
          />
        </div>
        
        {/* Google Ads */}
        <div className="space-y-4 border-b pb-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-medium">Google Ads</h3>
            <Switch 
              id="google-ads-enabled"
              checked={settings.googleAdsEnabled}
              onCheckedChange={(checked) => handleChange('googleAdsEnabled', checked)}
            />
          </div>
          
          {settings.googleAdsEnabled && (
            <div className="space-y-2">
              <Label htmlFor="google-ads-id">Google Ads ID</Label>
              <Input 
                id="google-ads-id" 
                value={settings.googleAdsId} 
                onChange={(e) => handleChange('googleAdsId', e.target.value)}
                placeholder="Enter your Google Ads ID"
              />
              <p className="text-sm text-muted-foreground">
                Used for tracking ad conversions and remarketing
              </p>
            </div>
          )}
        </div>
        
        {/* Chatbot */}
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-medium">AI Chatbot</h3>
            <p className="text-sm text-muted-foreground">
              Enable AI chatbot assistance for users
            </p>
          </div>
          <Switch 
            id="chatbot-enabled"
            checked={settings.chatbotEnabled}
            onCheckedChange={(checked) => handleChange('chatbotEnabled', checked)}
          />
        </div>
      </CardContent>
      
      <CardFooter>
        <Button 
          onClick={saveSettings}
          disabled={loading}
          className="flex items-center"
        >
          <Save className="mr-2 h-4 w-4" />
          {loading ? "Saving..." : "Save Settings"}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default SocialMediaAdsConfiguration;
