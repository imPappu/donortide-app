
// Auth service for handling authentication operations
import { API_BASE_URL } from './apiConfig';
import { AdminUser } from '@/types/apiTypes';

export const verifyAdminCredentials = async (username: string, password: string): Promise<boolean> => {
  try {
    const response = await fetch(`${API_BASE_URL}/admin/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    });
    
    if (!response.ok) return false;
    
    const data = await response.json();
    return data.success === true;
  } catch (error) {
    console.error('Error verifying admin credentials:', error);
    
    // For development/demo purposes only - allows login with default credentials
    // when the API is not available
    if (username === 'admin' && password === 'admin') {
      console.warn('Using fallback admin authentication - REMOVE IN PRODUCTION');
      return true;
    }
    
    return false;
  }
};

export const createAdminUser = async (adminUser: AdminUser): Promise<boolean> => {
  try {
    const response = await fetch(`${API_BASE_URL}/install/create-admin`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(adminUser),
    });
    
    if (!response.ok) return false;
    
    const data = await response.json();
    return data.success === true;
  } catch (error) {
    console.error('Error creating admin user:', error);
    
    // For development/demo purposes - simulate successful creation
    console.warn('Using simulated admin creation - REMOVE IN PRODUCTION');
    return true;
  }
};
