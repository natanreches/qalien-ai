import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { MessageSquare, Upload, FileText, AlertTriangle, Wand2, Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface VerbalIdentity {
  toneOfVoice: string;
  brandVocabulary: string;
  prohibitedWords: string;
  claimsDisclosures: string;
  localizationRules: string;
  grammarPreferences: string;
}

interface BrandGuideline {
  id: string;
  name: string;
  description: string;
  file: File | null;
  uploadDate: string;
  brandName?: string;
}

interface OnboardingVerbalIdentityProps {
  verbalIdentity: VerbalIdentity;
  onVerbalIdentityUpdated: (identity: VerbalIdentity) => void;
  guidelines?: BrandGuideline[];
}

export const OnboardingVerbalIdentity = ({
  verbalIdentity,
  onVerbalIdentityUpdated,
  guidelines = []
}: OnboardingVerbalIdentityProps) => {
  const [identity, setIdentity] = useState<VerbalIdentity>(verbalIdentity);
  const [isExtracting, setIsExtracting] = useState(false);
  const { toast } = useToast();

  // Update parent state whenever identity changes
  useEffect(() => {
    console.log('Updating parent with identity:', identity);
    onVerbalIdentityUpdated(identity);
  }, [identity, onVerbalIdentityUpdated]);

  const extractVocabularyFromText = (text: string): string[] => {
    // Simple extraction logic - look for common vocabulary patterns
    const patterns = [
      // Brand names and product names (capitalized words)
      /\b[A-Z][a-zA-Z]+(?:\s+[A-Z][a-zA-Z]+)*\b/g,
      // Quoted phrases
      /"([^"]+)"/g,
      // Taglines and slogans (often end with trademark symbols)
      /([^.!?]+[™®℠])/g,
      // Emphasized terms (often in bold or italics markers)
      /\*\*([^*]+)\*\*/g,
      /\*([^*]+)\*/g,
    ];

    const extractedTerms = new Set<string>();
    
    patterns.forEach(pattern => {
      const matches = text.match(pattern);
      if (matches) {
        matches.forEach(match => {
          // Clean up the match
          const cleaned = match.replace(/[™®℠"*]/g, '').trim();
          if (cleaned.length > 2 && cleaned.length < 50) {
            extractedTerms.add(cleaned);
          }
        });
      }
    });

    // Filter out common words
    const commonWords = ['the', 'and', 'or', 'but', 'in', 'on', 'at', 'to', 'for', 'of', 'with', 'by'];
    return Array.from(extractedTerms).filter(term => 
      !commonWords.includes(term.toLowerCase()) && 
      term.split(' ').length <= 3 // Max 3 words
    );
  };

  const handleAutoExtractVocabulary = async () => {
    if (guidelines.length === 0) {
      toast({
        title: "No guidelines found",
        description: "Please upload brand guidelines first to auto-extract vocabulary.",
        variant: "destructive"
      });
      return;
    }

    setIsExtracting(true);
    
    try {
      const extractedTerms = new Set<string>();
      
      // Process each guideline file
      for (const guideline of guidelines) {
        if (guideline.file) {
          try {
            const text = await guideline.file.text();
            const terms = extractVocabularyFromText(text);
            terms.forEach(term => extractedTerms.add(term));
          } catch (error) {
            console.log(`Could not extract text from ${guideline.name}:`, error);
            // For non-text files, we'll skip extraction
          }
        }
      }

      if (extractedTerms.size > 0) {
        const vocabularyText = Array.from(extractedTerms).slice(0, 50).join(', ');
        const updatedIdentity = {
          ...identity,
          brandVocabulary: identity.brandVocabulary 
            ? `${identity.brandVocabulary}\n\n--- Auto-extracted terms ---\n${vocabularyText}`
            : vocabularyText
        };
        setIdentity(updatedIdentity);
        
        toast({
          title: "Vocabulary extracted",
          description: `Found ${extractedTerms.size} potential brand terms from your guidelines.`,
        });
      } else {
        toast({
          title: "No vocabulary found",
          description: "Could not extract vocabulary from the uploaded guidelines. Please enter terms manually.",
          variant: "destructive"
        });
      }
    } catch (error) {
      console.error('Error extracting vocabulary:', error);
      toast({
        title: "Extraction failed",
        description: "There was an error extracting vocabulary. Please enter terms manually.",
        variant: "destructive"
      });
    } finally {
      setIsExtracting(false);
    }
  };

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

  const handleSave = () => {
    console.log('Save button clicked, calling toast...');
    console.log('Saving identity:', identity);
    onVerbalIdentityUpdated(identity);
    
    // Show success toast
    const toastResult = toast({
      title: "Verbal Identity Saved",
      description: "Your brand's verbal identity settings have been successfully saved.",
    });
    console.log('Toast called with result:', toastResult);
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
            {/* Auto-extract button */}
            {guidelines.length > 0 && (
              <div className="flex items-center justify-between p-3 bg-blue-900/20 border border-blue-700 rounded-lg">
                <div className="flex items-center space-x-2">
                  <Wand2 className="h-4 w-4 text-blue-400" />
                  <span className="text-blue-300 text-sm">
                    Auto-extract vocabulary from your uploaded brand guidelines
                  </span>
                </div>
                <Button 
                  onClick={handleAutoExtractVocabulary}
                  disabled={isExtracting}
                  variant="outline"
                  size="sm"
                  className="border-blue-600 text-blue-300"
                >
                  {isExtracting ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      Extracting...
                    </>
                  ) : (
                    <>
                      <Wand2 className="h-4 w-4 mr-2" />
                      Auto Extract
                    </>
                  )}
                </Button>
              </div>
            )}

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
              rows={6}
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
      </div>

      <Button onClick={handleSave} className="w-full">
        Save Verbal Identity
      </Button>
    </div>
  );
};
