
import React, { useRef, useState } from "react";
import { Image, X } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ImageUploaderProps {
  selectedImage: string | null;
  onImageSelect: (image: string | null) => void;
}

const ImageUploader = ({ selectedImage, onImageSelect }: ImageUploaderProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        onImageSelect(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  const removeSelectedImage = () => {
    onImageSelect(null);
  };

  return (
    <>
      {selectedImage && (
        <div className="relative mb-3">
          <img src={selectedImage} alt="Selected" className="w-full h-auto rounded-md" />
          <Button 
            variant="ghost" 
            size="icon" 
            className="absolute top-2 right-2 bg-black/50 hover:bg-black/70 text-white rounded-full"
            onClick={removeSelectedImage}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      )}
      
      <Button 
        variant="ghost" 
        size="sm" 
        className="flex items-center text-muted-foreground"
        onClick={triggerFileInput}
      >
        <Image className="h-4 w-4 mr-2" />
        Photo
      </Button>
      <input 
        type="file" 
        ref={fileInputRef} 
        className="hidden"
        accept="image/*"
        onChange={handleImageSelect}
      />
    </>
  );
};

export default ImageUploader;
