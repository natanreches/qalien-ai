
import React from 'react';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { SkipForward } from 'lucide-react';

interface OnboardingProgressProps {
  currentStep: number;
  totalSteps: number;
  stepTitle: string;
  onSkip: () => void;
}

export const OnboardingProgress = ({
  currentStep,
  totalSteps,
  stepTitle,
  onSkip
}: OnboardingProgressProps) => {
  const progress = (currentStep / totalSteps) * 100;

  return (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold text-white">Brand Setup - {stepTitle}</h1>
        <div className="flex items-center space-x-4">
          <Button
            variant="ghost"
            onClick={onSkip}
            className="text-gray-400 hover:text-white"
          >
            <SkipForward className="h-4 w-4 mr-2" />
            Skip for Now
          </Button>
          <span className="text-sm text-gray-400">
            Step {currentStep} of {totalSteps}
          </span>
        </div>
      </div>
      <Progress value={progress} className="h-2" />
    </div>
  );
};
