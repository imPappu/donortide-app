
import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { User } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/hooks/use-toast";
import { useAuth } from "@/components/auth/AuthContext";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const NewPostForm = () => {
  const [newPost, setNewPost] = useState("");
  const { user } = useAuth();
  
  const handlePostSubmit = () => {
    if (!newPost.trim()) return;
    
    toast({
      title: "Post created",
      description: "Your post has been shared with the community",
    });
    
    setNewPost("");
  };

  return (
    <Card className="mb-6">
      <CardContent className="p-4">
        <div className="flex items-start">
          <Avatar className="h-10 w-10 mr-3">
            {user?.avatar ? (
              <AvatarImage src={user.avatar} alt={user.name} />
            ) : (
              <AvatarFallback>
                {user ? user.name.charAt(0) : <User className="h-6 w-6 text-gray-600" />}
              </AvatarFallback>
            )}
          </Avatar>
          <div className="flex-1">
            <Textarea 
              placeholder="Share something with the community..."
              value={newPost}
              onChange={(e) => setNewPost(e.target.value)}
              className="mb-3"
            />
            <div className="flex justify-end">
              <Button onClick={handlePostSubmit}>Post</Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default NewPostForm;
