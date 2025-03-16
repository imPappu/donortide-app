
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Alert, AlertCircle, Heart, HandHeart, Calendar, Users, Award, TrendingUp } from "lucide-react";
import { Link } from "react-router-dom";

// Quick action item type
interface QuickActionProps {
  title: string;
  icon: React.ReactNode;
  description: string;
  buttonText: string;
  buttonColor: string;
  to: string;
}

// Quick action item component
const QuickActionItem = ({ title, icon, description, buttonText, buttonColor, to }: QuickActionProps) => {
  return (
    <Card className="h-full">
      <CardContent className="p-4 flex flex-col h-full">
        <div className="flex-1">
          <div className="flex items-center mb-2">
            <div className={`${buttonColor} p-2 rounded-full mr-2`}>{icon}</div>
            <h3 className="font-medium">{title}</h3>
          </div>
          <p className="text-sm text-muted-foreground mb-4">{description}</p>
        </div>
        <Button asChild className={buttonColor} size="sm">
          <Link to={to}>{buttonText}</Link>
        </Button>
      </CardContent>
    </Card>
  );
};

const QuickActionsGrid = () => {
  const quickActions = [
    {
      title: "Donate Blood",
      icon: <Heart className="h-4 w-4 text-white" />,
      description: "Schedule an appointment to donate blood and save lives.",
      buttonText: "Donate Now",
      buttonColor: "bg-red-500 hover:bg-red-600 text-white",
      to: "/donate"
    },
    {
      title: "Urgent Requests",
      icon: <AlertCircle className="h-4 w-4 text-white" />,
      description: "View urgent blood donation requests in your area.",
      buttonText: "View Requests",
      buttonColor: "bg-amber-500 hover:bg-amber-600 text-white",
      to: "/urgent-requests"
    },
    {
      title: "Volunteer",
      icon: <HandHeart className="h-4 w-4 text-white" />,
      description: "Register as a volunteer and support our mission.",
      buttonText: "Sign Up",
      buttonColor: "bg-emerald-500 hover:bg-emerald-600 text-white",
      to: "/nearby-volunteers"
    },
    {
      title: "Upcoming Events",
      icon: <Calendar className="h-4 w-4 text-white" />,
      description: "Find blood drives and events happening near you.",
      buttonText: "Find Events",
      buttonColor: "bg-purple-500 hover:bg-purple-600 text-white",
      to: "/events"
    },
    {
      title: "Fundraising",
      icon: <TrendingUp className="h-4 w-4 text-white" />,
      description: "Start or contribute to a fundraising campaign.",
      buttonText: "Get Started",
      buttonColor: "bg-blue-500 hover:bg-blue-600 text-white",
      to: "/fundraising"
    },
    {
      title: "Expert Consultants",
      icon: <Award className="h-4 w-4 text-white" />,
      description: "Connect with medical professionals and experts.",
      buttonText: "Find Experts",
      buttonColor: "bg-indigo-500 hover:bg-indigo-600 text-white",
      to: "/top-consultants"
    },
  ];

  return (
    <div className="mb-8">
      <h2 className="text-xl font-bold mb-4">Quick Actions</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {quickActions.map((action, index) => (
          <QuickActionItem
            key={index}
            title={action.title}
            icon={action.icon}
            description={action.description}
            buttonText={action.buttonText}
            buttonColor={action.buttonColor}
            to={action.to}
          />
        ))}
      </div>
    </div>
  );
};

export default QuickActionsGrid;
