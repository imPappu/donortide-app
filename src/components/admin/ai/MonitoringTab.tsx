
import React, { useState } from "react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Database, BugPlay, Shield, MessageSquare, AlertCircle, Save } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import MonitoringItem from "./MonitoringItem";
import { MonitoringSettings } from "../types";
import DBErrorAlert from "../DBErrorAlert";

interface MonitoringTabProps {
  monitoringSettings: MonitoringSettings;
  handleMonitoringChange: (setting: string, value: boolean) => void;
}

const MonitoringTab: React.FC<MonitoringTabProps> = ({
  monitoringSettings,
  handleMonitoringChange
}) => {
  const { toast } = useToast();
  const [spamThreshold, setSpamThreshold] = useState("medium");
  const [contentRules, setContentRules] = useState(
    "No profanity, hate speech, or personal attacks.\nNo solicitation or spam.\nNo sharing of personal contact information."
  );
  const [saveLoading, setSaveLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const monitoringItems = [
    {
      key: 'bugDetection',
      icon: BugPlay,
      color: 'text-red-500',
      title: 'Bug Detection',
      description: 'AI will monitor application logs for errors and anomalies'
    },
    {
      key: 'spamDetection',
      icon: Shield,
      color: 'text-amber-500',
      title: 'Spam Detection',
      description: 'AI will flag suspicious activity and potential spam'
    },
    {
      key: 'contentModeration',
      icon: MessageSquare,
      color: 'text-blue-500',
      title: 'Content Moderation',
      description: 'AI will monitor community posts for inappropriate content'
    },
    {
      key: 'dataAnalysis',
      icon: Database,
      color: 'text-green-500',
      title: 'Data Analysis',
      description: 'AI will analyze database and provide insights'
    },
    {
      key: 'scheduledReports',
      icon: AlertCircle,
      color: 'text-purple-500',
      title: 'Scheduled Reports',
      description: 'AI will generate periodic reports on platform health'
    }
  ];

  const handleSaveSettings = async () => {
    setSaveLoading(true);
    setError(null);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: "Monitoring Settings Saved",
        description: "Your AI monitoring settings have been updated successfully."
      });
    } catch (err) {
      setError("Failed to save monitoring settings. Please try again.");
    } finally {
      setSaveLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <Alert className="bg-blue-50 dark:bg-blue-950 border-blue-200 dark:border-blue-800">
        <Database className="h-4 w-4 text-blue-600 dark:text-blue-400" />
        <AlertDescription className="text-blue-700 dark:text-blue-300">
          Configure how AI monitors your platform for issues, content violations, and performance problems.
        </AlertDescription>
      </Alert>
      
      {error && (
        <DBErrorAlert 
          error={error} 
          onDismiss={() => setError(null)} 
        />
      )}
      
      <div className="space-y-4 bg-white dark:bg-gray-800 p-4 rounded-lg border shadow-sm">
        <h3 className="text-lg font-medium border-b pb-2">Monitoring Modules</h3>
        <div className="space-y-4">
          {monitoringItems.map(item => (
            <MonitoringItem
              key={item.key}
              icon={item.icon}
              iconColor={item.color}
              title={item.title}
              description={item.description}
              enabled={monitoringSettings[item.key as keyof MonitoringSettings]}
              onToggle={(value) => handleMonitoringChange(item.key, value)}
            />
          ))}
        </div>
      </div>
      
      <div className="mt-8 space-y-6 bg-white dark:bg-gray-800 p-4 rounded-lg border shadow-sm">
        <h3 className="text-lg font-medium border-b pb-2">Monitoring Rules & Thresholds</h3>
        <div className="space-y-5">
          <div className="space-y-2">
            <Label htmlFor="spam-threshold">Spam Detection Threshold</Label>
            <Select 
              value={spamThreshold} 
              onValueChange={setSpamThreshold}
            >
              <SelectTrigger id="spam-threshold" className="w-full">
                <SelectValue placeholder="Select threshold" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="low">Low (catch more, higher false positives)</SelectItem>
                <SelectItem value="medium">Medium (balanced)</SelectItem>
                <SelectItem value="high">High (less false positives)</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="content-rules">Content Moderation Rules</Label>
            <Textarea 
              id="content-rules" 
              placeholder="Enter custom rules for content moderation..." 
              className="min-h-[100px] resize-y"
              value={contentRules}
              onChange={(e) => setContentRules(e.target.value)}
            />
          </div>
        </div>
        
        <div className="flex justify-end pt-4 border-t mt-6">
          <Button 
            onClick={handleSaveSettings}
            disabled={saveLoading}
            className="flex items-center gap-2"
          >
            {saveLoading ? (
              <>
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Saving...
              </>
            ) : (
              <>
                <Save className="h-4 w-4" />
                Save Monitoring Settings
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default MonitoringTab;
