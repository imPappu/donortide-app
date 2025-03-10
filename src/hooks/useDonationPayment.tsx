
import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { getEnabledPaymentGateways, getSupportedCurrencies } from "@/services/paymentService";
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
  currency: string;
  availableCurrencies: string[];
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
  setCurrency: (currency: string) => void;
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
  const [currency, setCurrency] = useState<string>("USD");
  const [availableCurrencies, setAvailableCurrencies] = useState<string[]>(["USD"]);
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
      fetchSupportedCurrencies();
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
      
      setAvailablePaymentMethods(methodOptions);
      
      if (methodOptions.length > 0 && !methodOptions.some(m => m.id === paymentMethod)) {
        setPaymentMethod(methodOptions[0].id);
      }
    } catch (error) {
      console.error("Error fetching payment gateways:", error);
      setAvailablePaymentMethods([]);
    }
  };
  
  const fetchSupportedCurrencies = async () => {
    try {
      const currencies = await getSupportedCurrencies();
      setAvailableCurrencies(currencies);
      
      // Detect user's locale for currency if available
      const userLocale = navigator.language || "en-US";
      const userCurrency = new Intl.NumberFormat(userLocale, { style: 'currency', currency: 'USD' })
        .resolvedOptions().currency;
      
      if (currencies.includes(userCurrency)) {
        setCurrency(userCurrency);
      } else if (currencies.length > 0) {
        setCurrency(currencies[0]);
      }
    } catch (error) {
      console.error("Error fetching supported currencies:", error);
      setAvailableCurrencies(["USD"]);
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
        description: `Thank you for your ${amount} ${currency} ${purpose}!`,
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
  };
};
