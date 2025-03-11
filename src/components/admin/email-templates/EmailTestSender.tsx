
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Send, Save } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface EmailTestSenderProps {
  onSendTest: (email: string) => Promise<void>;
  onSave: () => Promise<void>;
  isSending: boolean;
  isSaving: boolean;
}

export default function EmailTestSender({ 
  onSendTest, 
  onSave, 
  isSending, 
  isSaving 
}: EmailTestSenderProps) {
  const [testEmailAddress, setTestEmailAddress] = useState('');
  const { toast } = useToast();

  const handleSendTest = async () => {
    if (!testEmailAddress || !testEmailAddress.includes('@')) {
      toast({
        title: "Invalid Email",
        description: "Please enter a valid email address",
        variant: "destructive",
      });
      return;
    }
    
    await onSendTest(testEmailAddress);
  };

  return (
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
          onClick={handleSendTest}
          disabled={isSending}
        >
          <Send className="h-4 w-4 mr-2" />
          {isSending ? "Sending..." : "Send Test"}
        </Button>
      </div>
      
      <Button 
        onClick={onSave}
        disabled={isSaving}
        className="w-full sm:w-auto mt-2 sm:mt-0"
      >
        <Save className="h-4 w-4 mr-2" />
        {isSaving ? "Saving..." : "Save Template"}
      </Button>
    </div>
  );
}
