
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Save, RotateCcw, Palette, Type, MessageSquare, Users, Volume2, Heart, Pen, Lightbulb, BookOpen } from 'lucide-react';

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
      <div>
        <h2 className="text-2xl font-bold text-white mb-2">Brand Compliance Settings</h2>
        <p className="text-gray-400">
          Configure how strictly the AI evaluates different aspects of your brand identity for compliance scoring.
        </p>
      </div>

      {/* Visual Brand Elements */}
      <Card className="p-6 bg-gray-800 border-gray-700">
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
              <Palette className="h-5 w-5 mr-2" />
              Visual Brand Elements
            </h3>
            <div className="space-y-6">
              {/* Logo Usage */}
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <Label htmlFor="logo-weight" className="text-sm font-medium text-gray-200">
                    Logo Usage
                  </Label>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-gray-400">{weights.logoUsage}%</span>
                    <span className={`text-xs font-medium ${getWeightColor(weights.logoUsage)}`}>
                      {getWeightDescription(weights.logoUsage)}
                    </span>
                  </div>
                </div>
                <Slider
                  id="logo-weight"
                  min={0}
                  max={100}
                  step={5}
                  value={[weights.logoUsage]}
                  onValueChange={(value) => handleWeightChange('logoUsage', value)}
                  className="w-full"
                />
                <p className="text-xs text-gray-500">
                  Controls how strictly logo placement, sizing, and clear space requirements are evaluated.
                </p>
              </div>

              {/* Color Palette */}
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <Label htmlFor="color-weight" className="text-sm font-medium text-gray-200">
                    Primary Colors & Palette
                  </Label>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-gray-400">{weights.colorPalette}%</span>
                    <span className={`text-xs font-medium ${getWeightColor(weights.colorPalette)}`}>
                      {getWeightDescription(weights.colorPalette)}
                    </span>
                  </div>
                </div>
                <Slider
                  id="color-weight"
                  min={0}
                  max={100}
                  step={5}
                  value={[weights.colorPalette]}
                  onValueChange={(value) => handleWeightChange('colorPalette', value)}
                  className="w-full"
                />
                <p className="text-xs text-gray-500">
                  Evaluates adherence to your brand's primary color palette and color consistency.
                </p>
              </div>

              {/* Typography */}
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <Label htmlFor="typography-weight" className="text-sm font-medium text-gray-200">
                    Typography & Brand Fonts
                  </Label>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-gray-400">{weights.typography}%</span>
                    <span className={`text-xs font-medium ${getWeightColor(weights.typography)}`}>
                      {getWeightDescription(weights.typography)}
                    </span>
                  </div>
                </div>
                <Slider
                  id="typography-weight"
                  min={0}
                  max={100}
                  step={5}
                  value={[weights.typography]}
                  onValueChange={(value) => handleWeightChange('typography', value)}
                  className="w-full"
                />
                <p className="text-xs text-gray-500">
                  Controls strictness of brand font usage, hierarchy, and typographic guidelines.
                </p>
              </div>
            </div>
          </div>

          <Separator />

          {/* Brand Voice & Personality */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
              <MessageSquare className="h-5 w-5 mr-2" />
              Brand Voice & Personality
            </h3>
            <div className="space-y-6">
              {/* Brand Voice */}
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <Label htmlFor="voice-weight" className="text-sm font-medium text-gray-200 flex items-center">
                    <Heart className="h-4 w-4 mr-2" />
                    Brand Voice Consistency
                  </Label>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-gray-400">{weights.brandVoice}%</span>
                    <span className={`text-xs font-medium ${getWeightColor(weights.brandVoice)}`}>
                      {getWeightDescription(weights.brandVoice)}
                    </span>
                  </div>
                </div>
                <Slider
                  id="voice-weight"
                  min={0}
                  max={100}
                  step={5}
                  value={[weights.brandVoice]}
                  onValueChange={(value) => handleWeightChange('brandVoice', value)}
                  className="w-full"
                />
                <p className="text-xs text-gray-500">
                  Evaluates how well content matches your brand's personality and voice characteristics.
                </p>
              </div>

              {/* Brand Tone */}
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <Label htmlFor="tone-weight" className="text-sm font-medium text-gray-200 flex items-center">
                    <Pen className="h-4 w-4 mr-2" />
                    Brand Tone Adherence
                  </Label>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-gray-400">{weights.brandTone}%</span>
                    <span className={`text-xs font-medium ${getWeightColor(weights.brandTone)}`}>
                      {getWeightDescription(weights.brandTone)}
                    </span>
                  </div>
                </div>
                <Slider
                  id="tone-weight"
                  min={0}
                  max={100}
                  step={5}
                  value={[weights.brandTone]}
                  onValueChange={(value) => handleWeightChange('brandTone', value)}
                  className="w-full"
                />
                <p className="text-xs text-gray-500">
                  Controls how strictly the communication tone aligns with your brand guidelines.
                </p>
              </div>

              {/* Core Messaging */}
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <Label htmlFor="messaging-weight" className="text-sm font-medium text-gray-200 flex items-center">
                    <Lightbulb className="h-4 w-4 mr-2" />
                    Core Messaging Alignment
                  </Label>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-gray-400">{weights.coreMessaging}%</span>
                    <span className={`text-xs font-medium ${getWeightColor(weights.coreMessaging)}`}>
                      {getWeightDescription(weights.coreMessaging)}
                    </span>
                  </div>
                </div>
                <Slider
                  id="messaging-weight"
                  min={0}
                  max={100}
                  step={5}
                  value={[weights.coreMessaging]}
                  onValueChange={(value) => handleWeightChange('coreMessaging', value)}
                  className="w-full"
                />
                <p className="text-xs text-gray-500">
                  Evaluates alignment with your brand's key messages and value propositions.
                </p>
              </div>

              {/* Brand Vocabulary */}
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <Label htmlFor="vocabulary-weight" className="text-sm font-medium text-gray-200 flex items-center">
                    <BookOpen className="h-4 w-4 mr-2" />
                    Brand Vocabulary Usage
                  </Label>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-gray-400">{weights.brandVocabulary}%</span>
                    <span className={`text-xs font-medium ${getWeightColor(weights.brandVocabulary)}`}>
                      {getWeightDescription(weights.brandVocabulary)}
                    </span>
                  </div>
                </div>
                <Slider
                  id="vocabulary-weight"
                  min={0}
                  max={100}
                  step={5}
                  value={[weights.brandVocabulary]}
                  onValueChange={(value) => handleWeightChange('brandVocabulary', value)}
                  className="w-full"
                />
                <p className="text-xs text-gray-500">
                  Controls adherence to preferred terminology, phrases, and language guidelines.
                </p>
              </div>
            </div>
          </div>

          <Separator />

          {/* Target Audience & Context */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
              <Users className="h-5 w-5 mr-2" />
              Target Audience & Context
            </h3>
            <div className="space-y-6">
              {/* Target Audience Alignment */}
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <Label htmlFor="audience-weight" className="text-sm font-medium text-gray-200">
                    Target Audience Alignment
                  </Label>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-gray-400">{weights.targetAudience}%</span>
                    <span className={`text-xs font-medium ${getWeightColor(weights.targetAudience)}`}>
                      {getWeightDescription(weights.targetAudience)}
                    </span>
                  </div>
                </div>
                <Slider
                  id="audience-weight"
                  min={0}
                  max={100}
                  step={5}
                  value={[weights.targetAudience]}
                  onValueChange={(value) => handleWeightChange('targetAudience', value)}
                  className="w-full"
                />
                <p className="text-xs text-gray-500">
                  Evaluates how well content resonates with your defined target audience.
                </p>
              </div>

              {/* Brand Pronunciation */}
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <Label htmlFor="pronunciation-weight" className="text-sm font-medium text-gray-200 flex items-center">
                    <Volume2 className="h-4 w-4 mr-2" />
                    Brand Name Pronunciation
                  </Label>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-gray-400">{weights.brandPronunciation}%</span>
                    <span className={`text-xs font-medium ${getWeightColor(weights.brandPronunciation)}`}>
                      {getWeightDescription(weights.brandPronunciation)}
                    </span>
                  </div>
                </div>
                <Slider
                  id="pronunciation-weight"
                  min={0}
                  max={100}
                  step={5}
                  value={[weights.brandPronunciation]}
                  onValueChange={(value) => handleWeightChange('brandPronunciation', value)}
                  className="w-full"
                />
                <p className="text-xs text-gray-500">
                  Controls evaluation of correct brand name pronunciation in audio/video content.
                </p>
              </div>
            </div>
          </div>

          <Separator />

          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Advanced Settings</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <Label htmlFor="strict-mode" className="text-sm font-medium text-gray-200">
                    Strict Mode
                  </Label>
                  <p className="text-xs text-gray-500">
                    Apply all weights with maximum strictness for critical brand assets
                  </p>
                </div>
                <Switch
                  id="strict-mode"
                  checked={strictMode}
                  onCheckedChange={setStrictMode}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <Label htmlFor="auto-approval" className="text-sm font-medium text-gray-200">
                    Auto-approve high compliance assets
                  </Label>
                  <p className="text-xs text-gray-500">
                    Automatically approve assets scoring above 90% overall compliance
                  </p>
                </div>
                <Switch
                  id="auto-approval"
                  checked={autoApproval}
                  onCheckedChange={setAutoApproval}
                />
              </div>
            </div>
          </div>
        </div>
      </Card>

      <div className="flex justify-between">
        <Button variant="outline" onClick={resetToDefaults} className="flex items-center space-x-2 border-gray-600 text-gray-300">
          <RotateCcw className="h-4 w-4" />
          <span>Reset to Defaults</span>
        </Button>
        <Button onClick={saveSettings} className="flex items-center space-x-2">
          <Save className="h-4 w-4" />
          <span>Save Settings</span>
        </Button>
      </div>
    </div>
  );
};
