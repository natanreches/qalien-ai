
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Upload, FileText, X, CheckCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface BrandGuideline {
  id: string;
  name: string;
  description: string;
  file: File | null;
  uploadDate: string;
}

interface OnboardingGuidelinesUploadProps {
  guidelines: BrandGuideline[];
  onGuidelinesUploaded: (guidelines: BrandGuideline[]) => void;
}

export const OnboardingGuidelinesUpload = ({
  guidelines,
  onGuidelinesUploaded
}: OnboardingGuidelinesUploadProps) => {
  const [newGuideline, setNewGuideline] = useState({
    name: '',
    description: '',
    file: null as File | null
  });
  const { toast } = useToast();

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
      setNewGuideline(prev => ({ ...prev, file }));
    }
  };

  const handleUpload = () => {
    if (!newGuideline.name.trim() || !newGuideline.file) {
      toast({
        title: "Missing information",
        description: "Please provide a name and select a file.",
        variant: "destructive"
      });
      return;
    }

    const guideline: BrandGuideline = {
      id: Date.now().toString(),
      name: newGuideline.name,
      description: newGuideline.description,
      file: newGuideline.file,
      uploadDate: new Date().toLocaleDateString()
    };

    const updatedGuidelines = [...guidelines, guideline];
    onGuidelinesUploaded(updatedGuidelines);
    setNewGuideline({ name: '', description: '', file: null });

    toast({
      title: "Brand guideline uploaded",
      description: "Your brand guideline has been successfully uploaded.",
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

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-white mb-2">Upload Brand Guidelines</h2>
        <p className="text-gray-400">
          Upload your brand guideline documents to help us understand your brand standards and ensure compliance.
        </p>
      </div>

      {/* Upload Form */}
      <div className="space-y-4 border rounded-lg p-6 bg-gray-700 border-gray-600">
        <div className="space-y-2">
          <Label htmlFor="onboarding-guideline-name" className="text-gray-200">Guideline Name</Label>
          <Input
            id="onboarding-guideline-name"
            placeholder="e.g., Brand Identity Guidelines 2024"
            value={newGuideline.name}
            onChange={(e) => setNewGuideline(prev => ({ ...prev, name: e.target.value }))}
            className="bg-gray-800 border-gray-600 text-white"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="onboarding-guideline-description" className="text-gray-200">Description (Optional)</Label>
          <Textarea
            id="onboarding-guideline-description"
            placeholder="Brief description of what this guideline covers..."
            value={newGuideline.description}
            onChange={(e) => setNewGuideline(prev => ({ ...prev, description: e.target.value }))}
            rows={3}
            className="bg-gray-800 border-gray-600 text-white"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="onboarding-guideline-file" className="text-gray-200">Upload File</Label>
          <div className="flex items-center space-x-2">
            <Input
              id="onboarding-guideline-file"
              type="file"
              accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
              onChange={handleFileSelect}
              className="flex-1 bg-gray-800 border-gray-600 text-white"
            />
            <Button onClick={handleUpload} className="shrink-0">
              <Upload className="h-4 w-4 mr-2" />
              Upload
            </Button>
          </div>
          {newGuideline.file && (
            <p className="text-xs text-gray-500">
              Selected: {newGuideline.file.name} ({formatFileSize(newGuideline.file.size)})
            </p>
          )}
        </div>
      </div>

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
                    <p className="font-medium text-white">{guideline.name}</p>
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
        </div>
      )}
    </div>
  );
};
