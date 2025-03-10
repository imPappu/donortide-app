
import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { DollarSign, Lock } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { getEnabledPaymentGateways } from "@/services/paymentService";
import { getPaymentIcon, getPaymentDescription } from "./donation/PaymentIcons";
import AmountSelector from "./donation/AmountSelector";
import PaymentMethodList from "./donation/PaymentMethodList";
import PaymentContent from "./donation/PaymentContent";

interface DonationPaymentProps {
  trigger?: React.ReactNode;
  purpose?: string;
  eventId?: string;
  defaultAmount?: number;
  fixedAmount?: number;
}

type PaymentMethodOption = {
  id: string;
  name: string;
  icon: React.ReactNode;
  description?: string;
};

const DonationPayment = ({ 
  trigger, 
  purpose = "general donation", 
  eventId,
  defaultAmount = 10,
  fixedAmount
}: DonationPaymentProps) => {
  const { toast } = useToast();
  const [amount, setAmount] = useState<number>(defaultAmount);
  const [paymentMethod, setPaymentMethod] = useState<string>("card");
  const [processing, setProcessing] = useState(false);
  const [paymentDetails, setPaymentDetails] = useState({
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    name: ""
  });
  const [availablePaymentMethods, setAvailablePaymentMethods] = useState<PaymentMethodOption[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  
  useEffect(() => {
    if (isDialogOpen) {
      fetchPaymentGateways();
    }
  }, [isDialogOpen]);
  
  const fetchPaymentGateways = async () => {
    try {
      const enabledGateways = await getEnabledPaymentGateways();
      
      const methodOptions: PaymentMethodOption[] = enabledGateways.map(gateway => ({
        id: gateway.id,
        name: gateway.name,
        icon: getPaymentIcon(gateway.id),
        description: getPaymentDescription(gateway.id)
      }));
      
      if (!methodOptions.some(option => option.id === 'card')) {
        methodOptions.unshift({
          id: 'card',
          name: 'Card',
          icon: getPaymentIcon('card'),
          description: getPaymentDescription('card')
        });
      }
      
      setAvailablePaymentMethods(methodOptions);
      
      if (methodOptions.length > 0 && !methodOptions.some(m => m.id === paymentMethod)) {
        setPaymentMethod(methodOptions[0].id);
      }
    } catch (error) {
      console.error("Error fetching payment gateways:", error);
      setAvailablePaymentMethods([
        { 
          id: 'card', 
          name: 'Card', 
          icon: getPaymentIcon('card'), 
          description: getPaymentDescription('card') 
        },
        { 
          id: 'paypal', 
          name: 'PayPal', 
          icon: getPaymentIcon('paypal'), 
          description: getPaymentDescription('paypal') 
        }
      ]);
    }
  };
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPaymentDetails((prev) => ({ ...prev, [name]: value }));
  };
  
  const handleAmountChange = (value: number) => {
    setAmount(value);
  };
  
  const handleDonation = async () => {
    setProcessing(true);
    
    if (paymentMethod === "card") {
      if (!paymentDetails.cardNumber || !paymentDetails.expiryDate || !paymentDetails.cvv) {
        toast({
          title: "Missing information",
          description: "Please fill in all card details",
          variant: "destructive",
        });
        setProcessing(false);
        return;
      }
    }
    
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      toast({
        title: "Donation successful",
        description: `Thank you for your ${fixedAmount || amount}$ ${purpose}!`,
      });
      
      setPaymentDetails({
        cardNumber: "",
        expiryDate: "",
        cvv: "",
        name: ""
      });
    } catch (error) {
      toast({
        title: "Payment failed",
        description: "There was an error processing your payment.",
        variant: "destructive",
      });
    } finally {
      setProcessing(false);
    }
  };
  
  const handleDialogOpenChange = (open: boolean) => {
    setIsDialogOpen(open);
  };
  
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
        <div className="bg-blue-600 text-white p-5">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-white">Make a Donation</DialogTitle>
            <p className="text-blue-100 mt-2">Your contribution makes a difference</p>
          </DialogHeader>
        </div>
        
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
        
        <DialogFooter className="p-5 bg-gray-50 border-t">
          <div className="w-full">
            <Button 
              onClick={handleDonation} 
              className="w-full bg-blue-600 hover:bg-blue-700"
              disabled={processing || availablePaymentMethods.length === 0}
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
      </DialogContent>
    </Dialog>
  );
};

export default DonationPayment;
