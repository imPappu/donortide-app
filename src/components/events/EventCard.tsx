
import React from "react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, MapPin, Users } from "lucide-react";
import { Button } from "@/components/ui/button";

export interface EventCardProps {
  title: string;
  description: string;
  date: Date;
  location: string;
  imageUrl?: string;
  isPaid: boolean;
  price?: number;
  currency?: string;
  attendeesCount?: number;
  maxAttendees?: number;
  status: string;
  onClick: () => void;
}

const EventCard: React.FC<EventCardProps> = ({
  title,
  description,
  date,
  location,
  imageUrl,
  isPaid,
  price,
  currency,
  attendeesCount,
  maxAttendees,
  status,
  onClick
}) => {
  const formattedDate = date ? date.toLocaleDateString('en-US', {
    weekday: 'short',
    day: 'numeric',
    month: 'short',
    year: 'numeric'
  }) : '';

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'upcoming':
        return 'bg-blue-100 text-blue-800';
      case 'ongoing':
        return 'bg-green-100 text-green-800';
      case 'completed':
        return 'bg-gray-100 text-gray-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <Card className="h-full flex flex-col overflow-hidden hover:shadow-md transition-shadow">
      {imageUrl && (
        <div className="aspect-video w-full">
          <img 
            src={imageUrl} 
            alt={title} 
            className="w-full h-full object-cover"
          />
        </div>
      )}
      <CardContent className="flex-1 p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-semibold text-lg line-clamp-2">{title}</h3>
          <Badge className={`ml-2 capitalize ${getStatusColor(status)}`}>
            {status}
          </Badge>
        </div>
        
        <p className="text-muted-foreground text-sm mb-3 line-clamp-2">
          {description}
        </p>
        
        <div className="space-y-2 text-sm">
          <div className="flex items-center text-muted-foreground">
            <Calendar className="h-4 w-4 mr-2" />
            <span>{formattedDate}</span>
          </div>
          
          <div className="flex items-center text-muted-foreground">
            <MapPin className="h-4 w-4 mr-2" />
            <span>{location}</span>
          </div>
          
          {(attendeesCount !== undefined || maxAttendees !== undefined) && (
            <div className="flex items-center text-muted-foreground">
              <Users className="h-4 w-4 mr-2" />
              <span>
                {attendeesCount !== undefined ? attendeesCount : 0}
                {maxAttendees !== undefined ? ` / ${maxAttendees}` : ''}
              </span>
            </div>
          )}
        </div>
      </CardContent>
      
      <CardFooter className="p-4 pt-0 mt-auto flex justify-between items-center">
        <div>
          {isPaid && price !== undefined && (
            <span className="font-medium">
              {currency || '$'}{price.toFixed(2)}
            </span>
          )}
          {!isPaid && (
            <span className="text-sm text-green-600 font-medium">Free</span>
          )}
        </div>
        <Button onClick={onClick} variant="outline" size="sm">
          View Details
        </Button>
      </CardFooter>
    </Card>
  );
};

export default EventCard;
