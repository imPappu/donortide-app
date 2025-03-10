
import React from "react";
import { Flame, Bell, BadgeDollarSign } from "lucide-react";
import { NavSection, NavItem } from "../NavSection";

interface SectionProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const MarketingSection = ({ activeTab, setActiveTab }: SectionProps) => {
  return (
    <NavSection title="Marketing">
      <NavItem
        id="push-notifications"
        label="Firebase Push"
        icon={<Flame className="mr-2 h-4 w-4" />}
        activeTab={activeTab}
        onClick={setActiveTab}
      />
      <NavItem
        id="notifications"
        label="Notifications"
        icon={<Bell className="mr-2 h-4 w-4" />}
        activeTab={activeTab}
        onClick={setActiveTab}
      />
      <NavItem
        id="ads"
        label="Ads Management"
        icon={<BadgeDollarSign className="mr-2 h-4 w-4" />}
        activeTab={activeTab}
        onClick={setActiveTab}
      />
    </NavSection>
  );
};

export default MarketingSection;
