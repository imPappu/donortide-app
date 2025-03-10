
import React from 'react';
import { TabsContent } from "@/components/ui/tabs";
import PaymentGatewayToggle from '../PaymentGatewayToggle';
import PaymentGatewayForm from '../PaymentGatewayForm';
import { GatewayConfig } from '../GatewayFormConfigs';

interface PaymentGatewayTabContentProps {
  gatewayKey: string;
  config: GatewayConfig;
  isEnabled: boolean;
  fieldValues: Record<string, string>;
  onToggle: () => void;
  onFieldChange: (fieldId: string, value: string) => void;
}

const PaymentGatewayTabContent = ({
  gatewayKey,
  config,
  isEnabled,
  fieldValues,
  onToggle,
  onFieldChange
}: PaymentGatewayTabContentProps) => {
  return (
    <TabsContent value={gatewayKey} className="space-y-4">
      <PaymentGatewayToggle
        name={config.name}
        description={config.description}
        isEnabled={isEnabled}
        onToggle={onToggle}
      />
      
      {isEnabled && (
        <PaymentGatewayForm
          gateway={gatewayKey}
          fields={config.fields}
          fieldValues={fieldValues}
          onFieldChange={(fieldId, value) => onFieldChange(fieldId, value)}
        />
      )}
    </TabsContent>
  );
};

export default PaymentGatewayTabContent;
