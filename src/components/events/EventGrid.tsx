
import React from "react";
import EventCard, { EventCardProps } from "./EventCard";

interface EventGridProps {
  events: EventCardProps[];
}

const EventGrid = ({ events }: EventGridProps) => {
  return (
    <div className="grid md:grid-cols-2 gap-6">
      {events.map((event) => (
        <EventCard
          key={event.id}
          id={event.id}
          title={event.title}
          date={event.date}
          time={event.time}
          location={event.location}
          organizer={event.organizer}
          description={event.description}
          image={event.image}
        />
      ))}
    </div>
  );
};

export default EventGrid;
