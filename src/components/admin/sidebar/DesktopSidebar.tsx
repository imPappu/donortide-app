
import React from "react";
import { Link } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  ListChecks,
  CreditCard,
  Settings,
  Bell,
  MessageSquare,
  BarChart4,
  Calendar,
  BookOpen,
  FileText,
  Menu,
} from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

import NavSection from "./NavSection";
import NavItem from "./NavItem";

interface DesktopSidebarProps {
  isCollapsed?: boolean;
  onToggle?: () => void;
}

const DesktopSidebar: React.FC<DesktopSidebarProps> = ({
  isCollapsed = false,
  onToggle,
}) => {
  return (
    <aside
      className={cn(
        "hidden border-r bg-background lg:block transition-all duration-300",
        isCollapsed ? "w-16" : "w-64"
      )}
    >
      <div className="sticky top-0 z-10 flex h-16 items-center justify-between border-b px-4">
        {!isCollapsed && (
          <Link to="/" className="flex items-center gap-2 font-semibold">
            <span className="text-primary font-bold">Donor</span>
            <span>Tide</span>
          </Link>
        )}
        <Button
          variant="ghost"
          size="icon"
          className="ml-auto h-8 w-8"
          onClick={onToggle}
        >
          <Menu className="h-4 w-4" />
          <span className="sr-only">Toggle sidebar</span>
        </Button>
      </div>
      <ScrollArea className="h-[calc(100vh-4rem)]">
        <div className="px-3 py-4">
          <div className="space-y-4">
            <NavSection title={isCollapsed ? "" : "General"}>
              <NavItem
                href="/admin/dashboard"
                icon={<LayoutDashboard className="h-4 w-4" />}
                label={isCollapsed ? "" : "Dashboard"}
                isActive={true}
              />
              <NavItem
                href="/admin/donors"
                icon={<Users className="h-4 w-4" />}
                label={isCollapsed ? "" : "Donors"}
              />
              <NavItem
                href="/admin/requests"
                icon={<ListChecks className="h-4 w-4" />}
                label={isCollapsed ? "" : "Blood Requests"}
              />
              <NavItem
                href="/admin/payments"
                icon={<CreditCard className="h-4 w-4" />}
                label={isCollapsed ? "" : "Payments"}
              />
            </NavSection>
            {/* Add other NavSection components as needed */}
          </div>
        </div>
      </ScrollArea>
    </aside>
  );
};

export default DesktopSidebar;
