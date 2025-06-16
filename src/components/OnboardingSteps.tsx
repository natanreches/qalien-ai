
import React from 'react';
import { OnboardingWelcome } from './OnboardingWelcome';
import { OnboardingCompanyInfo } from './OnboardingCompanyInfo';
import { OnboardingVisualIdentity } from './OnboardingVisualIdentity';
import { OnboardingVerbalIdentity } from './OnboardingVerbalIdentity';
import { OnboardingLegalRegulatory } from './OnboardingLegalRegulatory';
import { OnboardingInviteCollaborators } from './OnboardingInviteCollaborators';

interface BrandGuideline {
  id: string;
  name: string;
  description: string;
  file: File | null;
  uploadDate: string;
}

interface LegalGuideline {
  id: string;
  name: string;
  description: string;
  file: File | null;
  uploadDate: string;
  category: 'advertising' | 'claims' | 'disclosure' | 'privacy' | 'accessibility' | 'other';
}

interface VisualIdentity {
  logoFiles: File[];
  colorPalette: string[];
  typography: string[];
  photographyStyle: string;
  photographyFiles: File[];
  iconography: File[];
  layoutRules: string;
  layoutFiles: File[];
  accessibilityRequirements: boolean;
}

interface VerbalIdentity {
  toneOfVoice: string[];
  brandVocabulary: string;
  prohibitedWords: string;
  claimsDisclosures: string;
  localizationRules: string;
  grammarPreferences: string;
}

interface LegalRegulatory {
  industryRules: string;
  regulatoryRequirements: string[];
  disclosures: string;
  ipRightsManagement: File[];
  jurisdictionNotes: string[];
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
        <OnboardingVisualIdentity
          guidelines={guidelines}
          visualIdentity={visualIdentity}
          onGuidelinesUploaded={onGuidelinesUploaded}
          onVisualIdentityUpdated={onVisualIdentityUpdated}
        />
      );
    case 4:
      return (
        <OnboardingVerbalIdentity
          verbalIdentity={verbalIdentity}
          onVerbalIdentityUpdated={onVerbalIdentityUpdated}
        />
      );
    case 5:
      return (
        <OnboardingLegalRegulatory
          legalRegulatory={legalRegulatory}
          onLegalRegulatoryUpdated={onLegalRegulatoryUpdated}
        />
      );
    case 6:
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
