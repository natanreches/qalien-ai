
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { BrandComplianceHeader } from './BrandComplianceHeader';
import { VisualBrandElementsSection } from './VisualBrandElementsSection';
import { BrandVoicePersonalitySection } from './BrandVoicePersonalitySection';
import { TargetAudienceSection } from './TargetAudienceSection';
import { AdvancedSettingsSection } from './AdvancedSettingsSection';
import { ComplianceSettingsActions } from './ComplianceSettingsActions';

interface ComplianceWeights {
  logoUsage: number;
  colorPalette: number;
  typography: number;
  brandVoice: number;
  brandTone: number;
  coreMessaging: number;
  brandVocabulary: number;
  targetAudience: number;
  brandPronunciation: number;
}

export const BrandComplianceSettings = () => {
  const [weights, setWeights] = useState<ComplianceWeights>({
    logoUsage: 80,
    colorPalette: 75,
    typography: 70,
    brandVoice: 85,
    brandTone: 80,
    coreMessaging: 90,
    brandVocabulary: 75,
    targetAudience: 85,
    brandPronunciation: 70
  });

  const [strictMode, setStrictMode] = useState(false);
  const [autoApproval, setAutoApproval] = useState(false);

  const handleWeightChange = (category: keyof ComplianceWeights, value: number[]) => {
    setWeights(prev => ({
      ...prev,
      [category]: value[0]
    }));
  };

  const resetToDefaults = () => {
    setWeights({
      logoUsage: 80,
      colorPalette: 75,
      typography: 70,
      brandVoice: 85,
      brandTone: 80,
      coreMessaging: 90,
      brandVocabulary: 75,
      targetAudience: 85,
      brandPronunciation: 70
    });
    setStrictMode(false);
    setAutoApproval(false);
  };

  const saveSettings = () => {
    // In a real app, this would save to a backend or localStorage
    console.log('Saving compliance settings:', { weights, strictMode, autoApproval });
    // Show a toast notification
  };

  const getWeightDescription = (weight: number) => {
    if (weight >= 90) return 'Very Strict';
    if (weight >= 70) return 'Strict';
    if (weight >= 50) return 'Moderate';
    if (weight >= 30) return 'Lenient';
    return 'Very Lenient';
  };

  const getWeightColor = (weight: number) => {
    if (weight >= 90) return 'text-red-400';
    if (weight >= 70) return 'text-orange-400';
    if (weight >= 50) return 'text-yellow-400';
    if (weight >= 30) return 'text-blue-400';
    return 'text-green-400';
  };

  return (
    <div className="space-y-6">
      <BrandComplianceHeader />

      <Card className="p-6 bg-gray-800 border-gray-700">
        <div className="space-y-6">
          <VisualBrandElementsSection
            weights={weights}
            onWeightChange={handleWeightChange}
            getWeightDescription={getWeightDescription}
            getWeightColor={getWeightColor}
          />

          <Separator />

          <BrandVoicePersonalitySection
            weights={weights}
            onWeightChange={handleWeightChange}
            getWeightDescription={getWeightDescription}
            getWeightColor={getWeightColor}
          />

          <Separator />

          <TargetAudienceSection
            weights={weights}
            onWeightChange={handleWeightChange}
            getWeightDescription={getWeightDescription}
            getWeightColor={getWeightColor}
          />

          <Separator />

          <AdvancedSettingsSection
            strictMode={strictMode}
            autoApproval={autoApproval}
            onStrictModeChange={setStrictMode}
            onAutoApprovalChange={setAutoApproval}
          />
        </div>
      </Card>

      <ComplianceSettingsActions
        onSave={saveSettings}
        onReset={resetToDefaults}
      />
    </div>
  );
};
