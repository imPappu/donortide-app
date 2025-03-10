
import React from "react";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

type PaymentMethodItemProps = {
  id: string;
  name: string;
  icon: React.ReactNode;
  description?: string;
  selected: boolean;
  onSelect: (id: string) => void;
};

const PaymentMethodItem = ({
  id,
  name,
  icon,
  description,
  selected,
  onSelect,
}: PaymentMethodItemProps) => {
  return (
    <div
      className={cn(
        "flex items-center p-4 rounded-xl border cursor-pointer transition-all",
        selected
          ? "border-blue-600 bg-blue-50 dark:bg-blue-900/20 dark:border-blue-400 shadow-sm"
          : "border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-600/70"
      )}
      onClick={() => onSelect(id)}
    >
      <div
        className={cn(
          "p-3 rounded-full mr-4 transition-colors",
          selected 
            ? "bg-blue-600 text-white dark:bg-blue-500" 
            : "bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400"
        )}
      >
        {icon}
      </div>
      <div className="flex-1">
        <h3 className={cn(
          "font-medium text-base transition-colors",
          selected && "text-blue-700 dark:text-blue-400"
        )}>
          {name}
        </h3>
        {description && (
          <p className={cn(
            "text-sm text-muted-foreground transition-colors mt-0.5",
            selected && "text-blue-600/80 dark:text-blue-300/80"
          )}>
            {description}
          </p>
        )}
      </div>
      {selected && <Check className="h-5 w-5 text-blue-600 dark:text-blue-400" />}
    </div>
  );
};

export default PaymentMethodItem;
