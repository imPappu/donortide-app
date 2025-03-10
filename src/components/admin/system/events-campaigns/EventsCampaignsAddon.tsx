
import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, Megaphone } from "lucide-react";
import EventsTab from "./EventsTab";
import CampaignsTab from "./CampaignsTab";

const EventsCampaignsAddon = () => {
  const [activeTab, setActiveTab] = useState<"events" | "campaigns">("events");

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Calendar className="mr-2 h-5 w-5 text-primary" />
          Events & Campaigns Management
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as "events" | "campaigns")}>
          <TabsList className="grid grid-cols-2 w-full max-w-md mb-4">
            <TabsTrigger value="events" className="flex items-center">
              <Calendar className="mr-2 h-4 w-4" />
              Events
            </TabsTrigger>
            <TabsTrigger value="campaigns" className="flex items-center">
              <Megaphone className="mr-2 h-4 w-4" />
              Campaigns
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="events">
            <EventsTab />
          </TabsContent>
          
          <TabsContent value="campaigns">
            <CampaignsTab />
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default EventsCampaignsAddon;
