# Open Flashcards API Client

Dieser API Client wurde automatisch aus der `swagger.json` generiert und bietet typisierte Zugriffe auf alle API-Endpoints.

## 🚀 Quick Start

### 1. Client initialisieren

```typescript
import { initializeApiClient, API_CONFIG } from './src/api';

// Client initialisieren
const client = initializeApiClient(API_CONFIG);
```

### 2. Mit React Hooks verwenden

```typescript
import React from 'react';
import { useApiClient } from './src/api';

function MyComponent() {
  const { client, login, logout, isAuthenticated } = useApiClient();

  const handleLogin = async () => {
    try {
      await login('user@example.com', 'password123');
      console.log('Login erfolgreich!');
    } catch (error) {
      console.error('Login fehlgeschlagen:', error);
    }
  };

  const getDecks = async () => {
    if (!client) return;
    
    try {
      const decks = await client.decks.deckControllerGetUserDecks();
      console.log('Benutzer-Decks:', decks);
    } catch (error) {
      console.error('Fehler beim Laden der Decks:', error);
    }
  };

  return (
    <div>
      {isAuthenticated ? (
        <button onClick={getDecks}>Decks laden</button>
      ) : (
        <button onClick={handleLogin}>Anmelden</button>
      )}
    </div>
  );
}
```

## 📋 Verfügbare APIs

Der generierte Client bietet folgende API-Kategorien:

- **`client.app`** - App-Endpunkte (Health-Check, etc.)
- **`client.auth`** - Authentication (Login, Profile, Token-Verification)
- **`client.users`** - Benutzerverwaltung
- **`client.decks`** - Deck-Management (CRUD, Benutzerzuordnung)
- **`client.cards`** - Karteikarten-Management

## 🔧 Konfiguration

### Environment-spezifische Konfiguration

```typescript
// src/api/config.ts
export const DEV_API_CONFIG = {
  baseUrl: 'http://localhost:3000', // Lokaler Backend-Server
};

export const PROD_API_CONFIG = {
  baseUrl: 'https://your-api-domain.com', // Produktions-API
};
```

### Manuelle Client-Konfiguration

```typescript
import { ApiClient } from './src/api';

const client = new ApiClient({
  baseUrl: 'https://custom-api.com',
  accessToken: 'your-jwt-token', // Optional
});
```

## 🔐 Authentication

### Login und Token-Management

```typescript
// Login
const response = await client.auth.authControllerLogin({
  loginDto: {
    email: 'user@example.com',
    password: 'password123'
  }
});

// Token setzen für nachfolgende Requests
if (response.accessToken) {
  client.setAccessToken(response.accessToken);
}

// Token löschen (Logout)
client.clearAccessToken();
```

### Automatisches Token-Management mit Hook

```typescript
const { login, logout, setToken, isAuthenticated } = useApiClient();

// Token aus Storage wiederherstellen
useEffect(() => {
  const savedToken = AsyncStorage.getItem('access_token');
  if (savedToken) {
    setToken(savedToken);
  }
}, []);
```

## 📚 Verwendungsbeispiele

### Decks verwalten

```typescript
// Alle Benutzer-Decks abrufen
const decks = await client.decks.deckControllerGetUserDecks();

// Neues Deck erstellen
const newDeck = await client.decks.deckControllerCreateDeck({
  createDeckDto: {
    name: 'Spanisch Vokabeln',
    description: 'Grundwortschatz Spanisch',
    isPublic: false
  }
});

// Deck by ID abrufen
const deck = await client.decks.deckControllerGetDeckById({ id: 1 });

// Benutzer zu Deck hinzufügen
await client.decks.deckControllerAddUserToDeck({
  id: 1,
  addUserToDeckDto: {
    email: 'friend@example.com',
    role: 'member'
  }
});
```

### Karteikarten verwalten

```typescript
// Karte in Deck erstellen
const newCard = await client.cards.cardControllerCreateCard({
  deckId: 1,
  createCardDto: {
    question: 'Was ist "Hallo" auf Spanisch?',
    answer: 'Hola',
    notes: 'Häufige Begrüßung'
  }
});

// Alle Karten eines Decks abrufen
const cards = await client.cards.cardControllerGetCardsByDeck({ deckId: 1 });

// Einzelne Karte abrufen
const card = await client.cards.cardControllerGetCardById({ cardId: 1 });

// Karte aktualisieren
await client.cards.cardControllerUpdateCard({
  cardId: 1,
  updateCardDto: {
    question: 'Aktualisierte Frage',
    answer: 'Aktualisierte Antwort'
  }
});
```

### Error Handling

```typescript
try {
  const decks = await client.decks.deckControllerGetUserDecks();
} catch (error) {
  if (error.status === 401) {
    // Unauthorized - Token ungültig
    console.log('Bitte erneut anmelden');
  } else if (error.status === 403) {
    // Forbidden - Keine Berechtigung
    console.log('Keine Berechtigung für diese Aktion');
  } else if (error.status === 404) {
    // Not Found
    console.log('Ressource nicht gefunden');
  } else {
    // Sonstige Fehler
    console.error('API-Fehler:', error);
  }
}
```

## 🔄 Client neu generieren

Wenn sich die `swagger.json` ändert, können Sie den Client neu generieren:

```bash
# Client komplett neu generieren
npm run generate-client:clean

# Oder nur aktualisieren
npm run generate-client
```

## 📁 Dateistruktur

```text
src/api/
├── generated/          # Automatisch generierte Dateien (NICHT BEARBEITEN!)
│   └── src/
│       ├── apis/       # API-Klassen
│       ├── models/     # TypeScript-Interfaces
│       └── runtime.ts  # Client-Runtime
├── client.ts          # Haupt-Client-Wrapper
├── config.ts          # API-Konfiguration
├── hooks.ts           # React-Hooks
├── examples.ts        # Verwendungsbeispiele
└── index.ts           # Haupt-Export-Datei
```

## ⚠️ Wichtige Hinweise

1. **Generierte Dateien nicht bearbeiten**: Alles in `src/api/generated/` wird bei der nächsten Generierung überschrieben.

2. **Token-Sicherheit**: Speichern Sie JWT-Tokens sicher (z.B. in React Native's SecureStore).

3. **Error Handling**: Implementieren Sie immer eine robuste Fehlerbehandlung für API-Calls.

4. **TypeScript**: Nutzen Sie die generierten TypeScript-Interfaces für bessere Typsicherheit.

## 🆘 Troubleshooting

### Problem: "API client not initialized"

```typescript
// Lösung: Client vor Verwendung initialisieren
import { initializeApiClient, API_CONFIG } from './src/api';
initializeApiClient(API_CONFIG);
```

### Problem: 401 Unauthorized

```typescript
// Lösung: Token prüfen und ggf. neu anmelden
if (error.status === 401) {
  client.clearAccessToken();
  // Weiterleitung zur Login-Seite
}
```

### Problem: CORS-Fehler bei Entwicklung

```typescript
// Backend muss CORS für die Frontend-Domain konfigurieren
// Oder Proxy in Expo/React Native verwenden
```
