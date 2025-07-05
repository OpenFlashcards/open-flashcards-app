/**
 * Examples of how to use the generated API client
 */

import { CreateCardDto, CreateDeckDto } from "./client";
import { useApiClient } from "./hooks";

// Example React Native component using the API
export function ExampleApiUsage() {
  const { client, login, logout, isAuthenticated } = useApiClient();

  // Example: Login
  const handleLogin = async () => {
    try {
      await login("user@example.com", "password123");
      console.log("Login successful!");
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  // Example: Get user decks
  const getUserDecks = async () => {
    if (!client) return;

    try {
      const decks = await client.decks.deckControllerGetUserDecks();
      console.log("User decks:", decks);
      return decks;
    } catch (error) {
      console.error("Failed to get decks:", error);
    }
  };

  // Example: Create a new deck
  const createDeck = async () => {
    if (!client) return;

    const deckData: CreateDeckDto = {
      name: "My New Deck",
      description: "A deck for learning new vocabulary",
      isPublic: false,
    };

    try {
      const newDeck = await client.decks.deckControllerCreateDeck({
        createDeckDto: deckData,
      });
      console.log("Deck created:", newDeck);
      return newDeck;
    } catch (error) {
      console.error("Failed to create deck:", error);
    }
  };

  // Example: Create a card in a deck
  const createCard = async (deckId: number) => {
    if (!client) return;

    const cardData: CreateCardDto = {
      question: 'What is "Hello" in German?',
      answer: "Hallo",
      notes: "Common greeting phrase",
    };

    try {
      const newCard = await client.cards.cardControllerCreateCard({
        deckId,
        createCardDto: cardData,
      });
      console.log("Card created:", newCard);
      return newCard;
    } catch (error) {
      console.error("Failed to create card:", error);
    }
  };

  // Example: Get cards from a deck
  const getCardsFromDeck = async (deckId: number) => {
    if (!client) return;

    try {
      const cards = await client.cards.cardControllerGetCardsByDeck({ deckId });
      console.log("Cards from deck:", cards);
      return cards;
    } catch (error) {
      console.error("Failed to get cards:", error);
    }
  };

  return {
    handleLogin,
    getUserDecks,
    createDeck,
    createCard,
    getCardsFromDeck,
    logout,
    isAuthenticated,
  };
}

// Direct usage without React hooks
export async function directApiUsage() {
  // You can also use the API client directly
  const { initializeApiClient } = await import("./client");

  const client = initializeApiClient({
    baseUrl: "http://localhost:3000",
  });

  try {
    // Login
    const authResponse = await client.auth.authControllerLogin({
      loginDto: {
        email: "user@example.com",
        password: "password123",
      },
    });

    // Set the token for subsequent requests
    if (authResponse.accessToken) {
      client.setAccessToken(authResponse.accessToken);
    }

    // Now you can make authenticated requests
    const decks = await client.decks.deckControllerGetUserDecks();
    console.log("Decks:", decks);
  } catch (error) {
    console.error("API call failed:", error);
  }
}
