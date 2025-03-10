
import React, { useState, useRef } from "react";
import { Camera, Upload, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

interface ProfilePictureUploadProps {
  currentAvatar?: string;
  username: string;
  onAvatarChange: (imageUrl: string) => void;
}

const ProfilePictureUpload = ({ currentAvatar, username, onAvatarChange }: ProfilePictureUploadProps) => {
  const [avatar, setAvatar] = useState<string | undefined>(currentAvatar);
  const inputRef = useRef<HTMLInputElement>(null);
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    // Check file type
    if (!file.type.startsWith('image/')) {
      toast({
        title: "Invalid file type",
        description: "Please upload an image file",
        variant: "destructive",
      });
      return;
    }
    
    // Check file size (max 2MB)
    if (file.size > 2 * 1024 * 1024) {
      toast({
        title: "File too large",
        description: "Image must be less than 2MB",
        variant: "destructive",
      });
      return;
    }
    
    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result as string;
      setAvatar(result);
      onAvatarChange(result);
      
      toast({
        title: "Profile picture updated",
        description: "Your profile picture has been updated successfully",
      });
    };
    reader.readAsDataURL(file);
  };
  
  const triggerFileInput = () => {
    inputRef.current?.click();
  };
  
  const removeAvatar = () => {
    setAvatar(undefined);
    onAvatarChange('');
    
    toast({
      title: "Profile picture removed",
      description: "Your profile picture has been removed",
    });
  };
  
  return (
    <div className="flex flex-col items-center space-y-4">
      <input 
        type="file" 
        ref={inputRef}
        onChange={handleFileChange}
        accept="image/*" 
        className="hidden" 
      />
      
      <div className="relative">
        <Avatar className="h-24 w-24">
          {avatar ? (
            <AvatarImage src={avatar} alt={username} />
          ) : (
            <AvatarFallback className="bg-primary text-primary-foreground text-2xl">
              {username[0].toUpperCase()}
            </AvatarFallback>
          )}
        </Avatar>
        
        <Button 
          size="icon"
          variant="secondary"
          className="absolute bottom-0 right-0 rounded-full h-8 w-8"
          onClick={triggerFileInput}
        >
          <Camera className="h-4 w-4" />
        </Button>
      </div>
      
      <div className="flex gap-2">
        <Button 
          variant="outline" 
          size="sm" 
          className="flex items-center" 
          onClick={triggerFileInput}
        >
          <Upload className="h-4 w-4 mr-2" />
          Upload
        </Button>
        
        {avatar && (
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button 
                variant="outline" 
                size="sm" 
                className="flex items-center text-destructive" 
              >
                <Trash2 className="h-4 w-4 mr-2" />
                Remove
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Remove profile picture?</AlertDialogTitle>
                <AlertDialogDescription>
                  This will remove your current profile picture. You can upload a new one at any time.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={removeAvatar}>
                  Remove
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        )}
      </div>
    </div>
  );
};

export default ProfilePictureUpload;
