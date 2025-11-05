import React, { useState, useEffect } from 'react';
import { ChatMessage, JournalEntry, LearningTopic, MessageAuthor } from './types';
import { INITIAL_ROADMAP } from './constants';

import Sidebar from './components/Sidebar';
import ChatWindow from './components/ChatWindow';
import Roadmap from './components/Roadmap';
import Journal from './components/Journal';
import ActiveRecallModal from './components/ActiveRecallModal';

type View = 'chat' | 'roadmap' | 'journal';

// Mock data to populate the UI
const initialChat: ChatMessage[] = [
  {
    author: MessageAuthor.AI,
    content: "Welcome to the AHA! AI Tutor. This is a frontend-only template. See the README for how to connect a backend.",
    timestamp: new Date().toISOString(),
  }
];

const initialJournalEntries: JournalEntry[] = [
    {
        id: 'journal-1',
        topic: 'Example "Aha!" Moment',
        content: 'I realized that you add an "s" to verbs in English only when the subject is a single other person or thing (he, she, it).',
        timestamp: new Date().toISOString()
    }
]

function App() {
  const [currentView, setCurrentView] = useState<View>('chat');
  
  // State is now managed locally with mock data
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>(initialChat);
  const [journalEntries, setJournalEntries] = useState<JournalEntry[]>(initialJournalEntries);
  const [roadmap, setRoadmap] = useState<LearningTopic[]>(INITIAL_ROADMAP);

  const [recallTopic, setRecallTopic] = useState<LearningTopic | null>(null);

  // This effect simulates checking for recall opportunities on app load.
  // In a real app, this logic might be more complex.
  useEffect(() => {
    const oneDayInMillis = 24 * 60 * 60 * 1000;
    const now = new Date().getTime();
    
    // Create a mock completed topic for demonstration
    const mockCompletedRoadmap = roadmap.map((topic, i) => i === 0 ? {
        ...topic,
        completed: true,
        discoveredAt: new Date(now - (2 * oneDayInMillis)).toISOString() // Discovered 2 days ago
    } : topic);

    const topicsToRecall = mockCompletedRoadmap.filter(topic => 
      topic.completed && 
      topic.discoveredAt &&
      (now - new Date(topic.discoveredAt).getTime() > oneDayInMillis)
    );

    if (topicsToRecall.length > 0) {
      const lastRecallTime = localStorage.getItem('aha-lastRecallTime');
      // Only show recall modal once per day
      if (!lastRecallTime || (now - parseInt(lastRecallTime) > oneDayInMillis)) {
        setRecallTopic(topicsToRecall[Math.floor(Math.random() * topicsToRecall.length)]);
      }
    }
  }, []); // Runs once on mount
  
  // --- Backend Integration Point ---
  // These handler functions just update local state.
  // You should modify them to also send updates to your backend API.
  
  const handleSetChatHistory = (newHistory: ChatMessage[]) => {
    setChatHistory(newHistory);
    // e.g., saveToBackend('/api/chat-history', newHistory);
  }

  const addJournalEntry = (entry: Omit<JournalEntry, 'id' | 'timestamp'>) => {
    const newEntry: JournalEntry = {
        ...entry,
        id: `journal-${Date.now()}`,
        timestamp: new Date().toISOString()
    };
    const updatedEntries = [...journalEntries, newEntry];
    setJournalEntries(updatedEntries);
    // e.g., saveToBackend('/api/journal-entries', newEntry);
  }
  
  // --- End Integration Point ---

  const handleCloseRecall = () => {
    localStorage.setItem('aha-lastRecallTime', new Date().getTime().toString());
    setRecallTopic(null);
  };

  const renderView = () => {
    switch (currentView) {
      case 'roadmap':
        return <Roadmap roadmap={roadmap} />;
      case 'journal':
        return <Journal entries={journalEntries} />;
      case 'chat':
      default:
        return <ChatWindow chatHistory={chatHistory} setChatHistory={handleSetChatHistory} />;
    }
  };

  return (
    <div className="flex h-screen font-sans bg-aha-gray-900">
      <Sidebar 
        currentView={currentView} 
        setCurrentView={setCurrentView}
      />
      <main className="flex-1 ml-64 h-full">
        {renderView()}
      </main>
      {recallTopic && <ActiveRecallModal topic={recallTopic} onClose={handleCloseRecall} />}
    </div>
  );
}

export default App;