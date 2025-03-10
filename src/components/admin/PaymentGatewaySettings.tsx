
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { useToast } from '@/hooks/use-toast';
import PaymentGatewayToggle from './PaymentGatewayToggle';
import PaymentGatewayForm from './PaymentGatewayForm';
import { gatewayConfigs } from './GatewayFormConfigs';
import { AlertCircle } from 'lucide-react';
import { Alert, AlertDescription } from "@/components/ui/alert";

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
    upi: { isEnabled: false, fields: {} }
  });

  const [currentGateway, setCurrentGateway] = useState("paypal");
  const [isSaving, setIsSaving] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);

  useEffect(() => {
    // In a real app, you would fetch the saved settings from an API
    console.log("Fetching payment gateway settings...");
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
        <Alert className="mb-4">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            Payment gateways configured here will be available in the donation forms throughout the app.
          </AlertDescription>
        </Alert>
        
        <Tabs defaultValue="paypal" onValueChange={handleTabChange}>
          <TabsList className="mb-4">
            {Object.keys(gatewayConfigs).map((key) => (
              <TabsTrigger key={key} value={key}>
                {gatewayConfigs[key].name}
              </TabsTrigger>
            ))}
          </TabsList>
          
          {Object.entries(gatewayConfigs).map(([key, config]) => (
            <TabsContent key={key} value={key} className="space-y-4">
              <PaymentGatewayToggle
                name={config.name}
                description={config.description}
                isEnabled={activeGateways[key as keyof typeof activeGateways] || false}
                onToggle={() => handleToggleGateway(key)}
              />
              
              {activeGateways[key as keyof typeof activeGateways] && (
                <PaymentGatewayForm
                  gateway={key}
                  fields={config.fields}
                  fieldValues={gatewaySettings[key]?.fields || {}}
                  onFieldChange={(fieldId, value) => handleFieldChange(key, fieldId, value)}
                />
              )}
            </TabsContent>
          ))}
        </Tabs>
        
        <div className="mt-6 flex items-center justify-between">
          <div>
            {hasChanges && (
              <span className="text-sm text-amber-600">
                You have unsaved changes
              </span>
            )}
          </div>
          <Button 
            onClick={handleSaveSettings} 
            disabled={isSaving || !hasChanges}
          >
            {isSaving ? "Saving..." : "Save Payment Settings"}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default PaymentGatewaySettings;
