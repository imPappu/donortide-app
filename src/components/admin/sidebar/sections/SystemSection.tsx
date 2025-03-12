
import React from "react";
import { 
  RefreshCw, 
  Package, 
  AlertTriangle, 
  Gauge, 
  BrainCircuit,
  Calendar,
  Book
} from "lucide-react";
import { NavSection, NavItem } from "../NavSection";

interface SystemSectionProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const SystemSection = ({ activeTab, setActiveTab }: SystemSectionProps) => {
  // Function to open installation guide in a new tab
  const openInstallationGuide = () => {
    window.open('/installation-guide.html', '_blank');
  };

  return (
    <NavSection title="System">
      <NavItem
        id="system-updates"
        label="System Updates"
        icon={<RefreshCw className="mr-2 h-4 w-4" />}
        activeTab={activeTab}
        onClick={setActiveTab}
      />
      <NavItem
        id="addons"
        label="Addon Modules"
        icon={<Package className="mr-2 h-4 w-4" />}
        activeTab={activeTab}
        onClick={setActiveTab}
      />
      <NavItem
        id="events-campaigns"
        label="Events & Campaigns"
        icon={<Calendar className="mr-2 h-4 w-4" />}
        activeTab={activeTab}
        onClick={setActiveTab}
      />
      <NavItem
        id="maintenance"
        label="Maintenance Mode"
        icon={<AlertTriangle className="mr-2 h-4 w-4" />}
        activeTab={activeTab}
        onClick={setActiveTab}
      />
      <NavItem
        id="test-environment"
        label="Test Environment"
        icon={<Gauge className="mr-2 h-4 w-4" />}
        activeTab={activeTab}
        onClick={setActiveTab}
      />
      <NavItem
        id="ai-configuration"
        label="AI Configuration"
        icon={<BrainCircuit className="mr-2 h-4 w-4" />}
        activeTab={activeTab}
        onClick={setActiveTab}
      />
      <div
        className="flex w-full items-center rounded-md px-3 py-2 text-sm cursor-pointer hover:bg-muted"
        onClick={openInstallationGuide}
      >
        <Book className="mr-2 h-4 w-4" />
        <span>Installation Guide</span>
      </div>
    </NavSection>
  );
};

export default SystemSection;
