
import React from 'react';
import { OnboardingContainer } from '@/components/OnboardingContainer';
import { OnboardingSteps } from '@/components/OnboardingSteps';
import { useOnboardingLogic } from '@/hooks/useOnboardingLogic';

const Onboarding = () => {
  const {
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
    handleComplete,
    handleSkipOnboarding,
    canProceed,
    stepTitle
  } = useOnboardingLogic();

  return (
    <OnboardingContainer
      currentStep={currentStep}
      totalSteps={totalSteps}
      stepTitle={stepTitle}
      canProceed={canProceed}
      onSkip={handleSkipOnboarding}
      onBack={handleBack}
      onNext={handleNext}
      onComplete={handleComplete}
    >
      <OnboardingSteps
        currentStep={currentStep}
        companyInfo={companyInfo}
        guidelines={guidelines}
        visualIdentity={visualIdentity}
        verbalIdentity={verbalIdentity}
        adCreatives={adCreatives}
        legalRegulatory={legalRegulatory}
        collaborators={collaborators}
        onCompanyInfoUpdated={setCompanyInfo}
        onGuidelinesUploaded={setGuidelines}
        onVisualIdentityUpdated={setVisualIdentity}
        onVerbalIdentityUpdated={setVerbalIdentity}
        onAdCreativesUpdated={setAdCreatives}
        onLegalRegulatoryUpdated={setLegalRegulatory}
        onCollaboratorsUpdated={setCollaborators}
        onNavigateToGuidelines={handleNavigateToGuidelines}
      />
    </OnboardingContainer>
  );
};

export default Onboarding;
