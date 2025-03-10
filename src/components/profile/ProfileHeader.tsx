
import React from "react";
import { Badge } from "@/components/ui/badge";
import { CardTitle } from "@/components/ui/card";
import { CheckCircle, DropletIcon, MapPin, Phone } from "lucide-react";
import ProfilePictureUpload from "@/components/ProfilePictureUpload";

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
    <div className="text-center border-b pb-6">
      <ProfilePictureUpload 
        currentAvatar={userData.avatar}
        username={userData.name}
        onAvatarChange={handleAvatarChange}
      />
      <div className="mt-4 flex items-center justify-center">
        <CardTitle>{userData.name}</CardTitle>
        {userData.isVerified && (
          <CheckCircle className="h-4 w-4 text-blue-500 ml-1" />
        )}
      </div>
      <div className="flex items-center justify-center mt-1">
        <DropletIcon className="h-4 w-4 mr-1 text-red-500" />
        <span className="font-medium">O+</span>
      </div>
      <div className="flex flex-col items-center text-sm text-muted-foreground mt-2 space-y-1">
        <div className="flex items-center">
          <MapPin className="h-3 w-3 mr-1" /> New York, NY
        </div>
        <div className="flex items-center">
          <Phone className="h-3 w-3 mr-1" /> +1 (555) 123-4567
        </div>
      </div>
      <div className="flex items-center justify-center gap-2 mt-4">
        <Badge className="bg-green-100 text-green-800 hover:bg-green-200">5 Donations</Badge>
        <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-200">3 Lives Saved</Badge>
      </div>
    </div>
  );
};

export default ProfileHeader;
