
import React from "react";
import { Switch } from "@/components/ui/switch";

interface ModuleSettingProps {
  title: string;
  description: string;
  enabled: boolean;
  onChange: (enabled: boolean) => void;
}

const ModuleSetting = ({ title, description, enabled, onChange }: ModuleSettingProps) => {
  return (
    <div className="border rounded-lg p-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="font-medium">{title}</h3>
          <p className="text-sm text-muted-foreground">{description}</p>
        </div>
        <Switch defaultChecked={enabled} onCheckedChange={onChange} />
      </div>
    </div>
  );
};

export default ModuleSetting;
