
import React, { useState } from 'react';
import { Layout, Upload, CheckCircle, AlertCircle, Check, X, AlertTriangle, Edit, Trash2 } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ClearAllConfirmationDialog } from './ClearAllConfirmationDialog';

interface OnboardingVisualIdentityIconographySectionProps {
  iconography: File[];
  extractionStatus: boolean;
  onFileUpload: (files: FileList | null) => void;
  onVerifyExtraction?: (isCorrect: boolean) => void;
  extractionVerified?: boolean;
  onClearExtracted?: () => void;
}

export const OnboardingVisualIdentityIconographySection = ({
  iconography,
  extractionStatus,
  onFileUpload,
  onVerifyExtraction,
  extractionVerified,
  onClearExtracted
}: OnboardingVisualIdentityIconographySectionProps) => {
  const [showAdjustMessage, setShowAdjustMessage] = useState(true);
  const [showClearConfirmation, setShowClearConfirmation] = useState(false);

  const handleDismissAdjustMessage = () => {
    setShowAdjustMessage(false);
    // Reset verification status to show the feedback prompt again
    onVerifyExtraction?.(undefined as any);
  };

  const handleEdit = () => {
    onVerifyExtraction?.(undefined as any);
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
    onVerifyExtraction?.(undefined as any);
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
            <Layout className="h-5 w-5 mr-2 text-blue-400" />
            <h3 className="text-lg font-semibold text-white">Iconography / Graphic Elements</h3>
          </div>
          {extractionStatus && (
            <Badge variant="secondary" className="bg-green-600 text-white">
              Auto-extracted
            </Badge>
          )}
        </div>

        {extractionStatus && extractionVerified === undefined && (
          <div className="mb-4 p-3 bg-blue-900/20 border border-blue-600/30 rounded-lg">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <AlertTriangle className="h-4 w-4 text-blue-400" />
                <span className="text-blue-400 text-sm font-medium">Are these iconography elements correct?</span>
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
                <span className="text-red-400 text-sm">Please adjust the iconography below to match your requirements</span>
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

        {extractionStatus && extractionVerified === false && !showAdjustMessage && iconography.length > 0 && (
          <div className="mb-4 p-3 bg-blue-900/20 border border-blue-600/30 rounded-lg">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-4 w-4 text-blue-400" />
                <span className="text-blue-400 text-sm">Ready to confirm your iconography elements?</span>
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

        {extractionStatus ? (
          <div className="flex items-start space-x-2 mb-4 p-3 bg-green-900/20 border border-green-600/30 rounded-lg">
            <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
            <div>
              <p className="text-green-400 text-sm font-medium">Based on your brand guidelines</p>
              <p className="text-gray-300 text-sm">Iconography and graphic elements have been automatically extracted from your uploaded brand documents.</p>
            </div>
          </div>
        ) : (
          <div className="flex items-start space-x-2 mb-4 p-3 bg-orange-900/20 border border-orange-600/30 rounded-lg">
            <AlertCircle className="h-5 w-5 text-orange-500 mt-0.5 flex-shrink-0" />
            <div>
              <p className="text-orange-400 text-sm font-medium">Element not found in brand guidelines</p>
              <p className="text-gray-300 text-sm">Please upload icon packs, graphic treatments, or watermark files.</p>
            </div>
          </div>
        )}

        {extractionStatus && iconography.length > 0 && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            {iconography.map((file, index) => (
              <div key={index} className="text-center">
                <div className="w-full h-20 bg-gray-700 rounded border flex items-center justify-center mb-2">
                  <Layout className="h-8 w-8 text-gray-400" />
                </div>
                <p className="text-xs text-gray-400 truncate">{file.name}</p>
                <Badge variant="secondary" className="mt-1 text-xs bg-green-600 text-white">
                  Extracted
                </Badge>
              </div>
            ))}
          </div>
        )}

        <div className="border-2 border-dashed border-gray-600 rounded-lg p-6 text-center">
          <Upload className="h-8 w-8 mx-auto text-gray-400 mb-2" />
          <p className="text-gray-400 mb-2">
            {extractionStatus 
              ? 'Upload additional iconography files (optional)'
              : 'Upload iconography files'
            }
          </p>
          <input
            type="file"
            multiple
            accept="image/*"
            onChange={(e) => onFileUpload(e.target.files)}
            className="hidden"
            id="iconography-upload"
          />
          <Button
            variant="outline"
            onClick={() => document.getElementById('iconography-upload')?.click()}
            className="border-gray-600 text-gray-300"
          >
            Choose Files
          </Button>
        </div>

        {!extractionStatus && iconography.length > 0 && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
            {iconography.map((file, index) => (
              <div key={index} className="text-center">
                <div className="w-full h-20 bg-gray-700 rounded border flex items-center justify-center mb-2">
                  <Layout className="h-8 w-8 text-gray-400" />
                </div>
                <p className="text-xs text-gray-400 truncate">{file.name}</p>
              </div>
            ))}
          </div>
        )}
      </Card>

      <ClearAllConfirmationDialog
        open={showClearConfirmation}
        onOpenChange={setShowClearConfirmation}
        onConfirm={handleConfirmClear}
        title="Clear All Iconography"
        description="Are you sure you want to clear all iconography elements? This action cannot be undone."
      />
    </>
  );
};
