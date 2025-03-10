import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Edit, Trash2, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from '@/hooks/use-toast';
import { Banner } from "@/types/apiTypes";
import { createBanner, updateBanner, deleteBanner } from "@/services/bannerService";
import BannerForm from "@/components/admin/BannerForm";

interface BannerManagementProps {
  banners: Banner[];
  setBanners: React.Dispatch<React.SetStateAction<Banner[]>>;
}

const BannerManagement = ({ banners, setBanners }: BannerManagementProps) => {
  const { toast } = useToast();
  const [editingBanner, setEditingBanner] = useState<Banner | null>(null);
  const [showBannerForm, setShowBannerForm] = useState(false);

  const handleAddBanner = () => {
    setEditingBanner(null);
    setShowBannerForm(true);
  };

  const handleEditBanner = (banner: Banner) => {
    setEditingBanner(banner);
    setShowBannerForm(true);
  };

  const handleDeleteBanner = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this banner?')) {
      try {
        await deleteBanner(id);
        setBanners(prevBanners => prevBanners.filter(banner => banner.id !== id));
        toast({
          title: "Success",
          description: "Banner deleted successfully",
        });
      } catch (error) {
        console.error('Error deleting banner:', error);
        toast({
          title: "Error",
          description: "Failed to delete banner",
          variant: "destructive",
        });
      }
    }
  };

  const handleBannerSubmit = async (data: Banner) => {
    try {
      if (editingBanner?.id) {
        const updated = await updateBanner(editingBanner.id, data);
        if (updated) {
          setBanners(prevBanners => 
            prevBanners.map(banner => banner.id === editingBanner.id ? updated : banner)
          );
          toast({
            title: "Success",
            description: "Banner updated successfully",
          });
        }
      } else {
        const newBanner = await createBanner(data);
        if (newBanner) {
          setBanners(prevBanners => [newBanner, ...prevBanners]);
          toast({
            title: "Success",
            description: "Banner created successfully",
          });
        }
      }
      setShowBannerForm(false);
    } catch (error) {
      console.error('Error saving banner:', error);
      toast({
        title: "Error",
        description: "Failed to save banner",
        variant: "destructive",
      });
    }
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Banner Management</CardTitle>
        <Button onClick={handleAddBanner}>
          <Plus className="h-4 w-4 mr-2" />
          Add New Banner
        </Button>
      </CardHeader>
      <CardContent>
        {showBannerForm ? (
          <BannerForm 
            initialData={editingBanner || undefined}
            onSubmit={handleBannerSubmit}
            onCancel={() => setShowBannerForm(false)}
          />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {banners.map((banner) => (
              <Card key={banner.id} className="overflow-hidden">
                <div className="relative h-40">
                  <img src={banner.imageUrl} alt={banner.title} className="w-full h-full object-cover" />
                  <div className="absolute top-2 right-2 flex gap-1">
                    <Button variant="outline" size="sm" className="h-7 w-7 p-0 bg-white" onClick={() => handleEditBanner(banner)}>
                      <Edit className="h-3 w-3" />
                    </Button>
                    <Button variant="outline" size="sm" className="h-7 w-7 p-0 bg-white" onClick={() => handleDeleteBanner(banner.id!)}>
                      <Trash2 className="h-3 w-3 text-red-500" />
                    </Button>
                  </div>
                  {!banner.active && (
                    <div className="absolute top-2 left-2 bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded">
                      Inactive
                    </div>
                  )}
                </div>
                <CardContent className="p-3">
                  <h3 className="font-medium">{banner.title}</h3>
                  <p className="text-xs text-muted-foreground">Order: {banner.displayOrder}</p>
                  {banner.linkUrl && (
                    <p className="text-xs truncate text-blue-500">{banner.linkUrl}</p>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default BannerManagement;
