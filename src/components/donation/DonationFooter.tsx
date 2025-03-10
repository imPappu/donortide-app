
import React from "react";
import { DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Lock } from "lucide-react";

interface DonationFooterProps {
  amount: number;
  fixedAmount?: number;
  processing: boolean;
  handleDonation: () => void;
  availablePaymentMethodsCount: number;
}

const DonationFooter = ({
  amount,
  fixedAmount,
  processing,
  handleDonation,
  availablePaymentMethodsCount,
}: DonationFooterProps) => {
  return (
    <DialogFooter className="p-5 bg-gray-50 border-t">
      <div className="w-full">
        <Button 
          onClick={handleDonation} 
          className="w-full bg-blue-600 hover:bg-blue-700"
          disabled={processing || availablePaymentMethodsCount === 0}
        >
          {processing ? (
            <>Processing...</>
          ) : (
            <>
              <Lock className="h-4 w-4 mr-2" />
              Complete ${fixedAmount || amount} Donation
            </>
          )}
        </Button>
        <div className="mt-3 text-center text-xs text-muted-foreground">
          By donating, you agree to our terms and conditions
        </div>
      </div>
    </DialogFooter>
  );
};

export default DonationFooter;
