
import React from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Target, CalendarClock } from "lucide-react";

export interface CampaignCardProps {
  id: string;
  title: string;
  goal: string;
  progress: number;
  endDate: string;
  description: string;
  image: string;
}

const CampaignCard = ({ 
  id, 
  title, 
  goal, 
  progress, 
  endDate, 
  description, 
  image 
}: CampaignCardProps) => {
  return (
    <Card key={id} className="overflow-hidden hover:shadow-md transition-shadow">
      <div className="aspect-video w-full">
        <img 
          src={image} 
          alt={title} 
          className="w-full h-full object-cover"
        />
      </div>
      <CardHeader className="pb-2">
        <CardTitle>{title}</CardTitle>
        <div className="flex justify-between text-sm">
          <span className="flex items-center text-muted-foreground">
            <Target className="h-4 w-4 mr-1" />
            Goal: {goal}
          </span>
          <span className="flex items-center text-muted-foreground">
            <CalendarClock className="h-4 w-4 mr-1" />
            Ends: {endDate}
          </span>
        </div>
        <div className="mt-2 space-y-1">
          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div 
              className="bg-orange-500 h-2.5 rounded-full" 
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          <p className="text-xs text-right text-muted-foreground">{progress}% Complete</p>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-sm">{description}</p>
      </CardContent>
      <CardFooter className="flex gap-2">
        <Button className="w-full" asChild>
          <Link to={`/campaigns/${id}/donate`}>Support</Link>
        </Button>
        <Button variant="outline" className="w-full" asChild>
          <Link to={`/campaigns/${id}`}>Details</Link>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default CampaignCard;
