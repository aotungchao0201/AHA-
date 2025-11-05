import React, { useState, useEffect } from 'react';
import { LearningTopic } from '../types';

interface ActiveRecallModalProps {
  topic: LearningTopic;
  onClose: () => void;
}

const ActiveRecallModal: React.FC<ActiveRecallModalProps> = ({ topic, onClose }) => {
  const [question, setQuestion] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchQuestion = async () => {
      setIsLoading(true);
      // --- Backend Integration Point ---
      // Replace this setTimeout with a fetch() call to your backend to get a real question.
      setTimeout(() => {
        setQuestion(`This is a mock recall question about: "${topic.title}". How would you explain it to a friend?`);
        setIsLoading(false);
      }, 800);
      // --- End Integration Point ---
    };
    fetchQuestion();
  }, [topic]);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
      <div className="bg-aha-gray-800 rounded-lg shadow-2xl p-8 max-w-lg w-full border border-aha-yellow-500 transform transition-all animate-fade-in-up">
        <h2 className="text-2xl font-bold text-aha-yellow-500 mb-2">Active Recall Challenge!</h2>
        <p className="text-aha-gray-300 mb-6">Let's jog your memory on a past discovery to make it stick.</p>
        
        <div className="bg-aha-gray-700 p-4 rounded-md mb-6">
            <h3 className="font-semibold text-white mb-2">Topic: {topic.title}</h3>
            {isLoading ? (
                 <div className="flex items-center space-x-2 text-aha-gray-400">
                    <p>Generating a question...</p>
                 </div>
            ) : (
                <p className="text-aha-gray-200">{question}</p>
            )}
        </div>

        <textarea
          placeholder="Jot down your thoughts here..."
          className="w-full bg-aha-gray-900 text-white p-3 rounded-md mb-6 h-28 focus:ring-2 focus:ring-aha-yellow-500 focus:outline-none"
        />

        <div className="flex justify-end">
          <button
            onClick={onClose}
            className="bg-aha-yellow-500 text-aha-gray-900 font-bold py-2 px-6 rounded-md hover:bg-aha-yellow-600 transition-colors"
          >
            Got it, thanks!
          </button>
        </div>
      </div>
    </div>
  );
};

export default ActiveRecallModal;