
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
export * from './communityService';  // Add the export for communityService
export * from './types/serviceTypes';

// Re-export types from apiTypes
export * from '@/types/apiTypes';
