
import React from "react";
import { Label } from "@/components/ui/label";
import PaymentMethodItem from "./PaymentMethodItem";

type PaymentMethodOption = {
  id: string;
  name: string;
  icon: React.ReactNode;
  description?: string;
};

type PaymentMethodListProps = {
  availablePaymentMethods: PaymentMethodOption[];
  paymentMethod: string;
  onPaymentMethodChange: (method: string) => void;
};

const PaymentMethodList = ({
  availablePaymentMethods,
  paymentMethod,
  onPaymentMethodChange,
}: PaymentMethodListProps) => {
  return (
    <div className="space-y-3 mb-4">
      <Label className="text-sm font-medium">Select a payment method</Label>
      <div className="space-y-2">
        {availablePaymentMethods.map((method) => (
          <PaymentMethodItem
            key={method.id}
            id={method.id}
            name={method.name}
            icon={method.icon}
            description={method.description}
            selected={paymentMethod === method.id}
            onSelect={onPaymentMethodChange}
          />
        ))}

        {availablePaymentMethods.length === 0 && (
          <div className="p-4 text-center text-muted-foreground">
            No payment methods available. Please configure payment gateways in admin settings.
          </div>
        )}
      </div>
    </div>
  );
};

export default PaymentMethodList;
