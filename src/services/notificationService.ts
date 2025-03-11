
import { API_BASE_URL } from './apiConfig';
import { Notification } from '@/types/apiTypes';

// Send a notification
export const sendNotification = async (notification: Partial<Notification>): Promise<boolean> => {
  try {
    const response = await fetch(`${API_BASE_URL}/notifications`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(notification),
    });
    
    if (!response.ok) throw new Error('Failed to send notification');
    return true;
  } catch (error) {
    console.error('Error sending notification:', error);
    return false;
  }
};

// Get notifications for a user
export const getUserNotifications = async (userId: string): Promise<Notification[]> => {
  try {
    const response = await fetch(`${API_BASE_URL}/notifications/user/${userId}`);
    if (!response.ok) throw new Error('Failed to fetch user notifications');
    return await response.json();
  } catch (error) {
    console.error('Error fetching user notifications:', error);
    return [];
  }
};

// Mark notification as read
export const markNotificationAsRead = async (notificationId: string): Promise<boolean> => {
  try {
    const response = await fetch(`${API_BASE_URL}/notifications/${notificationId}/read`, {
      method: 'PUT',
    });
    
    if (!response.ok) throw new Error('Failed to mark notification as read');
    return true;
  } catch (error) {
    console.error('Error marking notification as read:', error);
    return false;
  }
};

// Mark all notifications as read for a user
export const markAllNotificationsAsRead = async (userId: string): Promise<boolean> => {
  try {
    const response = await fetch(`${API_BASE_URL}/notifications/user/${userId}/read-all`, {
      method: 'PUT',
    });
    
    if (!response.ok) throw new Error('Failed to mark all notifications as read');
    return true;
  } catch (error) {
    console.error('Error marking all notifications as read:', error);
    return false;
  }
};

// Delete a notification
export const deleteNotification = async (notificationId: string): Promise<boolean> => {
  try {
    const response = await fetch(`${API_BASE_URL}/notifications/${notificationId}`, {
      method: 'DELETE',
    });
    
    if (!response.ok) throw new Error('Failed to delete notification');
    return true;
  } catch (error) {
    console.error('Error deleting notification:', error);
    return false;
  }
};
