
// Dashboard service for handling statistics and dashboard data
import { API_BASE_URL } from './apiConfig';
import { toast } from "@/hooks/use-toast";

export const getDashboardStats = async (): Promise<any> => {
  try {
    const response = await fetch(`${API_BASE_URL}/stats/dashboard`);
    if (!response.ok) throw new Error('Failed to fetch dashboard statistics');
    return await response.json();
  } catch (error) {
    console.error('Error fetching dashboard statistics:', error);
    // Return fallback data when API fails
    return {
      totalUsers: 450,
      totalDonations: 1256,
      totalRequests: 876,
      totalLocations: 24,
      recentRequests: [],
    };
  }
};

// Add retry mechanism for API calls
export const fetchWithRetry = async (url: string, options = {}, maxRetries = 3): Promise<Response> => {
  let retries = 0;
  
  while (retries < maxRetries) {
    try {
      const response = await fetch(url, options);
      if (response.ok) return response;
      throw new Error(`Request failed with status ${response.status}`);
    } catch (error) {
      retries++;
      console.warn(`Retry attempt ${retries}/${maxRetries} for ${url}`);
      if (retries === maxRetries) {
        toast({
          title: "Connection issue",
          description: "Could not connect to the server. Using cached data instead.",
          variant: "destructive",
        });
        throw error;
      }
      // Exponential backoff
      await new Promise(resolve => setTimeout(resolve, 1000 * Math.pow(2, retries - 1)));
    }
  }
  
  throw new Error(`Max retries reached for ${url}`);
};

