
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, MapPin, Users, Activity, Calendar } from "lucide-react";

interface HomeLayoutProps {
  children: React.ReactNode;
  showSidebar?: boolean;
}

const HomeLayout = ({ children, showSidebar = true }: HomeLayoutProps) => {
  const navigate = useNavigate();

  const quickActions = [
    {
      title: "Donate Blood",
      description: "Schedule a blood donation",
      icon: <Activity className="h-6 w-6 text-red-500" />,
      path: "/donate",
      color: "bg-red-50 dark:bg-red-950/30",
    },
    {
      title: "Blood Requests",
      description: "View urgent requests",
      icon: <Users className="h-6 w-6 text-blue-500" />,
      path: "/requests",
      color: "bg-blue-50 dark:bg-blue-950/30",
    },
    {
      title: "Nearby Centers",
      description: "Find donation centers",
      icon: <MapPin className="h-6 w-6 text-green-500" />,
      path: "/services",
      color: "bg-green-50 dark:bg-green-950/30",
    },
    {
      title: "Upcoming Events",
      description: "Join donation drives",
      icon: <Calendar className="h-6 w-6 text-purple-500" />,
      path: "/events",
      color: "bg-purple-50 dark:bg-purple-950/30",
    },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-900">
      <main className="flex-1 container mx-auto px-4 py-6 md:py-8">
        {/* Quick Actions Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {quickActions.map((action, index) => (
            <Card 
              key={index}
              className="relative overflow-hidden hover:shadow-md transition-shadow cursor-pointer"
              onClick={() => navigate(action.path)}
            >
              <CardContent className={`p-4 flex flex-col h-full ${action.color}`}>
                <div className="mb-2">{action.icon}</div>
                <h3 className="font-semibold text-sm md:text-base">{action.title}</h3>
                <p className="text-xs text-muted-foreground mt-1 hidden md:block">{action.description}</p>
                <ArrowRight className="h-4 w-4 mt-2 text-muted-foreground absolute bottom-3 right-3 opacity-60" />
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Main content */}
        {children}
        
        {/* Call to action */}
        <Card className="mt-8 bg-gradient-to-r from-red-50 to-red-100 dark:from-red-950/40 dark:to-red-900/20 border-none shadow-sm">
          <CardContent className="p-6 flex flex-col md:flex-row items-center justify-between">
            <div className="mb-4 md:mb-0">
              <h3 className="text-xl font-bold mb-2">Every Donation Counts</h3>
              <p className="text-muted-foreground">Your contribution can save up to 3 lives. Join our community today.</p>
            </div>
            <Button size="lg" onClick={() => navigate("/donate")}>
              Donate Now
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default HomeLayout;
