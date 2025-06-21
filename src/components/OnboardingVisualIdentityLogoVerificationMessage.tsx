
import React, { useState } from 'react';
import { Check, X, AlertTriangle, Trash2, Edit, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ClearAllConfirmationDialog } from './ClearAllConfirmationDialog';

interface OnboardingVisualIdentityLogoVerificationMessageProps {
  extractionVerified?: boolean;
  onVerifyExtraction?: (isCorrect: boolean) => void;
  onClearExtracted?: () => void;
  showAdjustMessage: boolean;
  onDismissAdjustMessage: () => void;
  logoFiles: File[];
}

export const OnboardingVisualIdentityLogoVerificationMessage = ({
  extractionVerified,
  onVerifyExtraction,
  onClearExtracted,
  showAdjustMessage,
  onDismissAdjustMessage,
  logoFiles
}: OnboardingVisualIdentityLogoVerificationMessageProps) => {
  const [showClearConfirmation, setShowClearConfirmation] = useState(false);

  const handleDismissAdjustMessage = () => {
    onDismissAdjustMessage();
    // Reset verification status to undefined to show the feedback prompt again
    if (onVerifyExtraction) {
      onVerifyExtraction(undefined as any);
    }
  };

  const handleEdit = () => {
    if (onVerifyExtraction) {
      onVerifyExtraction(undefined as any);
    }
  };

  const handleClearAllClick = () => {
    setShowClearConfirmation(true);
  };

  const handleConfirmClear = () => {
    if (onClearExtracted) {
      onClearExtracted();
    }
  };

  const handleFinish = () => {
    if (onVerifyExtraction) {
      onVerifyExtraction(undefined as any);
    }
  };

  // Show verification prompt when extraction hasn't been verified yet
  if (extractionVerified === undefined) {
    return (
      <div className="mb-4 p-3 bg-blue-900/20 border border-blue-600/30 rounded-lg">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <AlertTriangle className="h-4 w-4 text-blue-400" />
            <span className="text-blue-400 text-sm font-medium">Are these logo files correct?</span>
          </div>
          <div className="flex space-x-2">
            <Button
              size="sm"
              variant="outline"
              onClick={() => onVerifyExtraction?.(true)}
              className="border-green-600 text-green-400 hover:bg-green-600/10"
            >
              <Check className="h-3 w-3 mr-1" />
              Yes
            </Button>
            <Button
              size="sm"
              variant="outline"
              onClick={() => onVerifyExtraction?.(false)}
              className="border-red-600 text-red-400 hover:bg-red-600/10"
            >
              <X className="h-3 w-3 mr-1" />
              No
            </Button>
          </div>
        </div>
      </div>
    );
  }

  // Show success message when extraction is verified as correct
  if (extractionVerified === true) {
    return (
      <div className="mb-4 p-3 bg-green-900/20 border border-green-600/30 rounded-lg">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Check className="h-4 w-4 text-green-500" />
            <span className="text-green-400 text-sm">Extraction verified as correct</span>
          </div>
          <Button
            size="sm"
            variant="outline"
            onClick={handleEdit}
            className="border-gray-600 text-gray-400 hover:bg-gray-600/10"
          >
            <Edit className="h-3 w-3 mr-1" />
            Edit
          </Button>
        </div>
      </div>
    );
  }

  // Show adjustment message when extraction is verified as incorrect
  if (extractionVerified === false && showAdjustMessage) {
    return (
      <>
        <div className="mb-4 p-3 bg-red-900/20 border border-red-600/30 rounded-lg">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <X className="h-4 w-4 text-red-500" />
              <span className="text-red-400 text-sm">Please adjust the logo files below. You can remove incorrect files individually or clear all.</span>
            </div>
            <div className="flex space-x-2">
              <Button
                size="sm"
                variant="outline"
                onClick={handleClearAllClick}
                className="border-red-600 text-red-400 hover:bg-red-600/10"
              >
                <Trash2 className="h-3 w-3 mr-1" />
                Clear All
              </Button>
              <Button
                size="sm"
                variant="outline"
                onClick={handleDismissAdjustMessage}
                className="border-gray-600 text-gray-400 hover:bg-gray-600/10"
              >
                <X className="h-3 w-3" />
              </Button>
            </div>
          </div>
        </div>

        <ClearAllConfirmationDialog
          open={showClearConfirmation}
          onOpenChange={setShowClearConfirmation}
          onConfirm={handleConfirmClear}
          title="Clear All Logo Files"
          description="Are you sure you want to clear all logo files? This action cannot be undone."
        />
      </>
    );
  }

  // Show finish button when user has dismissed the adjust message but still has files
  if (extractionVerified === false && !showAdjustMessage && logoFiles.length > 0) {
    return (
      <div className="mb-4 p-3 bg-blue-900/20 border border-blue-600/30 rounded-lg">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <CheckCircle className="h-4 w-4 text-blue-400" />
            <span className="text-blue-400 text-sm">Ready to confirm your logo files?</span>
          </div>
          <Button
            size="sm"
            variant="outline"
            onClick={handleFinish}
            className="border-blue-600 text-blue-400 hover:bg-blue-600/10"
          >
            <CheckCircle className="h-3 w-3 mr-1" />
            Finish
          </Button>
        </div>
      </div>
    );
  }

  return null;
};
