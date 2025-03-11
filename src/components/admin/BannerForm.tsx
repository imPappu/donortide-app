
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from '@/hooks/use-toast';
import { Banner } from '@/types/apiTypes';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import BannerBasicFields from './banner/BannerBasicFields';
import BannerImageUpload from './banner/BannerImageUpload';

interface BannerFormProps {
  banner?: Partial<Banner>;
  onSubmit: (banner: Banner) => void;
  onCancel: () => void;
  isLoading?: boolean;
}

const BannerForm = ({ banner, onSubmit, onCancel, isLoading = false }: BannerFormProps) => {
  const { toast } = useToast();
  const [formData, setFormData] = useState<Partial<Banner>>(
    banner || {
      title: '',
      content: '',
      imageUrl: '',
      link: '',
      description: '',
      linkUrl: '', 
      displayOrder: 0,
      isActive: true,
      startDate: new Date().toISOString(),
    }
  );

  const handleFieldChange = (field: string, value: any) => {
    setFormData({
      ...formData,
      [field]: value,
    });
  };

  const handleImageUpload = (imageUrl: string) => {
    setFormData({
      ...formData,
      imageUrl,
    });
  };

  const handleSwitchChange = (checked: boolean) => {
    setFormData({
      ...formData,
      isActive: checked,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.title) {
      toast({
        title: "Error",
        description: "Banner title is required",
        variant: "destructive",
      });
      return;
    }

    if (!formData.content) {
      toast({
        title: "Error",
        description: "Banner content is required",
        variant: "destructive",
      });
      return;
    }

    if (formData.id) {
      onSubmit(formData as Banner);
    } else {
      // Create new banner
      const newBanner: Banner = {
        ...formData,
        id: crypto.randomUUID(),
        createdAt: new Date().toISOString(),
      } as Banner;
      
      onSubmit(newBanner);
    }
  };

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle>{banner?.id ? 'Edit Banner' : 'Create New Banner'}</CardTitle>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-6">
          <BannerBasicFields 
            formData={formData}
            onChange={handleFieldChange}
          />
          
          <BannerImageUpload 
            currentImage={formData.imageUrl}
            onImageUpload={handleImageUpload}
          />
          
          <div className="flex items-center space-x-2">
            <Switch
              id="banner-active"
              checked={formData.isActive}
              onCheckedChange={handleSwitchChange}
            />
            <Label htmlFor="banner-active">Banner Active</Label>
          </div>
        </CardContent>
        <CardFooter className="flex justify-end space-x-2">
          <Button 
            variant="outline" 
            onClick={onCancel}
            type="button"
          >
            Cancel
          </Button>
          <Button 
            type="submit"
            disabled={isLoading}
          >
            {isLoading ? 'Saving...' : (banner?.id ? 'Update Banner' : 'Create Banner')}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
};

export default BannerForm;
