
import React from 'react';
import { TabsList, TabsTrigger } from "@/components/ui/tabs";
import { GatewayConfig } from '../GatewayFormConfigs';

interface PaymentGatewayTabListProps {
  gatewayConfigs: Record<string, GatewayConfig>;
}

const PaymentGatewayTabList = ({ gatewayConfigs }: PaymentGatewayTabListProps) => {
  return (
    <TabsList className="mb-4">
      {Object.keys(gatewayConfigs).map((key) => (
        <TabsTrigger key={key} value={key}>
          {gatewayConfigs[key].name}
        </TabsTrigger>
      ))}
    </TabsList>
  );
};

export default PaymentGatewayTabList;
