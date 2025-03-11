
export type EmailTemplateType = 
  | 'welcome'
  | 'verification'
  | 'password_reset'
  | 'donation_request'
  | 'campaign_announce'
  | 'event_invite'
  | 'donation_thank_you'
  | 'monthly_newsletter';

export interface EmailTemplate {
  type: EmailTemplateType;
  subject: string;
  content: string;
}
