import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Notification } from '@/types/apiTypes';
import { sendNotification } from '@/services/notificationService';

interface NotificationFormProps {
  onSend: (notification: Partial<Notification>) => void;
}

const NotificationForm: React.FC<NotificationFormProps> = ({ onSend }) => {
  const [userId, setUserId] = useState('');
  const [title, setTitle] = useState('');
  const [message, setMessage] = useState('');
  const [type, setType] = useState<Notification['type']>('info');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const notification: Partial<Notification> = {
      userId,
      title,
      message,
      type,
      read: false,
      createdAt: new Date().toISOString()
    };
    onSend(notification);
    setUserId('');
    setTitle('');
    setMessage('');
    setType('info');
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="userId">User ID</Label>
        <Input
          id="userId"
          placeholder="Enter user ID"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
          required
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="title">Title</Label>
        <Input
          id="title"
          placeholder="Enter notification title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="message">Message</Label>
        <Input
          id="message"
          placeholder="Enter notification message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          required
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="type">Type</Label>
        <select
          id="type"
          className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
          value={type}
          onChange={(e) => setType(e.target.value as Notification['type'])}
        >
          <option value="info">Info</option>
          <option value="warning">Warning</option>
          <option value="success">Success</option>
          <option value="error">Error</option>
          <option value="request">Request</option>
          <option value="donation">Donation</option>
          <option value="event">Event</option>
          <option value="campaign">Campaign</option>
        </select>
      </div>
      <Button type="submit">Send Notification</Button>
    </form>
  );
};

const PushNotificationCenter = () => {
  const [isSending, setIsSending] = useState(false);
  const [notificationResult, setNotificationResult] = useState<string | null>(null);

  const handleSendNotification = async (notification: Partial<Notification>) => {
    setIsSending(true);
    setNotificationResult(null);
    try {
      const success = await sendNotification(notification);
      if (success) {
        setNotificationResult('Notification sent successfully!');
      } else {
        setNotificationResult('Failed to send notification.');
      }
    } catch (error) {
      console.error('Error sending notification:', error);
      setNotificationResult('An error occurred while sending the notification.');
    } finally {
      setIsSending(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Push Notification Center</CardTitle>
        <CardDescription>Send notifications to users</CardDescription>
      </CardHeader>
      <CardContent>
        <NotificationForm onSend={handleSendNotification} />
        {isSending && <p>Sending notification...</p>}
        {notificationResult && <p>{notificationResult}</p>}
      </CardContent>
    </Card>
  );
};

export default PushNotificationCenter;
