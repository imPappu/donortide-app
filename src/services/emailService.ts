
import { SMTP_CONFIG } from './apiConfig';

// Email template types
export type EmailTemplateType = 
  | 'welcome'
  | 'verification'
  | 'password_reset'
  | 'donation_request'
  | 'campaign_announce'
  | 'event_invite'
  | 'donation_thank_you'
  | 'monthly_newsletter';

// Template data structure
interface TemplateData {
  [key: string]: any;
}

// Get email template based on template type and data
const getEmailTemplate = (type: EmailTemplateType, data: TemplateData): string => {
  switch (type) {
    case 'welcome':
      return `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background-color: #e53e3e; color: white; padding: 20px; text-align: center;">
            <h1>Welcome to BloodMate, ${data.name}!</h1>
          </div>
          <div style="padding: 20px; background-color: #f8f8f8;">
            <p>Thank you for joining our community of blood donors and volunteers.</p>
            <p>Your account has been successfully created. You can now log in using your email and password.</p>
            <div style="text-align: center; margin: 30px 0;">
              <a href="${data.loginUrl}" style="background-color: #e53e3e; color: white; padding: 10px 20px; text-decoration: none; border-radius: 4px;">Login to Your Account</a>
            </div>
            <p>If you have any questions, please don't hesitate to contact our support team.</p>
            <p>Best regards,<br/>The BloodMate Team</p>
          </div>
        </div>
      `;
    
    case 'verification':
      return `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background-color: #e53e3e; color: white; padding: 20px; text-align: center;">
            <h1>Verify Your Email</h1>
          </div>
          <div style="padding: 20px; background-color: #f8f8f8;">
            <p>Hello ${data.name},</p>
            <p>Please verify your email address by entering the following code:</p>
            <div style="text-align: center; margin: 30px 0;">
              <div style="font-size: 24px; font-weight: bold; letter-spacing: 5px; padding: 10px; background-color: #f0f0f0; border-radius: 4px;">${data.verificationCode}</div>
            </div>
            <p>This code will expire in 30 minutes.</p>
            <p>If you didn't request this verification, please ignore this email.</p>
            <p>Best regards,<br/>The BloodMate Team</p>
          </div>
        </div>
      `;
    
    case 'donation_request':
      return `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background-color: #e53e3e; color: white; padding: 20px; text-align: center;">
            <h1>Urgent Blood Donation Request</h1>
          </div>
          <div style="padding: 20px; background-color: #f8f8f8;">
            <p>Hello ${data.name},</p>
            <p>There is an urgent need for <strong>${data.bloodType}</strong> blood type at <strong>${data.hospital}</strong>.</p>
            <p><strong>Location:</strong> ${data.location}</p>
            <p><strong>Contact:</strong> ${data.contactNumber}</p>
            <p><strong>Details:</strong> ${data.details}</p>
            <div style="text-align: center; margin: 30px 0;">
              <a href="${data.respondUrl}" style="background-color: #e53e3e; color: white; padding: 10px 20px; text-decoration: none; border-radius: 4px;">Respond to Request</a>
            </div>
            <p>Your donation can save lives. Please consider helping if you are able.</p>
            <p>Thank you for your support,<br/>The BloodMate Team</p>
          </div>
        </div>
      `;
    
    case 'campaign_announce':
      return `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background-color: #e53e3e; color: white; padding: 20px; text-align: center;">
            <h1>${data.campaignTitle}</h1>
          </div>
          <div style="padding: 20px; background-color: #f8f8f8;">
            <p>Hello ${data.name},</p>
            <p>We're excited to announce our new blood donation campaign:</p>
            <h2 style="color: #e53e3e;">${data.campaignTitle}</h2>
            <p>${data.campaignDescription}</p>
            <p><strong>Goal:</strong> ${data.goal}</p>
            <p><strong>Start Date:</strong> ${data.startDate}</p>
            <p><strong>End Date:</strong> ${data.endDate}</p>
            <div style="text-align: center; margin: 30px 0;">
              <a href="${data.campaignUrl}" style="background-color: #e53e3e; color: white; padding: 10px 20px; text-decoration: none; border-radius: 4px;">Learn More</a>
            </div>
            <p>Together, we can make a difference!</p>
            <p>Thank you for your support,<br/>The BloodMate Team</p>
          </div>
        </div>
      `;
    
    case 'event_invite':
      return `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background-color: #e53e3e; color: white; padding: 20px; text-align: center;">
            <h1>You're Invited: ${data.eventTitle}</h1>
          </div>
          <div style="padding: 20px; background-color: #f8f8f8;">
            <p>Hello ${data.name},</p>
            <p>You're invited to our upcoming blood donation event:</p>
            <h2 style="color: #e53e3e;">${data.eventTitle}</h2>
            <p><strong>Date:</strong> ${data.date}</p>
            <p><strong>Time:</strong> ${data.time}</p>
            <p><strong>Location:</strong> ${data.location}</p>
            <p>${data.eventDescription}</p>
            <div style="text-align: center; margin: 30px 0;">
              <a href="${data.eventUrl}" style="background-color: #e53e3e; color: white; padding: 10px 20px; text-decoration: none; border-radius: 4px;">RSVP Now</a>
            </div>
            <p>We hope to see you there!</p>
            <p>Best regards,<br/>The BloodMate Team</p>
          </div>
        </div>
      `;
    
    default:
      return `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background-color: #e53e3e; color: white; padding: 20px; text-align: center;">
            <h1>BloodMate Notification</h1>
          </div>
          <div style="padding: 20px; background-color: #f8f8f8;">
            <p>Hello ${data.name},</p>
            <p>${data.message}</p>
            <p>Best regards,<br/>The BloodMate Team</p>
          </div>
        </div>
      `;
  }
};

// Send email function
export const sendEmail = async (
  to: string,
  subject: string,
  templateType: EmailTemplateType,
  data: TemplateData
): Promise<boolean> => {
  try {
    const htmlContent = getEmailTemplate(templateType, data);
    
    // In a real implementation, this would use a library like nodemailer
    // Here we're simulating the API call
    const response = await fetch(`${API_BASE_URL}/email/send`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        to,
        subject,
        html: htmlContent,
        from: SMTP_CONFIG.auth.user,
      }),
    });
    
    if (!response.ok) throw new Error('Failed to send email');
    
    return true;
  } catch (error) {
    console.error('Error sending email:', error);
    return false;
  }
};

// Email notification functions for specific scenarios
export const sendWelcomeEmail = async (to: string, name: string, loginUrl: string): Promise<boolean> => {
  return sendEmail(to, 'Welcome to BloodMate!', 'welcome', { name, loginUrl });
};

export const sendVerificationEmail = async (to: string, name: string, verificationCode: string): Promise<boolean> => {
  return sendEmail(to, 'Verify Your BloodMate Account', 'verification', { name, verificationCode });
};

export const sendDonationRequestEmail = async (
  to: string, 
  name: string,
  bloodType: string,
  hospital: string,
  location: string,
  contactNumber: string,
  details: string,
  respondUrl: string
): Promise<boolean> => {
  return sendEmail(
    to, 
    `Urgent: ${bloodType} Blood Donation Request`, 
    'donation_request', 
    { name, bloodType, hospital, location, contactNumber, details, respondUrl }
  );
};

export const sendCampaignAnnouncement = async (
  to: string,
  name: string,
  campaignTitle: string,
  campaignDescription: string,
  goal: string,
  startDate: string,
  endDate: string,
  campaignUrl: string
): Promise<boolean> => {
  return sendEmail(
    to,
    `New Campaign: ${campaignTitle}`,
    'campaign_announce',
    { name, campaignTitle, campaignDescription, goal, startDate, endDate, campaignUrl }
  );
};

export const sendEventInvitation = async (
  to: string,
  name: string,
  eventTitle: string,
  date: string,
  time: string,
  location: string,
  eventDescription: string,
  eventUrl: string
): Promise<boolean> => {
  return sendEmail(
    to,
    `Invitation: ${eventTitle}`,
    'event_invite',
    { name, eventTitle, date, time, location, eventDescription, eventUrl }
  );
};
