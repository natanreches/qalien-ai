
import React, { useState } from 'react';
import { Camera, Upload, CheckCircle, AlertCircle, Check, X, AlertTriangle } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Separator } from '@/components/ui/separator';

interface OnboardingVisualIdentityPhotographySectionProps {
  photographyStyle: string;
  photographyFiles: File[];
  extractionStatus: boolean;
  onPhotographyStyleChange: (style: string) => void;
  onFileUpload: (files: FileList | null) => void;
  onVerifyExtraction?: (isCorrect: boolean) => void;
  extractionVerified?: boolean;
  onClearExtracted?: () => void;
}

export const OnboardingVisualIdentityPhotographySection = ({
  photographyStyle,
  photographyFiles,
  extractionStatus,
  onPhotographyStyleChange,
  onFileUpload,
  onVerifyExtraction,
  extractionVerified,
  onClearExtracted
}: OnboardingVisualIdentityPhotographySectionProps) => {
  const [showAdjustMessage, setShowAdjustMessage] = useState(true);

  const handleDismissAdjustMessage = () => {
    setShowAdjustMessage(false);
    // Reset verification status to show the feedback prompt again
    onVerifyExtraction?.(undefined as any);
  };

  return (
    <Card className="p-6 bg-gray-800 border-gray-700">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center">
          <Camera className="h-5 w-5 mr-2 text-blue-400" />
          <h3 className="text-lg font-semibold text-white">Photography Style</h3>
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
              <span className="text-blue-400 text-sm font-medium">Is this photography style correct?</span>
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
        <div className="mb-4 p-2 bg-green-900/20 border border-green-600/30 rounded-lg">
          <div className="flex items-center space-x-2">
            <Check className="h-4 w-4 text-green-500" />
            <span className="text-green-400 text-sm">Extraction verified as correct</span>
          </div>
        </div>
      )}

      {extractionVerified === false && showAdjustMessage && (
        <div className="mb-4 p-3 bg-red-900/20 border border-red-600/30 rounded-lg">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <X className="h-4 w-4 text-red-500" />
              <span className="text-red-400 text-sm">Please adjust the content below to match your requirements</span>
            </div>
            <div className="flex space-x-2">
              <Button
                size="sm"
                variant="outline"
                onClick={onClearExtracted}
                className="border-red-600 text-red-400 hover:bg-red-600/10"
              >
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

      {extractionStatus ? (
        <div className="flex items-start space-x-2 mb-4 p-3 bg-green-900/20 border border-green-600/30 rounded-lg">
          <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
          <div>
            <p className="text-green-400 text-sm font-medium">Based on your brand guidelines</p>
            <p className="text-gray-300 text-sm">Photography style guidelines have been automatically extracted from your uploaded brand documents.</p>
          </div>
        </div>
      ) : (
        <div className="flex items-start space-x-2 mb-4 p-3 bg-orange-900/20 border border-orange-600/30 rounded-lg">
          <AlertCircle className="h-5 w-5 text-orange-500 mt-0.5 flex-shrink-0" />
          <div>
            <p className="text-orange-400 text-sm font-medium">Element not found in brand guidelines</p>
            <p className="text-gray-300 text-sm">Please upload photography style examples or describe your preferred style below.</p>
          </div>
        </div>
      )}
      
      <div className="space-y-4 mb-6">
        <div className="border-2 border-dashed border-gray-600 rounded-lg p-6 text-center">
          <Upload className="h-8 w-8 mx-auto text-gray-400 mb-2" />
          <p className="text-gray-400 mb-2">
            {extractionStatus 
              ? 'Upload additional photography examples (optional)'
              : 'Upload photography style guides or examples'
            }
          </p>
          <input
            type="file"
            multiple
            accept="image/*,.pdf"
            onChange={(e) => onFileUpload(e.target.files)}
            className="hidden"
            id="photography-upload"
          />
          <Button
            variant="outline"
            onClick={() => document.getElementById('photography-upload')?.click()}
            className="border-gray-600 text-gray-300"
          >
            Choose Files
          </Button>
        </div>
        
        {photographyFiles.length > 0 && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {photographyFiles.map((file, index) => (
              <div key={index} className="text-center">
                <div className="w-full h-20 bg-gray-700 rounded border flex items-center justify-center mb-2">
                  <Camera className="h-8 w-8 text-gray-400" />
                </div>
                <p className="text-xs text-gray-400 truncate">{file.name}</p>
              </div>
            ))}
          </div>
        )}
      </div>

      <Separator className="my-4 bg-gray-600" />
      
      <div className="space-y-2">
        <Label className="text-gray-200">Style Description</Label>
        <Textarea
          value={photographyStyle}
          onChange={(e) => onPhotographyStyleChange(e.target.value)}
          className="bg-gray-700 border-gray-600 text-white"
          placeholder={extractionStatus 
            ? "Extracted style description (you can edit this)"
            : "Describe your photography style preferences..."
          }
          rows={3}
        />
      </div>
    </Card>
  );
};
