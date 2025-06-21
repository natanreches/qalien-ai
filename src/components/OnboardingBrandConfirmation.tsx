import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Palette, Type, Target, MessageSquare, CheckCircle, Edit3, Heart, Users, Lightbulb, BookOpen, Pen, Volume2, Image } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface BrandGuideline {
  id: string;
  name: string;
  description: string;
  file: File | null;
  uploadDate: string;
}

interface BrandElements {
  brandName: string;
  primaryColors: string[];
  fonts: string[];
  logoStyle: string;
  tone: string;
  targetAudience: string;
  // New verbal identity fields
  brandVoice: string;
  brandTone: string;
  coreMessaging: string;
  brandVocabulary: string;
  brandStyle: string;
  brandPronunciation: string;
}

interface OnboardingBrandConfirmationProps {
  guidelines: BrandGuideline[];
  brandElements: BrandElements;
  onBrandElementsConfirmed: (elements: BrandElements) => void;
}

export const OnboardingBrandConfirmation = ({
  guidelines,
  brandElements,
  onBrandElementsConfirmed
}: OnboardingBrandConfirmationProps) => {
  const [elements, setElements] = useState<BrandElements>({
    ...brandElements,
    brandVoice: brandElements.brandVoice || '',
    brandTone: brandElements.brandTone || '',
    coreMessaging: brandElements.coreMessaging || '',
    brandVocabulary: brandElements.brandVocabulary || '',
    brandStyle: brandElements.brandStyle || '',
    brandPronunciation: brandElements.brandPronunciation || ''
  });
  const [isEditingVisual, setIsEditingVisual] = useState(!brandElements.brandName);
  const [logoConfirmed, setLogoConfirmed] = useState(false);
  const { toast } = useToast();

  // Auto-extract brand elements from guidelines (mock implementation)
  useEffect(() => {
    if (guidelines.length > 0 && !brandElements.brandName) {
      // Mock extracted data - in real implementation, this would analyze the uploaded files
      const extractedElements: BrandElements = {
        brandName: 'Your Brand',
        primaryColors: ['#FF6B35', '#004E89', '#FFFFFF'],
        fonts: ['Helvetica Neue', 'Arial', 'Georgia'],
        logoStyle: 'Modern and clean with bold typography',
        tone: 'Professional yet approachable, confident and innovative',
        targetAudience: 'Young professionals aged 25-40',
        brandVoice: '',
        brandTone: '',
        coreMessaging: '',
        brandVocabulary: '',
        brandStyle: '',
        brandPronunciation: ''
      };
      setElements(extractedElements);
    }
  }, [guidelines, brandElements]);

  const handleSave = () => {
    onBrandElementsConfirmed(elements);
    setIsEditingVisual(false);
    
    // Show success toast
    toast({
      title: "Brand Profile Saved",
      description: "Your brand profile has been successfully saved.",
    });
  };

  const addColor = () => {
    setElements(prev => ({
      ...prev,
      primaryColors: [...prev.primaryColors, '#000000']
    }));
  };

  const updateColor = (index: number, color: string) => {
    setElements(prev => ({
      ...prev,
      primaryColors: prev.primaryColors.map((c, i) => i === index ? color : c)
    }));
  };

  const removeColor = (index: number) => {
    setElements(prev => ({
      ...prev,
      primaryColors: prev.primaryColors.filter((_, i) => i !== index)
    }));
  };

  const addFont = () => {
    setElements(prev => ({
      ...prev,
      fonts: [...prev.fonts, 'New Font']
    }));
  };

  const updateFont = (index: number, font: string) => {
    setElements(prev => ({
      ...prev,
      fonts: prev.fonts.map((f, i) => i === index ? font : f)
    }));
  };

  const removeFont = (index: number) => {
    setElements(prev => ({
      ...prev,
      fonts: prev.fonts.filter((_, i) => i !== index)
    }));
  };

  return (
    <div className="space-y-8">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-white mb-2">Help Us Get to Know Your Brand</h2>
        <p className="text-gray-400">
          We've analyzed your brand guidelines and extracted some key elements. Help us understand your brand's personality and voice.
        </p>
      </div>

      <div className="flex items-center space-x-2 mb-6">
        <CheckCircle className="h-5 w-5 text-green-500" />
        <span className="text-green-500 font-medium">
          Analyzed {guidelines.length} guideline{guidelines.length !== 1 ? 's' : ''}
        </span>
      </div>

      {/* Visual Brand Elements */}
      <Card className="p-6 bg-gray-800 border-gray-700">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-white flex items-center">
            <Palette className="h-5 w-5 mr-2" />
            Visual Brand Elements
          </h3>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsEditingVisual(!isEditingVisual)}
            className="border-gray-600 text-gray-300"
          >
            <Edit3 className="h-4 w-4 mr-2" />
            {isEditingVisual ? 'Save Changes' : 'Edit'}
          </Button>
        </div>

        {/* Logo Confirmation Section */}
        <div className="space-y-4 mb-6 p-4 border rounded-lg bg-gray-700 border-gray-600">
          <Label className="text-gray-200 flex items-center">
            <Image className="h-4 w-4 mr-2" />
            Brand Logo
          </Label>
          <p className="text-sm text-gray-400">
            We've extracted your logo from the uploaded brand guidelines. Please confirm this is correct.
          </p>
          
          <div className="flex items-center space-x-4">
            <div className="w-24 h-24 bg-gray-600 border-2 border-dashed border-gray-500 rounded-lg flex items-center justify-center">
              <div className="text-center">
                <Image className="h-8 w-8 mx-auto text-gray-400 mb-1" />
                <span className="text-xs text-gray-400">Logo Preview</span>
              </div>
            </div>
            
            <div className="flex-1 space-y-2">
              <div className="flex items-center space-x-2">
                <Button
                  variant={logoConfirmed ? "default" : "outline"}
                  size="sm"
                  onClick={() => setLogoConfirmed(true)}
                  className={logoConfirmed ? "bg-green-600 hover:bg-green-700" : "border-gray-600 text-gray-300"}
                >
                  <CheckCircle className="h-4 w-4 mr-2" />
                  This is correct
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="border-gray-600 text-gray-300"
                >
                  Upload different logo
                </Button>
              </div>
              {logoConfirmed && (
                <p className="text-sm text-green-400 flex items-center">
                  <CheckCircle className="h-3 w-3 mr-1" />
                  Logo confirmed
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Brand Name - single column now */}
        <div className="space-y-2 mb-6">
          <Label className="text-gray-200 flex items-center">
            <Target className="h-4 w-4 mr-2" />
            Brand Name
          </Label>
          {isEditingVisual ? (
            <Input
              value={elements.brandName}
              onChange={(e) => setElements(prev => ({ ...prev, brandName: e.target.value }))}
              className="bg-gray-700 border-gray-600 text-white"
              placeholder="Enter your brand name"
            />
          ) : (
            <p className="text-white bg-gray-700 p-3 rounded-lg">{elements.brandName}</p>
          )}
        </div>

        {/* Primary Colors */}
        <div className="space-y-2 mt-4">
          <Label className="text-gray-200 flex items-center">
            <Palette className="h-4 w-4 mr-2" />
            Primary Colors
          </Label>
          <div className="space-y-2">
            {elements.primaryColors.map((color, index) => (
              <div key={index} className="flex items-center space-x-2">
                <div
                  className="w-8 h-8 rounded border border-gray-600"
                  style={{ backgroundColor: color }}
                />
                {isEditingVisual ? (
                  <>
                    <Input
                      value={color}
                      onChange={(e) => updateColor(index, e.target.value)}
                      className="flex-1 bg-gray-700 border-gray-600 text-white"
                      placeholder="#000000"
                    />
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => removeColor(index)}
                      className="text-red-400 border-gray-600"
                    >
                      Remove
                    </Button>
                  </>
                ) : (
                  <span className="text-white">{color}</span>
                )}
              </div>
            ))}
            {isEditingVisual && (
              <Button variant="outline" onClick={addColor} className="border-gray-600 text-gray-300">
                Add Color
              </Button>
            )}
          </div>
        </div>

        {/* Fonts */}
        <div className="space-y-2 mt-4">
          <Label className="text-gray-200 flex items-center">
            <Type className="h-4 w-4 mr-2" />
            Brand Fonts
          </Label>
          <div className="space-y-2">
            {elements.fonts.map((font, index) => (
              <div key={index} className="flex items-center space-x-2">
                {isEditingVisual ? (
                  <>
                    <Input
                      value={font}
                      onChange={(e) => updateFont(index, e.target.value)}
                      className="flex-1 bg-gray-700 border-gray-600 text-white"
                      placeholder="Font name"
                    />
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => removeFont(index)}
                      className="text-red-400 border-gray-600"
                    >
                      Remove
                    </Button>
                  </>
                ) : (
                  <Badge variant="secondary" className="bg-gray-700 text-gray-200">
                    {font}
                  </Badge>
                )}
              </div>
            ))}
            {isEditingVisual && (
              <Button variant="outline" onClick={addFont} className="border-gray-600 text-gray-300">
                Add Font
              </Button>
            )}
          </div>
        </div>

        {/* Logo Style */}
        <div className="space-y-2 mt-4">
          <Label className="text-gray-200">Logo Style</Label>
          {isEditingVisual ? (
            <Textarea
              value={elements.logoStyle}
              onChange={(e) => setElements(prev => ({ ...prev, logoStyle: e.target.value }))}
              className="bg-gray-700 border-gray-600 text-white"
              placeholder="Describe your logo style..."
              rows={2}
            />
          ) : (
            <p className="text-white bg-gray-700 p-3 rounded-lg">{elements.logoStyle}</p>
          )}
        </div>

        {isEditingVisual && (
          <Button onClick={handleSave} className="w-full mt-4">
            Save Visual Elements
          </Button>
        )}
      </Card>

      <Separator className="bg-gray-700" />

      {/* Verbal Identity Section */}
      <Card className="p-6 bg-gray-800 border-gray-700">
        <h3 className="text-lg font-semibold text-white mb-6 flex items-center">
          <MessageSquare className="h-5 w-5 mr-2" />
          Verbal Identity & Brand Personality
        </h3>

        <div className="space-y-6">
          {/* Target Audience - Expanded Section */}
          <div className="space-y-4 p-4 border rounded-lg bg-gray-700 border-gray-600">
            <Label className="text-gray-200 flex items-center text-lg">
              <Users className="h-5 w-5 mr-2" />
              Target Audience
            </Label>
            <p className="text-sm text-gray-400 mb-4">
              Help us understand who you're trying to reach. Be as specific as possible about demographics, psychographics, behaviors, and needs.
            </p>

            {/* Primary Target Audience */}
            <div className="space-y-2">
              <Label className="text-gray-200 font-medium">Primary Target Audience</Label>
              <p className="text-sm text-gray-400">
                Your main audience - the people most likely to engage with and purchase from your brand.
              </p>
              <Textarea
                value={elements.targetAudience}
                onChange={(e) => setElements(prev => ({ ...prev, targetAudience: e.target.value }))}
                className="bg-gray-600 border-gray-500 text-white"
                placeholder="e.g., Working professionals aged 28-45, household income $75k+, tech-savvy, value efficiency and quality, live in urban/suburban areas, prioritize work-life balance..."
                rows={4}
              />
            </div>

            {/* Secondary Target Audience */}
            <div className="space-y-2">
              <Label className="text-gray-200 font-medium">Secondary Target Audience</Label>
              <p className="text-sm text-gray-400">
                Additional audience segments that are important to your brand but may not be your primary focus.
              </p>
              <Textarea
                value={elements.tone} // Using tone field temporarily for secondary audience
                onChange={(e) => setElements(prev => ({ ...prev, tone: e.target.value }))}
                className="bg-gray-600 border-gray-500 text-white"
                placeholder="e.g., Recent college graduates aged 22-28, early career professionals, price-conscious but brand-aware, social media active, aspiring to lifestyle of primary audience..."
                rows={3}
              />
            </div>

            {/* Other Audience Considerations */}
            <div className="space-y-2">
              <Label className="text-gray-200 font-medium">Other Audience Considerations</Label>
              <p className="text-sm text-gray-400">
                Any other audience segments, influencers, or stakeholders that impact your brand strategy.
              </p>
              <Textarea
                className="bg-gray-600 border-gray-500 text-white"
                placeholder="e.g., Industry influencers, decision-makers in partner companies, parents of primary audience, specific geographic markets, niche communities..."
                rows={3}
              />
            </div>
          </div>

          {/* Brand Pronunciation */}
          <div className="space-y-2">
            <Label className="text-gray-200 flex items-center">
              <Volume2 className="h-4 w-4 mr-2" />
              Brand Pronunciation
            </Label>
            <p className="text-sm text-gray-400 mb-2">
              How should your brand name be pronounced? (e.g., "Nike" is pronounced "NYE-kee", "Adidas" is "ah-DEE-das")
            </p>
            <Input
              value={elements.brandPronunciation}
              onChange={(e) => setElements(prev => ({ ...prev, brandPronunciation: e.target.value }))}
              className="bg-gray-700 border-gray-600 text-white"
              placeholder="Write the phonetic pronunciation of your brand name..."
            />
          </div>

          {/* Brand Voice */}
          <div className="space-y-2">
            <Label className="text-gray-200 flex items-center">
              <Heart className="h-4 w-4 mr-2" />
              Brand Voice
            </Label>
            <p className="text-sm text-gray-400 mb-2">
              How would you describe your brand's personality? (e.g., friendly, authoritative, playful, sophisticated)
            </p>
            <Textarea
              value={elements.brandVoice}
              onChange={(e) => setElements(prev => ({ ...prev, brandVoice: e.target.value }))}
              className="bg-gray-700 border-gray-600 text-white"
              placeholder="Describe your brand's voice and personality..."
              rows={3}
            />
          </div>

          {/* Brand Tone */}
          <div className="space-y-2">
            <Label className="text-gray-200 flex items-center">
              <Pen className="h-4 w-4 mr-2" />
              Brand Tone
            </Label>
            <p className="text-sm text-gray-400 mb-2">
              What tone does your brand use when communicating? (e.g., conversational, professional, casual, formal)
            </p>
            <Textarea
              value={elements.brandTone}
              onChange={(e) => setElements(prev => ({ ...prev, brandTone: e.target.value }))}
              className="bg-gray-700 border-gray-600 text-white"
              placeholder="Describe your brand's tone of communication..."
              rows={3}
            />
          </div>

          {/* Core Messaging */}
          <div className="space-y-2">
            <Label className="text-gray-200 flex items-center">
              <Lightbulb className="h-4 w-4 mr-2" />
              Core Messaging
            </Label>
            <p className="text-sm text-gray-400 mb-2">
              What are the key messages or value propositions your brand consistently communicates?
            </p>
            <Textarea
              value={elements.coreMessaging}
              onChange={(e) => setElements(prev => ({ ...prev, coreMessaging: e.target.value }))}
              className="bg-gray-700 border-gray-600 text-white"
              placeholder="List your brand's core messages and value propositions..."
              rows={4}
            />
          </div>

          {/* Brand Vocabulary */}
          <div className="space-y-2">
            <Label className="text-gray-200 flex items-center">
              <BookOpen className="h-4 w-4 mr-2" />
              Brand Vocabulary
            </Label>
            <p className="text-sm text-gray-400 mb-2">
              Are there specific words, phrases, or terminology your brand uses (or avoids)?
            </p>
            <Textarea
              value={elements.brandVocabulary}
              onChange={(e) => setElements(prev => ({ ...prev, brandVocabulary: e.target.value }))}
              className="bg-gray-700 border-gray-600 text-white"
              placeholder="List preferred words, phrases, or terminology guidelines..."
              rows={3}
            />
          </div>

          {/* Brand Style */}
          <div className="space-y-2">
            <Label className="text-gray-200 flex items-center">
              <Type className="h-4 w-4 mr-2" />
              Brand Writing Style
            </Label>
            <p className="text-sm text-gray-400 mb-2">
              How does your brand write? (e.g., sentence structure, punctuation preferences, use of emojis, capitalization)
            </p>
            <Textarea
              value={elements.brandStyle}
              onChange={(e) => setElements(prev => ({ ...prev, brandStyle: e.target.value }))}
              className="bg-gray-700 border-gray-600 text-white"
              placeholder="Describe your brand's writing style and preferences..."
              rows={3}
            />
          </div>
        </div>

        <Button onClick={handleSave} className="w-full mt-6">
          Save Brand Profile
        </Button>
      </Card>
    </div>
  );
};
