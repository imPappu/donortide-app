
import { useState, useEffect } from "react";
import { getBloodRequests } from "@/services/bloodRequestService";
import { BloodRequest } from "@/types/apiTypes";
import { toast } from "@/components/ui/use-toast";

interface UrgentRequest {
  id: string;
  name: string;
  bloodType: string;
  location: string;
  distance?: string;
  urgency: string;
  postedTime: string;
}

export const useUrgentRequests = (limit: number = 5) => {
  const [urgentRequests, setUrgentRequests] = useState<UrgentRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUrgentRequests = async () => {
      setLoading(true);
      try {
        const requests = await getBloodRequests();
        
        // Filter for urgent and critical requests
        const urgentBloodRequests = requests
          .filter(req => req.urgency === 'critical' || req.urgency === 'urgent')
          .slice(0, limit)
          .map(formatRequestData);
        
        setUrgentRequests(urgentBloodRequests);
      } catch (err) {
        console.error("Error fetching urgent requests:", err);
        setError("Failed to load urgent requests");
        
        // Generate fallback data when API fails
        const fallbackRequests = generateFallbackRequests(limit);
        setUrgentRequests(fallbackRequests);
        
        toast({
          title: "Connection issue",
          description: "Could not load live blood requests. Using cached data.",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchUrgentRequests();
  }, [limit]);

  // Helper to format request data
  const formatRequestData = (request: BloodRequest): UrgentRequest => {
    return {
      id: request.id,
      name: request.patientName,
      bloodType: request.bloodType,
      location: request.location,
      distance: calculateDistance(request),
      urgency: request.urgency,
      postedTime: formatTimeAgo(request.createdAt),
    };
  };

  // Helper to calculate approximate distance (placeholder)
  const calculateDistance = (request: BloodRequest): string => {
    // In a real app, this would use geolocation data
    // For now, return a randomized distance
    const distances = ["0.5 km away", "1.2 km away", "2.5 km away", "3.7 km away", "5.0 km away"];
    return distances[Math.floor(Math.random() * distances.length)];
  };

  // Helper to format time ago
  const formatTimeAgo = (dateString: string): string => {
    try {
      const now = new Date();
      const pastDate = new Date(dateString);
      const diffInSeconds = Math.floor((now.getTime() - pastDate.getTime()) / 1000);
      
      if (diffInSeconds < 60) return "Just now";
      if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)} min ago`;
      if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)} hours ago`;
      return `${Math.floor(diffInSeconds / 86400)} days ago`;
    } catch (err) {
      return "Recently";
    }
  };

  // Generate fallback data when API fails
  const generateFallbackRequests = (count: number): UrgentRequest[] => {
    const bloodTypes = ["A+", "B+", "AB+", "O+", "A-", "B-", "AB-", "O-"];
    const hospitals = ["City Hospital", "Memorial Medical Center", "General Hospital", "Unity Medical"];
    const cities = ["Downtown", "Westside", "Eastside", "North District", "South District"];
    const urgencies = ["urgent", "critical"];
    const times = ["10 min ago", "25 min ago", "1 hour ago", "2 hours ago", "4 hours ago"];
    
    return Array.from({ length: count }).map((_, index) => ({
      id: `offline-${index + 1}`,
      name: `Patient ${index + 1}`,
      bloodType: bloodTypes[Math.floor(Math.random() * bloodTypes.length)],
      location: `${hospitals[Math.floor(Math.random() * hospitals.length)]}, ${cities[Math.floor(Math.random() * cities.length)]}`,
      distance: `${(Math.random() * 5).toFixed(1)} km away`,
      urgency: urgencies[Math.floor(Math.random() * urgencies.length)],
      postedTime: times[Math.floor(Math.random() * times.length)],
    }));
  };

  return { urgentRequests, loading, error };
};
