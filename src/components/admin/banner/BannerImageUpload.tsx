
import React from 'react';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface BannerImageUploadProps {
  previewUrl: string;
  handleImageChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const BannerImageUpload = ({ 
  previewUrl, 
  handleImageChange 
}: BannerImageUploadProps) => {
  return (
    <div className="space-y-2">
      <Label htmlFor="bannerImage">Banner Image *</Label>
      <div className="flex flex-col space-y-2">
        <Input 
          id="bannerImage" 
          name="bannerImage" 
          type="file" 
          accept="image/*"
          onChange={handleImageChange}
          className="cursor-pointer"
        />
        {previewUrl && (
          <div className="mt-2">
            <p className="text-sm mb-1">Preview:</p>
            <img 
              src={previewUrl} 
              alt="Banner preview" 
              className="w-full max-h-40 object-cover rounded-md" 
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default BannerImageUpload;
