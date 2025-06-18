
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Building2, User, Briefcase, Plus, X } from 'lucide-react';

interface CompanyInfo {
  company: string;
  brands: string[];
  jobTitle: string;
}

interface OnboardingCompanyInfoProps {
  companyInfo: CompanyInfo;
  onCompanyInfoUpdated: (info: CompanyInfo) => void;
}

export const OnboardingCompanyInfo = ({
  companyInfo,
  onCompanyInfoUpdated
}: OnboardingCompanyInfoProps) => {
  const [formData, setFormData] = useState<CompanyInfo>(companyInfo);

  const handleInputChange = (field: keyof Omit<CompanyInfo, 'brands'>, value: string) => {
    const updatedInfo = { ...formData, [field]: value };
    setFormData(updatedInfo);
    onCompanyInfoUpdated(updatedInfo);
  };

  const handleBrandChange = (index: number, value: string) => {
    const updatedBrands = [...formData.brands];
    updatedBrands[index] = value;
    const updatedInfo = { ...formData, brands: updatedBrands };
    setFormData(updatedInfo);
    onCompanyInfoUpdated(updatedInfo);
  };

  const addBrand = () => {
    const updatedInfo = { ...formData, brands: [...formData.brands, ''] };
    setFormData(updatedInfo);
    onCompanyInfoUpdated(updatedInfo);
  };

  const removeBrand = (index: number) => {
    const updatedBrands = formData.brands.filter((_, i) => i !== index);
    const updatedInfo = { ...formData, brands: updatedBrands };
    setFormData(updatedInfo);
    onCompanyInfoUpdated(updatedInfo);
  };

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-white mb-2">Company Information</h2>
        <p className="text-gray-400">
          Tell us about your organization and the brands you represent to help us personalize your experience.
        </p>
      </div>

      <div className="space-y-6 max-w-md mx-auto">
        <div className="space-y-2">
          <Label htmlFor="company" className="text-gray-200 flex items-center">
            <Building2 className="h-4 w-4 mr-2" />
            Company Name
          </Label>
          <Input
            id="company"
            placeholder="e.g., Kraft Heinz Company"
            value={formData.company}
            onChange={(e) => handleInputChange('company', e.target.value)}
            className="bg-gray-700 border-gray-600 text-white"
          />
        </div>

        <div className="space-y-2">
          <Label className="text-gray-200 flex items-center">
            <Briefcase className="h-4 w-4 mr-2" />
            Brands You Represent
          </Label>
          <div className="space-y-3">
            {formData.brands.map((brand, index) => (
              <div key={index} className="flex items-center space-x-2">
                <Input
                  placeholder="e.g., Jell-O, Philadelphia, Heinz"
                  value={brand}
                  onChange={(e) => handleBrandChange(index, e.target.value)}
                  className="bg-gray-700 border-gray-600 text-white flex-1"
                />
                {formData.brands.length > 1 && (
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => removeBrand(index)}
                    className="border-gray-600 text-gray-400 hover:text-red-400 hover:border-red-400"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                )}
              </div>
            ))}
            <Button
              type="button"
              variant="outline"
              onClick={addBrand}
              className="w-full border-gray-600 text-gray-300 hover:text-white hover:border-gray-500"
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Another Brand
            </Button>
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="jobTitle" className="text-gray-200 flex items-center">
            <User className="h-4 w-4 mr-2" />
            Job Title
          </Label>
          <Input
            id="jobTitle"
            placeholder="e.g., Brand Manager, Marketing Director"
            value={formData.jobTitle}
            onChange={(e) => handleInputChange('jobTitle', e.target.value)}
            className="bg-gray-700 border-gray-600 text-white"
          />
        </div>
      </div>

      <div className="text-center text-sm text-gray-500 mt-6">
        This information helps us tailor your brand management experience and set up proper permissions for your team.
      </div>
    </div>
  );
};
