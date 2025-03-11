
import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Mail, RefreshCw, Save, Send } from "lucide-react";
import { EmailTemplateType } from '@/services/emailService';

const templateTypes: { id: EmailTemplateType; name: string }[] = [
  { id: 'welcome', name: 'Welcome Email' },
  { id: 'verification', name: 'Email Verification' },
  { id: 'password_reset', name: 'Password Reset' },
  { id: 'donation_request', name: 'Donation Request' },
  { id: 'campaign_announce', name: 'Campaign Announcement' },
  { id: 'event_invite', name: 'Event Invitation' },
  { id: 'donation_thank_you', name: 'Donation Thank You' },
  { id: 'monthly_newsletter', name: 'Monthly Newsletter' },
];

const EmailTemplatesManagement = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState<EmailTemplateType>('welcome');
  const [loading, setLoading] = useState(false);
  const [testEmailAddress, setTestEmailAddress] = useState('');
  const [sending, setSending] = useState(false);
  const [editorContent, setEditorContent] = useState<Record<EmailTemplateType, string>>({
    welcome: '<div>Welcome to BloodMate!</div>',
    verification: '<div>Verify your BloodMate email</div>',
    password_reset: '<div>Reset your BloodMate password</div>',
    donation_request: '<div>Urgent Blood Donation Request</div>',
    campaign_announce: '<div>New Campaign Announcement</div>',
    event_invite: '<div>You\'re invited to a blood donation event</div>',
    donation_thank_you: '<div>Thank you for your donation</div>',
    monthly_newsletter: '<div>Monthly Newsletter</div>',
  });

  const handleEditorChange = (content: string) => {
    setEditorContent(prev => ({ ...prev, [activeTab]: content }));
  };

  const handleSaveTemplate = async () => {
    setLoading(true);
    
    try {
      // Simulated API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: "Template Saved",
        description: `"${templateTypes.find(t => t.id === activeTab)?.name}" template has been saved successfully`,
      });
    } catch (error) {
      console.error('Error saving email template:', error);
      toast({
        title: "Error",
        description: "Failed to save email template",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSendTestEmail = async () => {
    if (!testEmailAddress || !testEmailAddress.includes('@')) {
      toast({
        title: "Invalid Email",
        description: "Please enter a valid email address",
        variant: "destructive",
      });
      return;
    }
    
    setSending(true);
    
    try {
      // Simulated API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      toast({
        title: "Test Email Sent",
        description: `Test email has been sent to ${testEmailAddress}`,
      });
    } catch (error) {
      console.error('Error sending test email:', error);
      toast({
        title: "Error",
        description: "Failed to send test email",
        variant: "destructive",
      });
    } finally {
      setSending(false);
    }
  };

  const resetToDefault = () => {
    const confirmReset = window.confirm("Are you sure you want to reset this template to its default? This action cannot be undone.");
    
    if (confirmReset) {
      // In a real app, this would fetch the default template from the server
      toast({
        title: "Template Reset",
        description: "Email template has been reset to default",
      });
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Mail className="mr-2 h-5 w-5" />
          Email Templates
        </CardTitle>
        <CardDescription>
          Customize email templates for various notifications and events
        </CardDescription>
      </CardHeader>
      
      <CardContent>
        <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as EmailTemplateType)} className="w-full">
          <TabsList className="grid grid-cols-4 mb-4">
            {templateTypes.map(template => (
              <TabsTrigger 
                key={template.id} 
                value={template.id}
                className="text-xs sm:text-sm"
              >
                {template.name}
              </TabsTrigger>
            ))}
          </TabsList>
          
          {templateTypes.map(template => (
            <TabsContent key={template.id} value={template.id} className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-medium">{template.name} Template</h3>
                <Button variant="outline" size="sm" onClick={resetToDefault}>
                  <RefreshCw className="h-4 w-4 mr-2" />
                  Reset to Default
                </Button>
              </div>
              
              <div className="border rounded-md p-4 min-h-[400px] bg-white dark:bg-gray-950">
                {/* This would be a WYSIWYG editor in a real implementation */}
                <textarea
                  className="w-full h-[400px] p-2 border rounded"
                  value={editorContent[activeTab]}
                  onChange={(e) => handleEditorChange(e.target.value)}
                />
              </div>
              
              <div className="flex flex-col sm:flex-row gap-2 justify-between items-center mt-4 border-t pt-4">
                <div className="flex flex-1 gap-2 w-full">
                  <input
                    type="email"
                    placeholder="Enter email for test"
                    className="px-3 py-2 border rounded flex-1"
                    value={testEmailAddress}
                    onChange={(e) => setTestEmailAddress(e.target.value)}
                  />
                  <Button 
                    variant="outline" 
                    onClick={handleSendTestEmail}
                    disabled={sending}
                  >
                    <Send className="h-4 w-4 mr-2" />
                    {sending ? "Sending..." : "Send Test"}
                  </Button>
                </div>
                
                <Button 
                  onClick={handleSaveTemplate}
                  disabled={loading}
                  className="w-full sm:w-auto mt-2 sm:mt-0"
                >
                  <Save className="h-4 w-4 mr-2" />
                  {loading ? "Saving..." : "Save Template"}
                </Button>
              </div>
              
              <div>
                <h4 className="font-medium mb-2">Available Variables:</h4>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                  {getTemplateVariables(template.id).map(variable => (
                    <div key={variable} className="text-sm bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">
                      {variable}
                    </div>
                  ))}
                </div>
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </CardContent>
    </Card>
  );
};

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

export default EmailTemplatesManagement;
