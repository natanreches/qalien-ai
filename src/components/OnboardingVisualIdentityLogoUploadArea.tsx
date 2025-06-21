
import React from 'react';
import { Upload } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface OnboardingVisualIdentityLogoUploadAreaProps {
  extractedFromGuidelines: boolean;
  onFileUpload: (files: FileList | null) => void;
}

export const OnboardingVisualIdentityLogoUploadArea = ({
  extractedFromGuidelines,
  onFileUpload
}: OnboardingVisualIdentityLogoUploadAreaProps) => {
  return (
    <div className="border-2 border-dashed border-gray-600 rounded-lg p-6 text-center">
      <Upload className="h-8 w-8 mx-auto text-gray-400 mb-2" />
      <p className="text-gray-400 mb-2">
        {extractedFromGuidelines 
          ? 'Upload additional logo files (optional)'
          : 'Upload logo files'
        }
      </p>
      <input
        type="file"
        multiple
        accept="image/*"
        onChange={(e) => onFileUpload(e.target.files)}
        className="hidden"
        id="logo-upload"
      />
      <Button
        variant="outline"
        onClick={() => document.getElementById('logo-upload')?.click()}
        className="border-gray-600 text-gray-300"
      >
        Choose Files
      </Button>
    </div>
  );
};
