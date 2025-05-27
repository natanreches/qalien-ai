
import React from 'react';
import { Header } from '@/components/Header';
import { ProfileSettings } from '@/components/ProfileSettings';

const Settings = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="container mx-auto px-6 py-8">
        <ProfileSettings />
      </main>
    </div>
  );
};

export default Settings;
