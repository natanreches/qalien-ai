
import React from 'react';
import { Type, Plus, X } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface OnboardingVisualIdentityTypographySectionProps {
  typography: string[];
  extractedFromGuidelines: boolean;
  onAddTypography: () => void;
  onUpdateTypography: (index: number, font: string) => void;
  onRemoveTypography: (index: number) => void;
}

export const OnboardingVisualIdentityTypographySection = ({
  typography,
  extractedFromGuidelines,
  onAddTypography,
  onUpdateTypography,
  onRemoveTypography
}: OnboardingVisualIdentityTypographySectionProps) => {
  return (
    <Card className="p-6 bg-gray-800 border-gray-700">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center">
          <Type className="h-5 w-5 mr-2 text-blue-400" />
          <h3 className="text-lg font-semibold text-white">Typography</h3>
        </div>
        {extractedFromGuidelines && (
          <Badge variant="secondary" className="bg-green-600 text-white">
            Auto-extracted
          </Badge>
        )}
      </div>
      <p className="text-gray-400 text-sm mb-4">
        Extracted font families and usage hierarchy (H1, body, CTA); allow edit
      </p>
      <div className="space-y-4">
        {typography.map((font, index) => (
          <div key={index} className="flex items-center space-x-2">
            <Input
              value={font}
              onChange={(e) => onUpdateTypography(index, e.target.value)}
              className="flex-1 bg-gray-700 border-gray-600 text-white"
              placeholder="Font name"
            />
            <Button
              variant="outline"
              size="sm"
              onClick={() => onRemoveTypography(index)}
              className="text-red-400 border-gray-600"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        ))}
        <Button variant="outline" onClick={onAddTypography} className="border-gray-600 text-gray-300">
          <Plus className="h-4 w-4 mr-2" />
          Add Font
        </Button>
      </div>
    </Card>
  );
};
