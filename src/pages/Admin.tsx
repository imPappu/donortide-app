
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Users, 
  BarChart, 
  DropletIcon, 
  Settings, 
  FileText, 
  Bell, 
  Globe,
  AlertTriangle
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";

const AdminDashboard = () => {
  const stats = [
    { title: "Total Users", value: "2,345", icon: <Users className="h-5 w-5 text-blue-500" />, change: "+12%" },
    { title: "Donations", value: "1,876", icon: <DropletIcon className="h-5 w-5 text-red-500" />, change: "+8.5%" },
    { title: "Requests", value: "965", icon: <Bell className="h-5 w-5 text-orange-500" />, change: "+5.2%" },
    { title: "Locations", value: "57", icon: <Globe className="h-5 w-5 text-green-500" />, change: "+2" },
  ];

  const recentRequests = [
    { name: "Sarah Davis", bloodType: "O-", location: "Central Hospital", status: "Urgent", time: "10 min ago" },
    { name: "Michael Johnson", bloodType: "A+", location: "Memorial Center", status: "Pending", time: "1 hour ago" },
    { name: "Emma Wilson", bloodType: "B+", location: "University Hospital", status: "Fulfilled", time: "3 hours ago" },
  ];

  const sendNotification = () => {
    toast({
      title: "Notification Sent",
      description: "Your push notification has been sent to all users in the selected area.",
    });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold">Admin Dashboard</h1>
        <div className="flex items-center gap-3">
          <Button variant="outline" size="sm">
            <Settings className="h-4 w-4 mr-2" />
            Settings
          </Button>
          <Button size="sm">
            <Bell className="h-4 w-4 mr-2" />
            Send Alert
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map((stat, i) => (
          <Card key={i}>
            <CardContent className="pt-6">
              <div className="flex justify-between items-center">
                {stat.icon}
                <span className="text-sm text-green-600">{stat.change}</span>
              </div>
              <div className="mt-3">
                <h3 className="text-2xl font-bold">{stat.value}</h3>
                <p className="text-sm text-muted-foreground">{stat.title}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Tabs defaultValue="overview" className="mb-8">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="users">Users</TabsTrigger>
          <TabsTrigger value="requests">Requests</TabsTrigger>
          <TabsTrigger value="donations">Donations</TabsTrigger>
          <TabsTrigger value="content">Content</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="mt-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Recent Requests</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentRequests.map((request, i) => (
                    <div key={i} className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="h-8 w-8 rounded-full bg-red-100 flex items-center justify-center mr-3">
                          <span className="text-red-600 font-bold text-xs">{request.bloodType}</span>
                        </div>
                        <div>
                          <h4 className="text-sm font-medium">{request.name}</h4>
                          <p className="text-xs text-muted-foreground">{request.location}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <span className={`text-xs px-2 py-1 rounded-full ${
                          request.status === 'Urgent' ? 'bg-red-100 text-red-800' :
                          request.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-green-100 text-green-800'
                        }`}>
                          {request.status}
                        </span>
                        <p className="text-xs text-muted-foreground mt-1">{request.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Notifications</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Title</label>
                    <input 
                      type="text" 
                      placeholder="Notification title"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Message</label>
                    <textarea 
                      placeholder="Notification message"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                      rows={3}
                    ></textarea>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Target Area</label>
                    <select className="w-full px-3 py-2 border border-gray-300 rounded-md">
                      <option>All Users</option>
                      <option>New York Area</option>
                      <option>Los Angeles Area</option>
                      <option>Chicago Area</option>
                    </select>
                  </div>
                  <Button onClick={sendNotification} className="w-full">
                    <Bell className="h-4 w-4 mr-2" />
                    Send Push Notification
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="users">
          <Card>
            <CardHeader>
              <CardTitle>User Management</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">This section would include user management tools such as:</p>
              <ul className="list-disc pl-5 space-y-1 text-sm">
                <li>User listing with search and filters</li>
                <li>User profile editing</li>
                <li>Verification status management</li>
                <li>Role assignment (admin, moderator, user)</li>
                <li>Donation history</li>
              </ul>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="requests">
          <Card>
            <CardHeader>
              <CardTitle>Blood Requests</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">This section would include request management tools such as:</p>
              <ul className="list-disc pl-5 space-y-1 text-sm">
                <li>Approve/reject pending requests</li>
                <li>Mark requests as fulfilled</li>
                <li>Set urgency levels</li>
                <li>Add notes or special requirements</li>
                <li>Generate reports on request trends</li>
              </ul>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="donations">
          <Card>
            <CardHeader>
              <CardTitle>Donation Management</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">This section would include donation management tools such as:</p>
              <ul className="list-disc pl-5 space-y-1 text-sm">
                <li>Record of all donations</li>
                <li>Verification of donation claims</li>
                <li>Statistical analysis by location, blood type, etc.</li>
                <li>Donor recognition programs</li>
                <li>Campaign effectiveness tracking</li>
              </ul>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="content">
          <Card>
            <CardHeader>
              <CardTitle>Content Management</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">This section would include content management tools such as:</p>
              <ul className="list-disc pl-5 space-y-1 text-sm">
                <li>Blog post creation and editing</li>
                <li>Banner management for the homepage</li>
                <li>News article curation</li>
                <li>FAQ and educational content</li>
                <li>Ad placement and analytics</li>
              </ul>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminDashboard;
