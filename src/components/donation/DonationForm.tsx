
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Checkbox } from "@/components/ui/checkbox";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { HeartHandshake, Gift, CreditCard, Coins, Receipt, UserRound } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import CurrencySelector from "./CurrencySelector";
import PaymentMethodList from "./PaymentMethodList";
import { useDonationPayment } from "@/hooks/useDonationPayment";

interface DonationFormProps {
  purpose?: string;
  eventId?: string;
  category?: string;
  initialAmount?: number;
  showRecurringOption?: boolean;
}

const paymentSchema = z.object({
  amount: z.coerce.number().min(1, "Donation amount must be at least 1"),
  fullName: z.string().min(2, "Please enter your full name"),
  email: z.string().email("Please enter a valid email address"),
  isAnonymous: z.boolean().default(false),
  isRecurring: z.boolean().default(false),
  recurringPeriod: z.enum(["monthly", "quarterly", "annually"]).optional(),
  message: z.string().optional(),
});

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

  const form = useForm<z.infer<typeof paymentSchema>>({
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

  const handleDonation = async (values: z.infer<typeof paymentSchema>) => {
    setIsSaving(true);
    
    try {
      await processPayment();
      
      toast({
        title: "Donation Successful!",
        description: `Thank you for your ${values.isRecurring ? 'recurring' : 'one-time'} donation of ${currency} ${values.amount}.`,
      });
      
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

  const predefinedAmounts = [10, 25, 50, 100, 250];

  // Convert availableCurrencies from {label, value} format to string[] format
  const currencyCodes = availableCurrencies.map(curr => curr.value);

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
              {/* Amount Selection */}
              <div className="space-y-4">
                <FormField
                  control={form.control}
                  name="amount"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Donation Amount</FormLabel>
                      <div className="flex items-center space-x-2">
                        <FormControl>
                          <Input 
                            type="number" 
                            min={1} 
                            {...field} 
                            className="w-24"
                          />
                        </FormControl>
                        <CurrencySelector 
                          currency={currency} 
                          availableCurrencies={currencyCodes} 
                          onCurrencyChange={setCurrency} 
                        />
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <div className="flex flex-wrap gap-2">
                  {predefinedAmounts.map(amount => (
                    <Button
                      key={amount}
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => form.setValue('amount', amount)}
                      className={form.watch('amount') === amount ? 'bg-primary/10' : ''}
                    >
                      {currency} {amount}
                    </Button>
                  ))}
                </div>
              </div>
              
              {/* Personal Information */}
              <div className="space-y-4">
                <FormField
                  control={form.control}
                  name="fullName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Full Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Your name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input placeholder="your.email@example.com" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="isAnonymous"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel>Make my donation anonymous</FormLabel>
                        <FormDescription>
                          Your name will not be displayed publicly
                        </FormDescription>
                      </div>
                    </FormItem>
                  )}
                />
              </div>
              
              {/* Recurring Donation Options */}
              {showRecurringOption && (
                <div className="space-y-4">
                  <FormField
                    control={form.control}
                    name="isRecurring"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                        <div className="space-y-1 leading-none">
                          <FormLabel>Set up recurring donation</FormLabel>
                          <FormDescription>
                            Help us plan ahead with regular support
                          </FormDescription>
                        </div>
                      </FormItem>
                    )}
                  />
                  
                  {form.watch('isRecurring') && (
                    <FormField
                      control={form.control}
                      name="recurringPeriod"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Donation Frequency</FormLabel>
                          <RadioGroup
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                            className="flex space-x-2"
                          >
                            <FormItem className="flex items-center space-x-1">
                              <FormControl>
                                <RadioGroupItem value="monthly" />
                              </FormControl>
                              <FormLabel className="text-sm font-normal">Monthly</FormLabel>
                            </FormItem>
                            <FormItem className="flex items-center space-x-1">
                              <FormControl>
                                <RadioGroupItem value="quarterly" />
                              </FormControl>
                              <FormLabel className="text-sm font-normal">Quarterly</FormLabel>
                            </FormItem>
                            <FormItem className="flex items-center space-x-1">
                              <FormControl>
                                <RadioGroupItem value="annually" />
                              </FormControl>
                              <FormLabel className="text-sm font-normal">Annually</FormLabel>
                            </FormItem>
                          </RadioGroup>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  )}
                </div>
              )}
              
              {/* Optional message */}
              <FormField
                control={form.control}
                name="message"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Message (Optional)</FormLabel>
                    <FormControl>
                      <Input placeholder="Share why you're supporting us" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              {/* Payment Method */}
              <div className="space-y-4">
                <Label>Payment Method</Label>
                <Tabs value={activeTab} onValueChange={setActiveTab}>
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="credit-card">
                      <CreditCard className="h-4 w-4 mr-2" />
                      <span className="hidden sm:inline">Card</span>
                    </TabsTrigger>
                    <TabsTrigger value="bank-transfer">
                      <Receipt className="h-4 w-4 mr-2" />
                      <span className="hidden sm:inline">Bank</span>
                    </TabsTrigger>
                    <TabsTrigger value="other">
                      <Coins className="h-4 w-4 mr-2" />
                      <span className="hidden sm:inline">Other</span>
                    </TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="credit-card">
                    <PaymentMethodList
                      availablePaymentMethods={availablePaymentMethods.filter(m => ['credit-card', 'paypal', 'apple-pay', 'google-pay'].includes(m.id))}
                      paymentMethod={paymentMethod}
                      onPaymentMethodChange={setPaymentMethod}
                    />
                  </TabsContent>
                  
                  <TabsContent value="bank-transfer">
                    <PaymentMethodList
                      availablePaymentMethods={availablePaymentMethods.filter(m => ['bank-transfer', 'wire-transfer'].includes(m.id))}
                      paymentMethod={paymentMethod}
                      onPaymentMethodChange={setPaymentMethod}
                    />
                  </TabsContent>
                  
                  <TabsContent value="other">
                    <PaymentMethodList
                      availablePaymentMethods={availablePaymentMethods.filter(m => ['crypto', 'mobile-payment'].includes(m.id))}
                      paymentMethod={paymentMethod}
                      onPaymentMethodChange={setPaymentMethod}
                    />
                  </TabsContent>
                </Tabs>
              </div>
            </CardContent>
            
            <CardFooter className="flex justify-between">
              <Button variant="outline" type="button">
                Cancel
              </Button>
              <Button type="submit" disabled={isSaving || processing}>
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
