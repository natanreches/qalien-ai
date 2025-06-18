
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  CheckCircle, 
  Edit, 
  FileText, 
  Palette, 
  MessageSquare, 
  Video, 
  Shield, 
  Users,
  Building2,
  Eye
} from 'lucide-react';
import type { 
  CompanyInfo, 
  BrandGuideline, 
  VisualIdentity, 
  VerbalIdentity, 
  AdCreative, 
  LegalRegulatory, 
  Collaborator 
} from '@/types/onboarding';

interface OnboardingReviewConfirmProps {
  companyInfo: CompanyInfo;
  guidelines: BrandGuideline[];
  visualIdentity: VisualIdentity;
  verbalIdentity: VerbalIdentity;
  adCreatives: AdCreative[];
  legalRegulatory: LegalRegulatory;
  collaborators: Collaborator[];
  onEditStep: (step: number) => void;
}

export const OnboardingReviewConfirm = ({
  companyInfo,
  guidelines,
  visualIdentity,
  verbalIdentity,
  adCreatives,
  legalRegulatory,
  collaborators,
  onEditStep
}: OnboardingReviewConfirmProps) => {
  const sections = [
    {
      title: 'Company Information',
      icon: Building2,
      step: 2,
      data: {
        company: companyInfo.company,
        brands: companyInfo.brands.filter(b => b.trim().length > 0),
        jobTitle: companyInfo.jobTitle
      },
      summary: `${companyInfo.company} • ${companyInfo.brands.filter(b => b.trim().length > 0).length} brand(s) • ${companyInfo.jobTitle}`
    },
    {
      title: 'Brand Guidelines',
      icon: FileText,
      step: 3,
      data: guidelines,
      summary: `${guidelines.length} guideline(s) uploaded`
    },
    {
      title: 'Visual Identity',
      icon: Palette,
      step: 4,
      data: visualIdentity,
      summary: `${visualIdentity.logoFiles.length} logo(s), ${visualIdentity.colorPalette.length} color(s), ${visualIdentity.typography.length} font(s)`
    },
    {
      title: 'Verbal Identity',
      icon: MessageSquare,
      step: 5,
      data: verbalIdentity,
      summary: `${verbalIdentity.toneOfVoice.length} tone(s) defined, vocabulary & grammar preferences set`
    },
    {
      title: 'Ad Creatives',
      icon: Video,
      step: 6,
      data: adCreatives,
      summary: `${adCreatives.length} creative(s) uploaded`
    },
    {
      title: 'Legal & Regulatory',
      icon: Shield,
      step: 7,
      data: legalRegulatory,
      summary: `${legalRegulatory.industryRules} industry, ${legalRegulatory.regulatoryRequirements.length} regulation(s)`
    },
    {
      title: 'Team Collaborators',
      icon: Users,
      step: 8,
      data: collaborators,
      summary: `${collaborators.length} collaborator(s) invited`
    }
  ];

  const getCompletionStatus = (section: any) => {
    switch (section.step) {
      case 2:
        return section.data.company && section.data.brands.length > 0 && section.data.jobTitle;
      case 3:
        return section.data.length > 0;
      case 4:
        return section.data.logoFiles.length > 0 || section.data.colorPalette.length > 0;
      case 5:
        return section.data.toneOfVoice.length > 0;
      case 6:
        return section.data.length >= 10;
      case 7:
        return section.data.industryRules;
      case 8:
        return true; // Optional step
      default:
        return false;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="flex items-center justify-center mb-4">
          <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center">
            <Eye className="h-6 w-6 text-white" />
          </div>
        </div>
        <h2 className="text-2xl font-bold text-white mb-2">Review & Confirm Brand Compliance Profile</h2>
        <p className="text-gray-400">
          Condensed view of all submitted information across visual, verbal, legal
        </p>
      </div>

      {/* Summary Display */}
      <div className="space-y-4">
        {sections.map((section) => {
          const isComplete = getCompletionStatus(section);
          const IconComponent = section.icon;
          
          return (
            <Card key={section.step} className="p-6 bg-gray-800 border-gray-700">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    isComplete ? 'bg-green-600' : 'bg-gray-600'
                  }`}>
                    {isComplete ? (
                      <CheckCircle className="h-5 w-5 text-white" />
                    ) : (
                      <IconComponent className="h-5 w-5 text-white" />
                    )}
                  </div>
                  <div>
                    <div className="flex items-center space-x-2">
                      <h3 className="text-lg font-medium text-white">{section.title}</h3>
                      <Badge variant={isComplete ? "default" : "secondary"} className="text-xs">
                        {isComplete ? "Complete" : "Incomplete"}
                      </Badge>
                    </div>
                    <p className="text-gray-400 text-sm">{section.summary}</p>
                  </div>
                </div>
                
                {/* Edit Link */}
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onEditStep(section.step)}
                  className="border-gray-600 text-gray-300 hover:text-white hover:border-gray-500"
                >
                  <Edit className="h-4 w-4 mr-2" />
                  Edit
                </Button>
              </div>
            </Card>
          );
        })}
      </div>

      {/* Completion Summary */}
      <Card className="p-6 bg-blue-900/20 border-blue-700">
        <div className="text-center">
          <CheckCircle className="h-12 w-12 mx-auto text-green-400 mb-4" />
          <h3 className="text-xl font-semibold text-white mb-2">Brand Compliance Profile Ready</h3>
          <p className="text-gray-300 mb-4">
            Your brand compliance profile has been created with all the information you've provided. 
            This will help ensure all your marketing materials meet your brand standards and regulatory requirements.
          </p>
          <div className="text-sm text-gray-400">
            You can always edit any section later from your Brand Management dashboard.
          </div>
        </div>
      </Card>
    </div>
  );
};
