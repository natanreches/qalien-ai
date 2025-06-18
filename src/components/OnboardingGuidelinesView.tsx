
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { FileText, Edit, Upload } from 'lucide-react';
import { OnboardingGuidelinesUpload } from './OnboardingGuidelinesUpload';

interface BrandGuideline {
  id: string;
  name: string;
  description: string;
  file: File | null;
  uploadDate: string;
  brandName?: string;
}

export const OnboardingGuidelinesView = () => {
  const [isEditing, setIsEditing] = useState(false);
  // In a real app, this would come from the onboarding data stored in the backend
  const [onboardingGuidelines, setOnboardingGuidelines] = useState<BrandGuideline[]>([
    {
      id: '1',
      name: 'Brand Identity Guidelines 2024',
      description: 'Complete brand identity guidelines including logo usage, colors, and typography',
      file: null, // In real app, this would be the actual file reference
      uploadDate: '2024-01-15',
      brandName: 'Main Brand'
    }
  ]);

  // Extract unique brand names from existing guidelines, or provide a default
  const getBrands = () => {
    const brandNames = onboardingGuidelines
      .map(g => g.brandName)
      .filter((name): name is string => !!name);
    const uniqueBrands = [...new Set(brandNames)];
    return uniqueBrands.length > 0 ? uniqueBrands : ['Main Brand'];
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const handleGuidelinesUpdated = (updatedGuidelines: BrandGuideline[]) => {
    setOnboardingGuidelines(updatedGuidelines);
    setIsEditing(false);
  };

  if (isEditing) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-white">Update Onboarding Guidelines</h3>
          <Button
            variant="outline"
            onClick={() => setIsEditing(false)}
            className="border-gray-600 text-gray-300"
          >
            Cancel
          </Button>
        </div>
        <OnboardingGuidelinesUpload
          guidelines={onboardingGuidelines}
          onGuidelinesUploaded={handleGuidelinesUpdated}
          brands={getBrands()}
        />
      </div>
    );
  }

  return (
    <Card className="p-6 bg-gray-800 border-gray-700">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-white mb-2">Onboarding Brand Guidelines</h3>
            <p className="text-sm text-gray-400">
              Guidelines uploaded during your initial brand setup process.
            </p>
          </div>
          <Button
            onClick={() => setIsEditing(true)}
            className="bg-blue-600 hover:bg-blue-700"
          >
            <Edit className="h-4 w-4 mr-2" />
            Update Guidelines
          </Button>
        </div>

        {onboardingGuidelines.length > 0 ? (
          <div className="space-y-3">
            <h4 className="font-medium text-white">Current Guidelines</h4>
            <div className="space-y-2">
              {onboardingGuidelines.map((guideline) => (
                <div key={guideline.id} className="flex items-center justify-between p-4 border rounded-lg bg-gray-700 border-gray-600">
                  <div className="flex items-center space-x-3">
                    <FileText className="h-5 w-5 text-blue-400" />
                    <div>
                      <div className="flex items-center space-x-2">
                        <p className="font-medium text-white">{guideline.name}</p>
                        {guideline.brandName && (
                          <span className="px-2 py-1 bg-blue-600 text-blue-100 rounded text-xs">
                            {guideline.brandName}
                          </span>
                        )}
                      </div>
                      {guideline.description && (
                        <p className="text-sm text-gray-400">{guideline.description}</p>
                      )}
                      <p className="text-xs text-gray-500">
                        Uploaded on {guideline.uploadDate}
                      </p>
                    </div>
                  </div>
                  <div className="text-sm text-gray-400">
                    PDF Document
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="text-center py-8 text-gray-500">
            <FileText className="h-12 w-12 mx-auto mb-3 text-gray-600" />
            <p>No onboarding guidelines found</p>
            <Button
              onClick={() => setIsEditing(true)}
              className="mt-3 bg-blue-600 hover:bg-blue-700"
            >
              <Upload className="h-4 w-4 mr-2" />
              Upload Guidelines
            </Button>
          </div>
        )}
      </div>
    </Card>
  );
};
