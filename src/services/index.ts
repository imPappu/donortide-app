
// Export all services for easy importing
export * from './apiConfig';
export * from './authService';
export * from './bannerService';
export * from './bloodRequestService';
export * from './blogService';
export * from './dashboardService';
export * from './donorService';
export * from './installService';
export * from './notificationService';
export * from './paymentService';
export * from './settingService';

// Export our refactored services
export * from './consultantService';
export * from './ambulanceService';
export * from './communicationService';
export * from './types/serviceTypes';

// Re-export types (for backward compatibility)
export type { 
  AppSetting,
  Banner,
  BloodRequest,
  BlogPost,
  DatabaseConfig,
  Donor,
  Notification,
  Payment,
  AdminUser
} from '@/types/apiTypes';
