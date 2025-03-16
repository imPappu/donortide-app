
import React from "react";
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { UseFormReturn } from "react-hook-form";
import { z } from "zod";
import CurrencySelector from "../CurrencySelector";

const paymentSchema = z.object({
  amount: z.coerce.number().min(1, "Donation amount must be at least 1"),
  fullName: z.string().min(2, "Please enter your full name"),
  email: z.string().email("Please enter a valid email address"),
  isAnonymous: z.boolean().default(false),
  isRecurring: z.boolean().default(false),
  recurringPeriod: z.enum(["monthly", "quarterly", "annually"]).optional(),
  message: z.string().optional(),
});

type FormData = z.infer<typeof paymentSchema>;

interface AmountSelectionSectionProps {
  form: UseFormReturn<FormData>;
  currency: string;
  setCurrency: (currency: string) => void;
  availableCurrencies: string[];
}

const AmountSelectionSection = ({
  form,
  currency,
  setCurrency,
  availableCurrencies
}: AmountSelectionSectionProps) => {
  const predefinedAmounts = [10, 25, 50, 100, 250];

  return (
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
                availableCurrencies={availableCurrencies} 
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
  );
};

export default AmountSelectionSection;
