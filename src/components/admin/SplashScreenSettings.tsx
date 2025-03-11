
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getAppSettings } from '@/services/dbService';
import { updateAppSetting } from '@/services/settingService';
import { useToast } from '@/hooks/use-toast';
import { Loader2, RefreshCw, Image, Palette } from 'lucide-react';
import { Slider } from "@/components/ui/slider";

const SplashScreenSettings = () => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [settings, setSettings] = useState({
    splash_backgroundColor: '#ef4444',
    splash_logo: '/logo.png',
    splash_title: 'DonorTide',
    splash_subtitle: 'Connecting donors with those in need',
    splash_duration: '2000'
  });
  
  const fetchSettings = async () => {
    setLoading(true);
    try {
      const allSettings = await getAppSettings();
      
      // Get existing splash screen settings
      const splashSettings = allSettings.filter(setting => 
        setting.settingKey.startsWith('splash_')
      );
      
      // If splash settings exist, update state
      if (splashSettings.length > 0) {
        const newSettings = { ...settings };
        
        splashSettings.forEach(setting => {
          if (setting.settingKey in newSettings) {
            // @ts-ignore - Dynamic assignment
            newSettings[setting.settingKey] = setting.settingValue;
          }
        });
        
        setSettings(newSettings);
      } else {
        // Create default splash settings if they don't exist
        const defaultSettings = {
          splash_backgroundColor: '#ef4444',
          splash_logo: '/logo.png',
          splash_title: 'DonorTide',
          splash_subtitle: 'Connecting donors with those in need',
          splash_duration: '2000'
        };
        
        for (const [key, value] of Object.entries(defaultSettings)) {
          await updateAppSetting(key, value);
        }
      }
    } catch (error) {
      console.error('Failed to fetch splash screen settings:', error);
      toast({
        title: "Error",
        description: "Could not load splash screen settings",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };
  
  useEffect(() => {
    fetchSettings();
  }, []);
  
  const handleChange = (key: string, value: string) => {
    setSettings(prev => ({
      ...prev,
      [key]: value
    }));
  };
  
  const handleSave = async (key: string, value: string) => {
    setSaving(true);
    try {
      await updateAppSetting(key, value);
      toast({
        title: "Success",
        description: "Splash screen setting updated successfully",
      });
    } catch (error) {
      console.error('Error updating setting:', error);
      toast({
        title: "Error",
        description: "Failed to update splash screen setting",
        variant: "destructive",
      });
    } finally {
      setSaving(false);
    }
  };
  
  const handleSaveAll = async () => {
    setSaving(true);
    try {
      for (const [key, value] of Object.entries(settings)) {
        await updateAppSetting(key, value);
      }
      toast({
        title: "Success",
        description: "All splash screen settings updated successfully",
      });
    } catch (error) {
      console.error('Error updating settings:', error);
      toast({
        title: "Error",
        description: "Failed to update all splash screen settings",
        variant: "destructive",
      });
    } finally {
      setSaving(false);
    }
  };
  
  if (loading) {
    return (
      <div className="flex items-center justify-center p-6">
        <Loader2 className="h-6 w-6 animate-spin text-primary" />
        <span className="ml-2">Loading splash screen settings...</span>
      </div>
    );
  }
  
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl flex items-center gap-2">
          <Image className="h-5 w-5 text-primary" />
          Splash Screen Settings
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="appearance">
          <TabsList className="mb-4">
            <TabsTrigger value="appearance">Appearance</TabsTrigger>
            <TabsTrigger value="text">Text</TabsTrigger>
            <TabsTrigger value="timing">Timing</TabsTrigger>
          </TabsList>
          
          <TabsContent value="appearance">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="backgroundColor">Background Color</Label>
                <div className="flex gap-2">
                  <Input
                    id="backgroundColor"
                    type="color"
                    value={settings.splash_backgroundColor}
                    onChange={(e) => handleChange('splash_backgroundColor', e.target.value)}
                    className="w-16 h-10"
                  />
                  <Input
                    value={settings.splash_backgroundColor}
                    onChange={(e) => handleChange('splash_backgroundColor', e.target.value)}
                    className="flex-1"
                  />
                  <Button size="sm" onClick={() => handleSave('splash_backgroundColor', settings.splash_backgroundColor)}>
                    {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : "Save"}
                  </Button>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="logo">Logo URL</Label>
                <div className="flex gap-2">
                  <Input
                    id="logo"
                    value={settings.splash_logo}
                    onChange={(e) => handleChange('splash_logo', e.target.value)}
                    placeholder="/logo.png or https://example.com/logo.png"
                  />
                  <Button size="sm" onClick={() => handleSave('splash_logo', settings.splash_logo)}>
                    {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : "Save"}
                  </Button>
                </div>
                <p className="text-xs text-muted-foreground">Use a URL or path to an image file</p>
              </div>
              
              <div className="mt-4">
                <p className="text-sm font-medium mb-2">Preview</p>
                <div 
                  className="w-full h-40 rounded-md flex items-center justify-center"
                  style={{ backgroundColor: settings.splash_backgroundColor }}
                >
                  <div className="text-center">
                    <img 
                      src={settings.splash_logo} 
                      alt="Logo Preview" 
                      className="w-16 h-16 mx-auto mb-2 rounded-full bg-white p-1"
                      onError={(e) => {
                        e.currentTarget.src = '/placeholder.svg';
                      }}
                    />
                    <h3 className="text-white font-bold">{settings.splash_title}</h3>
                    <p className="text-white text-sm opacity-80">{settings.splash_subtitle}</p>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="text">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">Title</Label>
                <div className="flex gap-2">
                  <Input
                    id="title"
                    value={settings.splash_title}
                    onChange={(e) => handleChange('splash_title', e.target.value)}
                  />
                  <Button size="sm" onClick={() => handleSave('splash_title', settings.splash_title)}>
                    {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : "Save"}
                  </Button>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="subtitle">Subtitle</Label>
                <div className="flex gap-2">
                  <Input
                    id="subtitle"
                    value={settings.splash_subtitle}
                    onChange={(e) => handleChange('splash_subtitle', e.target.value)}
                  />
                  <Button size="sm" onClick={() => handleSave('splash_subtitle', settings.splash_subtitle)}>
                    {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : "Save"}
                  </Button>
                </div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="timing">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="duration">
                  Duration (milliseconds): {settings.splash_duration}ms
                </Label>
                <div className="flex items-center gap-4">
                  <Slider 
                    id="duration"
                    min={500}
                    max={5000}
                    step={100}
                    value={[parseInt(settings.splash_duration)]}
                    onValueChange={(value) => handleChange('splash_duration', value[0].toString())}
                    className="flex-1"
                  />
                  <Button size="sm" onClick={() => handleSave('splash_duration', settings.splash_duration)}>
                    {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : "Save"}
                  </Button>
                </div>
                <p className="text-xs text-muted-foreground">
                  How long the splash screen will be displayed (500ms - 5000ms)
                </p>
              </div>
            </div>
          </TabsContent>
        </Tabs>
        
        <div className="mt-6 flex justify-end">
          <Button variant="default" onClick={handleSaveAll} disabled={saving}>
            {saving ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : <RefreshCw className="h-4 w-4 mr-2" />}
            Save All Settings
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default SplashScreenSettings;
