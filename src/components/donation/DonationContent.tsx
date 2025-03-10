
import React from "react";
import AmountSelector from "./AmountSelector";
import PaymentMethodList from "./PaymentMethodList";
import PaymentContent from "./PaymentContent";

interface DonationContentProps {
  amount: number;
  fixedAmount?: number;
  purpose: string;
  paymentMethod: string;
  paymentDetails: {
    cardNumber: string;
    expiryDate: string;
    cvv: string;
    name: string;
  };
  availablePaymentMethods: Array<{
    id: string;
    name: string;
    icon: React.ReactNode;
    description?: string;
  }>;
  handleAmountChange: (value: number) => void;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  setPaymentMethod: (method: string) => void;
}

const DonationContent = ({
  amount,
  fixedAmount,
  purpose,
  paymentMethod,
  paymentDetails,
  availablePaymentMethods,
  handleAmountChange,
  handleChange,
  setPaymentMethod,
}: DonationContentProps) => {
  return (
    <div className="px-5 py-4">
      <AmountSelector 
        amount={amount} 
        fixedAmount={fixedAmount} 
        purpose={purpose} 
        onAmountChange={handleAmountChange} 
      />
      
      <PaymentMethodList 
        availablePaymentMethods={availablePaymentMethods}
        paymentMethod={paymentMethod}
        onPaymentMethodChange={setPaymentMethod}
      />
      
      <PaymentContent 
        paymentMethod={paymentMethod}
        paymentDetails={paymentDetails}
        handleChange={handleChange}
      />
    </div>
  );
};

export default DonationContent;
