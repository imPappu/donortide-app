
import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Settings } from "lucide-react";

interface AddonSettingsModalProps {
  addonId: number | null;
  addonName: string;
  settings: Record<string, any>;
  isOpen: boolean;
  onClose: () => void;
  onUpdateSetting: (addonId: number, settingKey: string, value: any) => void;
}

const AddonSettingsModal = ({ 
  addonId, 
  addonName, 
  settings, 
  isOpen, 
  onClose,
  onUpdateSetting
}: AddonSettingsModalProps) => {
  if (!addonId) return null;

  const formatSettingName = (key: string) => {
    return key
      .replace(/([A-Z])/g, ' $1')
      .replace(/^./, str => str.toUpperCase())
      .replace(/([A-Z])/g, match => ` ${match}`)
      .replace(/^./, str => str.toUpperCase());
  };

  const renderSettingControl = (key: string, value: any) => {
    if (typeof value === "boolean") {
      return (
        <div className="flex items-center justify-between border p-3 rounded-md">
          <div>
            <p className="font-medium">{formatSettingName(key)}</p>
            <p className="text-xs text-muted-foreground">Toggle this setting on or off</p>
          </div>
          <Switch 
            checked={value} 
            onCheckedChange={(checked) => onUpdateSetting(addonId, key, checked)}
          />
        </div>
      );
    } else if (typeof value === "number") {
      if (key.includes("Threshold") || key.includes("Days")) {
        return (
          <div className="space-y-3 border p-3 rounded-md">
            <div className="flex items-center justify-between">
              <p className="font-medium">{formatSettingName(key)}</p>
              <span className="font-mono text-sm bg-primary/10 px-2 py-1 rounded">{value}</span>
            </div>
            <Slider 
              defaultValue={[value]} 
              max={100}
              step={1}
              onValueChange={([val]) => onUpdateSetting(addonId, key, val)}
            />
          </div>
        );
      } else {
        return (
          <div className="space-y-2 border p-3 rounded-md">
            <Label htmlFor={key}>{formatSettingName(key)}</Label>
            <Input 
              id={key}
              type="number" 
              value={value} 
              onChange={(e) => onUpdateSetting(addonId, key, Number(e.target.value))}
            />
          </div>
        );
      }
    } else {
      return (
        <div className="space-y-2 border p-3 rounded-md">
          <Label htmlFor={key}>{formatSettingName(key)}</Label>
          <Input 
            id={key}
            value={value} 
            onChange={(e) => onUpdateSetting(addonId, key, e.target.value)}
          />
        </div>
      );
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Settings className="h-5 w-5" />
            {addonName} Settings
          </DialogTitle>
          <DialogDescription>
            Configure the settings for this addon module
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-2 max-h-96 overflow-y-auto">
          {Object.entries(settings).map(([key, value]) => (
            <div key={key}>
              {renderSettingControl(key, value)}
            </div>
          ))}
        </div>

        <DialogFooter>
          <Button onClick={onClose}>Close</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddonSettingsModal;
