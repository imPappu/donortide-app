
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

const CreatePostCard = () => {
  return (
    <Card>
      <CardContent className="pt-6">
        <div className="flex items-center gap-3">
          <Avatar>
            <AvatarFallback>JD</AvatarFallback>
          </Avatar>
          <Button variant="outline" className="w-full justify-start text-muted-foreground h-12 px-4">
            Share your donation story...
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default CreatePostCard;
