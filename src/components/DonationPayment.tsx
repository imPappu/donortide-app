
import React from "react";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { DollarSign } from "lucide-react";
import { useDonationPayment } from "@/hooks/useDonationPayment";
import DonationHeader from "./donation/DonationHeader";
import DonationContent from "./donation/DonationContent";
import DonationFooter from "./donation/DonationFooter";

interface DonationPaymentProps {
  trigger?: React.ReactNode;
  purpose?: string;
  eventId?: string;
  defaultAmount?: number;
  fixedAmount?: number;
}

const DonationPayment = ({ 
  trigger, 
  purpose = "general donation", 
  eventId,
  defaultAmount = 10,
  fixedAmount
}: DonationPaymentProps) => {
  const {
    amount,
    paymentMethod,
    processing,
    paymentDetails,
    availablePaymentMethods,
    isDialogOpen,
    handleDialogOpenChange,
    handleAmountChange,
    setPaymentMethod,
    handleChange,
    handleDonation
  } = useDonationPayment({ defaultAmount, purpose });
  
  return (
    <Dialog onOpenChange={handleDialogOpenChange}>
      <DialogTrigger asChild>
        {trigger || (
          <Button>
            <DollarSign className="h-4 w-4 mr-2" />
            Donate Now
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] p-0 overflow-hidden rounded-xl">
        <DonationHeader />
        
        <DonationContent 
          amount={amount}
          fixedAmount={fixedAmount}
          purpose={purpose}
          paymentMethod={paymentMethod}
          paymentDetails={paymentDetails}
          availablePaymentMethods={availablePaymentMethods}
          handleAmountChange={handleAmountChange}
          handleChange={handleChange}
          setPaymentMethod={setPaymentMethod}
        />
        
        <DonationFooter 
          amount={amount}
          fixedAmount={fixedAmount}
          processing={processing}
          handleDonation={handleDonation}
          availablePaymentMethodsCount={availablePaymentMethods.length}
        />
      </DialogContent>
    </Dialog>
  );
};

export default DonationPayment;
