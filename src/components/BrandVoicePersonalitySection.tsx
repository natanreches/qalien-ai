
import React from 'react';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { MessageSquare, Heart, Pen, Lightbulb, BookOpen, Volume2 } from 'lucide-react';

interface ComplianceWeights {
  brandVoice: number;
  brandTone: number;
  coreMessaging: number;
  brandVocabulary: number;
  brandPronunciation: number;
}

interface BrandVoicePersonalitySectionProps {
  weights: Pick<ComplianceWeights, 'brandVoice' | 'brandTone' | 'coreMessaging' | 'brandVocabulary' | 'brandPronunciation'>;
  onWeightChange: (category: keyof ComplianceWeights, value: number[]) => void;
  getWeightDescription: (weight: number) => string;
  getWeightColor: (weight: number) => string;
}

export const BrandVoicePersonalitySection = ({
  weights,
  onWeightChange,
  getWeightDescription,
  getWeightColor
}: BrandVoicePersonalitySectionProps) => {
  return (
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
            onValueChange={(value) => onWeightChange('brandVoice', value)}
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
            onValueChange={(value) => onWeightChange('brandTone', value)}
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
            onValueChange={(value) => onWeightChange('coreMessaging', value)}
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
            onValueChange={(value) => onWeightChange('brandVocabulary', value)}
            className="w-full"
          />
          <p className="text-xs text-gray-500">
            Controls adherence to preferred terminology, phrases, and language guidelines.
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
            onValueChange={(value) => onWeightChange('brandPronunciation', value)}
            className="w-full"
          />
          <p className="text-xs text-gray-500">
            Controls evaluation of correct brand name pronunciation in audio/video content.
          </p>
        </div>
      </div>
    </div>
  );
};
