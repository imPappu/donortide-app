import React from 'react';
import { Tabs, TabsContent } from '@/components/ui/tabs';
import DashboardContent from './DashboardContent';

export interface AdminContentProps {
  initialTab?: string;
}

const AdminContent: React.FC<AdminContentProps> = ({ initialTab = 'dashboard' }) => {
  return (
    <main className="flex-1 overflow-y-auto">
      <Tabs defaultValue={initialTab} className="w-full">
        <TabsContent value="dashboard">
          <DashboardContent />
        </TabsContent>
        {/* Other tab contents */}
      </Tabs>
    </main>
  );
};

export default AdminContent;
