
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CircleUserRound, AlertCircle, Heart, Users, Settings } from "lucide-react";

const AdminDashboard = () => {
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
            <CircleUserRound className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,248</div>
            <p className="text-xs text-muted-foreground">+180 from last month</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Blood Donations</CardTitle>
            <Heart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">584</div>
            <p className="text-xs text-muted-foreground">+64 from last month</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Urgent Requests</CardTitle>
            <AlertCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">24</div>
            <p className="text-xs text-muted-foreground">-8 from last month</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Volunteers</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">149</div>
            <p className="text-xs text-muted-foreground">+22 from last month</p>
          </CardContent>
        </Card>
      </div>
      
      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="mb-6">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="users">Users</TabsTrigger>
          <TabsTrigger value="donations">Donations</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>
        <TabsContent value="overview" className="p-4 border rounded-lg">
          <h3 className="text-lg font-medium mb-4">System Overview</h3>
          <p className="text-muted-foreground">
            Welcome to the admin dashboard. Here you can manage all aspects of the blood donation platform.
          </p>
        </TabsContent>
        <TabsContent value="users" className="p-4 border rounded-lg">
          <h3 className="text-lg font-medium mb-4">User Management</h3>
          <p className="text-muted-foreground">
            Manage users, roles, and permissions here.
          </p>
        </TabsContent>
        <TabsContent value="donations" className="p-4 border rounded-lg">
          <h3 className="text-lg font-medium mb-4">Donation Management</h3>
          <p className="text-muted-foreground">
            Track and manage blood donations and requests.
          </p>
        </TabsContent>
        <TabsContent value="settings" className="p-4 border rounded-lg">
          <h3 className="text-lg font-medium mb-4">System Settings</h3>
          <p className="text-muted-foreground">
            Configure platform settings and preferences.
          </p>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminDashboard;
