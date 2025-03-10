
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

export const getEnabledPaymentGateways = async (): Promise<string[]> => {
  try {
    // In a real app, this would fetch from the server
    // For now, return dummy data from localStorage if available
    const savedSettings = localStorage.getItem('paymentGatewaySettings');
    if (savedSettings) {
      const parsedSettings = JSON.parse(savedSettings);
      return Object.keys(parsedSettings).filter(key => parsedSettings[key].isEnabled);
    }
    return ['card', 'bank', 'paypal']; // Default enabled gateways
  } catch (error) {
    console.error('Error fetching enabled payment gateways:', error);
    return ['card', 'bank']; // Fallback to basic payment methods
  }
};
