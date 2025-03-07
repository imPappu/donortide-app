
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { useToast } from '@/hooks/use-toast';
import PaymentGatewayToggle from './PaymentGatewayToggle';
import PaymentGatewayForm from './PaymentGatewayForm';
import { gatewayConfigs } from './GatewayFormConfigs';

const PaymentGatewaySettings = () => {
  const { toast } = useToast();
  const [activeGateways, setActiveGateways] = useState({
    paypal: true,
    stripe: true,
    esewa: false,
    imePay: false,
    upi: false
  });

  const handleToggleGateway = (gateway: string) => {
    setActiveGateways(prev => ({
      ...prev,
      [gateway]: !prev[gateway as keyof typeof prev]
    }));
  };

  const handleSaveSettings = () => {
    // Here you would call an API to save the payment gateway settings
    toast({
      title: "Settings Saved",
      description: "Payment gateway settings have been updated.",
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Payment Gateway Configuration</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="paypal">
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
              
              <PaymentGatewayForm 
                gateway={key} 
                fields={config.fields} 
              />
            </TabsContent>
          ))}
        </Tabs>
        
        <div className="mt-6">
          <Button onClick={handleSaveSettings}>
            Save Payment Settings
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default PaymentGatewaySettings;
