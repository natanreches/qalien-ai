
import React from 'react';
import { Header } from '@/components/Header';

const Settings = () => {
  return (
    <div className="min-h-screen bg-gray-900">
      <Header />
      
      <main className="container mx-auto px-6 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center py-16">
            <h2 className="text-2xl font-bold text-white mb-4">Settings</h2>
            <p className="text-gray-400 mb-8">
              Brand-specific settings have been moved to individual brand pages.
            </p>
            <p className="text-gray-500">
              Visit the Business Center and select a brand to access compliance settings and brand guidelines.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Settings;
