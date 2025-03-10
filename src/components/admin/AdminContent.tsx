
import React from 'react';
import { Tabs, TabsContent } from '@/components/ui/tabs';
import DashboardContent from './DashboardContent';
import { BloodRequest } from '@/services/dbService';
import { Banner, BlogPost, Notification } from '@/types/apiTypes';

export interface AdminContentProps {
  initialTab?: string;
  activeTab?: string;
  stats?: {
    totalUsers: number;
    totalDonations: number;
    totalRequests: number;
    totalLocations: number;
    recentRequests?: BloodRequest[];
  };
  banners?: Banner[];
  setBanners?: React.Dispatch<React.SetStateAction<Banner[]>>;
  blogPosts?: BlogPost[];
  setBlogPosts?: React.Dispatch<React.SetStateAction<BlogPost[]>>;
  notification?: Partial<Notification>;
  setNotification?: React.Dispatch<React.SetStateAction<Partial<Notification>>>;
  loading?: boolean;
}

const AdminContent: React.FC<AdminContentProps> = ({ 
  initialTab = 'dashboard', 
  activeTab,
  stats,
  banners,
  setBanners,
  blogPosts,
  setBlogPosts,
  notification,
  setNotification,
  loading = false
}) => {
  // Use activeTab if provided, otherwise fall back to initialTab
  const currentTab = activeTab || initialTab;
  
  return (
    <main className="flex-1 overflow-y-auto">
      <Tabs defaultValue={currentTab} className="w-full">
        <TabsContent value="dashboard">
          <DashboardContent 
            stats={stats}
            loading={loading}
          />
        </TabsContent>
        {/* Other tab contents */}
      </Tabs>
    </main>
  );
};

export default AdminContent;
