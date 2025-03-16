
import React from "react";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CreditCard, Receipt, Coins } from "lucide-react";
import PaymentMethodList from "../PaymentMethodList";

interface PaymentMethodSectionProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  paymentMethod: string;
  setPaymentMethod: (method: string) => void;
  availablePaymentMethods: {
    id: string;
    name: string;
    icon: React.ReactNode;
    description?: string;
  }[];
}

const PaymentMethodSection = ({
  activeTab,
  setActiveTab,
  paymentMethod,
  setPaymentMethod,
  availablePaymentMethods
}: PaymentMethodSectionProps) => {
  return (
    <div className="space-y-4">
      <Label>Payment Method</Label>
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="credit-card">
            <CreditCard className="h-4 w-4 mr-2" />
            <span className="hidden sm:inline">Card</span>
          </TabsTrigger>
          <TabsTrigger value="bank-transfer">
            <Receipt className="h-4 w-4 mr-2" />
            <span className="hidden sm:inline">Bank</span>
          </TabsTrigger>
          <TabsTrigger value="other">
            <Coins className="h-4 w-4 mr-2" />
            <span className="hidden sm:inline">Other</span>
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="credit-card">
          <PaymentMethodList
            availablePaymentMethods={availablePaymentMethods.filter(m => ['credit-card', 'paypal', 'apple-pay', 'google-pay'].includes(m.id))}
            paymentMethod={paymentMethod}
            onPaymentMethodChange={setPaymentMethod}
          />
        </TabsContent>
        
        <TabsContent value="bank-transfer">
          <PaymentMethodList
            availablePaymentMethods={availablePaymentMethods.filter(m => ['bank-transfer', 'wire-transfer'].includes(m.id))}
            paymentMethod={paymentMethod}
            onPaymentMethodChange={setPaymentMethod}
          />
        </TabsContent>
        
        <TabsContent value="other">
          <PaymentMethodList
            availablePaymentMethods={availablePaymentMethods.filter(m => ['crypto', 'mobile-payment'].includes(m.id))}
            paymentMethod={paymentMethod}
            onPaymentMethodChange={setPaymentMethod}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default PaymentMethodSection;
