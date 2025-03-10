
import React from "react";
import { MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface PostHeaderProps {
  userName: string;
  userAvatar?: string;
  timestamp: string;
}

const PostHeader = ({ userName, userAvatar, timestamp }: PostHeaderProps) => {
  return (
    <div className="flex justify-between items-center mb-3">
      <div className="flex items-center">
        <Avatar className="h-10 w-10 mr-3">
          {userAvatar ? (
            <AvatarImage src={userAvatar} alt={userName} />
          ) : (
            <AvatarFallback>
              {userName.charAt(0)}
            </AvatarFallback>
          )}
        </Avatar>
        <div>
          <h3 className="font-medium text-sm">{userName}</h3>
          <p className="text-xs text-muted-foreground">{timestamp}</p>
        </div>
      </div>
      <Button variant="ghost" size="icon" className="h-8 w-8">
        <MoreHorizontal className="h-4 w-4" />
      </Button>
    </div>
  );
};

export default PostHeader;
