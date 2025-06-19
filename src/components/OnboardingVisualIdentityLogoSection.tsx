
import React from 'react';
import { Image, Upload, CheckCircle, AlertCircle, Check, X, AlertTriangle, Trash2 } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

interface OnboardingVisualIdentityLogoSectionProps {
  logoFiles: File[];
  extractedFromGuidelines: boolean;
  onFileUpload: (files: FileList | null) => void;
  onVerifyExtraction?: (isCorrect: boolean) => void;
  extractionVerified?: boolean;
  onClearExtracted?: () => void;
  onRemoveFile?: (index: number) => void;
}

export const OnboardingVisualIdentityLogoSection = ({
  logoFiles,
  extractedFromGuidelines,
  onFileUpload,
  onVerifyExtraction,
  extractionVerified,
  onClearExtracted,
  onRemoveFile
}: OnboardingVisualIdentityLogoSectionProps) => {
  const canDeleteIndividual = extractedFromGuidelines && extractionVerified === false;

  return (
    <Card className="p-6 bg-gray-800 border-gray-700">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center">
          <Image className="h-5 w-5 mr-2 text-blue-400" />
          <h3 className="text-lg font-semibold text-white">Logo Files</h3>
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
              <span className="text-blue-400 text-sm font-medium">Are these logo files correct?</span>
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

      {extractionVerified === false && (
        <div className="mb-4 p-3 bg-red-900/20 border border-red-600/30 rounded-lg">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <X className="h-4 w-4 text-red-500" />
              <span className="text-red-400 text-sm">Please adjust the logo files below. You can remove incorrect files individually or clear all.</span>
            </div>
            <Button
              size="sm"
              variant="outline"
              onClick={onClearExtracted}
              className="border-red-600 text-red-400 hover:bg-red-600/10"
            >
              Clear All
            </Button>
          </div>
        </div>
      )}

      {extractedFromGuidelines ? (
        <div className="flex items-start space-x-2 mb-4 p-3 bg-green-900/20 border border-green-600/30 rounded-lg">
          <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
          <div>
            <p className="text-green-400 text-sm font-medium">Based on your brand guidelines</p>
            <p className="text-gray-300 text-sm">Logo files have been automatically extracted from your uploaded brand documents.</p>
          </div>
        </div>
      ) : (
        <div className="flex items-start space-x-2 mb-4 p-3 bg-orange-900/20 border border-orange-600/30 rounded-lg">
          <AlertCircle className="h-5 w-5 text-orange-500 mt-0.5 flex-shrink-0" />
          <div>
            <p className="text-orange-400 text-sm font-medium">Logos not found in brand guidelines</p>
            <p className="text-gray-300 text-sm">Upload approved logo files in all approved variations (color, monochrome, reverse, vertical, etc.)</p>
          </div>
        </div>
      )}
      
      {extractedFromGuidelines && logoFiles.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          {logoFiles.map((file, index) => (
            <div key={index} className="text-center relative">
              <div className="w-full h-20 bg-gray-700 rounded border flex items-center justify-center mb-2">
                <Image className="h-8 w-8 text-gray-400" />
              </div>
              <p className="text-xs text-gray-400 truncate">{file.name}</p>
              <Badge variant="secondary" className="mt-1 text-xs bg-green-600 text-white">
                Extracted
              </Badge>
              {canDeleteIndividual && onRemoveFile && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onRemoveFile(index)}
                  className="absolute -top-2 -right-2 w-6 h-6 p-0 rounded-full bg-red-600 border-red-600 text-white hover:bg-red-700"
                >
                  <X className="h-3 w-3" />
                </Button>
              )}
            </div>
          ))}
        </div>
      )}

      <div className="border-2 border-dashed border-gray-600 rounded-lg p-6 text-center">
        <Upload className="h-8 w-8 mx-auto text-gray-400 mb-2" />
        <p className="text-gray-400 mb-2">
          {extractedFromGuidelines 
            ? 'Upload additional logo files (optional)'
            : 'Upload logo files'
          }
        </p>
        <input
          type="file"
          multiple
          accept="image/*"
          onChange={(e) => onFileUpload(e.target.files)}
          className="hidden"
          id="logo-upload"
        />
        <Button
          variant="outline"
          onClick={() => document.getElementById('logo-upload')?.click()}
          className="border-gray-600 text-gray-300"
        >
          Choose Files
        </Button>
      </div>

      {!extractedFromGuidelines && logoFiles.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
          {logoFiles.map((file, index) => (
            <div key={index} className="text-center relative">
              <div className="w-full h-20 bg-gray-700 rounded border flex items-center justify-center mb-2">
                <Image className="h-8 w-8 text-gray-400" />
              </div>
              <p className="text-xs text-gray-400 truncate">{file.name}</p>
              {onRemoveFile && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onRemoveFile(index)}
                  className="absolute -top-2 -right-2 w-6 h-6 p-0 rounded-full bg-red-600 border-red-600 text-white hover:bg-red-700"
                >
                  <X className="h-3 w-3" />
                </Button>
              )}
            </div>
          ))}
        </div>
      )}
    </Card>
  );
};
