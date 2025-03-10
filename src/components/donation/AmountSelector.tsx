
import React from "react";
import { DollarSign } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

type AmountSelectorProps = {
  amount: number;
  fixedAmount?: number;
  purpose?: string;
  onAmountChange: (amount: number) => void;
};

const AmountSelector = ({
  amount,
  fixedAmount,
  purpose,
  onAmountChange,
}: AmountSelectorProps) => {
  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value);
    onAmountChange(isNaN(value) ? 0 : value);
  };

  if (fixedAmount) {
    return (
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
    );
  }

  return (
    <div className="space-y-3 mb-4">
      <Label htmlFor="amount" className="text-sm font-medium">
        Donation Amount ($)
      </Label>
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
            onClick={() => onAmountChange(value)}
            className={amount === value ? "bg-blue-600 hover:bg-blue-700" : ""}
          >
            ${value}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default AmountSelector;
