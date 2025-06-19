
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { MessageSquare, Upload, FileText, AlertTriangle } from 'lucide-react';

interface VerbalIdentity {
  toneOfVoice: string;
  brandVocabulary: string;
  prohibitedWords: string;
  claimsDisclosures: string;
  localizationRules: string;
  grammarPreferences: string;
}

interface OnboardingVerbalIdentityProps {
  verbalIdentity: VerbalIdentity;
  onVerbalIdentityUpdated: (identity: VerbalIdentity) => void;
}

export const OnboardingVerbalIdentity = ({
  verbalIdentity,
  onVerbalIdentityUpdated
}: OnboardingVerbalIdentityProps) => {
  const [identity, setIdentity] = useState<VerbalIdentity>(verbalIdentity);

  // Update parent state whenever identity changes
  useEffect(() => {
    console.log('Updating parent with identity:', identity);
    onVerbalIdentityUpdated(identity);
  }, [identity, onVerbalIdentityUpdated]);

  const handleToneOfVoiceChange = (value: string) => {
    console.log('Tone of voice changed to:', value);
    setIdentity(prev => ({ ...prev, toneOfVoice: value }));
  };

  const handleBrandVocabularyChange = (value: string) => {
    setIdentity(prev => ({ ...prev, brandVocabulary: value }));
  };

  const handleProhibitedWordsChange = (value: string) => {
    setIdentity(prev => ({ ...prev, prohibitedWords: value }));
  };

  const handleClaimsDisclosuresChange = (value: string) => {
    setIdentity(prev => ({ ...prev, claimsDisclosures: value }));
  };

  const handleSave = () => {
    console.log('Saving identity:', identity);
    onVerbalIdentityUpdated(identity);
  };

  return (
    <div className="space-y-8">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-white mb-2">Verbal Identity Setup</h2>
        <p className="text-gray-400">
          Define your brand's voice and communication style. This creates your NLP rule set and model fine-tuning guardrails.
        </p>
      </div>

      <div className="space-y-6">
        {/* Tone of Voice */}
        <Card className="p-6 bg-gray-800 border-gray-700">
          <div className="flex items-center mb-4">
            <MessageSquare className="h-5 w-5 mr-2 text-purple-400" />
            <h3 className="text-lg font-semibold text-white">Tone of Voice</h3>
          </div>
          <p className="text-gray-400 text-sm mb-4">
            Describe your brand's tone of voice and communication style
          </p>
          
          <div className="space-y-4">
            <div className="space-y-2">
              <Label className="text-gray-200">Brand Tone Description</Label>
              <Textarea
                value={identity.toneOfVoice}
                onChange={(e) => handleToneOfVoiceChange(e.target.value)}
                className="bg-gray-700 border-gray-600 text-white"
                placeholder="Describe your brand's tone of voice (e.g., friendly and professional, authoritative yet approachable, playful and innovative...)"
                rows={4}
              />
            </div>
            
            <div className="space-y-2">
              <Label className="text-gray-200">Writing Samples (Optional)</Label>
              <Textarea
                className="bg-gray-700 border-gray-600 text-white"
                placeholder="Paste examples of your brand's writing style to help train the system..."
                rows={4}
              />
            </div>
          </div>
        </Card>

        {/* Brand Vocabulary */}
        <Card className="p-6 bg-gray-800 border-gray-700">
          <div className="flex items-center mb-4">
            <Upload className="h-5 w-5 mr-2 text-purple-400" />
            <h3 className="text-lg font-semibold text-white">Brand Vocabulary</h3>
          </div>
          <p className="text-gray-400 text-sm mb-4">
            Upload approved keyword lists, slogans, taglines, product names
          </p>
          
          <div className="space-y-4">
            <div className="border-2 border-dashed border-gray-600 rounded-lg p-4 text-center">
              <Upload className="h-6 w-6 mx-auto text-gray-400 mb-2" />
              <p className="text-gray-400 text-sm mb-2">Upload vocabulary documents</p>
              <Button variant="outline" className="border-gray-600 text-gray-300">
                Choose Files
              </Button>
            </div>
            
            <Textarea
              value={identity.brandVocabulary}
              onChange={(e) => handleBrandVocabularyChange(e.target.value)}
              className="bg-gray-700 border-gray-600 text-white"
              placeholder="Or manually enter approved keywords, phrases, and terminology..."
              rows={4}
            />
          </div>
        </Card>

        {/* Prohibited Words/Phrases */}
        <Card className="p-6 bg-gray-800 border-gray-700">
          <div className="flex items-center mb-4">
            <AlertTriangle className="h-5 w-5 mr-2 text-red-400" />
            <h3 className="text-lg font-semibold text-white">Prohibited Words/Phrases</h3>
          </div>
          <p className="text-gray-400 text-sm mb-4">
            List restricted words, competitor names, banned industry terms
          </p>
          
          <Textarea
            value={identity.prohibitedWords}
            onChange={(e) => handleProhibitedWordsChange(e.target.value)}
            className="bg-gray-700 border-gray-600 text-white"
            placeholder="Enter words or phrases that should never be used in your brand communications..."
            rows={4}
          />
        </Card>

        {/* Claims & Disclosures */}
        <Card className="p-6 bg-gray-800 border-gray-700">
          <div className="flex items-center mb-4">
            <FileText className="h-5 w-5 mr-2 text-purple-400" />
            <h3 className="text-lg font-semibold text-white">Claims & Disclosures</h3>
          </div>
          <p className="text-gray-400 text-sm mb-4">
            List claims requiring substantiation; submit sample disclaimers
          </p>
          
          <Textarea
            value={identity.claimsDisclosures}
            onChange={(e) => handleClaimsDisclosuresChange(e.target.value)}
            className="bg-gray-700 border-gray-600 text-white"
            placeholder="Enter claims that require legal disclaimers or substantiation..."
            rows={4}
          />
        </Card>
      </div>

      <div className="bg-purple-900/20 border border-purple-700 rounded-lg p-4">
        <div className="flex items-center space-x-2 text-purple-300">
          <MessageSquare className="h-4 w-4" />
          <span className="text-sm font-medium">
            This section creates your NLP rule set and model fine-tuning guardrails.
          </span>
        </div>
      </div>

      <Button onClick={handleSave} className="w-full">
        Save Verbal Identity
      </Button>
    </div>
  );
};
