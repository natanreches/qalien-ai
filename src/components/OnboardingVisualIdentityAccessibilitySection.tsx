
import React from 'react';
import { Eye, Check, X, AlertTriangle } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Label } from '@/components/ui/label';

interface AccessibilityRequirements {
  contrast: boolean;
  fontSizes: boolean;
  altText: boolean;
}

interface OnboardingVisualIdentityAccessibilitySectionProps {
  accessibilityRequirements: AccessibilityRequirements;
  onAccessibilityChange: (requirements: AccessibilityRequirements) => void;
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
  const handleCheckboxChange = (field: keyof AccessibilityRequirements, checked: boolean) => {
    onAccessibilityChange({
      ...accessibilityRequirements,
      [field]: checked
    });
  };

  return (
    <Card className="p-6 bg-gray-800 border-gray-700">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center">
          <Eye className="h-5 w-5 mr-2 text-blue-400" />
          <h3 className="text-lg font-semibold text-white">Accessibility Standards</h3>
        </div>
        {extractedFromGuidelines && (
          <Badge variant="secondary" className="bg-green-600 text-white">
            Auto-extracted
          </Badge>
        )}
      </div>
      
      {extractedFromGuidelines && extractionVerified === undefined && (
        <div className="mb-4 p-3 bg-blue-900/20 border border-blue-600/30 rounded-lg">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <AlertTriangle className="h-4 w-4 text-blue-400" />
              <span className="text-blue-400 text-sm font-medium">Are these accessibility settings correct?</span>
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
            <span className="text-red-400 text-sm">Please adjust the settings below to match your requirements</span>
          </div>
        </div>
      )}
      
      <div className="space-y-4">
        <div className="flex items-center space-x-2">
          <Checkbox
            id="contrast"
            checked={accessibilityRequirements.contrast}
            onCheckedChange={(checked) => handleCheckboxChange('contrast', checked as boolean)}
          />
          <Label htmlFor="contrast" className="text-white">
            Contrast requirements (WCAG AA compliance)
          </Label>
        </div>
        
        <div className="flex items-center space-x-2">
          <Checkbox
            id="fontSizes"
            checked={accessibilityRequirements.fontSizes}
            onCheckedChange={(checked) => handleCheckboxChange('fontSizes', checked as boolean)}
          />
          <Label htmlFor="fontSizes" className="text-white">
            Minimum font size requirements
          </Label>
        </div>
        
        <div className="flex items-center space-x-2">
          <Checkbox
            id="altText"
            checked={accessibilityRequirements.altText}
            onCheckedChange={(checked) => handleCheckboxChange('altText', checked as boolean)}
          />
          <Label htmlFor="altText" className="text-white">
            Alt-text policies for images
          </Label>
        </div>
      </div>
      
      <p className="text-gray-400 text-sm mt-4">
        Toggle checkboxes for contrast, font sizes, and alt-text requirements
      </p>
    </Card>
  );
};
