
import React from "react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Calendar, MapPin, Users, Tag } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { EventCardProps } from "@/types/events";

const EventCard: React.FC<EventCardProps> = ({
  title,
  description,
  date,
  location,
  imageUrl,
  isPaid,
  price,
  currency = "USD",
  attendeesCount,
  maxAttendees,
  status,
  onClick
}) => {
  // Format date to readable string
  const formattedDate = date.toLocaleDateString("en-US", {
    weekday: "short",
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  // Determine badge color based on status
  const getBadgeVariant = () => {
    switch (status) {
      case "upcoming":
        return "outline";
      case "ongoing":
        return "secondary";
      case "completed":
        return "default";
      case "cancelled":
        return "destructive";
      default:
        return "outline";
    }
  };

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow">
      {imageUrl ? (
        <div className="h-48 overflow-hidden">
          <img 
            src={imageUrl} 
            alt={title} 
            className="w-full h-full object-cover object-center"
          />
        </div>
      ) : (
        <div className="h-48 bg-gradient-to-r from-red-400 to-orange-500 flex items-center justify-center text-white font-bold text-xl p-4 text-center">
          {title}
        </div>
      )}
      
      <CardContent className="p-5">
        <Badge variant={getBadgeVariant()} className="mb-2">
          {status.charAt(0).toUpperCase() + status.slice(1)}
        </Badge>
        <h3 className="text-xl font-bold mb-2 line-clamp-2">{title}</h3>
        <p className="text-gray-600 mb-4 line-clamp-3">{description}</p>
        
        <div className="space-y-2 text-sm text-gray-500">
          <div className="flex items-center">
            <Calendar className="h-4 w-4 mr-2 text-orange-500" />
            <span>{formattedDate}</span>
          </div>
          
          <div className="flex items-center">
            <MapPin className="h-4 w-4 mr-2 text-orange-500" />
            <span>{location}</span>
          </div>
          
          {attendeesCount !== undefined && maxAttendees !== undefined && (
            <div className="flex items-center">
              <Users className="h-4 w-4 mr-2 text-orange-500" />
              <span>
                {attendeesCount} / {maxAttendees} attendees
              </span>
            </div>
          )}
          
          {isPaid && price !== undefined && (
            <div className="flex items-center">
              <Tag className="h-4 w-4 mr-2 text-orange-500" />
              <span>
                {currency} {price}
              </span>
            </div>
          )}
        </div>
      </CardContent>
      
      <CardFooter className="p-5 pt-0">
        <Button onClick={onClick} className="w-full">
          View Details
        </Button>
      </CardFooter>
    </Card>
  );
};

export default EventCard;
