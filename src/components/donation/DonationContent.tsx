
import React from "react";
import AmountSelector from "./AmountSelector";
import PaymentMethodList from "./PaymentMethodList";
import PaymentContent from "./PaymentContent";
import CurrencySelector from "./CurrencySelector";
import { Card, CardContent } from "@/components/ui/card";

interface DonationContentProps {
  amount: number;
  fixedAmount?: number;
  purpose: string;
  paymentMethod: string;
  currency: string;
  availableCurrencies: string[];
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
  setCurrency: (currency: string) => void;
}

const DonationContent = ({
  amount,
  fixedAmount,
  purpose,
  paymentMethod,
  currency,
  availableCurrencies,
  paymentDetails,
  availablePaymentMethods,
  handleAmountChange,
  handleChange,
  setPaymentMethod,
  setCurrency,
}: DonationContentProps) => {
  return (
    <Card className="border-none shadow-sm">
      <CardContent className="p-0">
        <div className="px-5 py-4">
          <div className="flex items-center gap-2 mb-4">
            <CurrencySelector 
              currency={currency} 
              availableCurrencies={availableCurrencies} 
              onCurrencyChange={setCurrency} 
            />
            
            <div className="flex-1">
              <AmountSelector 
                amount={amount} 
                fixedAmount={fixedAmount} 
                purpose={purpose} 
                onAmountChange={handleAmountChange}
                currency={currency} 
              />
            </div>
          </div>
          
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
      </CardContent>
    </Card>
  );
};

export default DonationContent;
