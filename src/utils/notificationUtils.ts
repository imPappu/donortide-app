
import { sendNotification } from "@/services/dbService";
import { toast } from "@/hooks/use-toast";

export interface PushNotificationData {
  title: string;
  message: string;
  targetType: 'all' | 'donors' | 'specific_users';
  targetData?: object;
}

/**
 * Send a push notification to users
 */
export const sendPushNotification = async (data: PushNotificationData): Promise<boolean> => {
  try {
    await sendNotification({
      title: data.title,
      message: data.message,
      targetType: data.targetType,
      targetData: data.targetData
    });
    
    toast({
      title: "Notification sent",
      description: "Push notification has been sent successfully",
    });
    
    return true;
  } catch (error) {
    console.error("Failed to send push notification:", error);
    
    toast({
      title: "Notification failed",
      description: "Unable to send push notification",
      variant: "destructive",
    });
    
    return false;
  }
};

/**
 * Send a push notification for a blood donation response
 */
export const sendDonationResponseNotification = async (
  bloodType: string, 
  requesterName: string,
  hospital: string
): Promise<boolean> => {
  return sendPushNotification({
    title: `Response to your ${bloodType} blood request`,
    message: `A donor has responded to your blood request at ${hospital}. They will contact you soon.`,
    targetType: 'specific_users',
    targetData: { requesterId: requesterName.replace(/\s+/g, '-').toLowerCase() }
  });
};

/**
 * Send a push notification for a new blood request
 */
export const sendNewBloodRequestNotification = async (
  bloodType: string,
  hospital: string
): Promise<boolean> => {
  return sendPushNotification({
    title: `New ${bloodType} Blood Request`,
    message: `There's an urgent need for ${bloodType} blood at ${hospital}. Can you help?`,
    targetType: 'donors',
    targetData: { bloodTypes: [bloodType] }
  });
};

/**
 * Send a push notification for a donation event
 */
export const sendDonationEventNotification = async (
  eventName: string,
  eventDate: string,
  eventLocation: string
): Promise<boolean> => {
  return sendPushNotification({
    title: `New Donation Event: ${eventName}`,
    message: `Join us on ${eventDate} at ${eventLocation} for a blood donation drive.`,
    targetType: 'all'
  });
};

/**
 * Send a push notification for new achievements
 */
export const sendAchievementNotification = async (
  userName: string,
  badgeName: string
): Promise<boolean> => {
  return sendPushNotification({
    title: "New Achievement Unlocked!",
    message: `Congratulations, ${userName}! You've earned the "${badgeName}" badge.`,
    targetType: 'specific_users',
    targetData: { userId: userName.replace(/\s+/g, '-').toLowerCase() }
  });
};
