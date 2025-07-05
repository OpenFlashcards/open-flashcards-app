import {
  AppApi,
  AuthenticationApi,
  CardsApi,
  Configuration,
  DecksApi,
  UsersApi,
} from "./generated/src";

/**
 * API Client configuration
 */
export interface ApiClientConfig {
  baseUrl: string;
  accessToken?: string;
}

/**
 * Main API Client class
 * Provides easy access to all API endpoints with automatic authentication
 */
export class ApiClient {
  private config: Configuration;

  // API instances
  public app: AppApi;
  public auth: AuthenticationApi;
  public cards: CardsApi;
  public decks: DecksApi;
  public users: UsersApi;

  constructor(clientConfig: ApiClientConfig) {
    this.config = new Configuration({
      basePath: clientConfig.baseUrl,
      accessToken: clientConfig.accessToken,
    });

    // Initialize API instances
    this.app = new AppApi(this.config);
    this.auth = new AuthenticationApi(this.config);
    this.cards = new CardsApi(this.config);
    this.decks = new DecksApi(this.config);
    this.users = new UsersApi(this.config);
  }

  /**
   * Update the access token for authenticated requests
   */
  setAccessToken(token: string) {
    this.config = new Configuration({
      ...this.config,
      accessToken: token,
    });

    // Reinitialize API instances with new token
    this.app = new AppApi(this.config);
    this.auth = new AuthenticationApi(this.config);
    this.cards = new CardsApi(this.config);
    this.decks = new DecksApi(this.config);
    this.users = new UsersApi(this.config);
  }

  /**
   * Clear the access token
   */
  clearAccessToken() {
    this.config = new Configuration({
      ...this.config,
      accessToken: undefined,
    });

    // Reinitialize API instances without token
    this.app = new AppApi(this.config);
    this.auth = new AuthenticationApi(this.config);
    this.cards = new CardsApi(this.config);
    this.decks = new DecksApi(this.config);
    this.users = new UsersApi(this.config);
  }
}

// Default client instance (can be configured later)
let defaultClient: ApiClient | null = null;

/**
 * Initialize the default API client
 */
export function initializeApiClient(config: ApiClientConfig): ApiClient {
  defaultClient = new ApiClient(config);
  return defaultClient;
}

/**
 * Get the default API client instance
 * Throws error if not initialized
 */
export function getApiClient(): ApiClient {
  if (!defaultClient) {
    throw new Error(
      "API client not initialized. Call initializeApiClient() first."
    );
  }
  return defaultClient;
}

// Re-export types for convenience
export * from "./generated/src/apis";
export * from "./generated/src/models";
