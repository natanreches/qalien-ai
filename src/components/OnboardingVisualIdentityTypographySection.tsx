
import React, { useState } from 'react';
import { Type, Plus, X, Check, AlertTriangle, Trash2, Edit } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { FontSelectionModal } from './FontSelectionModal';

interface OnboardingVisualIdentityTypographySectionProps {
  typography: string[];
  extractedFromGuidelines: boolean;
  onAddTypography: () => void;
  onUpdateTypography: (index: number, font: string) => void;
  onRemoveTypography: (index: number) => void;
  onVerifyExtraction?: (isCorrect: boolean) => void;
  extractionVerified?: boolean;
  onClearExtracted?: () => void;
  onFontFileUpload?: (file: File) => void;
}

export const OnboardingVisualIdentityTypographySection = ({
  typography,
  extractedFromGuidelines,
  onAddTypography,
  onUpdateTypography,
  onRemoveTypography,
  onVerifyExtraction,
  extractionVerified,
  onClearExtracted,
  onFontFileUpload
}: OnboardingVisualIdentityTypographySectionProps) => {
  const [isFontModalOpen, setIsFontModalOpen] = useState(false);
  const [showAdjustMessage, setShowAdjustMessage] = useState(true);
  const canDeleteIndividual = extractedFromGuidelines && extractionVerified === false && showAdjustMessage;

  const handleFontSelect = (font: string) => {
    onUpdateTypography(typography.length, font);
    onAddTypography();
  };

  const handleFontFileUpload = (file: File) => {
    // Extract font name from file name (remove extension)
    const fontName = file.name.replace(/\.(woff|woff2|ttf|otf)$/i, '');
    onUpdateTypography(typography.length, fontName);
    onAddTypography();
    
    if (onFontFileUpload) {
      onFontFileUpload(file);
    }
  };

  const handleAddFontClick = () => {
    setIsFontModalOpen(true);
  };

  const handleDismissAdjustMessage = () => {
    setShowAdjustMessage(false);
    // Reset verification status to undefined to show the feedback prompt again
    if (onVerifyExtraction) {
      onVerifyExtraction(undefined as any);
    }
  };

  const handleEdit = () => {
    if (onVerifyExtraction) {
      onVerifyExtraction(undefined as any);
    }
  };

  // Reset showAdjustMessage when extractionVerified changes to false
  React.useEffect(() => {
    if (extractionVerified === false) {
      setShowAdjustMessage(true);
    }
  }, [extractionVerified]);

  return (
    <>
      <Card className="p-6 bg-gray-800 border-gray-700">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <Type className="h-5 w-5 mr-2 text-blue-400" />
            <h3 className="text-lg font-semibold text-white">Typography</h3>
          </div>
          {extractedFromGuidelines && (
            <Badge variant="secondary" className="bg-green-600 text-white">
              Auto-extracted
            </Badge>
          )}
        </div>
        
        {extractedFromGuidelines && extractionVerified === undefined && (
          <div className="mb-4 p-3 bg-blue-900/20 border border-blue-600/30 rounded-lg">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <AlertTriangle className="h-4 w-4 text-blue-400" />
                <span className="text-blue-400 text-sm font-medium">Are these typography selections correct?</span>
              </div>
              <div className="flex space-x-2">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => onVerifyExtraction?.(true)}
                  className="border-green-600 text-green-400 hover:bg-green-600/10"
                >
                  <Check className="h-3 w-3 mr-1" />
                  Yes
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => onVerifyExtraction?.(false)}
                  className="border-red-600 text-red-400 hover:bg-red-600/10"
                >
                  <X className="h-3 w-3 mr-1" />
                  No
                </Button>
              </div>
            </div>
          </div>
        )}
        
        {extractionVerified === true && (
          <div className="mb-4 p-3 bg-green-900/20 border border-green-600/30 rounded-lg">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Check className="h-4 w-4 text-green-500" />
                <span className="text-green-400 text-sm">Typography extraction verified as correct</span>
              </div>
              <Button
                size="sm"
                variant="outline"
                onClick={handleEdit}
                className="border-gray-600 text-gray-400 hover:bg-gray-600/10"
              >
                <Edit className="h-3 w-3 mr-1" />
                Edit
              </Button>
            </div>
          </div>
        )}
        
        {extractionVerified === false && showAdjustMessage && (
          <div className="mb-4 p-3 bg-red-900/20 border border-red-600/30 rounded-lg">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <X className="h-4 w-4 text-red-500" />
                <span className="text-red-400 text-sm">Please correct the typography below. You can remove incorrect fonts individually or clear all.</span>
              </div>
              <div className="flex space-x-2">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={onClearExtracted}
                  className="border-red-600 text-red-400 hover:bg-red-600/10"
                >
                  <Trash2 className="h-3 w-3 mr-1" />
                  Clear All
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={handleDismissAdjustMessage}
                  className="border-gray-600 text-gray-400 hover:bg-gray-600/10"
                >
                  <X className="h-3 w-3" />
                </Button>
              </div>
            </div>
          </div>
        )}
        
        <p className="text-gray-400 text-sm mb-4">
          Extracted font families and usage hierarchy (H1, body, CTA); allow edit
        </p>
        <div className="space-y-4">
          {typography.map((font, index) => (
            <div key={index} className="flex items-center space-x-2">
              <Input
                value={font}
                onChange={(e) => onUpdateTypography(index, e.target.value)}
                className="flex-1 bg-gray-700 border-gray-600 text-white"
                placeholder="Font name"
                disabled={extractedFromGuidelines && extractionVerified === true}
              />
              <Button
                variant="outline"
                size="sm"
                onClick={() => onRemoveTypography(index)}
                className={
                  canDeleteIndividual 
                    ? "text-red-400 border-red-600 hover:bg-red-600/10" 
                    : "text-red-400 border-gray-600"
                }
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          ))}
          <Button variant="outline" onClick={handleAddFontClick} className="border-gray-600 text-gray-300">
            <Plus className="h-4 w-4 mr-2" />
            Add Font
          </Button>
        </div>
      </Card>

      <FontSelectionModal
        open={isFontModalOpen}
        onOpenChange={setIsFontModalOpen}
        onFontSelect={handleFontSelect}
        onFontFileUpload={handleFontFileUpload}
      />
    </>
  );
};
