import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Header } from '@/components/Header';
import { OnboardingSteps } from '@/components/OnboardingSteps';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { CheckCircle, ArrowRight, ArrowLeft, SkipForward } from 'lucide-react';

interface BrandGuideline {
  id: string;
  name: string;
  description: string;
  file: File | null;
  uploadDate: string;
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

const Onboarding = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [companyInfo, setCompanyInfo] = useState<CompanyInfo>({
    company: '',
    brand: '',
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
    accessibilityRequirements: false
  });
  const [verbalIdentity, setVerbalIdentity] = useState<VerbalIdentity>({
    toneOfVoice: [],
    brandVocabulary: '',
    prohibitedWords: '',
    claimsDisclosures: '',
    localizationRules: '',
    grammarPreferences: ''
  });
  const [legalRegulatory, setLegalRegulatory] = useState<LegalRegulatory>({
    industryRules: '',
    regulatoryRequirements: [],
    disclosures: '',
    ipRightsManagement: [],
    jurisdictionNotes: []
  });
  const [collaborators, setCollaborators] = useState<Collaborator[]>([]);

  const totalSteps = 6;
  const progress = (currentStep / totalSteps) * 100;

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
    // Navigate to step 2 which is the brand guidelines upload step
    setCurrentStep(2);
  };

  const handleComplete = () => {
    // Save onboarding completion and data to localStorage or API
    localStorage.setItem('onboarding_completed', 'true');
    localStorage.setItem('onboarding_data', JSON.stringify({
      companyInfo,
      guidelines: guidelines.length,
      visualIdentity,
      verbalIdentity,
      legalRegulatory,
      collaborators: collaborators.length
    }));
    navigate('/business-center');
  };

  const handleSkipOnboarding = () => {
    // Mark onboarding as completed but with minimal data
    localStorage.setItem('onboarding_completed', 'true');
    localStorage.setItem('onboarding_skipped', 'true');
    navigate('/business-center');
  };

  const handleCompanyInfoUpdated = (info: CompanyInfo) => {
    setCompanyInfo(info);
  };

  const handleGuidelinesUploaded = (uploadedGuidelines: BrandGuideline[]) => {
    setGuidelines(uploadedGuidelines);
  };

  const handleVisualIdentityUpdated = (identity: VisualIdentity) => {
    setVisualIdentity(identity);
  };

  const handleVerbalIdentityUpdated = (identity: VerbalIdentity) => {
    setVerbalIdentity(identity);
  };

  const handleLegalRegulatoryUpdated = (legal: LegalRegulatory) => {
    setLegalRegulatory(legal);
  };

  const handleCollaboratorsUpdated = (updatedCollaborators: Collaborator[]) => {
    setCollaborators(updatedCollaborators);
  };

  const canProceed = () => {
    switch (currentStep) {
      case 1:
        return true; // Welcome step
      case 2:
        return companyInfo.company.length > 0 && companyInfo.brand.length > 0 && companyInfo.jobTitle.length > 0;
      case 3:
        return visualIdentity.colorPalette.length > 0 || visualIdentity.logoFiles.length > 0; // Must have some visual elements
      case 4:
        return verbalIdentity.toneOfVoice.length > 0; // Must have selected at least one tone
      case 5:
        return legalRegulatory.industryRules.length > 0; // Must have selected industry
      case 6:
        return true; // Collaborators step is optional
      default:
        return false;
    }
  };

  const getStepTitle = () => {
    switch (currentStep) {
      case 1: return 'Welcome';
      case 2: return 'Company Information';
      case 3: return 'Visual Identity';
      case 4: return 'Verbal Identity';
      case 5: return 'Legal & Regulatory';
      case 6: return 'Invite Collaborators';
      default: return '';
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <Header />
      
      <main className="container mx-auto px-6 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Progress Header */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <h1 className="text-2xl font-bold text-white">Brand Setup - {getStepTitle()}</h1>
              <div className="flex items-center space-x-4">
                <Button
                  variant="ghost"
                  onClick={handleSkipOnboarding}
                  className="text-gray-400 hover:text-white"
                >
                  <SkipForward className="h-4 w-4 mr-2" />
                  Skip for Now
                </Button>
                <span className="text-sm text-gray-400">
                  Step {currentStep} of {totalSteps}
                </span>
              </div>
            </div>
            <Progress value={progress} className="h-2" />
          </div>

          {/* Step Content */}
          <div className="bg-gray-800 rounded-xl border border-gray-700 p-8 min-h-[500px]">
            <OnboardingSteps
              currentStep={currentStep}
              companyInfo={companyInfo}
              guidelines={guidelines}
              visualIdentity={visualIdentity}
              verbalIdentity={verbalIdentity}
              legalRegulatory={legalRegulatory}
              collaborators={collaborators}
              onCompanyInfoUpdated={handleCompanyInfoUpdated}
              onGuidelinesUploaded={handleGuidelinesUploaded}
              onVisualIdentityUpdated={handleVisualIdentityUpdated}
              onVerbalIdentityUpdated={handleVerbalIdentityUpdated}
              onLegalRegulatoryUpdated={handleLegalRegulatoryUpdated}
              onCollaboratorsUpdated={handleCollaboratorsUpdated}
              onNavigateToGuidelines={handleNavigateToGuidelines}
            />
          </div>

          {/* Navigation */}
          <div className="flex justify-between mt-8">
            <Button
              variant="outline"
              onClick={handleBack}
              disabled={currentStep === 1}
              className="border-gray-600 text-gray-300"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back
            </Button>

            {currentStep === totalSteps ? (
              <Button
                onClick={handleComplete}
                disabled={!canProceed()}
                className="bg-green-600 hover:bg-green-700"
              >
                <CheckCircle className="h-4 w-4 mr-2" />
                Complete Setup
              </Button>
            ) : (
              <Button
                onClick={handleNext}
                disabled={!canProceed()}
              >
                Next Step
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Onboarding;
