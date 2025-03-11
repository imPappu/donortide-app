
// Just updating the problematic sections using the correct property names
import React from 'react';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Banner } from "@/types/apiTypes";

interface BannerBasicFieldsProps {
  banner: Partial<Banner>;
  onChange: (field: string, value: any) => void;
}

const BannerBasicFields = ({ banner, onChange }: BannerBasicFieldsProps) => {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="title">Banner Title</Label>
        <Input 
          id="title" 
          placeholder="Enter banner title" 
          value={banner.title || ''} 
          onChange={(e) => onChange('title', e.target.value)}
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="content">Banner Content</Label>
        <Textarea 
          id="content" 
          placeholder="Enter banner content" 
          value={banner.content || ''} 
          onChange={(e) => onChange('content', e.target.value)}
          rows={3}
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="description">Description (Internal)</Label>
        <Input 
          id="description" 
          placeholder="Internal description for this banner" 
          value={banner.description || ''} 
          onChange={(e) => onChange('description', e.target.value)}
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="link">Link Text</Label>
        <Input 
          id="link" 
          placeholder="Button/link text" 
          value={banner.link || ''} 
          onChange={(e) => onChange('link', e.target.value)}
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="linkUrl">Link URL</Label>
        <Input 
          id="linkUrl" 
          placeholder="https://example.com/page" 
          value={banner.linkUrl || ''} 
          onChange={(e) => onChange('linkUrl', e.target.value)}
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="displayOrder">Display Order</Label>
        <Input 
          id="displayOrder" 
          type="number" 
          placeholder="1" 
          value={banner.displayOrder || ''} 
          onChange={(e) => onChange('displayOrder', parseInt(e.target.value) || 0)}
        />
        <p className="text-sm text-muted-foreground">Lower numbers display first</p>
      </div>
    </div>
  );
};

export default BannerBasicFields;
