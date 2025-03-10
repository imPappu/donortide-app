
import React from "react";
import { Button } from "@/components/ui/button";
import { LucideIcon } from "lucide-react";

interface NavItemProps {
  id: string;
  label: string;
  icon: React.ReactNode;
  activeTab: string;
  onClick: (id: string) => void;
}

export const NavItem = ({ id, label, icon, activeTab, onClick }: NavItemProps) => {
  return (
    <Button
      variant={activeTab === id ? "secondary" : "ghost"}
      className="w-full justify-start"
      onClick={() => onClick(id)}
    >
      {icon}
      {label}
    </Button>
  );
};

interface NavSectionProps {
  title: string;
  children: React.ReactNode;
}

export const NavSection = ({ title, children }: NavSectionProps) => {
  return (
    <div className="px-3 py-2">
      <h2 className="mb-2 px-4 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
        {title}
      </h2>
      <div className="space-y-1">
        {children}
      </div>
    </div>
  );
};
