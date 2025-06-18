
export interface BrandGuideline {
  id: string;
  name: string;
  description: string;
  file: File | null;
  uploadDate: string;
}

export interface VisualIdentity {
  logoFiles: File[];
  colorPalette: string[];
  typography: string[];
  photographyStyle: string;
  photographyFiles: File[];
  iconography: File[];
  layoutRules: string;
  layoutFiles: File[];
  accessibilityRequirements: {
    contrast: boolean;
    fontSizes: boolean;
    altText: boolean;
  };
}

export interface VerbalIdentity {
  toneOfVoice: string[];
  brandVocabulary: string;
  prohibitedWords: string;
  claimsDisclosures: string;
  localizationRules: string;
  grammarPreferences: string;
}

export interface LegalRegulatory {
  industryRules: string;
  regulatoryRequirements: string[];
  disclosures: string;
  ipRightsManagement: File[];
  jurisdictionNotes: string[];
}

export interface CompanyInfo {
  company: string;
  brands: string[];
  jobTitle: string;
}

export interface Collaborator {
  id: string;
  email: string;
  role: string;
}

export interface OnboardingData {
  companyInfo: CompanyInfo;
  guidelines: BrandGuideline[];
  visualIdentity: VisualIdentity;
  verbalIdentity: VerbalIdentity;
  legalRegulatory: LegalRegulatory;
  collaborators: Collaborator[];
}
