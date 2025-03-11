
import React from "react";
import ContentRouter from "./content/ContentRouter";

interface AdminContentProps {
  activeTab: string;
  stats?: {
    totalUsers: number;
    totalDonations: number;
    totalRequests: number;
    totalLocations: number;
  };
  loading?: boolean;
}

const AdminContent = ({
  activeTab,
  stats,
  loading
}: AdminContentProps) => {
  return (
    <ContentRouter
      activeTab={activeTab}
      stats={stats}
      loading={loading}
    />
  );
};

export default AdminContent;
