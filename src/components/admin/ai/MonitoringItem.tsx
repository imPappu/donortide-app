
import React from "react";
import { Switch } from "@/components/ui/switch";
import { LucideIcon } from "lucide-react";

interface MonitoringItemProps {
  icon: LucideIcon;
  iconColor: string;
  title: string;
  description: string;
  enabled: boolean;
  onToggle: (value: boolean) => void;
}

const MonitoringItem: React.FC<MonitoringItemProps> = ({
  icon: Icon,
  iconColor,
  title,
  description,
  enabled,
  onToggle
}) => {
  return (
    <div className="border rounded-lg p-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Icon className={`h-5 w-5 ${iconColor}`} />
          <div>
            <h3 className="font-medium">{title}</h3>
            <p className="text-sm text-muted-foreground">{description}</p>
          </div>
        </div>
        <Switch 
          checked={enabled} 
          onCheckedChange={onToggle}
        />
      </div>
    </div>
  );
};

export default MonitoringItem;
