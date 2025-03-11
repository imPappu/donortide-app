
import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";
import { MapPin, Save } from "lucide-react";
import { MAP_CONFIG } from '@/services/apiConfig';
import { getCurrentLocation } from '@/services/locationService';

interface MapSettings {
  apiKey: string;
  provider: 'google' | 'mapbox' | 'here' | 'osm';
  trackingEnabled: boolean;
  trackingInterval: number;
  defaultZoom: number;
}

const MapApiConfiguration = () => {
  const { toast } = useToast();
  const [settings, setSettings] = useState<MapSettings>({
    apiKey: MAP_CONFIG.apiKey || '',
    provider: 'google',
    trackingEnabled: true,
    trackingInterval: 10, // minutes
    defaultZoom: MAP_CONFIG.defaultZoom || 13
  });
  const [loading, setLoading] = useState(false);
  const [testingLocation, setTestingLocation] = useState(false);
  const [locationTestResult, setLocationTestResult] = useState<{success: boolean, message: string} | null>(null);

  const handleChange = (field: keyof MapSettings, value: any) => {
    setSettings(prev => ({ ...prev, [field]: value }));
  };

  const saveSettings = async () => {
    setLoading(true);
    
    try {
      // Simulated API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: "Settings Saved",
        description: "Map API configuration has been updated successfully",
      });
    } catch (error) {
      console.error('Error saving map settings:', error);
      toast({
        title: "Error",
        description: "Failed to save map settings",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const testLocationServices = async () => {
    setTestingLocation(true);
    setLocationTestResult(null);
    
    try {
      const location = await getCurrentLocation();
      
      if (location) {
        setLocationTestResult({
          success: true,
          message: `Successfully obtained location: ${location.lat.toFixed(6)}, ${location.lng.toFixed(6)}`
        });
        
        toast({
          title: "Location Test Successful",
          description: "Successfully retrieved user location",
        });
      } else {
        throw new Error("Could not get location");
      }
    } catch (error) {
      console.error('Location test failed:', error);
      
      setLocationTestResult({
        success: false,
        message: `Failed to get location: ${error instanceof Error ? error.message : 'Unknown error'}`
      });
      
      toast({
        title: "Location Test Failed",
        description: error instanceof Error ? error.message : 'Unknown error',
        variant: "destructive",
      });
    } finally {
      setTestingLocation(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <MapPin className="mr-2 h-5 w-5" />
          Map API Configuration
        </CardTitle>
        <CardDescription>
          Configure map services and location tracking settings
        </CardDescription>
      </CardHeader>
      
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="map-provider">Map Provider</Label>
            <select 
              id="map-provider"
              className="w-full p-2 border rounded-md"
              value={settings.provider}
              onChange={(e) => handleChange('provider', e.target.value)}
            >
              <option value="google">Google Maps</option>
              <option value="mapbox">Mapbox</option>
              <option value="here">HERE Maps</option>
              <option value="osm">OpenStreetMap</option>
            </select>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="api-key">API Key</Label>
            <Input 
              id="api-key" 
              type="password"
              value={settings.apiKey} 
              onChange={(e) => handleChange('apiKey', e.target.value)}
              placeholder="Enter your map service API key"
            />
            <p className="text-sm text-muted-foreground">
              This key will be used for all map-related features in the application
            </p>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="default-zoom">Default Zoom Level</Label>
            <Input 
              id="default-zoom" 
              type="number"
              min="1"
              max="20"
              value={settings.defaultZoom} 
              onChange={(e) => handleChange('defaultZoom', parseInt(e.target.value))}
            />
          </div>
          
          <div className="flex items-center space-x-2 pt-4">
            <Switch 
              id="tracking-enabled"
              checked={settings.trackingEnabled}
              onCheckedChange={(checked) => handleChange('trackingEnabled', checked)}
            />
            <Label htmlFor="tracking-enabled">Enable Background Location Tracking</Label>
          </div>
          
          {settings.trackingEnabled && (
            <div className="space-y-2 mt-4">
              <Label htmlFor="tracking-interval">Location Tracking Interval (minutes)</Label>
              <Input 
                id="tracking-interval" 
                type="number"
                min="5"
                max="60"
                value={settings.trackingInterval} 
                onChange={(e) => handleChange('trackingInterval', parseInt(e.target.value))}
              />
              <p className="text-sm text-muted-foreground">
                How often to update user location in the background (minimum 5 minutes recommended to conserve battery)
              </p>
            </div>
          )}
          
          <div className="pt-4">
            <Button 
              variant="outline" 
              onClick={testLocationServices}
              disabled={testingLocation}
            >
              {testingLocation ? "Testing..." : "Test Location Services"}
            </Button>
          </div>
          
          {locationTestResult && (
            <div className={`p-3 rounded-md mt-4 ${locationTestResult.success ? 'bg-green-50 text-green-700 dark:bg-green-900/30 dark:text-green-300' : 'bg-red-50 text-red-700 dark:bg-red-900/30 dark:text-red-300'}`}>
              {locationTestResult.message}
            </div>
          )}
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

export default MapApiConfiguration;
