import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from '@/hooks/use-toast';
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle, RefreshCw } from 'lucide-react';
import { AppSetting } from "@/types/apiTypes";
import { getAppSettings, updateAppSetting } from "@/services/settingService";

const AppSettingsForm = () => {
  const { toast } = useToast();
  const [settings, setSettings] = useState<AppSetting[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchSettings = async () => {
    setLoading(true);
    setError(null);
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
            setError(`Failed to add required setting: ${required.settingKey}`);
          }
        }
      }
    } catch (error) {
      console.error('Error fetching settings:', error);
      setError('Failed to load app settings. API connection may be unavailable.');
      
      // If we couldn't fetch settings, create a default admin_url_path setting locally
      if (!settings.some(s => s.settingKey === 'admin_url_path')) {
        setSettings([{
          settingKey: 'admin_url_path',
          settingValue: 'admin',
          description: 'Custom URL path for admin panel (e.g., "admin", "dashboard", "control-panel")'
        }]);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
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
        description: "Failed to update setting. Make sure your API is correctly configured.",
        variant: "destructive",
      });
    }
  };

  if (loading) {
    return <div className="text-center py-6">Loading settings...</div>;
  }

  return (
    <div className="space-y-6">
      {error && (
        <Alert variant="destructive" className="mb-4">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
          <Button 
            variant="outline" 
            size="sm" 
            className="ml-auto" 
            onClick={fetchSettings}
          >
            <RefreshCw className="h-4 w-4 mr-2" />
            Retry
          </Button>
        </Alert>
      )}

      <div className="mb-4 p-4 bg-blue-50 dark:bg-blue-950 rounded-md border border-blue-200 dark:border-blue-800">
        <p className="text-sm text-blue-700 dark:text-blue-300">
          <strong>Note:</strong> Changes to the admin URL path require a page refresh to take effect. After changing this setting, refresh your browser and navigate to the new URL.
        </p>
      </div>

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
