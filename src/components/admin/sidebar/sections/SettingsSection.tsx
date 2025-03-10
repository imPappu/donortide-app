
import React from "react";
import { Palette, Database, CreditCard, Settings } from "lucide-react";
import { NavSection, NavItem } from "../NavSection";

interface SectionProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const SettingsSection = ({ activeTab, setActiveTab }: SectionProps) => {
  return (
    <NavSection title="Settings">
      <NavItem
        id="app-branding"
        label="App Branding"
        icon={<Palette className="mr-2 h-4 w-4" />}
        activeTab={activeTab}
        onClick={setActiveTab}
      />
      <NavItem
        id="database"
        label="Database"
        icon={<Database className="mr-2 h-4 w-4" />}
        activeTab={activeTab}
        onClick={setActiveTab}
      />
      <NavItem
        id="payment"
        label="Payment Gateways"
        icon={<CreditCard className="mr-2 h-4 w-4" />}
        activeTab={activeTab}
        onClick={setActiveTab}
      />
      <NavItem
        id="app-settings"
        label="App Settings"
        icon={<Settings className="mr-2 h-4 w-4" />}
        activeTab={activeTab}
        onClick={setActiveTab}
      />
      <NavItem
        id="splash-screen"
        label="Splash Screen"
        icon={<Palette className="mr-2 h-4 w-4" />}
        activeTab={activeTab}
        onClick={setActiveTab}
      />
    </NavSection>
  );
};

export default SettingsSection;
