import React from 'react';
import { OnboardingWelcome } from './OnboardingWelcome';
import { OnboardingCompanyInfo } from './OnboardingCompanyInfo';
import { OnboardingGuidelinesUpload } from './OnboardingGuidelinesUpload';
import { OnboardingBrandConfirmation } from './OnboardingBrandConfirmation';
import { OnboardingInviteCollaborators } from './OnboardingInviteCollaborators';

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
  brandVoice: string;
  brandTone: string;
  coreMessaging: string;
  brandVocabulary: string;
  brandStyle: string;
  brandPronunciation: string;
}

interface CompanyInfo {
  company: string;
  brand: string;
  jobTitle: string;
}

interface Collaborator {
  id: string;
  email: string;
  role: string;
}

interface OnboardingStepsProps {
  currentStep: number;
  companyInfo: CompanyInfo;
  guidelines: BrandGuideline[];
  brandElements: BrandElements;
  collaborators: Collaborator[];
  onCompanyInfoUpdated: (info: CompanyInfo) => void;
  onGuidelinesUploaded: (guidelines: BrandGuideline[]) => void;
  onBrandElementsConfirmed: (elements: BrandElements) => void;
  onCollaboratorsUpdated: (collaborators: Collaborator[]) => void;
}

export const OnboardingSteps = ({
  currentStep,
  companyInfo,
  guidelines,
  brandElements,
  collaborators,
  onCompanyInfoUpdated,
  onGuidelinesUploaded,
  onBrandElementsConfirmed,
  onCollaboratorsUpdated
}: OnboardingStepsProps) => {
  switch (currentStep) {
    case 1:
      return <OnboardingWelcome />;
    case 2:
      return (
        <OnboardingCompanyInfo
          companyInfo={companyInfo}
          onCompanyInfoUpdated={onCompanyInfoUpdated}
        />
      );
    case 3:
      return (
        <OnboardingGuidelinesUpload
          guidelines={guidelines}
          onGuidelinesUploaded={onGuidelinesUploaded}
        />
      );
    case 4:
      return (
        <OnboardingBrandConfirmation
          guidelines={guidelines}
          brandElements={brandElements}
          onBrandElementsConfirmed={onBrandElementsConfirmed}
        />
      );
    case 5:
      return (
        <OnboardingInviteCollaborators
          collaborators={collaborators}
          onCollaboratorsUpdated={onCollaboratorsUpdated}
        />
      );
    default:
      return <OnboardingWelcome />;
  }
};
