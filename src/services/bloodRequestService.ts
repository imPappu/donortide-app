
// Blood Request service for handling blood request operations
import { API_BASE_URL } from './apiConfig';
import { BloodRequest } from '@/types/apiTypes';

export const getBloodRequests = async (): Promise<BloodRequest[]> => {
  try {
    const response = await fetch(`${API_BASE_URL}/requests`);
    if (!response.ok) throw new Error('Failed to fetch blood requests');
    return await response.json();
  } catch (error) {
    console.error('Error fetching blood requests:', error);
    return [];
  }
};

export const createBloodRequest = async (request: BloodRequest): Promise<BloodRequest | null> => {
  try {
    const response = await fetch(`${API_BASE_URL}/requests`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(request),
    });
    
    if (!response.ok) throw new Error('Failed to create blood request');
    return await response.json();
  } catch (error) {
    console.error('Error creating blood request:', error);
    return null;
  }
};

export const updateBloodRequest = async (id: string, request: Partial<BloodRequest>): Promise<BloodRequest | null> => {
  try {
    const response = await fetch(`${API_BASE_URL}/requests/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(request),
    });
    
    if (!response.ok) throw new Error('Failed to update blood request');
    return await response.json();
  } catch (error) {
    console.error('Error updating blood request:', error);
    return null;
  }
};

export const deleteBloodRequest = async (id: string): Promise<boolean> => {
  try {
    const response = await fetch(`${API_BASE_URL}/requests/${id}`, {
      method: 'DELETE',
    });
    
    if (!response.ok) throw new Error('Failed to delete blood request');
    return true;
  } catch (error) {
    console.error('Error deleting blood request:', error);
    return false;
  }
};
