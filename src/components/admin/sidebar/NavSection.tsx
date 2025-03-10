
import React from "react";
import { Button } from "@/components/ui/button";
import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface NavItemProps {
  id: string;
  label: string;
  icon: React.ReactNode;
  activeTab: string;
  onClick: (id: string) => void;
}

export const NavItem = ({ id, label, icon, activeTab, onClick }: NavItemProps) => {
  const isActive = activeTab === id;
  
  return (
    <Button
      variant={isActive ? "secondary" : "ghost"}
      className={cn(
        "w-full justify-start font-medium transition-all",
        isActive ? "bg-primary/10" : "hover:bg-secondary/80"
      )}
      onClick={() => onClick(id)}
    >
      <div className={cn(
        "mr-2 flex items-center justify-center",
        isActive ? "text-primary" : "text-muted-foreground"
      )}>
        {icon}
      </div>
      <span className={isActive ? "text-primary" : ""}>{label}</span>
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
