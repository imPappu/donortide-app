
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';

export interface BannerImageUploadProps {
  currentImage: string;
  onImageUpload: (imageUrl: string) => void;
}

const BannerImageUpload: React.FC<BannerImageUploadProps> = ({ currentImage, onImageUpload }) => {
  const [isUploading, setIsUploading] = useState(false);
  const [imageUrl, setImageUrl] = useState(currentImage || '');

  const handleImageUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const url = e.target.value;
    setImageUrl(url);
    onImageUpload(url);
  };

  // Mock file upload function
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);

    // In a real app, we would upload to a server/cloud storage
    // For now, just create a fake delay and use a data URL
    setTimeout(() => {
      const reader = new FileReader();
      reader.onload = (event) => {
        const result = event.target?.result as string;
        setImageUrl(result);
        onImageUpload(result);
        setIsUploading(false);
      };
      reader.readAsDataURL(file);
    }, 1000);
  };

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="imageUrl">Banner Image</Label>
        <div className="flex gap-2">
          <Input
            id="imageUrl"
            value={imageUrl}
            onChange={handleImageUrlChange}
            placeholder="Enter image URL or upload an image"
            className="flex-1"
          />
          <div className="relative">
            <Input
              id="file-upload"
              type="file"
              onChange={handleFileUpload}
              accept="image/*"
              className="absolute inset-0 opacity-0 cursor-pointer"
            />
            <Button
              type="button"
              variant="outline"
              disabled={isUploading}
            >
              {isUploading ? 'Uploading...' : 'Upload'}
            </Button>
          </div>
        </div>
      </div>

      {imageUrl && (
        <div className="mt-4">
          <p className="text-sm text-muted-foreground mb-2">Preview:</p>
          <div className="border rounded-md overflow-hidden h-40 bg-gray-50 dark:bg-gray-900">
            <img
              src={imageUrl}
              alt="Banner preview"
              className="w-full h-full object-contain"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default BannerImageUpload;
