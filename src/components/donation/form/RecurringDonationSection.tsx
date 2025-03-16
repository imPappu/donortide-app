
import React from "react";
import { FormField, FormItem, FormLabel, FormControl, FormDescription, FormMessage } from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { UseFormReturn } from "react-hook-form";
import { z } from "zod";

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

interface RecurringDonationSectionProps {
  form: UseFormReturn<FormData>;
  showRecurringOption: boolean;
}

const RecurringDonationSection = ({ 
  form, 
  showRecurringOption 
}: RecurringDonationSectionProps) => {
  if (!showRecurringOption) return null;
  
  return (
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
  );
};

export default RecurringDonationSection;
