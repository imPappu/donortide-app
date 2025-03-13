import { useState } from "react";
import { toast } from "./use-toast";
import { DonationType } from "@/components/DonationPayment";

export interface PaymentMethod {
  id: string;
  name: string;
  icon: React.ReactNode;
}

export interface PaymentDetails {
  cardNumber: string;
  cardHolder: string;
  expiryDate: string;
  cvv: string;
}

export interface UseDonationPaymentProps {
  defaultAmount?: number;
  purpose?: string;
  eventId?: string;
  donationType?: DonationType;
  category?: string;
}

export const useDonationPayment = ({ 
  defaultAmount = 10,
  purpose = "general donation",
  donationType = 'monetary',
  category
}: UseDonationPaymentProps) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [amount, setAmount] = useState(defaultAmount);
  const [paymentMethod, setPaymentMethod] = useState<string>("");
  const [processing, setProcessing] = useState(false);
  const [currency, setCurrency] = useState("USD");
  
  const [paymentDetails, setPaymentDetails] = useState<PaymentDetails>({
    cardNumber: "",
    cardHolder: "",
    expiryDate: "",
    cvv: ""
  });

  const availableCurrencies = [
    { label: "US Dollar", value: "USD" },
    { label: "Euro", value: "EUR" },
    { label: "British Pound", value: "GBP" },
    { label: "Canadian Dollar", value: "CAD" },
  ];

  const availablePaymentMethods: PaymentMethod[] = [
    {
      id: "credit-card",
      name: "Credit Card",
      icon: null,
    },
    {
      id: "paypal",
      name: "PayPal",
      icon: null,
    },
    {
      id: "google-pay",
      name: "Google Pay",
      icon: null,
    },
  ];

  const handleDialogOpenChange = (open: boolean) => {
    setIsDialogOpen(open);
  };

  const handleAmountChange = (value: number) => {
    setAmount(value);
  };

  const setCurrencyPreference = (currency: string) => {
    setCurrency(currency);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPaymentDetails(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleDonation = async () => {
    setProcessing(true);
    
    // Simulate donation processing
    await new Promise((resolve) => setTimeout(resolve, 2000));
    
    setProcessing(false);
    setIsDialogOpen(false);

    toast({
      title: "Donation Successful!",
      description: `Thank you for your ${donationType} donation of ${currency} ${amount} for ${purpose}.`,
    });
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
    setCurrency: setCurrencyPreference,
    handleChange,
    handleDonation
  };
};
