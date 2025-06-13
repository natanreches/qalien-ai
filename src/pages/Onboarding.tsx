import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Header } from '@/components/Header';
import { OnboardingSteps } from '@/components/OnboardingSteps';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { CheckCircle, ArrowRight, ArrowLeft } from 'lucide-react';

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
  const [brandElements, setBrandElements] = useState<BrandElements>({
    brandName: '',
    primaryColors: [],
    fonts: [],
    logoStyle: '',
    tone: '',
    targetAudience: '',
    brandVoice: '',
    brandTone: '',
    coreMessaging: '',
    brandVocabulary: '',
    brandStyle: ''
  });
  const [collaborators, setCollaborators] = useState<Collaborator[]>([]);

  const totalSteps = 5;
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

  const handleComplete = () => {
    // Save onboarding completion and data to localStorage or API
    localStorage.setItem('onboarding_completed', 'true');
    localStorage.setItem('onboarding_data', JSON.stringify({
      companyInfo,
      guidelines: guidelines.length,
      brandElements,
      collaborators: collaborators.length
    }));
    navigate('/business-center');
  };

  const handleCompanyInfoUpdated = (info: CompanyInfo) => {
    setCompanyInfo(info);
  };

  const handleGuidelinesUploaded = (uploadedGuidelines: BrandGuideline[]) => {
    setGuidelines(uploadedGuidelines);
  };

  const handleBrandElementsConfirmed = (elements: BrandElements) => {
    setBrandElements(elements);
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
        return guidelines.length > 0; // Must have uploaded guidelines
      case 4:
        return brandElements.brandName.length > 0; // Must have confirmed brand name at minimum
      case 5:
        return true; // Collaborators step is optional
      default:
        return false;
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
              <h1 className="text-2xl font-bold text-white">Brand Setup</h1>
              <span className="text-sm text-gray-400">
                Step {currentStep} of {totalSteps}
              </span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>

          {/* Step Content */}
          <div className="bg-gray-800 rounded-xl border border-gray-700 p-8 min-h-[500px]">
            <OnboardingSteps
              currentStep={currentStep}
              companyInfo={companyInfo}
              guidelines={guidelines}
              brandElements={brandElements}
              collaborators={collaborators}
              onCompanyInfoUpdated={handleCompanyInfoUpdated}
              onGuidelinesUploaded={handleGuidelinesUploaded}
              onBrandElementsConfirmed={handleBrandElementsConfirmed}
              onCollaboratorsUpdated={handleCollaboratorsUpdated}
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
