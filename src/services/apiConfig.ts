
// API configuration and common utilities

const API_BASE_URL = 'https://bloodmate.yghosts.com/api'; // Updated domain

// Database configuration
export const DB_CONFIG = {
  host: 'localhost', // Change to your actual database host
  name: 'yghostsc_bloodmate',
  user: 'yghostsc_user',
  password: 'Bloodmate@2.0##',
  type: 'postgresql'
};

// SMTP configuration
export const SMTP_CONFIG = {
  host: 'smtp.bloodmate.yghosts.com',
  port: 587,
  secure: false,
  auth: {
    user: 'notifications@bloodmate.yghosts.com',
    pass: 'your-smtp-password'  // Replace with actual SMTP password
  }
};

// Map API configuration
export const MAP_CONFIG = {
  apiKey: 'your-map-api-key', // Replace with your map API key
  defaultCenter: { lat: 0, lng: 0 },
  defaultZoom: 13
};

// Social media and ads configuration
export const ADS_CONFIG = {
  facebookAudiencePixel: 'your-facebook-pixel-id', // Replace with your Facebook Pixel ID
  googleAdsId: 'your-google-ads-id' // Replace with your Google Ads ID
};

export { API_BASE_URL };
