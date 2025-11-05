import React from 'react';
import { ChatIcon, JournalIcon, LightbulbIcon, RoadmapIcon } from './Icons';

interface SidebarProps {
  currentView: string;
  setCurrentView: (view: 'chat' | 'roadmap' | 'journal') => void;
}

const NavItem: React.FC<{
  icon: React.ReactNode;
  label: string;
  isActive: boolean;
  onClick: () => void;
}> = ({ icon, label, isActive, onClick }) => (
  <button
    onClick={onClick}
    className={`w-full flex items-center p-3 rounded-lg transition-colors duration-200 ${
      isActive
        ? 'bg-aha-yellow-500 text-aha-gray-900 font-semibold'
        : 'text-aha-gray-300 hover:bg-aha-gray-700 hover:text-white'
    }`}
  >
    {icon}
    <span className="ml-4">{label}</span>
  </button>
);

const Sidebar: React.FC<SidebarProps> = ({ currentView, setCurrentView }) => {
  return (
    <div className="w-64 bg-aha-gray-800 p-4 flex flex-col h-full fixed top-0 left-0">
      <div className="flex items-center mb-10 p-2">
        <LightbulbIcon className="w-10 h-10 text-aha-yellow-500" />
        <h1 className="text-2xl font-bold ml-3 text-white">AHA!</h1>
      </div>
      <nav className="flex flex-col space-y-2">
        <NavItem
          icon={<ChatIcon className="w-6 h-6" />}
          label="Socratic Chat"
          isActive={currentView === 'chat'}
          onClick={() => setCurrentView('chat')}
        />
        <NavItem
          icon={<RoadmapIcon className="w-6 h-6" />}
          label="Discovery Roadmap"
          isActive={currentView === 'roadmap'}
          onClick={() => setCurrentView('roadmap')}
        />
        <NavItem
          icon={<JournalIcon className="w-6 h-6" />}
          label="Aha! Journal"
          isActive={currentView === 'journal'}
          onClick={() => setCurrentView('journal')}
        />
      </nav>
      <div className="mt-auto">
        <div className="p-2 text-center text-aha-gray-500 text-sm mt-4">
            <p>Your personal AI facilitator.</p>
            <p>Learn by discovery.</p>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
