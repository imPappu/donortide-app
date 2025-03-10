
import React from "react";
import { Card } from "@/components/ui/card";
import { DropletIcon, Award, Clock, Bell, Heart, Star, Trophy, Shield } from "lucide-react";

const Achievements = () => {
  const badges = [
    { 
      name: "First Donation", 
      icon: <DropletIcon className="h-5 w-5" />, 
      earned: true,
      description: "Completed your first blood donation" 
    },
    { 
      name: "Life Saver", 
      icon: <Heart className="h-5 w-5" />, 
      earned: true,
      description: "Helped save someone's life" 
    },
    { 
      name: "Regular Donor", 
      icon: <Clock className="h-5 w-5" />, 
      earned: true,
      description: "Donated 3 times within a year" 
    },
    { 
      name: "Emergency Responder", 
      icon: <Bell className="h-5 w-5" />, 
      earned: false,
      description: "Responded to an emergency request" 
    },
    { 
      name: "Gold Donor", 
      icon: <Star className="h-5 w-5" />, 
      earned: false,
      description: "Completed 10 donations" 
    },
    { 
      name: "Champion", 
      icon: <Trophy className="h-5 w-5" />, 
      earned: false,
      description: "In the top 10% of donors" 
    },
    { 
      name: "Verified Donor", 
      icon: <Shield className="h-5 w-5" />, 
      earned: true,
      description: "Identity verified" 
    },
    { 
      name: "Elite Donor", 
      icon: <Award className="h-5 w-5" />, 
      earned: false,
      description: "Donated all blood components" 
    },
  ];

  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
      {badges.map((badge, index) => (
        <Card 
          key={index} 
          className={`p-4 text-center hover:shadow-md transition-shadow cursor-pointer ${!badge.earned ? "opacity-60 grayscale" : ""}`}
        >
          <div className="flex flex-col items-center">
            <div className={`h-14 w-14 rounded-full ${badge.earned ? "bg-primary/10 text-primary" : "bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-400"} flex items-center justify-center mb-3`}>
              {badge.icon}
            </div>
            <h3 className="font-medium text-sm">{badge.name}</h3>
            <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
              {badge.description}
            </p>
            <div className="text-xs mt-2">
              {badge.earned ? (
                <span className="text-green-600 dark:text-green-400 flex items-center justify-center">
                  <Award className="h-3 w-3 mr-1" />
                  Earned
                </span>
              ) : (
                <span className="text-gray-400">Locked</span>
              )}
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
};

export default Achievements;
