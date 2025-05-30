
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Upload, FileText, X, Download } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface BrandGuideline {
  id: string;
  name: string;
  description: string;
  file: File | null;
  uploadDate: string;
}

export const BrandGuidelinesUpload = () => {
  const [guidelines, setGuidelines] = useState<BrandGuideline[]>([]);
  const [newGuideline, setNewGuideline] = useState({
    name: '',
    description: '',
    file: null as File | null
  });
  const { toast } = useToast();

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Check file type (PDF, DOC, DOCX, etc.)
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

    setGuidelines(prev => [...prev, guideline]);
    setNewGuideline({ name: '', description: '', file: null });

    toast({
      title: "Brand guideline uploaded",
      description: "Your brand guideline has been successfully uploaded.",
    });

    // Reset file input
    const fileInput = document.getElementById('guideline-file') as HTMLInputElement;
    if (fileInput) fileInput.value = '';
  };

  const handleRemove = (id: string) => {
    setGuidelines(prev => prev.filter(g => g.id !== id));
    toast({
      title: "Brand guideline removed",
      description: "The brand guideline has been removed.",
    });
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <Card className="p-6">
      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Brand Guidelines</h3>
          <p className="text-sm text-gray-600">
            Upload your brand guideline documents to help the AI better understand your brand standards.
          </p>
        </div>

        {/* Upload Form */}
        <div className="space-y-4 border rounded-lg p-4 bg-gray-50">
          <div className="space-y-2">
            <Label htmlFor="guideline-name">Guideline Name</Label>
            <Input
              id="guideline-name"
              placeholder="e.g., Brand Identity Guidelines 2024"
              value={newGuideline.name}
              onChange={(e) => setNewGuideline(prev => ({ ...prev, name: e.target.value }))}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="guideline-description">Description (Optional)</Label>
            <Textarea
              id="guideline-description"
              placeholder="Brief description of what this guideline covers..."
              value={newGuideline.description}
              onChange={(e) => setNewGuideline(prev => ({ ...prev, description: e.target.value }))}
              rows={3}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="guideline-file">Upload File</Label>
            <div className="flex items-center space-x-2">
              <Input
                id="guideline-file"
                type="file"
                accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                onChange={handleFileSelect}
                className="flex-1"
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
            <h4 className="font-medium text-gray-900">Uploaded Guidelines</h4>
            <div className="space-y-2">
              {guidelines.map((guideline) => (
                <div key={guideline.id} className="flex items-center justify-between p-3 border rounded-lg bg-white">
                  <div className="flex items-center space-x-3">
                    <FileText className="h-5 w-5 text-blue-600" />
                    <div>
                      <p className="font-medium text-gray-900">{guideline.name}</p>
                      {guideline.description && (
                        <p className="text-sm text-gray-600">{guideline.description}</p>
                      )}
                      <p className="text-xs text-gray-500">
                        Uploaded on {guideline.uploadDate} • {guideline.file ? formatFileSize(guideline.file.size) : 'Unknown size'}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button variant="outline" size="sm">
                      <Download className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleRemove(guideline.id)}
                      className="text-red-600 hover:text-red-700"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {guidelines.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            <FileText className="h-12 w-12 mx-auto mb-3 text-gray-300" />
            <p>No brand guidelines uploaded yet</p>
            <p className="text-sm">Upload your first guideline document above</p>
          </div>
        )}
      </div>
    </Card>
  );
};
