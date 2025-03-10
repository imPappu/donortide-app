
import React from "react";
import { Building, UserPlus } from "lucide-react";
import { NavSection, NavItem } from "../NavSection";

interface SectionProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const OrganizationSection = ({ activeTab, setActiveTab }: SectionProps) => {
  return (
    <NavSection title="Organizations & Services">
      <NavItem
        id="organizations"
        label="Organizations"
        icon={<Building className="mr-2 h-4 w-4" />}
        activeTab={activeTab}
        onClick={setActiveTab}
      />
      <NavItem
        id="services"
        label="Services"
        icon={<UserPlus className="mr-2 h-4 w-4" />}
        activeTab={activeTab}
        onClick={setActiveTab}
      />
    </NavSection>
  );
};

export default OrganizationSection;
