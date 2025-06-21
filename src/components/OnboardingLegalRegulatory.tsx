import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Shield, Building, FileText, Upload, Scale, Globe } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface LegalRegulatory {
  industryRules: string;
  regulatoryRequirements: string[];
  disclosures: string;
  ipRightsManagement: File[];
  jurisdictionNotes: string[];
}

interface OnboardingLegalRegulatoryProps {
  legalRegulatory: LegalRegulatory;
  onLegalRegulatoryUpdated: (legal: LegalRegulatory) => void;
}

export const OnboardingLegalRegulatory = ({
  legalRegulatory,
  onLegalRegulatoryUpdated
}: OnboardingLegalRegulatoryProps) => {
  const [legal, setLegal] = useState<LegalRegulatory>(legalRegulatory);
  const [selectedRegulations, setSelectedRegulations] = useState<string[]>(legalRegulatory.regulatoryRequirements || []);
  const [selectedJurisdictions, setSelectedJurisdictions] = useState<string[]>(legalRegulatory.jurisdictionNotes || []);
  const { toast } = useToast();

  const industryOptions = [
    'Pharmaceutical', 'Financial Services', 'Alcohol', 'Cryptocurrency', 
    'Consumer Goods', 'Healthcare', 'Technology', 'Food & Beverage',
    'Automotive', 'Entertainment', 'Education', 'Real Estate'
  ];

  const regulationOptions = [
    'FTC', 'GDPR', 'CCPA', 'COPPA', 'HIPAA', 'SOX', 'FDA', 'SEC',
    'FINRA', 'CAN-SPAM', 'TCPA', 'ADA', 'PCI DSS', 'FERPA'
  ];

  const jurisdictionOptions = [
    'United States', 'European Union', 'California', 'New York',
    'Canada', 'United Kingdom', 'Australia', 'Japan', 'Brazil',
    'China', 'India', 'Mexico', 'Singapore', 'South Korea'
  ];

  const handleRegulationToggle = (regulation: string) => {
    const newRegulations = selectedRegulations.includes(regulation)
      ? selectedRegulations.filter(r => r !== regulation)
      : [...selectedRegulations, regulation];
    
    setSelectedRegulations(newRegulations);
    setLegal(prev => ({ ...prev, regulatoryRequirements: newRegulations }));
  };

  const handleJurisdictionToggle = (jurisdiction: string) => {
    const newJurisdictions = selectedJurisdictions.includes(jurisdiction)
      ? selectedJurisdictions.filter(j => j !== jurisdiction)
      : [...selectedJurisdictions, jurisdiction];
    
    setSelectedJurisdictions(newJurisdictions);
    setLegal(prev => ({ ...prev, jurisdictionNotes: newJurisdictions }));
  };

  const handleFileUpload = (files: FileList | null) => {
    if (!files) return;
    const fileArray = Array.from(files);
    setLegal(prev => ({ ...prev, ipRightsManagement: [...prev.ipRightsManagement, ...fileArray] }));
  };

  const handleSave = () => {
    onLegalRegulatoryUpdated(legal);
    toast({
      title: "Legal & Regulatory Settings Saved",
      description: "Your compliance requirements have been successfully updated.",
    });
  };

  return (
    <div className="space-y-8">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-white mb-2">Legal & Regulatory Setup</h2>
        <p className="text-gray-400">
          Configure compliance requirements. These inputs build your legal compliance matrix, triggering specific compliance flags based on content type.
        </p>
      </div>

      <div className="space-y-6">
        {/* Industry-Specific Rules */}
        <Card className="p-6 bg-gray-800 border-gray-700">
          <div className="flex items-center mb-4">
            <Building className="h-5 w-5 mr-2 text-orange-400" />
            <h3 className="text-lg font-semibold text-white">Industry-Specific Rules</h3>
          </div>
          <p className="text-gray-400 text-sm mb-4">
            e.g., Pharma, Financial Services, Alcohol, Crypto, Consumer Goods
          </p>
          
          <Select
            value={legal.industryRules}
            onValueChange={(value) => setLegal(prev => ({ ...prev, industryRules: value }))}
          >
            <SelectTrigger className="bg-gray-700 border-gray-600 text-white">
              <SelectValue placeholder="Select your industry" />
            </SelectTrigger>
            <SelectContent className="bg-gray-700 border-gray-600">
              {industryOptions.map((industry) => (
                <SelectItem key={industry} value={industry} className="text-white hover:bg-gray-600">
                  {industry}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </Card>

        {/* Regulatory Requirements */}
        <Card className="p-6 bg-gray-800 border-gray-700">
          <div className="flex items-center mb-4">
            <Shield className="h-5 w-5 mr-2 text-orange-400" />
            <h3 className="text-lg font-semibold text-white">Regulatory Requirements</h3>
          </div>
          <p className="text-gray-400 text-sm mb-4">
            FTC, GDPR, CCPA, COPPA, HIPAA, etc.
          </p>
          
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {regulationOptions.map((regulation) => (
              <div
                key={regulation}
                className={`flex items-center space-x-2 p-3 rounded-lg border cursor-pointer transition-colors ${
                  selectedRegulations.includes(regulation)
                    ? 'bg-orange-600 border-orange-500'
                    : 'bg-gray-700 border-gray-600 hover:border-gray-500'
                }`}
                onClick={() => handleRegulationToggle(regulation)}
              >
                <Checkbox
                  checked={selectedRegulations.includes(regulation)}
                  className="pointer-events-none"
                />
                <span className="text-white text-sm">{regulation}</span>
              </div>
            ))}
          </div>
        </Card>

        {/* Disclosures */}
        <Card className="p-6 bg-gray-800 border-gray-700">
          <div className="flex items-center mb-4">
            <FileText className="h-5 w-5 mr-2 text-orange-400" />
            <h3 className="text-lg font-semibold text-white">Disclosures</h3>
          </div>
          <p className="text-gray-400 text-sm mb-4">
            Input any mandatory legal disclaimers, affiliate disclosures, health warnings
          </p>
          
          <Textarea
            value={legal.disclosures}
            onChange={(e) => setLegal(prev => ({ ...prev, disclosures: e.target.value }))}
            className="bg-gray-700 border-gray-600 text-white"
            placeholder="Enter required disclosures and disclaimers..."
            rows={6}
          />
        </Card>

        {/* IP/Rights Management */}
        <Card className="p-6 bg-gray-800 border-gray-700">
          <div className="flex items-center mb-4">
            <Scale className="h-5 w-5 mr-2 text-orange-400" />
            <h3 className="text-lg font-semibold text-white">IP/Rights Management</h3>
          </div>
          <p className="text-gray-400 text-sm mb-4">
            Upload documentation for model rights, music licensing, influencer usage rights
          </p>
          
          <div className="space-y-4">
            <div className="border-2 border-dashed border-gray-600 rounded-lg p-6 text-center">
              <Upload className="h-8 w-8 mx-auto text-gray-400 mb-2" />
              <p className="text-gray-400 mb-2">Upload IP/Rights documents</p>
              <input
                type="file"
                multiple
                accept=".pdf,.doc,.docx"
                onChange={(e) => handleFileUpload(e.target.files)}
                className="hidden"
                id="ip-upload"
              />
              <Button
                variant="outline"
                onClick={() => document.getElementById('ip-upload')?.click()}
                className="border-gray-600 text-gray-300"
              >
                Choose Files
              </Button>
            </div>
            
            {legal.ipRightsManagement.length > 0 && (
              <div className="space-y-2">
                <Label className="text-gray-200">Uploaded Files:</Label>
                {legal.ipRightsManagement.map((file, index) => (
                  <div key={index} className="flex items-center space-x-2 p-2 bg-gray-700 rounded">
                    <FileText className="h-4 w-4 text-gray-400" />
                    <span className="text-gray-300 text-sm">{file.name}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </Card>

        {/* Jurisdiction Notes */}
        <Card className="p-6 bg-gray-800 border-gray-700">
          <div className="flex items-center mb-4">
            <Globe className="h-5 w-5 mr-2 text-orange-400" />
            <h3 className="text-lg font-semibold text-white">Jurisdiction Notes</h3>
          </div>
          <p className="text-gray-400 text-sm mb-4">
            Indicate jurisdictions where specific legal standards apply
          </p>
          
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {jurisdictionOptions.map((jurisdiction) => (
              <div
                key={jurisdiction}
                className={`flex items-center space-x-2 p-3 rounded-lg border cursor-pointer transition-colors ${
                  selectedJurisdictions.includes(jurisdiction)
                    ? 'bg-orange-600 border-orange-500'
                    : 'bg-gray-700 border-gray-600 hover:border-gray-500'
                }`}
                onClick={() => handleJurisdictionToggle(jurisdiction)}
              >
                <Checkbox
                  checked={selectedJurisdictions.includes(jurisdiction)}
                  className="pointer-events-none"
                />
                <span className="text-white text-sm">{jurisdiction}</span>
              </div>
            ))}
          </div>
        </Card>
      </div>

      <Button onClick={handleSave} className="w-full">
        Save Legal & Regulatory Settings
      </Button>
    </div>
  );
};
