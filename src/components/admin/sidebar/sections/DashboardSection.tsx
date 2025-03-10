
import React from "react";
import { LayoutDashboard, Brain } from "lucide-react";
import { NavSection, NavItem } from "../NavSection";

interface SectionProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const DashboardSection = ({ activeTab, setActiveTab }: SectionProps) => {
  return (
    <NavSection title="Dashboard">
      <NavItem
        id="dashboard"
        label="Dashboard"
        icon={<LayoutDashboard className="mr-2 h-4 w-4" />}
        activeTab={activeTab}
        onClick={setActiveTab}
      />
      <NavItem
        id="algorithm"
        label="Matching Algorithm"
        icon={<Brain className="mr-2 h-4 w-4" />}
        activeTab={activeTab}
        onClick={setActiveTab}
      />
    </NavSection>
  );
};

export default DashboardSection;
