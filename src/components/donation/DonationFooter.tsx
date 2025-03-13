
import React from "react";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { DonationType } from "../DonationPayment";

export interface DonationFooterProps {
  amount: number;
  fixedAmount?: number;
  currency: string;
  processing: boolean;
  handleDonation: () => Promise<void>;
  availablePaymentMethodsCount: number;
  donationType: DonationType;
}

const DonationFooter = ({
  amount,
  fixedAmount,
  currency,
  processing,
  handleDonation,
  availablePaymentMethodsCount,
  donationType
}: DonationFooterProps) => {
  const getDonationButtonText = () => {
    if (donationType === 'monetary') {
      return `Donate ${currency} ${fixedAmount || amount}`;
    }
    
    return 'Continue to Donation';
  };

  return (
    <div className="p-4 bg-gray-50 dark:bg-gray-800 border-t">
      {availablePaymentMethodsCount > 0 ? (
        <Button 
          className="w-full py-6" 
          onClick={handleDonation}
          disabled={processing}
        >
          {processing ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Processing...
            </>
          ) : getDonationButtonText()}
        </Button>
      ) : (
        <p className="text-center text-sm text-muted-foreground">
          Please select a payment method to continue
        </p>
      )}
    </div>
  );
};

export default DonationFooter;
