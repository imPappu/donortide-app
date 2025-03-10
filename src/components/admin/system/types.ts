
export interface AddonModule {
  id: number;
  name: string;
  version: string;
  status: "Active" | "Inactive" | "Needs Update";
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
  installed: boolean;
  category?: string;
}

export interface ModuleSettings {
  autoUpdates: boolean;
  compatibilityCheck: boolean;
  developmentMode: boolean;
  securityScanning: boolean;
}
