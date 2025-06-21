
import React, { useState } from 'react';
import { Image } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { OnboardingVisualIdentityLogoVerificationMessage } from './OnboardingVisualIdentityLogoVerificationMessage';
import { OnboardingVisualIdentityLogoStatusMessage } from './OnboardingVisualIdentityLogoStatusMessage';
import { OnboardingVisualIdentityLogoGrid } from './OnboardingVisualIdentityLogoGrid';
import { OnboardingVisualIdentityLogoUploadArea } from './OnboardingVisualIdentityLogoUploadArea';

interface OnboardingVisualIdentityLogoSectionProps {
  logoFiles: File[];
  extractedFromGuidelines: boolean;
  onFileUpload: (files: FileList | null) => void;
  onVerifyExtraction?: (isCorrect: boolean) => void;
  extractionVerified?: boolean;
  onClearExtracted?: () => void;
  onRemoveFile?: (index: number) => void;
}

export const OnboardingVisualIdentityLogoSection = ({
  logoFiles,
  extractedFromGuidelines,
  onFileUpload,
  onVerifyExtraction,
  extractionVerified,
  onClearExtracted,
  onRemoveFile
}: OnboardingVisualIdentityLogoSectionProps) => {
  const [showAdjustMessage, setShowAdjustMessage] = useState(true);
  const canDeleteIndividual = extractedFromGuidelines && extractionVerified === false && showAdjustMessage;

  // Reset showAdjustMessage when extractionVerified changes to false
  React.useEffect(() => {
    if (extractionVerified === false) {
      setShowAdjustMessage(true);
    }
  }, [extractionVerified]);

  return (
    <Card className="p-6 bg-gray-800 border-gray-700">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center">
          <Image className="h-5 w-5 mr-2 text-blue-400" />
          <h3 className="text-lg font-semibold text-white">Logo Files</h3>
        </div>
        {extractedFromGuidelines && (
          <Badge variant="secondary" className="bg-green-600 text-white">
            Auto-extracted
          </Badge>
        )}
      </div>

      {extractedFromGuidelines && (
        <OnboardingVisualIdentityLogoVerificationMessage
          extractionVerified={extractionVerified}
          onVerifyExtraction={onVerifyExtraction}
          onClearExtracted={onClearExtracted}
          showAdjustMessage={showAdjustMessage}
          onDismissAdjustMessage={() => setShowAdjustMessage(false)}
          logoFiles={logoFiles}
        />
      )}

      <OnboardingVisualIdentityLogoStatusMessage
        extractedFromGuidelines={extractedFromGuidelines}
      />
      
      {extractedFromGuidelines && logoFiles.length > 0 && (
        <OnboardingVisualIdentityLogoGrid
          logoFiles={logoFiles}
          extractedFromGuidelines={extractedFromGuidelines}
          canDeleteIndividual={canDeleteIndividual}
          onRemoveFile={onRemoveFile}
        />
      )}

      <OnboardingVisualIdentityLogoUploadArea
        extractedFromGuidelines={extractedFromGuidelines}
        onFileUpload={onFileUpload}
      />

      {!extractedFromGuidelines && logoFiles.length > 0 && (
        <OnboardingVisualIdentityLogoGrid
          logoFiles={logoFiles}
          extractedFromGuidelines={extractedFromGuidelines}
          canDeleteIndividual={false}
          onRemoveFile={onRemoveFile}
        />
      )}
    </Card>
  );
};
