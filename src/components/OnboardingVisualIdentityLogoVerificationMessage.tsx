
import React from 'react';
import { Check, X, AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface OnboardingVisualIdentityLogoVerificationMessageProps {
  extractionVerified?: boolean;
  onVerifyExtraction?: (isCorrect: boolean) => void;
  onClearExtracted?: () => void;
  showAdjustMessage: boolean;
  onDismissAdjustMessage: () => void;
}

export const OnboardingVisualIdentityLogoVerificationMessage = ({
  extractionVerified,
  onVerifyExtraction,
  onClearExtracted,
  showAdjustMessage,
  onDismissAdjustMessage
}: OnboardingVisualIdentityLogoVerificationMessageProps) => {
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

  if (extractionVerified === true) {
    return (
      <div className="mb-4 p-2 bg-green-900/20 border border-green-600/30 rounded-lg">
        <div className="flex items-center space-x-2">
          <Check className="h-4 w-4 text-green-500" />
          <span className="text-green-400 text-sm">Extraction verified as correct</span>
        </div>
      </div>
    );
  }

  if (extractionVerified === false) {
    return (
      <>
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

        {showAdjustMessage && (
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
                  onClick={onClearExtracted}
                  className="border-red-600 text-red-400 hover:bg-red-600/10"
                >
                  Clear All
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={onDismissAdjustMessage}
                  className="border-gray-600 text-gray-400 hover:bg-gray-600/10"
                >
                  <X className="h-3 w-3" />
                </Button>
              </div>
            </div>
          </div>
        )}
      </>
    );
  }

  return null;
};
