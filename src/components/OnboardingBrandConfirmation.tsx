
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Palette, Type, Target, MessageSquare, CheckCircle, Edit3 } from 'lucide-react';

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
  const [elements, setElements] = useState<BrandElements>(brandElements);
  const [isEditing, setIsEditing] = useState(!brandElements.brandName);

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
        targetAudience: 'Young professionals aged 25-40'
      };
      setElements(extractedElements);
      onBrandElementsConfirmed(extractedElements);
    }
  }, [guidelines, brandElements, onBrandElementsConfirmed]);

  const handleSave = () => {
    onBrandElementsConfirmed(elements);
    setIsEditing(false);
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
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-white mb-2">Confirm Brand Elements</h2>
        <p className="text-gray-400">
          We've analyzed your brand guidelines. Please review and confirm these brand elements.
        </p>
      </div>

      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <CheckCircle className="h-5 w-5 text-green-500" />
          <span className="text-green-500 font-medium">
            Analyzed {guidelines.length} guideline{guidelines.length !== 1 ? 's' : ''}
          </span>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={() => setIsEditing(!isEditing)}
          className="border-gray-600 text-gray-300"
        >
          <Edit3 className="h-4 w-4 mr-2" />
          {isEditing ? 'Cancel Edit' : 'Edit Elements'}
        </Button>
      </div>

      <div className="space-y-6">
        {/* Brand Name */}
        <div className="space-y-2">
          <Label className="text-gray-200 flex items-center">
            <Target className="h-4 w-4 mr-2" />
            Brand Name
          </Label>
          {isEditing ? (
            <Input
              value={elements.brandName}
              onChange={(e) => setElements(prev => ({ ...prev, brandName: e.target.value }))}
              className="bg-gray-800 border-gray-600 text-white"
              placeholder="Enter your brand name"
            />
          ) : (
            <p className="text-white bg-gray-700 p-3 rounded-lg">{elements.brandName}</p>
          )}
        </div>

        {/* Primary Colors */}
        <div className="space-y-2">
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
                {isEditing ? (
                  <>
                    <Input
                      value={color}
                      onChange={(e) => updateColor(index, e.target.value)}
                      className="flex-1 bg-gray-800 border-gray-600 text-white"
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
            {isEditing && (
              <Button variant="outline" onClick={addColor} className="border-gray-600 text-gray-300">
                Add Color
              </Button>
            )}
          </div>
        </div>

        {/* Fonts */}
        <div className="space-y-2">
          <Label className="text-gray-200 flex items-center">
            <Type className="h-4 w-4 mr-2" />
            Brand Fonts
          </Label>
          <div className="space-y-2">
            {elements.fonts.map((font, index) => (
              <div key={index} className="flex items-center space-x-2">
                {isEditing ? (
                  <>
                    <Input
                      value={font}
                      onChange={(e) => updateFont(index, e.target.value)}
                      className="flex-1 bg-gray-800 border-gray-600 text-white"
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
            {isEditing && (
              <Button variant="outline" onClick={addFont} className="border-gray-600 text-gray-300">
                Add Font
              </Button>
            )}
          </div>
        </div>

        {/* Logo Style */}
        <div className="space-y-2">
          <Label className="text-gray-200">Logo Style</Label>
          {isEditing ? (
            <Textarea
              value={elements.logoStyle}
              onChange={(e) => setElements(prev => ({ ...prev, logoStyle: e.target.value }))}
              className="bg-gray-800 border-gray-600 text-white"
              placeholder="Describe your logo style..."
              rows={2}
            />
          ) : (
            <p className="text-white bg-gray-700 p-3 rounded-lg">{elements.logoStyle}</p>
          )}
        </div>

        {/* Brand Tone */}
        <div className="space-y-2">
          <Label className="text-gray-200 flex items-center">
            <MessageSquare className="h-4 w-4 mr-2" />
            Brand Tone & Voice
          </Label>
          {isEditing ? (
            <Textarea
              value={elements.tone}
              onChange={(e) => setElements(prev => ({ ...prev, tone: e.target.value }))}
              className="bg-gray-800 border-gray-600 text-white"
              placeholder="Describe your brand's tone and voice..."
              rows={2}
            />
          ) : (
            <p className="text-white bg-gray-700 p-3 rounded-lg">{elements.tone}</p>
          )}
        </div>

        {/* Target Audience */}
        <div className="space-y-2">
          <Label className="text-gray-200 flex items-center">
            <Target className="h-4 w-4 mr-2" />
            Target Audience
          </Label>
          {isEditing ? (
            <Textarea
              value={elements.targetAudience}
              onChange={(e) => setElements(prev => ({ ...prev, targetAudience: e.target.value }))}
              className="bg-gray-800 border-gray-600 text-white"
              placeholder="Describe your target audience..."
              rows={2}
            />
          ) : (
            <p className="text-white bg-gray-700 p-3 rounded-lg">{elements.targetAudience}</p>
          )}
        </div>

        {isEditing && (
          <Button onClick={handleSave} className="w-full">
            Save Brand Elements
          </Button>
        )}
      </div>
    </div>
  );
};
