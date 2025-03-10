
import React from "react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { AlertCircle, Twitter, Facebook, Instagram, Youtube } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import SocialMediaItem from "./SocialMediaItem";
import { SocialMediaState } from "../types";

interface SocialMediaTabProps {
  socialMediaSettings: SocialMediaState;
  handleSocialMediaChange: (platform: string, field: string, value: any) => void;
}

const SocialMediaTab: React.FC<SocialMediaTabProps> = ({
  socialMediaSettings,
  handleSocialMediaChange
}) => {
  const { toast } = useToast();

  const socialPlatforms = [
    {
      key: 'twitter',
      icon: Twitter,
      color: 'text-blue-400',
      title: 'Twitter/X'
    },
    {
      key: 'facebook',
      icon: Facebook,
      color: 'text-blue-600',
      title: 'Facebook'
    },
    {
      key: 'instagram',
      icon: Instagram,
      color: 'text-pink-500',
      title: 'Instagram'
    },
    {
      key: 'youtube',
      icon: Youtube,
      color: 'text-red-500',
      title: 'YouTube'
    }
  ];

  return (
    <div className="space-y-4">
      <Alert className="bg-blue-50 dark:bg-blue-950 border-blue-200 dark:border-blue-800">
        <AlertCircle className="h-4 w-4 text-blue-600 dark:text-blue-400" />
        <AlertDescription className="text-blue-700 dark:text-blue-300">
          Configure AI to help automate your social media posting and engagement. Connect your accounts and set schedules.
        </AlertDescription>
      </Alert>
      
      <div className="space-y-4">
        {socialPlatforms.map(platform => (
          <SocialMediaItem
            key={platform.key}
            platform={platform.key}
            icon={platform.icon}
            iconColor={platform.color}
            title={platform.title}
            config={socialMediaSettings[platform.key as keyof SocialMediaState]}
            onChange={handleSocialMediaChange}
          />
        ))}
      </div>
      
      <div className="mt-6 space-y-4">
        <h3 className="text-lg font-medium">AI Content Generation</h3>
        <div className="space-y-2">
          <Label htmlFor="social-content-style">Content Style</Label>
          <Select defaultValue="informative">
            <SelectTrigger id="social-content-style">
              <SelectValue placeholder="Select style" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="informative">Informative</SelectItem>
              <SelectItem value="promotional">Promotional</SelectItem>
              <SelectItem value="casual">Casual & Friendly</SelectItem>
              <SelectItem value="professional">Professional</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="content-topics">Content Topics & Keywords</Label>
          <Textarea 
            id="content-topics" 
            placeholder="Enter topics and keywords to include in generated content..." 
            className="min-h-[100px]"
            defaultValue="Blood donation, health awareness, community support, volunteer opportunities"
          />
        </div>
        
        <div className="flex justify-end mt-6">
          <Button
            onClick={() => {
              toast({
                title: "Social Media Settings Saved",
                description: "Your social media automation settings have been updated."
              });
            }}
          >
            Save Social Media Settings
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SocialMediaTab;
