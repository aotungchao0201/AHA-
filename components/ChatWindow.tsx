import React, { useState, useRef, useEffect, useCallback } from 'react';
import { ChatMessage, MessageAuthor, ChatMode } from '../types';
import { BrainIcon, SendIcon, ZapIcon, LightbulbIcon } from './Icons';

interface ChatWindowProps {
  chatHistory: ChatMessage[];
  setChatHistory: (history: ChatMessage[]) => void;
}

const ChatModeSelector: React.FC<{
    currentMode: ChatMode;
    setMode: (mode: ChatMode) => void;
}> = ({ currentMode, setMode }) => {
    const modes = [
        { mode: ChatMode.NORMAL, icon: <LightbulbIcon className="w-5 h-5 mr-2"/>, label: 'Normal' },
        { mode: ChatMode.THINKING, icon: <BrainIcon className="w-5 h-5 mr-2"/>, label: 'Deep Thinking' },
        { mode: ChatMode.QUICK, icon: <ZapIcon className="w-5 h-5 mr-2"/>, label: 'Quick Response' },
    ];

    return (
        <div className="flex items-center bg-aha-gray-700 rounded-full p-1">
            {modes.map(({mode, icon, label}) => (
                <button
                    key={mode}
                    onClick={() => setMode(mode)}
                    className={`flex items-center justify-center px-4 py-2 text-sm font-medium rounded-full transition-colors duration-200 ${
                        currentMode === mode
                            ? 'bg-aha-blue-500 text-white'
                            : 'text-aha-gray-300 hover:bg-aha-gray-600'
                    }`}
                    title={label}
                >
                    {icon}
                    <span className="hidden sm:inline">{label}</span>
                </button>
            ))}
        </div>
    );
};


const ChatWindow: React.FC<ChatWindowProps> = ({ chatHistory, setChatHistory }) => {
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [chatMode, setChatMode] = useState<ChatMode>(ChatMode.NORMAL);
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatHistory]);

  const handleSendMessage = useCallback(async () => {
    if (input.trim() === '' || isLoading) {
        return;
    };

    const userMessage: ChatMessage = {
      author: MessageAuthor.USER,
      content: input,
      timestamp: new Date().toISOString(),
    };
    
    const updatedHistoryWithUserMessage = [...chatHistory, userMessage];
    setChatHistory(updatedHistoryWithUserMessage);
    setInput('');
    setIsLoading(true);

    // --- Backend Integration Point ---
    // Replace this setTimeout with a fetch() call to your backend API.
    setTimeout(() => {
      const aiMessage: ChatMessage = {
        author: MessageAuthor.AI,
        content: `This is a simulated Socratic response to your message: "${input}".\n\nTo make this work, you need to connect a backend. See the README.md for instructions.`,
        timestamp: new Date().toISOString(),
      };
      setChatHistory([...updatedHistoryWithUserMessage, aiMessage]);
      setIsLoading(false);
    }, 1500);
    // --- End Integration Point ---

  }, [input, isLoading, chatHistory, setChatHistory, chatMode]);

  return (
    <div className="flex flex-col h-full bg-aha-gray-900">
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {chatHistory.map((msg, index) => (
                <div key={index} className={`flex items-start gap-4 ${msg.author === MessageAuthor.USER ? 'justify-end' : 'justify-start'}`}>
                    {msg.author === MessageAuthor.AI && (
                        <div className="w-10 h-10 rounded-full bg-aha-yellow-500 flex items-center justify-center flex-shrink-0">
                           <LightbulbIcon className="w-6 h-6 text-aha-gray-900"/>
                        </div>
                    )}
                    <div className={`max-w-xl p-4 rounded-2xl ${
                        msg.author === MessageAuthor.USER 
                            ? 'bg-aha-blue-600 text-white rounded-br-none' 
                            : msg.author === MessageAuthor.AI 
                                ? 'bg-aha-gray-700 text-aha-gray-100 rounded-bl-none'
                                : 'bg-red-900/50 text-red-200 w-full text-center'
                    }`}>
                        <p className="whitespace-pre-wrap">{msg.content}</p>
                    </div>
                </div>
            ))}
            {isLoading && (
                 <div className="flex items-start gap-4 justify-start">
                     <div className="w-10 h-10 rounded-full bg-aha-yellow-500 flex items-center justify-center flex-shrink-0">
                           <LightbulbIcon className="w-6 h-6 text-aha-gray-900"/>
                        </div>
                    <div className="max-w-xl p-4 rounded-2xl bg-aha-gray-700 text-aha-gray-100 rounded-bl-none">
                        <div className="flex items-center space-x-2">
                            <div className="w-2 h-2 bg-aha-yellow-500 rounded-full animate-pulse"></div>
                            <div className="w-2 h-2 bg-aha-yellow-500 rounded-full animate-pulse" style={{animationDelay: '0.2s'}}></div>
                            <div className="w-2 h-2 bg-aha-yellow-500 rounded-full animate-pulse" style={{animationDelay: '0.4s'}}></div>
                        </div>
                    </div>
                </div>
            )}
            <div ref={chatEndRef} />
        </div>
        <div className="p-4 bg-aha-gray-800 border-t border-aha-gray-700">
            <div className="max-w-4xl mx-auto flex flex-col gap-4">
                <div className="flex justify-center">
                    <ChatModeSelector currentMode={chatMode} setMode={setChatMode}/>
                </div>
                <div className="flex items-center bg-aha-gray-700 rounded-lg p-2">
                    <textarea
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter' && !e.shiftKey) {
                                e.preventDefault();
                                handleSendMessage();
                            }
                        }}
                        placeholder="Start your discovery..."
                        className="flex-1 bg-transparent text-white placeholder-aha-gray-400 focus:outline-none resize-none px-2"
                        rows={1}
                        disabled={isLoading}
                    />
                    <button
                        onClick={handleSendMessage}
                        disabled={isLoading || input.trim() === ''}
                        className="p-2 rounded-md bg-aha-blue-500 text-white hover:bg-aha-blue-600 disabled:bg-aha-gray-600 disabled:cursor-not-allowed transition-colors"
                    >
                       <SendIcon className="w-5 h-5" />
                    </button>
                </div>
            </div>
        </div>
    </div>
  );
};

export default ChatWindow;