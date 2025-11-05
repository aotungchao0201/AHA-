import React, { useState } from 'react';
import { MemobaseConfig } from '../types';

interface SettingsModalProps {
  currentConfig: MemobaseConfig | null;
  onSave: (config: MemobaseConfig) => void;
  onClose: () => void;
  error?: string | null;
}

const SettingsModal: React.FC<SettingsModalProps> = ({ currentConfig, onSave, onClose, error }) => {
  const [apiUrl, setApiUrl] = useState(currentConfig?.apiUrl || 'https://api.memobase.dev');
  const [apiKey, setApiKey] = useState(currentConfig?.apiKey || '');

  const handleSave = () => {
    if (apiUrl.trim() && apiKey.trim()) {
      onSave({ apiUrl: apiUrl.trim(), apiKey: apiKey.trim() });
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
      <div className="bg-aha-gray-800 rounded-lg shadow-2xl p-8 max-w-lg w-full border border-aha-gray-600">
        <h2 className="text-2xl font-bold text-white mb-4">Memobase Settings</h2>
        <p className="text-aha-gray-300 mb-6">
          Please enter your Memobase API URL and Key to connect to your long-term memory.
        </p>

        {error && (
            <div className="bg-red-900/50 border border-red-700 text-red-200 p-3 rounded-md mb-4">
                {error}
            </div>
        )}

        <div className="space-y-4">
          <div>
            <label htmlFor="apiUrl" className="block text-sm font-medium text-aha-gray-300 mb-1">
              API URL
            </label>
            <input
              type="text"
              id="apiUrl"
              value={apiUrl}
              onChange={(e) => setApiUrl(e.target.value)}
              className="w-full bg-aha-gray-900 text-white p-3 rounded-md focus:ring-2 focus:ring-aha-yellow-500 focus:outline-none"
              placeholder="https://api.memobase.dev"
            />
          </div>
          <div>
            <label htmlFor="apiKey" className="block text-sm font-medium text-aha-gray-300 mb-1">
              API Key
            </label>
            <input
              type="password"
              id="apiKey"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              className="w-full bg-aha-gray-900 text-white p-3 rounded-md focus:ring-2 focus:ring-aha-yellow-500 focus:outline-none"
              placeholder="sk-proj-..."
            />
          </div>
        </div>

        <div className="flex justify-end mt-8 gap-4">
           {currentConfig && (
             <button
                onClick={onClose}
                className="bg-aha-gray-600 text-white font-bold py-2 px-6 rounded-md hover:bg-aha-gray-700 transition-colors"
              >
                Close
              </button>
           )}
          <button
            onClick={handleSave}
            disabled={!apiUrl.trim() || !apiKey.trim()}
            className="bg-aha-yellow-500 text-aha-gray-900 font-bold py-2 px-6 rounded-md hover:bg-aha-yellow-600 transition-colors disabled:bg-aha-gray-500 disabled:cursor-not-allowed"
          >
            Save & Connect
          </button>
        </div>
      </div>
    </div>
  );
};

export default SettingsModal;
