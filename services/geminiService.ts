import { GoogleGenAI } from "@google/genai";
import { ChatMode, ChatMessage, MessageAuthor } from '../types';
import { GEMINI_MODELS, SYSTEM_PROMPT } from '../constants';
import * as memobaseService from './memobaseService';

let ai: GoogleGenAI | null = null;

const getAi = () => {
  if (!ai) {
    if (!process.env.API_KEY) {
      throw new Error("API_KEY environment variable not set");
    }
    ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  }
  return ai;
};

const getModelForMode = (mode: ChatMode): string => {
  switch (mode) {
    case ChatMode.QUICK:
      return GEMINI_MODELS.QUICK;
    case ChatMode.THINKING:
      return GEMINI_MODELS.THINKING;
    case ChatMode.NORMAL:
    default:
      return GEMINI_MODELS.NORMAL;
  }
};

export const sendMessage = async (userId: string, message: string, history: ChatMessage[], mode: ChatMode): Promise<string> => {
  const ai = getAi();
  const modelName = getModelForMode(mode);

  // 1. Get personalized context from Memobase
  const context = await memobaseService.getContext(userId);
  const personalizedSystemPrompt = `${SYSTEM_PROMPT}\n\n--- MEMORY CONTEXT ---\nHere is a summary of what I know about the user and our past conversations. Use this to personalize your guidance:\n${context}\n--- END MEMORY CONTEXT ---`;


  const config: any = { systemInstruction: personalizedSystemPrompt };
  if (mode === ChatMode.THINKING) {
    config.thinkingConfig = { thinkingBudget: 32768 };
  }

  const formattedHistory = history
    .filter(msg => msg.author !== MessageAuthor.SYSTEM)
    .map(msg => ({
      role: msg.author === MessageAuthor.USER ? 'user' : 'model',
      parts: [{ text: msg.content }]
    }));

  const chat = ai.chats.create({
    model: modelName,
    history: formattedHistory,
    config,
  });

  try {
    const response = await chat.sendMessage({ message });
    return response.text;
  } catch (error) {
    console.error("Error sending message to Gemini:", error);
    return "I'm sorry, I encountered an error. Could you please try again?";
  }
};

export const generateRecallQuestion = async (topicTitle: string): Promise<string> => {
    const ai = getAi();
    const prompt = `Create a single, short, practical question to test my understanding of "${topicTitle}". The question should require me to apply the knowledge, not just define it. Don't give any preamble or explanation. Just the question.`;
    
    try {
        const response = await ai.models.generateContent({
            model: GEMINI_MODELS.QUICK,
            contents: prompt,
        });
        return response.text;
    } catch(error) {
        console.error("Error generating recall question:", error);
        return `What is the main rule regarding "${topicTitle}"?`;
    }
}