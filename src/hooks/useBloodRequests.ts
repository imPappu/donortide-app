
import { useState, useEffect } from 'react';
import { BloodRequest } from '@/types/apiTypes';
import { getBloodRequests } from '@/services/bloodRequestService';

export function useBloodRequests() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("all");
  const [requests, setRequests] = useState<BloodRequest[]>([]);
  const [filteredRequests, setFilteredRequests] = useState<BloodRequest[]>([]);
  
  // Fetch blood requests
  useEffect(() => {
    const fetchRequests = async () => {
      const data = await getBloodRequests();
      // Add distance and other UI-specific properties for display
      const enhancedData = data.map(request => ({
        ...request,
        distance: '2.3 km', // Mock distance
        postedTime: `${Math.floor(Math.random() * 12) + 1}h ago`, // Mock time
      }));
      setRequests(enhancedData);
    };

    fetchRequests();
  }, []);

  // Handle search functionality
  const handleSearch = (query: string) => {
    setSearchQuery(query);
    
    if (!query.trim()) {
      setFilteredRequests(requests);
      return;
    }
    
    const filtered = requests.filter(
      request => 
        request.patientName.toLowerCase().includes(query.toLowerCase()) ||
        request.bloodType.toLowerCase().includes(query.toLowerCase()) ||
        request.location.toLowerCase().includes(query.toLowerCase()) ||
        request.hospital.toLowerCase().includes(query.toLowerCase())
    );
    
    setFilteredRequests(filtered);
  };

  // Set initial filtered requests when requests change
  useEffect(() => {
    setFilteredRequests(requests);
  }, [requests]);

  return {
    requests,
    filteredRequests,
    searchQuery,
    activeTab,
    setActiveTab,
    handleSearch
  };
}
