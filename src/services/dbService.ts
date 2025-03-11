
// Database service for handling database-related operations

import { API_BASE_URL, DB_CONFIG } from './apiConfig';
import { Donor, BloodRequest, AppSetting } from '@/types/apiTypes';

// Define an interface for admin user
export interface AdminUser {
  username: string;
  email: string;
  password: string;
}

// Test database connection
export const testDatabaseConnection = async (config = DB_CONFIG): Promise<boolean> => {
  try {
    const response = await fetch(`${API_BASE_URL}/install/test-connection`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        host: config.host,
        database: config.name,
        user: config.user,
        password: config.password
      }),
    });
    
    if (!response.ok) return false;
    
    const data = await response.json();
    return data.connected === true;
  } catch (error) {
    console.error('Error testing database connection:', error);
    return false;
  }
};

// Install the system with provided configuration
export const installSystem = async (
  dbConfig = DB_CONFIG,
  adminUser: AdminUser,
  appSettings: AppSetting[]
): Promise<boolean> => {
  try {
    const response = await fetch(`${API_BASE_URL}/install`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        database: {
          host: dbConfig.host,
          database: dbConfig.name,
          user: dbConfig.user,
          password: dbConfig.password
        },
        admin: adminUser,
        settings: appSettings
      }),
    });
    
    if (!response.ok) return false;
    
    const data = await response.json();
    return data.success === true;
  } catch (error) {
    console.error('Error installing system:', error);
    return false;
  }
};

// Create admin user
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
    return false;
  }
};

// Get app settings
export const getAppSettings = async (): Promise<AppSetting[]> => {
  try {
    const response = await fetch(`${API_BASE_URL}/settings`);
    if (!response.ok) throw new Error('Failed to fetch app settings');
    return await response.json();
  } catch (error) {
    console.error('Error fetching app settings:', error);
    return [];
  }
};

// Get dashboard statistics
export const getDashboardStats = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/stats/dashboard`);
    if (!response.ok) throw new Error('Failed to fetch dashboard statistics');
    return await response.json();
  } catch (error) {
    console.error('Error fetching dashboard statistics:', error);
    throw error;
  }
};

// Get recent blood requests
export const getRecentRequests = async (): Promise<BloodRequest[]> => {
  try {
    const response = await fetch(`${API_BASE_URL}/requests?limit=5`);
    if (!response.ok) throw new Error('Failed to fetch recent requests');
    return await response.json();
  } catch (error) {
    console.error('Error fetching recent requests:', error);
    return [];
  }
};

// Get top donors
export const getTopDonors = async (): Promise<Donor[]> => {
  try {
    const response = await fetch(`${API_BASE_URL}/donors/top`);
    if (!response.ok) throw new Error('Failed to fetch top donors');
    return await response.json();
  } catch (error) {
    console.error('Error fetching top donors:', error);
    return [];
  }
};
