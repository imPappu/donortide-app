
import React from 'react';
import { EmailTemplateType } from '@/types/emailTypes';

interface EmailTemplateVariablesProps {
  templateType: EmailTemplateType;
}

export default function EmailTemplateVariables({ templateType }: EmailTemplateVariablesProps) {
  const variables = getTemplateVariables(templateType);
  
  return (
    <div>
      <h4 className="font-medium mb-2">Available Variables:</h4>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
        {variables.map(variable => (
          <div key={variable} className="text-sm bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">
            {variable}
          </div>
        ))}
      </div>
    </div>
  );
}

// Helper function to get template variables based on template type
function getTemplateVariables(templateType: EmailTemplateType): string[] {
  const commonVariables = ['name', 'email'];
  
  switch (templateType) {
    case 'welcome':
      return [...commonVariables, 'loginUrl'];
    case 'verification':
      return [...commonVariables, 'verificationCode', 'verificationLink'];
    case 'password_reset':
      return [...commonVariables, 'resetLink', 'resetCode'];
    case 'donation_request':
      return [...commonVariables, 'bloodType', 'hospital', 'location', 'contactNumber', 'details', 'respondUrl'];
    case 'campaign_announce':
      return [...commonVariables, 'campaignTitle', 'campaignDescription', 'goal', 'startDate', 'endDate', 'campaignUrl'];
    case 'event_invite':
      return [...commonVariables, 'eventTitle', 'date', 'time', 'location', 'eventDescription', 'eventUrl'];
    case 'donation_thank_you':
      return [...commonVariables, 'donationDate', 'donationType', 'location', 'certificateUrl'];
    case 'monthly_newsletter':
      return [...commonVariables, 'month', 'year', 'statisticsUrl', 'upcomingEvents'];
    default:
      return commonVariables;
  }
}
