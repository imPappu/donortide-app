
import React from "react";
import AmountSelector from "./AmountSelector";
import PaymentMethodList from "./PaymentMethodList";
import PaymentContent from "./PaymentContent";
import CurrencySelector from "./CurrencySelector";
import { Card, CardContent } from "@/components/ui/card";
import { DonationType } from "@/components/DonationPayment";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

interface DonationContentProps {
  amount: number;
  fixedAmount?: number;
  purpose: string;
  paymentMethod: string;
  currency: string;
  availableCurrencies: string[];
  paymentDetails: {
    cardNumber: string;
    expiryDate: string;
    cvv: string;
    name: string;
  };
  availablePaymentMethods: Array<{
    id: string;
    name: string;
    icon: React.ReactNode;
    description?: string;
  }>;
  handleAmountChange: (value: number) => void;
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  setPaymentMethod: (method: string) => void;
  setCurrency: (currency: string) => void;
  showAmountSelector?: boolean;
  donationType?: DonationType;
}

const DonationContent = ({
  amount,
  fixedAmount,
  purpose,
  paymentMethod,
  currency,
  availableCurrencies,
  paymentDetails,
  availablePaymentMethods,
  handleAmountChange,
  handleChange,
  setPaymentMethod,
  setCurrency,
  showAmountSelector = true,
  donationType = 'monetary',
}: DonationContentProps) => {
  return (
    <Card className="border-none shadow-sm">
      <CardContent className="p-0">
        <div className="px-5 py-4">
          {showAmountSelector && (
            <div className="flex items-center gap-2 mb-4">
              <CurrencySelector 
                currency={currency} 
                availableCurrencies={availableCurrencies} 
                onCurrencyChange={setCurrency} 
              />
              
              <div className="flex-1">
                <AmountSelector 
                  amount={amount} 
                  fixedAmount={fixedAmount} 
                  purpose={purpose} 
                  onAmountChange={handleAmountChange}
                  currency={currency} 
                />
              </div>
            </div>
          )}
          
          {donationType !== 'monetary' && (
            <div className="mb-4 space-y-4">
              <div className="space-y-2">
                <Label htmlFor="donation-details">Donation Details</Label>
                <Textarea 
                  id="donation-details"
                  name="donationDetails"
                  placeholder={`Please provide details about your ${donationType} donation...`}
                  onChange={handleChange}
                  rows={3}
                />
              </div>
              
              {donationType === 'blood' && (
                <div className="space-y-2">
                  <Label htmlFor="blood-type">Blood Type</Label>
                  <select 
                    id="blood-type"
                    name="bloodType"
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
                    onChange={(e) => handleChange(e as unknown as React.ChangeEvent<HTMLInputElement>)}
                  >
                    <option value="">Select your blood type</option>
                    <option value="A+">A+</option>
                    <option value="A-">A-</option>
                    <option value="B+">B+</option>
                    <option value="B-">B-</option>
                    <option value="AB+">AB+</option>
                    <option value="AB-">AB-</option>
                    <option value="O+">O+</option>
                    <option value="O-">O-</option>
                  </select>
                </div>
              )}
              
              <div className="space-y-2">
                <Label htmlFor="contact-name">Contact Name</Label>
                <Input 
                  id="contact-name"
                  name="contactName"
                  placeholder="Your name"
                  onChange={handleChange}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="contact-phone">Contact Phone</Label>
                <Input 
                  id="contact-phone"
                  name="contactPhone"
                  placeholder="Your phone number"
                  onChange={handleChange}
                />
              </div>
            </div>
          )}
          
          <PaymentMethodList 
            availablePaymentMethods={availablePaymentMethods}
            paymentMethod={paymentMethod}
            onPaymentMethodChange={setPaymentMethod}
          />
          
          {donationType === 'monetary' && (
            <PaymentContent 
              paymentMethod={paymentMethod}
              paymentDetails={paymentDetails}
              handleChange={handleChange}
            />
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default DonationContent;
