
import { Card, CardContent } from "@/components/ui/card";
import { Users, DropletIcon, Bell, Globe } from "lucide-react";

interface DashboardStatsProps {
  stats: {
    totalUsers: number;
    totalDonations: number;
    totalRequests: number;
    totalLocations: number;
  };
}

const DashboardStats = ({ stats }: DashboardStatsProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      <Card>
        <CardContent className="pt-6">
          <div className="flex justify-between items-center">
            <Users className="h-5 w-5 text-blue-500" />
            <span className="text-sm text-green-600">+12%</span>
          </div>
          <div className="mt-3">
            <h3 className="text-2xl font-bold">{stats.totalUsers}</h3>
            <p className="text-sm text-muted-foreground">Total Users</p>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardContent className="pt-6">
          <div className="flex justify-between items-center">
            <DropletIcon className="h-5 w-5 text-red-500" />
            <span className="text-sm text-green-600">+8.5%</span>
          </div>
          <div className="mt-3">
            <h3 className="text-2xl font-bold">{stats.totalDonations}</h3>
            <p className="text-sm text-muted-foreground">Donations</p>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardContent className="pt-6">
          <div className="flex justify-between items-center">
            <Bell className="h-5 w-5 text-orange-500" />
            <span className="text-sm text-green-600">+5.2%</span>
          </div>
          <div className="mt-3">
            <h3 className="text-2xl font-bold">{stats.totalRequests}</h3>
            <p className="text-sm text-muted-foreground">Requests</p>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardContent className="pt-6">
          <div className="flex justify-between items-center">
            <Globe className="h-5 w-5 text-green-500" />
            <span className="text-sm text-green-600">+2</span>
          </div>
          <div className="mt-3">
            <h3 className="text-2xl font-bold">{stats.totalLocations}</h3>
            <p className="text-sm text-muted-foreground">Locations</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DashboardStats;
