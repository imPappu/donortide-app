
import React from "react";
import { Badge } from "@/components/ui/badge";
import { CardTitle } from "@/components/ui/card";
import { CheckCircle, DropletIcon, MapPin, Phone, MessageCircle, Users, Calendar, Shield } from "lucide-react";
import ProfilePictureUpload from "@/components/ProfilePictureUpload";
import { Button } from "@/components/ui/button";

interface ProfileHeaderProps {
  userData: {
    name: string;
    isVerified: boolean;
    avatar?: string;
  };
  handleAvatarChange: (imageUrl: string) => void;
}

const ProfileHeader = ({ userData, handleAvatarChange }: ProfileHeaderProps) => {
  return (
    <div className="text-center pb-6">
      <div className="relative">
        <div className="h-32 bg-gradient-to-r from-blue-500 to-blue-700 rounded-t-xl"></div>
        <div className="absolute -bottom-12 left-1/2 transform -translate-x-1/2">
          <ProfilePictureUpload 
            currentAvatar={userData.avatar}
            username={userData.name}
            onAvatarChange={handleAvatarChange}
          />
        </div>
      </div>
      
      <div className="mt-16">
        <div className="flex items-center justify-center">
          <CardTitle className="text-xl">{userData.name}</CardTitle>
          {userData.isVerified && (
            <CheckCircle className="h-5 w-5 text-blue-500 ml-1" />
          )}
        </div>
        
        <div className="flex items-center justify-center mt-1">
          <DropletIcon className="h-4 w-4 mr-1 text-red-500" />
          <span className="font-medium">O+</span>
          <Badge className="ml-2 bg-blue-100 text-blue-800 hover:bg-blue-200 dark:bg-blue-900 dark:text-blue-200">Regular Donor</Badge>
        </div>
        
        <div className="flex flex-col items-center text-sm text-muted-foreground mt-3 space-y-1">
          <div className="flex items-center">
            <MapPin className="h-3.5 w-3.5 mr-1" /> New York, NY
          </div>
          <div className="flex items-center">
            <Phone className="h-3.5 w-3.5 mr-1" /> +1 (555) 123-4567
          </div>
        </div>
        
        <div className="flex items-center justify-center gap-4 mt-4">
          <div className="text-center">
            <p className="font-semibold">5</p>
            <p className="text-xs text-muted-foreground">Donations</p>
          </div>
          <div className="h-8 w-px bg-gray-200 dark:bg-gray-700"></div>
          <div className="text-center">
            <p className="font-semibold">3</p>
            <p className="text-xs text-muted-foreground">Lives Saved</p>
          </div>
          <div className="h-8 w-px bg-gray-200 dark:bg-gray-700"></div>
          <div className="text-center">
            <p className="font-semibold">12</p>
            <p className="text-xs text-muted-foreground">Friends</p>
          </div>
        </div>
        
        <div className="flex justify-center mt-5 gap-2">
          <Button className="rounded-full px-4" size="sm">
            <Shield className="h-4 w-4 mr-1" />
            Verify ID
          </Button>
          <Button variant="outline" className="rounded-full px-4" size="sm">
            <MessageCircle className="h-4 w-4 mr-1" />
            Message
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProfileHeader;
