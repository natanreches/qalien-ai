
import React from 'react';
import { CheckCircle, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

interface BrandGuideline {
  id: string;
  name: string;
  description: string;
  file: File | null;
  uploadDate: string;
}

interface OnboardingVisualIdentityHeaderProps {
  guidelines: BrandGuideline[];
  extractedFromGuidelines: boolean;
  onNavigateToGuidelines?: () => void;
}

export const OnboardingVisualIdentityHeader = ({
  guidelines,
  extractedFromGuidelines,
  onNavigateToGuidelines
}: OnboardingVisualIdentityHeaderProps) => {
  if (guidelines.length === 0) {
    return (
      <div className="space-y-8">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-white mb-2">Visual Identity Setup</h2>
          <p className="text-gray-400">
            Configure your brand's visual elements. Upload brand guidelines first for automatic extraction.
          </p>
        </div>

        <Card className="p-8 bg-gray-800 border-gray-700 text-center">
          <h3 className="text-lg font-semibold text-white mb-2">Brand Guidelines Required</h3>
          <p className="text-gray-400 mb-6">
            To automatically extract your visual identity elements, please upload your brand guidelines first. 
            This will help us pre-populate colors, fonts, and other brand elements.
          </p>
          <Button
            onClick={onNavigateToGuidelines}
            variant="outline"
            className="border-gray-600 text-gray-300"
          >
            <FileText className="h-4 w-4 mr-2" />
            Upload Brand Guidelines
          </Button>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-white mb-2">Visual Identity Setup</h2>
        <p className="text-gray-400">
          Configure your brand's visual elements. Values have been pre-filled from your uploaded brand guidelines.
        </p>
      </div>

      {extractedFromGuidelines && (
        <div className="flex items-center space-x-2 mb-6">
          <CheckCircle className="h-5 w-5 text-green-500" />
          <span className="text-green-500 font-medium">
            Visual elements automatically extracted from {guidelines.length} guideline{guidelines.length !== 1 ? 's' : ''}
          </span>
        </div>
      )}
    </div>
  );
};
