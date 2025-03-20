
import React from 'react';
import { useToast } from "@/hooks/use-toast";

const Dashboard = () => {
  const { toast } = useToast();

  React.useEffect(() => {
    toast({
      title: "Welcome to your dashboard",
      description: "Here you can manage your donations and requests.",
    });
  }, [toast]);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="border rounded-lg p-4 shadow-sm">
          <h2 className="text-lg font-semibold mb-2">Your Donations</h2>
          <p className="text-muted-foreground">Track your donation history and impact</p>
        </div>
        <div className="border rounded-lg p-4 shadow-sm">
          <h2 className="text-lg font-semibold mb-2">Your Requests</h2>
          <p className="text-muted-foreground">Manage your blood requests</p>
        </div>
        <div className="border rounded-lg p-4 shadow-sm">
          <h2 className="text-lg font-semibold mb-2">Appointments</h2>
          <p className="text-muted-foreground">View upcoming donation appointments</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
