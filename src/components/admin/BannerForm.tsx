
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Banner } from '@/services/dbService';
import { useToast } from '@/hooks/use-toast';

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.title || !formData.imageUrl) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }
    
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
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
        <Label htmlFor="imageUrl">Image URL *</Label>
        <Input 
          id="imageUrl" 
          name="imageUrl" 
          value={formData.imageUrl} 
          onChange={handleChange} 
          required 
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
