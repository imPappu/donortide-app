
import React from "react";
import DashboardStats from "../DashboardStats";
import RecentRequests from "../RecentRequests";
import { BloodRequest } from "@/types/apiTypes";

interface DashboardContentProps {
  stats: {
    totalUsers: number;
    totalDonations: number;
    totalRequests: number;
    totalLocations: number;
  };
  loading: boolean;
}

const DashboardContent = ({ stats, loading }: DashboardContentProps) => {
  // Mock recent requests data for demonstration
  const mockRequests: BloodRequest[] = [
    {
      id: "1",
      patientName: "John Doe",
      bloodType: "A+",
      units: 2,
      hospital: "City Hospital",
      location: "Downtown",
      contactNumber: "+1234567890",
      urgency: "urgent",
      status: "open",
      createdAt: new Date().toISOString()
    },
    {
      id: "2",
      patientName: "Jane Smith",
      bloodType: "O-",
      units: 1,
      hospital: "General Hospital",
      location: "Westside",
      contactNumber: "+1987654321",
      urgency: "critical",
      status: "open",
      createdAt: new Date(Date.now() - 86400000).toISOString()
    },
    {
      id: "3",
      patientName: "Robert Brown",
      bloodType: "B+",
      units: 3,
      hospital: "Memorial Hospital",
      location: "Eastside",
      contactNumber: "+1567890123",
      urgency: "standard",
      status: "open",
      createdAt: new Date(Date.now() - 172800000).toISOString()
    }
  ];
  
  return (
    <div className="space-y-6">
      <DashboardStats stats={stats} loading={loading} />
      <RecentRequests requests={mockRequests} />
    </div>
  );
};

export default DashboardContent;
