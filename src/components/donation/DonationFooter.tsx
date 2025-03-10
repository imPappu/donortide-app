
import React from "react";
import { Button } from "@/components/ui/button";
import { Loader2, CreditCard } from "lucide-react";

interface DonationFooterProps {
  amount: number;
  fixedAmount?: number;
  currency: string;
  processing: boolean;
  handleDonation: () => Promise<void>;
  availablePaymentMethodsCount: number;
}

const DonationFooter = ({
  amount,
  fixedAmount,
  currency,
  processing,
  handleDonation,
  availablePaymentMethodsCount,
}: DonationFooterProps) => {
  const finalAmount = fixedAmount || amount;
  
  const getCurrencySymbol = (currency: string): string => {
    try {
      return (0).toLocaleString('en-US', { style: 'currency', currency, minimumFractionDigits: 0, maximumFractionDigits: 0 }).replace(/\d/g, '').trim();
    } catch (e) {
      return currency;
    }
  };

  return (
    <div className="p-5 bg-gray-50 border-t flex items-center justify-between">
      <div>
        <p className="text-sm text-muted-foreground">Total Amount</p>
        <p className="text-xl font-bold">
          {getCurrencySymbol(currency)} {finalAmount}
        </p>
      </div>
      <Button
        disabled={
          processing || 
          finalAmount <= 0 || 
          availablePaymentMethodsCount === 0
        }
        onClick={handleDonation}
      >
        {processing ? (
          <>
            <Loader2 className="h-4 w-4 mr-2 animate-spin" />
            Processing...
          </>
        ) : (
          <>
            <CreditCard className="h-4 w-4 mr-2" />
            Donate Now
          </>
        )}
      </Button>
    </div>
  );
};

export default DonationFooter;
