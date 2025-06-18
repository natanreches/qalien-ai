
import React from 'react';
import { OnboardingWelcome } from './OnboardingWelcome';
import { OnboardingCompanyInfo } from './OnboardingCompanyInfo';
import { OnboardingGuidelinesUpload } from './OnboardingGuidelinesUpload';
import { OnboardingVisualIdentity } from './OnboardingVisualIdentity';
import { OnboardingVerbalIdentity } from './OnboardingVerbalIdentity';
import { OnboardingAdCreatives } from './OnboardingAdCreatives';
import { OnboardingLegalRegulatory } from './OnboardingLegalRegulatory';
import { OnboardingReviewConfirm } from './OnboardingReviewConfirm';
import type { 
  BrandGuideline, 
  VisualIdentity, 
  VerbalIdentity, 
  AdCreative,
  LegalRegulatory, 
  CompanyInfo, 
  Collaborator 
} from '@/types/onboarding';

interface OnboardingStepsProps {
  currentStep: number;
  companyInfo: CompanyInfo;
  guidelines: BrandGuideline[];
  visualIdentity: VisualIdentity;
  verbalIdentity: VerbalIdentity;
  adCreatives: AdCreative[];
  legalRegulatory: LegalRegulatory;
  collaborators: Collaborator[];
  onCompanyInfoUpdated: (info: CompanyInfo) => void;
  onGuidelinesUploaded: (guidelines: BrandGuideline[]) => void;
  onVisualIdentityUpdated: (identity: VisualIdentity) => void;
  onVerbalIdentityUpdated: (identity: VerbalIdentity) => void;
  onAdCreativesUpdated: (creatives: AdCreative[]) => void;
  onLegalRegulatoryUpdated: (legal: LegalRegulatory) => void;
  onCollaboratorsUpdated: (collaborators: Collaborator[]) => void;
  onNavigateToGuidelines: () => void;
  onNavigateToStep?: (step: number) => void;
}

export const OnboardingSteps = ({
  currentStep,
  companyInfo,
  guidelines,
  visualIdentity,
  verbalIdentity,
  adCreatives,
  legalRegulatory,
  collaborators,
  onCompanyInfoUpdated,
  onGuidelinesUploaded,
  onVisualIdentityUpdated,
  onVerbalIdentityUpdated,
  onAdCreativesUpdated,
  onLegalRegulatoryUpdated,
  onCollaboratorsUpdated,
  onNavigateToGuidelines,
  onNavigateToStep
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
          brands={companyInfo.brands}
        />
      );
    case 4:
      return (
        <OnboardingVisualIdentity
          guidelines={guidelines}
          visualIdentity={visualIdentity}
          onGuidelinesUploaded={onGuidelinesUploaded}
          onVisualIdentityUpdated={onVisualIdentityUpdated}
          onNavigateToGuidelines={onNavigateToGuidelines}
        />
      );
    case 5:
      return (
        <OnboardingVerbalIdentity
          verbalIdentity={verbalIdentity}
          onVerbalIdentityUpdated={onVerbalIdentityUpdated}
        />
      );
    case 6:
      return (
        <OnboardingAdCreatives
          adCreatives={adCreatives}
          onAdCreativesUpdated={onAdCreativesUpdated}
        />
      );
    case 7:
      return (
        <OnboardingLegalRegulatory
          legalRegulatory={legalRegulatory}
          onLegalRegulatoryUpdated={onLegalRegulatoryUpdated}
        />
      );
    case 8:
      return (
        <OnboardingReviewConfirm
          companyInfo={companyInfo}
          guidelines={guidelines}
          visualIdentity={visualIdentity}
          verbalIdentity={verbalIdentity}
          adCreatives={adCreatives}
          legalRegulatory={legalRegulatory}
          collaborators={collaborators}
          onEditStep={onNavigateToStep || (() => {})}
        />
      );
    default:
      return <OnboardingWelcome />;
  }
};
