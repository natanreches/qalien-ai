
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import type { OnboardingData, CompanyInfo, BrandGuideline, VisualIdentity, VerbalIdentity, AdCreative, LegalRegulatory, Collaborator } from '@/types/onboarding';

export const useOnboardingLogic = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [companyInfo, setCompanyInfo] = useState<CompanyInfo>({
    company: '',
    brands: [''],
    jobTitle: ''
  });
  const [guidelines, setGuidelines] = useState<BrandGuideline[]>([]);
  const [visualIdentity, setVisualIdentity] = useState<VisualIdentity>({
    logoFiles: [],
    colorPalette: [],
    typography: [],
    photographyStyle: '',
    photographyFiles: [],
    iconography: [],
    layoutRules: '',
    layoutFiles: [],
    accessibilityRequirements: {
      contrast: false,
      fontSizes: false,
      altText: false
    }
  });
  const [verbalIdentity, setVerbalIdentity] = useState<VerbalIdentity>({
    toneOfVoice: [],
    brandVocabulary: '',
    prohibitedWords: '',
    claimsDisclosures: '',
    localizationRules: '',
    grammarPreferences: ''
  });
  const [adCreatives, setAdCreatives] = useState<AdCreative[]>([]);
  const [legalRegulatory, setLegalRegulatory] = useState<LegalRegulatory>({
    industryRules: '',
    regulatoryRequirements: [],
    disclosures: '',
    ipRightsManagement: [],
    jurisdictionNotes: []
  });
  const [collaborators, setCollaborators] = useState<Collaborator[]>([]);

  const totalSteps = 9;

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleNavigateToGuidelines = () => {
    setCurrentStep(3);
  };

  const handleNavigateToStep = (step: number) => {
    if (step >= 1 && step <= totalSteps) {
      setCurrentStep(step);
    }
  };

  const handleComplete = () => {
    localStorage.setItem('onboarding_completed', 'true');
    localStorage.setItem('onboarding_data', JSON.stringify({
      companyInfo,
      guidelines: guidelines.length,
      visualIdentity,
      verbalIdentity,
      adCreatives: adCreatives.length,
      legalRegulatory,
      collaborators: collaborators.length
    }));
    navigate('/business-center');
  };

  const handleSkipOnboarding = () => {
    localStorage.setItem('onboarding_completed', 'true');
    localStorage.setItem('onboarding_skipped', 'true');
    navigate('/business-center');
  };

  const canProceed = () => {
    switch (currentStep) {
      case 1:
        return true;
      case 2:
        return companyInfo.company.length > 0 && companyInfo.brands.some(brand => brand.length > 0) && companyInfo.jobTitle.length > 0;
      case 3: {
        // For guidelines step, check if we have guidelines for each valid brand
        const validBrands = companyInfo.brands.filter(brand => brand.trim().length > 0);
        const requiredGuidelines = validBrands.length;
        return guidelines.length >= requiredGuidelines;
      }
      case 4:
        return visualIdentity.colorPalette.length > 0 || visualIdentity.logoFiles.length > 0;
      case 5:
        return verbalIdentity.toneOfVoice.length > 0;
      case 6:
        return adCreatives.length >= 10;
      case 7:
        return legalRegulatory.industryRules.length > 0;
      case 8:
        return true; // Collaborators step is optional
      case 9:
        return true; // Review step - always allow completion
      default:
        return false;
    }
  };

  const getStepTitle = () => {
    switch (currentStep) {
      case 1: return 'Welcome';
      case 2: return 'Company Information';
      case 3: return 'Brand Guidelines';
      case 4: return 'Visual Identity';
      case 5: return 'Verbal Identity';
      case 6: return 'Ad Creatives';
      case 7: return 'Legal & Regulatory';
      case 8: return 'Invite Collaborators';
      case 9: return 'Review & Confirm';
      default: return '';
    }
  };

  return {
    currentStep,
    totalSteps,
    companyInfo,
    guidelines,
    visualIdentity,
    verbalIdentity,
    adCreatives,
    legalRegulatory,
    collaborators,
    setCompanyInfo,
    setGuidelines,
    setVisualIdentity,
    setVerbalIdentity,
    setAdCreatives,
    setLegalRegulatory,
    setCollaborators,
    handleNext,
    handleBack,
    handleNavigateToGuidelines,
    handleNavigateToStep,
    handleComplete,
    handleSkipOnboarding,
    canProceed: canProceed(),
    stepTitle: getStepTitle()
  };
};
