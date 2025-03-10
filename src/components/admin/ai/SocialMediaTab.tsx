
import React from "react";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { SocialMediaState, SocialMediaConfig } from "../types";
import SocialMediaItem from "./SocialMediaItem";
import { Twitter, Facebook, Instagram, Youtube } from "lucide-react";

interface SocialMediaTabProps {
  socialMediaState: SocialMediaState;
  handleChange: (platform: keyof SocialMediaState, field: keyof SocialMediaConfig, value: any) => void;
  saving: boolean;
  saveSettings: () => Promise<void>;
}

const SocialMediaTab: React.FC<SocialMediaTabProps> = ({
  socialMediaState,
  handleChange,
  saving
}) => {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-md font-medium mb-3">Social Media Integration</h3>
        <div className="space-y-4">
          <SocialMediaItem
            platform="twitter"
            label="Twitter"
            icon={<Twitter className="h-5 w-5 text-blue-400" />}
            config={socialMediaState.twitter}
            onChange={handleChange}
            disabled={saving}
          />
          <SocialMediaItem
            platform="facebook"
            label="Facebook"
            icon={<Facebook className="h-5 w-5 text-blue-600" />}
            config={socialMediaState.facebook}
            onChange={handleChange}
            disabled={saving}
          />
          <SocialMediaItem
            platform="instagram"
            label="Instagram"
            icon={<Instagram className="h-5 w-5 text-pink-500" />}
            config={socialMediaState.instagram}
            onChange={handleChange}
            disabled={saving}
          />
          <SocialMediaItem
            platform="youtube"
            label="YouTube"
            icon={<Youtube className="h-5 w-5 text-red-500" />}
            config={socialMediaState.youtube}
            onChange={handleChange}
            disabled={saving}
          />
        </div>
      </div>
      
      <div className="bg-muted p-4 rounded-md">
        <h4 className="text-sm font-medium mb-2">About Social Media Integration</h4>
        <p className="text-sm text-muted-foreground">
          Connect your social media accounts to automatically share content, track engagement, and grow your audience.
          Each platform requires authentication via OAuth before AI-assisted scheduling can be enabled.
        </p>
      </div>
    </div>
  );
};

export default SocialMediaTab;
