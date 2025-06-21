
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Save, RotateCcw } from 'lucide-react';
import { BrandGuidelinesUpload } from './BrandGuidelinesUpload';
import { useToast } from '@/hooks/use-toast';

interface ComplianceWeights {
  logoUsage: number;
  colorPalette: number;
  typography: number;
  messagingTone: number;
  layoutComposition: number;
  brandPronunciation: number;
}

export const ProfileSettings = () => {
  const { toast } = useToast();

  const [weights, setWeights] = useState<ComplianceWeights>({
    logoUsage: 80,
    colorPalette: 75,
    typography: 70,
    messagingTone: 85,
    layoutComposition: 65,
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
      messagingTone: 85,
      layoutComposition: 65,
      brandPronunciation: 70
    });
    setStrictMode(false);
    setAutoApproval(false);
    
    // Show reset toast
    const toastResult = toast({
      title: "Settings Reset",
      description: "All compliance settings have been reset to default values.",
    });
    console.log('Reset toast called with result:', toastResult);
  };

  const saveSettings = () => {
    // In a real app, this would save to a backend or localStorage
    console.log('Save settings button clicked, calling toast...');
    console.log('Saving compliance settings:', { weights, strictMode, autoApproval });
    
    // Show success toast
    const toastResult = toast({
      title: "Settings Saved",
      description: "Your compliance settings have been successfully saved.",
    });
    console.log('Save toast called with result:', toastResult);
  };

  const getWeightDescription = (weight: number) => {
    if (weight >= 90) return 'Very Strict';
    if (weight >= 70) return 'Strict';
    if (weight >= 50) return 'Moderate';
    if (weight >= 30) return 'Lenient';
    return 'Very Lenient';
  };

  const getWeightColor = (weight: number) => {
    if (weight >= 90) return 'text-red-600';
    if (weight >= 70) return 'text-orange-600';
    if (weight >= 50) return 'text-yellow-600';
    if (weight >= 30) return 'text-blue-600';
    return 'text-green-600';
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Compliance Settings</h2>
        <p className="text-gray-600">
          Customize how strictly the AI evaluates different aspects of brand compliance for your assets.
        </p>
      </div>

      {/* Brand Guidelines Upload Section */}
      <BrandGuidelinesUpload />

      <Card className="p-6">
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Visual Identity</h3>
            <div className="space-y-6">
              {/* Logo Usage */}
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <Label htmlFor="logo-weight" className="text-sm font-medium">
                    Logo Usage
                  </Label>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-gray-500">{weights.logoUsage}%</span>
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
                  <Label htmlFor="color-weight" className="text-sm font-medium">
                    Color Palette Adherence
                  </Label>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-gray-500">{weights.colorPalette}%</span>
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
                  Determines tolerance for color variations and brand color consistency.
                </p>
              </div>

              {/* Typography */}
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <Label htmlFor="typography-weight" className="text-sm font-medium">
                    Typography & Font Usage
                  </Label>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-gray-500">{weights.typography}%</span>
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
                  Controls strictness of font family, weight, and sizing compliance.
                </p>
              </div>

              {/* Layout & Composition */}
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <Label htmlFor="layout-weight" className="text-sm font-medium">
                    Layout & Composition
                  </Label>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-gray-500">{weights.layoutComposition}%</span>
                    <span className={`text-xs font-medium ${getWeightColor(weights.layoutComposition)}`}>
                      {getWeightDescription(weights.layoutComposition)}
                    </span>
                  </div>
                </div>
                <Slider
                  id="layout-weight"
                  min={0}
                  max={100}
                  step={5}
                  value={[weights.layoutComposition]}
                  onValueChange={(value) => handleWeightChange('layoutComposition', value)}
                  className="w-full"
                />
                <p className="text-xs text-gray-500">
                  Evaluates adherence to grid systems, hierarchy, and composition guidelines.
                </p>
              </div>
            </div>
          </div>

          <Separator />

          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Verbal Identity</h3>
            <div className="space-y-6">
              {/* Messaging Tone */}
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <Label htmlFor="messaging-weight" className="text-sm font-medium">
                    Messaging Tone & Voice
                  </Label>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-gray-500">{weights.messagingTone}%</span>
                    <span className={`text-xs font-medium ${getWeightColor(weights.messagingTone)}`}>
                      {getWeightDescription(weights.messagingTone)}
                    </span>
                  </div>
                </div>
                <Slider
                  id="messaging-weight"
                  min={0}
                  max={100}
                  step={5}
                  value={[weights.messagingTone]}
                  onValueChange={(value) => handleWeightChange('messagingTone', value)}
                  className="w-full"
                />
                <p className="text-xs text-gray-500">
                  Controls how strictly messaging aligns with brand voice and communication guidelines.
                </p>
              </div>

              {/* Brand Name Pronunciation */}
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <Label htmlFor="pronunciation-weight" className="text-sm font-medium">
                    Brand Name Pronunciation
                  </Label>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-gray-500">{weights.brandPronunciation}%</span>
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
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Advanced Settings</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <Label htmlFor="strict-mode" className="text-sm font-medium">
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
                  <Label htmlFor="auto-approval" className="text-sm font-medium">
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
        <Button variant="outline" onClick={resetToDefaults} className="flex items-center space-x-2">
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
