
import React from "react";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { LucideIcon } from "lucide-react";
import { SocialMediaConfig } from "../types";

interface SocialMediaItemProps {
  platform: string;
  icon: LucideIcon;
  iconColor: string;
  title: string;
  config: SocialMediaConfig;
  onChange: (platform: string, field: string, value: any) => void;
}

const SocialMediaItem: React.FC<SocialMediaItemProps> = ({
  platform,
  icon: Icon,
  iconColor,
  title,
  config,
  onChange
}) => {
  return (
    <div className="border rounded-lg p-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Icon className={`h-5 w-5 ${iconColor}`} />
          <h3 className="font-medium">{title}</h3>
        </div>
        <Switch 
          checked={config.enabled} 
          onCheckedChange={(checked) => onChange(platform, 'enabled', checked)}
        />
      </div>
      
      {config.enabled && (
        <div className="mt-4 space-y-4">
          <div className="flex items-center space-x-2">
            <Switch 
              id={`${platform}-auto`}
              checked={config.autoPost} 
              onCheckedChange={(checked) => onChange(platform, 'autoPost', checked)}
            />
            <Label htmlFor={`${platform}-auto`}>Auto-post updates</Label>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor={`${platform}-schedule`}>Posting Schedule</Label>
            <Select 
              value={config.schedule}
              onValueChange={(value) => onChange(platform, 'schedule', value)}
            >
              <SelectTrigger id={`${platform}-schedule`}>
                <SelectValue placeholder="Select schedule" />
              </SelectTrigger>
              <SelectContent>
                {platform !== 'youtube' && <SelectItem value="daily">Daily</SelectItem>}
                <SelectItem value="weekly">Weekly</SelectItem>
                <SelectItem value="monthly">Monthly</SelectItem>
                {platform === 'youtube' && <SelectItem value="quarterly">Quarterly</SelectItem>}
              </SelectContent>
            </Select>
          </div>
          
          {platform === 'twitter' && (
            <div className="space-y-2">
              <Label htmlFor="twitter-api">API Key</Label>
              <Input id="twitter-api" type="password" placeholder="Enter Twitter API key" />
            </div>
          )}
          
          <Button variant="outline" size="sm">Connect Account</Button>
        </div>
      )}
    </div>
  );
};

export default SocialMediaItem;
