
import React from 'react';
import { LearningTopic } from '../types';

interface RoadmapProps {
  roadmap: LearningTopic[];
}

const Roadmap: React.FC<RoadmapProps> = ({ roadmap }) => {
  return (
    <div className="p-8 h-full overflow-y-auto">
      <h2 className="text-4xl font-bold text-white mb-2">Discovery Roadmap</h2>
      <p className="text-aha-gray-300 mb-8">Your personal journey to understanding, one "Aha!" moment at a time.</p>
      
      <div className="relative border-l-2 border-aha-gray-700 pl-8 space-y-12">
        {roadmap.map((topic, index) => (
          <div key={topic.id} className="relative">
            <div className={`absolute -left-[38px] top-1 w-6 h-6 rounded-full flex items-center justify-center
              ${topic.completed ? 'bg-aha-yellow-500' : 'bg-aha-gray-600 border-2 border-aha-gray-500'}`}>
              {topic.completed && (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-aha-gray-900" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              )}
            </div>
            <div className="bg-aha-gray-800 p-6 rounded-lg shadow-lg border border-aha-gray-700">
              <h3 className="text-2xl font-semibold text-aha-yellow-500 mb-2">{topic.title}</h3>
              <p className="text-aha-gray-300">{topic.description}</p>
               {topic.completed && topic.discoveredAt && (
                <p className="text-sm text-aha-gray-400 mt-4">
                  Discovered on: {new Date(topic.discoveredAt).toLocaleDateString()}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Roadmap;
