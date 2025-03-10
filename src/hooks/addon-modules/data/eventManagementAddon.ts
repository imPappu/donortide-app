
import { AddonModule } from "../types";

export const eventManagementAddon: AddonModule = {
  id: 101, // Custom ID for our addon
  name: "Event Management",
  version: "1.0.0",
  status: "Active",
  author: "DonorTide Team",
  description: "Manage events with registration for both free and paid events.",
  hasSettings: true,
  permissions: [
    "admin.events.view",
    "admin.events.manage",
    "admin.events.registrations"
  ],
  isCustom: true
};

export const eventManagementSettings = {
  allowPaidEvents: true,
  paymentIntegration: "default",
  reminderEmails: true,
  registrationApproval: false,
  maxEventsPerMonth: 50
};

export const eventManagementPermissions = [
  { id: 1, name: "View Events", key: "admin.events.view", enabled: true },
  { id: 2, name: "Manage Events", key: "admin.events.manage", enabled: true },
  { id: 3, name: "View Registrations", key: "admin.events.registrations", enabled: true },
  { id: 4, name: "Send Notifications", key: "admin.events.notifications", enabled: false }
];
