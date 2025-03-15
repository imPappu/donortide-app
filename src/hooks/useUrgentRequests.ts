
import { useState, useEffect } from "react";
import { getBloodRequests } from "@/services/bloodRequestService";
import { useToast } from "@/hooks/use-toast";

export interface UrgentRequest {
  id: string;
  name: string;
  bloodType: string;
  location: string;
  distance?: string;
  urgency: string;
  postedTime: string;
}

export const useUrgentRequests = () => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [urgentRequests, setUrgentRequests] = useState<UrgentRequest[]>([]);
  
  useEffect(() => {
    const fetchUrgentRequests = async () => {
      setLoading(true);
      try {
        const requests = await getBloodRequests();
        // Filter for urgent requests
        const urgent = requests
          .filter(req => req.urgency === 'urgent' && req.status === 'open')
          .slice(0, 5)
          .map(req => ({
            id: req.id,
            name: req.patientName,
            bloodType: req.bloodType,
            location: req.hospital,
            distance: '2.5 km', // This would come from geolocation in a real app
            urgency: req.urgency,
            postedTime: new Date(req.createdAt).toLocaleDateString()
          }));
        
        setUrgentRequests(urgent);
      } catch (error) {
        console.error("Error fetching blood requests:", error);
        // Use sample data if API fails
        setUrgentRequests([
          {
            id: '1',
            name: 'Emily Johnson',
            bloodType: 'O-',
            location: 'Memorial Hospital',
            distance: '2.5 km',
            urgency: 'urgent',
            postedTime: '2 hours ago'
          },
          {
            id: '2',
            name: 'Michael Chen',
            bloodType: 'A+',
            location: 'General Hospital',
            distance: '3.7 km',
            urgency: 'urgent',
            postedTime: 'Yesterday'
          },
          {
            id: '3',
            name: 'Sarah Williams',
            bloodType: 'B-',
            location: 'City Medical Center',
            distance: '5.1 km',
            urgency: 'urgent',
            postedTime: '2 days ago'
          }
        ]);
      } finally {
        setLoading(false);
      }
    };
    
    fetchUrgentRequests();
  }, []);

  return { urgentRequests, loading };
};
