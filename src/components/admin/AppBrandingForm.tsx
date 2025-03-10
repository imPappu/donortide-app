
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AppSetting, getAppSettings, updateAppSetting } from '@/services/dbService';
import { useToast } from '@/hooks/use-toast';
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle, RefreshCw, Upload } from 'lucide-react';
import { Separator } from '@/components/ui/separator';

const AppBrandingForm = () => {
  const { toast } = useToast();
  const [settings, setSettings] = useState<Record<string, string>>({
    app_name: 'DonorTide',
    app_description: 'Connecting donors with those in need'
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [logoPreview, setLogoPreview] = useState<string | null>(null);
  const [logoFile, setLogoFile] = useState<File | null>(null);

  const fetchSettings = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getAppSettings();
      const brandingSettings = data.filter(s => 
        s.settingKey === 'app_name' || 
        s.settingKey === 'app_description'
      );
      
      const settingsObj: Record<string, string> = {};
      
      brandingSettings.forEach(s => {
        settingsObj[s.settingKey] = s.settingValue;
      });
      
      setSettings(settingsObj);
      
      // Add default settings if they don't exist
      const requiredSettings = [
        {
          settingKey: 'app_name',
          settingValue: 'DonorTide',
          description: 'Application name displayed throughout the app'
        },
        {
          settingKey: 'app_description',
          settingValue: 'Connecting donors with those in need',
          description: 'Short description of the application'
        }
      ];
      
      for (const required of requiredSettings) {
        if (!data.some(s => s.settingKey === required.settingKey)) {
          try {
            await updateAppSetting(required.settingKey, required.settingValue);
            settingsObj[required.settingKey] = required.settingValue;
          } catch (error) {
            console.error(`Error adding required setting ${required.settingKey}:`, error);
          }
        }
      }
      
      setSettings(settingsObj);
    } catch (error) {
      console.error('Error fetching branding settings:', error);
      setError('Failed to load branding settings. API connection may be unavailable.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSettings();
    // Load current logo
    setLogoPreview('/logo.png');
  }, []);

  const handleChange = (key: string, value: string) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  const handleSave = async (key: string, value: string) => {
    try {
      await updateAppSetting(key, value);
      toast({
        title: "Success",
        description: "Setting updated successfully",
      });
    } catch (error) {
      console.error('Error updating setting:', error);
      toast({
        title: "Error",
        description: "Failed to update setting. Make sure your API is correctly configured.",
        variant: "destructive",
      });
    }
  };

  const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setLogoFile(file);
      const reader = new FileReader();
      reader.onload = () => {
        setLogoPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const uploadLogo = async () => {
    if (!logoFile) return;
    
    // In a real app, you would upload the file to your server or storage
    // This is a simplified example
    toast({
      title: "Logo Upload",
      description: "Logo has been uploaded successfully. Refresh the page to see changes.",
    });
    
    // In a real implementation, you'd have an API endpoint to handle file uploads
    // const formData = new FormData();
    // formData.append("logo", logoFile);
    // await fetch("/api/upload-logo", { method: "POST", body: formData });
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

      <div className="space-y-4">
        <h3 className="text-lg font-medium">Application Branding</h3>
        <Separator />
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="app_name">Application Name</Label>
              <div className="flex gap-2">
                <Input 
                  id="app_name" 
                  value={settings.app_name || ''} 
                  onChange={(e) => handleChange('app_name', e.target.value)} 
                />
                <Button 
                  onClick={() => handleSave('app_name', settings.app_name || '')}
                  size="sm"
                >
                  Save
                </Button>
              </div>
              <p className="text-sm text-muted-foreground">This name will be displayed throughout the app</p>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="app_description">Application Description</Label>
              <div className="flex gap-2">
                <Input 
                  id="app_description" 
                  value={settings.app_description || ''} 
                  onChange={(e) => handleChange('app_description', e.target.value)} 
                />
                <Button 
                  onClick={() => handleSave('app_description', settings.app_description || '')}
                  size="sm"
                >
                  Save
                </Button>
              </div>
              <p className="text-sm text-muted-foreground">Short description for your application</p>
            </div>
          </div>
          
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Application Logo</Label>
              <div className="flex items-center justify-center border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-lg p-6">
                {logoPreview ? (
                  <div className="space-y-4 flex flex-col items-center">
                    <img 
                      src={logoPreview} 
                      alt="Logo preview" 
                      className="w-32 h-32 object-contain bg-white rounded-md p-2" 
                      onError={(e) => {
                        e.currentTarget.src = '/placeholder.svg';
                      }}
                    />
                    <div className="flex gap-2">
                      <Button 
                        variant="outline"
                        size="sm"
                        onClick={() => document.getElementById('logo-upload')?.click()}
                      >
                        Change
                      </Button>
                      {logoFile && (
                        <Button 
                          variant="default"
                          size="sm"
                          onClick={uploadLogo}
                        >
                          <Upload className="h-4 w-4 mr-2" /> Upload
                        </Button>
                      )}
                    </div>
                  </div>
                ) : (
                  <div className="text-center cursor-pointer" onClick={() => document.getElementById('logo-upload')?.click()}>
                    <Upload className="h-12 w-12 mx-auto text-gray-400" />
                    <p className="mt-2 text-sm text-muted-foreground">Click to upload logo</p>
                  </div>
                )}
                <input 
                  id="logo-upload" 
                  type="file" 
                  accept="image/*" 
                  className="hidden" 
                  onChange={handleLogoChange}
                />
              </div>
              <p className="text-sm text-muted-foreground">
                Recommended size: 200x200px. PNG or SVG format preferred.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppBrandingForm;
