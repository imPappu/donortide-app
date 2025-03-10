
import React from "react";
import CampaignCard, { CampaignCardProps } from "./CampaignCard";

interface CampaignGridProps {
  campaigns: CampaignCardProps[];
}

const CampaignGrid = ({ campaigns }: CampaignGridProps) => {
  return (
    <div className="grid md:grid-cols-2 gap-6">
      {campaigns.map((campaign) => (
        <CampaignCard
          key={campaign.id}
          id={campaign.id}
          title={campaign.title}
          goal={campaign.goal}
          progress={campaign.progress}
          endDate={campaign.endDate}
          description={campaign.description}
          image={campaign.image}
        />
      ))}
    </div>
  );
};

export default CampaignGrid;
