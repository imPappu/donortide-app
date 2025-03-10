
import React from 'react';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Banner } from '@/types/apiTypes';

interface BannerBasicFieldsProps {
  formData: Banner;
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  handleNumberChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const BannerBasicFields = ({ 
  formData, 
  handleChange,
  handleNumberChange
}: BannerBasicFieldsProps) => {
  return (
    <>
      <div className="space-y-2">
        <Label htmlFor="title">Title *</Label>
        <Input 
          id="title" 
          name="title" 
          value={formData.title} 
          onChange={handleChange} 
          required 
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <textarea 
          id="description" 
          name="description" 
          value={formData.description || ''} 
          onChange={handleChange} 
          className="w-full px-3 py-2 border border-gray-300 rounded-md min-h-[100px]"
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="linkUrl">Link URL</Label>
        <Input 
          id="linkUrl" 
          name="linkUrl" 
          value={formData.linkUrl || ''} 
          onChange={handleChange} 
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="displayOrder">Display Order</Label>
        <Input 
          id="displayOrder" 
          name="displayOrder" 
          type="number" 
          value={formData.displayOrder?.toString() || '0'} 
          onChange={handleNumberChange} 
        />
      </div>
    </>
  );
};

export default BannerBasicFields;
