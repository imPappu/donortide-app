import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Bell } from "lucide-react";
import { useToast } from '@/hooks/use-toast';
import { Notification } from "@/types/apiTypes";
import { sendNotification } from "@/services/notificationService";

interface NotificationPanelProps {
  notification: Partial<Notification>;
  setNotification: React.Dispatch<React.SetStateAction<Partial<Notification>>>;
}

const NotificationPanel = ({ notification, setNotification }: NotificationPanelProps) => {
  const { toast } = useToast();

  const handleNotificationChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setNotification(prev => ({ ...prev, [name]: value }));
  };

  const handleSendNotification = async () => {
    if (!notification.title || !notification.message) {
      toast({
        title: "Error",
        description: "Please provide both title and message for the notification",
        variant: "destructive",
      });
      return;
    }

    try {
      await sendNotification(notification as Notification);
      setNotification({
        title: '',
        message: '',
        targetType: 'all'
      });
      toast({
        title: "Success",
        description: "Notification sent successfully",
      });
    } catch (error) {
      console.error('Error sending notification:', error);
      toast({
        title: "Error",
        description: "Failed to send notification",
        variant: "destructive",
      });
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Notifications</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Title</Label>
            <Input 
              name="title"
              value={notification.title}
              onChange={handleNotificationChange}
              placeholder="Notification title"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="message">Message</Label>
            <textarea 
              name="message"
              value={notification.message}
              onChange={handleNotificationChange}
              placeholder="Notification message"
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              rows={3}
            ></textarea>
          </div>
          <div className="space-y-2">
            <Label htmlFor="targetType">Target Audience</Label>
            <select 
              name="targetType"
              value={notification.targetType}
              onChange={handleNotificationChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            >
              <option value="all">All Users</option>
              <option value="donors">All Donors</option>
              <option value="specific_users">Specific Blood Types</option>
            </select>
          </div>
          
          {notification.targetType === 'specific_users' && (
            <div className="space-y-2">
              <Label htmlFor="blood-types">Blood Types</Label>
              <div className="grid grid-cols-2 gap-2">
                {['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'].map(type => (
                  <label key={type} className="flex items-center space-x-2">
                    <input type="checkbox" className="w-4 h-4" />
                    <span>{type}</span>
                  </label>
                ))}
              </div>
            </div>
          )}
          
          <Button onClick={handleSendNotification} className="w-full">
            <Bell className="h-4 w-4 mr-2" />
            Send Push Notification
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default NotificationPanel;
