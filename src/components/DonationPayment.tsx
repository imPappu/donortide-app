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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  DollarSign, 
  CreditCard, 
  Landmark, 
  Smartphone, 
  Check, 
  Lock,
  PaypalIcon,
  Wallet,
  Info
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { getEnabledPaymentGateways, PaymentGatewaySetting } from "@/services/paymentService";

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

const PaypalIcon = () => (
  <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M6.5 20H3.5L5 8H8C11.5 8 12.5 10.5 11 12C9.5 13.5 7 13 7 13L6.5 20Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M13.5 20H10.5L12 8H15C18.5 8 19.5 10.5 18 12C16.5 13.5 14 13 14 13L13.5 20Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const IMEPayIcon = () => (
  <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M7 12H7.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M11 12H11.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <rect x="3" y="6" width="18" height="12" rx="2" stroke="currentColor" strokeWidth="2"/>
  </svg>
);

const EsewaIcon = () => (
  <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 12V21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M12 12V3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M17 7L12 12L7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const UPIIcon = () => (
  <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M4 15L9 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M7 18L7 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M15 11L15 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M13 14L17 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <rect x="2" y="6" width="20" height="16" rx="2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

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
      
      const methodOptions: PaymentMethodOption[] = enabledGateways.map(gateway => {
        let icon;
        let description = '';
        
        switch(gateway.id) {
          case 'card':
            icon = <CreditCard />;
            description = 'Pay securely with your credit or debit card';
            break;
          case 'paypal':
            icon = <PaypalIcon />;
            description = 'Safe, easy online payments';
            break;
          case 'bank':
            icon = <Landmark />;
            description = 'Direct bank transfer';
            break;
          case 'mobile':
            icon = <Smartphone />;
            description = 'Pay using mobile payment options';
            break;
          case 'esewa':
            icon = <EsewaIcon />;
            description = 'Pay with eSewa wallet';
            break;
          case 'imepay':
            icon = <IMEPayIcon />;
            description = 'Pay with IME Pay';
            break;
          case 'upi':
            icon = <UPIIcon />;
            description = 'Unified Payments Interface';
            break;
          default:
            icon = <Wallet />;
            description = 'Alternative payment method';
        }
        
        return {
          id: gateway.id,
          name: gateway.name,
          icon,
          description
        };
      });
      
      if (!methodOptions.some(option => option.id === 'card')) {
        methodOptions.unshift({
          id: 'card',
          name: 'Card',
          icon: <CreditCard />,
          description: 'Pay securely with your credit or debit card'
        });
      }
      
      setAvailablePaymentMethods(methodOptions);
      
      if (methodOptions.length > 0 && !methodOptions.some(m => m.id === paymentMethod)) {
        setPaymentMethod(methodOptions[0].id);
      }
    } catch (error) {
      console.error("Error fetching payment gateways:", error);
      setAvailablePaymentMethods([
        { id: 'card', name: 'Card', icon: <CreditCard />, description: 'Pay securely with your credit or debit card' },
        { id: 'paypal', name: 'PayPal', icon: <PaypalIcon />, description: 'Safe, easy online payments' }
      ]);
    }
  };
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPaymentDetails((prev) => ({ ...prev, [name]: value }));
  };
  
  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value);
    setAmount(isNaN(value) ? 0 : value);
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
          {!fixedAmount && (
            <div className="space-y-3 mb-4">
              <Label htmlFor="amount" className="text-sm font-medium">Donation Amount ($)</Label>
              <div className="relative">
                <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="amount"
                  type="number"
                  min="1"
                  step="1"
                  value={amount}
                  onChange={handleAmountChange}
                  className="pl-10"
                />
              </div>
              <div className="grid grid-cols-4 gap-2 mt-2">
                {[5, 10, 25, 50].map((value) => (
                  <Button
                    key={value}
                    type="button"
                    variant={amount === value ? "default" : "outline"}
                    onClick={() => setAmount(value)}
                    className={amount === value ? "bg-blue-600 hover:bg-blue-700" : ""}
                  >
                    ${value}
                  </Button>
                ))}
              </div>
            </div>
          )}
          
          {fixedAmount && (
            <div className="space-y-2 mb-4">
              <Label className="text-sm font-medium">Amount</Label>
              <div className="flex items-center bg-blue-50 p-3 rounded-lg">
                <DollarSign className="h-6 w-6 text-blue-600 mr-2" />
                <div>
                  <span className="text-2xl font-bold text-blue-700">${fixedAmount}</span>
                  <p className="text-sm text-blue-600 mt-1">
                    Fixed amount for {purpose}
                  </p>
                </div>
              </div>
            </div>
          )}
          
          <div className="space-y-3 mb-4">
            <Label className="text-sm font-medium">Select a payment method</Label>
            <div className="space-y-2">
              {availablePaymentMethods.map((method) => (
                <div 
                  key={method.id}
                  className={`flex items-center p-3 rounded-lg border cursor-pointer transition-all ${
                    paymentMethod === method.id 
                      ? "border-blue-600 bg-blue-50" 
                      : "border-gray-200 hover:border-blue-300"
                  }`}
                  onClick={() => setPaymentMethod(method.id)}
                >
                  <div className={`p-2 rounded-full mr-3 ${
                    paymentMethod === method.id ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-600"
                  }`}>
                    {method.icon}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium">{method.name}</h3>
                    <p className="text-xs text-muted-foreground">{method.description}</p>
                  </div>
                  {paymentMethod === method.id && (
                    <Check className="h-5 w-5 text-blue-600" />
                  )}
                </div>
              ))}
              
              {availablePaymentMethods.length === 0 && (
                <div className="p-4 text-center text-muted-foreground">
                  No payment methods available. Please configure payment gateways in admin settings.
                </div>
              )}
            </div>
          </div>
          
          <Tabs value={paymentMethod} className="w-full mt-4">
            <TabsContent value="card" className="space-y-4 mt-2">
              <div className="space-y-2">
                <Label htmlFor="name">Cardholder Name</Label>
                <Input
                  id="name"
                  name="name"
                  value={paymentDetails.name}
                  onChange={handleChange}
                  placeholder="John Doe"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="cardNumber">Card Number</Label>
                <div className="relative">
                  <Input
                    id="cardNumber"
                    name="cardNumber"
                    value={paymentDetails.cardNumber}
                    onChange={handleChange}
                    placeholder="4111 1111 1111 1111"
                    className="pl-10"
                  />
                  <CreditCard className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="expiryDate">Expiry Date</Label>
                  <Input
                    id="expiryDate"
                    name="expiryDate"
                    value={paymentDetails.expiryDate}
                    onChange={handleChange}
                    placeholder="MM/YY"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="cvv">CVV</Label>
                  <div className="relative">
                    <Input
                      id="cvv"
                      name="cvv"
                      value={paymentDetails.cvv}
                      onChange={handleChange}
                      placeholder="123"
                    />
                    <Info className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  </div>
                </div>
              </div>
              <div className="flex items-center text-xs text-muted-foreground mt-3">
                <Lock className="h-3 w-3 mr-1" />
                <span>Secure payment processed over SSL</span>
              </div>
            </TabsContent>
            
            <TabsContent value="bank" className="space-y-4 mt-2">
              <div className="space-y-2">
                <Label>Bank Transfer Information</Label>
                <div className="rounded-md bg-blue-50 p-4">
                  <p className="text-sm text-blue-700 font-medium mb-2">
                    Please transfer the amount to:
                  </p>
                  <p className="text-sm">
                    Account Name: <span className="font-medium">DonorTide Foundation</span><br />
                    Account Number: <span className="font-medium">12345678</span><br />
                    Routing Number: <span className="font-medium">087654321</span><br />
                    Bank: <span className="font-medium">Global Trust Bank</span>
                  </p>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="paypal" className="space-y-4 mt-2">
              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <PaypalIcon />
                <p className="mt-2 text-sm">
                  You will be redirected to PayPal to complete your donation securely.
                </p>
                <div className="mt-3">
                  <Button variant="outline" className="bg-[#0070ba] text-white hover:bg-[#005ea6] border-0">
                    Continue to PayPal
                  </Button>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="mobile" className="space-y-4 mt-2">
              <div className="space-y-2">
                <Label>Mobile Payment Options</Label>
                <div className="grid grid-cols-2 gap-3">
                  {["IME Pay", "eSewa", "UPI", "Others"].map((method) => (
                    <Button key={method} variant="outline" className="justify-start h-auto py-3">
                      <div className="flex flex-col items-center w-full">
                        {method === "IME Pay" && <IMEPayIcon />}
                        {method === "eSewa" && <EsewaIcon />}
                        {method === "UPI" && <UPIIcon />}
                        {method === "Others" && <Wallet className="h-5 w-5" />}
                        <span className="mt-2 text-xs">{method}</span>
                      </div>
                    </Button>
                  ))}
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="esewa" className="space-y-4 mt-2">
              <div className="text-center p-4 bg-green-50 rounded-lg">
                <EsewaIcon />
                <p className="mt-2 text-sm">
                  You will be redirected to eSewa to complete your payment.
                </p>
                <div className="mt-3">
                  <Button variant="outline" className="bg-green-600 text-white hover:bg-green-700 border-0">
                    Pay with eSewa
                  </Button>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="imepay" className="space-y-4 mt-2">
              <div className="text-center p-4 bg-purple-50 rounded-lg">
                <IMEPayIcon />
                <p className="mt-2 text-sm">
                  You will be redirected to IME Pay to complete your payment.
                </p>
                <div className="mt-3">
                  <Button variant="outline" className="bg-purple-600 text-white hover:bg-purple-700 border-0">
                    Pay with IME Pay
                  </Button>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="upi" className="space-y-4 mt-2">
              <div className="space-y-2">
                <Label>UPI Payment</Label>
                <div className="rounded-md bg-gray-50 p-4 text-center">
                  <UPIIcon />
                  <p className="text-sm mt-2">
                    Scan the QR code or enter UPI ID: <span className="font-medium">donate@donortide</span>
                  </p>
                  <div className="mt-3 bg-white p-4 inline-block rounded-md">
                    <svg className="h-32 w-32 mx-auto" viewBox="0 0 100 100" fill="none">
                      <rect x="10" y="10" width="80" height="80" fill="black" />
                      <rect x="20" y="20" width="60" height="60" fill="white" />
                      <rect x="30" y="30" width="10" height="10" fill="black" />
                      <rect x="50" y="30" width="10" height="10" fill="black" />
                      <rect x="30" y="50" width="10" height="10" fill="black" />
                      <rect x="40" y="40" width="10" height="10" fill="black" />
                      <rect x="60" y="40" width="10" height="10" fill="black" />
                      <rect x="60" y="60" width="10" height="10" fill="black" />
                    </svg>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
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
