
import React from 'react';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Users } from 'lucide-react';

interface ComplianceWeights {
  targetAudience: number;
}

interface TargetAudienceSectionProps {
  weights: Pick<ComplianceWeights, 'targetAudience'>;
  onWeightChange: (category: keyof ComplianceWeights, value: number[]) => void;
  getWeightDescription: (weight: number) => string;
  getWeightColor: (weight: number) => string;
}

export const TargetAudienceSection = ({
  weights,
  onWeightChange,
  getWeightDescription,
  getWeightColor
}: TargetAudienceSectionProps) => {
  return (
    <div>
      <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
        <Users className="h-5 w-5 mr-2" />
        Target Audience & Context
      </h3>
      <div className="space-y-6">
        {/* Target Audience Alignment */}
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <Label htmlFor="audience-weight" className="text-sm font-medium text-gray-200">
              Target Audience Alignment
            </Label>
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-400">{weights.targetAudience}%</span>
              <span className={`text-xs font-medium ${getWeightColor(weights.targetAudience)}`}>
                {getWeightDescription(weights.targetAudience)}
              </span>
            </div>
          </div>
          <Slider
            id="audience-weight"
            min={0}
            max={100}
            step={5}
            value={[weights.targetAudience]}
            onValueChange={(value) => onWeightChange('targetAudience', value)}
            className="w-full"
          />
          <p className="text-xs text-gray-500">
            Evaluates how well content resonates with your defined target audience.
          </p>
        </div>
      </div>
    </div>
  );
};
