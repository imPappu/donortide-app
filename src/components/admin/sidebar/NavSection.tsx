
import React from "react";

interface NavItemProps {
  id: string;
  label: string;
  icon: React.ReactNode;
  activeTab: string;
  onClick: (tab: string) => void;
}

interface NavSectionProps {
  title: string;
  children: React.ReactNode;
}

export const NavItem = ({ id, label, icon, activeTab, onClick }: NavItemProps) => {
  return (
    <div
      className={`flex w-full items-center rounded-md px-3 py-2 text-sm cursor-pointer ${
        activeTab === id ? "bg-primary/10 font-medium text-primary" : "hover:bg-muted"
      }`}
      onClick={() => onClick(id)}
    >
      {icon}
      <span>{label}</span>
    </div>
  );
};

export const NavSection = ({ title, children }: NavSectionProps) => {
  return (
    <div className="mb-4 px-3 py-2">
      <h3 className="mb-2 px-4 text-xs font-semibold text-foreground/80">{title}</h3>
      <div className="space-y-1">{children}</div>
    </div>
  );
};
