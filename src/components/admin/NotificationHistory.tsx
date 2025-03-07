
import React from "react";

const NotificationHistory = () => {
  return (
    <div>
      <h3 className="font-medium mb-4">Notification History</h3>
      <div className="space-y-3">
        <div className="p-3 border rounded-md">
          <div className="flex justify-between">
            <h4 className="font-medium">Urgent Blood Required</h4>
            <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">Sent</span>
          </div>
          <p className="text-sm text-muted-foreground mt-1">We need urgent O- blood donations at City Hospital</p>
          <div className="flex justify-between mt-2 text-xs text-muted-foreground">
            <span>Target: All Donors</span>
            <span>Sent: 2 hours ago</span>
          </div>
        </div>
        
        <div className="p-3 border rounded-md">
          <div className="flex justify-between">
            <h4 className="font-medium">New Donation Drive</h4>
            <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">Sent</span>
          </div>
          <p className="text-sm text-muted-foreground mt-1">Join our donation drive this weekend at Memorial Park</p>
          <div className="flex justify-between mt-2 text-xs text-muted-foreground">
            <span>Target: All Users</span>
            <span>Sent: 1 day ago</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotificationHistory;
