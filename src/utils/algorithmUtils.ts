
import { RequestUrgencyScoreParams, DonorReadinessScoreParams, MatchingAlgorithmParams } from '@/types/algorithmTypes';

// Blood type compatibility matrix
const BLOOD_COMPATIBILITY = {
  'O-': ['O-', 'O+', 'A-', 'A+', 'B-', 'B+', 'AB-', 'AB+'],
  'O+': ['O+', 'A+', 'B+', 'AB+'],
  'A-': ['A-', 'A+', 'AB-', 'AB+'],
  'A+': ['A+', 'AB+'],
  'B-': ['B-', 'B+', 'AB-', 'AB+'],
  'B+': ['B+', 'AB+'],
  'AB-': ['AB-', 'AB+'],
  'AB+': ['AB+']
};

// Calculate time elapsed in hours since request creation
const calculateTimeElapsed = (createdAt: string): number => {
  const created = new Date(createdAt).getTime();
  const now = new Date().getTime();
  return (now - created) / (1000 * 60 * 60); // hours
};

// Calculate Request Urgency Score (RUS)
export const calculateRUS = (params: RequestUrgencyScoreParams): number => {
  const { urgency, createdAt, tags = [], bloodType } = params;
  
  // Base urgency score
  let urgencyScore = 0;
  switch (urgency) {
    case 'Urgent':
      urgencyScore = 10;
      break;
    case 'High':
      urgencyScore = 7;
      break;
    case 'Standard':
      urgencyScore = 3;
      break;
    default:
      urgencyScore = 1;
  }
  
  // Time factor - increases with time for 'Urgent' and 'High', decreases for 'Standard'
  const timeElapsed = calculateTimeElapsed(createdAt);
  const timeFactor = urgency === 'Standard' 
    ? Math.max(1, 5 - (timeElapsed / 24)) // Standard requests become less urgent over time
    : Math.min(10, 1 + (timeElapsed / 6)); // Urgent requests become more urgent over time (capped)
  
  // Tags boost - certain tags can boost urgency
  const priorityTags = ['emergency', 'surgery', 'urgent', 'critical', 'accident'];
  const tagBoost = tags.filter(tag => priorityTags.includes(tag.toLowerCase())).length * 0.5;
  
  // Blood type rarity factor
  const bloodTypeRarityFactor = ['AB-', 'B-', 'O-', 'AB+'].includes(bloodType) ? 1.2 : 1.0;
  
  // Calculate final RUS score
  const rusScore = (urgencyScore * timeFactor + tagBoost) * bloodTypeRarityFactor;
  
  // Normalize score to 0-100
  return Math.min(100, Math.round(rusScore * 5));
};

// Calculate Donor Readiness Score (DRS)
export const calculateDRS = (params: DonorReadinessScoreParams): number => {
  const { 
    lastDonation, 
    donationCount = 0, 
    distance = 100, 
    socialEngagement = 0, 
    profileCompleteness = 0,
    bloodType 
  } = params;
  
  // Eligibility based on last donation (if known)
  let eligibilityScore = 10;
  if (lastDonation) {
    const lastDonationDate = new Date(lastDonation);
    const daysSinceLastDonation = (Date.now() - lastDonationDate.getTime()) / (1000 * 60 * 60 * 24);
    eligibilityScore = daysSinceLastDonation < 56 ? 0 : Math.min(10, 5 + daysSinceLastDonation / 30);
  }
  
  // Experience score based on donation count
  const experienceScore = Math.min(10, donationCount);
  
  // Distance factor (closer is better)
  const distanceScore = Math.max(0, 10 - (distance / 10));
  
  // Social engagement factor
  const engagementScore = Math.min(10, socialEngagement);
  
  // Profile completeness
  const completenessScore = profileCompleteness / 10;
  
  // Blood type universality factor
  const universalityScore = bloodType === 'O-' ? 10 :
                           ['O+', 'A-', 'B-'].includes(bloodType) ? 8 :
                           ['A+', 'B+'].includes(bloodType) ? 6 :
                           bloodType === 'AB-' ? 4 : 2;
  
  // Calculate final DRS
  const drsScore = (
    eligibilityScore * 1.5 + 
    experienceScore * 1.0 + 
    distanceScore * 2.0 + 
    engagementScore * 0.8 + 
    completenessScore * 0.7 +
    universalityScore * 1.0
  ) / 7;
  
  // Normalize score to 0-100
  return Math.min(100, Math.round(drsScore * 10));
};

// Calculate Matching Score between a request and a donor
export const calculateMatchingScore = (
  rus: number, 
  drs: number, 
  distance: number, 
  params: MatchingAlgorithmParams,
  requestBloodType: string,
  donorBloodType: string
): number => {
  const { rusWeight, drsWeight, distanceWeight } = params;
  
  // Check blood type compatibility
  const isCompatible = BLOOD_COMPATIBILITY[donorBloodType]?.includes(requestBloodType) || false;
  if (!isCompatible) {
    return 0; // Incompatible blood types result in zero match score
  }
  
  // Normalize distance to a 0-100 scale (where 0 is far and 100 is close)
  const normalizedDistance = Math.max(0, 100 - distance);
  
  // Calculate match score
  const matchScore = (
    (rusWeight * rus) + 
    (drsWeight * drs) - 
    (distanceWeight * (100 - normalizedDistance))
  ) / (rusWeight + drsWeight + distanceWeight);
  
  return Math.max(0, Math.min(100, matchScore));
};

// Helper function to normalize array of scores to 0-100
export const normalizeScores = (scores: number[]): number[] => {
  if (scores.length === 0) return [];
  
  const min = Math.min(...scores);
  const max = Math.max(...scores);
  
  if (min === max) return scores.map(() => 50); // All equal, return middle value
  
  return scores.map(score => ((score - min) / (max - min)) * 100);
};
