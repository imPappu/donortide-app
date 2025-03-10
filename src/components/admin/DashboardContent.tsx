
import React from 'react';
import DashboardStats from './DashboardStats';
import RecentRequests from './RecentRequests';

const DashboardContent: React.FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
      <DashboardStats />
      <RecentRequests />
    </div>
  );
};

export default DashboardContent;
