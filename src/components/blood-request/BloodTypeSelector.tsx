
import React from "react";
import { Button } from "@/components/ui/button";
import { DropletIcon } from "lucide-react";
import { cn } from "@/lib/utils";

const bloodTypes = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

interface BloodTypeSelectorProps {
  selectedType: string;
  onSelectType: (type: string) => void;
}

export function BloodTypeSelector({ selectedType, onSelectType }: BloodTypeSelectorProps) {
  return (
    <div className="grid grid-cols-4 gap-2">
      {bloodTypes.map((type) => {
        const isSelected = selectedType === type;
        return (
          <Button
            key={type}
            type="button"
            variant={isSelected ? "default" : "outline"}
            className={cn(
              "flex items-center justify-center h-12 transition-all",
              isSelected 
                ? "bg-red-500 hover:bg-red-600 text-white shadow-md scale-105" 
                : "hover:border-red-300 hover:text-red-600"
            )}
            onClick={() => onSelectType(type)}
          >
            <DropletIcon className={cn(
              "h-4 w-4 mr-1 transition-colors",
              isSelected ? "text-white" : "text-red-500"
            )} />
            {type}
          </Button>
        );
      })}
    </div>
  );
}
