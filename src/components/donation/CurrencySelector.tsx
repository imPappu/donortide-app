
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
        <SelectTrigger className="bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700 focus:ring-primary/30">
          <SelectValue placeholder="Currency" className="font-medium" />
        </SelectTrigger>
        <SelectContent className="bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-700 shadow-lg">
          {availableCurrencies.map((curr) => (
            <SelectItem key={curr} value={curr} className="hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer">
              {curr}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default CurrencySelector;
