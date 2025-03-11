
import { Notification } from '@/types/apiTypes';
import { sendNotification } from '@/services/notificationService';

// Send a new notification
export const createAndSendNotification = async (
  userId: string,
  title: string,
  message: string,
  type: Notification['type'] = 'info',
  targetType?: string
): Promise<boolean> => {
  try {
    const notification: Notification = {
      id: '', // ID will be assigned by the server
      userId,
      title,
      message,
      type,
      read: false,
      createdAt: new Date().toISOString(),
      targetType
    };
    
    const result = await sendNotification(notification);
    return !!result;
  } catch (error) {
    console.error('Error sending notification:', error);
    return false;
  }
};

// Format notification time
export const formatNotificationTime = (timestamp: string): string => {
  const date = new Date(timestamp);
  const now = new Date();
  const diff = now.getTime() - date.getTime();
  
  // Less than a minute
  if (diff < 60000) {
    return 'Just now';
  }
  
  // Less than an hour
  if (diff < 3600000) {
    const minutes = Math.floor(diff / 60000);
    return `${minutes} ${minutes === 1 ? 'minute' : 'minutes'} ago`;
  }
  
  // Less than a day
  if (diff < 86400000) {
    const hours = Math.floor(diff / 3600000);
    return `${hours} ${hours === 1 ? 'hour' : 'hours'} ago`;
  }
  
  // Less than a week
  if (diff < 604800000) {
    const days = Math.floor(diff / 86400000);
    return `${days} ${days === 1 ? 'day' : 'days'} ago`;
  }
  
  // Format as a date
  return date.toLocaleDateString();
};

// Get notification icon based on type
export const getNotificationIcon = (type: Notification['type']): string => {
  switch (type) {
    case 'info':
      return 'info-circle';
    case 'warning':
      return 'exclamation-triangle';
    case 'success':
      return 'check-circle';
    case 'error':
      return 'times-circle';
    case 'request':
      return 'hand-holding-medical';
    case 'donation':
      return 'donate';
    case 'event':
      return 'calendar-alt';
    case 'campaign':
      return 'bullhorn';
    default:
      return 'bell';
  }
};
