
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

export type DonationType = 'monetary' | 'blood' | 'clothing' | 'food' | 'books' | 'essentials' | 'other';

interface DonationPaymentProps {
  trigger?: React.ReactNode;
  purpose?: string;
  eventId?: string;
  defaultAmount?: number;
  fixedAmount?: number;
  donationType?: DonationType;
  category?: string;
}

const DonationPayment = ({ 
  trigger, 
  purpose = "general donation", 
  eventId,
  defaultAmount = 10,
  fixedAmount,
  donationType = 'monetary',
  category
}: DonationPaymentProps) => {
  const {
    amount,
    paymentMethod,
    processing,
    currency,
    availableCurrencies,
    paymentDetails,
    availablePaymentMethods,
    isDialogOpen,
    handleDialogOpenChange,
    handleAmountChange,
    setPaymentMethod,
    setCurrency,
    handleChange,
    handleDonation
  } = useDonationPayment({ 
    defaultAmount, 
    purpose, 
    donationType, 
    category 
  });
  
  const showAmountSelector = donationType === 'monetary';
  
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
        <DonationHeader donationType={donationType} category={category} />
        
        <DonationContent 
          amount={amount}
          fixedAmount={fixedAmount}
          purpose={purpose}
          paymentMethod={paymentMethod}
          currency={currency}
          availableCurrencies={availableCurrencies.map(c => c.value)} // Convert to string array
          paymentDetails={{
            ...paymentDetails,
            name: paymentDetails.cardHolder // Map cardHolder to name for compatibility
          }}
          availablePaymentMethods={availablePaymentMethods}
          handleAmountChange={handleAmountChange}
          handleChange={handleChange}
          setPaymentMethod={setPaymentMethod}
          setCurrency={setCurrency}
          showAmountSelector={showAmountSelector}
          donationType={donationType}
        />
        
        <DonationFooter 
          amount={amount}
          fixedAmount={fixedAmount}
          currency={currency}
          processing={processing}
          handleDonation={handleDonation}
          availablePaymentMethodsCount={availablePaymentMethods.length}
          donationType={donationType}
        />
      </DialogContent>
    </Dialog>
  );
};

export default DonationPayment;
