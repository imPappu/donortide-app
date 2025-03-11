
import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { Mail } from "lucide-react";
import { EmailTemplateType } from '@/types/emailTypes';
import EmailTemplateEditor from './EmailTemplateEditor';
import EmailTestSender from './EmailTestSender';
import EmailTemplateVariables from './EmailTemplateVariables';

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

  const handleSendTestEmail = async (email: string) => {
    setSending(true);
    
    try {
      // Simulated API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      toast({
        title: "Test Email Sent",
        description: `Test email has been sent to ${email}`,
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
              <EmailTemplateEditor
                templateName={template.name}
                content={editorContent[template.id]}
                onChange={handleEditorChange}
                onReset={resetToDefault}
              />
              
              <EmailTestSender
                onSendTest={handleSendTestEmail}
                onSave={handleSaveTemplate}
                isSending={sending}
                isSaving={loading}
              />
              
              <EmailTemplateVariables templateType={template.id} />
            </TabsContent>
          ))}
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default EmailTemplatesManagement;
