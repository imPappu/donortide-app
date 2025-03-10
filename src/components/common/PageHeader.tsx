
import React, { ReactNode } from "react";

interface PageHeaderProps {
  icon: ReactNode;
  title: string;
  className?: string;
}

const PageHeader = ({ icon, title, className = "" }: PageHeaderProps) => {
  return (
    <h1 className={`text-2xl font-bold mb-6 flex items-center ${className}`}>
      {icon}
      {title}
    </h1>
  );
};

export default PageHeader;
