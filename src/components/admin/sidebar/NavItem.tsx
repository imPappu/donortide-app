
import React from 'react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';

export interface NavItemProps {
  icon: React.ReactNode;
  href: string;
  label: string;
  isActive?: boolean;
}

export const NavItem: React.FC<NavItemProps> = ({
  icon,
  href,
  label,
  isActive = false,
}) => {
  return (
    <Link
      to={href}
      className={cn(
        "flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-all hover:bg-gray-100 dark:hover:bg-gray-800",
        isActive ? "bg-gray-100 font-medium text-primary dark:bg-gray-800" : "text-muted-foreground"
      )}
    >
      <span className="text-lg">{icon}</span>
      <span>{label}</span>
    </Link>
  );
};

export default NavItem;
