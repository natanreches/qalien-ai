
import React from 'react';
import { Eye, Check, X, AlertTriangle } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface OnboardingVisualIdentityAccessibilitySectionProps {
  accessibilityRequirements: boolean;
  onAccessibilityChange: (checked: boolean) => void;
  extractedFromGuidelines?: boolean;
  onVerifyExtraction?: (isCorrect: boolean) => void;
  extractionVerified?: boolean;
}

export const OnboardingVisualIdentityAccessibilitySection = ({
  accessibilityRequirements,
  onAccessibilityChange,
  extractedFromGuidelines = false,
  onVerifyExtraction,
  extractionVerified
}: OnboardingVisualIdentityAccessibilitySectionProps) => {
  return (
    <Card className="p-6 bg-gray-800 border-gray-700">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center">
          <Eye className="h-5 w-5 mr-2 text-blue-400" />
          <h3 className="text-lg font-semibold text-white">Accessibility Requirements</h3>
        </div>
        <div className="flex items-center space-x-2">
          {extractedFromGuidelines && (
            <Badge variant="secondary" className="bg-green-600 text-white">
              Auto-extracted
            </Badge>
          )}
          <Switch
            checked={accessibilityRequirements}
            onCheckedChange={onAccessibilityChange}
          />
        </div>
      </div>
      
      {extractedFromGuidelines && extractionVerified === undefined && (
        <div className="mb-4 p-3 bg-blue-900/20 border border-blue-600/30 rounded-lg">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <AlertTriangle className="h-4 w-4 text-blue-400" />
              <span className="text-blue-400 text-sm font-medium">Is this accessibility setting correct?</span>
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
      )}
      
      {extractionVerified === true && (
        <div className="mb-4 p-2 bg-green-900/20 border border-green-600/30 rounded-lg">
          <div className="flex items-center space-x-2">
            <Check className="h-4 w-4 text-green-500" />
            <span className="text-green-400 text-sm">Extraction verified as correct</span>
          </div>
        </div>
      )}
      
      {extractionVerified === false && (
        <div className="mb-4 p-2 bg-red-900/20 border border-red-600/30 rounded-lg">
          <div className="flex items-center space-x-2">
            <X className="h-4 w-4 text-red-500" />
            <span className="text-red-400 text-sm">Please adjust the setting above to match your requirements</span>
          </div>
        </div>
      )}
      
      <p className="text-gray-400 text-sm">
        Confirm accessibility standards: min font sizes, contrast ratios, alt-text policies
      </p>
    </Card>
  );
};
