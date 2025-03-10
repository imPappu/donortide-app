
import React, { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const predefinedAmounts = [5, 10, 25, 50];

interface AmountSelectorProps {
  amount: number;
  fixedAmount?: number;
  purpose: string;
  currency?: string;
  onAmountChange: (amount: number) => void;
}

const AmountSelector = ({
  amount,
  fixedAmount,
  purpose,
  currency = "USD",
  onAmountChange,
}: AmountSelectorProps) => {
  const [customAmount, setCustomAmount] = useState<string>(amount.toString());

  useEffect(() => {
    setCustomAmount(amount.toString());
  }, [amount]);

  const handleCustomAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (/^\d*\.?\d*$/.test(value)) {
      setCustomAmount(value);
      if (value) {
        onAmountChange(parseFloat(value));
      }
    }
  };

  const handleAmountClick = (amount: number) => {
    onAmountChange(amount);
  };

  const getCurrencySymbol = (currency: string): string => {
    try {
      return (0).toLocaleString('en-US', { style: 'currency', currency, minimumFractionDigits: 0, maximumFractionDigits: 0 }).replace(/\d/g, '').trim();
    } catch (e) {
      // Fallback to currency code if symbol can't be determined
      return currency;
    }
  };

  if (fixedAmount) {
    return (
      <div className="mb-4">
        <div className="bg-primary/10 p-3 rounded-md text-center">
          <span className="text-lg font-semibold">
            {getCurrencySymbol(currency)} {fixedAmount}
          </span>
          <p className="text-sm text-muted-foreground mt-1">{purpose}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="mb-4">
      <div className="relative mb-2">
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <span className="text-gray-500">{getCurrencySymbol(currency)}</span>
        </div>
        <Input
          type="text"
          value={customAmount}
          onChange={handleCustomAmountChange}
          className="pl-8"
          placeholder="Enter amount"
        />
      </div>

      <div className="grid grid-cols-4 gap-2">
        {predefinedAmounts.map((predefinedAmount) => (
          <Button
            key={predefinedAmount}
            type="button"
            variant={amount === predefinedAmount ? "default" : "outline"}
            onClick={() => handleAmountClick(predefinedAmount)}
          >
            {getCurrencySymbol(currency)}{predefinedAmount}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default AmountSelector;
