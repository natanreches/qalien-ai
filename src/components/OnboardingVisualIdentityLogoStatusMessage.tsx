
import React from 'react';
import { CheckCircle, AlertCircle } from 'lucide-react';

interface OnboardingVisualIdentityLogoStatusMessageProps {
  extractedFromGuidelines: boolean;
}

export const OnboardingVisualIdentityLogoStatusMessage = ({
  extractedFromGuidelines
}: OnboardingVisualIdentityLogoStatusMessageProps) => {
  if (extractedFromGuidelines) {
    return (
      <div className="flex items-start space-x-2 mb-4 p-3 bg-green-900/20 border border-green-600/30 rounded-lg">
        <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
        <div>
          <p className="text-green-400 text-sm font-medium">Based on your brand guidelines</p>
          <p className="text-gray-300 text-sm">Logo files have been automatically extracted from your uploaded brand documents.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-start space-x-2 mb-4 p-3 bg-orange-900/20 border border-orange-600/30 rounded-lg">
      <AlertCircle className="h-5 w-5 text-orange-500 mt-0.5 flex-shrink-0" />
      <div>
        <p className="text-orange-400 text-sm font-medium">Logos not found in brand guidelines</p>
        <p className="text-gray-300 text-sm">Upload approved logo files in all approved variations (color, monochrome, reverse, vertical, etc.)</p>
      </div>
    </div>
  );
};
