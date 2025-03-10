
import React from "react";
import { Button } from "@/components/ui/button";
import { DropletIcon } from "lucide-react";

const bloodTypes = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

interface BloodTypeSelectorProps {
  selectedType: string;
  onSelectType: (type: string) => void;
}

export function BloodTypeSelector({ selectedType, onSelectType }: BloodTypeSelectorProps) {
  return (
    <div className="grid grid-cols-4 gap-2">
      {bloodTypes.map((type) => (
        <Button
          key={type}
          type="button"
          variant={selectedType === type ? "default" : "outline"}
          className={`flex items-center justify-center h-12 ${
            selectedType === type ? "bg-primary" : ""
          }`}
          onClick={() => onSelectType(type)}
        >
          <DropletIcon className="h-4 w-4 mr-1 text-red-500" />
          {type}
        </Button>
      ))}
    </div>
  );
}
