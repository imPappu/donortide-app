
import React from "react";
import { 
  Settings, 
  RefreshCw, 
  Package, 
  AlertTriangle, 
  Gauge, 
  BrainCircuit,
  Calendar
} from "lucide-react";
import NavSection from "../NavSection";

interface SystemSectionProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const SystemSection = ({ activeTab, setActiveTab }: SystemSectionProps) => {
  return (
    <NavSection title="System">
      <div
        className={`flex w-full items-center rounded-md px-3 py-2 text-sm cursor-pointer ${
          activeTab === "system-updates" ? "bg-primary/10 font-medium text-primary" : "hover:bg-muted"
        }`}
        onClick={() => setActiveTab("system-updates")}
      >
        <RefreshCw className="mr-2 h-4 w-4" />
        System Updates
      </div>
      <div
        className={`flex w-full items-center rounded-md px-3 py-2 text-sm cursor-pointer ${
          activeTab === "addons" ? "bg-primary/10 font-medium text-primary" : "hover:bg-muted"
        }`}
        onClick={() => setActiveTab("addons")}
      >
        <Package className="mr-2 h-4 w-4" />
        Addon Modules
      </div>
      <div
        className={`flex w-full items-center rounded-md px-3 py-2 text-sm cursor-pointer ${
          activeTab === "events-campaigns" ? "bg-primary/10 font-medium text-primary" : "hover:bg-muted"
        }`}
        onClick={() => setActiveTab("events-campaigns")}
      >
        <Calendar className="mr-2 h-4 w-4" />
        Events & Campaigns
      </div>
      <div
        className={`flex w-full items-center rounded-md px-3 py-2 text-sm cursor-pointer ${
          activeTab === "maintenance" ? "bg-primary/10 font-medium text-primary" : "hover:bg-muted"
        }`}
        onClick={() => setActiveTab("maintenance")}
      >
        <AlertTriangle className="mr-2 h-4 w-4" />
        Maintenance Mode
      </div>
      <div
        className={`flex w-full items-center rounded-md px-3 py-2 text-sm cursor-pointer ${
          activeTab === "test-environment" ? "bg-primary/10 font-medium text-primary" : "hover:bg-muted"
        }`}
        onClick={() => setActiveTab("test-environment")}
      >
        <Gauge className="mr-2 h-4 w-4" />
        Test Environment
      </div>
      <div
        className={`flex w-full items-center rounded-md px-3 py-2 text-sm cursor-pointer ${
          activeTab === "ai-configuration" ? "bg-primary/10 font-medium text-primary" : "hover:bg-muted"
        }`}
        onClick={() => setActiveTab("ai-configuration")}
      >
        <BrainCircuit className="mr-2 h-4 w-4" />
        AI Configuration
      </div>
    </NavSection>
  );
};

export default SystemSection;
