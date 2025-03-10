
import React from "react";
import TopNavbar from "@/components/TopNavbar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Megaphone, Target, CalendarClock } from "lucide-react";
import { Button } from "@/components/ui/button";

const Campaigns = () => {
  const activeCampaigns = [
    {
      id: "1",
      title: "Summer Blood Drive Campaign",
      goal: "500 donors",
      progress: 65,
      endDate: "Aug 31, 2023",
      description: "Our annual summer campaign aims to replenish blood supplies during the critical summer months when donations typically decrease but demand increases.",
      image: "https://placehold.co/600x400/red/white?text=Summer+Campaign"
    },
    {
      id: "2",
      title: "Hospital Emergency Reserves",
      goal: "1000 units",
      progress: 42,
      endDate: "July 15, 2023",
      description: "Help us build up emergency blood reserves for our local hospitals to ensure they're prepared for any disaster or mass casualty event.",
      image: "https://placehold.co/600x400/blue/white?text=Emergency+Reserves"
    },
    {
      id: "3",
      title: "Rare Blood Types Awareness",
      goal: "200 rare type donors",
      progress: 28,
      endDate: "September 30, 2023",
      description: "Focusing on finding donors with rare blood types including AB-, B-, and O-. These types are critically needed but in short supply.",
      image: "https://placehold.co/600x400/purple/white?text=Rare+Types"
    },
    {
      id: "4",
      title: "University Challenge",
      goal: "5 universities, 1000 students",
      progress: 51,
      endDate: "October 31, 2023",
      description: "Inter-university competition to encourage young donors. The university with the highest percentage of participating students wins a community grant.",
      image: "https://placehold.co/600x400/green/white?text=University+Challenge"
    }
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <TopNavbar />
      
      <div className="container mx-auto px-4 py-6 flex-1 pb-20 max-w-6xl">
        <h1 className="text-2xl font-bold mb-6 flex items-center">
          <Megaphone className="h-6 w-6 mr-2 text-orange-500" />
          Active Blood Donation Campaigns
        </h1>
        
        <div className="grid md:grid-cols-2 gap-6">
          {activeCampaigns.map((campaign) => (
            <Card key={campaign.id} className="overflow-hidden">
              <div className="aspect-video w-full">
                <img 
                  src={campaign.image} 
                  alt={campaign.title} 
                  className="w-full h-full object-cover"
                />
              </div>
              <CardHeader className="pb-2">
                <CardTitle>{campaign.title}</CardTitle>
                <div className="flex justify-between text-sm">
                  <span className="flex items-center text-muted-foreground">
                    <Target className="h-4 w-4 mr-1" />
                    Goal: {campaign.goal}
                  </span>
                  <span className="flex items-center text-muted-foreground">
                    <CalendarClock className="h-4 w-4 mr-1" />
                    Ends: {campaign.endDate}
                  </span>
                </div>
                <div className="mt-2 space-y-1">
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div 
                      className="bg-orange-500 h-2.5 rounded-full" 
                      style={{ width: `${campaign.progress}%` }}
                    ></div>
                  </div>
                  <p className="text-xs text-right text-muted-foreground">{campaign.progress}% Complete</p>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="text-sm">{campaign.description}</p>
                <Button className="w-full">Support This Campaign</Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Campaigns;
