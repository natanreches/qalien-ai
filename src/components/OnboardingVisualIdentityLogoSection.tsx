
import React from 'react';
import { Image, Upload } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

interface OnboardingVisualIdentityLogoSectionProps {
  logoFiles: File[];
  extractedFromGuidelines: boolean;
  onFileUpload: (files: FileList | null) => void;
}

export const OnboardingVisualIdentityLogoSection = ({
  logoFiles,
  extractedFromGuidelines,
  onFileUpload
}: OnboardingVisualIdentityLogoSectionProps) => {
  return (
    <Card className="p-6 bg-gray-800 border-gray-700">
      <div className="flex items-center mb-4">
        <Image className="h-5 w-5 mr-2 text-blue-400" />
        <h3 className="text-lg font-semibold text-white">Logo Files</h3>
        {extractedFromGuidelines && (
          <Badge variant="secondary" className="ml-2 bg-green-600 text-white">
            Auto-extracted
          </Badge>
        )}
      </div>
      <p className="text-gray-400 text-sm mb-4">
        {extractedFromGuidelines 
          ? 'Logo files have been automatically extracted from your brand guidelines.'
          : 'Upload approved logo files in all approved variations (color, monochrome, reverse, vertical, etc.)'
        }
      </p>
      
      {extractedFromGuidelines && logoFiles.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {logoFiles.map((file, index) => (
            <div key={index} className="text-center">
              <div className="w-full h-20 bg-gray-700 rounded border flex items-center justify-center mb-2">
                <Image className="h-8 w-8 text-gray-400" />
              </div>
              <p className="text-xs text-gray-400 truncate">{file.name}</p>
              <Badge variant="secondary" className="mt-1 text-xs bg-green-600 text-white">
                Extracted
              </Badge>
            </div>
          ))}
        </div>
      ) : (
        <div className="space-y-4">
          <div className="border-2 border-dashed border-gray-600 rounded-lg p-6 text-center">
            <Upload className="h-8 w-8 mx-auto text-gray-400 mb-2" />
            <p className="text-gray-400 mb-2">Upload logo files</p>
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
          {logoFiles.length > 0 && (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {logoFiles.map((file, index) => (
                <div key={index} className="text-center">
                  <div className="w-full h-20 bg-gray-700 rounded border flex items-center justify-center mb-2">
                    <Image className="h-8 w-8 text-gray-400" />
                  </div>
                  <p className="text-xs text-gray-400 truncate">{file.name}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </Card>
  );
};
