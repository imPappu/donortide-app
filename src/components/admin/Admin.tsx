
import React from 'react';
import AdminSidebar from './AdminSidebar';
import AdminContent from './AdminContent';
import AdminHeader from './AdminHeader';

export interface AdminProps {
  initialTab?: string;
}

const Admin: React.FC<AdminProps> = ({ initialTab = 'dashboard' }) => {
  return (
    <div className="flex h-screen bg-gray-100">
      <AdminSidebar />
      <div className="flex flex-col flex-1 overflow-hidden">
        <AdminHeader />
        <AdminContent initialTab={initialTab} />
      </div>
    </div>
  );
};

export default Admin;
