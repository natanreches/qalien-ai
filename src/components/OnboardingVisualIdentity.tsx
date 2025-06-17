import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Upload, Palette, Type, Camera, Image, Layout, Eye, CheckCircle, Plus, X, FileText, AlertCircle } from 'lucide-react';

interface BrandGuideline {
  id: string;
  name: string;
  description: string;
  file: File | null;
  uploadDate: string;
}

interface VisualIdentity {
  logoFiles: File[];
  colorPalette: string[];
  typography: string[];
  photographyStyle: string;
  photographyFiles: File[];
  iconography: File[];
  layoutRules: string;
  layoutFiles: File[];
  accessibilityRequirements: boolean;
}

interface OnboardingVisualIdentityProps {
  guidelines: BrandGuideline[];
  visualIdentity: VisualIdentity;
  onGuidelinesUploaded: (guidelines: BrandGuideline[]) => void;
  onVisualIdentityUpdated: (identity: VisualIdentity) => void;
  onNavigateToGuidelines?: () => void;
}

interface ExtractionStatus {
  photography: boolean;
  iconography: boolean;
  layout: boolean;
}

export const OnboardingVisualIdentity = ({
  guidelines,
  visualIdentity,
  onGuidelinesUploaded,
  onVisualIdentityUpdated,
  onNavigateToGuidelines
}: OnboardingVisualIdentityProps) => {
  const [identity, setIdentity] = useState<VisualIdentity>({
    ...visualIdentity,
    photographyFiles: visualIdentity.photographyFiles || [],
    layoutFiles: visualIdentity.layoutFiles || []
  });
  const [extractedFromGuidelines, setExtractedFromGuidelines] = useState(false);
  const [extractionStatus, setExtractionStatus] = useState<ExtractionStatus>({
    photography: false,
    iconography: false,
    layout: false
  });

  // Enhanced extraction from brand guidelines including auto-detection of specific elements
  useEffect(() => {
    if (guidelines.length > 0 && !extractedFromGuidelines) {
      // Create mock logo files extracted from guidelines
      const createMockLogoFile = (name: string, type: string = 'image/png') => {
        const blob = new Blob(['mock logo data'], { type });
        return new File([blob], name, { type });
      };

      // Create mock iconography files if detected in guidelines
      const createMockIconFile = (name: string, type: string = 'image/svg+xml') => {
        const blob = new Blob(['mock icon data'], { type });
        return new File([blob], name, { type });
      };

      // Simulate intelligent extraction based on guideline content analysis
      // In a real implementation, this would analyze the actual file content
      const hasPhotographyGuidelines = guidelines.some(g => 
        g.name.toLowerCase().includes('photography') || 
        g.description.toLowerCase().includes('photo') ||
        g.description.toLowerCase().includes('image')
      );

      const hasIconographyGuidelines = guidelines.some(g => 
        g.name.toLowerCase().includes('icon') || 
        g.description.toLowerCase().includes('graphic') ||
        g.name.toLowerCase().includes('visual elements')
      );

      const hasLayoutGuidelines = guidelines.some(g => 
        g.name.toLowerCase().includes('layout') || 
        g.description.toLowerCase().includes('grid') ||
        g.description.toLowerCase().includes('spacing')
      );

      // Extract iconography files if guidelines contain iconography information
      const extractedIconography = hasIconographyGuidelines ? [
        createMockIconFile('brand-icons-primary.svg'),
        createMockIconFile('brand-icons-secondary.svg')
      ] : [];

      const extractedIdentity: VisualIdentity = {
        ...identity,
        logoFiles: [
          createMockLogoFile('brand-logo-primary.png'),
          createMockLogoFile('brand-logo-horizontal.png'),
          createMockLogoFile('brand-logo-monochrome.png')
        ],
        colorPalette: ['#FF6B35', '#004E89', '#FFFFFF', '#F4F4F4', '#2C3E50'],
        typography: ['Helvetica Neue', 'Arial', 'Georgia', 'Open Sans'],
        photographyStyle: hasPhotographyGuidelines 
          ? 'Clean, modern photography with consistent lighting and minimal backgrounds. Focus on lifestyle imagery that reflects brand values.'
          : '',
        iconography: extractedIconography,
        layoutRules: hasLayoutGuidelines 
          ? 'Maintain generous white space, use grid-based layouts, ensure minimum 8px margins, and follow 4:3 aspect ratios for hero images.'
          : ''
      };

      setIdentity(extractedIdentity);
      setExtractionStatus({
        photography: hasPhotographyGuidelines,
        iconography: hasIconographyGuidelines,
        layout: hasLayoutGuidelines
      });
      setExtractedFromGuidelines(true);
    }
  }, [guidelines, extractedFromGuidelines, identity]);

  const handleFileUpload = (files: FileList | null, type: 'logo' | 'iconography' | 'photography' | 'layout') => {
    if (!files) return;
    
    const fileArray = Array.from(files);
    switch (type) {
      case 'logo':
        setIdentity(prev => ({ ...prev, logoFiles: [...prev.logoFiles, ...fileArray] }));
        break;
      case 'iconography':
        setIdentity(prev => ({ ...prev, iconography: [...prev.iconography, ...fileArray] }));
        break;
      case 'photography':
        setIdentity(prev => ({ ...prev, photographyFiles: [...prev.photographyFiles, ...fileArray] }));
        break;
      case 'layout':
        setIdentity(prev => ({ ...prev, layoutFiles: [...prev.layoutFiles, ...fileArray] }));
        break;
    }
  };

  const addColor = () => {
    setIdentity(prev => ({
      ...prev,
      colorPalette: [...prev.colorPalette, '#000000']
    }));
  };

  const updateColor = (index: number, color: string) => {
    setIdentity(prev => ({
      ...prev,
      colorPalette: prev.colorPalette.map((c, i) => i === index ? color : c)
    }));
  };

  const removeColor = (index: number) => {
    setIdentity(prev => ({
      ...prev,
      colorPalette: prev.colorPalette.filter((_, i) => i !== index)
    }));
  };

  const addTypography = () => {
    setIdentity(prev => ({
      ...prev,
      typography: [...prev.typography, 'New Font']
    }));
  };

  const updateTypography = (index: number, font: string) => {
    setIdentity(prev => ({
      ...prev,
      typography: prev.typography.map((f, i) => i === index ? font : f)
    }));
  };

  const removeTypography = (index: number) => {
    setIdentity(prev => ({
      ...prev,
      typography: prev.typography.filter((_, i) => i !== index)
    }));
  };

  const handleSave = () => {
    onVisualIdentityUpdated(identity);
  };

  // Show message if no guidelines are uploaded
  if (guidelines.length === 0) {
    return (
      <div className="space-y-8">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-white mb-2">Visual Identity Setup</h2>
          <p className="text-gray-400">
            Configure your brand's visual elements. Upload brand guidelines first for automatic extraction.
          </p>
        </div>

        <Card className="p-8 bg-gray-800 border-gray-700 text-center">
          <h3 className="text-lg font-semibold text-white mb-2">Brand Guidelines Required</h3>
          <p className="text-gray-400 mb-6">
            To automatically extract your visual identity elements, please upload your brand guidelines first. 
            This will help us pre-populate colors, fonts, and other brand elements.
          </p>
          <Button
            onClick={onNavigateToGuidelines}
            variant="outline"
            className="border-gray-600 text-gray-300"
          >
            <FileText className="h-4 w-4 mr-2" />
            Upload Brand Guidelines
          </Button>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-white mb-2">Visual Identity Setup</h2>
        <p className="text-gray-400">
          Configure your brand's visual elements. Values have been pre-filled from your uploaded brand guidelines.
        </p>
      </div>

      {extractedFromGuidelines && (
        <div className="flex items-center space-x-2 mb-6">
          <CheckCircle className="h-5 w-5 text-green-500" />
          <span className="text-green-500 font-medium">
            Visual elements automatically extracted from {guidelines.length} guideline{guidelines.length !== 1 ? 's' : ''}
          </span>
        </div>
      )}

      <div className="space-y-6">
        {/* Logo Files */}
        <Card className="p-6 bg-gray-800 border-gray-700">
          <div className="flex items-center mb-4">
            <Image className="h-5 w-5 mr-2 text-blue-400" />
            <h3 className="text-lg font-semibold text-white">Logo Files</h3>
            {extractedFromGuidelines && (
              <Badge variant="secondary" className="ml-2 bg-green-600 text-white">
                Auto-extracted
              </Badge>
            )}
          </div>
          <p className="text-gray-400 text-sm mb-4">
            {extractedFromGuidelines 
              ? 'Logo files have been automatically extracted from your brand guidelines.'
              : 'Upload approved logo files in all approved variations (color, monochrome, reverse, vertical, etc.)'
            }
          </p>
          
          {/* Show extracted logos or upload interface */}
          {extractedFromGuidelines && identity.logoFiles.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {identity.logoFiles.map((file, index) => (
                <div key={index} className="text-center">
                  <div className="w-full h-20 bg-gray-700 rounded border flex items-center justify-center mb-2">
                    <Image className="h-8 w-8 text-gray-400" />
                  </div>
                  <p className="text-xs text-gray-400 truncate">{file.name}</p>
                  <Badge variant="secondary" className="mt-1 text-xs bg-green-600 text-white">
                    Extracted
                  </Badge>
                </div>
              ))}
            </div>
          ) : (
            <div className="space-y-4">
              <div className="border-2 border-dashed border-gray-600 rounded-lg p-6 text-center">
                <Upload className="h-8 w-8 mx-auto text-gray-400 mb-2" />
                <p className="text-gray-400 mb-2">Upload logo files</p>
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={(e) => handleFileUpload(e.target.files, 'logo')}
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
              {identity.logoFiles.length > 0 && (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {identity.logoFiles.map((file, index) => (
                    <div key={index} className="text-center">
                      <div className="w-full h-20 bg-gray-700 rounded border flex items-center justify-center mb-2">
                        <Image className="h-8 w-8 text-gray-400" />
                      </div>
                      <p className="text-xs text-gray-400 truncate">{file.name}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </Card>

        {/* Color Palette */}
        <Card className="p-6 bg-gray-800 border-gray-700">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center">
              <Palette className="h-5 w-5 mr-2 text-blue-400" />
              <h3 className="text-lg font-semibold text-white">Color Palette</h3>
            </div>
            {extractedFromGuidelines && (
              <Badge variant="secondary" className="bg-green-600 text-white">
                Auto-extracted
              </Badge>
            )}
          </div>
          <p className="text-gray-400 text-sm mb-4">
            Extracted colors (HEX/RGB); allow user to edit/approve
          </p>
          <div className="space-y-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {identity.colorPalette.map((color, index) => (
                <div key={index} className="space-y-2">
                  <div
                    className="w-full h-16 rounded border border-gray-600"
                    style={{ backgroundColor: color }}
                  />
                  <div className="flex items-center space-x-2">
                    <Input
                      value={color}
                      onChange={(e) => updateColor(index, e.target.value)}
                      className="bg-gray-700 border-gray-600 text-white text-xs"
                    />
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => removeColor(index)}
                      className="text-red-400 border-gray-600 p-1"
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
            <Button variant="outline" onClick={addColor} className="border-gray-600 text-gray-300">
              <Plus className="h-4 w-4 mr-2" />
              Add Color
            </Button>
          </div>
        </Card>

        {/* Typography */}
        <Card className="p-6 bg-gray-800 border-gray-700">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center">
              <Type className="h-5 w-5 mr-2 text-blue-400" />
              <h3 className="text-lg font-semibold text-white">Typography</h3>
            </div>
            {extractedFromGuidelines && (
              <Badge variant="secondary" className="bg-green-600 text-white">
                Auto-extracted
              </Badge>
            )}
          </div>
          <p className="text-gray-400 text-sm mb-4">
            Extracted font families and usage hierarchy (H1, body, CTA); allow edit
          </p>
          <div className="space-y-4">
            {identity.typography.map((font, index) => (
              <div key={index} className="flex items-center space-x-2">
                <Input
                  value={font}
                  onChange={(e) => updateTypography(index, e.target.value)}
                  className="flex-1 bg-gray-700 border-gray-600 text-white"
                  placeholder="Font name"
                />
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => removeTypography(index)}
                  className="text-red-400 border-gray-600"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ))}
            <Button variant="outline" onClick={addTypography} className="border-gray-600 text-gray-300">
              <Plus className="h-4 w-4 mr-2" />
              Add Font
            </Button>
          </div>
        </Card>

        {/* Photography Style - Enhanced with Smart Extraction */}
        <Card className="p-6 bg-gray-800 border-gray-700">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center">
              <Camera className="h-5 w-5 mr-2 text-blue-400" />
              <h3 className="text-lg font-semibold text-white">Photography Style</h3>
            </div>
            {extractionStatus.photography && (
              <Badge variant="secondary" className="bg-green-600 text-white">
                Auto-extracted
              </Badge>
            )}
          </div>

          {/* Smart messaging based on extraction status */}
          {extractionStatus.photography ? (
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
          
          {/* Upload Section */}
          <div className="space-y-4 mb-6">
            <div className="border-2 border-dashed border-gray-600 rounded-lg p-6 text-center">
              <Upload className="h-8 w-8 mx-auto text-gray-400 mb-2" />
              <p className="text-gray-400 mb-2">
                {extractionStatus.photography 
                  ? 'Upload additional photography examples (optional)'
                  : 'Upload photography style guides or examples'
                }
              </p>
              <input
                type="file"
                multiple
                accept="image/*,.pdf"
                onChange={(e) => handleFileUpload(e.target.files, 'photography')}
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
            
            {identity.photographyFiles.length > 0 && (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {identity.photographyFiles.map((file, index) => (
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
          
          {/* Text Description */}
          <div className="space-y-2">
            <Label className="text-gray-200">Style Description</Label>
            <Textarea
              value={identity.photographyStyle}
              onChange={(e) => setIdentity(prev => ({ ...prev, photographyStyle: e.target.value }))}
              className="bg-gray-700 border-gray-600 text-white"
              placeholder={extractionStatus.photography 
                ? "Extracted style description (you can edit this)"
                : "Describe your photography style preferences..."
              }
              rows={3}
            />
          </div>
        </Card>

        {/* Iconography / Graphic Elements - Enhanced with Smart Extraction */}
        <Card className="p-6 bg-gray-800 border-gray-700">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center">
              <Layout className="h-5 w-5 mr-2 text-blue-400" />
              <h3 className="text-lg font-semibold text-white">Iconography / Graphic Elements</h3>
            </div>
            {extractionStatus.iconography && (
              <Badge variant="secondary" className="bg-green-600 text-white">
                Auto-extracted
              </Badge>
            )}
          </div>

          {/* Smart messaging based on extraction status */}
          {extractionStatus.iconography ? (
            <div className="flex items-start space-x-2 mb-4 p-3 bg-green-900/20 border border-green-600/30 rounded-lg">
              <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-green-400 text-sm font-medium">Based on your brand guidelines</p>
                <p className="text-gray-300 text-sm">Iconography and graphic elements have been automatically extracted from your uploaded brand documents.</p>
              </div>
            </div>
          ) : (
            <div className="flex items-start space-x-2 mb-4 p-3 bg-orange-900/20 border border-orange-600/30 rounded-lg">
              <AlertCircle className="h-5 w-5 text-orange-500 mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-orange-400 text-sm font-medium">Element not found in brand guidelines</p>
                <p className="text-gray-300 text-sm">Please upload icon packs, graphic treatments, or watermark files.</p>
              </div>
            </div>
          )}

          {/* Show extracted iconography if available */}
          {extractionStatus.iconography && identity.iconography.length > 0 && (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              {identity.iconography.map((file, index) => (
                <div key={index} className="text-center">
                  <div className="w-full h-20 bg-gray-700 rounded border flex items-center justify-center mb-2">
                    <Layout className="h-8 w-8 text-gray-400" />
                  </div>
                  <p className="text-xs text-gray-400 truncate">{file.name}</p>
                  <Badge variant="secondary" className="mt-1 text-xs bg-green-600 text-white">
                    Extracted
                  </Badge>
                </div>
              ))}
            </div>
          )}

          {/* Upload interface */}
          <div className="border-2 border-dashed border-gray-600 rounded-lg p-6 text-center">
            <Upload className="h-8 w-8 mx-auto text-gray-400 mb-2" />
            <p className="text-gray-400 mb-2">
              {extractionStatus.iconography 
                ? 'Upload additional iconography files (optional)'
                : 'Upload iconography files'
              }
            </p>
            <input
              type="file"
              multiple
              accept="image/*"
              onChange={(e) => handleFileUpload(e.target.files, 'iconography')}
              className="hidden"
              id="iconography-upload"
            />
            <Button
              variant="outline"
              onClick={() => document.getElementById('iconography-upload')?.click()}
              className="border-gray-600 text-gray-300"
            >
              Choose Files
            </Button>
          </div>

          {/* Show uploaded files if any */}
          {!extractionStatus.iconography && identity.iconography.length > 0 && (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
              {identity.iconography.map((file, index) => (
                <div key={index} className="text-center">
                  <div className="w-full h-20 bg-gray-700 rounded border flex items-center justify-center mb-2">
                    <Layout className="h-8 w-8 text-gray-400" />
                  </div>
                  <p className="text-xs text-gray-400 truncate">{file.name}</p>
                </div>
              ))}
            </div>
          )}
        </Card>

        {/* Layout Rules - Enhanced with Smart Extraction */}
        <Card className="p-6 bg-gray-800 border-gray-700">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center">
              <Layout className="h-5 w-5 mr-2 text-blue-400" />
              <h3 className="text-lg font-semibold text-white">Layout Rules</h3>
            </div>
            {extractionStatus.layout && (
              <Badge variant="secondary" className="bg-green-600 text-white">
                Auto-extracted
              </Badge>
            )}
          </div>

          {/* Smart messaging based on extraction status */}
          {extractionStatus.layout ? (
            <div className="flex items-start space-x-2 mb-4 p-3 bg-green-900/20 border border-green-600/30 rounded-lg">
              <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-green-400 text-sm font-medium">Based on your brand guidelines</p>
                <p className="text-gray-300 text-sm">Layout rules and guidelines have been automatically extracted from your uploaded brand documents.</p>
              </div>
            </div>
          ) : (
            <div className="flex items-start space-x-2 mb-4 p-3 bg-orange-900/20 border border-orange-600/30 rounded-lg">
              <AlertCircle className="h-5 w-5 text-orange-500 mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-orange-400 text-sm font-medium">Element not found in brand guidelines</p>
                <p className="text-gray-300 text-sm">Please upload grid templates, layout guides, or describe your layout principles below.</p>
              </div>
            </div>
          )}
          
          {/* Upload Section */}
          <div className="space-y-4 mb-6">
            <div className="border-2 border-dashed border-gray-600 rounded-lg p-6 text-center">
              <Upload className="h-8 w-8 mx-auto text-gray-400 mb-2" />
              <p className="text-gray-400 mb-2">
                {extractionStatus.layout 
                  ? 'Upload additional layout templates (optional)'
                  : 'Upload layout templates or grid guides'
                }
              </p>
              <input
                type="file"
                multiple
                accept="image/*,.pdf"
                onChange={(e) => handleFileUpload(e.target.files, 'layout')}
                className="hidden"
                id="layout-upload"
              />
              <Button
                variant="outline"
                onClick={() => document.getElementById('layout-upload')?.click()}
                className="border-gray-600 text-gray-300"
              >
                Choose Files
              </Button>
            </div>
            
            {identity.layoutFiles.length > 0 && (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {identity.layoutFiles.map((file, index) => (
                  <div key={index} className="text-center">
                    <div className="w-full h-20 bg-gray-700 rounded border flex items-center justify-center mb-2">
                      <Layout className="h-8 w-8 text-gray-400" />
                    </div>
                    <p className="text-xs text-gray-400 truncate">{file.name}</p>
                  </div>
                ))}
              </div>
            )}
          </div>

          <Separator className="my-4 bg-gray-600" />
          
          {/* Text Description */}
          <div className="space-y-2">
            <Label className="text-gray-200">Layout Guidelines</Label>
            <Textarea
              value={identity.layoutRules}
              onChange={(e) => setIdentity(prev => ({ ...prev, layoutRules: e.target.value }))}
              className="bg-gray-700 border-gray-600 text-white"
              placeholder={extractionStatus.layout 
                ? "Extracted layout rules (you can edit this)"
                : "Describe layout rules and guidelines..."
              }
              rows={3}
            />
          </div>
        </Card>

        {/* Accessibility Requirements */}
        <Card className="p-6 bg-gray-800 border-gray-700">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center">
              <Eye className="h-5 w-5 mr-2 text-blue-400" />
              <h3 className="text-lg font-semibold text-white">Accessibility Requirements</h3>
            </div>
            <Switch
              checked={identity.accessibilityRequirements}
              onCheckedChange={(checked) => setIdentity(prev => ({ ...prev, accessibilityRequirements: checked }))}
            />
          </div>
          <p className="text-gray-400 text-sm">
            Confirm accessibility standards: min font sizes, contrast ratios, alt-text policies
          </p>
        </Card>
      </div>

      <Button onClick={handleSave} className="w-full">
        Save Visual Identity
      </Button>
    </div>
  );
};
