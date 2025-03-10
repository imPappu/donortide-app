
export interface AddonModule {
  id: number;
  name: string;
  version: string;
  status: "Active" | "Inactive";
  author: string;
  description: string;
  hasSettings: boolean;
  permissions?: string[];
  isCustom?: boolean;
}

export interface RepositoryAddon {
  id: number;
  name: string;
  version: string;
  author: string;
  description: string;
  rating: number;
  downloads: number;
  installed?: boolean;
  category?: string;
}

export interface ModuleSettings {
  autoUpdates: boolean;
  compatibilityCheck: boolean;
  developmentMode: boolean;
  securityScanning: boolean;
}

// Types for TabProps
export interface CoreSystemTabProps {
  updating: boolean;
  progress: number;
  handleSystemUpdate: () => Promise<void>;
}

export interface MobileTabProps {
  mobileUpdating: boolean;
  handleMobileUpdate: () => Promise<void>;
}

export interface WebsiteTabProps {
  websiteVersion: string;
  handleWebsiteSettingsSave: (settings: any) => Promise<void>;
}
