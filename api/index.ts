/**
 * Main API module exports
 * Import everything you need from here
 */

// Main API client
export { ApiClient, getApiClient, initializeApiClient } from "./client";

// Configuration
export { API_CONFIG, DEV_API_CONFIG, PROD_API_CONFIG } from "./config";

// React hooks
export { useApiClient } from "./hooks";

// Examples (for reference)
export { ExampleApiUsage, directApiUsage } from "./examples";

// Re-export all generated types and APIs
export * from "./generated/src";
