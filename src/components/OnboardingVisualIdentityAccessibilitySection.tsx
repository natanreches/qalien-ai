
import React from 'react';
import { Eye } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';

interface OnboardingVisualIdentityAccessibilitySectionProps {
  accessibilityRequirements: boolean;
  onAccessibilityChange: (checked: boolean) => void;
}

export const OnboardingVisualIdentityAccessibilitySection = ({
  accessibilityRequirements,
  onAccessibilityChange
}: OnboardingVisualIdentityAccessibilitySectionProps) => {
  return (
    <Card className="p-6 bg-gray-800 border-gray-700">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center">
          <Eye className="h-5 w-5 mr-2 text-blue-400" />
          <h3 className="text-lg font-semibold text-white">Accessibility Requirements</h3>
        </div>
        <Switch
          checked={accessibilityRequirements}
          onCheckedChange={onAccessibilityChange}
        />
      </div>
      <p className="text-gray-400 text-sm">
        Confirm accessibility standards: min font sizes, contrast ratios, alt-text policies
      </p>
    </Card>
  );
};
