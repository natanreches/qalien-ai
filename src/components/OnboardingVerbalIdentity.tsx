
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { MessageSquare, Upload, Globe, Type, FileText, AlertTriangle } from 'lucide-react';

interface VerbalIdentity {
  toneOfVoice: string[];
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
  const [selectedTones, setSelectedTones] = useState<string[]>(verbalIdentity.toneOfVoice || []);
  const [localizationEnabled, setLocalizationEnabled] = useState(false);
  const [grammarEnabled, setGrammarEnabled] = useState(false);

  const toneOptions = [
    'Authoritative', 'Friendly', 'Playful', 'Sophisticated', 'Casual', 
    'Professional', 'Conversational', 'Formal', 'Humorous', 'Inspiring',
    'Educational', 'Empathetic', 'Bold', 'Trustworthy', 'Innovative'
  ];

  const handleToneToggle = (tone: string) => {
    const newTones = selectedTones.includes(tone)
      ? selectedTones.filter(t => t !== tone)
      : [...selectedTones, tone];
    
    setSelectedTones(newTones);
    setIdentity(prev => ({ ...prev, toneOfVoice: newTones }));
  };

  const handleSave = () => {
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
            Select tone characteristics (authoritative, friendly, playful, sophisticated, etc.); submit writing samples
          </p>
          
          <div className="space-y-4">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {toneOptions.map((tone) => (
                <div
                  key={tone}
                  className={`flex items-center space-x-2 p-3 rounded-lg border cursor-pointer transition-colors ${
                    selectedTones.includes(tone)
                      ? 'bg-purple-600 border-purple-500'
                      : 'bg-gray-700 border-gray-600 hover:border-gray-500'
                  }`}
                  onClick={() => handleToneToggle(tone)}
                >
                  <Checkbox
                    checked={selectedTones.includes(tone)}
                    readOnly
                    className="pointer-events-none"
                  />
                  <span className="text-white text-sm">{tone}</span>
                </div>
              ))}
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
              onChange={(e) => setIdentity(prev => ({ ...prev, brandVocabulary: e.target.value }))}
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
            onChange={(e) => setIdentity(prev => ({ ...prev, prohibitedWords: e.target.value }))}
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
            onChange={(e) => setIdentity(prev => ({ ...prev, claimsDisclosures: e.target.value }))}
            className="bg-gray-700 border-gray-600 text-white"
            placeholder="Enter claims that require legal disclaimers or substantiation..."
            rows={4}
          />
        </Card>

        {/* Localization Rules */}
        <Card className="p-6 bg-gray-800 border-gray-700">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center">
              <Globe className="h-5 w-5 mr-2 text-purple-400" />
              <h3 className="text-lg font-semibold text-white">Localization Rules</h3>
            </div>
            <Switch
              checked={localizationEnabled}
              onCheckedChange={setLocalizationEnabled}
            />
          </div>
          <p className="text-gray-400 text-sm mb-4">
            Identify approved languages, translation vendors, localization exceptions
          </p>
          
          {localizationEnabled && (
            <div className="space-y-4">
              <div className="border-2 border-dashed border-gray-600 rounded-lg p-4 text-center">
                <Upload className="h-6 w-6 mx-auto text-gray-400 mb-2" />
                <p className="text-gray-400 text-sm mb-2">Upload localization guidelines</p>
                <Button variant="outline" className="border-gray-600 text-gray-300">
                  Choose Files
                </Button>
              </div>
              
              <Textarea
                value={identity.localizationRules}
                onChange={(e) => setIdentity(prev => ({ ...prev, localizationRules: e.target.value }))}
                className="bg-gray-700 border-gray-600 text-white"
                placeholder="Enter localization rules and approved languages..."
                rows={3}
              />
            </div>
          )}
        </Card>

        {/* Grammar Preferences */}
        <Card className="p-6 bg-gray-800 border-gray-700">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center">
              <Type className="h-5 w-5 mr-2 text-purple-400" />
              <h3 className="text-lg font-semibold text-white">Grammar Preferences</h3>
            </div>
            <Switch
              checked={grammarEnabled}
              onCheckedChange={setGrammarEnabled}
            />
          </div>
          <p className="text-gray-400 text-sm mb-4">
            British vs. American spelling, Oxford comma preference, etc.
          </p>
          
          {grammarEnabled && (
            <Textarea
              value={identity.grammarPreferences}
              onChange={(e) => setIdentity(prev => ({ ...prev,  grammarPreferences: e.target.value }))}
              className="bg-gray-700 border-gray-600 text-white"
              placeholder="Specify grammar and style preferences..."
              rows={3}
            />
          )}
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
