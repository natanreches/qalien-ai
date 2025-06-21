
import React from 'react';
import { Button } from '@/components/ui/button';
import { CheckCircle, ArrowRight, ArrowLeft } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface OnboardingNavigationProps {
  currentStep: number;
  totalSteps: number;
  canProceed: boolean;
  onBack: () => void;
  onNext: () => void;
  onComplete: () => void;
}

export const OnboardingNavigation = ({
  currentStep,
  totalSteps,
  canProceed,
  onBack,
  onNext,
  onComplete
}: OnboardingNavigationProps) => {
  const { toast } = useToast();

  const getValidationMessage = (step: number) => {
    switch (step) {
      case 2:
        return "Please fill out your company name, at least one brand, and your job title to continue.";
      case 3:
        return "Please upload brand guidelines for each of your brands to continue.";
      case 4:
        return "Please add at least one color or upload a logo to continue.";
      case 5:
        return "Please describe your brand's tone of voice to continue.";
      case 6:
        return "Please upload at least 10 ad creatives to continue.";
      case 7:
        return "Please describe your industry rules to continue.";
      default:
        return "Please complete all required fields to continue.";
    }
  };

  const handleNext = () => {
    if (!canProceed) {
      toast({
        title: "Missing Required Information",
        description: getValidationMessage(currentStep),
        variant: "destructive"
      });
      return;
    }
    
    onNext();
    // Scroll to top after navigation
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBack = () => {
    onBack();
    // Scroll to top after navigation
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleComplete = () => {
    if (!canProceed) {
      toast({
        title: "Missing Required Information", 
        description: "Please complete all required sections before finishing the setup.",
        variant: "destructive"
      });
      return;
    }
    
    onComplete();
  };

  return (
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
          className="bg-green-600 hover:bg-green-700"
        >
          <CheckCircle className="h-4 w-4 mr-2" />
          Complete Setup
        </Button>
      ) : (
        <Button
          onClick={handleNext}
        >
          Next Step
          <ArrowRight className="h-4 w-4 ml-2" />
        </Button>
      )}
    </div>
  );
};
