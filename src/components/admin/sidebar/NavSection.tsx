
import React from "react";
import { Button } from "@/components/ui/button";
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
        isActive ? "bg-sidebar-primary text-sidebar-primary-foreground" : "hover:bg-sidebar-accent text-sidebar-foreground hover:text-sidebar-accent-foreground"
      )}
      onClick={() => onClick(id)}
    >
      <div className={cn(
        "mr-2 flex items-center justify-center transition-transform group-hover:scale-110",
        isActive ? "text-sidebar-primary-foreground" : "text-sidebar-foreground"
      )}>
        {icon}
      </div>
      <span className={cn(
        "transition-colors",
        isActive ? "text-sidebar-primary-foreground" : ""
      )}>
        {label}
      </span>
    </Button>
  );
};

interface NavSectionProps {
  title: string;
  children: React.ReactNode;
  collapsible?: boolean;
}

export const NavSection = ({ title, children, collapsible = false }: NavSectionProps) => {
  const [isCollapsed, setIsCollapsed] = React.useState(false);
  
  const toggleCollapse = () => {
    if (collapsible) {
      setIsCollapsed(!isCollapsed);
    }
  };
  
  return (
    <div className="px-3 py-2">
      <h2 
        className={cn(
          "mb-2 px-4 text-xs font-semibold uppercase tracking-wider text-sidebar-foreground/70",
          collapsible && "cursor-pointer hover:text-sidebar-foreground transition-colors flex items-center justify-between"
        )}
        onClick={toggleCollapse}
      >
        {title}
        {collapsible && (
          <span className="text-xs">
            {isCollapsed ? "+" : "-"}
          </span>
        )}
      </h2>
      <div className={cn(
        "space-y-1 transition-all",
        isCollapsed ? "h-0 overflow-hidden opacity-0" : "opacity-100"
      )}>
        {children}
      </div>
    </div>
  );
};
