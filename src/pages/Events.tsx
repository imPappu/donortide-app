
import React from "react";
import TopNavbar from "@/components/TopNavbar";
import { Calendar } from "lucide-react";
import PageHeader from "@/components/common/PageHeader";
import EventGrid from "@/components/events/EventGrid";
import EventCard from "@/components/events/EventCard";
import { EventCardProps } from "@/types/events";
import Navigation from "@/components/Navigation";

const Events = () => {
  const upcomingEvents: EventCardProps[] = [
    {
      title: "Blood Drive at Central Park",
      description: "Join us for our quarterly blood drive in Central Park. All blood types needed, especially O-negative and B-negative.",
      date: new Date("2023-05-15"),
      location: "Central Park, New York",
      isPaid: false,
      status: "upcoming",
      onClick: () => {}
    },
    {
      title: "Donor Appreciation Day",
      description: "A special day to honor and thank our regular blood donors. Refreshments will be served.",
      date: new Date("2023-06-14"),
      location: "Memorial Hospital",
      isPaid: false,
      status: "upcoming",
      onClick: () => {}
    },
    {
      title: "World Blood Donor Day Event",
      description: "Special event celebrating World Blood Donor Day with entertainment, food, and donation opportunities.",
      date: new Date("2023-06-14"),
      location: "Community Center, Downtown",
      isPaid: false,
      status: "upcoming",
      imageUrl: "https://placehold.co/600x400/green/white?text=World+Blood+Donor+Day",
      onClick: () => {}
    },
    {
      title: "University Campus Blood Drive",
      description: "Back-to-school blood drive targeting young donors. Special incentives for first-time donors.",
      date: new Date("2023-09-05"),
      location: "State University, Student Center",
      isPaid: false,
      status: "upcoming",
      imageUrl: "https://placehold.co/600x400/orange/white?text=Campus+Drive",
      onClick: () => {}
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
        
        <EventGrid>
          {upcomingEvents.map((event, index) => (
            <EventCard 
              key={index}
              title={event.title}
              description={event.description}
              date={event.date}
              location={event.location}
              imageUrl={event.imageUrl}
              isPaid={event.isPaid}
              price={event.price}
              currency={event.currency}
              attendeesCount={event.attendeesCount}
              maxAttendees={event.maxAttendees}
              status={event.status}
              onClick={event.onClick}
            />
          ))}
        </EventGrid>
      </div>

      <Navigation />
    </div>
  );
};

export default Events;
