
import React from "react";
import { CreditCard, Landmark, Smartphone, Wallet } from "lucide-react";

export const PaypalIcon = () => (
  <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M6.5 20H3.5L5 8H8C11.5 8 12.5 10.5 11 12C9.5 13.5 7 13 7 13L6.5 20Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M13.5 20H10.5L12 8H15C18.5 8 19.5 10.5 18 12C16.5 13.5 14 13 14 13L13.5 20Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

export const IMEPayIcon = () => (
  <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M7 12H7.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M11 12H11.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <rect x="3" y="6" width="18" height="12" rx="2" stroke="currentColor" strokeWidth="2"/>
  </svg>
);

export const EsewaIcon = () => (
  <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 12V21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M12 12V3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M17 7L12 12L7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

export const UPIIcon = () => (
  <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M4 15L9 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M7 18L7 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M15 11L15 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M13 14L17 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <rect x="2" y="6" width="20" height="16" rx="2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

export const getPaymentIcon = (gatewayId: string) => {
  switch(gatewayId) {
    case 'card':
      return <CreditCard />;
    case 'paypal':
      return <PaypalIcon />;
    case 'bank':
      return <Landmark />;
    case 'mobile':
      return <Smartphone />;
    case 'esewa':
      return <EsewaIcon />;
    case 'imepay':
      return <IMEPayIcon />;
    case 'upi':
      return <UPIIcon />;
    default:
      return <Wallet />;
  }
};

export const getPaymentDescription = (gatewayId: string): string => {
  switch(gatewayId) {
    case 'card':
      return 'Pay securely with your credit or debit card';
    case 'paypal':
      return 'Safe, easy online payments';
    case 'bank':
      return 'Direct bank transfer';
    case 'mobile':
      return 'Pay using mobile payment options';
    case 'esewa':
      return 'Pay with eSewa wallet';
    case 'imepay':
      return 'Pay with IME Pay';
    case 'upi':
      return 'Unified Payments Interface';
    default:
      return 'Alternative payment method';
  }
};
