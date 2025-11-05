
import { MemoBaseClient } from '@memobase/memobase';
import { MemobaseConfig } from '../types';
import { DEDICATED_USER_EXTERNAL_ID } from '../constants';

let client: MemoBaseClient | null = null;

const getClient = (): MemoBaseClient => {
    if (!client) {
        throw new Error("Memobase client not initialized. Call initialize first.");
    }
    return client;
}

export const initialize = (config: MemobaseConfig) => {
    if (!client) {
        client = new MemoBaseClient(config.apiUrl, config.apiKey);
    }
};

export const ping = async (): Promise<boolean> => {
    try {
        await getClient().ping();
        return true;
    } catch {
        return false;
    }
}

export const getOrCreateUser = async (): Promise<string> => {
    // This function now creates a user with a deterministic external ID.
    // Memobase will either create a new user or return the existing one if the ID is already used.
    // This ensures we always work with the same user for this app instance.
    // FIX: Corrected MemobaseClient API usage to `users.create`.
    const user = await getClient().users.create({
        name: 'Cuong (Aha! AI Tutor)',
        external_id: DEDICATED_USER_EXTERNAL_ID
    });
    return user.id;
};


export const getData = async <T>(key: string): Promise<T | null> => {
    try {
        // FIX: Corrected MemobaseClient API usage to `memory.get`.
        const response = await getClient().memory.get(key);
        if (response && response.value) {
            return JSON.parse(response.value);
        }
        return null;
    } catch (error: any) {
        if (error.status === 404) {
             return null;
        }
        console.error(`Failed to get data for key "${key}":`, error);
        throw error;
    }
};

export const saveData = async <T>(userId: string, key: string, value: T): Promise<void> => {
    if (key === 'aha-chatHistory' && Array.isArray(value)) {
        // FIX: Corrected MemobaseClient API usage to `memory.insert`.
         await getClient().memory.insert({
            user_id: userId,
            messages: value,
        });
    } else {
        // FIX: Corrected MemobaseClient API usage to `memory.set`.
        await getClient().memory.set(key, JSON.stringify(value));
    }
};

export const getContext = async (userId:string): Promise<string> => {
    try {
        // FIX: Corrected MemobaseClient API usage to `context.get`.
        const response = await getClient().context.get(userId);
        return response.context || "No context available yet.";
    } catch (error) {
        console.error("Failed to get context:", error);
        return "Could not retrieve context from memory.";
    }
};

export const flushMemory = async (userId: string): Promise<void> => {
    try {
        // FIX: Corrected MemobaseClient API usage to `memory.flush`.
        await getClient().memory.flush({ user_id: userId });
    } catch (error) {
        console.error("Failed to flush memory:", error);
    }
};