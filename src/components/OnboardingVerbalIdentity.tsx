import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { MessageSquare, Upload, Globe, Type, FileText, AlertTriangle, X } from 'lucide-react';

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
  const [localizationEnabled, setLocalizationEnabled] = useState(false);
  const [grammarEnabled, setGrammarEnabled] = useState(false);
  
  // Localization states
  const [selectedLanguages, setSelectedLanguages] = useState<string[]>([]);
  const [uploadedTaglines, setUploadedTaglines] = useState<File[]>([]);
  
  // Grammar preference states
  const [spellingPreference, setSpellingPreference] = useState<'american' | 'british'>('american');
  const [oxfordComma, setOxfordComma] = useState(true);
  const [dateFormat, setDateFormat] = useState<'us' | 'international'>('us');
  const [numberFormat, setNumberFormat] = useState<'us' | 'international'>('us');

  const availableLanguages = [
    'Spanish', 'French', 'German', 'Italian', 'Portuguese', 'Dutch',
    'Chinese (Simplified)', 'Chinese (Traditional)', 'Japanese', 'Korean',
    'Arabic', 'Russian', 'Hindi', 'Swedish', 'Norwegian', 'Danish'
  ];

  // Update parent state whenever identity changes
  useEffect(() => {
    console.log('Updating parent with identity:', identity);
    onVerbalIdentityUpdated(identity);
  }, [identity, onVerbalIdentityUpdated]);

  const handleToneOfVoiceChange = (value: string) => {
    console.log('Tone of voice changed to:', value);
    setIdentity(prev => ({ ...prev, toneOfVoice: value }));
  };

  const handleLanguageToggle = (language: string) => {
    const newLanguages = selectedLanguages.includes(language)
      ? selectedLanguages.filter(l => l !== language)
      : [...selectedLanguages, language];
    
    setSelectedLanguages(newLanguages);
  };

  const handleTaglineUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    setUploadedTaglines(prev => [...prev, ...files]);
  };

  const removeTaglineFile = (index: number) => {
    setUploadedTaglines(prev => prev.filter((_, i) => i !== index));
  };

  const updateGrammarPreferences = () => {
    const preferences = {
      spelling: spellingPreference,
      oxfordComma,
      dateFormat,
      numberFormat,
      selectedLanguages: selectedLanguages.join(', ')
    };
    
    setIdentity(prev => ({ 
      ...prev, 
      grammarPreferences: JSON.stringify(preferences),
      localizationRules: selectedLanguages.length > 0 ? `Approved languages: ${selectedLanguages.join(', ')}` : ''
    }));
  };

  useEffect(() => {
    updateGrammarPreferences();
  }, [spellingPreference, oxfordComma, dateFormat, numberFormat, selectedLanguages]);

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

        {/* Localization Rules */}
        <Card className="p-6 bg-gray-800 border-gray-700">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center">
              <Globe className="h-5 w-5 mr-2 text-purple-400" />
              <h3 className="text-lg font-semibold text-white">Localization Preferences</h3>
            </div>
            <Switch
              checked={localizationEnabled}
              onCheckedChange={setLocalizationEnabled}
            />
          </div>
          <p className="text-gray-400 text-sm mb-4">
            Select approved languages and upload translated taglines
          </p>
          
          {localizationEnabled && (
            <div className="space-y-6">
              {/* Language Selection */}
              <div className="space-y-3">
                <Label className="text-gray-200">Select Approved Languages</Label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                  {availableLanguages.map((language) => (
                    <div
                      key={language}
                      className={`flex items-center space-x-2 p-2 rounded-lg border cursor-pointer transition-colors ${
                        selectedLanguages.includes(language)
                          ? 'bg-purple-600 border-purple-500'
                          : 'bg-gray-700 border-gray-600 hover:border-gray-500'
                      }`}
                      onClick={() => handleLanguageToggle(language)}
                    >
                      <Checkbox
                        checked={selectedLanguages.includes(language)}
                        className="pointer-events-none"
                      />
                      <span className="text-white text-xs">{language}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Selected Languages Display */}
              {selectedLanguages.length > 0 && (
                <div className="space-y-2">
                  <Label className="text-gray-200">Selected Languages</Label>
                  <div className="flex flex-wrap gap-2">
                    {selectedLanguages.map((language, index) => (
                      <Badge key={index} variant="secondary" className="bg-purple-100 text-purple-800">
                        {language}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}

              {/* Translated Taglines Upload */}
              <div className="space-y-3">
                <Label className="text-gray-200">Upload Translated Taglines</Label>
                <div className="border-2 border-dashed border-gray-600 rounded-lg p-4 text-center">
                  <Upload className="h-6 w-6 mx-auto text-gray-400 mb-2" />
                  <p className="text-gray-400 text-sm mb-2">Upload translated tagline files</p>
                  <input
                    type="file"
                    multiple
                    accept=".txt,.doc,.docx,.pdf"
                    onChange={handleTaglineUpload}
                    className="hidden"
                    id="tagline-upload"
                  />
                  <Button 
                    variant="outline" 
                    className="border-gray-600 text-gray-300"
                    onClick={() => document.getElementById('tagline-upload')?.click()}
                  >
                    Choose Files
                  </Button>
                </div>

                {/* Uploaded Files Display */}
                {uploadedTaglines.length > 0 && (
                  <div className="space-y-2">
                    <Label className="text-gray-200">Uploaded Files</Label>
                    <div className="space-y-2">
                      {uploadedTaglines.map((file, index) => (
                        <div key={index} className="flex items-center justify-between p-2 bg-gray-700 rounded-lg">
                          <span className="text-white text-sm">{file.name}</span>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => removeTaglineFile(index)}
                            className="text-red-400 hover:text-red-300"
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
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
            Set your preferred grammar and style conventions
          </p>
          
          {grammarEnabled && (
            <div className="space-y-6">
              {/* Spelling Preference */}
              <div className="space-y-3">
                <Label className="text-gray-200">Spelling Convention</Label>
                <div className="flex space-x-4">
                  <div
                    className={`flex items-center space-x-2 p-3 rounded-lg border cursor-pointer transition-colors ${
                      spellingPreference === 'american'
                        ? 'bg-purple-600 border-purple-500'
                        : 'bg-gray-700 border-gray-600 hover:border-gray-500'
                    }`}
                    onClick={() => setSpellingPreference('american')}
                  >
                    <div className={`w-4 h-4 rounded-full border-2 ${
                      spellingPreference === 'american' ? 'bg-white border-white' : 'border-gray-400'
                    }`} />
                    <span className="text-white">American English</span>
                  </div>
                  <div
                    className={`flex items-center space-x-2 p-3 rounded-lg border cursor-pointer transition-colors ${
                      spellingPreference === 'british'
                        ? 'bg-purple-600 border-purple-500'
                        : 'bg-gray-700 border-gray-600 hover:border-gray-500'
                    }`}
                    onClick={() => setSpellingPreference('british')}
                  >
                    <div className={`w-4 h-4 rounded-full border-2 ${
                      spellingPreference === 'british' ? 'bg-white border-white' : 'border-gray-400'
                    }`} />
                    <span className="text-white">British English</span>
                  </div>
                </div>
              </div>

              {/* Oxford Comma */}
              <div className="flex items-center justify-between p-4 bg-gray-700 rounded-lg">
                <div>
                  <Label className="text-gray-200">Oxford Comma</Label>
                  <p className="text-gray-400 text-sm">Use serial comma in lists (A, B, and C)</p>
                </div>
                <Switch
                  checked={oxfordComma}
                  onCheckedChange={setOxfordComma}
                />
              </div>

              {/* Date Format */}
              <div className="space-y-3">
                <Label className="text-gray-200">Date Format</Label>
                <div className="flex space-x-4">
                  <div
                    className={`flex items-center space-x-2 p-3 rounded-lg border cursor-pointer transition-colors ${
                      dateFormat === 'us'
                        ? 'bg-purple-600 border-purple-500'
                        : 'bg-gray-700 border-gray-600 hover:border-gray-500'
                    }`}
                    onClick={() => setDateFormat('us')}
                  >
                    <div className={`w-4 h-4 rounded-full border-2 ${
                      dateFormat === 'us' ? 'bg-white border-white' : 'border-gray-400'
                    }`} />
                    <span className="text-white">US (MM/DD/YYYY)</span>
                  </div>
                  <div
                    className={`flex items-center space-x-2 p-3 rounded-lg border cursor-pointer transition-colors ${
                      dateFormat === 'international'
                        ? 'bg-purple-600 border-purple-500'
                        : 'bg-gray-700 border-gray-600 hover:border-gray-500'
                    }`}
                    onClick={() => setDateFormat('international')}
                  >
                    <div className={`w-4 h-4 rounded-full border-2 ${
                      dateFormat === 'international' ? 'bg-white border-white' : 'border-gray-400'
                    }`} />
                    <span className="text-white">International (DD/MM/YYYY)</span>
                  </div>
                </div>
              </div>

              {/* Number Format */}
              <div className="space-y-3">
                <Label className="text-gray-200">Number Format</Label>
                <div className="flex space-x-4">
                  <div
                    className={`flex items-center space-x-2 p-3 rounded-lg border cursor-pointer transition-colors ${
                      numberFormat === 'us'
                        ? 'bg-purple-600 border-purple-500'
                        : 'bg-gray-700 border-gray-600 hover:border-gray-500'
                    }`}
                    onClick={() => setNumberFormat('us')}
                  >
                    <div className={`w-4 h-4 rounded-full border-2 ${
                      numberFormat === 'us' ? 'bg-white border-white' : 'border-gray-400'
                    }`} />
                    <span className="text-white">US (1,000.50)</span>
                  </div>
                  <div
                    className={`flex items-center space-x-2 p-3 rounded-lg border cursor-pointer transition-colors ${
                      numberFormat === 'international'
                        ? 'bg-purple-600 border-purple-500'
                        : 'bg-gray-700 border-gray-600 hover:border-gray-500'
                    }`}
                    onClick={() => setNumberFormat('international')}
                  >
                    <div className={`w-4 h-4 rounded-full border-2 ${
                      numberFormat === 'international' ? 'bg-white border-white' : 'border-gray-400'
                    }`} />
                    <span className="text-white">International (1.000,50)</span>
                  </div>
                </div>
              </div>
            </div>
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
