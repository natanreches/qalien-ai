
import React from 'react';
import { Button } from '@/components/ui/button';
import { CheckCircle, ArrowRight, ArrowLeft } from 'lucide-react';

interface OnboardingNavigationProps {
  currentStep: number;
  totalSteps: number;
  canProceed: boolean;
  onBack: () => void;
  onNext: () => void;
  onComplete: () => void;
}

export const OnboardingNavigation = ({
  currentStep,
  totalSteps,
  canProceed,
  onBack,
  onNext,
  onComplete
}: OnboardingNavigationProps) => {
  return (
    <div className="flex justify-between mt-8">
      <Button
        variant="outline"
        onClick={onBack}
        disabled={currentStep === 1}
        className="border-gray-600 text-gray-300"
      >
        <ArrowLeft className="h-4 w-4 mr-2" />
        Back
      </Button>

      {currentStep === totalSteps ? (
        <Button
          onClick={onComplete}
          disabled={!canProceed}
          className="bg-green-600 hover:bg-green-700"
        >
          <CheckCircle className="h-4 w-4 mr-2" />
          Complete Setup
        </Button>
      ) : (
        <Button
          onClick={onNext}
          disabled={!canProceed}
        >
          Next Step
          <ArrowRight className="h-4 w-4 ml-2" />
        </Button>
      )}
    </div>
  );
};
