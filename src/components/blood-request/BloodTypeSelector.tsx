
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
                ? "bg-red-600 hover:bg-red-700 text-white shadow-md scale-105 dark:bg-red-700 dark:hover:bg-red-800 border-0" 
                : "hover:border-red-400 hover:text-red-600 dark:hover:border-red-500 dark:hover:text-red-400"
            )}
            onClick={() => onSelectType(type)}
          >
            <DropletIcon className={cn(
              "h-4 w-4 mr-1 transition-colors",
              isSelected ? "text-white" : "text-red-500 dark:text-red-400"
            )} />
            {type}
          </Button>
        );
      })}
    </div>
  );
}
