
// Payment service for handling payment operations
import { API_BASE_URL } from './apiConfig';
import { Payment } from '@/types/apiTypes';

export const processPayment = async (payment: Payment): Promise<Payment | null> => {
  try {
    const response = await fetch(`${API_BASE_URL}/payments`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payment),
    });
    
    if (!response.ok) throw new Error('Failed to process payment');
    return await response.json();
  } catch (error) {
    console.error('Error processing payment:', error);
    return null;
  }
};

export const getPayments = async (): Promise<Payment[]> => {
  try {
    const response = await fetch(`${API_BASE_URL}/payments`);
    if (!response.ok) throw new Error('Failed to fetch payments');
    return await response.json();
  } catch (error) {
    console.error('Error fetching payments:', error);
    return [];
  }
};

interface PaymentGateway {
  id: string;
  name: string;
  isEnabled: boolean;
}

export const getEnabledPaymentGateways = async (): Promise<PaymentGateway[]> => {
  try {
    // In a real app, this would fetch from the server
    // For now, return data from localStorage if available
    const savedSettings = localStorage.getItem('paymentGatewaySettings');
    if (savedSettings) {
      const parsedSettings = JSON.parse(savedSettings);
      return Object.keys(parsedSettings)
        .filter(key => parsedSettings[key].isEnabled)
        .map(key => ({
          id: key,
          name: getReadableGatewayName(key),
          isEnabled: true
        }));
    }
    
    // Default enabled gateways
    return [
      { id: 'card', name: 'Card', isEnabled: true },
      { id: 'bank', name: 'Bank Transfer', isEnabled: true },
      { id: 'paypal', name: 'PayPal', isEnabled: true }
    ];
  } catch (error) {
    console.error('Error fetching enabled payment gateways:', error);
    return [
      { id: 'card', name: 'Card', isEnabled: true },
    ];
  }
};

export const getSupportedCurrencies = async (): Promise<string[]> => {
  try {
    // In a real app, this would fetch from the server
    // For now, return data from localStorage if available
    const savedSettings = localStorage.getItem('paymentGatewaySettings');
    if (savedSettings) {
      const parsedSettings = JSON.parse(savedSettings);
      
      // Collect all currencies from enabled gateways
      const allCurrencies = new Set<string>();
      
      Object.keys(parsedSettings)
        .filter(key => parsedSettings[key].isEnabled)
        .forEach(key => {
          const currencyField = `${key}_supported_currencies`;
          const currenciesStr = parsedSettings[key].fields?.[currencyField] || '';
          if (currenciesStr) {
            currenciesStr.split(',').forEach((curr: string) => allCurrencies.add(curr.trim()));
          } else {
            // Add default USD if no currencies specified
            allCurrencies.add('USD');
          }
        });
      
      return Array.from(allCurrencies);
    }
    
    // Default supported currencies
    return ['USD', 'EUR', 'GBP', 'CAD', 'AUD', 'INR', 'JPY'];
  } catch (error) {
    console.error('Error fetching supported currencies:', error);
    return ['USD'];
  }
};

// Helper function to get readable gateway names
function getReadableGatewayName(gatewayId: string): string {
  const nameMap: Record<string, string> = {
    card: 'Card',
    bank: 'Bank Transfer',
    paypal: 'PayPal',
    stripe: 'Stripe',
    esewa: 'eSewa',
    imepay: 'IME Pay',
    upi: 'UPI'
  };
  
  return nameMap[gatewayId] || gatewayId;
}
