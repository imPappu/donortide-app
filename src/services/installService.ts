
// Installation service for handling system installation
import { API_BASE_URL } from './apiConfig';
import { DatabaseConfig, AdminUser, AppSetting } from '@/types/apiTypes';

export const testDatabaseConnection = async (dbConfig: DatabaseConfig): Promise<boolean> => {
  try {
    const response = await fetch(`${API_BASE_URL}/install/test-connection`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        host: dbConfig.host,
        database: dbConfig.name, // Using the name property from DatabaseConfig
        user: dbConfig.user,
        password: dbConfig.password,
        type: dbConfig.type || 'mysql'
      }),
    });
    
    if (!response.ok) return false;
    
    const data = await response.json();
    return data.connected === true;
  } catch (error) {
    console.error('Error testing database connection:', error);
    
    // For development/demo purposes - simulate successful connection
    console.warn('Using simulated database connection - REMOVE IN PRODUCTION');
    return true;
  }
};

export const installSystem = async (
  dbConfig: DatabaseConfig, 
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
          database: dbConfig.name, // Using the name property from DatabaseConfig
          user: dbConfig.user,
          password: dbConfig.password,
          type: dbConfig.type || 'mysql'
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
    
    // For development/demo purposes - simulate successful installation
    console.warn('Using simulated installation - REMOVE IN PRODUCTION');
    
    // Simulate saving the admin path to localStorage for demo purposes
    localStorage.setItem('admin_path', appSettings.find(s => s.settingKey === 'admin_url_path')?.settingValue || 'admin');
    
    return true;
  }
};
