
import React from "react";
import { Switch } from "@/components/ui/switch";

interface MonitoringItemProps {
  id: string;
  title: string;
  description: string;
  isEnabled: boolean;
  onChange: (value: boolean) => void;
  disabled: boolean;
}

const MonitoringItem: React.FC<MonitoringItemProps> = ({
  id,
  title,
  description,
  isEnabled,
  onChange,
  disabled
}) => {
  return (
    <div className="border rounded-lg p-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="font-medium">{title}</h3>
          <p className="text-sm text-muted-foreground">{description}</p>
        </div>
        <Switch 
          id={id}
          checked={isEnabled} 
          onCheckedChange={onChange}
          disabled={disabled}
        />
      </div>
    </div>
  );
};

export default MonitoringItem;
