
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AppSetting, getAppSettings, updateAppSetting } from '@/services/dbService';
import { useToast } from '@/hooks/use-toast';

const AppSettingsForm = () => {
  const { toast } = useToast();
  const [settings, setSettings] = useState<AppSetting[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const data = await getAppSettings();
        setSettings(data);
        
        // Ensure required settings exist
        const requiredSettings = [
          {
            settingKey: 'admin_url_path',
            settingValue: 'admin',
            description: 'Custom URL path for admin panel (e.g., "admin", "dashboard", "control-panel")'
          }
        ];
        
        // Check if each required setting exists, if not add it to the settings
        for (const required of requiredSettings) {
          if (!data.some(s => s.settingKey === required.settingKey)) {
            try {
              // Use the updateAppSetting with correct number of arguments
              await updateAppSetting(required.settingKey, required.settingValue);
              setSettings(prev => [...prev, required]);
            } catch (error) {
              console.error(`Error adding required setting ${required.settingKey}:`, error);
            }
          }
        }
      } catch (error) {
        console.error('Error fetching settings:', error);
        toast({
          title: "Error",
          description: "Failed to load app settings",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchSettings();
  }, []);

  const handleChange = (index: number, value: string) => {
    const updatedSettings = [...settings];
    updatedSettings[index] = { ...updatedSettings[index], settingValue: value };
    setSettings(updatedSettings);
  };

  const handleSave = async (key: string, value: string) => {
    try {
      await updateAppSetting(key, value);
      toast({
        title: "Success",
        description: "Setting updated successfully",
      });
      
      // If admin URL path was updated, prompt for page reload
      if (key === 'admin_url_path') {
        toast({
          title: "Admin URL Changed",
          description: "Please refresh the page for the new admin URL to take effect.",
          duration: 5000,
        });
      }
    } catch (error) {
      console.error('Error updating setting:', error);
      toast({
        title: "Error",
        description: "Failed to update setting",
        variant: "destructive",
      });
    }
  };

  if (loading) {
    return <div className="text-center py-6">Loading settings...</div>;
  }

  return (
    <div className="space-y-6">
      {settings.map((setting, index) => (
        <div key={setting.settingKey} className="p-4 border rounded-md">
          <div className="space-y-2">
            <Label htmlFor={setting.settingKey}>{setting.settingKey.replace(/_/g, ' ').toUpperCase()}</Label>
            <p className="text-sm text-muted-foreground">{setting.description}</p>
            <div className="flex gap-2">
              <Input 
                id={setting.settingKey} 
                value={setting.settingValue} 
                onChange={(e) => handleChange(index, e.target.value)} 
              />
              <Button 
                onClick={() => handleSave(setting.settingKey, setting.settingValue)}
                size="sm"
              >
                Save
              </Button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AppSettingsForm;
