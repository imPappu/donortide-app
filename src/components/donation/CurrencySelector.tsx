
import React from "react";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { DollarSign } from "lucide-react";

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
    <div className="w-28">
      <Select value={currency} onValueChange={onCurrencyChange}>
        <SelectTrigger className="bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700 focus:ring-primary/30 h-10 pl-2 pr-1">
          <div className="flex items-center">
            <DollarSign className="h-4 w-4 mr-1 text-muted-foreground" />
            <SelectValue placeholder="Currency" className="font-medium" />
          </div>
        </SelectTrigger>
        <SelectContent className="bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-700 shadow-lg">
          {availableCurrencies.map((curr) => (
            <SelectItem 
              key={curr} 
              value={curr} 
              className="hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer font-medium"
            >
              {curr}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default CurrencySelector;
