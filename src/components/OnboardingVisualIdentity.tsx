
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { OnboardingVisualIdentityHeader } from './OnboardingVisualIdentityHeader';
import { OnboardingVisualIdentityLogoSection } from './OnboardingVisualIdentityLogoSection';
import { OnboardingVisualIdentityColorSection } from './OnboardingVisualIdentityColorSection';
import { OnboardingVisualIdentityTypographySection } from './OnboardingVisualIdentityTypographySection';
import { OnboardingVisualIdentityIconographySection } from './OnboardingVisualIdentityIconographySection';

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
  fontFiles?: File[];
  iconography: File[];
}

interface OnboardingVisualIdentityProps {
  guidelines: BrandGuideline[];
  visualIdentity: VisualIdentity;
  onGuidelinesUploaded: (guidelines: BrandGuideline[]) => void;
  onVisualIdentityUpdated: (identity: VisualIdentity) => void;
  onNavigateToGuidelines?: () => void;
}

interface ExtractionStatus {
  iconography: boolean;
}

interface VerificationStatus {
  logo?: boolean;
  colorPalette?: boolean;
  typography?: boolean;
  iconography?: boolean;
}

export const OnboardingVisualIdentity = ({
  guidelines,
  visualIdentity,
  onGuidelinesUploaded,
  onVisualIdentityUpdated,
  onNavigateToGuidelines
}: OnboardingVisualIdentityProps) => {
  const [identity, setIdentity] = useState<VisualIdentity>({
    ...visualIdentity,
    fontFiles: visualIdentity.fontFiles || []
  });

  const [extractedFromGuidelines, setExtractedFromGuidelines] = useState(false);
  const [extractionStatus, setExtractionStatus] = useState<ExtractionStatus>({
    iconography: false
  });
  const [verificationStatus, setVerificationStatus] = useState<VerificationStatus>({});

  // Enhanced extraction from brand guidelines including auto-detection of specific elements
  useEffect(() => {
    if (guidelines.length > 0 && !extractedFromGuidelines) {
      // Create mock logo files extracted from guidelines
      const createMockLogoFile = (name: string, type: string = 'image/png') => {
        const blob = new Blob(['mock logo data'], { type });
        return new File([blob], name, { type });
      };

      // Create mock iconography files if detected in guidelines
      const createMockIconFile = (name: string, type: string = 'image/svg+xml') => {
        const blob = new Blob(['mock icon data'], { type });
        return new File([blob], name, { type });
      };

      // Simulate intelligent extraction based on guideline content analysis
      const hasIconographyGuidelines = guidelines.some(g => 
        g.name.toLowerCase().includes('icon') || 
        g.description.toLowerCase().includes('graphic') ||
        g.name.toLowerCase().includes('visual elements')
      );

      // Extract iconography files if guidelines contain iconography information
      const extractedIconography = hasIconographyGuidelines ? [
        createMockIconFile('brand-icons-primary.svg'),
        createMockIconFile('brand-icons-secondary.svg')
      ] : [];

      const extractedIdentity: VisualIdentity = {
        ...identity,
        logoFiles: [
          createMockLogoFile('brand-logo-primary.png'),
          createMockLogoFile('brand-logo-horizontal.png'),
          createMockLogoFile('brand-logo-monochrome.png')
        ],
        colorPalette: ['#FF6B35', '#004E89', '#FFFFFF', '#F4F4F4', '#2C3E50'],
        typography: ['Helvetica Neue', 'Arial', 'Georgia', 'Open Sans'],
        iconography: extractedIconography
      };

      setIdentity(extractedIdentity);
      setExtractionStatus({
        iconography: hasIconographyGuidelines
      });
      setExtractedFromGuidelines(true);
    }
  }, [guidelines, extractedFromGuidelines, identity]);

  const handleFileUpload = (files: FileList | null, type: 'logo' | 'iconography') => {
    if (!files) return;
    
    const fileArray = Array.from(files);
    switch (type) {
      case 'logo':
        setIdentity(prev => ({ ...prev, logoFiles: [...prev.logoFiles, ...fileArray] }));
        break;
      case 'iconography':
        setIdentity(prev => ({ ...prev, iconography: [...prev.iconography, ...fileArray] }));
        break;
    }
  };

  const removeFile = (index: number, type: 'logo' | 'iconography') => {
    switch (type) {
      case 'logo':
        setIdentity(prev => ({ ...prev, logoFiles: prev.logoFiles.filter((_, i) => i !== index) }));
        break;
      case 'iconography':
        setIdentity(prev => ({ ...prev, iconography: prev.iconography.filter((_, i) => i !== index) }));
        break;
    }
  };

  const addColor = () => {
    setIdentity(prev => ({
      ...prev,
      colorPalette: [...prev.colorPalette, '#000000']
    }));
  };

  const updateColor = (index: number, color: string) => {
    setIdentity(prev => ({
      ...prev,
      colorPalette: prev.colorPalette.map((c, i) => i === index ? color : c)
    }));
  };

  const removeColor = (index: number) => {
    setIdentity(prev => ({
      ...prev,
      colorPalette: prev.colorPalette.filter((_, i) => i !== index)
    }));
  };

  const addTypography = () => {
    setIdentity(prev => ({
      ...prev,
      typography: [...prev.typography, 'New Font']
    }));
  };

  const updateTypography = (index: number, font: string) => {
    setIdentity(prev => ({
      ...prev,
      typography: prev.typography.map((f, i) => i === index ? font : f)
    }));
  };

  const removeTypography = (index: number) => {
    setIdentity(prev => ({
      ...prev,
      typography: prev.typography.filter((_, i) => i !== index)
    }));
  };

  const handleFontFileUpload = (file: File) => {
    setIdentity(prev => ({
      ...prev,
      fontFiles: [...(prev.fontFiles || []), file]
    }));
  };

  const clearTypography = () => {
    setIdentity(prev => ({ ...prev, typography: [] }));
  };

  const clearLogoFiles = () => {
    setIdentity(prev => ({ ...prev, logoFiles: [] }));
  };

  const clearColorPalette = () => {
    setIdentity(prev => ({ ...prev, colorPalette: [] }));
  };

  const handleVerifyExtraction = (section: keyof VerificationStatus, isCorrect: boolean) => {
    setVerificationStatus(prev => ({ ...prev, [section]: isCorrect }));
  };

  const handleSave = () => {
    onVisualIdentityUpdated(identity);
  };

  // Show message if no guidelines are uploaded
  if (guidelines.length === 0) {
    return (
      <OnboardingVisualIdentityHeader
        guidelines={guidelines}
        extractedFromGuidelines={extractedFromGuidelines}
        onNavigateToGuidelines={onNavigateToGuidelines}
      />
    );
  }

  return (
    <div className="space-y-8">
      <OnboardingVisualIdentityHeader
        guidelines={guidelines}
        extractedFromGuidelines={extractedFromGuidelines}
        onNavigateToGuidelines={onNavigateToGuidelines}
      />

      <div className="space-y-6">
        <OnboardingVisualIdentityLogoSection
          logoFiles={identity.logoFiles}
          extractedFromGuidelines={extractedFromGuidelines}
          onFileUpload={(files) => handleFileUpload(files, 'logo')}
          onVerifyExtraction={(isCorrect) => handleVerifyExtraction('logo', isCorrect)}
          extractionVerified={verificationStatus.logo}
          onClearExtracted={clearLogoFiles}
          onRemoveFile={(index) => removeFile(index, 'logo')}
        />

        <OnboardingVisualIdentityColorSection
          colorPalette={identity.colorPalette}
          extractedFromGuidelines={extractedFromGuidelines}
          onAddColor={addColor}
          onUpdateColor={updateColor}
          onRemoveColor={removeColor}
          onVerifyExtraction={(isCorrect) => handleVerifyExtraction('colorPalette', isCorrect)}
          extractionVerified={verificationStatus.colorPalette}
          onClearExtracted={clearColorPalette}
        />

        <OnboardingVisualIdentityTypographySection
          typography={identity.typography}
          extractedFromGuidelines={extractedFromGuidelines}
          onAddTypography={addTypography}
          onUpdateTypography={updateTypography}
          onRemoveTypography={removeTypography}
          onVerifyExtraction={(isCorrect) => handleVerifyExtraction('typography', isCorrect)}
          extractionVerified={verificationStatus.typography}
          onClearExtracted={clearTypography}
          onFontFileUpload={handleFontFileUpload}
        />

        <OnboardingVisualIdentityIconographySection
          iconography={identity.iconography}
          extractionStatus={extractionStatus.iconography}
          onFileUpload={(files) => handleFileUpload(files, 'iconography')}
          onVerifyExtraction={(isCorrect) => handleVerifyExtraction('iconography', isCorrect)}
          extractionVerified={verificationStatus.iconography}
          onClearExtracted={() => setIdentity(prev => ({ ...prev, iconography: [] }))}
        />
      </div>

      <Button onClick={handleSave} className="w-full">
        Save Visual Identity
      </Button>
    </div>
  );
};
