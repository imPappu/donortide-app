
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Banner } from '@/services/dbService';
import { useToast } from '@/hooks/use-toast';
import BannerBasicFields from './banner/BannerBasicFields';
import BannerImageUpload from './banner/BannerImageUpload';

interface BannerFormProps {
  initialData?: Banner;
  onSubmit: (data: Banner) => void;
  onCancel: () => void;
}

const BannerForm = ({ initialData, onSubmit, onCancel }: BannerFormProps) => {
  const { toast } = useToast();
  const [formData, setFormData] = useState<Banner>(
    initialData || {
      title: '',
      description: '',
      imageUrl: '',
      linkUrl: '',
      active: true,
      displayOrder: 0
    }
  );
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>(initialData?.imageUrl || '');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: parseInt(value) }));
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setFormData(prev => ({ ...prev, [name]: checked }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImageFile(file);
      
      // Create a preview URL
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.title) {
      toast({
        title: "Error",
        description: "Please enter a banner title",
        variant: "destructive",
      });
      return;
    }
    
    // Handle image upload
    if (imageFile) {
      try {
        // In a real implementation, you would upload the image to your server here
        // For now, we'll simulate by setting the imageUrl to the file name
        const fileName = `/lovable-uploads/${Date.now()}-${imageFile.name}`;
        
        // Update form data with the new image URL
        setFormData(prev => ({ ...prev, imageUrl: fileName }));
        
        // Submit the form with the updated imageUrl
        onSubmit({
          ...formData,
          imageUrl: fileName
        });
      } catch (error) {
        console.error('Error uploading image:', error);
        toast({
          title: "Error",
          description: "Failed to upload image",
          variant: "destructive",
        });
      }
    } else if (!previewUrl && !formData.imageUrl) {
      toast({
        title: "Error",
        description: "Please select an image for the banner",
        variant: "destructive",
      });
      return;
    } else {
      // No new image, submit with existing data
      onSubmit(formData);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <BannerBasicFields
        formData={formData}
        handleChange={handleChange}
        handleNumberChange={handleNumberChange}
      />
      
      <BannerImageUpload
        previewUrl={previewUrl}
        handleImageChange={handleImageChange}
      />
      
      <div className="flex items-center space-x-2">
        <input 
          type="checkbox" 
          id="active" 
          name="active" 
          checked={formData.active} 
          onChange={handleCheckboxChange} 
          className="w-4 h-4"
        />
        <Label htmlFor="active">Active</Label>
      </div>
      
      <div className="flex justify-end space-x-2">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit">
          {initialData ? 'Update' : 'Create'} Banner
        </Button>
      </div>
    </form>
  );
};

export default BannerForm;
