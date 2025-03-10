
// Banner service for handling banner operations
import { API_BASE_URL } from './apiConfig';
import { Banner } from '@/types/apiTypes';

export const getBanners = async (): Promise<Banner[]> => {
  try {
    const response = await fetch(`${API_BASE_URL}/banners`);
    if (!response.ok) throw new Error('Failed to fetch banners');
    return await response.json();
  } catch (error) {
    console.error('Error fetching banners:', error);
    return [];
  }
};

export const createBanner = async (banner: Banner): Promise<Banner | null> => {
  try {
    const response = await fetch(`${API_BASE_URL}/banners`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(banner),
    });
    
    if (!response.ok) throw new Error('Failed to create banner');
    return await response.json();
  } catch (error) {
    console.error('Error creating banner:', error);
    return null;
  }
};

export const updateBanner = async (id: string, banner: Partial<Banner>): Promise<Banner | null> => {
  try {
    const response = await fetch(`${API_BASE_URL}/banners/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(banner),
    });
    
    if (!response.ok) throw new Error('Failed to update banner');
    return await response.json();
  } catch (error) {
    console.error('Error updating banner:', error);
    return null;
  }
};

export const deleteBanner = async (id: string): Promise<boolean> => {
  try {
    const response = await fetch(`${API_BASE_URL}/banners/${id}`, {
      method: 'DELETE',
    });
    
    if (!response.ok) throw new Error('Failed to delete banner');
    return true;
  } catch (error) {
    console.error('Error deleting banner:', error);
    return false;
  }
};
