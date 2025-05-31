
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
}

const Onboarding = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [guidelines, setGuidelines] = useState<BrandGuideline[]>([]);
  const [brandElements, setBrandElements] = useState<BrandElements>({
    brandName: '',
    primaryColors: [],
    fonts: [],
    logoStyle: '',
    tone: '',
    targetAudience: ''
  });

  const totalSteps = 3;
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
    // Save onboarding completion to localStorage or API
    localStorage.setItem('onboarding_completed', 'true');
    navigate('/business-center');
  };

  const handleGuidelinesUploaded = (uploadedGuidelines: BrandGuideline[]) => {
    setGuidelines(uploadedGuidelines);
  };

  const handleBrandElementsConfirmed = (elements: BrandElements) => {
    setBrandElements(elements);
  };

  const canProceed = () => {
    switch (currentStep) {
      case 1:
        return true; // Welcome step
      case 2:
        return guidelines.length > 0; // Must have uploaded guidelines
      case 3:
        return brandElements.brandName.length > 0; // Must have confirmed brand name at minimum
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
              guidelines={guidelines}
              brandElements={brandElements}
              onGuidelinesUploaded={handleGuidelinesUploaded}
              onBrandElementsConfirmed={handleBrandElementsConfirmed}
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
