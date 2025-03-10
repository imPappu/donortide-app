
import React from "react";
import { Briefcase, Users, UserCheck } from "lucide-react";
import { NavSection, NavItem } from "../NavSection";

interface SectionProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const UserSection = ({ activeTab, setActiveTab }: SectionProps) => {
  return (
    <NavSection title="Users">
      <NavItem
        id="staff"
        label="Staff"
        icon={<Briefcase className="mr-2 h-4 w-4" />}
        activeTab={activeTab}
        onClick={setActiveTab}
      />
      <NavItem
        id="donors"
        label="Donors"
        icon={<Users className="mr-2 h-4 w-4" />}
        activeTab={activeTab}
        onClick={setActiveTab}
      />
      <NavItem
        id="volunteers"
        label="Volunteers"
        icon={<UserCheck className="mr-2 h-4 w-4" />}
        activeTab={activeTab}
        onClick={setActiveTab}
      />
    </NavSection>
  );
};

export default UserSection;
