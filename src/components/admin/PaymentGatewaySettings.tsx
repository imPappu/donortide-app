
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs } from "@/components/ui/tabs";
import { useToast } from '@/hooks/use-toast';
import { gatewayConfigs } from './GatewayFormConfigs';
import PaymentSettingsAlert from './payment/PaymentSettingsAlert';
import PaymentGatewayTabList from './payment/PaymentGatewayTabList';
import PaymentGatewayTabContent from './payment/PaymentGatewayTabContent';
import PaymentSettingsSaveSection from './payment/PaymentSettingsSaveSection';

// Define a type for the payment gateway settings
interface PaymentGatewaySettings {
  [key: string]: {
    isEnabled: boolean;
    fields: Record<string, string>;
  };
}

const PaymentGatewaySettings = () => {
  const { toast } = useToast();
  const [activeGateways, setActiveGateways] = useState({
    paypal: true,
    stripe: true,
    esewa: false,
    imepay: false,
    upi: false
  });

  const [gatewaySettings, setGatewaySettings] = useState<PaymentGatewaySettings>({
    paypal: { isEnabled: true, fields: {} },
    stripe: { isEnabled: true, fields: {} },
    esewa: { isEnabled: false, fields: {} },
    imepay: { isEnabled: false, fields: {} },
    upi: { isEnabled: false, fields: {} },
    card: { isEnabled: true, fields: {} },
    bank: { isEnabled: true, fields: {} }
  });

  const [currentGateway, setCurrentGateway] = useState("paypal");
  const [isSaving, setIsSaving] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);

  useEffect(() => {
    // In a real app, you would fetch the saved settings from an API
    console.log("Fetching payment gateway settings...");
    
    // Try to get saved settings from localStorage
    const savedSettings = localStorage.getItem('paymentGatewaySettings');
    if (savedSettings) {
      try {
        const parsedSettings = JSON.parse(savedSettings);
        setGatewaySettings(parsedSettings);
        
        // Update activeGateways state based on saved settings
        const newActiveGateways = { ...activeGateways };
        Object.keys(parsedSettings).forEach(key => {
          if (key in newActiveGateways) {
            newActiveGateways[key as keyof typeof newActiveGateways] = parsedSettings[key].isEnabled;
          }
        });
        setActiveGateways(newActiveGateways);
      } catch (error) {
        console.error("Error loading saved settings:", error);
      }
    }
    
    // Simulating loading saved settings
    setTimeout(() => {
      console.log("Payment gateway settings loaded");
    }, 500);
  }, []);

  const handleToggleGateway = (gateway: string) => {
    setActiveGateways(prev => {
      const newState = {
        ...prev,
        [gateway]: !prev[gateway as keyof typeof prev]
      };
      
      // Update the gateway settings too
      setGatewaySettings(prevSettings => ({
        ...prevSettings,
        [gateway]: {
          ...prevSettings[gateway],
          isEnabled: newState[gateway as keyof typeof newState]
        }
      }));
      
      setHasChanges(true);
      return newState;
    });
  };

  const handleFieldChange = (gateway: string, fieldId: string, value: string) => {
    setGatewaySettings(prev => ({
      ...prev,
      [gateway]: {
        ...prev[gateway],
        fields: {
          ...prev[gateway].fields,
          [fieldId]: value
        }
      }
    }));
    setHasChanges(true);
  };

  const handleSaveSettings = async () => {
    setIsSaving(true);
    
    try {
      // Here you would call an API to save the payment gateway settings
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API call

      // Update the settings with the active state
      const settingsToSave = Object.keys(gatewaySettings).reduce((acc, gateway) => {
        acc[gateway] = {
          ...gatewaySettings[gateway],
          isEnabled: activeGateways[gateway as keyof typeof activeGateways] || false
        };
        return acc;
      }, {} as PaymentGatewaySettings);
      
      console.log("Saving gateway settings:", settingsToSave);
      
      // Save to localStorage for demo purposes
      localStorage.setItem('paymentGatewaySettings', JSON.stringify(settingsToSave));
      
      toast({
        title: "Settings Saved",
        description: "Payment gateway settings have been updated.",
      });
      
      setHasChanges(false);
    } catch (error) {
      console.error("Error saving gateway settings:", error);
      toast({
        title: "Error",
        description: "Failed to save payment gateway settings.",
        variant: "destructive",
      });
    } finally {
      setIsSaving(false);
    }
  };

  const handleTabChange = (value: string) => {
    setCurrentGateway(value);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Payment Gateway Configuration</CardTitle>
      </CardHeader>
      <CardContent>
        <PaymentSettingsAlert />
        
        <Tabs defaultValue="paypal" onValueChange={handleTabChange}>
          <PaymentGatewayTabList gatewayConfigs={gatewayConfigs} />
          
          {Object.entries(gatewayConfigs).map(([key, config]) => (
            <PaymentGatewayTabContent
              key={key}
              gatewayKey={key}
              config={config}
              isEnabled={activeGateways[key as keyof typeof activeGateways] || false}
              fieldValues={gatewaySettings[key]?.fields || {}}
              onToggle={() => handleToggleGateway(key)}
              onFieldChange={(fieldId, value) => handleFieldChange(key, fieldId, value)}
            />
          ))}
        </Tabs>
        
        <PaymentSettingsSaveSection
          hasChanges={hasChanges}
          isSaving={isSaving}
          onSave={handleSaveSettings}
        />
      </CardContent>
    </Card>
  );
};

export default PaymentGatewaySettings;
