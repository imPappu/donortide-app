
import React from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Calendar, MapPin, User } from "lucide-react";
import { Button } from "@/components/ui/button";

export interface EventCardProps {
  id: string;
  title: string;
  date: string;
  time: string;
  location: string;
  organizer: string;
  description: string;
  image: string;
}

const EventCard = ({ 
  id, 
  title, 
  date, 
  time, 
  location, 
  organizer, 
  description, 
  image 
}: EventCardProps) => {
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
        <div className="flex justify-between text-sm text-muted-foreground">
          <span className="flex items-center">
            <Calendar className="h-4 w-4 mr-1" />
            {date}, {time}
          </span>
        </div>
        <div className="text-sm text-muted-foreground flex items-center">
          <MapPin className="h-4 w-4 mr-1" />
          {location}
        </div>
        <div className="text-sm text-muted-foreground flex items-center">
          <User className="h-4 w-4 mr-1" />
          Organized by: {organizer}
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-sm">{description}</p>
      </CardContent>
      <CardFooter>
        <Button variant="outline" size="sm" className="w-full" asChild>
          <Link to={`/events/${id}`}>View Details</Link>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default EventCard;
