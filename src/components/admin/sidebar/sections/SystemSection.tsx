
import React from "react";
import { Server, Component, Brain, TestTube, Cog } from "lucide-react";
import { NavSection, NavItem } from "../NavSection";

interface SectionProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const SystemSection = ({ activeTab, setActiveTab }: SectionProps) => {
  return (
    <NavSection title="System">
      <NavItem
        id="system-updates"
        label="System Updates"
        icon={<Server className="mr-2 h-4 w-4" />}
        activeTab={activeTab}
        onClick={setActiveTab}
      />
      <NavItem
        id="addons"
        label="Addon Modules"
        icon={<Component className="mr-2 h-4 w-4" />}
        activeTab={activeTab}
        onClick={setActiveTab}
      />
      <NavItem
        id="ai-config"
        label="AI Configuration"
        icon={<Brain className="mr-2 h-4 w-4" />}
        activeTab={activeTab}
        onClick={setActiveTab}
      />
      <NavItem
        id="test-mode"
        label="Test Environment"
        icon={<TestTube className="mr-2 h-4 w-4" />}
        activeTab={activeTab}
        onClick={setActiveTab}
      />
      <NavItem
        id="maintenance"
        label="Maintenance Mode"
        icon={<Cog className="mr-2 h-4 w-4" />}
        activeTab={activeTab}
        onClick={setActiveTab}
      />
    </NavSection>
  );
};

export default SystemSection;
