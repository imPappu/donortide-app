
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { useToast } from '@/hooks/use-toast';

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
            <TabsTrigger value="paypal">PayPal</TabsTrigger>
            <TabsTrigger value="stripe">Stripe</TabsTrigger>
            <TabsTrigger value="esewa">eSewa (Nepal)</TabsTrigger>
            <TabsTrigger value="imepay">IME Pay</TabsTrigger>
            <TabsTrigger value="upi">UPI</TabsTrigger>
          </TabsList>
          
          <TabsContent value="paypal" className="space-y-4">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="font-medium">Enable PayPal</h3>
                <p className="text-sm text-muted-foreground">Accept payments via PayPal</p>
              </div>
              <Switch 
                checked={activeGateways.paypal}
                onCheckedChange={() => handleToggleGateway('paypal')}
              />
            </div>
            
            <div className="space-y-3">
              <div className="space-y-2">
                <Label htmlFor="paypal_client_id">Client ID</Label>
                <Input id="paypal_client_id" placeholder="PayPal Client ID" />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="paypal_secret">Client Secret</Label>
                <Input id="paypal_secret" type="password" placeholder="PayPal Secret" />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="paypal_mode">Mode</Label>
                <select id="paypal_mode" className="w-full px-3 py-2 border border-gray-300 rounded-md">
                  <option value="sandbox">Sandbox (Testing)</option>
                  <option value="live">Live (Production)</option>
                </select>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="stripe" className="space-y-4">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="font-medium">Enable Stripe</h3>
                <p className="text-sm text-muted-foreground">Accept payments via Stripe</p>
              </div>
              <Switch 
                checked={activeGateways.stripe}
                onCheckedChange={() => handleToggleGateway('stripe')}
              />
            </div>
            
            <div className="space-y-3">
              <div className="space-y-2">
                <Label htmlFor="stripe_public_key">Public Key</Label>
                <Input id="stripe_public_key" placeholder="Stripe Public Key" />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="stripe_secret_key">Secret Key</Label>
                <Input id="stripe_secret_key" type="password" placeholder="Stripe Secret Key" />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="stripe_webhook_secret">Webhook Secret</Label>
                <Input id="stripe_webhook_secret" type="password" placeholder="Stripe Webhook Secret" />
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="esewa" className="space-y-4">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="font-medium">Enable eSewa</h3>
                <p className="text-sm text-muted-foreground">Accept payments via eSewa (Nepal)</p>
              </div>
              <Switch 
                checked={activeGateways.esewa}
                onCheckedChange={() => handleToggleGateway('esewa')}
              />
            </div>
            
            <div className="space-y-3">
              <div className="space-y-2">
                <Label htmlFor="esewa_merchant_id">Merchant ID</Label>
                <Input id="esewa_merchant_id" placeholder="eSewa Merchant ID" />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="esewa_secret_key">Secret Key</Label>
                <Input id="esewa_secret_key" type="password" placeholder="eSewa Secret Key" />
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="imepay" className="space-y-4">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="font-medium">Enable IME Pay</h3>
                <p className="text-sm text-muted-foreground">Accept payments via IME Pay</p>
              </div>
              <Switch 
                checked={activeGateways.imePay}
                onCheckedChange={() => handleToggleGateway('imePay')}
              />
            </div>
            
            <div className="space-y-3">
              <div className="space-y-2">
                <Label htmlFor="ime_merchant_code">Merchant Code</Label>
                <Input id="ime_merchant_code" placeholder="IME Pay Merchant Code" />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="ime_module_id">Module ID</Label>
                <Input id="ime_module_id" placeholder="IME Pay Module ID" />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="ime_secret">Secret Key</Label>
                <Input id="ime_secret" type="password" placeholder="IME Pay Secret Key" />
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="upi" className="space-y-4">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="font-medium">Enable UPI</h3>
                <p className="text-sm text-muted-foreground">Accept payments via UPI</p>
              </div>
              <Switch 
                checked={activeGateways.upi}
                onCheckedChange={() => handleToggleGateway('upi')}
              />
            </div>
            
            <div className="space-y-3">
              <div className="space-y-2">
                <Label htmlFor="upi_id">UPI ID</Label>
                <Input id="upi_id" placeholder="your-upi-id@provider" />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="upi_merchant_name">Merchant Name</Label>
                <Input id="upi_merchant_name" placeholder="Your Business Name" />
              </div>
            </div>
          </TabsContent>
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
