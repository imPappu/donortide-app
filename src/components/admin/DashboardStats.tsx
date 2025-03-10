
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Users, DropletIcon, Bell, Globe, Brain, Activity, Calculator } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";

interface DashboardStatsProps {
  stats: {
    totalUsers: number;
    totalDonations: number;
    totalRequests: number;
    totalLocations: number;
  };
}

const DashboardStats = ({ stats }: DashboardStatsProps) => {
  // Monthly donation data for chart
  const monthlyData = [
    { name: "Jan", donations: 65 },
    { name: "Feb", donations: 78 },
    { name: "Mar", donations: 90 },
    { name: "Apr", donations: 81 },
    { name: "May", donations: 76 },
    { name: "Jun", donations: 85 },
    { name: "Jul", donations: 98 },
    { name: "Aug", donations: 105 },
    { name: "Sep", donations: 120 },
    { name: "Oct", donations: 125 },
    { name: "Nov", donations: 132 },
    { name: "Dec", donations: 140 },
  ];

  // Blood type distribution data
  const bloodTypeData = [
    { name: "A+", value: 35 },
    { name: "A-", value: 8 },
    { name: "B+", value: 28 },
    { name: "B-", value: 6 },
    { name: "AB+", value: 7 },
    { name: "AB-", value: 3 },
    { name: "O+", value: 38 },
    { name: "O-", value: 15 },
  ];

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884d8", "#82ca9d", "#ffc658", "#FF6666"];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
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

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Monthly donations chart */}
        <Card>
          <CardContent className="pt-6">
            <h3 className="text-xl font-medium mb-4">Monthly Donations</h3>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={monthlyData}
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="donations" fill="#8884d8" name="Donations" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Blood type distribution chart */}
        <Card>
          <CardContent className="pt-6">
            <h3 className="text-xl font-medium mb-4">Blood Type Distribution</h3>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={bloodTypeData}
                    cx="50%"
                    cy="50%"
                    labelLine={true}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  >
                    {bloodTypeData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => [`${value} donors`, 'Count']} />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DashboardStats;
