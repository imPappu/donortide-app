
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import NotificationPanel from "./NotificationPanel";
import NotificationHistory from "./NotificationHistory";
import { Notification } from "@/services/dbService";

interface PushNotificationCenterProps {
  notification: Partial<Notification>;
  setNotification: React.Dispatch<React.SetStateAction<Partial<Notification>>>;
}

const PushNotificationCenter = ({ notification, setNotification }: PushNotificationCenterProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Push Notification Center</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <h3 className="font-medium">Send New Notification</h3>
            <NotificationPanel notification={notification} setNotification={setNotification} />
          </div>
          
          <NotificationHistory />
        </div>
      </CardContent>
    </Card>
  );
};

export default PushNotificationCenter;
