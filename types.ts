export enum MessageAuthor {
  USER = 'user',
  AI = 'ai',
  SYSTEM = 'system',
}

export interface ChatMessage {
  author: MessageAuthor;
  content: string;
  timestamp: string;
}

export interface JournalEntry {
  id: string;
  topic: string;
  content: string;
  timestamp: string;
}

export interface LearningTopic {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  discoveredAt: string | null;
}

export enum ChatMode {
  NORMAL = 'Normal',
  THINKING = 'Deep Thinking',
  QUICK = 'Quick Response',
}

// FIX: Add MemobaseConfig interface to resolve import errors.
export interface MemobaseConfig {
  apiUrl: string;
  apiKey: string;
}
