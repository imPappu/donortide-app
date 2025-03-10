
// Donor service for handling donor operations
import { API_BASE_URL } from './apiConfig';
import { Donor } from '@/types/apiTypes';

export const getDonors = async (): Promise<Donor[]> => {
  try {
    const response = await fetch(`${API_BASE_URL}/donors`);
    if (!response.ok) throw new Error('Failed to fetch donors');
    return await response.json();
  } catch (error) {
    console.error('Error fetching donors:', error);
    return [];
  }
};

export const registerDonor = async (donor: Donor): Promise<Donor | null> => {
  try {
    const response = await fetch(`${API_BASE_URL}/donors`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(donor),
    });
    
    if (!response.ok) throw new Error('Failed to register donor');
    return await response.json();
  } catch (error) {
    console.error('Error registering donor:', error);
    return null;
  }
};

export const updateDonor = async (id: string, donor: Partial<Donor>): Promise<Donor | null> => {
  try {
    const response = await fetch(`${API_BASE_URL}/donors/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(donor),
    });
    
    if (!response.ok) throw new Error('Failed to update donor');
    return await response.json();
  } catch (error) {
    console.error('Error updating donor:', error);
    return null;
  }
};

export const deleteDonor = async (id: string): Promise<boolean> => {
  try {
    const response = await fetch(`${API_BASE_URL}/donors/${id}`, {
      method: 'DELETE',
    });
    
    if (!response.ok) throw new Error('Failed to delete donor');
    return true;
  } catch (error) {
    console.error('Error deleting donor:', error);
    return false;
  }
};
