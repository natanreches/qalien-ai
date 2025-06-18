
import React from 'react';
import { Eye } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';

interface AccessibilityRequirements {
  contrast: boolean;
  fontSizes: boolean;
  altText: boolean;
}

interface OnboardingVisualIdentityAccessibilitySectionProps {
  accessibilityRequirements: AccessibilityRequirements;
  onAccessibilityChange: (requirements: AccessibilityRequirements) => void;
  extractedFromGuidelines?: boolean;
}

export const OnboardingVisualIdentityAccessibilitySection = ({
  accessibilityRequirements,
  onAccessibilityChange,
  extractedFromGuidelines = false
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
      
      <div className="space-y-6">
        <div className="space-y-3">
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
          {accessibilityRequirements.contrast && (
            <div className="ml-6">
              <Input
                placeholder="e.g., Minimum 4.5:1 ratio for normal text, 3:1 for large text"
                className="bg-gray-700 border-gray-600 text-white placeholder-gray-400"
              />
            </div>
          )}
        </div>
        
        <div className="space-y-3">
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
          {accessibilityRequirements.fontSizes && (
            <div className="ml-6">
              <Input
                placeholder="e.g., Minimum 16px for body text, 14px for supporting text"
                className="bg-gray-700 border-gray-600 text-white placeholder-gray-400"
              />
            </div>
          )}
        </div>
        
        <div className="space-y-3">
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
          {accessibilityRequirements.altText && (
            <div className="ml-6">
              <Input
                placeholder="e.g., All images must include descriptive alt text, decorative images use empty alt"
                className="bg-gray-700 border-gray-600 text-white placeholder-gray-400"
              />
            </div>
          )}
        </div>
      </div>
      
      <p className="text-gray-400 text-sm mt-4">
        Toggle checkboxes to enable accessibility requirements and provide specific details
      </p>
    </Card>
  );
};
