import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { OnboardingVisualIdentityHeader } from './OnboardingVisualIdentityHeader';
import { OnboardingVisualIdentityLogoSection } from './OnboardingVisualIdentityLogoSection';
import { OnboardingVisualIdentityColorSection } from './OnboardingVisualIdentityColorSection';
import { OnboardingVisualIdentityTypographySection } from './OnboardingVisualIdentityTypographySection';
import { OnboardingVisualIdentityPhotographySection } from './OnboardingVisualIdentityPhotographySection';
import { OnboardingVisualIdentityIconographySection } from './OnboardingVisualIdentityIconographySection';
import {OnboardingVisualIdentityLayoutSection } from './OnboardingVisualIdentityLayoutSection';
import { OnboardingVisualIdentityAccessibilitySection } from './OnboardingVisualIdentityAccessibilitySection';

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

interface OnboardingVisualIdentityProps {
  guidelines: BrandGuideline[];
  visualIdentity: VisualIdentity;
  onGuidelinesUploaded: (guidelines: BrandGuideline[]) => void;
  onVisualIdentityUpdated: (identity: VisualIdentity) => void;
  onNavigateToGuidelines?: () => void;
}

interface ExtractionStatus {
  photography: boolean;
  iconography: boolean;
  layout: boolean;
}

interface VerificationStatus {
  typography?: boolean;
  accessibility?: boolean;
  photography?: boolean;
  iconography?: boolean;
  layout?: boolean;
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
    photographyFiles: visualIdentity.photographyFiles || [],
    layoutFiles: visualIdentity.layoutFiles || []
  });
  const [extractedFromGuidelines, setExtractedFromGuidelines] = useState(false);
  const [extractionStatus, setExtractionStatus] = useState<ExtractionStatus>({
    photography: false,
    iconography: false,
    layout: false
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
      const hasPhotographyGuidelines = guidelines.some(g => 
        g.name.toLowerCase().includes('photography') || 
        g.description.toLowerCase().includes('photo') ||
        g.description.toLowerCase().includes('image')
      );

      const hasIconographyGuidelines = guidelines.some(g => 
        g.name.toLowerCase().includes('icon') || 
        g.description.toLowerCase().includes('graphic') ||
        g.name.toLowerCase().includes('visual elements')
      );

      const hasLayoutGuidelines = guidelines.some(g => 
        g.name.toLowerCase().includes('layout') || 
        g.description.toLowerCase().includes('grid') ||
        g.description.toLowerCase().includes('spacing')
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
        photographyStyle: hasPhotographyGuidelines 
          ? 'Clean, modern photography with consistent lighting and minimal backgrounds. Focus on lifestyle imagery that reflects brand values.'
          : '',
        iconography: extractedIconography,
        layoutRules: hasLayoutGuidelines 
          ? 'Maintain generous white space, use grid-based layouts, ensure minimum 8px margins, and follow 4:3 aspect ratios for hero images.'
          : ''
      };

      setIdentity(extractedIdentity);
      setExtractionStatus({
        photography: hasPhotographyGuidelines,
        iconography: hasIconographyGuidelines,
        layout: hasLayoutGuidelines
      });
      setExtractedFromGuidelines(true);
    }
  }, [guidelines, extractedFromGuidelines, identity]);

  const handleFileUpload = (files: FileList | null, type: 'logo' | 'iconography' | 'photography' | 'layout') => {
    if (!files) return;
    
    const fileArray = Array.from(files);
    switch (type) {
      case 'logo':
        setIdentity(prev => ({ ...prev, logoFiles: [...prev.logoFiles, ...fileArray] }));
        break;
      case 'iconography':
        setIdentity(prev => ({ ...prev, iconography: [...prev.iconography, ...fileArray] }));
        break;
      case 'photography':
        setIdentity(prev => ({ ...prev, photographyFiles: [...prev.photographyFiles, ...fileArray] }));
        break;
      case 'layout':
        setIdentity(prev => ({ ...prev, layoutFiles: [...prev.layoutFiles, ...fileArray] }));
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

  const clearTypography = () => {
    setIdentity(prev => ({ ...prev, typography: [] }));
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
        />

        <OnboardingVisualIdentityColorSection
          colorPalette={identity.colorPalette}
          extractedFromGuidelines={extractedFromGuidelines}
          onAddColor={addColor}
          onUpdateColor={updateColor}
          onRemoveColor={removeColor}
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
        />

        <OnboardingVisualIdentityPhotographySection
          photographyStyle={identity.photographyStyle}
          photographyFiles={identity.photographyFiles}
          extractionStatus={extractionStatus.photography}
          onPhotographyStyleChange={(style) => setIdentity(prev => ({ ...prev, photographyStyle: style }))}
          onFileUpload={(files) => handleFileUpload(files, 'photography')}
          onVerifyExtraction={(isCorrect) => handleVerifyExtraction('photography', isCorrect)}
          extractionVerified={verificationStatus.photography}
          onClearExtracted={() => setIdentity(prev => ({ ...prev, photographyStyle: '', photographyFiles: [] }))}
        />

        <OnboardingVisualIdentityIconographySection
          iconography={identity.iconography}
          extractionStatus={extractionStatus.iconography}
          onFileUpload={(files) => handleFileUpload(files, 'iconography')}
          onVerifyExtraction={(isCorrect) => handleVerifyExtraction('iconography', isCorrect)}
          extractionVerified={verificationStatus.iconography}
          onClearExtracted={() => setIdentity(prev => ({ ...prev, iconography: [] }))}
        />

        <OnboardingVisualIdentityLayoutSection
          layoutRules={identity.layoutRules}
          layoutFiles={identity.layoutFiles}
          extractionStatus={extractionStatus.layout}
          onLayoutRulesChange={(rules) => setIdentity(prev => ({ ...prev, layoutRules: rules }))}
          onFileUpload={(files) => handleFileUpload(files, 'layout')}
          onVerifyExtraction={(isCorrect) => handleVerifyExtraction('layout', isCorrect)}
          extractionVerified={verificationStatus.layout}
          onClearExtracted={() => setIdentity(prev => ({ ...prev, layoutRules: '', layoutFiles: [] }))}
        />

        <OnboardingVisualIdentityAccessibilitySection
          accessibilityRequirements={identity.accessibilityRequirements}
          onAccessibilityChange={(checked) => setIdentity(prev => ({ ...prev, accessibilityRequirements: checked }))}
          extractedFromGuidelines={extractedFromGuidelines}
          onVerifyExtraction={(isCorrect) => handleVerifyExtraction('accessibility', isCorrect)}
          extractionVerified={verificationStatus.accessibility}
        />
      </div>

      <Button onClick={handleSave} className="w-full">
        Save Visual Identity
      </Button>
    </div>
  );
};
