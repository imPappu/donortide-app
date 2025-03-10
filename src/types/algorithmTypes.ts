
export interface RequestUrgencyScoreParams {
  urgency: 'Standard' | 'High' | 'Urgent';
  createdAt: string;
  tags?: string[];
  bloodType: string;
}

export interface DonorReadinessScoreParams {
  lastDonation?: string;
  donationCount?: number;
  distance?: number;
  socialEngagement?: number;
  profileCompleteness?: number;
  bloodType: string;
}

export interface MatchingAlgorithmParams {
  rusWeight: number;
  drsWeight: number;
  distanceWeight: number;
}

export interface AlgorithmFeedback {
  requestId: string;
  donorId: string;
  matchScore: number;
  wasSuccessful: boolean;
  responseTime?: number;
  completionTime?: number;
  timestamp: string;
}

export interface AlgorithmPerformanceMetrics {
  averageMatchScore: number;
  successRate: number;
  averageResponseTime: number;
  matchCount: number;
  rusAverage: number;
  drsAverage: number;
  recentMatches: Array<{
    requestId: string;
    donorId: string;
    matchScore: number;
    timestamp: string;
    wasSuccessful: boolean;
  }>;
}

export interface DonorLeaderboardEntry {
  id: string;
  name: string;
  bloodType: string;
  drs: number;
  donationCount: number;
  lastDonation?: string;
  avatar?: string;
}
