
import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { getEnabledPaymentGateways } from "@/services/paymentService";
import { getPaymentIcon, getPaymentDescription } from "@/components/donation/PaymentIcons";

interface PaymentMethodOption {
  id: string;
  name: string;
  icon: React.ReactNode;
  description?: string;
}

interface UseDonationPaymentProps {
  defaultAmount?: number;
  purpose?: string;
}

interface UseDonationPaymentReturn {
  amount: number;
  paymentMethod: string;
  processing: boolean;
  paymentDetails: {
    cardNumber: string;
    expiryDate: string;
    cvv: string;
    name: string;
  };
  availablePaymentMethods: PaymentMethodOption[];
  isDialogOpen: boolean;
  handleDialogOpenChange: (open: boolean) => void;
  handleAmountChange: (value: number) => void;
  setPaymentMethod: (method: string) => void;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleDonation: () => Promise<void>;
}

export const useDonationPayment = ({
  defaultAmount = 10,
  purpose = "general donation"
}: UseDonationPaymentProps = {}): UseDonationPaymentReturn => {
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
  
  const handleDialogOpenChange = (open: boolean) => {
    setIsDialogOpen(open);
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
        description: `Thank you for your ${amount}$ ${purpose}!`,
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
  
  return {
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
  };
};
