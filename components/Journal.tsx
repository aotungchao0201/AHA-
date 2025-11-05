
import React from 'react';
import { JournalEntry } from '../types';
import { JournalIcon } from './Icons';

interface JournalProps {
  entries: JournalEntry[];
}

const Journal: React.FC<JournalProps> = ({ entries }) => {
  return (
    <div className="p-8 h-full overflow-y-auto">
      <h2 className="text-4xl font-bold text-white mb-2">My "Aha!" Journal</h2>
      <p className="text-aha-gray-300 mb-8">A collection of your personal breakthroughs and discoveries.</p>
      
      {entries.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-2/3 text-center text-aha-gray-500">
            <JournalIcon className="w-24 h-24 mb-4"/>
            <p className="text-xl">Your journal is empty.</p>
            <p>When you have an "Aha!" moment in the chat, the AI will prompt you to add it here!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {entries.slice().reverse().map(entry => (
                <div key={entry.id} className="bg-aha-gray-800 p-6 rounded-lg shadow-lg border border-aha-gray-700 flex flex-col transform hover:scale-105 transition-transform duration-200">
                    <div className="flex-grow">
                      <p className="text-sm text-aha-gray-400 mb-2">{new Date(entry.timestamp).toLocaleString()}</p>
                      <h3 className="text-xl font-semibold text-aha-yellow-500 mb-3">{entry.topic}</h3>
                      <p className="text-aha-gray-200 whitespace-pre-wrap">{entry.content}</p>
                    </div>
                </div>
            ))}
        </div>
      )}
    </div>
  );
};

export default Journal;
