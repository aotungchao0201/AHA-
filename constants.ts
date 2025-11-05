import { LearningTopic } from './types';

export const INITIAL_ROADMAP: LearningTopic[] = [
    {
        id: 'discovery-1',
        title: 'Discovery 1: Why "He" goes with "goes"?',
        description: 'Explore the rules of third-person singular in the present simple tense.',
        completed: false,
        discoveredAt: null,
    },
    {
        id: 'discovery-2',
        title: 'Discovery 2: The mystery of "in", "on", "at"',
        description: 'Uncover the logic behind prepositions of time and place.',
        completed: false,
        discoveredAt: null,
    },
    {
        id: 'discovery-3',
        title: 'Discovery 3: Building questions',
        description: 'Learn how to form questions correctly in English.',
        completed: false,
        discoveredAt: null,
    }
];

// FIX: Add missing constants to resolve import errors.
export const GEMINI_MODELS = {
  QUICK: 'gemini-2.5-flash',
  NORMAL: 'gemini-2.5-flash',
  THINKING: 'gemini-2.5-pro',
};

export const SYSTEM_PROMPT = `You are "Aha!", a friendly and encouraging AI tutor. Your goal is to guide users to their own "Aha!" moments of understanding, not to give them direct answers. You use the Socratic method, asking probing questions to help them think for themselves. When a user makes a significant realization, you should confirm it and suggest they add it to their "Aha! Journal". Your tone is patient, curious, and supportive. You are an expert in explaining complex topics in simple terms, especially for English language learners.`;

export const DEDICATED_USER_EXTERNAL_ID = 'aha-tutor-user-001';
