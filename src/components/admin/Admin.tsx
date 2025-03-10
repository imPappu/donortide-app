
import React, { useState } from 'react';
import AdminSidebar from './AdminSidebar';
import AdminContent from './AdminContent';
import AdminHeader from './AdminHeader';
import { useAuth } from '@/components/auth/AuthContext';
import { useNavigate } from 'react-router-dom';

export interface AdminProps {
  initialTab?: string;
}

const Admin: React.FC<AdminProps> = ({ initialTab = 'dashboard' }) => {
  const [activeTab, setActiveTab] = useState<string>(initialTab);
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <AdminSidebar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        handleLogout={handleLogout} 
      />
      <div className="flex flex-col flex-1 overflow-hidden">
        <AdminHeader activeTab={activeTab} />
        <AdminContent initialTab={initialTab} activeTab={activeTab} />
      </div>
    </div>
  );
};

export default Admin;
