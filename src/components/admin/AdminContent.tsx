
import React from 'react';
import { Tabs, TabsContent } from '@/components/ui/tabs';
import DashboardContent from './DashboardContent';

export interface AdminContentProps {
  initialTab?: string;
  activeTab?: string; // Add this prop to match what's being passed from Admin.tsx
}

const AdminContent: React.FC<AdminContentProps> = ({ initialTab = 'dashboard', activeTab }) => {
  // Use activeTab if provided, otherwise fall back to initialTab
  const currentTab = activeTab || initialTab;
  
  return (
    <main className="flex-1 overflow-y-auto">
      <Tabs defaultValue={currentTab} className="w-full">
        <TabsContent value="dashboard">
          <DashboardContent />
        </TabsContent>
        {/* Other tab contents */}
      </Tabs>
    </main>
  );
};

export default AdminContent;
