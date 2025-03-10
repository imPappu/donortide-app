
import React, { useState } from "react";
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
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { 
  DollarSign, 
  CreditCard, Landmark, 
  Smartphone, Check, 
} from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

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
  const [amount, setAmount] = useState<number>(defaultAmount);
  const [paymentMethod, setPaymentMethod] = useState<string>("card");
  const [processing, setProcessing] = useState(false);
  const [paymentDetails, setPaymentDetails] = useState({
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    name: ""
  });
  
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
    
    // Validate payment details based on payment method
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
    
    // Simulate payment processing
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      toast({
        title: "Donation successful",
        description: `Thank you for your ${fixedAmount || amount}$ ${purpose}!`,
      });
      
      // Reset form
      setPaymentDetails({
        cardNumber: "",
        expiryDate: "",
        cvv: "",
        name: ""
      });
      
      // In a real app, you would redirect to a success page or update the UI
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
  
  return (
    <Dialog>
      <DialogTrigger asChild>
        {trigger || (
          <Button>
            <DollarSign className="h-4 w-4 mr-2" />
            Donate Now
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Make a Donation</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4 py-4">
          {!fixedAmount && (
            <div className="space-y-2">
              <Label htmlFor="amount">Donation Amount ($)</Label>
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
                  >
                    ${value}
                  </Button>
                ))}
              </div>
            </div>
          )}
          
          {fixedAmount && (
            <div className="space-y-2">
              <Label>Amount</Label>
              <div className="text-2xl font-bold">${fixedAmount}</div>
              <p className="text-sm text-muted-foreground">
                Fixed amount for {purpose}
              </p>
            </div>
          )}
          
          <div className="space-y-2">
            <Label>Payment Method</Label>
            <RadioGroup
              value={paymentMethod}
              onValueChange={setPaymentMethod}
              className="grid grid-cols-2 gap-2"
            >
              <div>
                <RadioGroupItem
                  value="card"
                  id="card"
                  className="peer sr-only"
                />
                <Label
                  htmlFor="card"
                  className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-transparent p-4 hover:bg-muted hover:text-muted-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                >
                  <CreditCard className="mb-2 h-5 w-5" />
                  Card
                </Label>
              </div>
              
              <div>
                <RadioGroupItem
                  value="bank"
                  id="bank"
                  className="peer sr-only"
                />
                <Label
                  htmlFor="bank"
                  className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-transparent p-4 hover:bg-muted hover:text-muted-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                >
                  <Landmark className="mb-2 h-5 w-5" />
                  Bank
                </Label>
              </div>
              
              <div>
                <RadioGroupItem
                  value="paypal"
                  id="paypal"
                  className="peer sr-only"
                />
                <Label
                  htmlFor="paypal"
                  className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-transparent p-4 hover:bg-muted hover:text-muted-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                >
                  <svg className="mb-2 h-5 w-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M6.5 20H3.5L5 8H8C11.5 8 12.5 10.5 11 12C9.5 13.5 7 13 7 13L6.5 20Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M13.5 20H10.5L12 8H15C18.5 8 19.5 10.5 18 12C16.5 13.5 14 13 14 13L13.5 20Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  PayPal
                </Label>
              </div>
              
              <div>
                <RadioGroupItem
                  value="mobile"
                  id="mobile"
                  className="peer sr-only"
                />
                <Label
                  htmlFor="mobile"
                  className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-transparent p-4 hover:bg-muted hover:text-muted-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                >
                  <Smartphone className="mb-2 h-5 w-5" />
                  Mobile
                </Label>
              </div>
            </RadioGroup>
          </div>
          
          <Tabs value={paymentMethod} className="w-full">
            <TabsContent value="card" className="space-y-4">
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
                <Input
                  id="cardNumber"
                  name="cardNumber"
                  value={paymentDetails.cardNumber}
                  onChange={handleChange}
                  placeholder="4111 1111 1111 1111"
                />
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
                  <Input
                    id="cvv"
                    name="cvv"
                    value={paymentDetails.cvv}
                    onChange={handleChange}
                    placeholder="123"
                  />
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="bank" className="space-y-4">
              <div className="space-y-2">
                <Label>Bank Transfer Information</Label>
                <div className="rounded-md bg-muted p-3">
                  <p className="text-sm">
                    Please transfer the amount to:
                  </p>
                  <p className="text-sm font-medium mt-2">
                    Account Name: DonorTide Foundation<br />
                    Account Number: 12345678<br />
                    Routing Number: 087654321<br />
                    Bank: Global Trust Bank
                  </p>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="paypal" className="space-y-4">
              <div className="space-y-2">
                <Label>PayPal</Label>
                <p className="text-sm">
                  You will be redirected to PayPal to complete your donation.
                </p>
              </div>
            </TabsContent>
            
            <TabsContent value="mobile" className="space-y-4">
              <div className="space-y-2">
                <Label>Mobile Payment Options</Label>
                <div className="grid grid-cols-2 gap-2">
                  <Button variant="outline" className="justify-start">
                    <svg className="h-4 w-4 mr-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M19 7H5C3.89543 7 3 7.89543 3 9V15C3 16.1046 3.89543 17 5 17H19C20.1046 17 21 16.1046 21 15V9C21 7.89543 20.1046 7 19 7Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M7 12H7.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M11 12H11.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    IME Pay
                  </Button>
                  <Button variant="outline" className="justify-start">
                    <svg className="h-4 w-4 mr-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M17 7L12 12L7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M12 12V21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M12 12V3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    eSewa
                  </Button>
                  <Button variant="outline" className="justify-start">
                    <svg className="h-4 w-4 mr-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M4 15L9 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M7 18L7 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M15 11L15 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M13 14L17 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <rect x="2" y="6" width="20" height="16" rx="2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    UPI
                  </Button>
                  <Button variant="outline" className="justify-start">
                    <svg className="h-4 w-4 mr-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 4L10.2658 7.50886C10.0995 7.84413 9.87933 8.14433 9.61035 8.3976C9.34138 8.65087 9.03012 8.85231 8.69382 8.99196C8.35751 9.13161 7.99916 9.20662 7.63694 9.21283C7.27472 9.21904 6.91374 9.15631 6.572 9.02886L3 7.72V19H21V7.72L17.428 9.02886C17.0863 9.15631 16.7253 9.21904 16.3631 9.21283C16.0008 9.20662 15.6425 9.13161 15.3062 8.99196C14.9699 8.85231 14.6586 8.65087 14.3896 8.3976C14.1207 8.14433 13.9005 7.84413 13.7342 7.50886L12 4Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    Others
                  </Button>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
        
        <DialogFooter>
          <Button 
            onClick={handleDonation} 
            className="w-full" 
            disabled={processing}
          >
            {processing ? (
              <>Processing...</>
            ) : (
              <>
                <Check className="h-4 w-4 mr-2" />
                Complete ${fixedAmount || amount} Donation
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DonationPayment;
