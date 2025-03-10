
import React from "react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Database, BugPlay, Shield, MessageSquare, AlertCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import MonitoringItem from "./MonitoringItem";

interface MonitoringSettings {
  bugDetection: boolean;
  spamDetection: boolean;
  contentModeration: boolean;
  dataAnalysis: boolean;
  scheduledReports: boolean;
}

interface MonitoringTabProps {
  monitoringSettings: MonitoringSettings;
  handleMonitoringChange: (setting: string, value: boolean) => void;
}

const MonitoringTab: React.FC<MonitoringTabProps> = ({
  monitoringSettings,
  handleMonitoringChange
}) => {
  const { toast } = useToast();

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

  return (
    <div className="space-y-4">
      <Alert className="bg-blue-50 dark:bg-blue-950 border-blue-200 dark:border-blue-800">
        <Database className="h-4 w-4 text-blue-600 dark:text-blue-400" />
        <AlertDescription className="text-blue-700 dark:text-blue-300">
          Configure how AI monitors your platform for issues, content violations, and performance problems.
        </AlertDescription>
      </Alert>
      
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
      
      <div className="mt-6 space-y-4">
        <h3 className="text-lg font-medium">Monitoring Rules & Thresholds</h3>
        <div className="space-y-3">
          <div className="space-y-2">
            <Label htmlFor="spam-threshold">Spam Detection Threshold</Label>
            <Select defaultValue="medium">
              <SelectTrigger id="spam-threshold">
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
              className="min-h-[100px]"
              defaultValue="No profanity, hate speech, or personal attacks.\nNo solicitation or spam.\nNo sharing of personal contact information."
            />
          </div>
        </div>
        
        <div className="flex justify-end mt-6">
          <Button 
            onClick={() => {
              toast({
                title: "Monitoring Settings Saved",
                description: "Your AI monitoring settings have been updated successfully."
              });
            }}
          >
            Save Monitoring Settings
          </Button>
        </div>
      </div>
    </div>
  );
};

export default MonitoringTab;
