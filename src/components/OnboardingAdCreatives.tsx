import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Upload, X, Video, Image } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import type { AdCreative } from '@/types/onboarding';

interface OnboardingAdCreativesProps {
  adCreatives: AdCreative[];
  onAdCreativesUpdated: (creatives: AdCreative[]) => void;
}

export const OnboardingAdCreatives = ({
  adCreatives,
  onAdCreativesUpdated
}: OnboardingAdCreativesProps) => {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const { toast } = useToast();

  const platformOptions = [
    'Instagram Feed', 'Instagram Stories', 'Instagram Reels',
    'Facebook Feed', 'Facebook Stories', 'TikTok',
    'YouTube', 'LinkedIn', 'Twitter/X', 'Snapchat',
    'Pinterest', 'Display Ads', 'Print', 'Other'
  ];

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length + adCreatives.length > 20) {
      toast({
        title: "Upload Limit",
        description: "You can upload a maximum of 20 ad creatives",
        variant: "destructive"
      });
      return;
    }
    setSelectedFiles(files);
  };

  const handleUpload = (fileIndex: number, metadata: {
    name: string;
    type: 'video' | 'static';
    category: 'produced' | 'ugc';
    platform: string;
    description: string;
  }) => {
    if (!selectedFiles[fileIndex]) return;

    const file = selectedFiles[fileIndex];

    const newCreative: AdCreative = {
      id: Math.random().toString(36).substr(2, 9),
      file,
      name: metadata.name || file.name.split('.')[0],
      type: metadata.type,
      category: metadata.category,
      platform: metadata.platform,
      description: metadata.description,
      uploadDate: new Date().toISOString()
    };

    const updatedCreatives = [...adCreatives, newCreative];
    onAdCreativesUpdated(updatedCreatives);

    // Remove the uploaded file from selected files
    setSelectedFiles(prev => prev.filter((_, index) => index !== fileIndex));

    toast({
      title: "Success",
      description: `${metadata.name} uploaded successfully`,
    });
  };

  const removeCreative = (creativeId: string) => {
    const updatedCreatives = adCreatives.filter(c => c.id !== creativeId);
    onAdCreativesUpdated(updatedCreatives);
  };

  const removeSelectedFile = (fileIndex: number) => {
    setSelectedFiles(prev => prev.filter((_, index) => index !== fileIndex));
  };

  return (
    <div className="space-y-8">
      <div className="text-center space-y-4">
        <h2 className="text-3xl font-bold text-white">Upload Ad Creatives</h2>
        <p className="text-gray-300 text-lg max-w-3xl mx-auto">
          Upload 10-20 pieces of your best-performing, compliant ad creatives. Include a mix of video and static content, 
          both produced and UGC (if applicable), across different platforms and formats.
        </p>
        <div className="flex justify-center space-x-4 text-sm text-gray-400">
          <div className="flex items-center space-x-1">
            <Badge variant="outline" className="border-green-500 text-green-400">
              {adCreatives.length}/20
            </Badge>
            <span>Uploaded</span>
          </div>
          <div className="flex items-center space-x-1">
            <Badge variant="outline" className="border-blue-500 text-blue-400">
              {Math.max(0, 10 - adCreatives.length)}
            </Badge>
            <span>Minimum remaining</span>
          </div>
        </div>
      </div>

      {/* File Upload Area */}
      <Card className="bg-gray-800 border-gray-700">
        <CardHeader>
          <CardTitle className="text-white">Select Files</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="border-2 border-dashed border-gray-600 rounded-lg p-8 text-center">
            <input
              type="file"
              multiple
              accept="image/*,video/*"
              onChange={handleFileSelect}
              className="hidden"
              id="creative-upload"
            />
            <label htmlFor="creative-upload" className="cursor-pointer">
              <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-300 text-lg mb-2">Click to select ad creatives</p>
              <p className="text-gray-500">Images and videos supported • Max 20 files</p>
            </label>
          </div>
        </CardContent>
      </Card>

      {/* Selected Files for Upload */}
      {selectedFiles.length > 0 && (
        <Card className="bg-gray-800 border-gray-700">
          <CardHeader>
            <CardTitle className="text-white">Add Details for Selected Files</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {selectedFiles.map((file, index) => (
              <FileUploadForm
                key={index}
                file={file}
                fileIndex={index}
                platformOptions={platformOptions}
                onUpload={handleUpload}
                onRemove={removeSelectedFile}
              />
            ))}
          </CardContent>
        </Card>
      )}

      {/* Uploaded Creatives */}
      {adCreatives.length > 0 && (
        <Card className="bg-gray-800 border-gray-700">
          <CardHeader>
            <CardTitle className="text-white">Uploaded Ad Creatives ({adCreatives.length})</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {adCreatives.map(creative => (
                <div key={creative.id} className="bg-gray-700 rounded-lg p-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      {creative.type === 'video' ? (
                        <Video className="h-5 w-5 text-blue-400" />
                      ) : (
                        <Image className="h-5 w-5 text-green-400" />
                      )}
                      <span className="text-white font-medium">{creative.name}</span>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeCreative(creative.id)}
                      className="text-gray-400 hover:text-white h-8 w-8 p-0"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="space-y-2">
                    <div className="flex flex-wrap gap-1">
                      <Badge variant="secondary" className="text-xs">
                        {creative.category}
                      </Badge>
                      <Badge variant="outline" className="text-xs">
                        {creative.platform}
                      </Badge>
                    </div>
                    {creative.description && (
                      <p className="text-gray-400 text-sm">{creative.description}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {adCreatives.length < 10 && (
        <div className="bg-yellow-900/20 border border-yellow-700 rounded-lg p-4">
          <p className="text-yellow-300 text-sm">
            <strong>Recommendation:</strong> Upload at least 10 ad creatives for better AI training and compliance analysis.
          </p>
        </div>
      )}
    </div>
  );
};

// Separate component for individual file upload form
const FileUploadForm = ({ 
  file, 
  fileIndex, 
  platformOptions, 
  onUpload, 
  onRemove 
}: {
  file: File;
  fileIndex: number;
  platformOptions: string[];
  onUpload: (index: number, metadata: any) => void;
  onRemove: (index: number) => void;
}) => {
  const [name, setName] = useState(file.name.split('.')[0]);
  const [type, setType] = useState<'video' | 'static'>(() => {
    // Auto-detect based on file type
    return file.type.startsWith('video/') ? 'video' : 'static';
  });
  const [category, setCategory] = useState<'produced' | 'ugc'>('produced');
  const [platform, setPlatform] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = () => {
    if (!platform) return;
    
    onUpload(fileIndex, {
      name,
      type,
      category,
      platform,
      description
    });
  };

  return (
    <div className="border border-gray-600 rounded-lg p-4 space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          {type === 'video' ? (
            <Video className="h-6 w-6 text-blue-400" />
          ) : (
            <Image className="h-6 w-6 text-green-400" />
          )}
          <div>
            <p className="text-white font-medium">{file.name}</p>
            <p className="text-gray-400 text-sm">{(file.size / 1024 / 1024).toFixed(1)} MB</p>
          </div>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => onRemove(fileIndex)}
          className="text-gray-400 hover:text-white"
        >
          <X className="h-4 w-4" />
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label className="text-gray-300">Asset Name</Label>
          <Input
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="bg-gray-700 border-gray-600 text-white"
            placeholder="Enter asset name"
          />
        </div>

        <div className="space-y-2">
          <Label className="text-gray-300">Content Type</Label>
          <RadioGroup value={type} onValueChange={(value: 'video' | 'static') => setType(value)}>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="static" id={`static-${fileIndex}`} className="border-gray-400" />
                <Label htmlFor={`static-${fileIndex}`} className="text-gray-300 flex items-center space-x-1 cursor-pointer">
                  <Image className="h-4 w-4 text-green-400" />
                  <span>Static</span>
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="video" id={`video-${fileIndex}`} className="border-gray-400" />
                <Label htmlFor={`video-${fileIndex}`} className="text-gray-300 flex items-center space-x-1 cursor-pointer">
                  <Video className="h-4 w-4 text-blue-400" />
                  <span>Video</span>
                </Label>
              </div>
            </div>
          </RadioGroup>
        </div>

        <div className="space-y-2">
          <Label className="text-gray-300">Category</Label>
          <Select value={category} onValueChange={(value: 'produced' | 'ugc') => setCategory(value)}>
            <SelectTrigger className="bg-gray-700 border-gray-600 text-white">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-gray-700 border-gray-600">
              <SelectItem value="produced" className="text-white">Produced</SelectItem>
              <SelectItem value="ugc" className="text-white">UGC</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label className="text-gray-300">Platform/Format</Label>
          <Select value={platform} onValueChange={setPlatform}>
            <SelectTrigger className="bg-gray-700 border-gray-600 text-white">
              <SelectValue placeholder="Select platform" />
            </SelectTrigger>
            <SelectContent className="bg-gray-700 border-gray-600">
              {platformOptions.map(option => (
                <SelectItem key={option} value={option} className="text-white">
                  {option}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2 md:col-span-2">
          <Label className="text-gray-300">Description (Optional)</Label>
          <Textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="bg-gray-700 border-gray-600 text-white"
            placeholder="Brief description of the creative"
            rows={2}
          />
        </div>
      </div>

      <Button
        onClick={handleSubmit}
        disabled={!platform || !name}
        className="w-full"
      >
        Add Creative
      </Button>
    </div>
  );
};
