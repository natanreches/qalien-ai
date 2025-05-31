
import React from 'react';
import { OnboardingWelcome } from './OnboardingWelcome';
import { OnboardingGuidelinesUpload } from './OnboardingGuidelinesUpload';
import { OnboardingBrandConfirmation } from './OnboardingBrandConfirmation';

interface BrandGuideline {
  id: string;
  name: string;
  description: string;
  file: File | null;
  uploadDate: string;
}

interface BrandElements {
  brandName: string;
  primaryColors: string[];
  fonts: string[];
  logoStyle: string;
  tone: string;
  targetAudience: string;
}

interface OnboardingStepsProps {
  currentStep: number;
  guidelines: BrandGuideline[];
  brandElements: BrandElements;
  onGuidelinesUploaded: (guidelines: BrandGuideline[]) => void;
  onBrandElementsConfirmed: (elements: BrandElements) => void;
}

export const OnboardingSteps = ({
  currentStep,
  guidelines,
  brandElements,
  onGuidelinesUploaded,
  onBrandElementsConfirmed
}: OnboardingStepsProps) => {
  switch (currentStep) {
    case 1:
      return <OnboardingWelcome />;
    case 2:
      return (
        <OnboardingGuidelinesUpload
          guidelines={guidelines}
          onGuidelinesUploaded={onGuidelinesUploaded}
        />
      );
    case 3:
      return (
        <OnboardingBrandConfirmation
          guidelines={guidelines}
          brandElements={brandElements}
          onBrandElementsConfirmed={onBrandElementsConfirmed}
        />
      );
    default:
      return <OnboardingWelcome />;
  }
};
