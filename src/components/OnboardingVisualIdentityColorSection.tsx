
import React from 'react';
import { Palette, Plus, X } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface OnboardingVisualIdentityColorSectionProps {
  colorPalette: string[];
  extractedFromGuidelines: boolean;
  onAddColor: () => void;
  onUpdateColor: (index: number, color: string) => void;
  onRemoveColor: (index: number) => void;
}

export const OnboardingVisualIdentityColorSection = ({
  colorPalette,
  extractedFromGuidelines,
  onAddColor,
  onUpdateColor,
  onRemoveColor
}: OnboardingVisualIdentityColorSectionProps) => {
  return (
    <Card className="p-6 bg-gray-800 border-gray-700">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center">
          <Palette className="h-5 w-5 mr-2 text-blue-400" />
          <h3 className="text-lg font-semibold text-white">Color Palette</h3>
        </div>
        {extractedFromGuidelines && (
          <Badge variant="secondary" className="bg-green-600 text-white">
            Auto-extracted
          </Badge>
        )}
      </div>
      <p className="text-gray-400 text-sm mb-4">
        Extracted colors (HEX/RGB); allow user to edit/approve
      </p>
      <div className="space-y-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {colorPalette.map((color, index) => (
            <div key={index} className="space-y-2">
              <div
                className="w-full h-16 rounded border border-gray-600"
                style={{ backgroundColor: color }}
              />
              <div className="flex items-center space-x-2">
                <Input
                  value={color}
                  onChange={(e) => onUpdateColor(index, e.target.value)}
                  className="bg-gray-700 border-gray-600 text-white text-xs"
                />
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onRemoveColor(index)}
                  className="text-red-400 border-gray-600 p-1"
                >
                  <X className="h-3 w-3" />
                </Button>
              </div>
            </div>
          ))}
        </div>
        <Button variant="outline" onClick={onAddColor} className="border-gray-600 text-gray-300">
          <Plus className="h-4 w-4 mr-2" />
          Add Color
        </Button>
      </div>
    </Card>
  );
};
