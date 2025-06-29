
import React, { useState } from 'react';
import { Palette, Plus, X, CheckCircle, AlertCircle, Check, AlertTriangle, Edit, Trash2 } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ColorSelectionModal } from './ColorSelectionModal';
import { ClearAllConfirmationDialog } from './ClearAllConfirmationDialog';

interface OnboardingVisualIdentityColorSectionProps {
  colorPalette: string[];
  extractedFromGuidelines: boolean;
  onAddColor: () => void;
  onUpdateColor: (index: number, color: string) => void;
  onRemoveColor: (index: number) => void;
  onVerifyExtraction?: (isCorrect: boolean) => void;
  extractionVerified?: boolean;
  onClearExtracted?: () => void;
}

export const OnboardingVisualIdentityColorSection = ({
  colorPalette,
  extractedFromGuidelines,
  onAddColor,
  onUpdateColor,
  onRemoveColor,
  onVerifyExtraction,
  extractionVerified,
  onClearExtracted
}: OnboardingVisualIdentityColorSectionProps) => {
  const [isColorModalOpen, setIsColorModalOpen] = useState(false);
  const [showAdjustMessage, setShowAdjustMessage] = useState(true);
  const [showClearConfirmation, setShowClearConfirmation] = useState(false);
  const canDeleteIndividual = extractedFromGuidelines && extractionVerified === false && showAdjustMessage;

  const handleColorSelect = (color: string) => {
    onUpdateColor(colorPalette.length, color);
    onAddColor();
  };

  const handleAddColorClick = () => {
    setIsColorModalOpen(true);
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

  const handleClearAllClick = () => {
    setShowClearConfirmation(true);
  };

  const handleConfirmClear = () => {
    if (onClearExtracted) {
      onClearExtracted();
    }
  };

  const handleFinish = () => {
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
            <Palette className="h-5 w-5 mr-2 text-blue-400" />
            <h3 className="text-lg font-semibold text-white">Color Palette</h3>
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
                <span className="text-blue-400 text-sm font-medium">Are these colors correct?</span>
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
                <span className="text-green-400 text-sm">Extraction verified as correct</span>
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
                <span className="text-red-400 text-sm">Please adjust the color palette below. You can remove incorrect colors individually or clear all.</span>
              </div>
              <div className="flex space-x-2">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={handleClearAllClick}
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

        {extractedFromGuidelines && extractionVerified === false && !showAdjustMessage && colorPalette.length > 0 && (
          <div className="mb-4 p-3 bg-blue-900/20 border border-blue-600/30 rounded-lg">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-4 w-4 text-blue-400" />
                <span className="text-blue-400 text-sm">Ready to confirm your color palette?</span>
              </div>
              <Button
                size="sm"
                variant="outline"
                onClick={handleFinish}
                className="border-blue-600 text-blue-400 hover:bg-blue-600/10"
              >
                <CheckCircle className="h-3 w-3 mr-1" />
                Finish
              </Button>
            </div>
          </div>
        )}

        {extractedFromGuidelines ? (
          <div className="flex items-start space-x-2 mb-4 p-3 bg-green-900/20 border border-green-600/30 rounded-lg">
            <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
            <div>
              <p className="text-green-400 text-sm font-medium">Based on your brand guidelines</p>
              <p className="text-gray-300 text-sm">Color palette has been automatically extracted from your uploaded brand documents.</p>
            </div>
          </div>
        ) : (
          <div className="flex items-start space-x-2 mb-4 p-3 bg-orange-900/20 border border-orange-600/30 rounded-lg">
            <AlertCircle className="h-5 w-5 text-orange-500 mt-0.5 flex-shrink-0" />
            <div>
              <p className="text-orange-400 text-sm font-medium">Colors not found in brand guidelines</p>
              <p className="text-gray-300 text-sm">Please add your brand colors manually using HEX or RGB values.</p>
            </div>
          </div>
        )}

        <div className="space-y-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {colorPalette.map((color, index) => (
              <div key={index} className="space-y-2">
                <div
                  className="w-full h-16 rounded border border-gray-600"
                  style={{ backgroundColor: color }}
                />
                <div className="flex items-center space-x-2">
                  <Input
                    value={color}
                    onChange={(e) => onUpdateColor(index, e.target.value)}
                    className="bg-gray-700 border-gray-600 text-white text-xs"
                    disabled={extractedFromGuidelines && extractionVerified === true}
                  />
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onRemoveColor(index)}
                    className={`p-1 ${
                      canDeleteIndividual 
                        ? "text-red-400 border-red-600 hover:bg-red-600/10" 
                        : "text-red-400 border-gray-600"
                    }`}
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </div>
                {extractedFromGuidelines && (
                  <Badge variant="secondary" className="text-xs bg-green-600 text-white w-full justify-center">
                    Extracted
                  </Badge>
                )}
              </div>
            ))}
          </div>
          <Button variant="outline" onClick={handleAddColorClick} className="border-gray-600 text-gray-300">
            <Plus className="h-4 w-4 mr-2" />
            Add Color
          </Button>
        </div>
      </Card>

      <ColorSelectionModal
        open={isColorModalOpen}
        onOpenChange={setIsColorModalOpen}
        onColorSelect={handleColorSelect}
      />

      <ClearAllConfirmationDialog
        open={showClearConfirmation}
        onOpenChange={setShowClearConfirmation}
        onConfirm={handleConfirmClear}
        title="Clear All Colors"
        description="Are you sure you want to clear all colors from the palette? This action cannot be undone."
      />
    </>
  );
};
