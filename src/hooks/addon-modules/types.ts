
import { Dispatch, SetStateAction } from "react";

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
  description: string;
  author: string;
  rating: number;
  downloads: number;
}

export interface ModuleSettings {
  autoUpdates: boolean;
  compatibilityCheck: boolean;
  developmentMode: boolean;
  securityScanning: boolean;
}

export interface AddonPermission {
  id: number;
  name: string;
  key: string;
  enabled: boolean;
}

export interface AddonSpecificSettings {
  [key: number]: {
    [key: string]: any;
  };
}

export interface AddonPermissionGroups {
  [key: number]: AddonPermission[];
}
