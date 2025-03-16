
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { HeartHandshake, AlertCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useDonationPayment } from "@/hooks/useDonationPayment";
import { paymentSchema, FormData } from "./form/formSchema";
import AmountSelectionSection from "./form/AmountSelectionSection";
import PersonalInfoSection from "./form/PersonalInfoSection";
import RecurringDonationSection from "./form/RecurringDonationSection";
import PaymentMethodSection from "./form/PaymentMethodSection";
import { Alert, AlertDescription } from "@/components/ui/alert";

interface DonationFormProps {
  purpose?: string;
  eventId?: string;
  category?: string;
  initialAmount?: number;
  showRecurringOption?: boolean;
}

const DonationForm = ({
  purpose = "general donation",
  eventId,
  category,
  initialAmount = 25,
  showRecurringOption = true,
}: DonationFormProps) => {
  const { toast } = useToast();
  const [isSaving, setIsSaving] = useState(false);
  const [activeTab, setActiveTab] = useState("credit-card");
  const [donationSuccess, setDonationSuccess] = useState(false);
  
  const {
    currency,
    availableCurrencies,
    setCurrency,
    availablePaymentMethods,
    paymentMethod,
    setPaymentMethod,
    processing,
    handleDonation: processPayment,
  } = useDonationPayment({
    defaultAmount: initialAmount,
    purpose,
    eventId,
    category,
  });

  const form = useForm<FormData>({
    resolver: zodResolver(paymentSchema),
    defaultValues: {
      amount: initialAmount,
      fullName: "",
      email: "",
      isAnonymous: false,
      isRecurring: false,
      recurringPeriod: "monthly",
      message: "",
    },
  });

  const handleDonation = async (values: FormData) => {
    setIsSaving(true);
    
    try {
      await processPayment();
      
      toast({
        title: "Donation Successful!",
        description: `Thank you for your ${values.isRecurring ? 'recurring' : 'one-time'} donation of ${currency} ${values.amount}.`,
      });
      
      setDonationSuccess(true);
      form.reset();
    } catch (error) {
      console.error("Donation error:", error);
      toast({
        title: "Donation Failed",
        description: "There was an error processing your donation. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSaving(false);
    }
  };

  // Convert availableCurrencies from {label, value} format to string[] format
  const currencyCodes = availableCurrencies.map(curr => curr.value);

  if (donationSuccess) {
    return (
      <Card className="border-green-200 bg-green-50">
        <CardHeader>
          <CardTitle className="text-green-700">Thank You for Your Donation!</CardTitle>
          <CardDescription>Your generosity makes a difference in our community.</CardDescription>
        </CardHeader>
        <CardContent className="text-center py-6">
          <div className="rounded-full bg-green-100 p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
            <HeartHandshake className="h-8 w-8 text-green-600" />
          </div>
          <p className="mb-4">We've sent a confirmation receipt to your email.</p>
          <Button 
            onClick={() => setDonationSuccess(false)}
            variant="outline"
            className="mr-2"
          >
            Make Another Donation
          </Button>
          <Button>View Donation History</Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="max-w-md mx-auto">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <HeartHandshake className="mr-2 h-5 w-5 text-primary" />
            Make a Donation
          </CardTitle>
          <CardDescription>Support our mission with your contribution</CardDescription>
        </CardHeader>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleDonation)}>
            <CardContent className="space-y-6">
              {/* Tax Deduction Information */}
              <Alert className="bg-blue-50 text-blue-800 border-blue-200">
                <AlertCircle className="h-4 w-4 text-blue-600" />
                <AlertDescription>
                  Your donations are tax-deductible. You'll receive a receipt for tax purposes.
                </AlertDescription>
              </Alert>
              
              {/* Amount Selection */}
              <AmountSelectionSection 
                form={form} 
                currency={currency} 
                setCurrency={setCurrency} 
                availableCurrencies={currencyCodes} 
              />
              
              {/* Personal Information */}
              <PersonalInfoSection form={form} />
              
              {/* Recurring Donation Options */}
              <RecurringDonationSection 
                form={form} 
                showRecurringOption={showRecurringOption} 
              />
              
              {/* Payment Method */}
              <PaymentMethodSection 
                activeTab={activeTab}
                setActiveTab={setActiveTab}
                paymentMethod={paymentMethod}
                setPaymentMethod={setPaymentMethod}
                availablePaymentMethods={availablePaymentMethods}
              />
            </CardContent>
            
            <CardFooter className="flex justify-between border-t p-6 bg-gray-50">
              <Button variant="outline" type="button">
                Cancel
              </Button>
              <Button type="submit" disabled={isSaving || processing} className="px-6">
                {isSaving || processing ? (
                  <>Processing...</>
                ) : form.watch('isRecurring') ? (
                  <>Start {form.watch('recurringPeriod')} donation</>
                ) : (
                  <>Donate {currency} {form.watch('amount')}</>
                )}
              </Button>
            </CardFooter>
          </form>
        </Form>
      </Card>
    </div>
  );
};

export default DonationForm;
