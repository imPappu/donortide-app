
import React from "react";
import { Card } from "@/components/ui/card";
import { DropletIcon, Award, Clock, Bell } from "lucide-react";

const Achievements = () => {
  const badges = [
    { name: "First Donation", icon: <DropletIcon className="h-5 w-5" />, earned: true },
    { name: "Life Saver", icon: <Award className="h-5 w-5" />, earned: true },
    { name: "Regular Donor", icon: <Clock className="h-5 w-5" />, earned: true },
    { name: "Emergency Responder", icon: <Bell className="h-5 w-5" />, earned: false },
  ];

  return (
    <div className="grid grid-cols-2 gap-3">
      {badges.map((badge, index) => (
        <Card key={index} className={`p-4 text-center ${!badge.earned ? "opacity-50" : ""}`}>
          <div className="flex flex-col items-center">
            <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-2 text-primary">
              {badge.icon}
            </div>
            <h3 className="font-medium text-sm">{badge.name}</h3>
            <p className="text-xs text-muted-foreground mt-1">
              {badge.earned ? "Earned" : "Not earned yet"}
            </p>
          </div>
        </Card>
      ))}
    </div>
  );
};

export default Achievements;
