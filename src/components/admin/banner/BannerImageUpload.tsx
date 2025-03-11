
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

export interface BannerImageUploadProps {
  currentImage?: string;  // Make this property exist and optional
  onImageUpload: (imageUrl: string) => void;
}

const BannerImageUpload: React.FC<BannerImageUploadProps> = ({ 
  currentImage, 
  onImageUpload 
}) => {
  const [previewUrl, setPreviewUrl] = useState<string | null>(currentImage || null);
  const [isUploading, setIsUploading] = useState(false);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);

    // Create a local preview
    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result as string;
      setPreviewUrl(result);
      onImageUpload(result);
      setIsUploading(false);
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="space-y-2">
      <Label htmlFor="banner-image">Banner Image</Label>
      
      {previewUrl && (
        <div className="mb-2">
          <img 
            src={previewUrl} 
            alt="Banner preview" 
            className="max-h-48 rounded-md border border-gray-200 object-contain" 
          />
        </div>
      )}
      
      <Input
        id="banner-image"
        type="file"
        accept="image/*"
        onChange={handleImageUpload}
        disabled={isUploading}
      />
      <p className="text-xs text-muted-foreground">
        Recommended size: 1200 x 400 pixels
      </p>
    </div>
  );
};

export default BannerImageUpload;
