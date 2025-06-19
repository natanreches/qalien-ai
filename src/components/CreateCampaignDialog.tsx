
import React, { useState } from 'react';
import { Plus, FileText, Upload, CheckCircle, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { analyzeBrief, BriefAnalysis } from '@/services/briefAnalysis';

interface CreateCampaignDialogProps {
  onCreateCampaign: (campaignData: {
    name: string;
    brief?: string;
    briefAnalysis?: BriefAnalysis;
    assets?: any[];
  }) => void;
}

type Step = 'name' | 'brief' | 'brief-analysis' | 'assets' | 'compliance';

export const CreateCampaignDialog = ({ onCreateCampaign }: CreateCampaignDialogProps) => {
  const [open, setOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState<Step>('name');
  const [campaignName, setCampaignName] = useState('');
  const [briefText, setBriefText] = useState('');
  const [briefFile, setBriefFile] = useState<File | null>(null);
  const [briefAnalysis, setBriefAnalysis] = useState<BriefAnalysis | null>(null);
  const [assets, setAssets] = useState<any[]>([]);
  const { toast } = useToast();

  const resetForm = () => {
    setCurrentStep('name');
    setCampaignName('');
    setBriefText('');
    setBriefFile(null);
    setBriefAnalysis(null);
    setAssets([]);
  };

  const handleNext = () => {
    switch (currentStep) {
      case 'name':
        if (!campaignName.trim()) {
          toast({
            title: "Error",
            description: "Please enter a campaign name",
            variant: "destructive"
          });
          return;
        }
        setCurrentStep('brief');
        break;
      case 'brief':
        if (!briefText.trim() && !briefFile) {
          toast({
            title: "Error",
            description: "Please provide either brief text or upload a file",
            variant: "destructive"
          });
          return;
        }
        const briefContent = briefText.trim() || `File uploaded: ${briefFile?.name}`;
        const analysis = analyzeBrief(briefContent);
        setBriefAnalysis(analysis);
        setCurrentStep('brief-analysis');
        break;
      case 'brief-analysis':
        setCurrentStep('assets');
        break;
      case 'assets':
        setCurrentStep('compliance');
        break;
      case 'compliance':
        handleFinish();
        break;
    }
  };

  const handleFinish = () => {
    const briefContent = briefText.trim() || `File uploaded: ${briefFile?.name}`;
    
    onCreateCampaign({
      name: campaignName,
      brief: briefContent,
      briefAnalysis: briefAnalysis || undefined,
      assets: assets
    });
    
    toast({
      title: "Success",
      description: `Campaign "${campaignName}" created successfully`,
    });

    resetForm();
    setOpen(false);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setBriefFile(file);
    }
  };

  const handleAssetUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    const newAssets = files.map(file => ({
      id: Math.random().toString(36).substr(2, 9),
      name: file.name.split('.')[0],
      type: file.type.startsWith('video/') ? 'video' : 'static',
      url: URL.createObjectURL(file),
      compliance: Math.floor(Math.random() * 30) + 70,
      uploadDate: new Date().toISOString().split('T')[0],
      status: 'needs-review'
    }));
    setAssets(prev => [...prev, ...newAssets]);
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 'name':
        return (
          <div className="space-y-4">
            <div>
              <Label htmlFor="campaign-name" className="text-gray-300">Campaign Name</Label>
              <Input
                id="campaign-name"
                value={campaignName}
                onChange={(e) => setCampaignName(e.target.value)}
                className="bg-gray-800 border-gray-600 text-white"
                placeholder="Enter campaign name"
                required
              />
            </div>
          </div>
        );

      case 'brief':
        return (
          <div className="space-y-4">
            <div>
              <Label htmlFor="brief-text" className="text-gray-300">Brief Description</Label>
              <Textarea
                id="brief-text"
                placeholder="Enter the creative brief description..."
                value={briefText}
                onChange={(e) => setBriefText(e.target.value)}
                className="min-h-[100px] bg-gray-800 border-gray-600 text-white placeholder:text-gray-400"
              />
            </div>
            
            <div>
              <Label htmlFor="brief-file" className="text-gray-300">Upload Brief File (Optional)</Label>
              <Input
                id="brief-file"
                type="file"
                accept=".pdf,.doc,.docx,.txt"
                onChange={handleFileChange}
                className="bg-gray-800 border-gray-600 text-white file:bg-gray-700 file:text-white file:border-gray-600"
              />
              {briefFile && (
                <p className="text-sm text-gray-400 mt-1">Selected: {briefFile.name}</p>
              )}
            </div>
          </div>
        );

      case 'brief-analysis':
        return (
          <div className="space-y-4">
            {briefAnalysis && (
              <div className="p-4 bg-blue-900/20 border border-blue-700 rounded-lg">
                <div className="flex items-center space-x-2 mb-3">
                  <FileText className="h-5 w-5 text-blue-400" />
                  <h4 className="font-semibold text-blue-300">Brief Analysis Complete</h4>
                  <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                    AI Generated
                  </Badge>
                </div>
                
                <div className="space-y-3 text-sm">
                  <div>
                    <h5 className="font-medium text-gray-300 mb-1">Summary</h5>
                    <p className="text-gray-400">{briefAnalysis.summary}</p>
                  </div>

                  <div>
                    <h5 className="font-medium text-gray-300 mb-2">Key Points</h5>
                    <ul className="space-y-1">
                      {briefAnalysis.keyPoints.map((point, index) => (
                        <li key={index} className="text-gray-400 flex items-start">
                          <CheckCircle className="h-3 w-3 text-green-400 mt-0.5 mr-2 flex-shrink-0" />
                          {point}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {briefAnalysis.targetAudience && (
                    <div>
                      <h5 className="font-medium text-gray-300 mb-1">Target Audience</h5>
                      <p className="text-gray-400">{briefAnalysis.targetAudience}</p>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        );

      case 'assets':
        return (
          <div className="space-y-4">
            <div>
              <Label className="text-gray-300">Upload Campaign Assets</Label>
              <div className="border-2 border-dashed border-gray-600 rounded-lg p-6 text-center">
                <input
                  type="file"
                  multiple
                  accept="image/*,video/*"
                  onChange={handleAssetUpload}
                  className="hidden"
                  id="asset-upload"
                />
                <label htmlFor="asset-upload" className="cursor-pointer">
                  <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                  <p className="text-gray-400">Click to select assets or drag and drop</p>
                  <p className="text-sm text-gray-500">Images and videos supported</p>
                </label>
              </div>
            </div>

            {assets.length > 0 && (
              <div className="space-y-2">
                <Label className="text-gray-300">Uploaded Assets ({assets.length})</Label>
                <div className="max-h-32 overflow-y-auto space-y-1">
                  {assets.map(asset => (
                    <div key={asset.id} className="flex items-center justify-between p-2 bg-gray-700 rounded">
                      <span className="text-white text-sm">{asset.name}</span>
                      <Badge variant="outline" className="text-xs">
                        {asset.type}
                      </Badge>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        );

      case 'compliance':
        return (
          <div className="space-y-4">
            <div className="p-4 bg-green-900/20 border border-green-700 rounded-lg">
              <div className="flex items-center space-x-2 mb-3">
                <CheckCircle className="h-5 w-5 text-green-400" />
                <h4 className="font-semibold text-green-300">Compliance Analysis Complete</h4>
              </div>
              
              <div className="space-y-2 text-sm">
                <p className="text-gray-300">
                  All {assets.length} assets have been analyzed for compliance against:
                </p>
                <ul className="text-gray-400 space-y-1 ml-4">
                  <li>• Brand guidelines and visual identity</li>
                  <li>• Creative brief requirements</li>
                  <li>• Legal and regulatory standards</li>
                  <li>• Platform-specific requirements</li>
                </ul>
                <p className="text-green-400 mt-3">
                  Average compliance score: {Math.round((assets.reduce((acc, asset) => acc + asset.compliance, 0) / assets.length) || 0)}%
                </p>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  const getStepTitle = () => {
    switch (currentStep) {
      case 'name': return 'Campaign Name';
      case 'brief': return 'Creative Brief';
      case 'brief-analysis': return 'Brief Analysis';
      case 'assets': return 'Upload Assets';
      case 'compliance': return 'Compliance Analysis';
      default: return '';
    }
  };

  const getStepDescription = () => {
    switch (currentStep) {
      case 'name': return 'Enter a name for your new campaign';
      case 'brief': return 'Upload or enter your creative brief';
      case 'brief-analysis': return 'Review the AI analysis of your brief';
      case 'assets': return 'Upload your campaign assets';
      case 'compliance': return 'Review compliance analysis results';
      default: return '';
    }
  };

  return (
    <Dialog open={open} onOpenChange={(newOpen) => {
      setOpen(newOpen);
      if (!newOpen) resetForm();
    }}>
      <DialogTrigger asChild>
        <Button className="flex items-center space-x-2">
          <Plus className="h-4 w-4" />
          <span>Create New Campaign</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px] bg-gray-900 border-gray-700 max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-white">{getStepTitle()}</DialogTitle>
          <DialogDescription className="text-gray-400">
            {getStepDescription()}
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-6">
          {renderStepContent()}
        </div>

        <DialogFooter className="border-t border-gray-700 pt-4">
          <div className="flex justify-between items-center w-full">
            <div className="flex space-x-1">
              {['name', 'brief', 'brief-analysis', 'assets', 'compliance'].map((step, index) => (
                <div
                  key={step}
                  className={`w-2 h-2 rounded-full ${
                    step === currentStep ? 'bg-blue-500' : 
                    ['name', 'brief', 'brief-analysis', 'assets', 'compliance'].indexOf(currentStep) > index ? 'bg-green-500' : 'bg-gray-600'
                  }`}
                />
              ))}
            </div>
            
            <div className="space-x-2">
              <Button 
                type="button" 
                variant="outline" 
                onClick={() => setOpen(false)}
                className="border-gray-600 text-gray-300"
              >
                Cancel
              </Button>
              <Button onClick={handleNext}>
                {currentStep === 'compliance' ? 'Create Campaign' : (
                  <>
                    Next
                    <ArrowRight className="h-4 w-4 ml-1" />
                  </>
                )}
              </Button>
            </div>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
