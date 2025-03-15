
import { API_BASE_URL } from './apiConfig';
import { MatchingAlgorithmParams, AlgorithmPerformanceMetrics, DonorLeaderboardEntry } from '@/types/algorithmTypes';

// Get current algorithm parameters
export const getAlgorithmParams = async (): Promise<MatchingAlgorithmParams> => {
  try {
    const response = await fetch(`${API_BASE_URL}/algorithm/params`);
    if (!response.ok) throw new Error('Failed to fetch algorithm parameters');
    return await response.json();
  } catch (error) {
    console.error('Error fetching algorithm parameters:', error);
    // Return default values if API fails
    return {
      rusWeight: 1.5,
      drsWeight: 1.2,
      distanceWeight: 0.8
    };
  }
};

// Update algorithm parameters
export const updateAlgorithmParams = async (params: MatchingAlgorithmParams): Promise<boolean> => {
  try {
    const response = await fetch(`${API_BASE_URL}/algorithm/params`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(params),
    });
    
    if (!response.ok) throw new Error('Failed to update algorithm parameters');
    return true;
  } catch (error) {
    console.error('Error updating algorithm parameters:', error);
    return false;
  }
};

// Get algorithm performance metrics
export const getAlgorithmPerformance = async (): Promise<AlgorithmPerformanceMetrics> => {
  try {
    const response = await fetch(`${API_BASE_URL}/algorithm/performance`);
    if (!response.ok) throw new Error('Failed to fetch algorithm performance');
    return await response.json();
  } catch (error) {
    console.error('Error fetching algorithm performance:', error);
    // Return mock data if API fails
    return {
      averageMatchScore: 78.5,
      successRate: 0.82,
      averageResponseTime: 3.2,
      matchCount: 156,
      rusAverage: 7.8,
      drsAverage: 6.5,
      recentMatches: [
        {
          requestId: 'r-1001',
          donorId: 'd-2001',
          matchScore: 85.2,
          timestamp: new Date().toISOString(),
          wasSuccessful: true
        },
        {
          requestId: 'r-1002',
          donorId: 'd-2005',
          matchScore: 79.1,
          timestamp: new Date(Date.now() - 86400000).toISOString(),
          wasSuccessful: true
        },
        {
          requestId: 'r-1003',
          donorId: 'd-2002',
          matchScore: 68.7,
          timestamp: new Date(Date.now() - 172800000).toISOString(),
          wasSuccessful: false
        }
      ]
    };
  }
};

// Get donor leaderboard based on donation readiness score
export const getDonorLeaderboard = async (limit: number = 10): Promise<DonorLeaderboardEntry[]> => {
  try {
    const response = await fetch(`${API_BASE_URL}/algorithm/leaderboard?limit=${limit}`);
    if (!response.ok) throw new Error('Failed to fetch donor leaderboard');
    return await response.json();
  } catch (error) {
    console.error('Error fetching donor leaderboard:', error);
    // Return mock data if API fails
    return [
      {
        id: '1',
        name: 'Sarah Johnson',
        bloodType: 'O-',
        drs: 92.5,
        donationCount: 24,
        lastDonation: new Date(Date.now() - 30 * 86400000).toISOString(),
        avatar: 'https://randomuser.me/api/portraits/women/12.jpg'
      },
      {
        id: '2',
        name: 'Michael Chen',
        bloodType: 'A+',
        drs: 88.3,
        donationCount: 18,
        lastDonation: new Date(Date.now() - 45 * 86400000).toISOString(),
        avatar: 'https://randomuser.me/api/portraits/men/22.jpg'
      },
      {
        id: '3',
        name: 'Elena Rodriguez',
        bloodType: 'B+',
        drs: 85.7,
        donationCount: 15,
        lastDonation: new Date(Date.now() - 60 * 86400000).toISOString(),
        avatar: 'https://randomuser.me/api/portraits/women/33.jpg'
      },
      {
        id: '4',
        name: 'David Kim',
        bloodType: 'AB-',
        drs: 82.1,
        donationCount: 12,
        lastDonation: new Date(Date.now() - 80 * 86400000).toISOString(),
        avatar: 'https://randomuser.me/api/portraits/men/45.jpg'
      },
      {
        id: '5',
        name: 'Olivia Wilson',
        bloodType: 'O+',
        drs: 79.8,
        donationCount: 10,
        lastDonation: new Date(Date.now() - 100 * 86400000).toISOString(),
        avatar: 'https://randomuser.me/api/portraits/women/67.jpg'
      }
    ];
  }
};

// Calculate request urgency score
export const calculateRequestUrgencyScore = (requestData: any): number => {
  const urgencyMultipliers: Record<string, number> = {
    'critical': 2.0,
    'urgent': 1.5,
    'standard': 1.0
  };
  
  // Extract needed data
  const { urgency = 'standard', bloodType, createdAt } = requestData;
  const ageInHours = (Date.now() - new Date(createdAt).getTime()) / (1000 * 60 * 60);
  
  // Blood rarity factor
  const rarityFactor = getRarityFactor(bloodType);
  
  // Time factor - more urgent as the request gets older
  const timeFactor = Math.min(ageInHours / 24, 1.5);
  
  // Calculate base score
  const urgencyMultiplier = urgencyMultipliers[urgency.toLowerCase()] || 1.0;
  const baseScore = 5.0 * urgencyMultiplier;
  
  // Final score calculation
  const finalScore = baseScore * (1 + rarityFactor) * (1 + timeFactor);
  
  // Return normalized score (0-100)
  return Math.min(Math.round(finalScore * 10), 100);
};

// Helper function to get blood type rarity factor
const getRarityFactor = (bloodType: string): number => {
  const rarityMap: Record<string, number> = {
    'O-': 0.5,  // Rarest, universal donor
    'AB+': 0.4, // Rarest, universal recipient
    'B-': 0.3,
    'AB-': 0.3,
    'A-': 0.2,
    'B+': 0.1,
    'A+': 0.05,
    'O+': 0.0   // Most common
  };
  
  return rarityMap[bloodType.toUpperCase()] || 0.0;
};
