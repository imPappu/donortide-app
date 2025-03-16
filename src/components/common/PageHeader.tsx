
import React from "react";

export interface PageHeaderProps {
  title: string;
  description?: string;
  icon?: React.ReactNode;
  children?: React.ReactNode;
}

const PageHeader = ({ title, description, icon, children }: PageHeaderProps) => {
  return (
    <div className="mb-6">
      <h1 className="text-2xl font-bold tracking-tight flex items-center">
        {icon && <span className="mr-2">{icon}</span>}
        {title}
      </h1>
      {description && (
        <p className="text-muted-foreground mt-1">{description}</p>
      )}
      {children}
    </div>
  );
};

export default PageHeader;
