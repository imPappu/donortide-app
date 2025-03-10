
import { Users, DropletIcon, Bell, Globe } from "lucide-react";
import StatCard from "./stats/StatCard";
import MonthlyDonationsChart from "./stats/MonthlyDonationsChart";
import BloodTypeDistributionChart from "./stats/BloodTypeDistributionChart";
import { monthlyDonationData, bloodTypeDistributionData } from "./stats/dashboardData";

interface DashboardStatsProps {
  stats: {
    totalUsers: number;
    totalDonations: number;
    totalRequests: number;
    totalLocations: number;
  };
  loading?: boolean;
}

const DashboardStats = ({ stats, loading }: DashboardStatsProps) => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard 
          icon={Users} 
          value={stats.totalUsers} 
          label="Total Users" 
          percentageChange={12} 
        />
        
        <StatCard 
          icon={DropletIcon} 
          value={stats.totalDonations} 
          label="Donations" 
          percentageChange={8.5} 
        />
        
        <StatCard 
          icon={Bell} 
          value={stats.totalRequests} 
          label="Requests" 
          percentageChange={5.2} 
        />
        
        <StatCard 
          icon={Globe} 
          value={stats.totalLocations} 
          label="Locations" 
          percentageChange={2} 
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <MonthlyDonationsChart data={monthlyDonationData} />
        <BloodTypeDistributionChart data={bloodTypeDistributionData} />
      </div>
    </div>
  );
};

export default DashboardStats;
