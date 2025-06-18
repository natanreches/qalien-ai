
import React from 'react';
import { Header } from '@/components/Header';
import { OnboardingProgress } from '@/components/OnboardingProgress';
import { OnboardingNavigation } from '@/components/OnboardingNavigation';

interface OnboardingContainerProps {
  currentStep: number;
  totalSteps: number;
  stepTitle: string;
  canProceed: boolean;
  onSkip: () => void;
  onBack: () => void;
  onNext: () => void;
  onComplete: () => void;
  children: React.ReactNode;
}

export const OnboardingContainer = ({
  currentStep,
  totalSteps,
  stepTitle,
  canProceed,
  onSkip,
  onBack,
  onNext,
  onComplete,
  children
}: OnboardingContainerProps) => {
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <Header />
      
      <main className="container mx-auto px-6 py-8">
        <div className="max-w-4xl mx-auto">
          <OnboardingProgress
            currentStep={currentStep}
            totalSteps={totalSteps}
            stepTitle={stepTitle}
            onSkip={onSkip}
          />

          <div className="bg-gray-800 rounded-xl border border-gray-700 p-8 min-h-[500px]">
            {children}
          </div>

          <OnboardingNavigation
            currentStep={currentStep}
            totalSteps={totalSteps}
            canProceed={canProceed}
            onBack={onBack}
            onNext={onNext}
            onComplete={onComplete}
          />
        </div>
      </main>
    </div>
  );
};
