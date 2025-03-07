
import React from 'react';
import { Switch } from "@/components/ui/switch";

interface PaymentGatewayToggleProps {
  name: string;
  description: string;
  isEnabled: boolean;
  onToggle: () => void;
}

const PaymentGatewayToggle = ({
  name,
  description,
  isEnabled,
  onToggle,
}: PaymentGatewayToggleProps) => {
  return (
    <div className="flex items-center justify-between mb-4">
      <div>
        <h3 className="font-medium">Enable {name}</h3>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
      <Switch 
        checked={isEnabled}
        onCheckedChange={onToggle}
      />
    </div>
  );
};

export default PaymentGatewayToggle;
