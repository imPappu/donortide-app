
import React from "react";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";

interface CurrencySelectorProps {
  currency: string;
  availableCurrencies: string[];
  onCurrencyChange: (currency: string) => void;
}

const CurrencySelector = ({
  currency,
  availableCurrencies,
  onCurrencyChange
}: CurrencySelectorProps) => {
  return (
    <div className="w-24">
      <Select value={currency} onValueChange={onCurrencyChange}>
        <SelectTrigger>
          <SelectValue placeholder="Currency" />
        </SelectTrigger>
        <SelectContent>
          {availableCurrencies.map((curr) => (
            <SelectItem key={curr} value={curr}>
              {curr}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default CurrencySelector;
