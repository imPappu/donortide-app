
import React, { useRef, useState } from "react";
import { Image, X, Upload, Camera } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ImageUploaderProps {
  selectedImage: string | null;
  onImageSelect: (image: string | null) => void;
}

const ImageUploader = ({ selectedImage, onImageSelect }: ImageUploaderProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);

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

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (e) => {
        onImageSelect(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <>
      {selectedImage ? (
        <div className="relative mb-3"
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          <img 
            src={selectedImage} 
            alt="Selected" 
            className="w-full h-auto rounded-lg border border-gray-200 dark:border-gray-700"
          />
          <Button 
            variant="default" 
            size="icon" 
            className="absolute top-2 right-2 bg-black/60 hover:bg-black/80 text-white rounded-full"
            onClick={removeSelectedImage}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      ) : (
        <div
          className={`border-2 border-dashed rounded-lg p-6 mb-3 text-center ${
            isDragging 
              ? 'border-primary bg-primary/5' 
              : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
          } transition-colors cursor-pointer`}
          onClick={triggerFileInput}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          <div className="flex flex-col items-center justify-center">
            <Camera className="h-8 w-8 text-muted-foreground mb-2" />
            <p className="text-sm font-medium mb-1">Add photos to your post</p>
            <p className="text-xs text-muted-foreground">Drag and drop or click to upload</p>
          </div>
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
