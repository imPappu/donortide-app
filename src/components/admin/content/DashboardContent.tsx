
import React from "react";
import DashboardStats from "../DashboardStats";
import RecentRequests from "../RecentRequests";
import { BloodRequest } from "@/services/dbService";

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
      hospital: "City Hospital",
      location: "Downtown",
      urgency: "Urgent" as any, // Type cast to match the expected enum
      createdAt: new Date().toISOString(),
      status: "Pending",
      contactNumber: "+1234567890"
    },
    {
      id: "2",
      patientName: "Jane Smith",
      bloodType: "O-",
      hospital: "General Hospital",
      location: "Westside",
      urgency: "High" as any, // Type cast to match the expected enum
      createdAt: new Date(Date.now() - 86400000).toISOString(),
      status: "Pending",
      contactNumber: "+1987654321"
    },
    {
      id: "3",
      patientName: "Robert Brown",
      bloodType: "B+",
      hospital: "Memorial Hospital",
      location: "Eastside",
      urgency: "Normal" as any, // Type cast to match the expected enum
      createdAt: new Date(Date.now() - 172800000).toISOString(),
      status: "Pending",
      contactNumber: "+1567890123"
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
