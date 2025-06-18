
import React from 'react';
import { OnboardingWelcome } from './OnboardingWelcome';
import { OnboardingCompanyInfo } from './OnboardingCompanyInfo';
import { OnboardingGuidelinesUpload } from './OnboardingGuidelinesUpload';
import { OnboardingVisualIdentity } from './OnboardingVisualIdentity';
import { OnboardingVerbalIdentity } from './OnboardingVerbalIdentity';
import { OnboardingLegalRegulatory } from './OnboardingLegalRegulatory';
import { OnboardingInviteCollaborators } from './OnboardingInviteCollaborators';
import type { 
  BrandGuideline, 
  VisualIdentity, 
  VerbalIdentity, 
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
  legalRegulatory: LegalRegulatory;
  collaborators: Collaborator[];
  onCompanyInfoUpdated: (info: CompanyInfo) => void;
  onGuidelinesUploaded: (guidelines: BrandGuideline[]) => void;
  onVisualIdentityUpdated: (identity: VisualIdentity) => void;
  onVerbalIdentityUpdated: (identity: VerbalIdentity) => void;
  onLegalRegulatoryUpdated: (legal: LegalRegulatory) => void;
  onCollaboratorsUpdated: (collaborators: Collaborator[]) => void;
  onNavigateToGuidelines: () => void;
}

export const OnboardingSteps = ({
  currentStep,
  companyInfo,
  guidelines,
  visualIdentity,
  verbalIdentity,
  legalRegulatory,
  collaborators,
  onCompanyInfoUpdated,
  onGuidelinesUploaded,
  onVisualIdentityUpdated,
  onVerbalIdentityUpdated,
  onLegalRegulatoryUpdated,
  onCollaboratorsUpdated,
  onNavigateToGuidelines
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
        <OnboardingLegalRegulatory
          legalRegulatory={legalRegulatory}
          onLegalRegulatoryUpdated={onLegalRegulatoryUpdated}
        />
      );
    case 7:
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
