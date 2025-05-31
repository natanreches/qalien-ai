
import React from 'react';
import { Rocket, Upload, CheckCircle } from 'lucide-react';

export const OnboardingWelcome = () => {
  return (
    <div className="text-center space-y-6">
      <div className="flex justify-center">
        <div className="p-4 bg-purple-600 rounded-full">
          <Rocket className="h-8 w-8 text-white" />
        </div>
      </div>
      
      <div>
        <h2 className="text-3xl font-bold text-white mb-4">
          Welcome to Your Brand Center
        </h2>
        <p className="text-gray-400 text-lg max-w-2xl mx-auto">
          Let's get your brand set up! We'll help you upload your brand guidelines 
          and configure your brand standards to ensure consistent, compliant creative assets.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
        <div className="text-center p-6">
          <div className="flex justify-center mb-4">
            <div className="p-3 bg-blue-600 rounded-lg">
              <Upload className="h-6 w-6 text-white" />
            </div>
          </div>
          <h3 className="font-semibold text-white mb-2">Upload Guidelines</h3>
          <p className="text-gray-400 text-sm">
            Upload your brand guideline documents to establish your standards
          </p>
        </div>

        <div className="text-center p-6">
          <div className="flex justify-center mb-4">
            <div className="p-3 bg-green-600 rounded-lg">
              <CheckCircle className="h-6 w-6 text-white" />
            </div>
          </div>
          <h3 className="font-semibold text-white mb-2">Confirm Elements</h3>
          <p className="text-gray-400 text-sm">
            Review and confirm your brand colors, fonts, and style preferences
          </p>
        </div>

        <div className="text-center p-6">
          <div className="flex justify-center mb-4">
            <div className="p-3 bg-purple-600 rounded-lg">
              <Rocket className="h-6 w-6 text-white" />
            </div>
          </div>
          <h3 className="font-semibold text-white mb-2">Start Creating</h3>
          <p className="text-gray-400 text-sm">
            Begin managing your campaigns and creative assets
          </p>
        </div>
      </div>
    </div>
  );
};
