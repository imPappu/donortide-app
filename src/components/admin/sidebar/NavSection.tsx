
import React from 'react';
import { cn } from '@/lib/utils';

export interface NavSectionProps {
  title: string;
  children: React.ReactNode;
  className?: string;
}

export const NavSection: React.FC<NavSectionProps> = ({
  title,
  children,
  className,
}) => {
  return (
    <div className={cn("pb-4", className)}>
      <h3 className="mb-2 px-3 text-xs font-semibold uppercase text-muted-foreground">
        {title}
      </h3>
      <div className="space-y-1">{children}</div>
    </div>
  );
};

export default NavSection;
