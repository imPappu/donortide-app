
import React from "react";
import { Check } from "lucide-react";

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
      className={`flex items-center p-3 rounded-lg border cursor-pointer transition-all ${
        selected
          ? "border-blue-600 bg-blue-50"
          : "border-gray-200 hover:border-blue-300"
      }`}
      onClick={() => onSelect(id)}
    >
      <div
        className={`p-2 rounded-full mr-3 ${
          selected ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-600"
        }`}
      >
        {icon}
      </div>
      <div className="flex-1">
        <h3 className="font-medium">{name}</h3>
        <p className="text-xs text-muted-foreground">{description}</p>
      </div>
      {selected && <Check className="h-5 w-5 text-blue-600" />}
    </div>
  );
};

export default PaymentMethodItem;
