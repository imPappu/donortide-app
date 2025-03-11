
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Plus, Edit, Trash, Eye } from 'lucide-react';
import BannerForm from './BannerForm';
import { Banner } from '@/types/apiTypes';
import { getBanners, deleteBanner, createBanner, updateBanner } from '@/services/bannerService';
import { useToast } from '@/hooks/use-toast';

const BannerManagement = () => {
  const [banners, setBanners] = useState<Banner[]>([]);
  const [isAddingBanner, setIsAddingBanner] = useState(false);
  const [editingBanner, setEditingBanner] = useState<Banner | null>(null);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  // Derived states for active and past banners
  const activeBanners = banners.filter(banner => banner.isActive);
  const pastBanners = banners.filter(banner => !banner.isActive);

  useEffect(() => {
    fetchBanners();
  }, []);

  const fetchBanners = async () => {
    setLoading(true);
    try {
      const data = await getBanners();
      setBanners(data);
    } catch (error) {
      console.error('Error fetching banners:', error);
      toast({
        title: 'Error',
        description: 'Failed to load banners',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleAddBanner = () => {
    setIsAddingBanner(true);
    setEditingBanner(null);
  };

  const handleEditBanner = (banner: Banner) => {
    setEditingBanner(banner);
    setIsAddingBanner(false);
  };

  const handleDeleteBanner = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this banner?')) {
      setLoading(true);
      try {
        await deleteBanner(id);
        setBanners(banners.filter(banner => banner.id !== id));
        toast({
          title: 'Success',
          description: 'Banner deleted successfully',
        });
      } catch (error) {
        console.error('Error deleting banner:', error);
        toast({
          title: 'Error',
          description: 'Failed to delete banner',
          variant: 'destructive',
        });
      } finally {
        setLoading(false);
      }
    }
  };

  const handleBannerSubmit = async (banner: Banner) => {
    setLoading(true);
    try {
      if (banner.id && banners.some(b => b.id === banner.id)) {
        // Update existing banner
        await updateBanner(banner.id, banner);
        setBanners(banners.map(b => b.id === banner.id ? banner : b));
        setEditingBanner(null);
        toast({
          title: 'Success',
          description: 'Banner updated successfully',
        });
      } else {
        // Create new banner
        const newBanner = await createBanner(banner);
        setBanners([...banners, newBanner || banner]);
        setIsAddingBanner(false);
        toast({
          title: 'Success',
          description: 'Banner created successfully',
        });
      }
    } catch (error) {
      console.error('Error saving banner:', error);
      toast({
        title: 'Error',
        description: 'Failed to save banner',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setIsAddingBanner(false);
    setEditingBanner(null);
  };

  if (isAddingBanner) {
    return <BannerForm onSubmit={handleBannerSubmit} onCancel={handleCancel} isLoading={loading} />;
  }

  if (editingBanner) {
    return <BannerForm banner={editingBanner} onSubmit={handleBannerSubmit} onCancel={handleCancel} isLoading={loading} />;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Banner Management</h2>
        <Button onClick={handleAddBanner} className="flex items-center gap-1">
          <Plus className="h-4 w-4" />
          Add Banner
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Active Banners</CardTitle>
        </CardHeader>
        <CardContent>
          {activeBanners.length > 0 ? (
            <div className="space-y-4">
              {activeBanners.map(banner => (
                <div key={banner.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center gap-3">
                    {banner.imageUrl && (
                      <img src={banner.imageUrl} alt={banner.title} className="h-16 w-16 object-cover rounded" />
                    )}
                    <div>
                      <h3 className="font-medium">{banner.title}</h3>
                      <p className="text-sm text-muted-foreground">{banner.displayOrder && `Order: ${banner.displayOrder}`}</p>
                      <p className="text-sm text-muted-foreground">{banner.linkUrl && `Link: ${banner.linkUrl}`}</p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" onClick={() => handleEditBanner(banner)}>
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button variant="destructive" size="sm" onClick={() => handleDeleteBanner(banner.id)}>
                      <Trash className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center py-8 text-muted-foreground">No active banners</p>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Past Banners</CardTitle>
        </CardHeader>
        <CardContent>
          {pastBanners.length > 0 ? (
            <div className="space-y-4">
              {pastBanners.map(banner => (
                <div key={banner.id} className="flex items-center justify-between p-4 border rounded-lg opacity-70">
                  <div className="flex items-center gap-3">
                    {banner.imageUrl && (
                      <img src={banner.imageUrl} alt={banner.title} className="h-16 w-16 object-cover rounded" />
                    )}
                    <div>
                      <h3 className="font-medium">{banner.title}</h3>
                      <p className="text-sm text-muted-foreground">Inactive</p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" onClick={() => handleEditBanner(banner)}>
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button variant="destructive" size="sm" onClick={() => handleDeleteBanner(banner.id)}>
                      <Trash className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center py-8 text-muted-foreground">No past banners</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default BannerManagement;
