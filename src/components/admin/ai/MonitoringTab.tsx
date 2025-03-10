
import React from "react";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { MonitoringSettings } from "../types";
import MonitoringItem from "./MonitoringItem";

interface MonitoringTabProps {
  monitoringSettings: MonitoringSettings;
  handleChange: (setting: keyof MonitoringSettings, value: boolean) => void;
  saving: boolean;
  saveSettings: () => Promise<void>;
}

const MonitoringTab: React.FC<MonitoringTabProps> = ({
  monitoringSettings,
  handleChange,
  saving
}) => {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-md font-medium mb-3">Monitoring Features</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <MonitoringItem
            id="bug-detection"
            title="Bug Detection"
            description="Automatically detect and report bugs in your application"
            isEnabled={monitoringSettings.bugDetection}
            onChange={(value) => handleChange('bugDetection', value)}
            disabled={saving}
          />
          <MonitoringItem
            id="spam-detection"
            title="Spam Detection"
            description="Identify and filter spam content from your platform"
            isEnabled={monitoringSettings.spamDetection}
            onChange={(value) => handleChange('spamDetection', value)}
            disabled={saving}
          />
          <MonitoringItem
            id="content-moderation"
            title="Content Moderation"
            description="Automatically moderate user-generated content"
            isEnabled={monitoringSettings.contentModeration}
            onChange={(value) => handleChange('contentModeration', value)}
            disabled={saving}
          />
          <MonitoringItem
            id="data-analysis"
            title="Data Analysis"
            description="Analyze user data to generate insights and reports"
            isEnabled={monitoringSettings.dataAnalysis}
            onChange={(value) => handleChange('dataAnalysis', value)}
            disabled={saving}
          />
          <MonitoringItem
            id="scheduled-reports"
            title="Scheduled Reports"
            description="Automatically generate and send periodic reports"
            isEnabled={monitoringSettings.scheduledReports}
            onChange={(value) => handleChange('scheduledReports', value)}
            disabled={saving}
          />
        </div>
      </div>
      
      <div className="bg-muted p-4 rounded-md">
        <h4 className="text-sm font-medium mb-2">About AI Monitoring</h4>
        <p className="text-sm text-muted-foreground">
          AI monitoring features help you automatically identify issues, moderate content, and analyze data.
          These features require an active connection to at least one AI model to function properly.
        </p>
      </div>
    </div>
  );
};

export default MonitoringTab;
