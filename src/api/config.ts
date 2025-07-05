/**
 * API Configuration
 * Configure your API endpoints here
 */

// Development/Local API
export const DEV_API_CONFIG = {
  baseUrl: "http://localhost:3000", // Adjust to your local backend port
};

// Production API (adjust when you deploy)
export const PROD_API_CONFIG = {
  baseUrl: "https://your-api-domain.com",
};

// Current environment config
export const API_CONFIG = __DEV__ ? DEV_API_CONFIG : PROD_API_CONFIG;
