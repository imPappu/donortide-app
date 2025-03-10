
import React from "react";
import TopNavbar from "@/components/TopNavbar";
import { Calendar } from "lucide-react";
import PageHeader from "@/components/common/PageHeader";
import EventGrid from "@/components/events/EventGrid";
import { EventCardProps } from "@/components/events/EventCard";

const Events = () => {
  const upcomingEvents: EventCardProps[] = [
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
        <PageHeader 
          icon={<Calendar className="h-6 w-6 mr-2 text-orange-500" />}
          title="Upcoming Blood Donation Events"
        />
        
        <EventGrid events={upcomingEvents} />
      </div>
    </div>
  );
};

export default Events;
