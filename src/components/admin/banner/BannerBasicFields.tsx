
import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Banner } from '@/types/apiTypes';

export interface BannerBasicFieldsProps {
  formData: Partial<Banner>;
  onChange: (field: string, value: any) => void;
}

const BannerBasicFields: React.FC<BannerBasicFieldsProps> = ({ formData, onChange }) => {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    onChange(name, value);
  };

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="title">Banner Title</Label>
        <Input
          id="title"
          name="title"
          value={formData.title || ''}
          onChange={handleInputChange}
          placeholder="Enter banner title"
          required
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="content">Banner Content</Label>
        <Textarea
          id="content"
          name="content"
          value={formData.content || ''}
          onChange={handleInputChange}
          placeholder="Enter banner content"
          required
          rows={3}
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="description">Banner Description (Optional)</Label>
        <Textarea
          id="description"
          name="description"
          value={formData.description || ''}
          onChange={handleInputChange}
          placeholder="Enter banner description"
          rows={2}
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="link">Button Text (Optional)</Label>
        <Input
          id="link"
          name="link"
          value={formData.link || ''}
          onChange={handleInputChange}
          placeholder="E.g., Learn More, Register Now"
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="linkUrl">Button URL (Optional)</Label>
        <Input
          id="linkUrl"
          name="linkUrl"
          value={formData.linkUrl || ''}
          onChange={handleInputChange}
          placeholder="E.g., /blog, https://example.com"
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="displayOrder">Display Order</Label>
        <Input
          id="displayOrder"
          name="displayOrder"
          type="number"
          value={formData.displayOrder || 0}
          onChange={handleInputChange}
          min={0}
        />
      </div>
    </div>
  );
};

export default BannerBasicFields;
