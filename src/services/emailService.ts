
import { API_BASE_URL } from './apiConfig';

// Define EmailTemplateType to support EmailTemplatesManagement component
export type EmailTemplateType = 'welcome' | 'verification' | 'password_reset' | 'donation_request' | 
  'campaign_announce' | 'event_invite' | 'donation_thank_you' | 'monthly_newsletter';

// Email service for handling email operations
export const sendEmail = async (to: string, subject: string, body: string, template?: string): Promise<boolean> => {
  try {
    const response = await fetch(`${API_BASE_URL}/email/send`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        to,
        subject,
        body,
        template
      }),
    });
    
    if (!response.ok) throw new Error('Failed to send email');
    return true;
  } catch (error) {
    console.error('Error sending email:', error);
    return false;
  }
};

// Send password reset email
export const sendPasswordResetEmail = async (email: string): Promise<boolean> => {
  try {
    const response = await fetch(`${API_BASE_URL}/email/password-reset`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email }),
    });
    
    if (!response.ok) throw new Error('Failed to send password reset email');
    return true;
  } catch (error) {
    console.error('Error sending password reset email:', error);
    return false;
  }
};

// Send welcome email
export const sendWelcomeEmail = async (email: string, name: string): Promise<boolean> => {
  try {
    const response = await fetch(`${API_BASE_URL}/email/welcome`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, name }),
    });
    
    if (!response.ok) throw new Error('Failed to send welcome email');
    return true;
  } catch (error) {
    console.error('Error sending welcome email:', error);
    return false;
  }
};

// Send verification email
export const sendVerificationEmail = async (email: string, code: string): Promise<boolean> => {
  try {
    const response = await fetch(`${API_BASE_URL}/email/verify`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, code }),
    });
    
    if (!response.ok) throw new Error('Failed to send verification email');
    return true;
  } catch (error) {
    console.error('Error sending verification email:', error);
    return false;
  }
};

// Create/update email template
export const saveEmailTemplate = async (templateId: string, subject: string, body: string, description?: string): Promise<boolean> => {
  try {
    const response = await fetch(`${API_BASE_URL}/email/templates/${templateId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        subject,
        body,
        description
      }),
    });
    
    if (!response.ok) throw new Error('Failed to save email template');
    return true;
  } catch (error) {
    console.error('Error saving email template:', error);
    return false;
  }
};

// Get all email templates
export const getEmailTemplates = async (): Promise<any[]> => {
  try {
    const response = await fetch(`${API_BASE_URL}/email/templates`);
    if (!response.ok) throw new Error('Failed to fetch email templates');
    return await response.json();
  } catch (error) {
    console.error('Error fetching email templates:', error);
    return [];
  }
};

// Get specific email template
export const getEmailTemplate = async (templateId: string): Promise<any | null> => {
  try {
    const response = await fetch(`${API_BASE_URL}/email/templates/${templateId}`);
    if (!response.ok) throw new Error('Failed to fetch email template');
    return await response.json();
  } catch (error) {
    console.error('Error fetching email template:', error);
    return null;
  }
};

// Delete email template
export const deleteEmailTemplate = async (templateId: string): Promise<boolean> => {
  try {
    const response = await fetch(`${API_BASE_URL}/email/templates/${templateId}`, {
      method: 'DELETE',
    });
    
    if (!response.ok) throw new Error('Failed to delete email template');
    return true;
  } catch (error) {
    console.error('Error deleting email template:', error);
    return false;
  }
};
