
import React from 'react';
import { Image, X } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

interface OnboardingVisualIdentityLogoGridProps {
  logoFiles: File[];
  extractedFromGuidelines: boolean;
  canDeleteIndividual: boolean;
  onRemoveFile?: (index: number) => void;
}

export const OnboardingVisualIdentityLogoGrid = ({
  logoFiles,
  extractedFromGuidelines,
  canDeleteIndividual,
  onRemoveFile
}: OnboardingVisualIdentityLogoGridProps) => {
  if (logoFiles.length === 0) {
    return null;
  }

  const showGrid = extractedFromGuidelines || (!extractedFromGuidelines && logoFiles.length > 0);
  const gridClassName = extractedFromGuidelines ? "mb-6" : "mt-4";

  if (!showGrid) {
    return null;
  }

  return (
    <div className={`grid grid-cols-2 md:grid-cols-4 gap-4 ${gridClassName}`}>
      {logoFiles.map((file, index) => (
        <div key={index} className="text-center relative">
          <div className="w-full h-20 bg-gray-700 rounded border flex items-center justify-center mb-2">
            <Image className="h-8 w-8 text-gray-400" />
          </div>
          <p className="text-xs text-gray-400 truncate">{file.name}</p>
          {extractedFromGuidelines && (
            <Badge variant="secondary" className="mt-1 text-xs bg-green-600 text-white">
              Extracted
            </Badge>
          )}
          {((canDeleteIndividual && onRemoveFile) || (!extractedFromGuidelines && onRemoveFile)) && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => onRemoveFile(index)}
              className="absolute -top-2 -right-2 w-6 h-6 p-0 rounded-full bg-red-600 border-red-600 text-white hover:bg-red-700"
            >
              <X className="h-3 w-3" />
            </Button>
          )}
        </div>
      ))}
    </div>
  );
};
