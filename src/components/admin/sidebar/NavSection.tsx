
import React from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ChevronRight, ChevronDown } from "lucide-react";

interface NavItemProps {
  id: string;
  label: string;
  icon: React.ReactNode;
  activeTab: string;
  onClick: (id: string) => void;
  badge?: number | string;
}

export const NavItem = ({ id, label, icon, activeTab, onClick, badge }: NavItemProps) => {
  const isActive = activeTab === id;
  
  return (
    <Button
      variant={isActive ? "secondary" : "ghost"}
      className={cn(
        "w-full justify-start font-medium transition-all",
        isActive 
          ? "bg-sidebar-primary text-sidebar-primary-foreground dark:bg-blue-600/90 dark:text-white" 
          : "hover:bg-sidebar-accent text-sidebar-foreground hover:text-sidebar-accent-foreground"
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
        "transition-colors flex-1 text-left",
        isActive ? "text-sidebar-primary-foreground" : ""
      )}>
        {label}
      </span>
      
      {badge && (
        <div className={cn(
          "rounded-full px-1.5 py-0.5 text-xs font-semibold",
          isActive
            ? "bg-white/20 text-white"
            : "bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-gray-300"
        )}>
          {badge}
        </div>
      )}
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
          "mb-2 px-2 text-xs font-semibold uppercase tracking-wider text-sidebar-foreground/70",
          collapsible && "cursor-pointer hover:text-sidebar-foreground transition-colors flex items-center justify-between"
        )}
        onClick={toggleCollapse}
      >
        {title}
        {collapsible && (
          <span className="text-xs">
            {isCollapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
          </span>
        )}
      </h2>
      <div className={cn(
        "space-y-1 transition-all overflow-hidden",
        isCollapsed ? "max-h-0 opacity-0" : "max-h-[1000px] opacity-100"
      )}>
        {children}
      </div>
    </div>
  );
};
