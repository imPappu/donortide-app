
// Dashboard service for handling statistics and dashboard data
import { API_BASE_URL } from './apiConfig';

export const getDashboardStats = async (): Promise<any> => {
  try {
    const response = await fetch(`${API_BASE_URL}/stats/dashboard`);
    if (!response.ok) throw new Error('Failed to fetch dashboard statistics');
    return await response.json();
  } catch (error) {
    console.error('Error fetching dashboard statistics:', error);
    return {
      totalUsers: 0,
      totalDonations: 0,
      totalRequests: 0,
      totalLocations: 0,
      recentRequests: [],
    };
  }
};
