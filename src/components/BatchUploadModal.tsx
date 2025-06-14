import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Upload, X, Plus, Folder } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface UploadFile {
  id: string;
  file: File;
  name: string;
  type: 'static' | 'video';
  preview?: string;
}

interface Campaign {
  id: string;
  name: string;
}

interface BatchUploadModalProps {
  campaigns: Campaign[];
  onUploadComplete: (files: UploadFile[], campaignId: string, campaignName: string) => void;
}

export const BatchUploadModal = ({ campaigns, onUploadComplete }: BatchUploadModalProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [files, setFiles] = useState<UploadFile[]>([]);
  const [selectedCampaign, setSelectedCampaign] = useState<string>('');
  const [newCampaignName, setNewCampaignName] = useState('');
  const [isCreatingCampaign, setIsCreatingCampaign] = useState(false);
  const { toast } = useToast();

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(e.target.files || []);
    
    selectedFiles.forEach(file => {
      const fileType = file.type.startsWith('video/') ? 'video' : 'static';
      const newFile: UploadFile = {
        id: Math.random().toString(36).substr(2, 9),
        file,
        name: file.name.split('.')[0],
        type: fileType
      };

      if (fileType === 'static') {
        const reader = new FileReader();
        reader.onload = (e) => {
          newFile.preview = e.target?.result as string;
          setFiles(prev => [...prev, newFile]);
        };
        reader.readAsDataURL(file);
      } else {
        setFiles(prev => [...prev, newFile]);
      }
    });
  };

  const removeFile = (fileId: string) => {
    setFiles(prev => prev.filter(f => f.id !== fileId));
  };

  const updateFileName = (fileId: string, newName: string) => {
    setFiles(prev => prev.map(f => f.id === fileId ? { ...f, name: newName } : f));
  };

  const handleUpload = () => {
    if (files.length === 0) {
      toast({
        title: "Error",
        description: "Please select at least one file to upload",
        variant: "destructive"
      });
      return;
    }

    let campaignId = selectedCampaign;
    let campaignName = '';

    if (isCreatingCampaign) {
      if (!newCampaignName.trim()) {
        toast({
          title: "Error", 
          description: "Please enter a campaign name",
          variant: "destructive"
        });
        return;
      }
      campaignId = Date.now().toString();
      campaignName = newCampaignName.trim();
    } else {
      if (!selectedCampaign) {
        toast({
          title: "Error",
          description: "Please select a campaign",
          variant: "destructive"
        });
        return;
      }
      campaignName = campaigns.find(c => c.id === selectedCampaign)?.name || '';
    }

    onUploadComplete(files, campaignId, campaignName);
    
    toast({
      title: "Success",
      description: `${files.length} file(s) uploaded to ${campaignName}`,
    });

    // Reset form
    setFiles([]);
    setSelectedCampaign('');
    setNewCampaignName('');
    setIsCreatingCampaign(false);
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className="flex items-center space-x-2">
          <Upload className="h-4 w-4" />
          <span>Upload Media</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px] bg-gray-900 border-gray-700 max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-white">Upload Media to Campaign</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* File Upload */}
          <div className="space-y-2">
            <Label className="text-gray-300">Select Files</Label>
            <div className="border-2 border-dashed border-gray-600 rounded-lg p-6 text-center">
              <input
                type="file"
                multiple
                accept="image/*,video/*"
                onChange={handleFileSelect}
                className="hidden"
                id="file-upload"
              />
              <label htmlFor="file-upload" className="cursor-pointer">
                <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                <p className="text-gray-400">Click to select files or drag and drop</p>
                <p className="text-sm text-gray-500">Images and videos supported</p>
              </label>
            </div>
          </div>

          {/* Selected Files */}
          {files.length > 0 && (
            <div className="space-y-3">
              <Label className="text-gray-300">Selected Files ({files.length})</Label>
              <div className="max-h-40 overflow-y-auto space-y-2">
                {files.map(file => (
                  <div key={file.id} className="flex items-center space-x-3 p-3 bg-gray-800 rounded-lg">
                    {file.preview ? (
                      <img src={file.preview} alt="" className="w-12 h-12 object-cover rounded" />
                    ) : (
                      <div className="w-12 h-12 bg-gray-700 rounded flex items-center justify-center">
                        <Upload className="h-6 w-6 text-gray-400" />
                      </div>
                    )}
                    <div className="flex-1">
                      <Input
                        value={file.name}
                        onChange={(e) => updateFileName(file.id, e.target.value)}
                        className="bg-gray-700 border-gray-600 text-white"
                        placeholder="Asset name"
                      />
                      <Badge variant="secondary" className="mt-1">
                        {file.type}
                      </Badge>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeFile(file.id)}
                      className="text-gray-400 hover:text-white"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Campaign Selection */}
          <div className="space-y-3">
            <Label className="text-gray-300">Campaign</Label>
            <div className="flex items-center space-x-2">
              <Button
                type="button"
                variant={!isCreatingCampaign ? "default" : "outline"}
                onClick={() => setIsCreatingCampaign(false)}
                className="border-gray-600"
              >
                <Folder className="h-4 w-4 mr-2" />
                Existing
              </Button>
              <Button
                type="button"
                variant={isCreatingCampaign ? "default" : "outline"}
                onClick={() => setIsCreatingCampaign(true)}
                className="border-gray-600"
              >
                <Plus className="h-4 w-4 mr-2" />
                New
              </Button>
            </div>

            {isCreatingCampaign ? (
              <Input
                placeholder="Enter new campaign name"
                value={newCampaignName}
                onChange={(e) => setNewCampaignName(e.target.value)}
                className="bg-gray-800 border-gray-600 text-white"
              />
            ) : (
              <Select value={selectedCampaign} onValueChange={setSelectedCampaign}>
                <SelectTrigger className="bg-gray-800 border-gray-600 text-white">
                  <SelectValue placeholder="Select a campaign" />
                </SelectTrigger>
                <SelectContent className="bg-gray-800 border-gray-600">
                  {campaigns.map(campaign => (
                    <SelectItem key={campaign.id} value={campaign.id} className="text-white">
                      {campaign.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          </div>
        </div>

        <div className="flex justify-end space-x-2 pt-4 border-t border-gray-700">
          <Button variant="outline" onClick={() => setIsOpen(false)} className="border-gray-600 text-gray-300">
            Cancel
          </Button>
          <Button onClick={handleUpload}>
            Upload {files.length} File{files.length !== 1 ? 's' : ''}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
