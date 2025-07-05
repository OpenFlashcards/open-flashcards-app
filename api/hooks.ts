import { useEffect, useState } from "react";
import { ApiClient, initializeApiClient } from "./client";
import { API_CONFIG } from "./config";

/**
 * Custom hook for managing API client state
 */
export function useApiClient() {
  const [client, setClient] = useState<ApiClient | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Initialize the API client
    const apiClient = initializeApiClient(API_CONFIG);
    setClient(apiClient);
  }, []);

  const login = async (email: string, password: string) => {
    if (!client) throw new Error("API client not initialized");

    try {
      const response = await client.auth.authControllerLogin({
        loginDto: { email, password },
      });

      if (response.accessToken) {
        client.setAccessToken(response.accessToken);
        setIsAuthenticated(true);
        return response;
      }
      throw new Error("No access token received");
    } catch (error) {
      setIsAuthenticated(false);
      throw error;
    }
  };

  const logout = () => {
    if (client) {
      client.clearAccessToken();
      setIsAuthenticated(false);
    }
  };

  const setToken = (token: string) => {
    if (client) {
      client.setAccessToken(token);
      setIsAuthenticated(true);
    }
  };

  return {
    client,
    isAuthenticated,
    login,
    logout,
    setToken,
  };
}
