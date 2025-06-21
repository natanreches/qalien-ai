
import React from 'react';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Palette } from 'lucide-react';

interface ComplianceWeights {
  logoUsage: number;
  colorPalette: number;
  typography: number;
}

interface VisualBrandElementsSectionProps {
  weights: Pick<ComplianceWeights, 'logoUsage' | 'colorPalette' | 'typography'>;
  onWeightChange: (category: keyof ComplianceWeights, value: number[]) => void;
  getWeightDescription: (weight: number) => string;
  getWeightColor: (weight: number) => string;
}

export const VisualBrandElementsSection = ({
  weights,
  onWeightChange,
  getWeightDescription,
  getWeightColor
}: VisualBrandElementsSectionProps) => {
  return (
    <div>
      <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
        <Palette className="h-5 w-5 mr-2" />
        Visual Brand Elements
      </h3>
      <div className="space-y-6">
        {/* Logo Usage */}
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <Label htmlFor="logo-weight" className="text-sm font-medium text-gray-200">
              Logo Usage
            </Label>
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-400">{weights.logoUsage}%</span>
              <span className={`text-xs font-medium ${getWeightColor(weights.logoUsage)}`}>
                {getWeightDescription(weights.logoUsage)}
              </span>
            </div>
          </div>
          <Slider
            id="logo-weight"
            min={0}
            max={100}
            step={5}
            value={[weights.logoUsage]}
            onValueChange={(value) => onWeightChange('logoUsage', value)}
            className="w-full"
          />
          <p className="text-xs text-gray-500">
            Controls how strictly logo placement, sizing, and clear space requirements are evaluated.
          </p>
        </div>

        {/* Color Palette */}
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <Label htmlFor="color-weight" className="text-sm font-medium text-gray-200">
              Primary Colors & Palette
            </Label>
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-400">{weights.colorPalette}%</span>
              <span className={`text-xs font-medium ${getWeightColor(weights.colorPalette)}`}>
                {getWeightDescription(weights.colorPalette)}
              </span>
            </div>
          </div>
          <Slider
            id="color-weight"
            min={0}
            max={100}
            step={5}
            value={[weights.colorPalette]}
            onValueChange={(value) => onWeightChange('colorPalette', value)}
            className="w-full"
          />
          <p className="text-xs text-gray-500">
            Evaluates adherence to your brand's primary color palette and color consistency.
          </p>
        </div>

        {/* Typography */}
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <Label htmlFor="typography-weight" className="text-sm font-medium text-gray-200">
              Typography & Brand Fonts
            </Label>
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-400">{weights.typography}%</span>
              <span className={`text-xs font-medium ${getWeightColor(weights.typography)}`}>
                {getWeightDescription(weights.typography)}
              </span>
            </div>
          </div>
          <Slider
            id="typography-weight"
            min={0}
            max={100}
            step={5}
            value={[weights.typography]}
            onValueChange={(value) => onWeightChange('typography', value)}
            className="w-full"
          />
          <p className="text-xs text-gray-500">
            Controls strictness of brand font usage, hierarchy, and typographic guidelines.
          </p>
        </div>
      </div>
    </div>
  );
};
