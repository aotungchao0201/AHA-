# AHA! AI Tutor - Frontend Template

This repository contains a frontend-only, React-based template for the "AHA! AI Tutor" application. It provides a complete user interface for a Socratic learning experience, ready to be connected to your custom backend services.

## Features

- **Socratic Chat Interface**: A clean chat window with support for different AI thinking modes.
- **Discovery Roadmap**: A visual timeline of learning topics.
- **"Aha!" Journal**: A place for users to log their learning breakthroughs.
- **Active Recall Modal**: A pop-up to test users on previously learned concepts.
- **Responsive Design**: Built with Tailwind CSS for a great experience on all devices.

## Project Structure

- `index.html`: The main entry point, includes the import map for dependencies.
- `index.tsx`: Mounts the React application.
- `App.tsx`: The main application component, manages state and views.
- `components/`: Contains all the reusable React components.
- `types.ts`: Defines the core data structures used throughout the app (e.g., `ChatMessage`, `JournalEntry`).
- `constants.ts`: Contains static data, like the initial learning roadmap.

## Getting Started

This project is designed to run in a static environment that supports ES modules and import maps. No build step is required. You can serve the files with any simple web server.

## Backend Integration Guide

This template is UI-only. All interactions that would typically require a backend (like sending a chat message or fetching data) are simulated with timeouts and mock data. To make the application fully functional, you will need to replace these simulations with actual API calls to your backend.

Below are the key areas to modify and the expected API contracts.

---

### 1. Chat Interaction

- **File to Modify**: `components/ChatWindow.tsx`
- **Function to Update**: `handleSendMessage`

Currently, this function simulates a response. You should replace the `setTimeout` block with a `fetch` call to your backend.

**API Endpoint Suggestion:** `POST /api/chat`

**Request Body:**
```json
{
  "userId": "string", // You'll need to implement user management
  "message": "string", // The user's new message
  "history": [ /* Array of ChatMessage objects */ ],
  "mode": "Normal" | "Deep Thinking" | "Quick Response" // From the ChatMode enum
}
```

**Response Body:**
```json
{
  "content": "string" // The AI's response text
}
```

---

### 2. Loading & Saving Data

- **File to Modify**: `App.tsx`

The application state (`chatHistory`, `journalEntries`, `roadmap`) is currently initialized with static data. You should fetch this data from your backend when the app loads.

**Function to Implement:** Create a `useEffect` hook in `App.tsx` to load data.

**API Endpoint Suggestions:**
- `GET /api/data/{userId}` or individual endpoints:
- `GET /api/chat-history/{userId}` -> Returns `ChatMessage[]`
- `GET /api/journal-entries/{userId}` -> Returns `JournalEntry[]`
- `GET /api/roadmap/{userId}` -> Returns `LearningTopic[]`

Similarly, when state changes (e.g., a new chat message is added), you should save it back to your backend.

**Example: Saving Chat History**
- **Function to Update**: `handleSetChatHistory` in `App.tsx`.
- **API Endpoint Suggestion**: `POST /api/chat-history/{userId}` with the full new history as the body.

---

### 3. Adding a Journal Entry

- **File to Modify**: `App.tsx`
- **Function to Update**: An `addJournalEntry` function needs to be created and potentially triggered from the chat based on AI responses.

**API Endpoint Suggestion:** `POST /api/journal-entries/{userId}`

**Request Body:**
```json
{
  "topic": "string",
  "content": "string"
}
```

**Response Body:** The newly created `JournalEntry` object.

---

### 4. Active Recall Questions

- **File to Modify**: `components/ActiveRecallModal.tsx`
- **Function to Update**: The `useEffect` hook that currently sets a mock question.

**API Endpoint Suggestion:** `GET /api/recall-question?topicTitle={topicTitle}`

**Request Body:** None (topic is in query param).

**Response Body:**
```json
{
  "question": "string"
}
```
