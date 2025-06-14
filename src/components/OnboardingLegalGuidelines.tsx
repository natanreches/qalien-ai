
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Card } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Upload, FileText, X, CheckCircle, Shield, AlertTriangle, Scale, Globe } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface LegalGuideline {
  id: string;
  name: string;
  description: string;
  file: File | null;
  uploadDate: string;
  category: 'advertising' | 'claims' | 'disclosure' | 'privacy' | 'accessibility' | 'other';
}

interface LegalCompliance {
  requiresDisclosures: boolean;
  hasHealthClaims: boolean;
  hasFinancialClaims: boolean;
  targetMinors: boolean;
  operatesGlobally: boolean;
  requiresAccessibility: boolean;
  hasDataCollection: boolean;
  additionalNotes: string;
}

interface OnboardingLegalGuidelinesProps {
  legalGuidelines: LegalGuideline[];
  legalCompliance: LegalCompliance;
  onLegalGuidelinesUpdated: (guidelines: LegalGuideline[]) => void;
  onLegalComplianceUpdated: (compliance: LegalCompliance) => void;
}

export const OnboardingLegalGuidelines = ({
  legalGuidelines,
  legalCompliance,
  onLegalGuidelinesUpdated,
  onLegalComplianceUpdated
}: OnboardingLegalGuidelinesProps) => {
  const [newGuideline, setNewGuideline] = useState({
    name: '',
    description: '',
    file: null as File | null,
    category: 'advertising' as LegalGuideline['category']
  });
  const { toast } = useToast();

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const allowedTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
      if (!allowedTypes.includes(file.type)) {
        toast({
          title: "Invalid file type",
          description: "Please upload PDF, DOC, or DOCX files only.",
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

    const guideline: LegalGuideline = {
      id: Date.now().toString(),
      name: newGuideline.name,
      description: newGuideline.description,
      file: newGuideline.file,
      uploadDate: new Date().toLocaleDateString(),
      category: newGuideline.category
    };

    const updatedGuidelines = [...legalGuidelines, guideline];
    onLegalGuidelinesUpdated(updatedGuidelines);
    setNewGuideline({ name: '', description: '', file: null, category: 'advertising' });

    toast({
      title: "Legal guideline uploaded",
      description: "Your legal guideline has been successfully uploaded.",
    });

    const fileInput = document.getElementById('legal-guideline-file') as HTMLInputElement;
    if (fileInput) fileInput.value = '';
  };

  const handleRemove = (id: string) => {
    const updatedGuidelines = legalGuidelines.filter(g => g.id !== id);
    onLegalGuidelinesUpdated(updatedGuidelines);
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'advertising': return <Shield className="h-4 w-4" />;
      case 'claims': return <AlertTriangle className="h-4 w-4" />;
      case 'disclosure': return <FileText className="h-4 w-4" />;
      case 'privacy': return <Shield className="h-4 w-4" />;
      case 'accessibility': return <Globe className="h-4 w-4" />;
      default: return <Scale className="h-4 w-4" />;
    }
  };

  const handleComplianceChange = (field: keyof LegalCompliance, value: boolean | string) => {
    onLegalComplianceUpdated({
      ...legalCompliance,
      [field]: value
    });
  };

  return (
    <div className="space-y-8">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-white mb-2">Legal & Compliance Guidelines</h2>
        <p className="text-gray-400">
          Help us understand your legal requirements and upload any compliance documents to ensure all generated content meets regulatory standards.
        </p>
      </div>

      {/* Compliance Questionnaire */}
      <Card className="p-6 bg-gray-800 border-gray-700">
        <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
          <Scale className="h-5 w-5 mr-2" />
          Compliance Requirements
        </h3>
        <p className="text-sm text-gray-400 mb-6">
          Please answer these questions to help us understand your legal compliance needs.
        </p>

        <div className="space-y-4">
          <div className="flex items-start space-x-3">
            <Checkbox 
              id="disclosures"
              checked={legalCompliance.requiresDisclosures}
              onCheckedChange={(checked) => handleComplianceChange('requiresDisclosures', !!checked)}
            />
            <div className="space-y-1">
              <label htmlFor="disclosures" className="text-sm font-medium text-gray-200 cursor-pointer">
                Requires legal disclosures or disclaimers
              </label>
              <p className="text-xs text-gray-400">
                E.g., "Results may vary", financial disclaimers, FDA warnings
              </p>
            </div>
          </div>

          <div className="flex items-start space-x-3">
            <Checkbox 
              id="health-claims"
              checked={legalCompliance.hasHealthClaims}
              onCheckedChange={(checked) => handleComplianceChange('hasHealthClaims', !!checked)}
            />
            <div className="space-y-1">
              <label htmlFor="health-claims" className="text-sm font-medium text-gray-200 cursor-pointer">
                Makes health or wellness claims
              </label>
              <p className="text-xs text-gray-400">
                Subject to FDA, FTC, or other health authority regulations
              </p>
            </div>
          </div>

          <div className="flex items-start space-x-3">
            <Checkbox 
              id="financial-claims"
              checked={legalCompliance.hasFinancialClaims}
              onCheckedChange={(checked) => handleComplianceChange('hasFinancialClaims', !!checked)}
            />
            <div className="space-y-1">
              <label htmlFor="financial-claims" className="text-sm font-medium text-gray-200 cursor-pointer">
                Makes financial or investment claims
              </label>
              <p className="text-xs text-gray-400">
                Subject to SEC, FINRA, or similar financial regulations
              </p>
            </div>
          </div>

          <div className="flex items-start space-x-3">
            <Checkbox 
              id="target-minors"
              checked={legalCompliance.targetMinors}
              onCheckedChange={(checked) => handleComplianceChange('targetMinors', !!checked)}
            />
            <div className="space-y-1">
              <label htmlFor="target-minors" className="text-sm font-medium text-gray-200 cursor-pointer">
                Targets or markets to minors (under 18)
              </label>
              <p className="text-xs text-gray-400">
                Subject to COPPA and additional advertising restrictions
              </p>
            </div>
          </div>

          <div className="flex items-start space-x-3">
            <Checkbox 
              id="operates-globally"
              checked={legalCompliance.operatesGlobally}
              onCheckedChange={(checked) => handleComplianceChange('operatesGlobally', !!checked)}
            />
            <div className="space-y-1">
              <label htmlFor="operates-globally" className="text-sm font-medium text-gray-200 cursor-pointer">
                Operates in multiple countries/regions
              </label>
              <p className="text-xs text-gray-400">
                Subject to GDPR, international advertising standards, local regulations
              </p>
            </div>
          </div>

          <div className="flex items-start space-x-3">
            <Checkbox 
              id="accessibility"
              checked={legalCompliance.requiresAccessibility}
              onCheckedChange={(checked) => handleComplianceChange('requiresAccessibility', !!checked)}
            />
            <div className="space-y-1">
              <label htmlFor="accessibility" className="text-sm font-medium text-gray-200 cursor-pointer">
                Must comply with accessibility standards
              </label>
              <p className="text-xs text-gray-400">
                ADA, WCAG guidelines for digital content
              </p>
            </div>
          </div>

          <div className="flex items-start space-x-3">
            <Checkbox 
              id="data-collection"
              checked={legalCompliance.hasDataCollection}
              onCheckedChange={(checked) => handleComplianceChange('hasDataCollection', !!checked)}
            />
            <div className="space-y-1">
              <label htmlFor="data-collection" className="text-sm font-medium text-gray-200 cursor-pointer">
                Collects personal data from customers
              </label>
              <p className="text-xs text-gray-400">
                Subject to privacy laws, requires privacy policy disclosures
              </p>
            </div>
          </div>
        </div>

        <div className="mt-6 space-y-2">
          <Label htmlFor="additional-notes" className="text-gray-200">
            Additional Legal Considerations
          </Label>
          <Textarea
            id="additional-notes"
            value={legalCompliance.additionalNotes}
            onChange={(e) => handleComplianceChange('additionalNotes', e.target.value)}
            placeholder="Any other legal requirements, industry-specific regulations, or compliance considerations..."
            className="bg-gray-700 border-gray-600 text-white"
            rows={3}
          />
        </div>
      </Card>

      <Separator className="bg-gray-700" />

      {/* Upload Legal Documents */}
      <Card className="p-6 bg-gray-800 border-gray-700">
        <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
          <FileText className="h-5 w-5 mr-2" />
          Upload Legal Documents
        </h3>
        <p className="text-sm text-gray-400 mb-6">
          Upload any legal guidelines, compliance documents, or regulatory requirements that should be considered when creating content.
        </p>

        {/* Upload Form */}
        <div className="space-y-4 border rounded-lg p-6 bg-gray-700 border-gray-600">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="legal-guideline-name" className="text-gray-200">Document Name</Label>
              <Input
                id="legal-guideline-name"
                placeholder="e.g., FDA Compliance Guidelines"
                value={newGuideline.name}
                onChange={(e) => setNewGuideline(prev => ({ ...prev, name: e.target.value }))}
                className="bg-gray-800 border-gray-600 text-white"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="legal-category" className="text-gray-200">Category</Label>
              <select
                id="legal-category"
                value={newGuideline.category}
                onChange={(e) => setNewGuideline(prev => ({ ...prev, category: e.target.value as LegalGuideline['category'] }))}
                className="w-full bg-gray-800 border border-gray-600 text-white rounded-md px-3 py-2"
              >
                <option value="advertising">Advertising Standards</option>
                <option value="claims">Claims & Substantiation</option>
                <option value="disclosure">Required Disclosures</option>
                <option value="privacy">Privacy & Data</option>
                <option value="accessibility">Accessibility</option>
                <option value="other">Other</option>
              </select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="legal-guideline-description" className="text-gray-200">Description</Label>
            <Textarea
              id="legal-guideline-description"
              placeholder="Brief description of what this document covers..."
              value={newGuideline.description}
              onChange={(e) => setNewGuideline(prev => ({ ...prev, description: e.target.value }))}
              rows={3}
              className="bg-gray-800 border-gray-600 text-white"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="legal-guideline-file" className="text-gray-200">Upload Document</Label>
            <div className="flex items-center space-x-2">
              <Input
                id="legal-guideline-file"
                type="file"
                accept=".pdf,.doc,.docx"
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

        {/* Uploaded Documents List */}
        {legalGuidelines.length > 0 && (
          <div className="space-y-3 mt-6">
            <h4 className="font-medium text-white flex items-center">
              <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
              Uploaded Legal Documents ({legalGuidelines.length})
            </h4>
            <div className="space-y-2">
              {legalGuidelines.map((guideline) => (
                <div key={guideline.id} className="flex items-center justify-between p-4 border rounded-lg bg-gray-700 border-gray-600">
                  <div className="flex items-center space-x-3">
                    {getCategoryIcon(guideline.category)}
                    <div>
                      <p className="font-medium text-white">{guideline.name}</p>
                      <p className="text-sm text-blue-400 capitalize">{guideline.category.replace('-', ' ')}</p>
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

        {legalGuidelines.length === 0 && (
          <div className="text-center py-8 text-gray-500 mt-6">
            <Shield className="h-12 w-12 mx-auto mb-3 text-gray-600" />
            <p>No legal documents uploaded yet</p>
            <p className="text-sm">Upload your legal guidelines and compliance documents above</p>
          </div>
        )}
      </Card>
    </div>
  );
};
