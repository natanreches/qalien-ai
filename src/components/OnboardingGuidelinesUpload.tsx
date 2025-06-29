
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Upload, FileText, X, CheckCircle, AlertCircle, FolderOpen } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface BrandGuideline {
  id: string;
  name: string;
  description: string;
  file: File | null;
  uploadDate: string;
  brandName?: string;
}

interface OnboardingGuidelinesUploadProps {
  guidelines: BrandGuideline[];
  onGuidelinesUploaded: (guidelines: BrandGuideline[]) => void;
  brands: string[];
}

export const OnboardingGuidelinesUpload = ({
  guidelines,
  onGuidelinesUploaded,
  brands
}: OnboardingGuidelinesUploadProps) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [fileMetadata, setFileMetadata] = useState({
    name: '',
    description: '',
    brandName: ''
  });
  const { toast } = useToast();

  // Filter out empty brand names
  const validBrands = brands.filter(brand => brand.trim().length > 0);
  const requiredGuidelines = validBrands.length;

  useEffect(() => {
    // Set default brand name if only one brand exists
    if (validBrands.length === 1 && fileMetadata.brandName === '') {
      setFileMetadata(prev => ({ ...prev, brandName: validBrands[0] }));
    }
  }, [validBrands]);

  // Auto-upload when file is selected and metadata is complete
  useEffect(() => {
    if (selectedFile && shouldAutoUpload()) {
      handleAutoUpload();
    }
  }, [selectedFile, fileMetadata]);

  const shouldAutoUpload = () => {
    if (!selectedFile) return false;
    
    const hasName = fileMetadata.name.trim().length > 0;
    const hasBrandName = validBrands.length === 1 || fileMetadata.brandName.trim().length > 0;
    
    return hasName && hasBrandName;
  };

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const allowedTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'image/jpeg', 'image/png'];
      if (!allowedTypes.includes(file.type)) {
        toast({
          title: "Invalid file type",
          description: "Please upload PDF, DOC, DOCX, JPG, or PNG files only.",
          variant: "destructive"
        });
        return;
      }

      // Auto-populate name from filename
      const fileName = file.name.split('.')[0];
      setFileMetadata(prev => ({ 
        ...prev, 
        name: prev.name || fileName 
      }));
      setSelectedFile(file);
    }
  };

  const handleAutoUpload = () => {
    if (!selectedFile) return;

    const selectedBrand = validBrands.length === 1 ? validBrands[0] : fileMetadata.brandName;
    const existingGuideline = guidelines.find(g => g.brandName === selectedBrand);
    
    if (existingGuideline) {
      toast({
        title: "Guideline already exists",
        description: `A guideline for ${selectedBrand} has already been uploaded.`,
        variant: "destructive"
      });
      handleCancelUpload();
      return;
    }

    const guideline: BrandGuideline = {
      id: Date.now().toString(),
      name: fileMetadata.name,
      description: fileMetadata.description,
      file: selectedFile,
      uploadDate: new Date().toLocaleDateString(),
      brandName: selectedBrand
    };

    const updatedGuidelines = [...guidelines, guideline];
    onGuidelinesUploaded(updatedGuidelines);
    
    // Reset form
    setSelectedFile(null);
    setFileMetadata({ 
      name: '', 
      description: '', 
      brandName: validBrands.length === 1 ? validBrands[0] : '' 
    });

    toast({
      title: "Brand guideline uploaded",
      description: `Brand guideline for ${selectedBrand} has been successfully uploaded.`,
    });

    const fileInput = document.getElementById('onboarding-guideline-file') as HTMLInputElement;
    if (fileInput) fileInput.value = '';
  };

  const handleCancelUpload = () => {
    setSelectedFile(null);
    setFileMetadata({ 
      name: '', 
      description: '', 
      brandName: validBrands.length === 1 ? validBrands[0] : '' 
    });
    
    const fileInput = document.getElementById('onboarding-guideline-file') as HTMLInputElement;
    if (fileInput) fileInput.value = '';
  };

  const handleRemove = (id: string) => {
    const updatedGuidelines = guidelines.filter(g => g.id !== id);
    onGuidelinesUploaded(updatedGuidelines);
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const getRemainingBrands = () => {
    const uploadedBrands = guidelines.map(g => g.brandName);
    return validBrands.filter(brand => !uploadedBrands.includes(brand));
  };

  const isComplete = guidelines.length === requiredGuidelines;
  const remainingBrands = getRemainingBrands();

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-white mb-2">Upload Brand Guidelines</h2>
        <p className="text-gray-400 mb-4">
          Upload brand guideline documents for each of your brands to help us understand your brand standards and ensure compliance.
        </p>
        
        {/* Progress indicator */}
        <div className="flex items-center justify-center space-x-2 mb-4">
          {isComplete ? (
            <div className="flex items-center text-green-400">
              <CheckCircle className="h-5 w-5 mr-2" />
              <span className="text-sm">All brand guidelines uploaded ({guidelines.length}/{requiredGuidelines})</span>
            </div>
          ) : (
            <div className="flex items-center text-yellow-400">
              <AlertCircle className="h-5 w-5 mr-2" />
              <span className="text-sm">Progress: {guidelines.length}/{requiredGuidelines} brand guidelines uploaded</span>
            </div>
          )}
        </div>

        {remainingBrands.length > 0 && (
          <div className="text-sm text-gray-400">
            Still needed for: {remainingBrands.join(', ')}
          </div>
        )}
      </div>

      {/* Upload Form - only show if not complete */}
      {!isComplete && (
        <div className="space-y-4 border rounded-lg p-6 bg-gray-700 border-gray-600">
          <h3 className="text-lg font-medium text-white mb-4">Upload New Guideline</h3>
          
          {/* Brand selection - only show if multiple brands */}
          {validBrands.length > 1 && (
            <div className="space-y-2">
              <Label htmlFor="onboarding-brand-select" className="text-gray-200">Select Brand</Label>
              <select
                id="onboarding-brand-select"
                value={fileMetadata.brandName}
                onChange={(e) => setFileMetadata(prev => ({ ...prev, brandName: e.target.value }))}
                className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                disabled={!!selectedFile}
              >
                <option value="">Select a brand...</option>
                {remainingBrands.map((brand) => (
                  <option key={brand} value={brand}>{brand}</option>
                ))}
              </select>
            </div>
          )}

          <div className="space-y-2">
            <Label htmlFor="onboarding-guideline-name" className="text-gray-200">
              Guideline Name <span className="text-red-400">*</span>
            </Label>
            <Input
              id="onboarding-guideline-name"
              placeholder="e.g., Brand Identity Guidelines 2024"
              value={fileMetadata.name}
              onChange={(e) => setFileMetadata(prev => ({ ...prev, name: e.target.value }))}
              className="bg-gray-800 border-gray-600 text-white"
              disabled={!!selectedFile}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="onboarding-guideline-description" className="text-gray-200">Description (Optional)</Label>
            <Textarea
              id="onboarding-guideline-description"
              placeholder="Brief description of what this guideline covers..."
              value={fileMetadata.description}
              onChange={(e) => setFileMetadata(prev => ({ ...prev, description: e.target.value }))}
              rows={3}
              className="bg-gray-800 border-gray-600 text-white"
              disabled={!!selectedFile}
            />
          </div>

          {/* File Upload Area */}
          <div className="space-y-2">
            <Label className="text-gray-200">
              Upload File <span className="text-red-400">*</span>
            </Label>
            
            {!selectedFile ? (
              <div className="border-2 border-dashed border-gray-600 rounded-lg p-6 text-center">
                <input
                  id="onboarding-guideline-file"
                  type="file"
                  accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                  onChange={handleFileSelect}
                  className="hidden"
                />
                <FolderOpen className="h-8 w-8 mx-auto text-gray-400 mb-2" />
                <p className="text-gray-400 mb-2">Choose a file to upload</p>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => document.getElementById('onboarding-guideline-file')?.click()}
                  className="bg-blue-600 hover:bg-blue-700 border-blue-600 text-white"
                >
                  <FolderOpen className="h-4 w-4 mr-2" />
                  Choose File
                </Button>
              </div>
            ) : (
              <div className="relative border border-gray-600 rounded-lg p-4 bg-gray-800">
                {/* Cancel button */}
                <button
                  onClick={handleCancelUpload}
                  className="absolute top-2 right-2 p-1 bg-gray-600 hover:bg-gray-500 rounded-full transition-colors"
                  title="Cancel upload"
                >
                  <X className="h-4 w-4 text-white" />
                </button>
                
                <div className="flex items-center space-x-3 pr-8">
                  <FileText className="h-8 w-8 text-blue-400" />
                  <div>
                    <p className="text-white font-medium">{selectedFile.name}</p>
                    <p className="text-gray-400 text-sm">{formatFileSize(selectedFile.size)}</p>
                    {shouldAutoUpload() ? (
                      <p className="text-green-400 text-sm flex items-center mt-1">
                        <CheckCircle className="h-4 w-4 mr-1" />
                        Ready to upload automatically
                      </p>
                    ) : (
                      <p className="text-yellow-400 text-sm">
                        Complete the form above to upload
                      </p>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Uploaded Guidelines List */}
      {guidelines.length > 0 && (
        <div className="space-y-3">
          <h4 className="font-medium text-white flex items-center">
            <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
            Uploaded Guidelines ({guidelines.length})
          </h4>
          <div className="space-y-2">
            {guidelines.map((guideline) => (
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
                      Uploaded on {guideline.uploadDate} • {guideline.file ? formatFileSize(guideline.file.size) : 'Unknown size'}
                    </p>
                  </div>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleRemove(guideline.id)}
                  className="text-red-400 hover:text-red-300 border-gray-600"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
        </div>
      )}

      {guidelines.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          <FileText className="h-12 w-12 mx-auto mb-3 text-gray-600" />
          <p>Upload your first brand guideline to continue</p>
          <p className="text-sm mt-2">
            You need to upload {requiredGuidelines} guideline{requiredGuidelines > 1 ? 's' : ''} for your {requiredGuidelines} brand{requiredGuidelines > 1 ? 's' : ''}
          </p>
        </div>
      )}
    </div>
  );
};
