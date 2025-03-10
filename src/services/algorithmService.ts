
import { API_BASE_URL } from './apiConfig';
import { 
  RequestUrgencyScoreParams, 
  DonorReadinessScoreParams, 
  MatchingAlgorithmParams,
  AlgorithmFeedback,
  AlgorithmPerformanceMetrics,
  DonorLeaderboardEntry
} from '@/types/algorithmTypes';
import { calculateRUS, calculateDRS, calculateMatchingScore } from '@/utils/algorithmUtils';
import { Donor, BloodRequest } from '@/types/apiTypes';

// Default algorithm weights
const DEFAULT_ALGORITHM_PARAMS: MatchingAlgorithmParams = {
  rusWeight: 1.5,
  drsWeight: 1.2,
  distanceWeight: 0.8
};

// Get current algorithm parameters
export const getAlgorithmParams = async (): Promise<MatchingAlgorithmParams> => {
  try {
    const response = await fetch(`${API_BASE_URL}/algorithm/params`);
    if (!response.ok) throw new Error('Failed to fetch algorithm parameters');
    return await response.json();
  } catch (error) {
    console.error('Error fetching algorithm parameters:', error);
    // Return default values if API fails
    return DEFAULT_ALGORITHM_PARAMS;
  }
};

// Update algorithm parameters
export const updateAlgorithmParams = async (params: MatchingAlgorithmParams): Promise<MatchingAlgorithmParams> => {
  try {
    const response = await fetch(`${API_BASE_URL}/algorithm/params`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(params),
    });
    if (!response.ok) throw new Error('Failed to update algorithm parameters');
    return await response.json();
  } catch (error) {
    console.error('Error updating algorithm parameters:', error);
    // Return the input parameters as a fallback
    return params;
  }
};

// Submit feedback for a match
export const submitMatchFeedback = async (feedback: AlgorithmFeedback): Promise<boolean> => {
  try {
    const response = await fetch(`${API_BASE_URL}/algorithm/feedback`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(feedback),
    });
    if (!response.ok) throw new Error('Failed to submit match feedback');
    return true;
  } catch (error) {
    console.error('Error submitting match feedback:', error);
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
    // Return mock data for development
    return {
      averageMatchScore: 72.4,
      successRate: 0.85,
      averageResponseTime: 18.5,
      matchCount: 156,
      rusAverage: 68.2,
      drsAverage: 73.8,
      recentMatches: [
        { requestId: '1', donorId: '5', matchScore: 87, timestamp: new Date().toISOString(), wasSuccessful: true },
        { requestId: '2', donorId: '3', matchScore: 92, timestamp: new Date().toISOString(), wasSuccessful: true },
        { requestId: '3', donorId: '7', matchScore: 64, timestamp: new Date().toISOString(), wasSuccessful: false },
        { requestId: '4', donorId: '2', matchScore: 78, timestamp: new Date().toISOString(), wasSuccessful: true },
      ]
    };
  }
};

// Get donor leaderboard
export const getDonorLeaderboard = async (): Promise<DonorLeaderboardEntry[]> => {
  try {
    const response = await fetch(`${API_BASE_URL}/algorithm/leaderboard`);
    if (!response.ok) throw new Error('Failed to fetch donor leaderboard');
    return await response.json();
  } catch (error) {
    console.error('Error fetching donor leaderboard:', error);
    // Return mock data for development
    return [
      { id: '1', name: 'John Doe', bloodType: 'O-', drs: 92, donationCount: 7, lastDonation: '2023-10-15' },
      { id: '2', name: 'Jane Smith', bloodType: 'A+', drs: 88, donationCount: 5, lastDonation: '2023-11-02' },
      { id: '3', name: 'Robert Johnson', bloodType: 'B+', drs: 83, donationCount: 6, lastDonation: '2023-09-28' },
      { id: '4', name: 'Emily Williams', bloodType: 'AB-', drs: 76, donationCount: 3, lastDonation: '2023-12-05' },
      { id: '5', name: 'Michael Brown', bloodType: 'O+', drs: 74, donationCount: 4, lastDonation: '2023-10-30' },
    ];
  }
};

// Find best matches for a blood request
export const findMatchesForRequest = async (requestId: string): Promise<Donor[]> => {
  try {
    const response = await fetch(`${API_BASE_URL}/algorithm/matches/request/${requestId}`);
    if (!response.ok) throw new Error('Failed to find matches');
    return await response.json();
  } catch (error) {
    console.error('Error finding matches:', error);
    return [];
  }
};

// Find suitable requests for a donor
export const findRequestsForDonor = async (donorId: string): Promise<BloodRequest[]> => {
  try {
    const response = await fetch(`${API_BASE_URL}/algorithm/matches/donor/${donorId}`);
    if (!response.ok) throw new Error('Failed to find suitable requests');
    return await response.json();
  } catch (error) {
    console.error('Error finding suitable requests:', error);
    return [];
  }
};

// Manually calculate RUS for a request (for development/testing)
export const calculateRequestUrgencyScore = (params: RequestUrgencyScoreParams): number => {
  return calculateRUS(params);
};

// Manually calculate DRS for a donor (for development/testing)
export const calculateDonorReadinessScore = (params: DonorReadinessScoreParams): number => {
  return calculateDRS(params);
};

// Manually calculate matching score (for development/testing)
export const calculateMatchScore = (
  rus: number, 
  drs: number, 
  distance: number, 
  params: MatchingAlgorithmParams,
  requestBloodType: string,
  donorBloodType: string
): number => {
  return calculateMatchingScore(rus, drs, distance, params, requestBloodType, donorBloodType);
};
