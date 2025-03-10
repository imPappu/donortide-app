
// Settings service for handling app settings
import { API_BASE_URL } from './apiConfig';
import { AppSetting } from '@/types/apiTypes';

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

export const updateAppSetting = async (key: string, value: string, description?: string): Promise<AppSetting | null> => {
  try {
    const payload: { settingValue: string; description?: string } = { settingValue: value };
    if (description) {
      payload.description = description;
    }
    
    const response = await fetch(`${API_BASE_URL}/settings/${key}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });
    
    if (!response.ok) throw new Error('Failed to update app setting');
    return await response.json();
  } catch (error) {
    console.error('Error updating app setting:', error);
    return null;
  }
};
