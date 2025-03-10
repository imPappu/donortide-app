
import { AddonModule, RepositoryAddon, ModuleSettings, AddonSpecificSettings, AddonPermissionGroups } from "./types";

// Initial list of installed addons
export const initialInstalledAddons: AddonModule[] = [
  {
    id: 1,
    name: "Rewards System",
    version: "1.2.0",
    status: "Active",
    author: "BloodConnect Team",
    description: "Rewards and badges for donors based on donation frequency and achievements.",
    hasSettings: true,
    permissions: ["manage_rewards", "view_rewards", "assign_rewards"],
    isCustom: true,
  },
  {
    id: 2,
    name: "SMS Notifications",
    version: "0.9.5",
    status: "Active",
    author: "Communications Ltd",
    description: "Send SMS alerts to donors for emergency blood needs and appointment reminders.",
    hasSettings: true,
  },
  {
    id: 3,
    name: "Donor Analytics",
    version: "2.1.3",
    status: "Inactive",
    author: "Data Insights Inc",
    description: "Advanced analytics dashboard for donor retention and engagement metrics.",
    hasSettings: true,
    permissions: ["view_analytics", "export_reports"],
  },
  {
    id: 4,
    name: "Events & Campaigns",
    version: "1.0.0",
    status: "Active",
    author: "BloodConnect Team",
    description: "Manage blood donation events and awareness campaigns with full CRUD functionality.",
    hasSettings: true,
    permissions: ["manage_events", "manage_campaigns", "view_events", "view_campaigns"],
    isCustom: true,
  }
];

// Repository addons available for installation
export const initialRepositoryAddons: RepositoryAddon[] = [
  {
    id: 101,
    name: "Appointment Scheduler",
    version: "2.0.1",
    author: "MedTech Solutions",
    description: "Advanced appointment scheduling system with calendar integration and reminders.",
    rating: 4.8,
    downloads: 2500
  },
  {
    id: 102,
    name: "Hospital Integration",
    version: "1.5.0",
    author: "Healthcare Connect",
    description: "Direct integration with hospital systems for real-time blood inventory management.",
    rating: 4.6,
    downloads: 1800
  },
  {
    id: 103,
    name: "Blood Compatibility Checker",
    version: "1.1.2",
    author: "Medical Software Inc",
    description: "Tool for checking blood type compatibility between donors and recipients.",
    rating: 4.2,
    downloads: 950
  },
  {
    id: 104,
    name: "Social Sharing",
    version: "3.2.1",
    author: "Web Solutions",
    description: "Share donation achievements and event invitations on social media platforms.",
    rating: 4.9,
    downloads: 3200
  },
  {
    id: 105,
    name: "Blood Drive Organizer",
    version: "2.3.4",
    author: "Community Tools Ltd",
    description: "Complete toolkit for organizing and managing community blood drives.",
    rating: 4.7,
    downloads: 2100
  },
  {
    id: 106,
    name: "Donor ID Cards",
    version: "1.0.3",
    author: "Identity Systems",
    description: "Generate and manage digital donor ID cards with QR codes for quick check-in.",
    rating: 4.3,
    downloads: 1200
  }
];

// Module global settings
export const initialModuleSettings: ModuleSettings = {
  autoUpdates: true,
  compatibilityCheck: true,
  developmentMode: false,
  securityScanning: true
};

// Addon-specific settings
export const initialAddonSpecificSettings: AddonSpecificSettings = {
  1: { // Rewards System
    pointsPerDonation: 100,
    enableLeaderboard: true,
    milestoneThresholds: [1, 5, 10, 25, 50, 100],
    notifyOnAchievement: true
  },
  2: { // SMS Notifications
    smsProvider: "twilio",
    apiKey: "********",
    sendReminders: true,
    reminderHours: 24,
    emergencyAlertEnabled: true
  },
  3: { // Donor Analytics
    dataRetentionDays: 365,
    anonymizeData: true,
    enablePredictions: false,
    reportEmailFrequency: "monthly"
  },
  4: { // Events & Campaigns
    allowPublicEvents: true,
    requireApproval: false,
    maxEventsPerOrganizer: 10,
    enableRegistration: true,
    showPastCampaigns: true
  }
};

// Addon permissions groups
export const initialAddonPermissionGroups: AddonPermissionGroups = {
  1: [ // Rewards System
    { id: 101, name: "Manage Rewards", key: "manage_rewards", enabled: true },
    { id: 102, name: "View Rewards", key: "view_rewards", enabled: true },
    { id: 103, name: "Assign Rewards", key: "assign_rewards", enabled: true },
    { id: 104, name: "Delete Rewards", key: "delete_rewards", enabled: false }
  ],
  2: [ // SMS Notifications
    { id: 201, name: "Send Notifications", key: "send_notifications", enabled: true },
    { id: 202, name: "Manage Templates", key: "manage_templates", enabled: true },
    { id: 203, name: "View Delivery Reports", key: "view_reports", enabled: true }
  ],
  3: [ // Donor Analytics
    { id: 301, name: "View Analytics", key: "view_analytics", enabled: true },
    { id: 302, name: "Export Reports", key: "export_reports", enabled: true },
    { id: 303, name: "Configure Metrics", key: "configure_metrics", enabled: false },
    { id: 304, name: "Access Raw Data", key: "access_raw_data", enabled: false }
  ],
  4: [ // Events & Campaigns
    { id: 401, name: "Manage Events", key: "manage_events", enabled: true },
    { id: 402, name: "View Events", key: "view_events", enabled: true },
    { id: 403, name: "Manage Campaigns", key: "manage_campaigns", enabled: true },
    { id: 404, name: "View Campaigns", key: "view_campaigns", enabled: true },
    { id: 405, name: "Delete Events/Campaigns", key: "delete_items", enabled: false }
  ]
};
