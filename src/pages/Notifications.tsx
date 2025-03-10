
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Bell, Info, Heart, Calendar, Users } from "lucide-react";
import TopNavbar from "@/components/TopNavbar";

interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'request' | 'event' | 'community' | 'system';
  timestamp: string;
  read: boolean;
}

const NotificationCard = ({ notification }: { notification: Notification }) => {
  return (
    <Card className={`mb-3 ${notification.read ? 'bg-card' : 'bg-primary/5'}`}>
      <CardContent className="p-4">
        <div className="flex items-start">
          <div className="mr-3 mt-1">
            {notification.type === 'request' && (
              <div className="h-8 w-8 rounded-full bg-red-100 flex items-center justify-center">
                <Heart className="h-4 w-4 text-red-600" />
              </div>
            )}
            {notification.type === 'event' && (
              <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center">
                <Calendar className="h-4 w-4 text-blue-600" />
              </div>
            )}
            {notification.type === 'community' && (
              <div className="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center">
                <Users className="h-4 w-4 text-green-600" />
              </div>
            )}
            {notification.type === 'system' && (
              <div className="h-8 w-8 rounded-full bg-gray-100 flex items-center justify-center">
                <Info className="h-4 w-4 text-gray-600" />
              </div>
            )}
          </div>
          <div className="flex-1">
            <h3 className="font-medium text-sm">{notification.title}</h3>
            <p className="text-xs text-muted-foreground mt-1">{notification.message}</p>
            <p className="text-xs text-muted-foreground mt-2">{notification.timestamp}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

const Notifications = () => {
  const notifications: Notification[] = [
    {
      id: '1',
      title: 'Urgent O- Blood Needed',
      message: 'Memorial Hospital has an urgent request for O- blood type. Can you help?',
      type: 'request',
      timestamp: '30 minutes ago',
      read: false
    },
    {
      id: '2',
      title: 'Donation Drive This Weekend',
      message: 'Join us for a blood donation camp this Saturday at City Center Park from 9 AM to 5 PM.',
      type: 'event',
      timestamp: '2 hours ago',
      read: false
    },
    {
      id: '3',
      title: 'New Achievement Unlocked',
      message: 'Congratulations! You\'ve earned the "Hero Donor" badge for your recent donation.',
      type: 'system',
      timestamp: '1 day ago',
      read: true
    },
    {
      id: '4',
      title: 'New Story in the Community',
      message: 'Sarah shared how her donation helped save a life. Check it out!',
      type: 'community',
      timestamp: '2 days ago',
      read: true
    },
    {
      id: '5',
      title: 'Weekly Donation Stats',
      message: 'This week, our community has helped 15 patients with successful blood donations.',
      type: 'system',
      timestamp: '3 days ago',
      read: true
    }
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <TopNavbar title="Notifications" />
      
      <div className="container max-w-md mx-auto px-4 py-6 flex-1 pb-20">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold flex items-center">
            <Bell className="mr-2 h-5 w-5" />
            Notifications
          </h2>
          <button className="text-sm text-primary">Mark all as read</button>
        </div>

        {notifications.map(notification => (
          <NotificationCard key={notification.id} notification={notification} />
        ))}
      </div>
    </div>
  );
};

export default Notifications;
