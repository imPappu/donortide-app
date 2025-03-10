
import React from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, MapPin, Megaphone } from "lucide-react";

interface Event {
  id: string;
  title: string;
  date: string;
  location: string;
  type: string;
}

interface Campaign {
  id: string;
  title: string;
  goal: string;
  progress: number;
  endDate: string;
}

interface EventsCampaignsSectionProps {
  events: Event[];
  campaigns: Campaign[];
}

const EventsCampaignsSection = ({ events, campaigns }: EventsCampaignsSectionProps) => {
  return (
    <div className="grid md:grid-cols-2 gap-6 mb-6">
      {/* Events Section */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg flex items-center">
            <Calendar className="h-5 w-5 mr-2 text-blue-500" />
            Upcoming Events
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-0">
          {events.length > 0 ? (
            <div className="space-y-3">
              {events.map(event => (
                <div key={event.id} className="border-b pb-3 last:border-0 last:pb-0">
                  <h3 className="font-medium">{event.title}</h3>
                  <div className="flex justify-between text-sm text-muted-foreground">
                    <span className="flex items-center">
                      <Calendar className="h-3 w-3 mr-1" />
                      {event.date}
                    </span>
                    <span>{event.type}</span>
                  </div>
                  <p className="text-xs text-muted-foreground flex items-center mt-1">
                    <MapPin className="h-3 w-3 mr-1" />
                    {event.location}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-muted-foreground text-sm py-2">No upcoming events</p>
          )}
        </CardContent>
        <CardFooter>
          <Button variant="outline" size="sm" className="w-full" asChild>
            <Link to="/events">View All Events</Link>
          </Button>
        </CardFooter>
      </Card>

      {/* Campaigns Section */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg flex items-center">
            <Megaphone className="h-5 w-5 mr-2 text-orange-500" />
            Active Campaigns
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-0">
          {campaigns.length > 0 ? (
            <div className="space-y-3">
              {campaigns.map(campaign => (
                <div key={campaign.id} className="border-b pb-3 last:border-0 last:pb-0">
                  <h3 className="font-medium">{campaign.title}</h3>
                  <div className="mt-1 space-y-1">
                    <div className="flex justify-between text-xs">
                      <span>Goal: {campaign.goal}</span>
                      <span>Ends: {campaign.endDate}</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div 
                        className="bg-orange-500 h-2.5 rounded-full" 
                        style={{ width: `${campaign.progress}%` }}
                      ></div>
                    </div>
                    <p className="text-xs text-right text-muted-foreground">{campaign.progress}% Complete</p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-muted-foreground text-sm py-2">No active campaigns</p>
          )}
        </CardContent>
        <CardFooter>
          <Button variant="outline" size="sm" className="w-full" asChild>
            <Link to="/campaigns">View All Campaigns</Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default EventsCampaignsSection;
