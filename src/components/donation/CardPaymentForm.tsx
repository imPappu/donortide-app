
import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CreditCard, Info, Lock } from "lucide-react";

type CardPaymentFormProps = {
  paymentDetails: {
    cardNumber: string;
    expiryDate: string;
    cvv: string;
    name: string;
  };
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const CardPaymentForm = ({ paymentDetails, onChange }: CardPaymentFormProps) => {
  return (
    <div className="space-y-4 mt-2">
      <div className="space-y-2">
        <Label htmlFor="name">Cardholder Name</Label>
        <Input
          id="name"
          name="name"
          value={paymentDetails.name}
          onChange={onChange}
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
            onChange={onChange}
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
            onChange={onChange}
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
              onChange={onChange}
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
    </div>
  );
};

export default CardPaymentForm;
