
import { AddonModule, RepositoryAddon, ModuleSettings, AddonSpecificSettings, AddonPermissionGroups } from "./types";

// Initial state for installed addons
export const initialInstalledAddons: AddonModule[] = [
  { 
    id: 1, 
    name: "Blood Matching Algorithm", 
    version: "1.0.0", 
    status: "Active",
    author: "Internal Team",
    description: "Advanced blood type matching and compatibility engine for donor-recipient pairing.",
    hasSettings: true,
    permissions: ["admin.blood.match", "admin.blood.view"],
    isCustom: true
  },
  { 
    id: 2, 
    name: "Donor Eligibility Check", 
    version: "1.1.0", 
    status: "Active",
    author: "Internal Team",
    description: "Automated donor eligibility verification based on health criteria and donation history.",
    hasSettings: true,
    permissions: ["admin.eligibility.manage", "admin.eligibility.view"],
    isCustom: true
  },
  { 
    id: 3, 
    name: "Donation Inventory", 
    version: "1.0.2", 
    status: "Active",
    author: "Internal Team",
    description: "Blood inventory tracking with expiration monitoring and shortage alerts.",
    hasSettings: true,
    permissions: ["admin.inventory.manage", "admin.inventory.view"],
    isCustom: true
  },
];

// Repository addons (empty initially)
export const initialRepositoryAddons: RepositoryAddon[] = [];

// Initial module settings
export const initialModuleSettings: ModuleSettings = {
  autoUpdates: true,
  compatibilityCheck: true,
  developmentMode: false,
  securityScanning: true
};

// Initial addon-specific settings
export const initialAddonSpecificSettings: AddonSpecificSettings = {
  1: { // Blood Matching Algorithm
    enableAdvancedMatching: true,
    matchThreshold: 85,
    useHistoricData: true,
    notifyOnMatch: true
  },
  2: { // Donor Eligibility Check
    strictMode: true,
    waitPeriodDays: 56,
    healthChecksEnabled: true,
    autoDecline: false
  },
  3: { // Donation Inventory
    lowStockThreshold: 10,
    expiryNotificationDays: 7,
    trackByBloodType: true,
    trackByLocation: true
  }
};

// Initial permission groups
export const initialAddonPermissionGroups: AddonPermissionGroups = {
  1: [ // Blood Matching Algorithm
    { id: 1, name: "View Matches", key: "admin.blood.view", enabled: true },
    { id: 2, name: "Create Matches", key: "admin.blood.match", enabled: true },
    { id: 3, name: "Override Matches", key: "admin.blood.override", enabled: false }
  ],
  2: [ // Donor Eligibility Check
    { id: 1, name: "View Eligibility", key: "admin.eligibility.view", enabled: true },
    { id: 2, name: "Manage Eligibility", key: "admin.eligibility.manage", enabled: true },
    { id: 3, name: "Override Eligibility", key: "admin.eligibility.override", enabled: false }
  ],
  3: [ // Donation Inventory
    { id: 1, name: "View Inventory", key: "admin.inventory.view", enabled: true },
    { id: 2, name: "Manage Inventory", key: "admin.inventory.manage", enabled: true },
    { id: 3, name: "Transfer Inventory", key: "admin.inventory.transfer", enabled: false }
  }
};
