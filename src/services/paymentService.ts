
import { gatewayConfigs } from "@/components/admin/GatewayFormConfigs";

export type PaymentGatewaySetting = {
  id: string;
  name: string;
  isEnabled: boolean;
  icon: React.ReactNode;
};

// This simulates retrieving settings from a backend
// In a real app, this would fetch from your API
export const getEnabledPaymentGateways = async (): Promise<PaymentGatewaySetting[]> => {
  // Try to get settings from localStorage (saved in PaymentGatewaySettings component)
  const savedSettings = localStorage.getItem('paymentGatewaySettings');
  
  if (savedSettings) {
    try {
      const parsedSettings = JSON.parse(savedSettings);
      
      // Map to our return type
      return Object.keys(parsedSettings)
        .filter(key => parsedSettings[key].isEnabled)
        .map(key => ({
          id: key,
          name: gatewayConfigs[key]?.name || key.charAt(0).toUpperCase() + key.slice(1),
          isEnabled: true,
          icon: null, // Icons will be assigned in the component
        }));
    } catch (error) {
      console.error("Error parsing payment gateway settings:", error);
    }
  }
  
  // Default fallback - only enable PayPal and card by default
  return [
    { id: 'card', name: 'Card', isEnabled: true, icon: null },
    { id: 'paypal', name: 'PayPal', isEnabled: true, icon: null }
  ];
};
