
import React from "react";
import TopNavbar from "@/components/TopNavbar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, MapPin, User } from "lucide-react";

const Events = () => {
  const upcomingEvents = [
    {
      id: "1",
      title: "Blood Drive at Central Park",
      date: "May 15, 2023",
      location: "Central Park, New York",
      organizer: "City Blood Bank",
      description: "Join us for our quarterly blood drive in Central Park. All blood types needed, especially O-negative and B-negative.",
      time: "9:00 AM - 5:00 PM",
      image: "https://placehold.co/600x400/red/white?text=Blood+Drive"
    },
    {
      id: "2",
      title: "Donor Appreciation Day",
      date: "June 14, 2023",
      location: "Memorial Hospital",
      organizer: "Memorial Hospital Blood Center",
      description: "A special day to honor and thank our regular blood donors. Refreshments will be served.",
      time: "1:00 PM - 4:00 PM",
      image: "https://placehold.co/600x400/blue/white?text=Donor+Appreciation"
    },
    {
      id: "3",
      title: "World Blood Donor Day Event",
      date: "June 14, 2023",
      location: "Community Center, Downtown",
      organizer: "National Blood Service",
      description: "Special event celebrating World Blood Donor Day with entertainment, food, and donation opportunities.",
      time: "10:00 AM - 7:00 PM",
      image: "https://placehold.co/600x400/green/white?text=World+Blood+Donor+Day"
    },
    {
      id: "4",
      title: "University Campus Blood Drive",
      date: "September 5, 2023",
      location: "State University, Student Center",
      organizer: "State University Health Services",
      description: "Back-to-school blood drive targeting young donors. Special incentives for first-time donors.",
      time: "11:00 AM - 6:00 PM",
      image: "https://placehold.co/600x400/orange/white?text=Campus+Drive"
    }
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <TopNavbar />
      
      <div className="container mx-auto px-4 py-6 flex-1 pb-20 max-w-6xl">
        <h1 className="text-2xl font-bold mb-6">Upcoming Blood Donation Events</h1>
        
        <div className="grid md:grid-cols-2 gap-6">
          {upcomingEvents.map((event) => (
            <Card key={event.id} className="overflow-hidden">
              <div className="aspect-video w-full">
                <img 
                  src={event.image} 
                  alt={event.title} 
                  className="w-full h-full object-cover"
                />
              </div>
              <CardHeader className="pb-2">
                <CardTitle>{event.title}</CardTitle>
                <div className="flex justify-between text-sm text-muted-foreground">
                  <span className="flex items-center">
                    <Calendar className="h-4 w-4 mr-1" />
                    {event.date}, {event.time}
                  </span>
                </div>
                <div className="text-sm text-muted-foreground flex items-center">
                  <MapPin className="h-4 w-4 mr-1" />
                  {event.location}
                </div>
                <div className="text-sm text-muted-foreground flex items-center">
                  <User className="h-4 w-4 mr-1" />
                  Organized by: {event.organizer}
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm">{event.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Events;
