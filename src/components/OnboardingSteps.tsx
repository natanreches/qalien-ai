
import React from 'react';
import { OnboardingWelcome } from './OnboardingWelcome';
import { OnboardingCompanyInfo } from './OnboardingCompanyInfo';
import { OnboardingGuidelinesUpload } from './OnboardingGuidelinesUpload';
import { OnboardingLegalGuidelines } from './OnboardingLegalGuidelines';
import { OnboardingBrandConfirmation } from './OnboardingBrandConfirmation';
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

interface LegalCompliance {
  requiresDisclosures: boolean;
  hasHealthClaims: boolean;
  hasFinancialClaims: boolean;
  targetMinors: boolean;
  operatesGlobally: boolean;
  requiresAccessibility: boolean;
  hasDataCollection: boolean;
  additionalNotes: string;
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
  legalGuidelines: LegalGuideline[];
  legalCompliance: LegalCompliance;
  brandElements: BrandElements;
  collaborators: Collaborator[];
  onCompanyInfoUpdated: (info: CompanyInfo) => void;
  onGuidelinesUploaded: (guidelines: BrandGuideline[]) => void;
  onLegalGuidelinesUpdated: (guidelines: LegalGuideline[]) => void;
  onLegalComplianceUpdated: (compliance: LegalCompliance) => void;
  onBrandElementsConfirmed: (elements: BrandElements) => void;
  onCollaboratorsUpdated: (collaborators: Collaborator[]) => void;
}

export const OnboardingSteps = ({
  currentStep,
  companyInfo,
  guidelines,
  legalGuidelines,
  legalCompliance,
  brandElements,
  collaborators,
  onCompanyInfoUpdated,
  onGuidelinesUploaded,
  onLegalGuidelinesUpdated,
  onLegalComplianceUpdated,
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
        <OnboardingLegalGuidelines
          legalGuidelines={legalGuidelines}
          legalCompliance={legalCompliance}
          onLegalGuidelinesUpdated={onLegalGuidelinesUpdated}
          onLegalComplianceUpdated={onLegalComplianceUpdated}
        />
      );
    case 5:
      return (
        <OnboardingBrandConfirmation
          guidelines={guidelines}
          brandElements={brandElements}
          onBrandElementsConfirmed={onBrandElementsConfirmed}
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
