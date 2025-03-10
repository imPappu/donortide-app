
import React, { useState, useEffect } from 'react';
import DashboardStats from './DashboardStats';
import RecentRequests from './RecentRequests';
import { BloodRequest } from '@/services/dbService';
import { getDashboardStats } from '@/services/dashboardService';

const DashboardContent: React.FC = () => {
  const [stats, setStats] = useState({
    totalUsers: 450,
    totalDonations: 1256,
    totalRequests: 876,
    totalLocations: 24
  });
  
  const [requests, setRequests] = useState<BloodRequest[]>([
    {
      patientName: "John Doe",
      bloodType: "A+",
      hospital: "General Hospital",
      location: "New York",
      contactNumber: "123-456-7890",
      urgency: "Urgent",
      createdAt: new Date().toISOString()
    },
    {
      patientName: "Jane Smith",
      bloodType: "O-",
      hospital: "City Medical Center",
      location: "Los Angeles",
      contactNumber: "987-654-3210",
      urgency: "High",
      createdAt: new Date(Date.now() - 86400000).toISOString()
    },
    {
      patientName: "Robert Johnson",
      bloodType: "B+",
      hospital: "County Hospital",
      location: "Chicago",
      contactNumber: "555-123-4567",
      urgency: "Standard",
      createdAt: new Date(Date.now() - 172800000).toISOString()
    }
  ]);
  
  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const data = await getDashboardStats();
        if (data) {
          setStats(data);
          if (data.recentRequests) {
            setRequests(data.recentRequests);
          }
        }
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      }
    };
    
    fetchDashboardData();
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
      <DashboardStats stats={stats} />
      <RecentRequests requests={requests} />
    </div>
  );
};

export default DashboardContent;
