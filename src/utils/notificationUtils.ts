
import { Notification } from '@/types/apiTypes';
import { sendNotification } from '@/services/notificationService';

// Helper function to create and send a notification
export const sendSystemNotification = async (
  userId: string,
  title: string,
  message: string,
  type: Notification['type'] = 'info'
): Promise<boolean> => {
  const notification: Partial<Notification> = {
    userId,
    title,
    message,
    type,
    read: false,
    createdAt: new Date().toISOString()
  };

  return await sendNotification(notification);
};

// Helper function to create a donation request notification
export const sendDonationRequestNotification = async (
  userId: string,
  bloodType: string,
  location: string
): Promise<boolean> => {
  return await sendSystemNotification(
    userId,
    "Urgent Blood Needed",
    `${bloodType} blood is urgently needed in ${location}. Can you help?`,
    "request"
  );
};

// Helper to create a donation completed notification
export const sendDonationCompletedNotification = async (
  userId: string,
  donationDate: string
): Promise<boolean> => {
  return await sendSystemNotification(
    userId,
    "Thank You for Your Donation",
    `Your donation on ${new Date(donationDate).toLocaleDateString()} has been recorded. Thank you for saving lives!`,
    "donation"
  );
};

// Helper to create an event notification
export const sendEventNotification = async (
  userId: string,
  eventTitle: string,
  eventDate: string,
  eventLocation: string
): Promise<boolean> => {
  return await sendSystemNotification(
    userId,
    "Upcoming Blood Donation Event",
    `Join us for "${eventTitle}" on ${new Date(eventDate).toLocaleDateString()} at ${eventLocation}`,
    "event"
  );
};

// Helper to create a campaign notification
export const sendCampaignNotification = async (
  userId: string,
  campaignTitle: string,
  campaignMessage: string
): Promise<boolean> => {
  return await sendSystemNotification(
    userId,
    campaignTitle,
    campaignMessage,
    "campaign"
  );
};
