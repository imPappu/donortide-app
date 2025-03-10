
// Type definitions for admin components

export interface AIModelConfig {
  enabled: boolean;
  apiKey: string;
  model: string;
  connectionTested: boolean;
  connectionSuccess?: boolean;
}

export interface AIModelsState {
  chatgpt: AIModelConfig;
  deepseek: AIModelConfig;
  grok: AIModelConfig;
  qwen: AIModelConfig;
}

export interface SocialMediaConfig {
  enabled: boolean;
  autoPost: boolean;
  schedule: string;
}

export interface SocialMediaState {
  twitter: SocialMediaConfig;
  facebook: SocialMediaConfig;
  instagram: SocialMediaConfig;
  youtube: SocialMediaConfig;
}

export interface MonitoringSettings {
  bugDetection: boolean;
  spamDetection: boolean;
  contentModeration: boolean;
  dataAnalysis: boolean;
  scheduledReports: boolean;
}

export interface AppSettingsConfig {
  settingKey: string;
  settingValue: string;
  description?: string;
  category?: string;
  isSecret?: boolean;
}

export interface DatabaseConnection {
  status: 'connected' | 'disconnected' | 'error';
  lastChecked: string;
  error?: string;
}

export interface AdminSection {
  id: string;
  title: string;
  description: string;
  icon: string;
  route: string;
  permissions: string[];
}
