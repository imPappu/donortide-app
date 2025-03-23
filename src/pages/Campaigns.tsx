
import React from "react";
import TopNavbar from "@/components/TopNavbar";
import { Megaphone, Plus } from "lucide-react";
import PageHeader from "@/components/common/PageHeader";
import CampaignGrid from "@/components/campaigns/CampaignGrid";
import { CampaignCardProps } from "@/components/campaigns/CampaignCard";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import Navigation from "@/components/Navigation";

const Campaigns = () => {
  const activeCampaigns: CampaignCardProps[] = [
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
      <TopNavbar title="Campaigns" showBackButton />
      
      <div className="container mx-auto px-4 py-6 flex-1 pb-20 max-w-6xl">
        <div className="flex items-center justify-between mb-6">
          <PageHeader 
            icon={<Megaphone className="h-6 w-6 mr-2 text-orange-500" />}
            title="Active Blood Donation Campaigns"
          />
          
          <Link to="/campaigns/create">
            <Button className="flex items-center gap-1">
              <Plus className="h-4 w-4" />
              New Campaign
            </Button>
          </Link>
        </div>
        
        <CampaignGrid campaigns={activeCampaigns} />
      </div>
      
      <Navigation />
    </div>
  );
};

export default Campaigns;
