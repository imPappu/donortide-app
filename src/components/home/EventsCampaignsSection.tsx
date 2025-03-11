
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Calendar, Target } from "lucide-react";

interface EventItem {
  id: string;
  title: string;
  date: string;
  location: string;
  type?: string;
}

interface CampaignItem {
  id: string;
  title: string;
  goal: string;
  progress: number;
  endDate: string;
}

interface EventsCampaignsSectionProps {
  events: EventItem[];
  campaigns: CampaignItem[];
}

const EventsCampaignsSection = ({ events, campaigns }: EventsCampaignsSectionProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
      {/* Events */}
      <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm border">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold flex items-center">
            <Calendar className="h-5 w-5 mr-2 text-primary" />
            Upcoming Events
          </h2>
          <Button variant="ghost" size="sm" asChild>
            <Link to="/events">See All</Link>
          </Button>
        </div>
        
        <div className="space-y-3">
          {events.map((event) => (
            <Link 
              key={event.id} 
              to={`/events/${event.id}`}
              className="block p-3 rounded-md hover:bg-gray-50 dark:hover:bg-gray-700 transition"
            >
              <h3 className="font-medium text-sm">{event.title}</h3>
              <div className="flex justify-between mt-1 text-xs text-muted-foreground">
                <span>{event.date}</span>
                <span>{event.location}</span>
              </div>
            </Link>
          ))}
        </div>
        
        <div className="mt-4">
          <Button variant="outline" size="sm" className="w-full" asChild>
            <Link to="/events/create">
              Register an Event
            </Link>
          </Button>
        </div>
      </div>
      
      {/* Campaigns */}
      <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm border">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold flex items-center">
            <Target className="h-5 w-5 mr-2 text-orange-500" />
            Active Campaigns
          </h2>
          <Button variant="ghost" size="sm" asChild>
            <Link to="/campaigns">See All</Link>
          </Button>
        </div>
        
        <div className="space-y-3">
          {campaigns.map((campaign) => (
            <Link 
              key={campaign.id} 
              to={`/campaigns/${campaign.id}`}
              className="block p-3 rounded-md hover:bg-gray-50 dark:hover:bg-gray-700 transition"
            >
              <h3 className="font-medium text-sm">{campaign.title}</h3>
              <div className="flex justify-between mt-1 text-xs text-muted-foreground">
                <span>Goal: {campaign.goal}</span>
                <span>Ends: {campaign.endDate}</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-1.5 mt-2">
                <div 
                  className="bg-orange-500 h-1.5 rounded-full" 
                  style={{ width: `${campaign.progress}%` }}
                ></div>
              </div>
            </Link>
          ))}
        </div>
        
        <div className="mt-4">
          <Button variant="outline" size="sm" className="w-full" asChild>
            <Link to="/campaigns/create">
              Start a Campaign
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default EventsCampaignsSection;
